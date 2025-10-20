import { clsx } from "clsx";
import React, { useEffect, useMemo, useRef } from "react";
import {
  NativeSyntheticEvent,
  TextInput,
  TextInputKeyPressEventData,
  View,
} from "react-native";

interface OtpInputProps {
  length?: number;
  value: string;
  onChange: (next: string) => void;
  className?: string;
  inputClassName?: string;
}

export default function OtpInput({
  length = 6,
  value,
  onChange,
  className,
  inputClassName,
}: OtpInputProps) {
  const inputsRef = useRef<(TextInput | null)[]>([]);

  const characters = useMemo(() => {
    const chars = value.split("");
    const padded = Array.from({ length }, (_, i) => chars[i] ?? "");
    return padded;
  }, [value, length]);

  useEffect(() => {
    // Autofocus first box if empty
    if (!value && inputsRef.current[0]) {
      inputsRef.current[0].focus();
    }
  }, [value]);

  const handleChangeAtIndex = (text: string, index: number) => {
    const sanitized = text.replace(/\D/g, "");
    if (!sanitized) return;

    const nextChars = [...characters];
    // If user pasted multiple digits, fill sequentially
    for (let i = 0; i < sanitized.length && index + i < length; i++) {
      nextChars[index + i] = sanitized[i];
    }
    const nextValue = nextChars.join("").slice(0, length);
    onChange(nextValue);

    // Move focus to next appropriate box
    const nextIndex = Math.min(index + sanitized.length, length - 1);
    if (nextIndex !== index && inputsRef.current[nextIndex]) {
      inputsRef.current[nextIndex]?.focus();
    }
  };

  const handleKeyPress = (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number
  ) => {
    if (e.nativeEvent.key === "Backspace") {
      if (characters[index]) {
        // deleting current character
        const nextChars = [...characters];
        nextChars[index] = "";
        onChange(nextChars.join(""));
        return;
      }
      // move focus back if current empty
      const prevIndex = Math.max(index - 1, 0);
      if (inputsRef.current[prevIndex]) {
        inputsRef.current[prevIndex]?.focus();
        const nextChars = [...characters];
        nextChars[prevIndex] = "";
        onChange(nextChars.join(""));
      }
    }
  };

  return (
    <View
      className={clsx(
        "w-full flex-row items-center justify-center gap-2",
        className
      )}
    >
      {Array.from({ length }).map((_, index) => (
        <TextInput
          key={index}
          ref={(el) => {
            inputsRef.current[index] = el;
          }}
          value={characters[index]}
          onChangeText={(t) => handleChangeAtIndex(t, index)}
          onKeyPress={(e) => handleKeyPress(e, index)}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          maxLength={1}
          autoCapitalize="none"
          autoCorrect={false}
          className={clsx(
            "w-12 h-14 text-center text-2xl rounded-lg",
            "bg-tertiary-400/20 text-white border border-white/20",
            inputClassName
          )}
          selectionColor="#E50914"
          placeholder="-"
          placeholderTextColor="#888"
        />
      ))}
    </View>
  );
}
