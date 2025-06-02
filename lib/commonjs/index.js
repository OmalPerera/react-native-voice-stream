"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.VoiceStreamEmitter = void 0;
var _reactNative = require("react-native");
const {
  VoiceStream
} = _reactNative.NativeModules;
/**
 * Event emitter for receiving real-time base64 audio data
 * Listen to 'data' events to receive base64 audio chunks
 */
const VoiceStreamEmitter = exports.VoiceStreamEmitter = new _reactNative.NativeEventEmitter(VoiceStream);

/**
 * Main VoiceStream module for real-time audio recording
 * 
 * @example
 * ```typescript
 * import VoiceStream, { VoiceStreamEmitter } from 'react-native-voice-stream';
 * 
 * // Initialize with options
 * VoiceStream.init({ 
 *   sampleRate: 44100, 
 *   channels: 1,
 *   bufferSize: 2048 
 * });
 * 
 * // Listen for real-time base64 audio data
 * const subscription = VoiceStreamEmitter.addListener('data', (base64Audio) => {
 *   console.log('Received audio chunk:', base64Audio);
 *   // Send to your server, save to file, etc.
 * });
 * 
 * // Start recording
 * VoiceStream.start();
 * 
 * // Stop recording
 * VoiceStream.stop();
 * 
 * // Clean up
 * subscription.remove();
 * ```
 */
var _default = exports.default = VoiceStream;
//# sourceMappingURL=index.js.map