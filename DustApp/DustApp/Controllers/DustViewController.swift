//
//  DustViewController.swift
//  DustApp
//
//  Created by delma on 2020/03/29.
//  Copyright © 2020 delma. All rights reserved.
//

import UIKit

class DustViewController: UIViewController {
    
    @IBOutlet var gradientView: UIView!
    @IBOutlet var statusImage: UIImageView!
    @IBOutlet var statusLabel: UILabel!
    @IBOutlet var statusValueLabel: UILabel!
    @IBOutlet var measureTimeLabel: UILabel!
    @IBOutlet var measurePlaceLabel: UILabel!
    
    var measuredValue:Int = 30
    
    override func viewDidLoad() {
        super.viewDidLoad()
        measureDustGrade(measuredValue: measuredValue)
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
    
    func measureDustGrade(measuredValue: Int) {
        let grade = DustGrade(measuredValue)
        let state = grade.gradeDustState(measuredValue: measuredValue)
        makeGradientView(gradientColor: state.gradientColor)
        inputStatusImage(stateEmoji: state.stateEmoji)
    }
}
