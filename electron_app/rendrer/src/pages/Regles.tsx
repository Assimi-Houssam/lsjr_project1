import {useState } from "react";
import Question from "../components/Question";
import Answers from "../components/Answears";

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
  questions: (boolean | null)[];
  title: string;
  choices: Choices;
  regleIndex?: number;
  onRuleComplete?: (success: boolean) => void;
  onRulePrevious?: () => void;
}

export default function Regles({
  title,
  choices,
  onRuleComplete,
  onRulePrevious,
}: Props) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);




  const handleNext = () => {
    // Move to next question
    if (currentQuestionIndex < choices.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
        setCurrentQuestionIndex(0);
        onRuleComplete?.(true);
    }
  };

  const handlePrevious = () => {
    // Move to previous question
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }else {
        setCurrentQuestionIndex(0);
        onRulePrevious?.();
    }

  }

  const currentQuestion = choices[currentQuestionIndex];
  console.log("Rendering question", currentQuestionIndex, currentQuestion);

  return (
    <div className="p-4 h-full max-h-screen overflow-y-auto">
      <h1 className="text-2xl font-bold mb-4 flex justify-center">{title}</h1>

      <Question
        title={currentQuestion.title}
        imageUrl={currentQuestion.imageUrl}
        questionNumber={currentQuestion.questionNumber}
      />
      <Answers
        choices={currentQuestion.choice}
        onNext={handleNext}
        onPrevious={handlePrevious}
        questionNumber={currentQuestion.questionNumber}
      />
    </div>
  );
}
