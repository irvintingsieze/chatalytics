import { BarChart } from "@mui/x-charts/BarChart";
import Lottie from "react-lottie";
import "./component.css";
import questions from "../assets/questions.json";
import { isMobile } from "../Constant/Constants";
import { useState, useEffect } from "react";
import axios from "axios";
import Loading from "./Loading";
export default function TotalQuestionsSummary() {
  const [personOneMessageCount, setPersonOneMessageCount] = useState({});
  const [personTwoMessageCount, setPersonTwoMessageCount] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getTotalMessageCounts();
  }, []);

  const getTotalMessageCounts = async () => {
    const res1 = await axios.get(
      `http://localhost:5000/questions/${localStorage.getItem("person1")}`
    );
    const res2 = await axios.get(
      `http://localhost:5000/questions/${localStorage.getItem("person2")}`
    );
    setPersonOneMessageCount(res1.data);
    setPersonTwoMessageCount(res2.data);
    setIsLoading(false);
  };
  const chartSetting = {
    yAxis: [
      {
        label: "Count",
      },
    ],
    width: isMobile ? 400 : 500,
    height: 300,
  };
  const datasetWords = [
    {
      Name: localStorage.getItem("person1"),
      NumberOfQuestionMarks: personOneMessageCount["numQuestionMarks"],
    },
    {
      Name: localStorage.getItem("person2"),
      NumberOfQuestionMarks: personTwoMessageCount["numQuestionMarks"],
    },
  ];

  const cuteTextOptions = {
    loop: true,
    autoplay: true,
    animationData: questions,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  if (isLoading) return <Loading />;
  return (
    <div className="centralise">
      <h1 style={{ textAlign: "center", fontFamily: "monospace" }}>
        Analysis with {localStorage.getItem("person1")},{" "}
        {localStorage.getItem("person2")}
      </h1>
      <h4>
        Curious thoughts?? Here we can see who keeps the convo flowing with
        questions!
      </h4>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <BarChart
          dataset={datasetWords}
          xAxis={[{ scaleType: "band", dataKey: "Name" }]}
          series={[
            {
              dataKey: "NumberOfQuestionMarks",
              label: "Number of Question Marks",
            },
          ]}
          {...chartSetting}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ paddingTop: "20px" }}>
          <div>
            Number of question marks ({localStorage.getItem("person1")}):
            {personOneMessageCount["numQuestionMarks"]}
          </div>
          <div>
            Number of question marks ({localStorage.getItem("person2")}):
            {personTwoMessageCount["numQuestionMarks"]}
          </div>
          <div>
            Number of 4W1H ({localStorage.getItem("person1")}):
            {personOneMessageCount["numFiveWOneH"]}
          </div>
          <div>
            Number of 4W1H ({localStorage.getItem("person2")}):
            {personTwoMessageCount["numFiveWOneH"]}
          </div>
        </div>
        <Lottie
          options={cuteTextOptions}
          height={100}
          width={isMobile ? 100 : 150}
        />
      </div>
    </div>
  );
}
