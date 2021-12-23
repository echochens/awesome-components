import React, { useEffect, useMemo, useRef, useState } from "react";

import "./index.scss";

const list = [
  {
    prizeName: "Balão de Chat Bandeira",
    prizeId: "5197558061989890687",
    prizeImage:
      "http://fepublicty.tiyalive.com/activity/pt_independence_day/reward/flag.png",
    status: "pass",
    isGet: false,
  },
  {
    prizeName: "Avatar Bandeira",
    prizeId: "5197558061989890175",
    prizeImage:
      "http://fepublicty.tiyalive.com/activity/pt_independence_day/reward/flag_1.png",
    status: "pass",
    isGet: false,
  },
  {
    prizeName: "Avatar Cristo Redentor",
    prizeId: "5197558061989888639",
    prizeImage:
      "http://fepublicty.tiyalive.com/activity/pt_independence_day/reward/cristo_redentor_1.png",
    status: "pass",
    isGet: false,
  },
  {
    prizeName: "Balão de Chat Cristo Redentor",
    prizeId: "5197558061989888127",
    prizeImage:
      "http://fepublicty.tiyalive.com/activity/pt_independence_day/reward/cristo_redentor.png",
    status: "pass",
    isGet: false,
  },
  {
    prizeName: "Balão de Chat Independência",
    prizeId: "5197558061989889151",
    prizeImage:
      "http://fepublicty.tiyalive.com/activity/pt_independence_day/reward/independencia.png",
    status: "pass",
    isGet: false,
  },
  {
    prizeName: "Avatar Independência",
    prizeId: "5197558061989889663",
    prizeImage:
      "http://fepublicty.tiyalive.com/activity/pt_independence_day/reward/independencia_1.png",
    status: "pass",
    isGet: false,
  },
];

const PrizeMarquee = ({ content = list }) => {
  const carouselRef = useRef(null);

  const [contentLists, setContentLists] = useState([]);
  const [active, setActive] = useState(false);
  const [offset, setOffset] = useState(0);
  const [duration, setDuration] = useState(0);

  const styleAttr = useMemo(
    () => ({ "--offet": `${offset}px`, "--duration": `${duration}s` }),
    [duration, offset]
  );

  useEffect(() => {
    if (!carouselRef.current) return;
    const innerEle = carouselRef.current.querySelector(".carousel__inner");
    const offset = innerEle?.offsetWidth;

    if (offset && offset > 0) {
      setActive(true);
      setOffset((offset / 2) * -1);
      setDuration((offset * 2) / 200);
    }
  }, [contentLists]);

  useEffect(() => {
    if (!content?.length) return;

    setContentLists(content.concat(content));
  }, [content]);

  return (
    <div className="carousel" ref={carouselRef}>
      <div
        className={`carousel__inner ${active ? "carousel__inner--active" : ""}`}
        style={styleAttr}
      >
        {contentLists.map((item, index) => (
          <div className="inner__img-box" key={`${item.prizeId}_${index}`}>
            <img src={item.prizeImage} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrizeMarquee;
