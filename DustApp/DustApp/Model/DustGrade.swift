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
    
    init(_ measuredValue: Int) {
        switch measuredValue {
        case DustGrade.good.range:
            self = .good
        case DustGrade.normal.range:
            self = .normal
        case DustGrade.bad.range:
            self = .bad
        case DustGrade.worst.range:
            self = .worst
        default:
            self = .normal
        }
    }
    
    func gradeDustState(measuredValue: Int) -> DustState {
        switch self {
        case .good:
            return GoodState(measureValue: measuredValue)
        case .normal:
            return NormalState(measureValue: measuredValue)
        case .bad:
            return BadState(measureValue: measuredValue)
        case .worst:
            return WorstState(measureValue: measuredValue)
        }
    }
}
