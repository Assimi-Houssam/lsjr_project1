import { useState } from "react";
import Regles from "../pages/Regles";
import Define from "../pages/Define";
import { choices } from "../utils/Corected1";
import { titles } from "../utils/titles";

export type Answer = boolean | null;

type Motif = "" | "Absence" | "Retard" | "Maladie";

export interface define {
  name: string;
  company: string;
  cin: string;
  motif: Motif;
}

function Quiz() {
  // const QUESTIONS_PER_RULE = [4, 14, 4,6,9,6,7,8,4,6];
  const QUESTIONS_PER_RULE = [4, 14];
  // initialize with `null` (unanswered). each sub-array can have different length.
  const [rules, setRules] = useState<Answer[][]>(() =>
    QUESTIONS_PER_RULE.map((count) => Array(count).fill(false))
  );
  const [dfine, setDefine] = useState<define>({
    name: "",
    company: "",
    cin: "",
    motif: "",
  });

  const [currentRuleIndex, setCurrentRuleIndex] = useState(-1);

  const setAnswer = (
    ruleIndex: number,
    qIndex: number,
    value: boolean
  ): Promise<Answer[][]> => {
    console.log("Set answer:", ruleIndex, qIndex, value);
    return new Promise<Answer[][]>((resolve) => {
      setRules((prev) => {
        const copy = prev.map((row) => row.slice());
        copy[ruleIndex][qIndex] = value;
        resolve(copy);
        return copy;
      });
    });
  };

  const handleRuleComplete = (success: boolean) => {
    console.log(
      `Rule ${currentRuleIndex + 1} completed with success: ${success}`
    );

    // Move to next rule if available
    if (currentRuleIndex < QUESTIONS_PER_RULE.length - 1) {
      setCurrentRuleIndex((prev) => {
        const next = prev + 1;
        console.log("Moving to next rule", next);
        return next;
      });
    } else {
      // All rules completed
      //    setCurrentRuleIndex((prev) => {
      //   const next = prev + 1;
      //   return next;
      // });

      console.log("All rules completed!");
    }
  };

  return (
    <>
      {currentRuleIndex == -1 ? (
        <Define
          onStart={(data) => {
            setDefine(data);
            setCurrentRuleIndex(0);
          }}
        />
      ) : currentRuleIndex < QUESTIONS_PER_RULE.length ? (
        <Regles
          setAnswer={setAnswer}
          questions={rules[currentRuleIndex]}
          title={titles[currentRuleIndex]}
          choices={choices[currentRuleIndex] as unknown as any}
          regleIndex={currentRuleIndex + 1}
          onRuleComplete={handleRuleComplete}
        />
      ) : (
        <div className="p-4 flex justify-center items-center min-h-screen">
          the next qcm
        </div>
      )}
    </>
  );
}

export default Quiz;
