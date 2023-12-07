import ReactWordcloud from "react-wordcloud";
import { useEffect, useState } from "react";
import axios from "axios";
import "./component.css";
import Loading from "./Loading";
export default function WordCloud() {
  const [personOneMessageCount, setPersonOneMessageCount] = useState({});
  const [personTwoMessageCount, setPersonTwoMessageCount] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const getTotalMessageCountsOne = async () => {
    const res1 = await axios.get(
      `http://localhost:5000/wordcloud/${localStorage.getItem("person1")}`
    );
    const res2 = await axios.get(
      `http://localhost:5000/wordcloud/${localStorage.getItem("person2")}`
    );
    let one = [];
    let two = [];
    for (const [key, value] of Object.entries(res1.data)) {
      one.push({ text: key, value: value });
    }
    for (const [key, value] of Object.entries(res2.data)) {
      two.push({ text: key, value: value });
    }
    console.log(one);
    setPersonOneMessageCount(one);
    setPersonTwoMessageCount(two);
    setIsLoading(false);
  };

  useEffect(() => {
    getTotalMessageCountsOne();
  }, []);

  if (isLoading) return <Loading />;
  return (
    <div className="centralise" style={{ textAlign: "center" }}>
      <h1 style={{ textAlign: "center", fontFamily: "monospace" }}>
        Analysis with {localStorage.getItem("person1")},{" "}
        {localStorage.getItem("person2")}
      </h1>
      <h4>wordcloud here hehe</h4>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <ReactWordcloud size={[600, 400]} words={personOneMessageCount} />
          <h2>{localStorage.getItem("person1")}</h2>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <ReactWordcloud size={[600, 400]} words={personTwoMessageCount} />
          <h2>{localStorage.getItem("person2")}</h2>
        </div>
      </div>
    </div>
  );
}
