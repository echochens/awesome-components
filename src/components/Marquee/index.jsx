import React, {
  useRef,
  useEffect,
  useState,
  forwardRef,
  useCallback,
} from "react";

import "./index.scss";
import { useImperativeHandle } from "react";

const Notice = forwardRef(
  (
    { data = [], children = () => {}, speed = 1.5, dir = false, type = 0 },
    ref
  ) => {
    const item_1 = useRef();
    const item_2 = useRef();
    const index = useRef(0);
    const timeOut = useRef();
    const interval = useRef();
    const notice = useRef([]);
    const Dir = useRef(1);

    const [activeItem_1, setActiveItem_1] = useState({});
    const [activeItem_2, setActiveItem_2] = useState({});

    useEffect(() => {
      Dir.current = dir === false ? 1 : -1;
    }, [dir]);

    // 水平
    useEffect(() => {
      if (data.length === 0 || notice.current.length > 0) return;
      clearTimeout(timeOut.current);
      clearInterval(interval.current);
      notice.current = data;
      handleStart();
    }, [data]);

    useEffect(() => {
      return () => {
        clearTimeout(timeOut.current);
        clearInterval(interval.current);
      };
    }, []);

    // 水平运动
    const handleHorizontal = useCallback((Dir = 1) => {
      const NoticeItem_1 = item_1.current;
      const NoticeItem_2 = item_2.current;
      NoticeItem_1.style.transitionDuration = "0s";
      NoticeItem_2.style.transitionDuration = "0s";
      NoticeItem_1.style.transform = `translateX(${-Dir * 100}%)`;
      NoticeItem_2.style.transform = `translateX(${-Dir * 100}%)`;
      NoticeItem_1.style.top = "0%";
      NoticeItem_2.style.top = "0%";
      setActiveItem_1(notice.current[index.current % notice.current.length]);
      setActiveItem_2(notice.current[index.current % notice.current.length]);
      timeOut.current = setTimeout(() => {
        NoticeItem_2.style.transitionDuration = `${speed}s`;
        NoticeItem_2.style.transform = `translateX(${Dir * 100}%)`;
        index.current++;
        interval.current = setInterval(() => {
          if (index.current % 2) {
            NoticeItem_1.style.transitionDuration = `${speed}s`;
            NoticeItem_2.style.transitionDuration = "0s";
            NoticeItem_1.style.transform = `translateX(${Dir * 100}%)`;
            NoticeItem_2.style.transform = `translateX(${-Dir * 100}%)`;
            setActiveItem_1(
              notice.current[index.current % notice.current.length]
            );
            setActiveItem_2(
              notice.current[index.current % notice.current.length]
            );
          } else {
            NoticeItem_2.style.transitionDuration = `${speed}s`;
            NoticeItem_1.style.transitionDuration = "0s";
            NoticeItem_2.style.transform = `translateX(${Dir * 100}%)`;
            NoticeItem_1.style.transform = `translateX(${-Dir * 100}%)`;
            setActiveItem_1(
              notice.current[index.current % notice.current.length]
            );
            setActiveItem_2(
              notice.current[index.current % notice.current.length]
            );
          }
          index.current++;
        }, speed * 1000);
      }, 100);
    }, []);

    // 自下而上
    const handleTopToDown = useCallback((Dir = 1) => {
      const NoticeItem_1 = item_1.current;
      const NoticeItem_2 = item_2.current;

      NoticeItem_1.style.transitionDuration = "0s";
      NoticeItem_2.style.transitionDuration = "0s";
      NoticeItem_1.style.top = `${-Dir * 100}%`;
      NoticeItem_2.style.top = `${-Dir * 100}%`;
      NoticeItem_1.style.opacity = "0";
      NoticeItem_2.style.opacity = "0";
      setActiveItem_1(notice.current[index.current % notice.current.length]);
      setActiveItem_2(notice.current[index.current % notice.current.length]);
      timeOut.current = setTimeout(() => {
        NoticeItem_2.style.transitionDuration = `1s`;
        NoticeItem_2.style.top = "0";
        NoticeItem_2.style.opacity = "1";
        index.current++;
        interval.current = setInterval(() => {
          if (index.current % 2) {
            NoticeItem_1.style.opacity = "1";
            NoticeItem_1.style.transitionDuration = `1s`;
            NoticeItem_1.style.top = "0";
            NoticeItem_2.style.top = `${Dir * 100}%`;
            setActiveItem_1(
              notice.current[index.current % notice.current.length]
            );
            setTimeout(() => {
              NoticeItem_2.style.top = `${-Dir * 100}%`;
              NoticeItem_2.style.transitionDuration = "0s";
            }, 900);
          } else {
            NoticeItem_2.style.opacity = "1";
            NoticeItem_2.style.transitionDuration = `1s`;
            NoticeItem_2.style.top = "0";
            NoticeItem_1.style.top = `${Dir * 100}%`;
            setActiveItem_2(
              notice.current[index.current % notice.current.length]
            );
            setTimeout(() => {
              NoticeItem_1.style.top = `${-Dir * 100}%`;
              NoticeItem_1.style.transitionDuration = "0s";
            }, 900);
          }
          index.current++;
        }, speed * 1000 + 1000);
      }, 100);
    }, []);

    // 落隐落现
    const handleFallAndFall = useCallback(() => {
      const NoticeItem_1 = item_1.current;
      const NoticeItem_2 = item_2.current;

      NoticeItem_1.style.opacity = "0";
      NoticeItem_2.style.opacity = "0";
      NoticeItem_1.style.top = "0";
      NoticeItem_2.style.top = "0";
      setActiveItem_1(notice.current[index.current % notice.current.length]);
      setActiveItem_2(notice.current[index.current % notice.current.length]);
      timeOut.current = setTimeout(() => {
        NoticeItem_1.style.transitionDuration = "0.5s";
        NoticeItem_2.style.transitionDuration = "0.5s";
        NoticeItem_2.style.opacity = "1";
        index.current++;
        interval.current = setInterval(() => {
          if (index.current % 2) {
            setActiveItem_1(
              notice.current[index.current % notice.current.length]
            );
            NoticeItem_2.style.opacity = "0";
            setTimeout(() => {
              NoticeItem_1.style.opacity = "1";
            }, 300);
          } else {
            setActiveItem_2(
              notice.current[index.current % notice.current.length]
            );
            NoticeItem_1.style.opacity = "0";
            setTimeout(() => {
              NoticeItem_2.style.opacity = "1";
            }, 300);
          }
          index.current++;
        }, speed * 1000 + 600);
      }, 100);

      // let timeOut = setInterval(() => {
      //   if (index % 2) {
      //     NoticeItem_2.style.opacity = '0'
      //     setTimeout(() => {
      //       NoticeItem_1.style.opacity = '1'
      //       NoticeItem_2.innerText = notice[index % notice.length]
      //     }, 500)
      //   } else {
      //     NoticeItem_1.style.opacity = '0'
      //     setTimeout(() => {
      //       NoticeItem_2.style.opacity = '1'
      //       NoticeItem_1.innerText = notice[index % notice.length]
      //     }, 500)
      //   }
      //   index++
      // }, 3500)
    }, []);

    const handleStart = () => {
      const Dir = dir === false ? 1 : -1;
      switch (type) {
        case 0:
          handleFallAndFall();
          break;
        case 1:
          handleHorizontal(Dir);
          break;
        case 2:
          handleTopToDown(Dir);
          break;
        default:
          handleFallAndFall();
          break;
      }
    };

    useEffect(() => {
      // 调用安卓提供的web页面生命周期函数做截胡
      window.lz.on("viewLifeCycleStatus", ({ status }) => {
        if (status === "onShow") {
          handleStart();
        } else {
          clearTimeout(timeOut.current);
          clearInterval(interval.current);
        }
      });
    }, []);

    useImperativeHandle(
      ref,
      () => ({
        index,
        data: notice,
      }),
      []
    );

    return (
      <div className="notice-wrap" dir="ltr">
        <div className="notice-item" ref={item_1}>
          {children({ data: activeItem_1, arr: notice.current })}
        </div>
        <div className="notice-item" ref={item_2}>
          {children({ data: activeItem_2, arr: notice.current })}
        </div>
      </div>
    );
  }
);
export default Notice;
