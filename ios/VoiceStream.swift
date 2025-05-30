import Foundation
import UIKit
import React

@objc(VoiceStream)
class VoiceStream: NSObject {

  @objc
  func show(_ message: String) {
    DispatchQueue.main.async {
      // Get the active scene's window (works for iOS 13+)
      if let scene = UIApplication.shared.connectedScenes.first(where: { $0.activationState == .foregroundActive }),
         let windowScene = scene as? UIWindowScene,
         let rootVC = windowScene.windows.first(where: { $0.isKeyWindow })?.rootViewController {
        
        let alert = UIAlertController(title: nil, message: message, preferredStyle: .alert)
        rootVC.present(alert, animated: true)

        // Dismiss after 2 seconds
        DispatchQueue.main.asyncAfter(deadline: .now() + 2) {
          alert.dismiss(animated: true, completion: nil)
        }
      }
    }
  }

  @objc
  static func requiresMainQueueSetup() -> Bool {
    return true
  }
}