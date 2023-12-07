import { BarChart } from "@mui/x-charts/BarChart";
import ReactWordcloud from "react-wordcloud";
import { useEffect, useState, Fragment } from "react";
import Loading from "./Loading";
import axios from "axios";
import "./component.css";
import { useGauge } from "use-gauge";
import { Arced } from "./ArcedProps";
export default function SentimentAnalysis() {
  const [personOneSentiment, setPersonOneSentiment] = useState(0);
  const [personTwoSentiment, setPersonTwoSentiment] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const getTotalMessageCountsOne = async () => {
    const res1 = await axios.get(
      `http://localhost:5000/sentiment/${localStorage.getItem("person1")}`
    );
    const res2 = await axios.get(
      `http://localhost:5000/sentiment/${localStorage.getItem("person2")}`
    );
    setPersonOneSentiment(res1.data["sentimentScore"]);
    setPersonTwoSentiment(res2.data["sentimentScore"]);
    setIsLoading(false);
  };

  useEffect(() => {
    getTotalMessageCountsOne();
  }, []);

  if (isLoading) return <Loading />;
  return (
    <div className="centralise">
      <h4>General Sentiment of the chat</h4>
    </div>
  );
}
