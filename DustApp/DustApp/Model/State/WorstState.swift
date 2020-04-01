//
//  WorstState.swift
//  DustApp
//
//  Created by delma on 2020/03/30.
//  Copyright © 2020 delma. All rights reserved.
//

import Foundation
import UIKit

struct WorstState: DustState {
    var measureValue: Int
    var state: String = "나쁨"
    var stateEmoji: UIImage = #imageLiteral(resourceName: "worst")
    var gradientColor: [Any] = [
        UIColor(red: 1, green: 0, blue: 0, alpha: 1).cgColor,
        UIColor(red: 1, green: 0, blue: 0, alpha: 0.2).cgColor,
        UIColor(red: 0.1, green: 0, blue: 0, alpha: 0.1).cgColor,
        UIColor(red: 0, green: 0, blue: 0, alpha: 0).cgColor,
        UIColor.white
    ]
    
    
}
