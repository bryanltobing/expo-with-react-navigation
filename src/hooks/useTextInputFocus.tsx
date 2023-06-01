import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useRef } from "react";
import { InteractionManager, TextInput, Platform } from "react-native";

export const useTextInputFocus = (isNativeStack?: boolean) => {
  const ref = useRef<TextInput | null>(null);

  useFocusEffect(
    useCallback(() => {
      const task = InteractionManager.runAfterInteractions(() => {
        if (isNativeStack) {
          // related issue why this is needed
          // https://github.com/software-mansion/react-native-screens/issues/472
          Platform.OS === "android"
            ? setTimeout(() => ref.current?.focus(), 0)
            : ref.current?.focus();
        } else {
          ref.current?.focus();
        }
      });

      return () => task.cancel();
    }, [])
  );
  return ref;
};
