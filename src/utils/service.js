let { lz } = window;

export const handleGetToken = async (
  manual_token,
  fresh = false,
  requestUrl = ""
) => {
  let TOKEN = "";

  if (lz.isApp) {
    const { token } = await lz.getToken({ needRefresh: fresh }).catch((err) => {
      return err;
    });
    TOKEN = token;
    console.info(
      `requestUrl:${requestUrl}调用getToken，fresh:${fresh},token:${token}`
    );
  } else {
    TOKEN = manual_token;
  }

  return TOKEN;
};
