//
//  Forecast.swift
//  DustApp
//
//  Created by delma on 2020/04/02.
//  Copyright © 2020 delma. All rights reserved.
//

import Foundation

struct Forecast: Codable {
    var status: String
    var contents: [DetailInfo]
    
    struct DetailInfo: Codable {
        var dataTime: String
        var informCause: String
        var informGrade: String
        var informOverall: String
        var informData: String
        var imageList: [String]
    }
}
