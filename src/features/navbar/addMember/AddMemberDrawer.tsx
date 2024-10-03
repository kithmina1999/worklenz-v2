import { Button, Drawer, Form, Input, Select, Typography } from 'antd'
import React from 'react'
import { useAppSelector } from '../../../hooks/useAppSelector'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { toggleDrawer } from './addMemberSlice'
import { colors } from '../../../styles/colors'

const AddMemberDrawer = () => {
    const isDrawerOpen = useAppSelector(
        (state) => state.addMemberReducer.isDrawerOpen
    )
    const dispatch = useAppDispatch()

    const [form] = Form.useForm()

    return (
        <Drawer
            title={
                <Typography.Text style={{ fontWeight: 500, fontSize: 16 }}>
                    Add Member
                </Typography.Text>
            }
            open={isDrawerOpen}
            onClose={() => dispatch(toggleDrawer())}
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    label="Email(s)"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter a Name',
                        },
                    ]}
                >
                    <Input
                        type="email"
                        placeholder="Add team members by email"
                    />
                    <Typography.Text
                        style={{ fontSize: 12, color: colors.lightGray }}
                    >
                        Invitees will be added to the team either they accept
                        the invitation or not.
                    </Typography.Text>
                </Form.Item>
                <Form.Item label="Job Title" name="jobTitle">
                    <Input placeholder="Select the job title(Optional)" />
                </Form.Item>
                <Form.Item label="Access" name="access">
                    <Select
                        defaultValue={'member'}
                        options={[
                            { value: 'member', label: 'Member' },
                            { value: 'admin', label: 'Admin' },
                        ]}
                    />
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        style={{ width: '100%' }}
                        htmlType="submit"
                    >
                        Add to team
                    </Button>
                </Form.Item>
            </Form>
        </Drawer>
    )
}

export default AddMemberDrawer
