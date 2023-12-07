import Lottie from "react-lottie";
import LandingAnimation from "./../assets/background.json";
import Typewriter from "./Typewriter";
import axios from "axios";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { useState, useRef } from "react";
export default function Homepage() {
  const [fileInput, setFileInput] = useState(null);
  const files = useRef(null);
  const [names, setNames] = useState("________");
  const cuteTextOptions = {
    loop: true,
    autoplay: true,
    animationData: LandingAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const handleFileChange = async (event) => {
    console.log(event);
    setFileInput(event.target.files[0]);
    files.current = event.target.files[0];
    handleFileUpload(event.target.files[0]);
  };
  const handleFileUpload = async () => {
    const formData = new FormData();
    formData.append("file", files.current);
    const config = {
      url: "http://localhost:5000/fileUpload",
      method: "post",
      data: formData,
    };
    const res = await axios(config)
      .then((response) => {
        console.log(response);
        localStorage.setItem(
          "person1",
          response.data["person1"].replace(" ", "")
        );
        localStorage.setItem(
          "person2",
          response.data["person2"].replace(" ", "")
        );
        setNames(response.data["person1"] + ", " + response.data["person2"]);
      })
      .catch((error) => {
        console.error(error);
      });

    console.log(res);
  };
  const introText =
    "Hey there! Welcome to chat analytics. Let's explore our texting patterns tgt! ";
  return (
    <div>
      <h1 style={{ textAlign: "center", fontFamily: "monospace" }}>
        Analysis with {names}
      </h1>
      <form style={{ display: "flex", justifyContent: "center" }}>
        <TextField
          type="file"
          onClick={handleFileChange}
          onChange={handleFileChange}
        />
        <Button
          variant="contained"
          color="primary"
          component="span"
          onClick={handleFileUpload}
        >
          Upload
        </Button>
      </form>
      <Lottie options={cuteTextOptions} height={300} width={300} />;
      <h1>
        <Typewriter text={introText} delay={100} />
      </h1>
    </div>
  );
}
