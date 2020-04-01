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
    var statusView: StatusView?
    
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
        guard let cellContents = measuredHistory?.contents else { return cell }
        let cellData = cellContents.forecast[indexPath.row]
        //측정 날짜시간 중 시간만 추출 필요
        cell.measuredTime = cellData.dataTime
        cell.measuredPlace = cellContents.station
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
        guard let cell = self.visibleCells.first as? TimelineTableViewCell, let state = cell.dustState, let measuredTime = cell.measuredTime, let measuredPlace = cell.measuredPlace, let statusView = statusView else { return }
        statusView.setUpData(state: state, measuredTime: measuredTime, measuredPlace: measuredPlace)
    }
    
    func measureDustGrade(measuredValue: Int) -> DustState? {
        grade = DustGrade(measuredValue)
        return grade?.gradeDustState(measuredValue: measuredValue)
    }
    
    
}
