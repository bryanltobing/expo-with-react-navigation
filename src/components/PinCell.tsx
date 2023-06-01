import { Text, View } from "react-native";
import { CodeInputRenderCellOptions } from "./CodeInput";
import { Cursor } from "react-native-confirmation-code-field";

export type PinCellProps = {} & CodeInputRenderCellOptions;

export const PinCell = (props: PinCellProps) => {
  const { index, isFocused, isLastIndex, getCellOnLayoutHandler, symbol } =
    props;

  const isFilled = symbol !== "";

  return (
    <View
      style={{
        height: 48,
        width: 48,
        borderWidth: 1,
        borderColor: isFocused ? "blue" : "red",
        borderRadius: 48,
        backgroundColor: isFilled ? "red" : undefined,
      }}
      onLayout={getCellOnLayoutHandler(index)}
    />
  );
};
