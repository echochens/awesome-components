import "./App.scss";
import ShareHeader from "@/components/ShareHeader";
import Carousel from "@/components/Carousel";
import CountDown from "@/components/CountDown";
import { useRef, useState } from "react";

function App() {
  const shareRef = useRef();

  return (
    <div className="App">
      <ShareHeader ref={shareRef} />
      <div className="carousel-wrapper">
        <Carousel />
      </div>
      <CountDown
        stillNeed={60}
        template={`dd DAYS: hh HOURS: mm MINS: ss SECS`}
      />
      <div className="cdn"></div>
    </div>
  );
}

export default App;
