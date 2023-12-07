import { BarChart } from "@mui/x-charts/BarChart";
import ReactWordcloud from "react-wordcloud";

import "./component.css";
export default function NGramExploration() {
  const words = [
    {
      text: "see",
      value: 678,
    },
    {
      text: "also",
      value: 1128,
    },
    {
      text: "like",
      value: 1174,
    },
    {
      text: "haha",
      value: 1549,
    },
    {
      text: "hahaha",
      value: 1746,
    },
    {
      text: "think",
      value: 647,
    },
    {
      text: "hahah",
      value: 616,
    },
    {
      text: "go",
      value: 515,
    },
    {
      text: "yeah",
      value: 525,
    },
  ];
  return (
    <div className="centralise">
      <h4>Work in progress! Insert NGram Exploration</h4>
      <ReactWordcloud words={words} />
    </div>
  );
}
