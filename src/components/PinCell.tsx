import { View } from "react-native";
import { CodeInputRenderCellOptions } from "./CodeInput";

export type PinCellProps = {} & CodeInputRenderCellOptions;

export const PinCell = (props: PinCellProps) => {
  const { index, isFocused, isLastIndex, getCellOnLayoutHandler, symbol } =
    props;

  return (
    <View
      style={{ height: 48, width: 48, borderWidth: 1, borderColor: "red" }}
    />
  );
};
