//
//  TimelineTableView.swift
//  DustApp
//
//  Created by delma on 2020/03/30.
//  Copyright © 2020 delma. All rights reserved.
//

import UIKit

class TimelineTableView: UITableView, UITableViewDataSource, UITableViewDelegate {
    
    var measuredHistory: MeasuredHistory?
    var grade: DustGrade?
    
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
        return measuredHistory?.contents.forecast.count ?? 0
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCell(withIdentifier: "TimelineTableViewCell", for: indexPath) as! TimelineTableViewCell
        guard let cellData = measuredHistory?.contents.forecast[indexPath.row] else { return cell }
        guard let pm10Value = Double(cellData.pm10Value) else { return cell }
        let percent = pm10Value / 200.0
        cell.setConstraint(percentage: CGFloat(percent))
        cell.measuredValue.text = "\(Int(pm10Value))"
        cell.dustState = measureDustGrade(measuredValue: Int(pm10Value))
        guard let backgroundColor = cell.dustState?.color else { return cell }
        cell.measuredBar.backgroundColor = backgroundColor

        return cell
    }
    
    func scrollViewDidScroll(_ scrollView: UIScrollView) {
        if let cell = self.visibleCells.first as? TimelineTableViewCell {
            //여기서 셀이 가진 데이터 가져와서 뷰컨의 라벨들에게 뿌려줘야함..
        }
    }
    
    func measureDustGrade(measuredValue: Int) -> DustState? {
           grade = DustGrade(measuredValue)
        return grade?.gradeDustState(measuredValue: measuredValue)
       }
       
    
}
