import { useState } from "react";

interface Choice {
  id: string;
  text: string;
  isCorrect: boolean;
}

interface Props {
  choices: Choice[];
  onNext?: () => void;
  onPrevious?: () => void;
  questionNumber: number;
}

export default function Answers({ choices, onNext, onPrevious, questionNumber }: Props) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  // Detect if any choice text contains Arabic characters
  const hasArabic = choices.some((choice) =>
    /[\u0600-\u06FF]/.test(choice.text)
  );

  const handleAnswerChange = (choiceId: string) => {
    setSelectedAnswer(choiceId);
  };

  const handleNext = () => {
    if (onNext) {
      onNext();
      setSelectedAnswer(null);
    }
  };

  const handlePrevious = () => {
    if (onPrevious) {
      onPrevious();
    }
  };

  const getChoiceStyle = (isSelected: boolean) => {
    return isSelected
      ? "bg-blue-100 border-blue-500"
      : "bg-white border-gray-300 hover:bg-gray-50";
  };

  const getCheckboxStyle = (isSelected: boolean) => {
    return isSelected ? "text-blue-600" : "text-gray-400";
  };

  return (
    <div
      className={`space-y-3 ${hasArabic ? "text-right" : "text-left"}`}
      style={{ direction: hasArabic ? "rtl" : "ltr" }}
    >
      {choices.map((choice, index) => {
        const isSelected = selectedAnswer === choice.id;
        const choiceStyle = getChoiceStyle(isSelected);
        const checkboxStyle = getCheckboxStyle(isSelected);

        return (
          <label
            key={choice.id}
            className={`flex items-center p-3 border-2 rounded-lg cursor-pointer transition-all duration-200 ${choiceStyle}`}
          >
            <input
              type="checkbox"
              name={`question-${questionNumber}`}
              checked={isSelected}
              onChange={() => handleAnswerChange(choice.id)}
              className={`w-5 h-5 rounded border-2 ${checkboxStyle} ${
                hasArabic ? "ml-3" : "mr-3"
              }`}
            />

            <div className="flex-1">
              <span className="font-medium text-sm text-gray-600">
                {String.fromCharCode(65 + index)}.
              </span>
              <span className={`ml-2 ${hasArabic ? "mr-2" : "ml-2"}`}>
                {choice.text}
              </span>
            </div>
          </label>
        );
      })}

      {/* Next Button */}
      <div className="mt-6 flex justify-between">
        <button
          onClick={handleNext}
          className={"px-6 py-2 rounded-lg font-medium transition-all    bg-blue-600 hover:bg-blue-700 text-white"}
        >
          Next
        </button>
              <button
          onClick={handlePrevious}
          className={"px-6 py-2 rounded-lg font-medium transition-all    bg-blue-600 hover:bg-blue-700 text-white"}
        >
          Previous
        </button>
      </div>
    </div>
  );
}
