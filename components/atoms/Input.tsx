import { MaterialCommunityIcons } from "@expo/vector-icons";
import clsx from "clsx";
import React, { useCallback, useState } from "react";
import {
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";
import { tv } from "tailwind-variants";

type InputSize = "sm" | "md" | "lg";
type InputWidth = "full" | "half";
type InputVariant = "box" | "outline";

interface InputWithLabelProps extends TextInputProps {
  label?: string;
  size?: InputSize;
  width?: InputWidth;
  variant?: InputVariant;
  isPassword?: boolean;
  onValueChange?: (value: string) => void;
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
}

const inputStyles = tv({
  base: "rounded-lg flex-row items-center",
  variants: {
    variant: {
      box: "bg-swiggy-accent-light border-2 border-swiggy-primary",
      outline: "bg-transparent border-b border-gray-400",
    },
    size: {
      sm: "text-sm p-2",
      md: "text-base p-3",
      lg: "text-lg p-4",
    },
    width: {
      full: "w-full",
      half: "w-1/2",
    },
  },
  defaultVariants: {
    variant: "box",
    size: "md",
    width: "full",
  },
});

const Input: React.FC<InputWithLabelProps> = ({
  label,
  value,
  onValueChange,
  placeholder,
  size = "md",
  width = "full",
  variant = "box",
  isPassword = false,
  className,
  inputClassName,
  labelClassName,
  ...rest
}) => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  const [passwordVisible, setPasswordVisible] = useState(false);

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
    <View className={`my-3 ${className}`}>
      {label && (
        <Text
          className={clsx(
            "font-semibold mb-1",
            isDarkMode ? "text-white" : "text-primary-500",
            labelClassName
          )}
        >
          {label}
        </Text>
      )}
      <View className={inputStyles({ variant, size })}>
        <TextInput
          className={clsx("flex-1 text-swiggy-text", inputClassName)}
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
