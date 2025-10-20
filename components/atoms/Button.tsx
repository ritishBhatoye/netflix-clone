import clsx from "clsx";
import React, { ReactNode } from "react";
import { GestureResponderEvent, Text, TouchableOpacity } from "react-native";

type ButtonVariant = "primary" | "secondary" | "tertiary" | "isWhite";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps {
  label?: string; // optional now
  children?: ReactNode; // to support wrapping any content
  onPress?: (event: GestureResponderEvent) => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  halfWidth?: boolean;
  className?: string;
  textClassName?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  label,
  children,
  onPress,
  variant = "primary",
  size = "md",
  fullWidth = false,
  halfWidth = false,
  className = "",
  textClassName = "",
  disabled = false,
}) => {
  const getButtonStyle = (): string => {
    switch (variant) {
      case "primary":
        return "bg-primary-500";
      case "secondary":
        return "bg-secondary-100";
      case "tertiary":
        return "bg-tertiary-400";
      case "isWhite":
        return "bg-white border-white border";
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
      disabled={disabled}
      className={clsx(
        "rounded-md items-center justify-center flex-row", // flex-row to allow icon+text side by side
        getButtonStyle(),
        getSizeStyle(),
        {
          "w-full": fullWidth,
          "w-1/2": halfWidth,
          "opacity-50": disabled,
        },
        className
      )}
    >
      {children ? (
        children
      ) : label ? (
        <Text
          className={clsx(
            "font-semibold",
            getTextStyle(),
            getTextSize(),
            textClassName
          )}
        >
          {label}
        </Text>
      ) : null}
    </TouchableOpacity>
  );
};

export default Button;
