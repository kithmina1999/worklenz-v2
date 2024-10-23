import { Card, Flex, Input, Table, TableProps, Tooltip, Typography } from 'antd'
import React from 'react'

import PinRouteToNavbarButton from '../../../components/PinRouteToNavbarButton'
import { useTranslation } from 'react-i18next'
import { SearchOutlined } from '@ant-design/icons'

const LabelsSettings = () => {
    // localization
    const { t } = useTranslation('labelsSettings')

    // table columns
    const columns: TableProps['columns'] = [
        {
            key: 'label',
            title: t('labelColumn'),
            dataIndex: 'label',
        },
        {
            key: 'associatedTask',
            title: t('associatedTaskColumn'),
            dataIndex: 'associatedTask',
        },
    ]

    return (
        <Card
            style={{ width: '100%' }}
            title={
                <Flex justify="flex-end">
                    <Flex
                        gap={8}
                        align="center"
                        justify="flex-end"
                        style={{ width: '100%', maxWidth: 400 }}
                    >
                        <Input
                            placeholder={t('searchPlaceholder')}
                            style={{ maxWidth: 232 }}
                            suffix={<SearchOutlined />}
                        />

                        <Tooltip title={t('pinTooltip')} trigger={'hover'}>
                            {/* this button pin this route to navbar  */}
                            <PinRouteToNavbarButton
                                name="labels"
                                path="/worklenz/settings/labels"
                            />
                        </Tooltip>
                    </Flex>
                </Flex>
            }
        >
            <Table
                locale={{
                    emptyText: (
                        <Typography.Text>{t('emptyText')}</Typography.Text>
                    ),
                }}
                columns={columns}
            />
        </Card>
    )
}

export default LabelsSettings
