import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useEffect, useRef } from "react";
import {
  Button,
  InteractionManager,
  Platform,
  Text,
  TextInput,
  View,
} from "react-native";

function FocusScreen() {
  const ref = useRef<TextInput | null>(null);

  useFocusEffect(
    useCallback(() => {
      const task = InteractionManager.runAfterInteractions(() => {
        Platform.OS === "android"
          ? setTimeout(() => ref.current?.focus(), 0)
          : ref.current?.focus();
      });

      return () => task.cancel();
    }, [])
  );

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Focus Screen</Text>
      <TextInput style={{ backgroundColor: "red" }} ref={ref} />

      <Button
        title="Toggle Focus Input"
        onPress={() => {
          if (ref.current?.isFocused()) {
            ref.current?.blur();
          } else {
            ref.current?.focus();
          }
        }}
      />
    </View>
  );
}

export default FocusScreen;
