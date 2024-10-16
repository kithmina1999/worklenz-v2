import { Card, Flex, Input, Table, TableProps, Typography } from 'antd'
import React from 'react'
import { useTranslation } from 'react-i18next'

const CategoriesSettings = () => {
    // localization
    const { t } = useTranslation('categoriesSettings')

    // table columns
    const columns: TableProps['columns'] = [
        {
            key: 'category',
            title: t('categoryColumn'),
            dataIndex: 'category',
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
                        <Input.Search
                            placeholder={t('searchPlaceholder')}
                            style={{ maxWidth: 200 }}
                        />
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

export default CategoriesSettings
