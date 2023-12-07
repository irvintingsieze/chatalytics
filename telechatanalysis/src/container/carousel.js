import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import TotalMessageSummary from "../component/totalMessageSummary";
import MessagesOverMonths from "../component/MessagesOverMonths";
import Homepage from "../component/Homepage";
import TotalQuestionSummary from "../component/TotalQuestionsSummary";
import GoldenWords from "../component/GoldenWords";
import CapitalWords from "../component/CapitalWords";
import WordCloud from "../component/WordCloud";
import SentimentAnalysis from "../component/SentimentAnalysis";
import NGramExploration from "../component/NGramExploration";
import axios from "axios";
import { isMobile } from "../Constant/Constants";
export default function Carousel() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {" "}
        {activeStep === 0 && <Homepage />}
        {activeStep === 1 && <TotalMessageSummary />}
        {activeStep === 2 && <MessagesOverMonths />}
        {activeStep === 3 && <TotalQuestionSummary />}
        {activeStep === 4 && <CapitalWords />}
        {activeStep === 5 && <WordCloud />}
      </div>
      <MobileStepper
        variant="progress"
        steps={6}
        position="static"
        activeStep={activeStep}
        sx={{ maxWidth: "100vw", flexGrow: 1 }}
        nextButton={
          <Button size="small" onClick={handleNext} disabled={activeStep === 5}>
            Next
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </div>
  );
}
