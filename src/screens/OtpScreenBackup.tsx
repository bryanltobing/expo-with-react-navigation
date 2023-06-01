import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
} from "react-native";

import {
  CodeField,
  Cursor,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { useNavigation } from "@react-navigation/native";

import { CountdownTimer } from "@/components/CountdownTimer";
import { useTextInputFocus } from "@/hooks/useTextInputFocus";

const styles = StyleSheet.create({
  root: { flex: 1, padding: 20 },
  title: { textAlign: "center", fontSize: 30 },
  codeFieldRoot: { marginTop: 20 },
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderWidth: 2,
    borderColor: "#00000030",
    textAlign: "center",
  },
  focusCell: {
    borderColor: "#000",
  },
});

const CELL_COUNT = 6;

function fakePromise(forceError: boolean) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const randomNumber = Math.random();
      if (randomNumber < 0.5 && !forceError) {
        resolve("Fake promise resolved successfully!");
      } else {
        reject(new Error("Fake promise rejected!"));
      }
    }, 500);
  });
}

function OtpScreen() {
  const [value, setValue] = useState("");
  const [attemptCount, setAtemptCount] = useState(0);

  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (text: string) => {
    try {
      setIsLoading(true);
      await fakePromise(true);
      alert(text);
    } catch (err) {
      setAtemptCount((attemptCount) => {
        if (attemptCount < 3) {
          return attemptCount + 1;
        }

        return attemptCount;
      });
      if (attemptCount === 2) {
        ref.current?.blur();
      }

      alert("Something went wrong");
    } finally {
      setIsLoading(false);
      setValue("");
    }
  };

  const { navigate } = useNavigation();

  const ref = useTextInputFocus();

  return (
    <SafeAreaView style={styles.root}>
      <View>
        <Text onPress={() => navigate("BalanceScreen")}>Go to balance</Text>
      </View>
      <Text style={styles.title}>Verifications</Text>

      {isLoading && <ActivityIndicator />}

      {attemptCount === 3 && <Text>Too many attempts</Text>}

      <View pointerEvents={attemptCount === 3 ? "none" : "auto"}>
        <CodeField
          {...props}
          ref={ref}
          // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
          value={value}
          onChangeText={(text) => {
            setValue(text);

            if (text.length === 6) {
              handleSubmit(text);
            }
          }}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFieldRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={({ index, symbol, isFocused }) => (
            <Text
              key={index}
              style={[styles.cell, isFocused && styles.focusCell]}
              onLayout={getCellOnLayoutHandler(index)}
            >
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          )}
        />
      </View>

      {attemptCount === 3 && (
        <CountdownTimer
          expiryTimestamp={new Date(new Date().getTime() + 10000)}
          onExpire={() => {
            ref.current?.focus();
            setAtemptCount(0);
          }}
        >
          {({ isRunning, seconds }) => {
            if (isRunning) {
              return <Text>{seconds}</Text>;
            } else {
              return <Text>Time is up</Text>;
            }
          }}
        </CountdownTimer>
      )}
    </SafeAreaView>
  );
}

export default OtpScreen;
