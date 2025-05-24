import clsx from "clsx";
import React from "react";
import { GestureResponderEvent, Text, TouchableOpacity } from "react-native";

type ButtonVariant = "primary" | "secondary" | "tertiary" | "isWhite";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  title: string;
  onPress?: (event: GestureResponderEvent) => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  halfWidth?: boolean;
  className?: string;
  textClassName?: string;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = "primary",
  size = "md",
  fullWidth = false,
  halfWidth = false,
  className = "",
  textClassName = "",
}) => {
  const getButtonStyle = (): string => {
    switch (variant) {
      case "primary":
        return "bg-primary-500";
      case "secondary":
        return "bg-secondary-golden-500 ";
      case "tertiary":
        return "bg-tertiary-yellow-500";
      case "isWhite":
        return "bg-white border-primary-500 border";
      default:
        return "bg-primary-400";
    }
  };

  const getTextStyle = (): string => {
    switch (variant) {
      case "isWhite":
        return "text-primary-400";
      default:
        return "text-white";
    }
  };

  const getSizeStyle = (): string => {
    switch (size) {
      case "sm":
        return "px-3 py-2";
      case "lg":
        return "px-6 py-4";
      case "md":
      default:
        return "px-4 py-3";
    }
  };

  const getTextSize = (): string => {
    switch (size) {
      case "sm":
        return "text-sm";
      case "lg":
        return "text-lg";
      case "md":
      default:
        return "text-base";
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      className={clsx(
        "rounded-xl items-center",
        getButtonStyle(),
        getSizeStyle(),
        {
          "w-full": fullWidth,
          "w-1/2": halfWidth,
        },
        className
      )}
    >
      <Text
        className={clsx(
          "font-semibold",
          getTextStyle(),
          getTextSize(),
          textClassName
        )}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
