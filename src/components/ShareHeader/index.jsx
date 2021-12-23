import React, {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import Download from "@/components/Download";
import useLang from "@/hooks/useLang";
import client from "@lizhife/client";
import { APPENV, APPCONFIG } from "@/config/constant";

import "./style/index.scss";

const isWeChatBrowser =
  client.isWeiXin() || (client.isIOS() && navigator.userAgent.match(/QQ/i));

const Share = forwardRef((props, ref) => {
  console.log("shrae------>", props, ref);
  const {
    nowPage,
    jumpPage,
    dir = "components/ShareHeader", // 多语言路径
    isFullScreen = false, // 是否全屏
    isLight = false,
    isFixed = false,
    onDownload = () => {},
    onJump = () => {},
    scheme = "",
  } = props;
  const { content = {} } = useLang({ langPath: dir });
  const [showWeChatNotice, setShowWeChatNotice] = useState(false); // 显示微信浏览器的提示样式
  const [actionClip, setActionClip] = useState(""); // 复制的文本
  const [showDownload, setShowDownload] = useState(false);

  // 跳转 scheme 相关
  const [BASE_URL] = useState(APPCONFIG.OPENAPP);
  const timer = useRef(null);

  // 下载
  const handleDownload = () => {
    if (isWeChatBrowser) return toggleShowWeChatNotice();
    onDownload();
    let isIOS = /iphone/gi.test(navigator.userAgent);
    window.location.href = isIOS
      ? APPCONFIG.DOWNLOAD.IOS
      : APPCONFIG.DOWNLOAD.ANDROID;
  };

  // 显示微信浏览器浏览时显示的页面
  const toggleShowWeChatNotice = () => {
    setShowWeChatNotice(!showWeChatNotice);
  };

  const recall = () => {
    window.addEventListener("pagehide", () => clearTimeout(timer.current));

    timer.current = setTimeout(() => setShowDownload(true), 2000);

    window.location.href = BASE_URL + encodeURIComponent(formatAction()); // 对文本编码
  };

  // 格式化webview的action
  const formatAction = () => {
    console.info("nowPage:" + nowPage, "jumpPage:" + jumpPage);
    const href = window.location.href;
    const url = href.replace(nowPage, jumpPage);
    console.info("url:" + nowPage ? url : "openApp");

    const strAction = nowPage
      ? JSON.stringify({
          action: JSON.stringify({
            type: 6,
            scheme: "common/webView",
            extraData: {
              url,
              isFull: isFullScreen,
              isLight: isLight,
            },
          }),
          type: "jump",
        })
      : JSON.stringify({
          action: JSON.stringify({
            type: 6,
            scheme: scheme,
          }),
          type: "jump",
        });

    return strAction;
  };

  // 页面跳转
  const preJump = () => {
    if (isWeChatBrowser) return toggleShowWeChatNotice();
    clearTimeout(timer.current);
    recall();
    onJump();
  };

  // 取消
  const cancel = () => {
    setShowDownload(false);
  };

  useImperativeHandle(ref, () => ({ preJump, actionClip: formatAction() }), []); // 导出的方法

  useEffect(() => {
    if (!nowPage ^ !jumpPage) throw Error("请输入 nowPag 和 jumpPage");
    setActionClip(formatAction());
  }, []);

  return (
    <div className={`share-head-wrap ${isFixed ? "fixed" : ""}`}>
      <div className="download">
        <div className={`logo ${APPENV}`}></div>
        <div className="info">
          <span>{content.mainTitle}</span>
          <p>{content.mainInfo}</p>
        </div>
        <div className="btn" onClick={preJump}>
          {content.download}
        </div>
      </div>
      {showWeChatNotice && (
        <div className="go-sys-browser">
          <div className="pointer"></div>
          <div className="content">
            <p>{content.browser_1}</p>
            <p>{content.browser_2}</p>
            <div className="btn" onClick={toggleShowWeChatNotice}>
              {content.OK}
            </div>
          </div>
        </div>
      )}
      {showDownload && (
        <Download
          content={content}
          confirm={handleDownload}
          actionClip={actionClip}
          cancel={cancel}
          appType={APPENV}
        ></Download>
      )}
    </div>
  );
});

export default Share;
