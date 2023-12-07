import { BarChart } from "@mui/x-charts/BarChart";
import Lottie from "react-lottie";
import "./component.css";
import cutetext from "./../assets/cutetext.json";
import { isMobile } from "../Constant/Constants";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./Loading";
export default function TotalMessageSummary() {
  const [personOneMessageCount, setPersonOneMessageCount] = useState({});
  const [personTwoMessageCount, setPersonTwoMessageCount] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getTotalMessageCounts();
  }, []);

  const getTotalMessageCounts = async () => {
    const res1 = await axios.get(
      `http://localhost:5000/total-text/${localStorage.getItem("person1")}`
    );
    const res2 = await axios.get(
      `http://localhost:5000/total-text/${localStorage.getItem("person2")}`
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
      NumberOfWordsPerMessage: personOneMessageCount["averageNumWords"],
    },
    {
      Name: localStorage.getItem("person2"),
      NumberOfWordsPerMessage: personTwoMessageCount["averageNumWords"],
    },
  ];

  const datasetMessages = [
    {
      Name: localStorage.getItem("person1"),
      NumberOfMessages: personOneMessageCount["numOfMessages"],
    },
    {
      Name: localStorage.getItem("person2"),
      NumberOfMessages: personTwoMessageCount["numOfMessages"],
    },
  ];
  const cuteTextOptions = {
    loop: true,
    autoplay: true,
    animationData: cutetext,
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
      <h4>Talkative or Nah?</h4>
      <div
        style={{ display: "flex", flexDirection: isMobile ? "column" : "row" }}
      >
        <BarChart
          dataset={datasetWords}
          xAxis={[{ scaleType: "band", dataKey: "Name" }]}
          series={[
            { dataKey: "NumberOfWordsPerMessage", label: "Words Per Message" },
          ]}
          {...chartSetting}
        />
        <BarChart
          dataset={datasetMessages}
          xAxis={[{ scaleType: "band", dataKey: "Name" }]}
          series={[
            { dataKey: "NumberOfMessages", label: "Number of Messages" },
          ]}
          {...chartSetting}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div>
          <div>
            Average number of word by {localStorage.getItem("person1")} per
            message:
            {personOneMessageCount["averageNumWords"]}
          </div>
          <div>
            Number of messages by {localStorage.getItem("person1")}:{" "}
            {personOneMessageCount["numOfMessages"]}
          </div>
          <div>
            Average number of word by {localStorage.getItem("person2")} per
            message:{personTwoMessageCount["averageNumWords"]}
          </div>
          <div>
            Number of messages by {localStorage.getItem("person2")}:{" "}
            {personTwoMessageCount["numOfMessages"]}
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
