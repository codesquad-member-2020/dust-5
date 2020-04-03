//
//  LocationManager.swift
//  DustApp
//
//  Created by delma on 2020/03/31.
//  Copyright © 2020 delma. All rights reserved.
//

import Foundation
import CoreLocation

class LocationManager: NSObject, CLLocationManagerDelegate {
    
    let locationManager = CLLocationManager()
    
    override init() {
        super.init()
        locationManager.delegate = self
        locationManager.requestWhenInUseAuthorization()
        locationManager.desiredAccuracy = kCLLocationAccuracyBest
        locationManager.startUpdatingLocation()
    }
    
    func findCoordinate() -> (latitude: Double, longitude: Double){
        let coordinate = locationManager.location?.coordinate
        guard let latitude = coordinate?.latitude, let longitude = coordinate?.longitude else { return (0, 0) }
        
        return (latitude, longitude)
    }
    
}
