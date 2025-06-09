import { NativeEventEmitter } from 'react-native';
export declare const StreamEmitter: NativeEventEmitter;
export interface AudioStreamOptions {
    sampleRate?: number;
    channels?: number;
    bufferSize?: number;
    bitsPerSample?: number;
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
declare const VoiceStreamer: {
    init: any;
    start: any;
    stop: any;
};
export default VoiceStreamer;
