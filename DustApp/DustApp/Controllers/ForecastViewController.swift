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
    private var isPlaying = false
    
    override func viewDidLoad() {
        super.viewDidLoad()
//        forecastManager.requestForecastData { data in
//        }
    }
    
    @IBAction func pressPlayButton(_ sender: UIButton) {
        if !isPlaying {
            playButton.setImage(UIImage(systemName: "pause.fill"), for: .normal)
            isPlaying = true
        }else {
            playButton.setImage(UIImage(systemName: "play.fill"), for: .normal)
            isPlaying = false
        }
    }
    


}
