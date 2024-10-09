import React, { useState } from "react";
import { Container } from "react-bootstrap";
import PollStep from "./MultiStepPollComponent";
import "./MultiStepPoll.scss";

const PollContainer = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [finalData, setFinalData] = useState([]); // Stores question-answer pairs
  const [isAnimating, setIsAnimating] = useState(false);
  const [isFinalPoll, setIsFinalPoll] = useState(false);

  const questions = [
    "How was your week overall?",
    "How was your productivity?",
    "How was your health?",
    "What is your overall level of satisfaction with this week?",
  ];

  const handleSelectOption = (option) => {
    const updatedAnswers = [...answers];
    updatedAnswers[step] = option;
    setAnswers(updatedAnswers);
    const updatedFinalData = [...finalData];
    updatedFinalData[step] = {
      question: questions[step],
      answer: option,
    };
    setFinalData(updatedFinalData);

    // Start the animation
    setIsAnimating(true);
    // Move to the next step or submit final data if it's the last step
    setTimeout(() => {
      nextStep(updatedFinalData);
    }, 500); // Match this delay with your CSS transition duration
  };

  const nextStep = (updatedFinalData) => {
    if (step < questions.length - 1) {
      setStep(step + 1);
      setIsAnimating(false); // Reset animation state
    } else {
      // Final step, submit the data

      submitFinalData(updatedFinalData);
      setStep(step + 1);
      setIsFinalPoll(true);
    }
  };

  const submitFinalData = async (dataToSubmit) => {
    try {
      const response = await fetch(
        "https://6705e9cb031fd46a831159a5.mockapi.io/api/submit-poll",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSubmit),
        }
      );

      if (response?.ok) {
        alert("Your Poll is submitted successfully!");
      } else {
        alert("Your Poll is not submitted successfully!");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const renderDots = () => {
    return (
      <div className="dots-container">
        {questions?.map((_, index) => (
          <div
            key={index}
            data-testid={`dot-${index}`} 
            role="presentation"
            className={`dot ${index === step ? "filled" : ""}`}
          />
        ))}
        <div
          data-testid="final-dot" 
          role="presentation"
          className={`dot ${step === questions.length ? "filled" : ""}`}
        />
      </div>
    );
  };
  return (
    <div className="poll-container" data-testid="poll-container">
      <div className={`poll-step-container`}>
        <PollStep
         data-testid="poll-step" 
          title={!isFinalPoll ? questions[step] : ""}
          onSelect={handleSelectOption}
          renderDots={renderDots}
          isAnimating={isAnimating}
          isFinalPoll={isFinalPoll}
          finalData={finalData}
        />
      </div>
    </div>
  );
};

export default PollContainer;
