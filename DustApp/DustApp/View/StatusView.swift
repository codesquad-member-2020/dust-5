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
    
    func makeGradientView(gradientColor: [Any]) {
        let gradient = CAGradientLayer()
        gradient.frame = self.bounds
        gradient.endPoint = CGPoint(x: 0.5, y: 1)
        gradient.colors = gradientColor
        self.layer.insertSublayer(gradient, at: 0)
    }
    
}
