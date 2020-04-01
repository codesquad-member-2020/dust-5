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
    @IBOutlet var statusView: StatusView!
    @IBOutlet var tableView: TimelineTableView!
    
    var locationManager: LocationManager!
    let dustNetworkManager = Dust24NetworkManager()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        locationManager = LocationManager()
        requestQueryWithCoordinate()
        tableView.statusView = statusView
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
                self.setFirstCellData()
            }
        }
    }
    
    func setFirstCellData() {
        guard let cell = tableView.cellForRow(at: IndexPath(row: 0, section: 0)) as? TimelineTableViewCell else { return }
        guard let state = cell.dustState else { return }
        guard let measuredTime = cell.measuredTime else { return }
        guard let measuredPlace = cell.measuredPlace else { return }
        guard let statusView = statusView else { return }
        statusView.setUpData(state: state, measuredTime: measuredTime, measuredPlace: measuredPlace)
    }
}

