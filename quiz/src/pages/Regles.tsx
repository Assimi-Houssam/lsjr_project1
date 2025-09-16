import { useEffect, useState } from "react";
import Question from "../components/Question";
import Answers from "../components/Answears";
import type { Answer } from "../App";

interface ChoiceOption {
  id: string;
  text: string;
  isCorrect: boolean;
}

interface RuleQuestion {
  title: string;
  questionNumber: number;
  imageUrl: string;
  choice: ChoiceOption[];
}
type Choices = RuleQuestion[];

interface Props {
  setAnswer: (
    ruleIndex: number,
    qIndex: number,
    value: boolean
  ) => Promise<Answer[][]>;
  questions: (boolean | null)[];
  choices: Choices;
  title: string;
  regleIndex?: number;
  onRuleComplete?: (success: boolean) => void;
}

export default function Regles({
  setAnswer,
  questions,
  title,
  choices,
  regleIndex,
  onRuleComplete,
}: Props) {
  let rules = questions;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState<number[]>([]);
  const [retryCount, setRetryCount] = useState<number>(0);
  const [isRetryPhase, setIsRetryPhase] = useState(false);
  const [showFailureMessage, setShowFailureMessage] = useState(false);
  const [currentRetryIndex, setCurrentRetryIndex] = useState(0);

  useEffect(() => {

  }, [regleIndex, title]);



  const handleNext = async (
    _selectedAnswer: string | null,
    isCorrect: boolean
  ) => {
    const updatedRules = await setAnswer(
      regleIndex ? regleIndex - 1 : 0,
      currentQuestionIndex,
      isCorrect
    );
    rules = updatedRules[regleIndex ? regleIndex - 1 : 0];
    // Track wrong answers during first round
    if (!isRetryPhase && !isCorrect) {
      const newWrong = [...wrongAnswers, currentQuestionIndex];
      setWrongAnswers(newWrong);
    }
    if(isCorrect && isRetryPhase){
      const filteredWrong = wrongAnswers.filter(index => index !== currentQuestionIndex);
      setWrongAnswers(filteredWrong);
    }

    // Move to next question
    if (currentQuestionIndex < choices.length - 1 && !isRetryPhase) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const allCorrect = rules.every((answer) => answer === true);

      if (allCorrect) {
        // All correct - move to next rule
        console.log("All answers correct! Well done!");
        setIsRetryPhase(false);
        setWrongAnswers([]);
        setRetryCount(0);
        setCurrentRetryIndex(0);
        setShowFailureMessage(false);
        setCurrentQuestionIndex(0);
        onRuleComplete?.(true);
      } else {
        // There are wrong answers
        if (!isRetryPhase) {
          // Start retry phase
          setIsRetryPhase(true);
          setRetryCount(1);
          setCurrentQuestionIndex(wrongAnswers[0]);
          setShowFailureMessage(true);
        } else {
          // In retry phase - move to next wrong question
          if (currentRetryIndex < wrongAnswers.length - 1) {
            // Still have more wrong questions to retry
            setCurrentRetryIndex(currentRetryIndex + 1);
            setCurrentQuestionIndex(wrongAnswers[currentRetryIndex + 1]);
          } else {
            // Completed all wrong questions in this retry round
            const stillWrong = rules.some((answer) => answer === false);

            if (stillWrong && retryCount < 3) {
              // Start next retry round
              setRetryCount(retryCount + 1);
              setCurrentRetryIndex(0);
              setCurrentQuestionIndex(wrongAnswers[0]);
              setShowFailureMessage(true);
            } else {
              // All retries used or all correct now
              console.log("Final result after retries");
              const finalAllCorrect = rules.every((answer) => answer === true);
              setIsRetryPhase(false);
              setShowFailureMessage(false);
              setCurrentQuestionIndex(0);
              setWrongAnswers([]);
              setRetryCount(0);
              setCurrentRetryIndex(0);
              console.log("Final result after retries", finalAllCorrect);
              onRuleComplete?.(finalAllCorrect);
            }
          }
        }
      }
    }
  };

  const handleRetryStart = () => {
    setShowFailureMessage(false);
    setCurrentRetryIndex(0);
    // Start with first wrong answer
    if (wrongAnswers.length > 0) {
      setCurrentQuestionIndex(wrongAnswers[0]);
    }
  };

  if (showFailureMessage) {
    return (
      <div className="p-4 flex justify-center items-center min-h-screen">
        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg text-center">
          <h2 className="text-xl font-bold mb-2">
            You failed in règle {regleIndex} - Retry {retryCount}
          </h2>
          <button
            onClick={handleRetryStart}
            className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
          >
            Start Retry {retryCount}
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = choices[currentQuestionIndex];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 flex justify-center">{title}</h1>

      <Question
        title={currentQuestion.title}
        imageUrl={currentQuestion.imageUrl}
        questionNumber={currentQuestion.questionNumber}
      />

      <Answers
        choices={currentQuestion.choice}
        onNext={handleNext}
        questionNumber={currentQuestion.questionNumber}
      />
    </div>
  );
}
