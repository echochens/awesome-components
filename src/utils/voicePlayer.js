import EventBus from "@/utils/eventBus";
class VoicePlayer {
  constructor() {
    this.isPlaying = false;
    window.lz.on("playUrlStatus", (res) => {
      console.log("播放状态：", res);
      const { playStatus, url } = res;
      console.log("播放状态 url:", url);
      // console.log('播放状态 voiceUrl:',voiceUrl)
      // console.log('url===voiceUrl:',url===voiceUrl)
      // if(url===voiceUrl){
      //   let playing = false;
      //   if (playStatus === 1) {
      //     playing = true;
      //   }
      //   setVoicePlaying(playing);
      // }
      let playing = false;
      if (playStatus === 1) {
        playing = true;
      }
      this.isPlaying = playing;
      EventBus.emit("PLAY-URL-STATUS", { playStatus, url });
    });
    EventBus.on("PLAY-VOICE", (url) => {
      this.playVoice(url);
    });
    EventBus.on("STOP-VOICE", () => {
      this.stopVoice();
    });
  }
  playVoice(url) {
    window.lz.playUrl({ url }).then((ret) => {
      console.log("播放声音 ret:", ret);
    });
  }
  stopVoice() {
    window.lz.stopPlayUrl({}).then((res) => {
      console.log("暂停播放:", res);
    });
  }
}

export default VoicePlayer;
