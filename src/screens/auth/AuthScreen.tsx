import { useEffect, useState } from "react";
import { useAuth0 } from "react-native-auth0";

import { Text } from "react-native";

export function Auth() {
  const { authorize, user } = useAuth0();
  const [authenticating, setAuthenticating] = useState(true);

  useEffect(() => {
    const authenticate = async () => {
      if (!user) {
        try {
          await authorize({
            audience: "https://vip.wango.pro/",
            scope: "read:current_user, update:current_user_metadata",
          });
        } catch (e) {
          console.log(e);
        }
      }
      setAuthenticating(false);
    };

    authenticate();
  }, []);

  return <Text>{authenticating ? "Authenticating" : "Authenticated"}</Text>;
}
