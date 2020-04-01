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
    @IBOutlet var gradientView: UIView!
    @IBOutlet var statusImage: UIImageView!
    @IBOutlet var statusLabel: UILabel!
    @IBOutlet var statusValueLabel: UILabel!
    @IBOutlet var measureTimeLabel: UILabel!
    @IBOutlet var measurePlaceLabel: UILabel!
    @IBOutlet var tableView: TimelineTableView!
    
    var locationManager: LocationManager!
    let dustNetworkManager = Dust24NetworkManager()
    var measuredValue:Int = 67
    
    override func viewDidLoad() {
        super.viewDidLoad()
        locationManager = LocationManager()
        
        requestQueryWithCoordinate()
        let state = measureDustGrade(measuredValue: measuredValue)
        inputUIValues(state: state)
        
    }
    
    func requestQueryWithCoordinate() {
        let coordinate = locationManager.findCoordinate()
        
        if let urlWithCoordinate = dustNetworkManager.makeRequest24DustQuery(latitude: coordinate.latitude, longitude: coordinate.longitude) {
            request24DustDate(url: urlWithCoordinate)
        }
    }
    
    func request24DustDate(url: URL) {
        dustNetworkManager.request24DustData(urlWithQuery: url)
    }
    
    func makeGradientView(gradientColor: [Any]) {
        let gradient = CAGradientLayer()
        gradient.frame = view.bounds
        gradient.endPoint = CGPoint(x: 0.5, y: 1)
        gradient.colors = gradientColor
        gradientView.layer.insertSublayer(gradient, at: 0)
    }
    
    func inputStatusImage(stateEmoji: UIImage) {
        statusImage.image = stateEmoji
    }
    
    func inputStatusLabel(state: String) {
        statusLabel.text = state
    }
    
    func inputStatusValueLabel(measuredValue: Int) {
        statusValueLabel.text = "\(measuredValue)"
    }
    
    func measureDustGrade(measuredValue: Int) -> DustState {
        let grade = DustGrade(measuredValue)
        return grade.gradeDustState(measuredValue: measuredValue)
    }
    
    func inputUIValues(state: DustState) {
        makeGradientView(gradientColor: state.gradientColor)
        inputStatusImage(stateEmoji: state.stateEmoji)
        inputStatusLabel(state: state.state)
        inputStatusValueLabel(measuredValue: measuredValue)
    }
}
