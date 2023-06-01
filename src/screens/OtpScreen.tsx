import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
} from "react-native";

import { Cursor } from "react-native-confirmation-code-field";
import { useNavigation } from "@react-navigation/native";

import { CountdownTimer } from "@/components/CountdownTimer";
import { useTextInputFocus } from "@/hooks/useTextInputFocus";
import { CodeInput } from "@/components/CodeInput";

const styles = StyleSheet.create({
  root: { flex: 1 },
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

      <CodeInput
        ref={ref}
        value={value}
        onChangeText={setValue}
        renderCell={({
          index,
          isFocused,
          symbol,
          getCellOnLayoutHandler,
          isLastIndex,
        }) => {
          return (
            <Text
              key={index}
              style={[
                styles.cell,
                isFocused && styles.focusCell,
                { marginRight: !isLastIndex ? 16 : undefined },
              ]}
              onLayout={getCellOnLayoutHandler(index)}
            >
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          );
        }}
        onFulfill={handleSubmit}
        editable={attemptCount !== 3}
      />

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
