import React, { useState, useEffect, useMemo } from "react";
import useInterval from "@/hooks/useInterval.jsx";
import "./index.scss";

const CountDown = (props) => {
  const {
    cls,
    stillNeed = 0,
    template = "dd:hh:mm:ss",
    content = { still: `活动倒计时：${template}`, over: "活动已结束" },
  } = props;

  const [count, setCount] = useState(0);

  useEffect(() => {
    setCount(stillNeed);
  }, [stillNeed]);

  // 倒计时
  useInterval(
    () => {
      setCount((c) => c - 1);
    },
    count > 0 ? 1000 : null
  );

  const getTimeContent = useMemo(() => {
    if (count > 0) {
      let ms = count;
      // 距离活动开始小于一天
      const _day = 60 * 60 * 24;
      const _hour = 60 * 60;
      const _min = 60;
      let days = Math.floor(ms / _day);
      ms -= days * _day;
      let hours = Math.floor(ms / _hour);
      ms -= hours * _hour;
      let minutes = Math.floor(ms / _min);
      ms -= minutes * _min;
      let seconds = ms;
      let temp = content.still;

      temp = temp.replace("dd", `<em>${days}</em>`);
      temp = temp.replace("hh", `<em>${hours}</em>`);
      temp = temp.replace("mm", `<em>${minutes}</em>`);
      temp = temp.replace("ss", `<em>${seconds}</em>`);

      return { __html: temp };
    } else if (count === 0) {
      return { __html: content.over };
    } else {
      return { __html: content.still };
    }
  }, [count, content]);

  return (
    <div className={`count-down-wrap ${cls}`}>
      <span className="count" dangerouslySetInnerHTML={getTimeContent}></span>
    </div>
  );
};

export default CountDown;
