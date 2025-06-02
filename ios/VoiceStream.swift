import Foundation
import React
import AVFoundation

@objc(VoiceStreamRecorder)
class VoiceStreamRecorder: NSObject {
    
    // MARK: - Audio Components
    private var audioEngine: AVAudioEngine?
    private var inputNode: AVAudioInputNode?
    private var eventEmitter: RCTEventEmitter?
    
    // MARK: - Recording State
    private var isRecording = false
    
    // MARK: - Audio Configuration
    private var sampleRate: Double = 44100
    private var channels: UInt32 = 1
    private var bufferSize: UInt32 = 2048
    private var bitsPerSample: UInt32 = 16
    
    // MARK: - Configuration
    @objc
    func configureWithOptions(_ options: [String: Any], eventEmitter: RCTEventEmitter) {
        self.eventEmitter = eventEmitter
        
        // Parse configuration options
        if let rate = options["sampleRate"] as? Double {
            sampleRate = rate
        }
        if let ch = options["channels"] as? UInt32 {
            channels = ch
        }
        if let buffer = options["bufferSize"] as? UInt32 {
            bufferSize = buffer
        }
        if let bits = options["bitsPerSample"] as? UInt32 {
            bitsPerSample = bits
        }
        
        print("VoiceStream configured: \(sampleRate)Hz, \(channels)ch, \(bufferSize)bytes, \(bitsPerSample)bit")
        setupAudioEngine()
    }
    
    // MARK: - Audio Engine Setup
    private func setupAudioEngine() {
        audioEngine = AVAudioEngine()
        inputNode = audioEngine?.inputNode
        
        guard let inputNode = inputNode else {
            print("VoiceStream: Failed to get input node")
            return
        }
        
        // Configure audio format for recording
        let format = AVAudioFormat(commonFormat: .pcmFormatInt16, 
                                 sampleRate: sampleRate, 
                                 channels: channels, 
                                 interleaved: true)
        
        guard let audioFormat = format else {
            print("VoiceStream: Failed to create audio format")
            return
        }
        
        // Install tap for real-time audio processing
        inputNode.installTap(onBus: 0, bufferSize: bufferSize, format: audioFormat) { [weak self] buffer, time in
            self?.processAudioBuffer(buffer)
        }
        
        print("VoiceStream: Audio engine configured successfully")
    }
    
    // MARK: - Recording Controls
    @objc
    func startRecording() {
        guard let audioEngine = audioEngine else {
            print("VoiceStream: Audio engine not initialized")
            return
        }
        
        guard !isRecording else {
            print("VoiceStream: Already recording")
            return
        }
        
        do {
            // Configure audio session for recording
            let audioSession = AVAudioSession.sharedInstance()
            try audioSession.setCategory(.playAndRecord, 
                                       mode: .voiceChat, 
                                       options: [.duckOthers, .allowBluetooth, .allowAirPlay])
            try audioSession.setActive(true)
            
            // Start the audio engine
            try audioEngine.start()
            isRecording = true
            
            print("VoiceStream: Recording started successfully")
            
        } catch {
            print("VoiceStream: Failed to start recording - \(error.localizedDescription)")
        }
    }
    
    @objc
    func stopRecording() {
        guard isRecording else {
            print("VoiceStream: Not currently recording")
            return
        }
        
        // Stop audio engine
        audioEngine?.stop()
        inputNode?.removeTap(onBus: 0)
        isRecording = false
        
        // Deactivate audio session
        do {
            try AVAudioSession.sharedInstance().setActive(false)
            print("VoiceStream: Recording stopped successfully")
        } catch {
            print("VoiceStream: Error deactivating audio session - \(error.localizedDescription)")
        }
    }
    
    // MARK: - Audio Processing
    private func processAudioBuffer(_ buffer: AVAudioPCMBuffer) {
        guard isRecording else { return }
        
        // Get raw audio data
        guard let channelData = buffer.int16ChannelData?[0] else {
            print("VoiceStream: No channel data available")
            return
        }
        
        let frameLength = Int(buffer.frameLength)
        let dataSize = frameLength * 2 // 2 bytes per Int16 sample
        
        // Convert to Data and then base64
        let audioData = Data(bytes: channelData, count: dataSize)
        let base64String = audioData.base64EncodedString()
        
        // Send to JavaScript via event
        DispatchQueue.main.async { [weak self] in
            self?.eventEmitter?.sendEvent(withName: "data", body: base64String)
        }
    }
    
    // MARK: - Lifecycle
    @objc
    static func requiresMainQueueSetup() -> Bool {
        return false
    }
    
    deinit {
        stopRecording()
        print("VoiceStream: Recorder deinitialized")
    }
}