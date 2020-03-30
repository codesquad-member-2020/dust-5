//
//  DustGrade.swift
//  DustApp
//
//  Created by delma on 2020/03/30.
//  Copyright © 2020 delma. All rights reserved.
//

import Foundation

enum DustGrade {
    case good
    case normal
    case bad
    case worst
    
    var range: CountableClosedRange<Int> {
        switch self {
        case .good:
            return 0...30
        case .normal:
            return 31...80
        case .bad:
            return 81...150
        case .worst:
            return 150...999
        }
    }
}
