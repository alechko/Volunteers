import {observer} from "mobx-react"
import React from 'react'
import moment from 'moment'
import {Button} from 'react-bootstrap'
require ('./ShiftBox.scss');
require("moment-duration-format")

const ShiftBox = observer(({heightPerMinute, shift, onEdit, onDelete, focusedShift, onFocus}) => {
    const {_id, title, color, startDate, endDate, volunteers} = shift
    const startOfDay = moment(startDate).startOf('day')
    const relStart = moment(startDate).diff(startOfDay, 'days', true)
    const relEnd = moment(endDate).diff(startOfDay, 'days', true)
    return <div id={_id} key={_id} className={`shift-box ${shift._id === focusedShift ? 'focused' :''}`}
            style={{ 
                left: `${shift.overlapIndex * 100 / shift.overlapCount}%`,
                top: `${relStart * 100}%`,
                width: `${100 / shift.overlapCount}%`,
                height: 0
                }}>
                <div className="box" style={{backgroundColor: color, height: moment(endDate).diff(startDate, 'minutes') * heightPerMinute}}  onClick={() => onFocus(_id)}>
                    <div className="title">{title}</div>
                    <div className="duration">{moment(startDate).format('H:mm')} - {moment(endDate).format('H:mm')}</div>
                    <div className="count">{volunteers.length} volunteers</div>
                    <div className="toolbar">
                        <Button bsSize="xsmall" onClick={() => onEdit(shift)} className="glyphicon glyphicon-edit" />
                        <Button bsSize="xsmall" onClick={() => onDelete(shift)} className="glyphicon glyphicon-trash" />
                    </div>
                </div>

        </div> 
})

export default ShiftBox