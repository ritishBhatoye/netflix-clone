import clsx from "clsx";
import React from "react";
import {
  ColorSchemeName,
  Text,
  TextInput,
  TextInputProps,
  useColorScheme,
  View,
} from "react-native";

type InputSize = "sm" | "md" | "lg";
type InputWidth = "full" | "half";
type InputVariant = "box" | "outline";

interface InputWithLabelProps extends TextInputProps {
  label?: string;
  size?: InputSize;
  width?: InputWidth;
  variant?: InputVariant;
}

const InputWithLabel: React.FC<InputWithLabelProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  size = "md",
  width = "full",
  variant = "box",
  ...rest
}) => {
  const colorScheme: ColorSchemeName = useColorScheme();
  const isDarkMode: boolean = colorScheme === "dark";

  const sizeStyles = {
    sm: "text-sm p-2",
    md: "text-base p-3",
    lg: "text-lg p-4",
  };

  const widthStyles = {
    full: "w-full",
    half: "w-1/2",
  };

  const variantStyles = {
    box: "bg-swiggy-accent-light border-2 border-swiggy-primary",
    outline: "bg-transparent border-b border-gray-400",
  };

  return (
    <View className={clsx("mb-4", widthStyles[width])}>
      {/* Label */}
      <Text
        className={clsx(
          "font-semibold mb-1",
          isDarkMode ? "text-white" : "text-primary-500"
        )}
      >
        {label}
      </Text>

      <View
        className={clsx("rounded-lg", variantStyles[variant], sizeStyles[size])}
      >
        <TextInput
          className={clsx("text-swiggy-text w-full", sizeStyles[size])}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          placeholderTextColor={isDarkMode ? "#CCCCCC" : "#333333"}
          {...rest}
        />
      </View>
    </View>
  );
};

export default InputWithLabel;
