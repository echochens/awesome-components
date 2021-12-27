const Fontmin = require("fontmin");
const glob = require("glob");
const path = require("path");

function getStrings() {
  const specialSign = "/*-+=_,.:;?%&#@!$~|^[]{}<>\"'？。，‘“’”；：【】";
  const nums = "1234567890";
  let en = "abcdefghijklmnopqrstuvwxyz";
  let pt = "ábêcdéfegaijotlmnópqursvxízâãàçôõú";
  let es =
    "¡¿AaÁáBbCcChchDdEeÉéFfGgHhIiÍíJjKkLlLlllMmNnÑñOoÓóPpQqRrSsTtUuÚúÜüVvWwXxYyZz";

  en += en.toUpperCase();
  pt += pt.toUpperCase();
  es += es.toUpperCase();

  return `${en}${pt}${es}${specialSign}${nums}`;
}

const fontPaths = glob.sync("*.ttf");
const strs = getStrings();

const fontmin = new Fontmin()
  .src(fontPaths)
  .use(Fontmin.glyph({ text: strs }))
  .dest(path.resolve(__dirname, "./font"));

fontmin.run((err, file) => {
  if (err) {
    console.log(err);
  }
});
