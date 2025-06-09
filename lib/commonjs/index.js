"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _reactNative = require("react-native");
// @ts-nocheck

const {
  VoiceStream
} = _reactNative.NativeModules;
const EventEmitter = new _reactNative.NativeEventEmitter(VoiceStream);
const VoiceStreamer = {};
VoiceStreamer.init = options => {
  console.log('nodeM init', options);
  return VoiceStream.init(options);
};
VoiceStreamer.start = () => VoiceStream.start();
VoiceStreamer.stop = () => VoiceStream.stop();
const eventsMap = {
  data: 'data'
};
VoiceStreamer.on = (event, callback) => {
  console.log('nodeM on', event);
  const nativeEvent = eventsMap[event];
  if (!nativeEvent) {
    throw new Error('Invalid event');
  }
  EventEmitter.removeAllListeners(nativeEvent);
  return EventEmitter.addListener(nativeEvent, callback);
};
var _default = exports.default = VoiceStreamer;
//# sourceMappingURL=index.js.map