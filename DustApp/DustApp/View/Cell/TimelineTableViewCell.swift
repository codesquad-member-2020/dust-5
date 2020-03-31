//
//  TimelineTableViewCell.swift
//  DustApp
//
//  Created by delma on 2020/03/30.
//  Copyright © 2020 delma. All rights reserved.
//

import UIKit

class TimelineTableViewCell: UITableViewCell {

    @IBOutlet var measuredValue: UILabel!
    @IBOutlet var measuredBar: UIView!
    
    override init(style: UITableViewCell.CellStyle, reuseIdentifier: String?) {
        super.init(style: style, reuseIdentifier: reuseIdentifier)
    }
    
    required init?(coder: NSCoder) {
        super.init(coder: coder)
    }
    
    override func awakeFromNib() {
        super.awakeFromNib()
    }

    override func setSelected(_ selected: Bool, animated: Bool) {
        super.setSelected(selected, animated: animated)
    }

    func setConstraint(percentage: CGFloat) {
        measuredBar.translatesAutoresizingMaskIntoConstraints = false
        
        measuredBar.topAnchor.constraint(equalTo: self.contentView.topAnchor).isActive = true
        measuredBar.bottomAnchor.constraint(equalTo: self.contentView.bottomAnchor).isActive = true
        measuredBar.leadingAnchor.constraint(equalTo: self.contentView.leadingAnchor).isActive = true
        NSLayoutConstraint(item: measuredBar, attribute: .width, relatedBy: .equal, toItem: self.contentView, attribute: .width, multiplier: percentage, constant: 0).isActive = true

    }
}
