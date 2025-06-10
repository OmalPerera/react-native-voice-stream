import { IStreamOptions, IVoiceStreamer } from './index.d';
// @ts-ignore
import { NativeModules, NativeEventEmitter } from 'react-native';
const { VoiceStream } = NativeModules;
const EventEmitter = new NativeEventEmitter(VoiceStream);
const eventKey = 'data';

const VoiceStreamer: IVoiceStreamer = {
  init: (options: IStreamOptions): Promise<void> => {
    return VoiceStream.init(options);
  },

  start: (): Promise<void> => VoiceStream.start(),

  stop: (): Promise<void> => VoiceStream.stop(),
  
  listen: (event: 'data', callback: (data: string) => void) => {
    if (event !== eventKey) {
      throw new Error('Invalid event');
    }
    EventEmitter.removeAllListeners(eventKey);
    return EventEmitter.addListener(eventKey, callback);
  }
};

export default VoiceStreamer;
