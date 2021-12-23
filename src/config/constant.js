const DEFAULTAPP = "zy"; // zy 、tiya

const APPENV = (() => {
  const { hostname } = window.location;
  if (hostname.indexOf("tiyalive") >= 0) {
    return "tiya";
  } else if (
    hostname.indexOf("zhiyalive") >= 0 ||
    hostname.indexOf("zyapp.cn") >= 0
  ) {
    return "zy";
  } else {
    return DEFAULTAPP;
  }
})();

const ENV = (() => {
  const { hostname, port } = window.location;
  if (hostname.indexOf("dev") >= 0 || hostname.indexOf("office") >= 0 || port) {
    return "dev";
  } else if (hostname.indexOf("pre") >= 0) {
    return "pre";
  } else {
    return "prod";
  }
})();

const TIYACONFIG = {
  NAME: "Tiya",
  LOGO: "https://fepublicty.tiyalive.com/tiya/tiya_logo_new.png",
  CDN: "https://fepublicty.tiyalive.com",
  DOWNLOAD: {
    IOS: "https://go.onelink.me/fVFP?pid=share",
    ANDROID: "https://go.onelink.me/fVFP?pid=share",
  },
  OPENAPP: "tiyaapp://sharecallback?action=",
};

const ZYCONFIG = {
  NAME: "吱呀",
  LOGO: "https://fepublic.zyapp.cn/zy_new/logo.png",
  CDN: "https://fepublic.zyapp.cn",
  DOWNLOAD: {
    IOS: "https://apps.apple.com/app/apple-store/id1434799693",
    ANDROID: "https://apk.lizhifm.com/fst/zhiya_apk/zhiya.apk",
  },
  OPENAPP: "zhiyaapp://sharecallback?action=",
};

const OBJECT = {
  tiya: TIYACONFIG,
  zy: ZYCONFIG,
};
const APPCONFIG = OBJECT[APPENV];

export { ENV, APPENV, APPCONFIG };
