import React, { useState } from 'react'
import { Dropdown, Menu, Checkbox, Button, Input } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import './AddMembersDropdown.css'

const AddMembersDropdown: React.FC = () => {
    const [checkedMembers, setCheckedMembers] = useState<string[]>([])

    const handleCheck = (member: string) => {
        setCheckedMembers((prevChecked) =>
            prevChecked.includes(member)
                ? prevChecked.filter((m) => m !== member)
                : [...prevChecked, member]
        )
    }

    const inviteItems = [
        {
            key: '1',
            label: (
                <Checkbox
                    checked={checkedMembers.includes('Invite Member 1')}
                    onClick={(e) => e.stopPropagation()} // Prevent dropdown from closing
                    onChange={() => handleCheck('Invite Member 1')}
                >
                    Invite Member 1
                </Checkbox>
            ),
        },
        {
            key: '2',
            label: (
                <Checkbox
                    checked={checkedMembers.includes('Invite Member 2')}
                    onClick={(e) => e.stopPropagation()} // Prevent dropdown from closing
                    onChange={() => handleCheck('Invite Member 2')}
                >
                    Invite Member 2
                </Checkbox>
            ),
        },
        {
            key: '3',
            label: (
                <Checkbox
                    checked={checkedMembers.includes('Invite Member 3')}
                    onClick={(e) => e.stopPropagation()} // Prevent dropdown from closing
                    onChange={() => handleCheck('Invite Member 3')}
                >
                    Invite Member 3
                </Checkbox>
            ),
        },
        {
            key: '4',
            label: (
                <Checkbox
                    checked={checkedMembers.includes('Invite Member 4')}
                    onClick={(e) => e.stopPropagation()} // Prevent dropdown from closing
                    onChange={() => handleCheck('Invite Member 4')}
                >
                    Invite Member 4
                </Checkbox>
            ),
        },
        {
            key: '5',
            label: (
                <Checkbox
                    checked={checkedMembers.includes('Invite Member 5')}
                    onClick={(e) => e.stopPropagation()} // Prevent dropdown from closing
                    onChange={() => handleCheck('Invite Member 5')}
                >
                    Invite Member 5
                </Checkbox>
            ),
        },
    ]

    // Define menu items with header and footer
    const menu = (
        <div>
            {/* Header */}
            <div style={{ backgroundColor: 'white', padding: '8px 16px', fontWeight: 'bold'}}>
                <Input
                    placeholder="Search by name"
                />    
            </div>

            {/* Invite Items */}
            <Menu
                items={inviteItems}
                style={{
                    maxHeight: '300px',
                    overflowY: 'auto',
                }}
            />

            {/* Footer */}
            <div style={{ padding: '8px', textAlign: 'right' }}>
                <Button
                    type="primary"
                    size="small"
                    onClick={() => {
                        console.log('Selected Members:', checkedMembers)
                    }}
                >
                    Ok
                </Button>
            </div>
        </div>
    )

    return (
        <Dropdown
            menu={{ items: inviteItems }}
            trigger={['click']}
            dropdownRender={() => menu}  
            overlayClassName="custom-dropdown-menu"
            overlayStyle={{
                width: '300px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
            }}
        >
            <PlusOutlined />
        </Dropdown>
    )
}

export default AddMembersDropdown
