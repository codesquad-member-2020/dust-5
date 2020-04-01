//
//  EncodeManager.swift
//  DustApp
//
//  Created by delma on 2020/03/31.
//  Copyright © 2020 delma. All rights reserved.
//

import Foundation
import CoreLocation

class EncodeManager {
    let encoder = JSONEncoder()

    func encodeCoordinate(latitude: CLLocationDegrees, longitude:CLLocationDegrees) -> Data? {
        let coordinate = Coordinate(latitude: latitude, longitude: longitude)
        let data = try? encoder.encode(coordinate)
        
        return data
    }
}
