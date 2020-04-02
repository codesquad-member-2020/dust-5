//
//  URLDataTask.swift
//  DustApp
//
//  Created by delma on 2020/03/31.
//  Copyright © 2020 delma. All rights reserved.
//

import Foundation

class URLDataTask {
    enum HTTPMethod: String {
        case get = "GET"
        case post = "POST"
        case put = "PUT"
        case delete = "DELETE"
    }
    
    func request(url: URL, methodType: HTTPMethod, body: Data? = nil, completion: @escaping(Result<Any, NetworkError>) -> Void) {
        
        var request = URLRequest(url: url)
        request.httpMethod = methodType.rawValue
        request.setValue("application/json", forHTTPHeaderField: "Content-Type")
        request.httpBody = body
        
        let session = URLSession.shared
        let task = session.dataTask(with: request) { (data, response, error) in
            guard let data = data, error == nil else {
                if let error = error as NSError?, error.domain == NSURLErrorDomain {
                    completion(.failure(.domainError))
                }
                return
            }
            if url.absoluteString.contains("dust-status") {
                self.decodeDustData(data: data) { completion($0) }
            }else {
                self.decodeForecastData(data: data) { completion($0) }
            }
            
        }
        task.resume()
    }
    
    func decodeDustData(data: Data, completion: @escaping(Result<Any, NetworkError>) -> Void) {
        let decoder = JSONDecoder()
        guard let anyData = try? decoder.decode(MeasuredHistory.self, from: data) else {
            completion(.failure(.decodingError)); return }
        completion(.success(anyData))
    }
    
    func decodeForecastData(data: Data, completion: @escaping(Result<Any, NetworkError>) -> Void) {
        let decoder = JSONDecoder()
        guard let anyData = try? decoder.decode(Forecast.self, from: data) else {
            completion(.failure(.decodingError)); return }
        completion(.success(anyData))
    }
}
