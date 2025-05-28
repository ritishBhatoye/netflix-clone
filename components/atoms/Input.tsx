import { MaterialCommunityIcons } from "@expo/vector-icons";
import clsx from "clsx";
import React, { useCallback, useState } from "react";
import {
  ColorSchemeName,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

type InputSize = "sm" | "md" | "lg";
type InputWidth = "full" | "half";
type InputVariant = "box" | "outline";

interface InputWithLabelProps extends TextInputProps {
  label: string;
  size?: InputSize;
  width?: InputWidth;
  variant?: InputVariant;
  isPassword?: boolean;
  onValueChange?: (value: string) => void;
}

const Input: React.FC<InputWithLabelProps> = ({
  label,
  value,
  onValueChange,
  placeholder,
  size = "md",
  width = "full",
  variant = "box",
  isPassword = false,
  ...rest
}) => {
  const colorScheme: ColorSchemeName = useColorScheme();
  const isDarkMode: boolean = colorScheme === "dark";

  const [passwordVisible, setPasswordVisible] = useState(false);

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

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleTextChange = useCallback(
    (text: string) => {
      if (onValueChange) {
        onValueChange(text);
      }
    },
    [onValueChange]
  );

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
        className={clsx(
          "rounded-lg flex-row items-center",
          variantStyles[variant],
          sizeStyles[size]
        )}
      >
        <TextInput
          className={clsx("flex-1 text-swiggy-text", sizeStyles[size])}
          value={value}
          onChangeText={handleTextChange}
          placeholder={placeholder}
          secureTextEntry={isPassword && !passwordVisible}
          placeholderTextColor={isDarkMode ? "#CCCCCC" : "#333333"}
          {...rest}
        />
        {isPassword && (
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <MaterialCommunityIcons
              name={passwordVisible ? "eye-off" : "eye"}
              size={24}
              color={isDarkMode ? "#FFFFFF" : "#000000"}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Input;
