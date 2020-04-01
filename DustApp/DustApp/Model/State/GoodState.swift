//
//  GoodState.swift
//  DustApp
//
//  Created by delma on 2020/03/30.
//  Copyright © 2020 delma. All rights reserved.
//

import Foundation
import UIKit

struct GoodState: DustState {
    var measureValue: Int
    var state: String = "좋음"
    var stateEmoji: UIImage = #imageLiteral(resourceName: "good")
    var gradientColor: [Any] = [
        UIColor(red: 0, green: 0.5, blue: 0.9, alpha: 1).cgColor,
        UIColor(red: 0, green: 0.5, blue: 0.9, alpha: 0.2).cgColor,
        UIColor(red: 0, green: 0.1, blue: 0.1, alpha: 0.1).cgColor,
        UIColor(red: 0, green: 0, blue: 0, alpha: 0).cgColor,
        UIColor.white
    ]
    
    
}
