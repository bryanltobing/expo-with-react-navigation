import { useNavigation } from "@react-navigation/native";
import { Text, View } from "react-native";

function HomeScreen() {
  const { navigate } = useNavigation();

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>

      <Text onPress={() => navigate("PinScreen")}>Navigate to Pin Screen</Text>
    </View>
  );
}

export default HomeScreen;
