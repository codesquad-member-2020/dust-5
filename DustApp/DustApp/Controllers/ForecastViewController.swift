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
    
    let mock = Forecast(status: "SUCCESS", contents: ForecastMockDetail().mockDetail)
    var forecastImages: [UIImage] = []
    
    override func viewDidLoad() {
        super.viewDidLoad()
//                forecastManager.requestForecastData { data in
 //                   print(data)
 //       }
        setUpSlider()
       stringToImage()
    }
    
    func stringToImage()  {
        let imageUrls = mock.contents.imageList
        imageUrls.forEach { imageString in
            
            do {
                guard let imageURL = URL(string: imageString) else { return }
                let data = try Data(contentsOf: imageURL)
                guard let image = UIImage(data: data) else { return }
                forecastImages.append(image)
            }catch {
                
            }
        }
        setPMImage(image: forecastImages[0])
        PMImage.animationImages = forecastImages
        PMImage.animationDuration = 2
    }
    
    func setPMImage(image: UIImage) {
        PMImage.image = image
    }
    
    func setUpSlider() {
        playSlider.minimumValue = 0
        playSlider.maximumValue = 1
        playSlider.value = 0.2
    }
    
    @IBAction func pressPlayButton(_ sender: UIButton) {
        if !isPlaying {
            playButton.setImage(UIImage(systemName: "pause.fill"), for: .normal)
            isPlaying = true
            PMImage.startAnimating()
        }else {
            playButton.setImage(UIImage(systemName: "play.fill"), for: .normal)
            isPlaying = false
            PMImage.stopAnimating()
        }
    }
    
    @objc func sliderValueChange(_ sender: UISlider) {
        
    }
    
}
