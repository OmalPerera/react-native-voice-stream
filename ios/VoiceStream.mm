#import "VoiceStream.h"

@implementation VoiceStream

RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(show:(NSString *)message) {
    Class swiftClass = NSClassFromString(@"VoiceStreamImpl");
    if (swiftClass) {
        id swiftModule = [[swiftClass alloc] init];
        if ([swiftModule respondsToSelector:@selector(show:)]) {
            [swiftModule performSelector:@selector(show:) withObject:message];
        } else {
            NSLog(@"VoiceStream: Swift method 'show' not found");
        }
    } else {
        NSLog(@"VoiceStream: Swift class 'VoiceStreamImpl' not found");
    }
}

@end