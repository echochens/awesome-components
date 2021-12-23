// 判断是否iphonex系列机型，适配刘海屏
export function isIphoneX() {
  return (
    (/iphone/gi.test(navigator.userAgent) &&
      Number(window.screen.height) === 812 &&
      Number(window.screen.width) === 375) ||
    (Number(window.screen.height) === 896 &&
      Number(window.screen.width) === 414)
  );
}

// 判断是否是 app 再进行相应的页面跳转
export function pageJump({ router, target = "", opt = {} }) {
  const { lz, location } = window;

  if (!router && !target) {
    throw new Error("pageJump 参数缺乏");
  }

  if (lz.isApp) {
    const { origin, pathname } = location;
    // 判断是否为项目内跳转
    if (
      target.indexOf("www") === -1 &&
      target.indexOf("http") === -1 &&
      target.indexOf("devoffice") === -1 &&
      target !== "-1"
    ) {
      //  拿到URL前缀 进行拼接
      target = `${origin}${pathname}#${target}`;
    }

    // 关闭当前 webview
    if (target === "-1") {
      lz.closeWebView();
    } else {
      console.info(
        JSON.stringify({
          extraData: {
            url: target,
            ...opt,
          },
        })
      );

      lz.toAction({
        action: {
          type: 6,
          scheme: "common/webView",
          extraData: {
            url: target,
            ...opt,
          },
        },
      });
    }
  } else {
    // 路由回退
    if (
      target.indexOf("zyapp.cn") !== -1 ||
      target.indexOf("tiyalive.com") !== -1
    ) {
      window.location.href = target;
    } else if (target === "-1") {
      router.goBack();
    } else {
      router.push(target);
    }
  }
}

// 节流
export function throttle(fun, delay) {
  let last, deferTimer;
  return function (args) {
    let that = this;
    let _args = arguments;
    let now = +new Date();
    if (last && now < last + delay) {
      clearTimeout(deferTimer);
      deferTimer = setTimeout(function () {
        last = now;
        fun.apply(that, _args);
      }, delay);
    } else {
      last = now;
      fun.apply(that, _args);
    }
  };
}

// 调用客户端提供的打点接口埋点
export function gioReport(eventName, extraData = null) {
  let reportData = null;
  if (extraData) {
    reportData = {
      eventName,
      extraData,
    };
  } else {
    reportData = {
      eventName,
    };
  }

  console.info(reportData);
  window.lz &&
    window.lz.traceReport(reportData).then((ret) => {
      console.info(`${eventName}打点`, ret);
    });
}

export function formatTime(seconds) {
  if (seconds < 10) return `00:0${seconds}`;
  if (seconds < 60) return `00:${seconds}`;
  let second = seconds % 60;
  let min = (seconds - second) / 60;
  second = second < 10 ? `0${second}` : second;
  return `${min}:${second}`;
}

export function formatTime2(seconds) {
  let second = seconds % 60;
  let min = (seconds - second) / 60;
  min = min < 10 ? `0${min}` : min;
  second = second < 10 ? `0${second}` : second;
  return `${min}:${second}`;
}

// base64 转 arrayBuffer
export function base64ToArrayBuffer(base64) {
  var binary_string = window.atob(base64);
  var len = binary_string.length;
  var bytes = new Uint8Array(len);
  for (var i = 0; i < len; i++) {
    bytes[i] = binary_string.charCodeAt(i);
  }
  return bytes.buffer;
}

// arrayBuffer 转 blobUrl => 用于处理客户端接口获取到的 base64
export function base64ToBlobUrl(base64) {
  let audioArrayBuffer = base64ToArrayBuffer(base64);

  let audioBlob = new Blob([new Int8Array(audioArrayBuffer)]);
  let audioBlobUrl = URL.createObjectURL(audioBlob);
  return audioBlobUrl;
}

// 解析 url
export function parseUrl(scene) {
  let mUrl = {};
  try {
    let strParam = scene.split("?")[1];
    let arrParamPart = strParam.split("&");
    for (let i in arrParamPart) {
      let strParamPart = arrParamPart[i];
      let arrParamKy = strParamPart.split("=");
      let strKey = arrParamKy[0];
      let strValue = decodeURIComponent(arrParamKy[1]);
      mUrl[strKey] = strValue;
    }
  } catch (e) {}
  return mUrl;
}

// 设置 CDN 获取图片时的压缩大小
export function resizeImgFromCDN(url, width = 100, height = 100) {
  const size = `${width}x${height}`;

  try {
    const suffix = [...".jpg".match(/(.[a-z]*)$/)][0];
    url = url.replace(suffix, `_${size}${suffix}`);
    return url;
  } catch (e) {
    return url;
  }
}
