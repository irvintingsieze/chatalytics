import { LineChart } from "@mui/x-charts/LineChart";
import { isMobile } from "../Constant/Constants";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./Loading";
export default function MessagesOverMonths() {
  const [personOneMessageMonthly, setPersonOneMessageMonthly] = useState({});
  const [personTwoMessageMonthly, setPersonTwoMessageMonthly] = useState({});
  const [years, setYears] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getMonthlyMessageCounts();
  }, []);

  const getMonthlyMessageCounts = async () => {
    const res1 = await axios.get(
      `http://localhost:5000/monthly-text/${localStorage.getItem("person1")}`
    );
    const res2 = await axios.get(
      `http://localhost:5000/monthly-text/${localStorage.getItem("person2")}`
    );
    setPersonOneMessageMonthly(res1.data);
    setPersonTwoMessageMonthly(res2.data);
    let monthyears = Object.keys(res1.data);
    console.log(monthyears.length);
    monthyears.forEach((e) => {
      let year = Number(e.slice(0, 4));
      let month = Number(e.slice(5));
      console.log(year + "/" + month);
      years.push(new Date(year, month, 1));
      //years.push(new Date(Number(year), Number(month), 1));
    });
    setIsLoading(false);
  };

  const personOneCount = Object.values(personOneMessageMonthly);

  const personTwoCount = Object.values(personTwoMessageMonthly);

  if (isLoading) return <Loading />;
  return (
    <div>
      <h1 style={{ textAlign: "center", fontFamily: "monospace" }}>
        Analysis with {localStorage.getItem("person1")},{" "}
        {localStorage.getItem("person2")}
      </h1>
      <h4>
        Messaging Timeline. Which is the most active / least active months??
      </h4>
      <LineChart
        xAxis={[
          {
            id: "Months",
            data: years,
            scaleType: "time",
            valueFormatter: (date) =>
              date.getFullYear().toString() + "-" + date.getMonth().toString(),
          },
        ]}
        series={[
          {
            id: "PersonOne",
            label: "Number of Messages By " + localStorage.getItem("person1"),
            data: personOneCount,
            area: false,
            showMark: true,
          },
          {
            id: "PersonTwo",
            label: "Number of Messages By " + localStorage.getItem("person2"),
            data: personTwoCount,
            area: false,
            showMark: true,
          },
        ]}
        width={isMobile ? 400 : 500}
        height={400}
        margin={{ left: 70 }}
      />
    </div>
  );
}
