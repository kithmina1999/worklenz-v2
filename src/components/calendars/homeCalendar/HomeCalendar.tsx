import { Calendar } from 'antd'
import React from 'react'
import type { Dayjs } from 'dayjs'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { selectedDate } from '../../../features/date/dateSlice'
import { useAppSelector } from '../../../hooks/useAppSelector'
/* homepage calendar style override  */
import './homeCalendar.css'

const HomeCalendar = () => {
    const dispatch = useAppDispatch()
    const date = useAppSelector((state) => state.dateReducer.date)

    const onSelect = (newValue: Dayjs) => {
        dispatch(selectedDate(newValue))
    }

    return (
        <Calendar className="home-calendar" value={date} onSelect={onSelect} />
    )
}

export default HomeCalendar
