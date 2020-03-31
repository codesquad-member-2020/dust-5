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
    
    func request(url: String, methodType: HTTPMethod, body: Data? = nil, completion: @escaping(Result<Any, NetworkError>) -> Void) {
        guard let url = URL(string: url) else { return  }
        
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
            
            do {
                let anyData = try JSONSerialization.jsonObject(with: data, options: [])
                completion(.success(anyData))
            } catch {
                completion(.failure(.decodingError))
            }
        }
        
        task.resume()
    }
}
