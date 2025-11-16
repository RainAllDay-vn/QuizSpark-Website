export type DadTone = 'impressed' | 'meh' | 'disappointed' | 'absolute_fail';

interface DadMessage {
  minAccuracy: number;
  maxAccuracy: number;
  messages: string[];
}

const smallQuizThreshold = 3; // small quizzes (<= 3 questions) get special treatment

// Messages categorized by tone and accuracy
const dadMessages: DadMessage[] = [
  {
    minAccuracy: 100,
    maxAccuracy: 100,
    messages: [
      "Finally… all {total}? Hmm… I am slightly impressed. But don’t get lazy.",
      "Perfect score? Don’t celebrate too much, it was just {total} questions."
    ]
  },
  {
    minAccuracy: 80,
    maxAccuracy: 99,
    messages: [
      "Only {correct} out of {total}? Hmph… I expected more. Study harder, son.",
      "Not bad, but {correct}/{total}? My eyebrows are not impressed."
    ]
  },
  {
    minAccuracy: 50,
    maxAccuracy: 79,
    messages: [
      "Out of {total}, you can only get {correct}? My neighbor’s kid can do better!",
      "{correct}/{total}? Really? You call this effort?"
    ]
  },
  {
    minAccuracy: 1,
    maxAccuracy: 49,
    messages: [
      "What is this? {correct} out of {total}? You disappoint me… even a snail can do better.",
      "{correct}/{total}? I would cry if it wasn’t so funny."
    ]
  },
  {
    minAccuracy: 0,
    maxAccuracy: 0,
    messages: [
      "Zero?! {correct}/{total}? Are you even trying?",
      "Nothing? Absolutely nothing? Disgraceful."
    ]
  }
];

// Special messages for very small quizzes
const smallQuizMessages = [
  "Only {total} questions? You still manage {correct}? Even my coffee break could do this.",
  "Wow, {total} questions… and {correct} correct. The struggle is real.",
  "This tiny quiz and you scored {correct}? Disappointing AND impressive in equal measure."
];

export function getResultReportQuote(correctAnswers: number, totalQuestions: number) {
  const accuracy = (correctAnswers / totalQuestions) * 100;

  let messages: string[];

  if (totalQuestions <= smallQuizThreshold) {
    messages = smallQuizMessages;
  } else {
    // Find the correct message tier
    const tier = dadMessages.find(d => accuracy >= d.minAccuracy && accuracy <= d.maxAccuracy);
    messages = tier ? tier.messages : ["Hmm… I have no words for this."];
  }

  // Pick a random message from the selected tier
  const randomIndex = Math.floor(Math.random() * messages.length);
  const selectedMessage = messages[randomIndex];

  // Replace placeholders
  const finalMessage = selectedMessage
    .replace("{correct}", correctAnswers.toString())
    .replace("{total}", totalQuestions.toString());

  return <>{finalMessage}</>;
}

