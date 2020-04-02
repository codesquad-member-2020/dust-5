//
//  Dust24NetworkManager.swift
//  DustApp
//
//  Created by delma on 2020/03/31.
//  Copyright © 2020 delma. All rights reserved.
//

import Foundation

class Dust24NetworkManager {
    let urlDataTask = URLDataTask()
    let url: String = "http://52.78.167.59:8080/forecast/dust-status"
   
    
    func makeRequest24DustQuery(latitude: Double, longitude: Double) -> URL? {
        guard var urlComponent = URLComponents(string: url) else { return nil }
        let queryItemLongitude = URLQueryItem(name: "x", value: String(longitude))
        let queryItemLatitude = URLQueryItem(name: "y", value: String(latitude))
       
        urlComponent.queryItems = [queryItemLongitude, queryItemLatitude]
        guard let url = urlComponent.url else { return nil }
        return url
    }
    
    func request24DustData(urlWithQuery: URL, handler: @escaping (MeasuredHistory) -> ()) {
        urlDataTask.request(url: urlWithQuery, methodType: .get) { result in
            switch result {
            case .success(let anyData):
                handler(anyData as! MeasuredHistory)
            case .failure(let error):
                //추후 에러 핸들링 방법 추가하기
                print(error.localizedDescription)
            }
        }
    }
}
