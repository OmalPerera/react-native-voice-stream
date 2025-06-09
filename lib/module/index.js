import { NativeModules, NativeEventEmitter, Platform } from 'react-native';
const LINKING_ERROR = `The package 'react-native-voice-stream' doesn't seem to be linked. Make sure: \n\n` + '- You have run "pod install" in the ios/ directory\n' + '- You rebuilt the app after installing the package\n' + '- You are running on iOS (Android is not supported yet)\n';
const VoiceStreamNative = NativeModules.VoiceStream ? NativeModules.VoiceStream : new Proxy({}, {
  get() {
    throw new Error(LINKING_ERROR);
  }
});
export const StreamEmitter = Platform.OS === 'ios' ? new NativeEventEmitter(VoiceStreamNative) : null;
const eventsMap = {
  data: 'data'
};
const VoiceStreamer = {
  init: VoiceStreamNative.init,
  start: VoiceStreamNative.start,
  stop: VoiceStreamNative.stop
};

// @ts-ignore
VoiceStreamer.listen = (event, callback) => {
  const nativeEvent = eventsMap[event];
  if (!nativeEvent) {
    throw new Error('Invalid event');
  }
  StreamEmitter === null || StreamEmitter === void 0 || StreamEmitter.removeAllListeners(nativeEvent);
  return StreamEmitter === null || StreamEmitter === void 0 ? void 0 : StreamEmitter.addListener(nativeEvent, callback);
};
export default VoiceStreamer;
//# sourceMappingURL=index.js.map