//
//  ForecastViewController.swift
//  DustApp
//
//  Created by delma on 2020/03/29.
//  Copyright © 2020 delma. All rights reserved.
//

import UIKit

class ForecastViewController: UIViewController {

    @IBOutlet var PMImage: UIImageView!
    @IBOutlet var announceTextView: UITextView!
    @IBOutlet var areaGradeTextView: UITextView!
    @IBOutlet var playButton: UIButton!
    @IBOutlet var playSlider: UISlider!
    
    let forecastManager = ForecastNetworkManager()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        forecastManager.requestForecastData { data in
        }
    }
    


}
