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
    
    var measuredValue:Int = 67
    
    override func viewDidLoad() {
        super.viewDidLoad()
        let state = measureDustGrade(measuredValue: measuredValue)
        inputUIValues(state: state)
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
