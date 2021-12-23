import React, { memo, useEffect, useRef, useState } from "react";
import { Transition } from "react-transition-group";
import { shallowEqual } from "@/utils/compare";

import "./index.scss";

export const popSection = {
  header: "header",
  body: "body",
  footer: "footer",
};

const sectionArr = [popSection.header, popSection.body];

const Popup = (props) => {
  const {
    cls,
    id = "popup",
    toggle,
    status,
    children,
    updateAttr = {},
    whiteClick = false,
  } = props;
  const [blocks, setBlocks] = useState({});

  const handleClose = () => {
    toggle(false);
  };

  //空白點擊關閉
  const handleOuterClick = (e) => {
    const { target } = e;
    if (target.className.includes("outer") && whiteClick) {
      toggle(false);
    }
  };

  useEffect(() => {
    let temp = {};

    if (children instanceof Array) {
      children.forEach((item) => {
        if (sectionArr.includes(item.key)) {
          temp[item.key] = item;
        }
      });
    } else if (children) {
      temp.content = children;
    }

    setBlocks(temp);
  }, [children]);

  const scrollTop = useRef(0);

  useEffect(() => {
    const layout = document.querySelector("#root");
    //解決滾動穿透
    if (status) {
      scrollTop.current = Math.max(
        document.documentElement.scrollTop,
        document.body.scrollTop
      );
      layout.style.overflow = "hidden";
      layout.style.height = "100vh";
      layout.scrollTo({ top: scrollTop.current });
    } else {
      layout.style.overflow = "auto";
      layout.style.height = "unset";
      window.scrollTo({ top: scrollTop.current });
      scrollTop.current = 0;
    }
  }, [status]);

  return (
    <Transition in={status} timeout={500} appear={true} unmountOnExit={true}>
      {(state) => (
        <div
          id={id}
          className={`outer popup popup--${state}`}
          onClick={handleOuterClick}
        >
          <div className={`popup__main ${cls} `}>
            <div className="main__close" onClick={handleClose}></div>
            {blocks.content ? (
              <>{blocks.content}</>
            ) : (
              <>
                {blocks.header && (
                  <section className="main__header">
                    {blocks.header}
                    <span className="underline"></span>
                  </section>
                )}
                {blocks.body && <> {blocks.body} </>}
              </>
            )}
          </div>
        </div>
      )}
    </Transition>
  );
};

export default memo(Popup, (pre, next) => {
  if (pre.updateAttr !== next.updateAttr) return false;

  const flag = shallowEqual(pre, next, ["children"]);
  return flag;
});
