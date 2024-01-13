import { useParams } from "react-router-dom";
import { useUserContext } from "../../context/useUserContext";

import { Progress } from "antd";

import { useState } from "react";
import PubSteps from "./PubSteps";

export default function CreatePublication() {
  const [percent, setPercent] = useState<number>(0);
  const [step, setStep] = useState<number>(0);
  const { user, company } = useUserContext();
  const { publicationType } = useParams();
  console.log(company);
  const increase = () => {
    setPercent((prevPercent) => {
      const newPercent = prevPercent + 25;
      setStep((step) => (step === 4 ? step : step + 1));
      if (newPercent > 100) {
        return 100;
      }
      return newPercent;
    });
  };

  const decline = () => {
    setPercent((prevPercent) => {
      const newPercent = prevPercent - 25;
      setStep((step) => (step === 0 ? step : step - 1));
      if (newPercent < 0) {
        return 0;
      }
      return newPercent;
    });
  };

  return (
    <div className="max-w-[1920px] w-full flex flex-col justify-center items-center">
      <h1 className="text-2xl text-primary-600 font-semibold py-10">
        გამოაქვეყნე {publicationType === "Standart" ? "სტანდარტული" : "VIP"}{" "}
        განცხადება
      </h1>
      <>
        <div style={{ marginBottom: 10 }}>
          {/* <Progress percent={percent} /> */}
          <Progress type="circle" percent={percent} />
        </div>
      </>
      <PubSteps
        step={step}
        company={company}
        user={user}
        increase={increase}
        decline={decline}
      />
    </div>
  );
}
