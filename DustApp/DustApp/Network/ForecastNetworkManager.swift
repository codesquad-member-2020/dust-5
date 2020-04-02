//
//  ForecastNetworkManager.swift
//  DustApp
//
//  Created by delma on 2020/04/02.
//  Copyright © 2020 delma. All rights reserved.
//

import Foundation

class ForecastNetworkManager {
    let urlDataTask = URLDataTask()
    let url = URL(string: "http://52.78.167.59:8080/forecast")
     
     func requestForecastData(handler: @escaping (Forecast) -> ()) {
        guard let url = url else { return }
        urlDataTask.request(url: url, methodType: .get) { result in
             switch result {
             case .success(let anyData):
                 handler(anyData as! Forecast)
             case .failure(let error):
                 print(error.localizedDescription)
             }
         }
     }
}
