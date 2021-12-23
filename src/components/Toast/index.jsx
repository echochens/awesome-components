import React from "react";
import "./index.scss";
const Notice = (props) => {
  const { content, close, top = "48%" } = props;
  return (
    <div className="notice-wrap">
      <div onClick={close} className="notice-bg"></div>
      <div className="notice-box" style={{ top: top }}>
        <div className="notice-text">{content}</div>
      </div>
    </div>
  );
};

export default Notice;
