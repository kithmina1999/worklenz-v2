import { Badge, Form, Input, Select, Typography } from 'antd'
import React from 'react'
import { colors } from '../../../styles/colors'
import { useAppSelector } from '../../../hooks/useAppSelector'

const AddTaskInlineForm = () => {
    const projectList = useAppSelector(
        (state) => state.createProjectReducer.projects
    )

    // due date select options
    const dueDateOptions = [
        {
            value: 'today',
            label: 'Today',
        },
        {
            value: 'tomorrow',
            label: 'Tomorrow',
        },
        {
            value: 'nextWeek',
            label: 'Next Week',
        },
        {
            value: 'nextMonth',
            label: 'Next Month',
        },
        {
            value: 'noDueDate',
            label: 'No Due Date',
        },
    ]

    // project options
    let projectOptions = [
        ...projectList.map((project) => ({
            label: project.name,
        })),
    ]

    return (
        <Form style={{ display: 'flex', gap: 8 }}>
            <Form.Item style={{ width: '100%', maxWidth: 400 }}>
                <Input placeholder="+ Add Task" style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item style={{ width: '100%', maxWidth: 200 }}>
                <Select
                    suffixIcon={null}
                    options={dueDateOptions}
                    defaultValue={'noDueDate'}
                />
            </Form.Item>

            <Form.Item style={{ width: '100%', maxWidth: 200 }}>
                <Select
                    suffixIcon={null}
                    placeholder={'Project'}
                    options={projectOptions}
                    showSearch
                    optionFilterProp="label"
                    filterSort={(optionA, optionB) =>
                        (optionA?.label ?? '')
                            .toLowerCase()
                            .localeCompare((optionB?.label ?? '').toLowerCase())
                    }
                />
            </Form.Item>
        </Form>
    )
}

export default AddTaskInlineForm
