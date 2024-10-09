import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import "./MultiStepPoll.scss";

const PollStep = ({
  title,
  onSelect,
  renderDots,
  isAnimating,
  isFinalPoll,
  finalData,
}) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelect = (option) => {
    setSelectedOption(option);
    onSelect(option); // Trigger the selection to notify the parent
  };

  const renderTooltip = (props, label) => (
    <Tooltip id="button-tooltip" {...props}>
      {label}
    </Tooltip>
  );

  return (
    <div className="poll-step-container">
      <div className="poll-step">
        <div className="poll-progress">{renderDots()}</div>
        {isFinalPoll ? (
          <div className="last-poll-output slide-in-left">
            {finalData?.map((detail, index) => (
              <div key={index} className="summary-item">
                <strong>{detail.question}</strong>: {detail.answer}
              </div>
            ))}
          </div>
        ) : (
          <h2
            className={`poll-transition ${
              isAnimating ? "slide-out" : "slide-in"
            }`}
            data-testid="poll-step"
          >
            {title}
          </h2>
        )}
      </div>

      {!isFinalPoll && (
        <Row className="justify-content-center my-4 poll-options">
          <Col xs="auto">
            <OverlayTrigger
              placement="top"
              delay={{ show: 250, hide: 400 }}
              overlay={(props) => renderTooltip(props, "Great!")}
            >
              <Button
                variant={
                  selectedOption === "Great!" ? "primary" : "outline-secondary"
                }
                onClick={() => handleSelect("Great!")}
                className="poll-button"
              >
                &#128077;
              </Button>
            </OverlayTrigger>
          </Col>
          <Col xs="auto">
            <OverlayTrigger
              placement="top"
              delay={{ show: 250, hide: 400 }}
              overlay={(props) => renderTooltip(props, "Neutral")}
            >
              <Button
                variant={
                  selectedOption === "neutral" ? "primary" : "outline-secondary"
                }
                onClick={() => handleSelect("neutral")}
                className="poll-button"
              >
                &#129300;
              </Button>
            </OverlayTrigger>
          </Col>
          <Col xs="auto">
            <OverlayTrigger
              placement="top"
              delay={{ show: 250, hide: 400 }}
              overlay={(props) => renderTooltip(props, "Not Good")}
            >
              <Button
                variant={
                  selectedOption === "Not Good"
                    ? "primary"
                    : "outline-secondary"
                }
                onClick={() => handleSelect("Not Good")}
                className="poll-button"
              >
                &#128078;
              </Button>
            </OverlayTrigger>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default PollStep;
