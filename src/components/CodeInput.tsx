import { forwardRef, memo, Ref } from "react";
import { LayoutChangeEvent, TextInput, View } from "react-native";
import {
  CodeField,
  CodeFieldProps,
  RenderCellOptions,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";

const DEFAULT_CELL_COUNT = 6;

export type CodeInputRenderCellOptions = RenderCellOptions & {
  getCellOnLayoutHandler: (index: number) => (event: LayoutChangeEvent) => void;
  isLastIndex: boolean;
};

export type CodeInputProps = {
  renderCell: (cellOptions: CodeInputRenderCellOptions) => React.ReactNode;
  onFulfill?: (value: string) => void;
  errorMessage?: string;
  editable?: boolean;
} & Required<Pick<CodeFieldProps, "onChangeText" | "value">> &
  Pick<CodeFieldProps, "cellCount" | "editable">;

const CodeInputBase = (props: CodeInputProps, ref: Ref<TextInput>) => {
  const {
    value,
    onChangeText,
    onFulfill,
    cellCount = DEFAULT_CELL_COUNT,
    renderCell,
    editable = true,
  } = props;
  // narrow down ref
  if (typeof ref === "function") {
    // ref is of type RefCallback<TextInput>
    // Handle RefCallback case
    // Example: ref(textInputRef)
  } else if (ref !== null && typeof ref === "object") {
    // ref is of type RefObject<TextInput>
    // Handle RefObject case
    // Example: ref.current = textInputRef
  } else {
    // ref is null
    // Handle null case
    // Example: no ref available
  }

  const [clearByFocusCellProps, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue: onChangeText,
  });

  return (
    <View pointerEvents={editable ? "auto" : "none"}>
      <CodeField
        {...clearByFocusCellProps}
        ref={ref}
        rootStyle={{ justifyContent: "center" }}
        value={value}
        onChangeText={(text) => {
          if (text.length === cellCount) {
            onFulfill?.(text);
          }

          onChangeText(text);
        }}
        cellCount={cellCount}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={(cellOptions) =>
          renderCell({
            ...cellOptions,
            getCellOnLayoutHandler,
            isLastIndex: cellOptions.index === cellCount - 1,
          })
        }
      />
    </View>
  );
};

export const CodeInput = memo(forwardRef(CodeInputBase));
