// Gradient color combinations for the hero banner
export const gradientCombinations = [
  // Dark classic
  [
    "rgba(0,0,0,0)",
    "rgba(0,0,0,0.3)",
    "rgba(0,0,0,0.5)",
    "rgba(0,0,0,0.98)"
  ] as const,
  // Deep blue
  [
    "rgba(0,0,0,0)",
    "rgba(13,27,42,0.3)",
    "rgba(13,27,42,0.6)",
    "rgba(13,27,42,0.98)"
  ] as const,
  // Purple haze
  [
    "rgba(0,0,0,0)",
    "rgba(30,13,42,0.3)",
    "rgba(30,13,42,0.6)",
    "rgba(30,13,42,0.98)"
  ] as const,
  // Deep red
  [
    "rgba(0,0,0,0)",
    "rgba(42,13,13,0.3)",
    "rgba(42,13,13,0.6)",
    "rgba(42,13,13,0.98)"
  ] as const,
  // Teal dark
  [
    "rgba(0,0,0,0)",
    "rgba(13,42,42,0.3)",
    "rgba(13,42,42,0.6)",
    "rgba(13,42,42,0.98)"
  ] as const,
  // Navy blue
  [
    "rgba(0,0,0,0)",
    "rgba(10,20,40,0.3)",
    "rgba(10,20,40,0.6)",
    "rgba(10,20,40,0.98)"
  ] as const,
  // Charcoal
  [
    "rgba(0,0,0,0)",
    "rgba(20,20,25,0.3)",
    "rgba(20,20,25,0.6)",
    "rgba(20,20,25,0.98)"
  ] as const,
  // Deep green
  [
    "rgba(0,0,0,0)",
    "rgba(13,30,13,0.3)",
    "rgba(13,30,13,0.6)",
    "rgba(13,30,13,0.98)"
  ] as const
] as const;

export const getRandomGradient = () => {
  const randomIndex = Math.floor(Math.random() * gradientCombinations.length);
  return gradientCombinations[randomIndex];
};
