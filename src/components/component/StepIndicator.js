import React from "react";
import "../../styles/stepIndicator.css";
import { useSelector } from "react-redux";

const steps = [
  "Profile Section",
  "Education Section",
  "Skill Section",
  "Mini Project",
  "Social Media Links",
];

const StepIndicator = () => {
  const currentStep = useSelector((state) => state.resume.currentStep);

  return (
    <div className="step-indicator">
      {steps.map((step, index) => (
        <div key={index} className="step-wrapper">
          <div
            className={`step-circle ${
              currentStep === index + 1 ? "active" : ""
            }`}
          >
            {index + 1}
          </div>
          <p className={`step-label ${currentStep === index + 1 ? "highlight" : ""}`}>
            {step}
          </p>
          {index < steps.length - 1 && <div className="step-line"></div>}
        </div>
      ))}
    </div>
  );
};

export default StepIndicator;
