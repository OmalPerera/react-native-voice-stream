import Foundation
import UIKit
import React

@objc(VoiceStreamImpl)
class VoiceStreamImpl: NSObject {
  
  @objc
  func show(_ message: String) {
    DispatchQueue.main.async {
      self.presentAlert(with: message)
    }
  }
  
  private func presentAlert(with message: String) {
    guard let windowScene = UIApplication.shared.connectedScenes.first as? UIWindowScene,
          let window = windowScene.windows.first,
          let rootVC = window.rootViewController else {
      print("VoiceStream: No root view controller found")
      return
    }
    
    let alert = UIAlertController(title: nil, message: message, preferredStyle: .alert)
    rootVC.present(alert, animated: true)
    
    // Dismiss after 2 seconds
    DispatchQueue.main.asyncAfter(deadline: .now() + 2.0) {
      alert.dismiss(animated: true)
    }
  }
  
  @objc
  static func requiresMainQueueSetup() -> Bool {
    return true
  }
}