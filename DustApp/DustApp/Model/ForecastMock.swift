//
//  ForecastMock.swift
//  DustApp
//
//  Created by delma on 2020/04/02.
//  Copyright © 2020 delma. All rights reserved.
//

import Foundation
class ForecastMock {
    let mockData = Forecast(status: "SUCCESS", contents: ForecastMockDetail().mockDetail)
}
