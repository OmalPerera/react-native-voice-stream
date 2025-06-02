#import "VoiceStream.h"

@implementation VoiceStream
{
    id _audioRecorder;  // Swift implementation instance
}

RCT_EXPORT_MODULE()

+ (BOOL)requiresMainQueueSetup {
    return NO;
}

- (NSArray<NSString *> *)supportedEvents {
    return @[@"data"];
}

- (instancetype)init {
    if (self = [super init]) {
        Class swiftClass = NSClassFromString(@"VoiceStreamRecorder");
        if (swiftClass) {
            _audioRecorder = [[swiftClass alloc] init];
        }
    }
    return self;
}

RCT_EXPORT_METHOD(init:(NSDictionary *)options) {
    if (_audioRecorder && [_audioRecorder respondsToSelector:@selector(configureWithOptions:eventEmitter:)]) {
        [_audioRecorder performSelector:@selector(configureWithOptions:eventEmitter:) 
                              withObject:options 
                              withObject:self];
    }
}

RCT_EXPORT_METHOD(start) {
    if (_audioRecorder && [_audioRecorder respondsToSelector:@selector(startRecording)]) {
        [_audioRecorder performSelector:@selector(startRecording)];
    }
}

RCT_EXPORT_METHOD(stop) {
    if (_audioRecorder && [_audioRecorder respondsToSelector:@selector(stopRecording)]) {
        [_audioRecorder performSelector:@selector(stopRecording)];
    }
}

@end