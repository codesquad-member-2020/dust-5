//
//  StatusView.swift
//  DustApp
//
//  Created by delma on 2020/04/01.
//  Copyright © 2020 delma. All rights reserved.
//

import UIKit

class StatusView: UIView {

    @IBOutlet var statusImage: UIImageView!
    @IBOutlet var statusGrade: UILabel!
    @IBOutlet var statusValue: UILabel!
    @IBOutlet var statusTime: UILabel!
    @IBOutlet var statusPlace: UILabel!
    let gradient = CAGradientLayer()

    override init(frame: CGRect) {
        super.init(frame: frame)
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
    }
    
    func makeGradientView(gradientColor: [Any]) {
        gradient.frame = self.bounds
        gradient.endPoint = CGPoint(x: 0.5, y: 1)
        gradient.colors = gradientColor
        self.layer.insertSublayer(gradient, at: 0)
    }
    
    func setUpData(state: DustState, measuredTime: String, measuredPlace: String) {
        let start = String.Index(encodedOffset: 10)
        let end = measuredTime.index(before: measuredTime.endIndex)
        let substring = measuredTime[start...end]
        
        statusImage.image = state.stateEmoji
        statusGrade.text = state.state
        statusValue.text = "\(state.measureValue)"
        statusTime.text = String(substring)
        statusPlace.text = measuredPlace
        makeGradientView(gradientColor: state.gradientColor)
    }
}
