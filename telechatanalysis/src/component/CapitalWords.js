import { BarChart } from "@mui/x-charts/BarChart";
import Lottie from "react-lottie";
import "./component.css";
import Loudspeaker from "../assets/loudspeaker.json";
import { isMobile } from "../Constant/Constants";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./Loading";
export default function CapitalWords() {
  const [personOneMessageCount, setPersonOneMessageCount] = useState({});
  const [personTwoMessageCount, setPersonTwoMessageCount] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getTotalMessageCounts();
  }, []);

  const getTotalMessageCounts = async () => {
    const res1 = await axios.get(
      `http://localhost:5000/uppercase/${localStorage.getItem("person1")}`
    );
    const res2 = await axios.get(
      `http://localhost:5000/uppercase/${localStorage.getItem("person2")}`
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
      PercentageOfCapWords: personOneMessageCount["uppercaseWords"],
    },
    {
      Name: localStorage.getItem("person2"),
      PercentageOfCapWords: personTwoMessageCount["uppercaseWords"],
    },
  ];

  const loudspeakerOptions = {
    loop: true,
    autoplay: true,
    animationData: Loudspeaker,
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
      <h4>Holler with me 😎 Who likes to use more LARGE caps?</h4>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <BarChart
          dataset={datasetWords}
          xAxis={[{ scaleType: "band", dataKey: "Name" }]}
          series={[
            {
              dataKey: "PercentageOfCapWords",
              label: "Number of words with caps",
            },
          ]}
          {...chartSetting}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ paddingTop: "20px" }}>
          <div>
            Number of capped words ({localStorage.getItem("person1")}):
            {personOneMessageCount["uppercaseWords"]}
          </div>
          <div>
            Number of capped words ({localStorage.getItem("person2")}):
            {personTwoMessageCount["uppercaseWords"]}
          </div>
        </div>
        <Lottie
          options={loudspeakerOptions}
          height={100}
          width={isMobile ? 100 : 150}
        />
      </div>
    </div>
  );
}
