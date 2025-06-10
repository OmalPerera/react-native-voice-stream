export interface IStreamOptions {
    sampleRate?: number;
    bufferSize?: number;
    channels?: number;
    encoding?: string;
  }

export interface IVoiceStreamer {
    init(options: IStreamOptions): Promise<void>;
    start(): Promise<void>;
    stop(): Promise<void>;
    listen(event: 'data', callback: (data: string) => void): any;
  }