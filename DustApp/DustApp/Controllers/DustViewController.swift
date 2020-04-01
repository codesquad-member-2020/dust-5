//
//  DustViewController.swift
//  DustApp
//
//  Created by delma on 2020/03/29.
//  Copyright © 2020 delma. All rights reserved.
//

import UIKit
import CoreLocation

class DustViewController: UIViewController, CLLocationManagerDelegate {
    @IBOutlet var gradientView: StatusView!
    @IBOutlet var tableView: TimelineTableView!
    
    var locationManager: LocationManager!
    let dustNetworkManager = Dust24NetworkManager()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        locationManager = LocationManager()
        requestQueryWithCoordinate()
    }
    
    func requestQueryWithCoordinate() {
        let coordinate = locationManager.findCoordinate()
        
        if let urlWithCoordinate = dustNetworkManager.makeRequest24DustQuery(latitude: coordinate.latitude, longitude: coordinate.longitude) {
            request24DustDate(url: urlWithCoordinate)
        }
    }
    
    func request24DustDate(url: URL) {
        dustNetworkManager.request24DustData(urlWithQuery: url) { data in
            self.tableView.measuredHistory = data
            DispatchQueue.main.async {
                self.tableView.reloadData()
            }
        }
    }
}

