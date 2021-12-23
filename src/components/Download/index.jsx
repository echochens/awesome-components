import React, { useEffect } from "react";
import ClipboardJS from "clipboard";

import "./index.scss";

const Download = (props) => {
  const {
    onCancel,
    onDownload,
    actionClip,
    appType = "zy",
    content = {},
  } = props;

  useEffect(() => {
    let clipboard = new ClipboardJS(".confirm");
    clipboard.on("success", (e) => {
      console.log("链接复制成功");
    });
  }, []);

  return (
    <div className="download-wrap">
      <div className="download-bg"></div>
      <div className={`download-box ${appType}`}>
        <div className="download-text">
          <p>{content.title}</p>
          <p>{content.info}</p>
        </div>
        <div
          className="confirm"
          onClick={onDownload}
          data-clipboard-text={actionClip}
        >
          {content.download}
        </div>
        <div className="on" onClick={onCancel}>
          {content.agent}
        </div>
      </div>
    </div>
  );
};

export default Download;
