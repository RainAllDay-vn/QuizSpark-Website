import {Button} from "@/components/ui/button";
import {Card, CardContent} from "@/components/ui/card";
import type {QuestionSectionProps} from "@/pages/practice_page/practice_section.tsx";
import {useEffect} from "react";
import MarkdownRenderer from "@/components/custom/markdown-renderer";

export default function SingleAnswerQuestionSection({
                                                      state,
                                                      handleSubmitAnswer,
                                                      handleNextQuestion,
                                                      handleCompletePractice,
                                                    }: QuestionSectionProps) {
  const {questions, currentQuestionIndex, encouragement} = state;
  const question = questions[currentQuestionIndex];
  const isLastQuestion = questions.length-1 === currentQuestionIndex;

  useEffect(() => {
    const handleKeyDown = async (e: KeyboardEvent) => {
      if (e.key >= '1' && e.key <= '9') {
        const answerIndex = parseInt(e.key) - 1;
        handleSubmitAnswer([answerIndex.toString()]);
      } else if (e.key === 'Enter') {
        if (!isLastQuestion) handleNextQuestion();
        else handleCompletePractice();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleSubmitAnswer, handleNextQuestion, handleCompletePractice, isLastQuestion]);

  let correctAnswer = -1;
  let userAnswer = -1;
  if (question.correctAnswer) {
    correctAnswer = parseInt(question.correctAnswer[0]);
  }
  if (question.userAnswer && question.userAnswer[0]) {
    userAnswer = parseInt(question.userAnswer[0]);
  }

  const calAnswerButtonStyle = (index: number) => {
    if (userAnswer==-1) return "";
    if (correctAnswer==-1){
      if (index===userAnswer) return "bg-purple-400";
      return "";
    }
    if (index===correctAnswer) return "bg-green-500 text-white border-green-600";
    if (index===userAnswer) return "bg-red-500 text-white border-red-600";
    return "";
  }

  return (
    <div className="flex-grow">
      <Card className="bg-gray-900/60 border border-gray-700 w-full text-white">
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center justify-between">
                <span className="bg-purple-500 text-sm px-3 py-1 rounded-full font-medium">
                  100 points
                </span>
          </div>

          {/* Question Tags */}
          {question.tags && question.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {question.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-blue-500/20 text-blue-300 text-xs px-2 py-1 rounded-md border border-blue-500/30"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="text-lg font-semibold"><MarkdownRenderer content={question.description} /></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
            {question.choices.map((option, index) => (
              <button
                key={index}
                onClick={() => handleSubmitAnswer([index.toString()])}
                disabled={question.userAnswer !== undefined} // prevent further clicks
                className={`border border-gray-700 rounded-xl px-4 py-3 text-left transition-all duration-150 hover:border-purple-400 
                  ${calAnswerButtonStyle(index)}`}
              ><span className="font-semibold mr-2">{String.fromCharCode(65 + index)}.</span>{" "}<MarkdownRenderer content={option} />
              </button>
            ))}
          </div>

          {/* Encouragement Message */}
          {encouragement && (
            <div className={`mt-4 p-3 rounded-lg text-center font-medium ${
              encouragement.type === "CORRECT"
                ? "bg-green-500/20 border border-green-500/30 text-green-300"
                : "bg-orange-500/20 border border-orange-500/30 text-orange-300"
            }`}>
              <span className="text-2xl mr-2">{encouragement.emoji}</span>
              {encouragement.message}
              <span className="text-2xl ml-2">{encouragement.emoji}</span>
            </div>
          )}

          <div className="flex justify-between items-center mt-6">
            <Button
              variant="outline" onClick={handleCompletePractice}
              className="border-gray-600 text-gray-300"
            >
              End Early
            </Button>
            {isLastQuestion && <Button className="bg-purple-600 hover:bg-purple-700 text-white px-6" onClick={handleCompletePractice}>
              Finish →
            </Button>}
            {!isLastQuestion && <Button className="bg-purple-600 hover:bg-purple-700 text-white px-6" onClick={handleNextQuestion}>
              Next →
            </Button>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}