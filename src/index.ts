// @ts-nocheck
import { NativeModules, NativeEventEmitter } from 'react-native';

const { VoiceStream } = NativeModules;
const EventEmitter = new NativeEventEmitter(VoiceStream);

const VoiceStreamer = {};

VoiceStreamer.init = options => {
  console.log('nodeM init', options);
  return VoiceStream.init(options);
}
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

export default VoiceStreamer;
