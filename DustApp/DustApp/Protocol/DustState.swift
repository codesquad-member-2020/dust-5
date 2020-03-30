//
//  DustState.swift
//  DustApp
//
//  Created by delma on 2020/03/30.
//  Copyright © 2020 delma. All rights reserved.
//

import Foundation
import UIKit

protocol DustState {
    var measureValue: Int { get set }
    var state: String { get set }
    var stateEmoji: UIImage { get set }
    var gradientColor: [Any] { get set }
}
