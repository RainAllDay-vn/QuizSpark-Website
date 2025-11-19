interface EncouragementMessage {
  message: string;
  emoji: string;
}

const correctMessages: EncouragementMessage[] = [
  { message: "Excellent! You got it right!", emoji: "🎉" },
  { message: "Perfect! Well done!", emoji: "🌟" },
  { message: "Awesome! Keep it up!", emoji: "🎊" },
  { message: "Brilliant! You nailed it!", emoji: "✨" },
  { message: "Fantastic! Great job!", emoji: "🏆" }
];

const wrongMessages: EncouragementMessage[] = [
  { message: "Not quite, but keep trying!", emoji: "💪" },
  { message: "Almost there! Don't give up!", emoji: "🌈" },
  { message: "Learning opportunity! Try again!", emoji: "📚" },
  { message: "Mistakes help us grow! Keep going!", emoji: "🌱" },
  { message: "Every attempt is progress!", emoji: "💡" }
];

export type {EncouragementMessage}
export {correctMessages, wrongMessages}