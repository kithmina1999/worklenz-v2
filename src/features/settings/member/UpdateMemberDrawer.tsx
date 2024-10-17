import {
    Avatar,
    Button,
    Drawer,
    Flex,
    Form,
    message,
    Select,
    Typography,
} from 'antd'
import React, { useEffect, useMemo } from 'react'
import { useAppSelector } from '../../../hooks/useAppSelector'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { toggleUpdateMemberDrawer, updateMember } from './memberSlice'
import { colors } from '../../../styles/colors'
import { MemberType } from '../../../types/member'
import { avatarNamesMap } from '../../../shared/constants'
import { useTranslation } from 'react-i18next'

type UpdateMemberDrawerProps = {
    selectedMemberId: string | null
}

const UpdateMemberDrawer = ({ selectedMemberId }: UpdateMemberDrawerProps) => {
    // localization
    const { t } = useTranslation('teamMembersSettings')

    // get job titles from redux - job reducer
    const jobsList = useAppSelector((state) => state.jobReducer.jobsList)

    const [form] = Form.useForm()

    // get all members lists from redux - add member reducer
    const owner = useAppSelector((state) => state.memberReducer.owner)
    const membersList = useAppSelector(
        (state) => state.memberReducer.membersList
    )

    // all members
    const allMembersList: MemberType[] = useMemo(
        () => [owner, ...membersList],
        [owner, membersList]
    )

    const isDrawerOpen = useAppSelector(
        (state) => state.memberReducer.isUpdateMemberDrawerOpen
    )
    const dispatch = useAppDispatch()

    // get currently selected member
    const selectedMember = allMembersList.find(
        (member) => member.memberId === selectedMemberId
    )

    useEffect(() => {
        if (selectedMember) {
            form.setFieldsValue({
                jobTitle: selectedMember?.jobTitle,
                access: selectedMember.memberRole,
            })
        }
    }, [form, selectedMember])

    // this function for handle form submit
    const handleFormSubmit = async (values: any) => {
        try {
            if (selectedMember) {
                const updatedMember: MemberType = {
                    ...selectedMember,
                    jobTitle: values.jobTitle,
                    memberRole: values.access,
                }
                dispatch(updateMember(updatedMember))
                dispatch(toggleUpdateMemberDrawer())
                message.success(t('updateMemberSuccessMessage'))
            }
        } catch (error) {
            message.error(t('updateMemberErrorMessage'))
        }
    }

    // function to resend invitation
    const resendInvitation = () => {
        dispatch(toggleUpdateMemberDrawer())
        message.success(t('invitationSentSuccessMessage'))
    }

    // function to get name
    const getMemberName = () => {
        if (selectedMember?.memberName) {
            return selectedMember.memberName
        } else return selectedMember?.memberEmail.split('@')[0]
    }

    const selectedMemberName: string = getMemberName() || ''

    return (
        <Drawer
            title={
                <Flex gap={8} align="center">
                    <Avatar
                        style={{
                            backgroundColor:
                                avatarNamesMap[
                                    selectedMemberName[0]?.toUpperCase()
                                ],
                            verticalAlign: 'middle',
                        }}
                    >
                        {selectedMemberName[0]?.toUpperCase()}
                    </Avatar>

                    <Flex vertical gap={4}>
                        <Typography.Text
                            style={{
                                textTransform: 'capitalize',
                            }}
                        >
                            {selectedMemberName}
                        </Typography.Text>

                        <Typography.Text
                            style={{
                                fontSize: 14,
                                color: colors.lightGray,
                            }}
                        >
                            {selectedMember?.memberEmail}
                        </Typography.Text>
                    </Flex>
                </Flex>
            }
            open={isDrawerOpen}
            onClose={() => dispatch(toggleUpdateMemberDrawer())}
        >
            <Form
                form={form}
                onFinish={handleFormSubmit}
                layout="vertical"
                initialValues={{ access: 'member' }}
            >
                <Form.Item label={t('jobTitleLabel')} name="jobTitle">
                    <Select
                        size="middle"
                        placeholder={t('jobTitlePlaceholder')}
                        options={jobsList.map((job) => ({
                            label: job.jobTitle,
                            value: job.jobTitle,
                        }))}
                        suffixIcon={false}
                    />
                </Form.Item>

                <Form.Item
                    label={t('memberAccessLabel')}
                    name="access"
                    rules={[{ required: true }]}
                >
                    <Select
                        disabled={selectedMember?.memberRole === 'owner'}
                        options={[
                            { value: 'member', label: t('memberText') },
                            { value: 'admin', label: t('adminText') },
                            {
                                value: 'owner',
                                label: t('ownerText'),
                                disabled: true,
                            },
                        ]}
                    />
                </Form.Item>

                <Form.Item>
                    <Flex vertical gap={8}>
                        <Button
                            type="primary"
                            style={{ width: '100%' }}
                            htmlType="submit"
                        >
                            {t('updateButton')}
                        </Button>

                        <Button
                            type="dashed"
                            style={{ width: '100%' }}
                            onClick={resendInvitation}
                            disabled={selectedMember?.memberRole === 'owner'}
                        >
                            {t('resendInvitationButton')}
                        </Button>

                        <Flex vertical style={{ marginBlockStart: 8 }}>
                            <Typography.Text
                                style={{
                                    fontSize: 12,
                                    color: colors.lightGray,
                                }}
                            >
                                {t('addedText')} 3 hours ago
                            </Typography.Text>
                            <Typography.Text
                                style={{
                                    fontSize: 12,
                                    color: colors.lightGray,
                                }}
                            >
                                {t('updatedText')} 3 hours ago
                            </Typography.Text>
                        </Flex>
                    </Flex>
                </Form.Item>
            </Form>
        </Drawer>
    )
}

export default UpdateMemberDrawer
