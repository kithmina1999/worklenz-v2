import {
    Button,
    Drawer,
    Flex,
    Form,
    Input,
    message,
    Select,
    Typography,
} from 'antd'
import React from 'react'
import { useAppSelector } from '../../../hooks/useAppSelector'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { addMember, toggleCreateMemberDrawer } from './memberSlice'
import { colors } from '../../../styles/colors'
import { MemberType } from '../../../types/member.types'
import { nanoid } from '@reduxjs/toolkit'
import { useTranslation } from 'react-i18next'

const AddMemberDrawer = () => {
    // localization
    const { t } = useTranslation('teamMembersSettings')

    const isDrawerOpen = useAppSelector(
        (state) => state.memberReducer.isCreateMemberDrawerOpen
    )
    const dispatch = useAppDispatch()

    // get job titles from redux - job reducer
    const jobsList = useAppSelector((state) => state.jobReducer.jobsList)

    const [form] = Form.useForm()

    // function for handle form submit
    const handleFormSubmit = async (values: any) => {
        try {
            const newMember: MemberType = {
                memberId: nanoid(),
                memberName: values.email.split('@')[0] || '',
                memberEmail: values.email,
                memberRole: values.access,
                jobTitle: values.jobTitle,
                isActivate: null,
                isInivitationAccept: false,
            }
            dispatch(addMember(newMember))
            form.resetFields()
            message.success(t('createMemberSuccessMessage'))
            dispatch(toggleCreateMemberDrawer())
        } catch (error) {
            message.error(t('createMemberErrorMessage'))
        }
    }

    return (
        <Drawer
            title={
                <Typography.Text style={{ fontWeight: 500, fontSize: 16 }}>
                    {t('addMemberDrawerTitle')}
                </Typography.Text>
            }
            open={isDrawerOpen}
            onClose={() => dispatch(toggleCreateMemberDrawer())}
        >
            <Form
                form={form}
                onFinish={handleFormSubmit}
                layout="vertical"
                initialValues={{ access: 'member' }}
            >
                <Form.Item
                    name="email"
                    label={t('memberEmailLabel')}
                    rules={[
                        {
                            type: 'email',
                            required: true,
                            message: t('memberEmailRequiredError'),
                        },
                    ]}
                >
                    <Flex vertical gap={4}>
                        <Input
                            type="email"
                            placeholder={t('memberEmailPlaceholder')}
                        />
                        <Typography.Text
                            style={{ fontSize: 12, color: colors.lightGray }}
                        >
                            {t('addMemberEmailHint')}
                        </Typography.Text>
                    </Flex>
                </Form.Item>

                <Form.Item label="Job Title" name="jobTitle">
                    <Select
                        size="middle"
                        placeholder={t('jobTitlePlaceholder')}
                        // dropdownRender={(menu) => (
                        //     <>
                        //         {menu}
                        //         <Divider style={{ margin: '8px 0' }} />
                        //         <Space style={{ padding: '0 8px 4px' }}>
                        //             <Input
                        //                 placeholder="Please enter item"
                        //                 ref={inputRef}
                        //                 value={name}
                        //                 onChange={onNameChange}
                        //             />
                        //             <Button
                        //                 type="text"
                        //                 icon={<PlusOutlined />}
                        //                 onClick={addItem}
                        //             >
                        //                 Add item
                        //             </Button>
                        //         </Space>
                        //     </>
                        // )}
                        options={jobsList.map((job) => ({
                            label: job.jobTitle,
                            value: job.jobTitle,
                        }))}
                        suffixIcon={false}
                    />
                </Form.Item>

                <Form.Item label={t('memberAccessLabel')} name="access">
                    <Select
                        options={[
                            { value: 'member', label: t('memberText') },
                            { value: 'admin', label: t('adminText') },
                        ]}
                    />
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        style={{ width: '100%' }}
                        htmlType="submit"
                    >
                        {t('addToTeamButton')}
                    </Button>
                </Form.Item>
            </Form>
        </Drawer>
    )
}

export default AddMemberDrawer
