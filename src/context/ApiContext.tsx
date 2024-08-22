import React, { createContext, useEffect, useState, PropsWithChildren } from "react";
import { useAuth0 } from "react-native-auth0";
interface apiData {
  userToken: string;
  backendApiCall: (apiData: ApiProps) => Promise<apiResponse>;
  serviceIsReady: boolean;
}

export interface ApiProps {
  method: string;
  endpoint: string;
  body?: any;
}
export interface apiResponse {
  data?: any;
  message: string;
  status: string;
}
export const ApiContext = createContext<apiData>({
  userToken: "",
  backendApiCall: async () => {
    return new Promise(() => {});
  },
  serviceIsReady: false,
});
export const ApiContextProvider: React.FC<PropsWithChildren> = (props) => {
  const { getCredentials } = useAuth0();
  const [serviceIsReady, setServiceIsReady] = useState<boolean>(false);
  const [userToken, setUserToken] = useState<string>("");
  const backendApiCall = async (apiData: ApiProps): Promise<apiResponse> => {
    if (!serviceIsReady) {
      return { data: null, status: "error", message: "Token not ready yet" };
    }
    try {
      const res = await fetch(`https://vip.wango.pro/v1/${apiData.endpoint}`, {
        method: apiData.method,
        headers: {
          Authorization: `Bearer ${userToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiData.body),
      });
      const data = await res.json();
      console.log(data);
      if (data.status === "error") {
        return { data: null, status: "error", message: data.message };
      }
      return { data: data.data, status: "success", message: "success" };
    } catch (error: any) {
      return { data: null, status: "error", message: error.message };
    }
  };

  const getToken = async () => {
    try {
      const token = await getCredentials();
      return token?.accessToken;
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToken()
      .then((token) => {
        setUserToken(token as string);
        setServiceIsReady(true);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  return (
    <ApiContext.Provider value={{ userToken: userToken, backendApiCall, serviceIsReady }}>
      {props.children}
    </ApiContext.Provider>
  );
};
