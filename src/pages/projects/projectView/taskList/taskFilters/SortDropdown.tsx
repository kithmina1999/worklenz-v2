import {
    CaretDownFilled,
    SortAscendingOutlined,
    SortDescendingOutlined,
} from '@ant-design/icons'
import { Badge, Button, Card, Checkbox, Dropdown, List, Space } from 'antd'
import React, { useState } from 'react'
import { colors } from '../../../../../styles/colors'

const SortDropdown = () => {
    const [selectedCount, setSelectedCount] = useState<number>(0)
    const [sortState, setSortState] = useState<
        Record<string, 'ascending' | 'descending'>
    >({})

    // handle selected filters count
    const handleSelectedFiltersCount = (checked: boolean) => {
        setSelectedCount((prev) => (checked ? prev + 1 : prev - 1))
    }

    // fuction for handle sort
    const handleSort = (key: string) => {
        setSortState((prev) => ({
            ...prev,
            [key]: prev[key] === 'ascending' ? 'descending' : 'ascending',
        }))
    }

    // sort dropdown items
    type SortFieldsType = {
        key: string
        label: string
    }

    const sortFieldsList: SortFieldsType[] = [
        { key: 'task', label: 'Task' },
        { key: 'status', label: 'Status' },
        { key: 'priority', label: 'Priority' },
        { key: 'startDate', label: 'Start Date' },
        { key: 'endDate', label: 'End Date' },
        { key: 'completedDate', label: 'Completed Date' },
        { key: 'createdDate', label: 'Created Date' },
        { key: 'lastUpdated', label: 'Last Updated' },
    ]

    // custom dropdown content
    const sortDropdownContent = (
        <Card className="custom-card" styles={{ body: { padding: 0 } }}>
            <List style={{ padding: 0 }}>
                {sortFieldsList.map((item) => (
                    <List.Item
                        className="custom-list-item"
                        key={item.key}
                        style={{
                            display: 'flex',
                            gap: 8,
                            padding: '4px 8px',
                            border: 'none',
                        }}
                    >
                        <Space>
                            <Checkbox
                                id={item.key}
                                onChange={(e) =>
                                    handleSelectedFiltersCount(e.target.checked)
                                }
                            />
                            {item.label}
                        </Space>
                        <Button
                            onClick={() => handleSort(item.key)}
                            icon={
                                sortState[item.key] === 'ascending' ? (
                                    <SortAscendingOutlined />
                                ) : (
                                    <SortDescendingOutlined />
                                )
                            }
                        />
                    </List.Item>
                ))}
            </List>
        </Card>
    )

    return (
        <Dropdown
            overlayClassName="custom-dropdown"
            trigger={['click']}
            dropdownRender={() => sortDropdownContent}
        >
            <Button
                icon={<CaretDownFilled />}
                iconPosition="end"
                style={{
                    backgroundColor:
                        selectedCount > 0
                            ? colors.paleBlue
                            : colors.transparent,

                    color: selectedCount > 0 ? colors.darkGray : '#dddddd',
                }}
            >
                <Space>
                    <SortAscendingOutlined />
                    Sort
                    {selectedCount > 0 && (
                        <Badge
                            size="small"
                            count={selectedCount}
                            color={colors.skyBlue}
                        />
                    )}
                </Space>
            </Button>
        </Dropdown>
    )
}

export default SortDropdown
