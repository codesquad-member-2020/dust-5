//
//  NormalState.swift
//  DustApp
//
//  Created by delma on 2020/03/30.
//  Copyright © 2020 delma. All rights reserved.
//

import Foundation
import UIKit

struct NormalState: DustState {
    var measureValue: Int
    var state: String = "보통"
    var stateEmoji: UIImage = #imageLiteral(resourceName: "normal")
    var gradientColor: [Any] = [
        UIColor(red: 0.6, green: 0.9, blue: 0.4, alpha: 1).cgColor,
        UIColor(red: 0.4, green: 0.9, blue: 0.4, alpha: 0.2).cgColor,
        UIColor(red: 0, green: 0.1, blue: 0.1, alpha: 0.1).cgColor,
        UIColor(red: 0, green: 0, blue: 0, alpha: 0).cgColor,
        UIColor.white
    ]
    
    
}
