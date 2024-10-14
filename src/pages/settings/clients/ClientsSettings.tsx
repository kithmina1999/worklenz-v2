import { Button, Card, Flex, Input, Table, TableProps, Typography } from 'antd'
import React, { useMemo, useState } from 'react'
import { colors } from '../../../styles/colors'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { toggleDrawer } from '../../../features/settings/client/clientSlice'
import CreateClientDrawer from '../../../features/settings/client/CreateClientDrawer'
import { useAppSelector } from '../../../hooks/useAppSelector'
import { ClientType } from '../../../types/client'

import PinRouteToNavbarButton from '../../../components/PinRouteToNavbarButton'

const ClientsSettings = () => {
    // get data from client reducer
    const clientsList = useAppSelector(
        (state) => state.clientReducer.clientsList
    )
    const dispatch = useAppDispatch()

    // this is for get the current string that type on search bar
    const [searchQuery, setSearchQuery] = useState('')

    // used useMemo hook for re render the list when searching
    const filteredClientsData = useMemo(() => {
        return clientsList.filter((item) =>
            item.clientName.toLowerCase().includes(searchQuery.toLowerCase())
        )
    }, [clientsList, searchQuery])

    // table columns
    const columns: TableProps['columns'] = [
        {
            key: 'clientName',
            title: 'Name',
            sorter: (a, b) => a.clientName.localeCompare(b.clientName),
            render: (record: ClientType) => (
                <Typography.Text>{record.clientName}</Typography.Text>
            ),
        },
        {
            key: 'project',
            title: 'Project',
            render: (record: ClientType) =>
                record.project ? (
                    <Typography.Text>{record.project}</Typography.Text>
                ) : (
                    <Typography.Text style={{ color: colors.lightGray }}>
                        No projects available
                    </Typography.Text>
                ),
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
                            value={searchQuery}
                            onChange={(e) =>
                                setSearchQuery(e.currentTarget.value)
                            }
                            placeholder="Search by name"
                            style={{ maxWidth: 200 }}
                        />
                        <Button
                            type="primary"
                            onClick={() => dispatch(toggleDrawer())}
                        >
                            Create Client
                        </Button>

                        {/* this button pin this route to navbar  */}
                        <PinRouteToNavbarButton
                            name="clients"
                            path="/worklenz/settings/clients"
                        />
                    </Flex>
                </Flex>
            }
        >
            <Table
                className="homepage-table"
                dataSource={filteredClientsData}
                columns={columns}
                rowKey={(record) => record.clientId}
            />

            {/* add client drawer  */}
            <CreateClientDrawer />
        </Card>
    )
}

export default ClientsSettings
