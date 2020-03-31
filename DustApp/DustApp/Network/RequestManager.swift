//
//  RequestManager.swift
//  DustApp
//
//  Created by delma on 2020/03/31.
//  Copyright © 2020 delma. All rights reserved.
//

import Foundation

class RequestManager {
    enum HTTPMethod: String {
           case get = "GET"
           case post = "POST"
           case put = "PUT"
           case delete = "DELETE"
       }
       
    //bool값 리턴이 아닌 data(response 값) 리턴하도록 
       func request(url: String, methodType: HTTPMethod, body: Data? = nil) -> Bool {
           guard let url = URL(string: url) else { return false }
           
           var request = URLRequest(url: url)
           request.httpMethod = methodType.rawValue
           request.setValue("application/json", forHTTPHeaderField: "Content-Type")
           request.httpBody = body
           
           let session = URLSession.shared
           let task = session.dataTask(with: request) { (data, response, error) in
               guard error == nil else { return }
               
               do {
                   let anyData = try JSONSerialization.jsonObject(with: data!, options: [])
                  guard let nsDictionary = anyData as? NSDictionary else { return }
                   guard let statusValue = nsDictionary["status"] as? String else { return }
                  let status = statusValue.utf8
                   guard String(status) == "ERROR" else { return }
                   } catch {
                   
               }
           }
           
           task.resume()
           return true
       }
}
