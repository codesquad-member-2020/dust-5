//
//  TimelineTableView.swift
//  DustApp
//
//  Created by delma on 2020/03/30.
//  Copyright © 2020 delma. All rights reserved.
//

import UIKit

class TimelineTableView: UITableView, UITableViewDataSource, UITableViewDelegate {
    
    var figure = [0.8, 0.2, 0.3, 0.5, 0.1, 0.7, 0.9, 0.2, 0.3, 0.5, 0.1, 0.7, 0.9, 0.2, 0.3, 0.5, 0.1, 0.7, 0.9, 0.2, 0.3, 0.5, 0.1, 0.7]
    
    
    override init(frame: CGRect, style: UITableView.Style) {
        super.init(frame: frame, style: .plain)
        self.delegate = self
        self.dataSource = self
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
        self.delegate = self
        self.dataSource = self
    }
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return figure.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "TimelineTableViewCell", for: indexPath) as! TimelineTableViewCell
        cell.setConstraint(percentage: CGFloat(figure[indexPath.row]))
        cell.measuredBar.backgroundColor = .blue
        
        return cell
    }
    
    
    
}
