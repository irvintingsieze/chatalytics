import LoadingAnimation from "./../assets/loading.json";
import Lottie from "react-lottie";
import { isMobile } from "../Constant/Constants";
export default function Loading() {
  const loadingOptions = {
    loop: true,
    autoplay: true,
    animationData: LoadingAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <Lottie
      options={loadingOptions}
      height={300}
      width={isMobile ? 300 : 500}
    />
  );
}
