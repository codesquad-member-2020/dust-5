//
//  RequestManager.swift
//  DustApp
//
//  Created by delma on 2020/03/31.
//  Copyright © 2020 delma. All rights reserved.
//

import Foundation

class NetworkManager {
    let urlDataTask = URLDataTask()
    let encodeManager = EncodeManager()
    let locationManager = LocationManager()
    let url: String
    
    init(url: String) {
        self.url = url
    }
    
    func getEncodedCoordinateData() -> Data? {
        let coordinate = locationManager.findCoordinate()
        guard let latitude = coordinate.latitude, let longitude = coordinate.longitude else { return nil }
    
        return encodeManager.encodeCoordinate(latitude: latitude, longitude: longitude)
    }
    
    func request24DustData() {
        urlDataTask.request(url: url, methodType: .post, body: getEncodedCoordinateData()) { result in
            switch result {
                case .success(let responseData):
                    self.encode24DustData(data: responseData)
                case .failure(let error):
                    //추후 에러 핸들링 방법 추가하기
                    print(error.localizedDescription)
            }
        }
    }
    
    func encode24DustData(data: Data) {
        
    }
}
