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
    
    var forecastImages: [UIImage] = []
    var forecast: Forecast?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        forecastManager.requestForecastData { data in
            DispatchQueue.main.sync {
                self.forecast = data
                self.setUpSlider()
                self.stringToImage()
                self.setStringData()
            }
            
        }
        
    }
    
    func stringToImage()  {
        guard let forecast = forecast else { return }
        for i in 0..<forecast.contents.count {
            let imageUrls = forecast.contents[i].imageList
            imageUrls.forEach { imageString in
                
                do {
                    guard let imageURL = URL(string: imageString) else { return }
                    let data = try Data(contentsOf: imageURL)
                    guard let image = UIImage(data: data) else { return }
                    forecastImages.append(image)
                }catch {
                    
                }
            }
        }
        setPMImage(image: forecastImages[0])
        PMImage.animationImages = forecastImages
        PMImage.animationDuration = 2
    }
    
    func setPMImage(image: UIImage) {
        PMImage.image = image
    }
    
    func setStringData() {
        guard let forecast = forecast else { return }
        announceTextView.text = forecast.contents[0].informCause
        areaGradeTextView.text = forecast.contents[0].informGrade
    }
    
    func setUpSlider() {
        playSlider.minimumValue = 0
        playSlider.maximumValue = 1
        playSlider.value = 0.0
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
    
    
    //전체 이미지 갯수로 slider의 value를 나눔
    //각각의 이미지가 몫을 가짐
    //슬라이더로 밸류값이 변경되면 그 밸류값에 해당하는 이미지가 표시
    
    
    
}
