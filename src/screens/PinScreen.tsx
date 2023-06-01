import { CodeInput } from "@/components/CodeInput";
import { PinCell } from "@/components/PinCell";
import { useTextInputFocus } from "@/hooks/useTextInputFocus";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Text, View } from "react-native";

function PinScreen() {
  const [value, setValue] = useState("");

  const ref = useTextInputFocus();

  const { navigate } = useNavigation();

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text onPress={() => navigate("BalanceScreen")}>
        Navigate to balance screen
      </Text>
      <CodeInput
        renderCell={(props) => <PinCell {...props} key={props.index} />}
        value={value}
        onChangeText={setValue}
        ref={ref}
        onFulfill={(text) => alert(text)}
      />
    </View>
  );
}

export default PinScreen;
