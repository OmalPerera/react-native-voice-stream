import { NativeModules, NativeEventEmitter, Platform } from 'react-native';

const LINKING_ERROR =
  `The package 'react-native-voice-stream' doesn't seem to be linked. Make sure: \n\n` +
  '- You have run "pod install" in the ios/ directory\n' +
  '- You rebuilt the app after installing the package\n' +
  '- You are running on iOS (Android is not supported yet)\n';

const VoiceStreamNative = NativeModules.VoiceStream
  ? NativeModules.VoiceStream
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

    
export const StreamEmitter = Platform.OS === 'ios' 
  ? new NativeEventEmitter(VoiceStreamNative)
  : null;


export interface AudioStreamOptions {
  sampleRate?: number;     // Default: 44100 Hz
  channels?: number;       // Default: 1 (mono)
  bufferSize?: number;     // Default: 2048 bytes
  bitsPerSample?: number;  // Default: 16 bits
}

export interface VoiceStreamInterface {
  /**
   * Initialize the audio recorder with configuration options
   */
  init(options?: AudioStreamOptions): void;
  
  /**
   * Start real-time audio recording and base64 streaming
   */
  start(): void;

  listen(event: "data", callback: (data: string) => void): void;
  
  /**
   * Stop audio recording
   */
  stop(): void;
}

const eventsMap = {
  data: 'data'
};

const VoiceStreamer = {
  init: VoiceStreamNative.init,
  start: VoiceStreamNative.start,
  stop: VoiceStreamNative.stop,
}

// @ts-ignore
VoiceStreamer.listen = (event, callback) => {
  const nativeEvent = eventsMap[event];
  if (!nativeEvent) {
    throw new Error('Invalid event');
  }
  StreamEmitter?.removeAllListeners(nativeEvent);
  return StreamEmitter?.addListener(nativeEvent, callback);
};



export default VoiceStreamer;
