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
    
    override func viewDidLoad() {
        super.viewDidLoad()
        makeGradientView()
    }
   
    func makeGradientView() {
        let gradient = CAGradientLayer()

        gradient.frame = view.bounds
        gradient.endPoint = CGPoint(x: 0.5, y: 1)
        
        gradient.colors = [
            UIColor(red: 0, green: 0.5, blue: 0.9, alpha: 0.6).cgColor,
            UIColor(red: 0, green: 0, blue: 0, alpha: 0).cgColor
        ]
        gradientView.layer.insertSublayer(gradient, at: 0)
    }
}
