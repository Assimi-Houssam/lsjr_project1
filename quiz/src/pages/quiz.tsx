import { useEffect, useState } from "react";
import Regles from "../pages/Regles";
import Define from "../pages/Define";
import { choices_ar, choices_fr } from "../utils/Corected1";

import { titles_ar, titles_fr } from "../utils/titles";

export type Answer = boolean | null;

type Motif = "" | "motif1" | "motif2" | "motif3";

export interface define {
  name: string;
  company: string;
  cin: string;
  motif: Motif;
}

function Quiz({ langue }: { langue: string }) {
  const [finished, setfinished] = useState(false);
  const choice = langue === "ar" ? choices_ar : choices_fr;
  const titles = langue === "ar" ? titles_ar : titles_fr;
  const QUESTIONS_PER_RULE1 = [4, 14, 4, 6, 9, 6, 7, 8, 4, 6, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
  const QUESTIONS_PER_RULE = [4];
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
  const [loading, setLoading] = useState(false);
  const urlParams = new URLSearchParams(window.location.search);
  const myParam = urlParams.get("sessionId");
  const url = window.location.origin;
  

  useEffect(() => {
    console.log("Current Rule:", rules);
  }, []);

  const fetchData = async (data: define) => {
    console.log("Fetching data with define:", data)
    setDefine(data);
    setCurrentRuleIndex(0);
    try {
      setLoading(true);
      const payload = {
        sessionId: myParam,
        define: data,
      };
      const response = await fetch(`${url}/participant-info`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (response.status === 200) {
        const respData = await response.json();
        console.log(respData.lsgr[0]);
        console.log(respData.otherqcm[0]);

        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (err) {
      console.error("Network or server error", err);
    }
  };

  const setAnswer = (
    ruleIndex: number,
    qIndex: number,
    value: boolean
  ): Promise<Answer[][]> => {

    return new Promise<Answer[][]>((resolve) => {
      setRules((prev) => {
        const copy = prev.map((row) => row.slice());
        copy[ruleIndex][qIndex] = value;
        resolve(copy);
        return copy;
      });
    });
  };

  const handleRuleComplete = async (
    updatedrules: Answer[][]
  ) => {
    // Move to next rule if available
    if (currentRuleIndex < QUESTIONS_PER_RULE.length - 1) {
      setCurrentRuleIndex((prev) => {
      const next = prev + 1;
        return next;
      });
    } else {
      const result = updatedrules.map((rule) =>
        rule.every((ans) => ans === true)
      );
      const lsgrresult =
        result.length >= 10 && result.slice(0, 10).every((r) => r === true);
      const otherqcmResult =
        result.length >= 20 && result.slice(10, 20).every((r) => r === true);
      const payload = {
        sessionId: myParam,
        define: _dfine,
        data: result,
        lsgrResult: lsgrresult ,
        otherqcmResult : otherqcmResult
      };
      await fetch(`${url}/submit-result`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then(async (response) => {
          if (response.status === 200) {

          } 
        })
        .catch((err) => {
          console.error("Network or server error", err);
        });
      console.log("All rules completed!");
      setfinished(true);
    }
  };

  if (loading) {
    return (
      <div className="p-4 flex justify-center items-center min-h-screen">
        <div className="text-xl font-bold">Loading...</div>
      </div>
    );
  } 

  return (
    <>
      {currentRuleIndex == -1 && !finished ? (
        <Define
          onStart={(data) => {
            fetchData(data);
          }}
        />
      ) : currentRuleIndex < QUESTIONS_PER_RULE.length && !finished ? (
        <Regles
          setAnswer={setAnswer}
          questions={rules[currentRuleIndex]}
          title={titles[currentRuleIndex]}
          choices={choice[currentRuleIndex] as unknown as any}
          regleIndex={currentRuleIndex + 1}
          onRuleComplete={handleRuleComplete}
          rule={rules}
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
