// 第一时间获取客户端信息
export function getAppInfo() {
  const APP_INFO = {
    model: "localhost",
    version: "3.14.1",
    buildVersion: "111111",
    system: "localhost",
    deviceId: "123456789",
    platform: "localhost",
    lang: "en",
  };
  return new Promise((resolve) => {
    if (window?.lz?.isApp) {
      if (window.LizhiJSBridge) {
        window.LizhiJSBridge.call("getAppInfo", {}, (ret) => {
          resolve(ret.version ? ret : APP_INFO);
        });
      } else {
        document.addEventListener("LizhiJSBridgeReady", () => {
          window.LizhiJSBridge.call("getAppInfo", {}, (ret) => {
            resolve(ret.version ? ret : APP_INFO);
          });
        });
      }
    } else {
      resolve(APP_INFO);
    }
  });
}
