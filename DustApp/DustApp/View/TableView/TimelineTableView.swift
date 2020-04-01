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
        cell.measuredValue.text = "\(figure[indexPath.row])"
        //여기서 각 셀마다 컬러 변경 필요
        return cell
    }
    
    func scrollViewDidScroll(_ scrollView: UIScrollView) {
        if let cell = self.visibleCells.first as? TimelineTableViewCell {
            //여기서 셀이 가진 데이터 가져와서 뷰컨의 라벨들에게 뿌려줘야함..
        }
    }
    
    
}