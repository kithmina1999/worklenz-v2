import React from 'react'
import { colors } from '../../styles/colors'
import {
    CloseCircleTwoTone,
    StopOutlined,
    ClockCircleOutlined,
    ClockCircleTwoTone,
    CheckCircleTwoTone,
} from '@ant-design/icons'

// color for project
export const projectColors = [
    '#154c9b',
    '#3b7ad4',
    '#70a6f3',
    '#7781ca',
    '#9877ca',
    '#c178c9',
    '#ee87c5',
    '#ca7881',
    '#75c9c0',
    '#75c997',
    '#80ca79',
    '#aacb78',
    '#cbbc78',
    '#cb9878',
    '#bb774c',
] as const

// status data for project
export const statusData = [
    {
        value: 'cancelled',
        label: 'Cancelled',
        icon: React.createElement(CloseCircleTwoTone, {
            twoToneColor: colors.vibrantOrange,
        }),
    },
    {
        value: 'blocked',
        label: 'Blocked',
        icon: React.createElement(StopOutlined),
    },
    {
        value: 'onHold',
        label: 'On Hold',
        icon: React.createElement(StopOutlined),
    },
    {
        value: 'proposed',
        label: 'Proposed',
        icon: React.createElement(ClockCircleOutlined),
    },
    {
        value: 'inPlanning',
        label: 'In Planning',
        icon: React.createElement(ClockCircleOutlined),
    },
    {
        value: 'inProgress',
        label: 'In Progress',
        icon: React.createElement(ClockCircleTwoTone, {
            twoToneColor: colors.limeGreen,
        }),
    },
    {
        value: 'completed',
        label: 'Completed',
        icon: React.createElement(CheckCircleTwoTone, {
            twoToneColor: colors.limeGreen,
        }),
    },
    {
        value: 'continuos',
        label: 'Continuos',
        icon: React.createElement(ClockCircleTwoTone, {
            twoToneColor: colors.limeGreen,
        }),
    },
] as const

// health status data for project
export const healthStatusData = [
    { value: 'notSet', label: 'Not Set', color: colors.paleBlue },
    {
        value: 'needAttention',
        label: 'Need Attention',
        color: colors.lightBeige,
    },
    { value: 'atRisk', label: 'At Risk', color: colors.vibrantOrange },
    { value: 'good', label: 'Good', color: colors.limeGreen },
] as const
