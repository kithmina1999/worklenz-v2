import { Button, Drawer, Form, Input, message, Typography } from 'antd'
import React from 'react'
import { useAppSelector } from '../../../hooks/useAppSelector'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { addClient, toggleCreateClientDrawer } from './clientSlice'
import { ClientType } from '../../../types/client'
import { nanoid } from '@reduxjs/toolkit'
import { useTranslation } from 'react-i18next'

const CreateClientDrawer = () => {
    // localization
    const { t } = useTranslation('clientSettings')

    // get drawer state from client reducer
    const isDrawerOpen = useAppSelector(
        (state) => state.clientReducer.isCreateClientDrawerOpen
    )
    const dispatch = useAppDispatch()

    const [form] = Form.useForm()

    // this function for handle form submit
    const handleFormSubmit = async (values: any) => {
        try {
            const newClient: ClientType = {
                clientId: nanoid(),
                clientName: values.name,
                project: null,
            }

            dispatch(addClient(newClient))
            dispatch(toggleCreateClientDrawer())
            form.resetFields()
            message.success(t('createClientSuccessMessage'))
        } catch (error) {
            message.error(t('createClientErrorMessage'))
        }
    }

    return (
        <Drawer
            title={
                <Typography.Text style={{ fontWeight: 500, fontSize: 16 }}>
                    {t('createClientDrawerTitle')}
                </Typography.Text>
            }
            open={isDrawerOpen}
            onClose={() => dispatch(toggleCreateClientDrawer())}
        >
            <Form form={form} layout="vertical" onFinish={handleFormSubmit}>
                <Form.Item
                    name="name"
                    label={t('nameLabel')}
                    rules={[
                        {
                            required: true,
                            message: t('nameRequiredError'),
                        },
                    ]}
                >
                    <Input placeholder={t('namePlaceholder')} />
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        style={{ width: '100%' }}
                        htmlType="submit"
                    >
                        {t('createButton')}
                    </Button>
                </Form.Item>
            </Form>
        </Drawer>
    )
}

export default CreateClientDrawer
