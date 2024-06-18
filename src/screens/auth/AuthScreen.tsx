import { useState, useRef } from "react";
import { useAuth0 } from "react-native-auth0";
import {
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";

import Slides from "../../data/Slides";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const SlideItem = ({ item, onPress }: { item: any; onPress: () => void }) => (
  <View style={styles.slide}>
    <Image source={item.image} style={styles.backgroundImage} />
    <View style={styles.textContainer}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>Deslizar</Text>
    </TouchableOpacity>
  </View>
);

export function Auth() {
  const { authorize } = useAuth0();
  const ref = useRef<FlatList<any>>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const onMomentumScrollEnd = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / windowWidth);
    setCurrentIndex(index);
    console.log(index);
  };

  const scrollToNext = () => {
    if (currentIndex < Slides.length - 1 && ref.current) {
      ref.current.scrollToIndex({ index: currentIndex + 1, animated: true });
      setCurrentIndex(currentIndex + 1);
      console.log(currentIndex);
    } else if (currentIndex === Slides.length - 1) {
      authorize({
        audience: "https://vip.wango.pro/",
        scope: "read:current_user update:current_user_metadata",
      }).catch(console.log);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={ref}
        data={Slides}
        renderItem={({ item }) => <SlideItem item={item} onPress={scrollToNext} />}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onMomentumScrollEnd}
        pagingEnabled
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    width: windowWidth,
    height: windowHeight,
    justifyContent: "flex-end",
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
  },
  textContainer: {
    position: "absolute",
    bottom: 50,
    backgroundColor: "rgba(0,0,0,0.5)",
    width: "100%",
    padding: 10,
  },
  title: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  description: {
    color: "#fff",
    fontSize: 14,
    marginTop: 5,
  },
  button: {
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#007bff",
    alignSelf: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
