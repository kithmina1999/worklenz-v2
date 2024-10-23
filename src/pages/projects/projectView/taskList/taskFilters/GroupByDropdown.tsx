import { CaretDownFilled, SettingOutlined } from '@ant-design/icons'
import { Button, ConfigProvider, Flex, Select } from 'antd'
import React, { useState } from 'react'
import { colors } from '../../../../../styles/colors'

const GroupByDropdown = () => {
    type GroupTypes = 'status' | 'priority' | 'phase'

    const [activeGroup, setActiveGroup] = useState<GroupTypes>('status')

    const handleChange = (value: string) => {
        setActiveGroup(value as GroupTypes)
    }

    const groupDropdownMenuItems = [
        { key: 'status', value: 'status', label: 'Status' },
        { key: 'priority', value: 'priority', label: 'Priority' },
        { key: 'phase', value: 'phase', label: 'Phase' },
    ]

    return (
        <Flex align="center" gap={4} style={{ marginInlineStart: 12 }}>
            Group by:
            <Select
                defaultValue={'status'}
                options={groupDropdownMenuItems}
                onChange={handleChange}
                suffixIcon={<CaretDownFilled />}
            />
            {(activeGroup === 'status' || activeGroup === 'phase') && (
                <ConfigProvider wave={{ disabled: true }}>
                    <Button
                        className="borderless-icon-btn"
                        icon={
                            <SettingOutlined
                                style={{ color: colors.skyBlue }}
                            />
                        }
                    />
                </ConfigProvider>
            )}
        </Flex>
    )
}

export default GroupByDropdown
