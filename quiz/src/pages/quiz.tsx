import { useState } from "react";
import Regles from "../pages/Regles";
import Define from "../pages/Define";
import { choices_ar , choices_fr } from "../utils/Corected1";

import { titles } from "../utils/titles";

export type Answer = boolean | null;

type Motif = "" | "motif1" | "motif2" | "motif3";

export interface define {
  name: string;
  company: string;
  cin: string;
  motif: Motif;
}

function Quiz( { langue }: { langue: string }) {
  const [finished ,setfinished] = useState(false);
  const choice = langue === 'ar' ? choices_ar :  choices_fr ;
  const QUESTIONS_PER_RULE1 = [4, 14, 4,6,9,6,7,8,4,6];
  const QUESTIONS_PER_RULE = [4];
  // initialize with `null` (unanswered). each sub-array can have different length.
  const [rules, setRules] = useState<Answer[][]>(() =>
    QUESTIONS_PER_RULE1.map((count) => Array(count).fill(false))
  );
  const [_dfine, setDefine] = useState<define>({
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

  const handleRuleComplete = async (success: boolean, updatedrules : Answer[][]) => {
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
      // add check for result submit if he fail give anither try or finish
      const urlParams = new URLSearchParams(window.location.search);
      const myParam = urlParams.get("sessionId");
      const url  = window.location.origin;
      console.log("Current rules state:", rules);
      const result = updatedrules.map((rule) => rule.every((ans) => ans === true));
      console.log('url',url);

      const payload = {
        sessionId: myParam,
        define: _dfine,
        data: result,
      };

      console.log("Payload JSON:", JSON.stringify(payload));

      await fetch(`${url}/submit-result`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
        });



      // await fetch("http://172.28.116.14:3000/submit-result", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(payload),
      // })
      //   .then((response) => response.json())
      //   .then((data) => {
      //     console.log("Success:", data);
      //   });
      console.log("All rules completed!");
      setfinished(true);
    }
  };

  return (
    <>
      {currentRuleIndex == -1 && !finished ? (
        <Define
          onStart={(data) => {
            setDefine(data);
            setCurrentRuleIndex(0);
          }}
        />
      ) : (currentRuleIndex < QUESTIONS_PER_RULE.length)  && !finished ? (
        <Regles
          setAnswer={setAnswer}
          questions={rules[currentRuleIndex]}
          title={titles[currentRuleIndex]}
          choices={choice[currentRuleIndex] as unknown as any}
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

