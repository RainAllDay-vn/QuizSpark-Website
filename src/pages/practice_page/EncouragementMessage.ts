interface EncouragementMessage {
  type: "CORRECT"|"INCORRECT";
  message: string;
  emoji: string;
}

const correctMessages: EncouragementMessage[] = [
  { type: "CORRECT", message: "Excellent! You got it right!", emoji: "🎉" },
  { type: "CORRECT", message: "Perfect! Well done!", emoji: "🌟" },
  { type: "CORRECT", message: "Awesome! Keep it up!", emoji: "🎊" },
  { type: "CORRECT", message: "Brilliant! You nailed it!", emoji: "✨" },
  { type: "CORRECT", message: "Fantastic! Great job!", emoji: "🏆" }
];

const wrongMessages: EncouragementMessage[] = [
  { type: "INCORRECT", message: "Not quite, but keep trying!", emoji: "💪" },
  { type: "INCORRECT", message: "Almost there! Don't give up!", emoji: "🌈" },
  { type: "INCORRECT", message: "Learning opportunity! Try again!", emoji: "📚" },
  { type: "INCORRECT", message: "Mistakes help us grow! Keep going!", emoji: "🌱" },
  { type: "INCORRECT", message: "Every attempt is progress!", emoji: "💡" }
];

export type {EncouragementMessage}
export {correctMessages, wrongMessages}