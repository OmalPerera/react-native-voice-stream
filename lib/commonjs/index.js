"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.StreamEmitter = void 0;
var _reactNative = require("react-native");
const LINKING_ERROR = `The package 'react-native-voice-stream' doesn't seem to be linked. Make sure: \n\n` + '- You have run "pod install" in the ios/ directory\n' + '- You rebuilt the app after installing the package\n' + '- You are running on iOS (Android is not supported yet)\n';
const VoiceStreamNative = _reactNative.NativeModules.VoiceStream ? _reactNative.NativeModules.VoiceStream : new Proxy({}, {
  get() {
    throw new Error(LINKING_ERROR);
  }
});
const StreamEmitter = exports.StreamEmitter = _reactNative.Platform.OS === 'ios' ? new _reactNative.NativeEventEmitter(VoiceStreamNative) : null;
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
var _default = exports.default = VoiceStreamer;
//# sourceMappingURL=index.js.map