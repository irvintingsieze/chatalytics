import { BarChart } from "@mui/x-charts/BarChart";
import Lottie from "react-lottie";
import "./component.css";
import kind from "./../assets/kind.json";
import { isMobile } from "../Constant/Constants";
export default function GoldenWords() {
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
      Name: "Rachel",
      NumberOfSorries: 32,
    },
    {
      Name: "Irvin",
      NumberOfSorries: 10,
    },
  ];

  const datasetMessages = [
    {
      Name: "Rachel",
      NumberOfThanks: 167,
    },
    {
      Name: "Irvin",
      NumberOfThanks: 107,
    },
  ];
  const kindOptions = {
    loop: true,
    autoplay: true,
    animationData: kind,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="centralise">
      <h4>Good manners / Bad manners? How many golden words do we say</h4>
      <div
        style={{ display: "flex", flexDirection: isMobile ? "column" : "row" }}
      >
        <BarChart
          dataset={datasetWords}
          xAxis={[{ scaleType: "band", dataKey: "Name" }]}
          series={[{ dataKey: "NumberOfSorries", label: 'Number of "sorry"' }]}
          {...chartSetting}
        />
        <BarChart
          dataset={datasetMessages}
          xAxis={[{ scaleType: "band", dataKey: "Name" }]}
          series={[
            { dataKey: "NumberOfThanks", label: 'Number of "thank" yous' },
          ]}
          {...chartSetting}
        />
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div>
          <div>Number of sorries (Irvin):10</div>
          <div>Number of sorries marks (Rachel):32</div>
          <div>Number of thanks (Irvin):107</div>
          <div>Number of thanks (Rachel):167</div>
        </div>
        <Lottie
          options={kindOptions}
          height={100}
          width={isMobile ? 100 : 150}
        />
      </div>
    </div>
  );
}
