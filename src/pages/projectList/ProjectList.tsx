import React, { useEffect, useState } from 'react'
import { Button, Card, Flex, Input, Segmented, Tooltip, Typography } from 'antd'
import { PageHeader } from '@ant-design/pro-components'
import { SearchOutlined, SyncOutlined } from '@ant-design/icons'
import './ProjectList.css'
import AllProjectList from '../../components/ProjectList/AllProjectList'

const { Title } = Typography

const ProjectList: React.FC = () => {
    const [projectSegment, setProjectSegment] = useState<
        'All' | 'Favourites' | 'Archived'
    >('All')
    const [isLoading, setIsLoading] = useState(false)

    const [searchTerm, setSearchTerm] = useState('')
    const [debouncedTerm, setDebouncedTerm] = useState('')

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedTerm(searchTerm)
        }, 500)

        return () => {
            clearTimeout(handler)
        }
    }, [searchTerm])

    useEffect(() => {
        if (debouncedTerm) {
            performSearch(debouncedTerm)
        }
    }, [debouncedTerm])

    const performSearch = (query: string) => {
        console.log('Searching for:', query)
    }

    const handleRefresh = () => {
        setIsLoading(true)
        setTimeout(() => setIsLoading(false), 500)
    }

    const handleSegmentChange = (value: 'All' | 'Favourites' | 'Archived') => {
        if (value === 'All') {
            setProjectSegment('All')
            handleRefresh()
        } else if (value === 'Favourites') {
            setProjectSegment('Favourites')
            handleRefresh()
        } else {
            setProjectSegment('Archived')
            handleRefresh()
        }
    }

    return (
        <div style={{ marginBlock: 65, minHeight: '90vh' }}>
            <PageHeader
                className="site-page-header"
                title="2 Projects"
                style={{ padding: '16px 0' }}
                extra={
                    <Flex gap={8} align="center">
                        <Tooltip title="Refresh projects">
                            <Button
                                shape="circle"
                                icon={<SyncOutlined spin={isLoading} />}
                                onClick={() => handleRefresh()}
                            />
                        </Tooltip>
                        <Segmented<'All' | 'Favourites' | 'Archived'>
                            options={['All', 'Favourites', 'Archived']}
                            defaultValue="All"
                            onChange={(
                                value: 'All' | 'Favourites' | 'Archived'
                            ) => handleSegmentChange(value)}
                        />
                        <Input
                            placeholder="Search by name"
                            suffix={<SearchOutlined />}
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </Flex>
                }
            />
            <Card>
                <AllProjectList />
            </Card>
        </div>
    )
}

export default ProjectList
