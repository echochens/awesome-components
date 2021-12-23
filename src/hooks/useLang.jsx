import { getAppInfo } from "@/utils/bridge";
import { useState, useEffect } from "react";
const RTL_LIST = ["ar"];

function useLang({ langPath, stylePath, isConfigDir = true }) {
  let [lang, setLang] = useState("");
  let [content, setContent] = useState(undefined);
  let [dir, setDir] = useState("ltr");
  let [appInfo, setAppInfo] = useState({});

  // 获取语言类型
  async function getLangType(isConfigDir) {
    let appInfo = await getAppInfo();
    setAppInfo(appInfo);

    // test
    let { lang } = appInfo;
    // NOTE: 可在此处设置需要调试的语言类型
    // lang = "ar";

    setLang(lang);

    const dir = RTL_LIST.includes(lang.toLowerCase()) ? "rtl" : "ltr";
    setDir(dir);

    const { documentElement } = window.document;
    documentElement.setAttribute("lang", lang);

    isConfigDir && documentElement.setAttribute("dir", dir);
  }

  // 载入翻译文件
  useEffect(() => {
    if (langPath && lang) {
      import(`@/${langPath}/lang/${lang}.json`).then((res) => {
        const { title, content } = res;
        setContent(content);
        if (title) {
          document.title = title;
        }
      });
    }
  }, [langPath, lang]);

  // 载入样式文件
  useEffect(() => {
    if (dir && (stylePath || langPath)) {
      import(`@/${stylePath || langPath}/style/${dir}.scss`).then();
    }
  }, [stylePath, langPath, dir]);

  useEffect(() => {
    if (langPath) {
      getLangType({ isConfigDir });
    }
  }, [langPath, isConfigDir]);

  return { lang, content, dir, appInfo };
}

export default useLang;
