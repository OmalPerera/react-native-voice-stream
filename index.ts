import { NativeModules } from 'react-native';

const { VoiceStream } = NativeModules;

export interface VoiceStreamInterface {
  show(message: string): void;
}

export function showToast(message: string): void {
  VoiceStream.show(message);
}

export default VoiceStream as VoiceStreamInterface;