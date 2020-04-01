//
//  MeasuredHistory.swift
//  DustApp
//
//  Created by delma on 2020/03/30.
//  Copyright © 2020 delma. All rights reserved.
//

import Foundation

struct MeasuredHistory: Codable {
    var stationName: String
    var contents: [DustData]
    
    struct DustData: Codable {
        var dataTime: String
        var pm10Graph1h: String
        var pm10Value: String
    }
    
}
