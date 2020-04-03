//
//  MeasuredHistory.swift
//  DustApp
//
//  Created by delma on 2020/03/30.
//  Copyright © 2020 delma. All rights reserved.
//

import Foundation

struct MeasuredHistory: Codable {
    var status: String
    var contents: Contents
    
    struct Contents: Codable {
        var station: String
        var forecast: [DustData]
    }
    
    struct DustData: Codable {
        var dataTime: String
        var pm10Grade1h: String
        var pm10Value: String
    }
    
}
