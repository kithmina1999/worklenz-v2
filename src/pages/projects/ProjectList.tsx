import React, { useEffect, useState } from 'react';
import { Button, Card, Flex, Input, Segmented, Table, Tooltip } from 'antd';
import { PageHeader } from '@ant-design/pro-components';
import { SearchOutlined, SyncOutlined } from '@ant-design/icons';
import './ProjectList.css';
import CreateProjectButton from '@features/projects/createProject/CreateProjectButton';
import CreateProjectDrawer from '@features/projects/createProject/CreateProjectDrawer';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '@/hooks/useAppSelector';
import { DEFAULT_PAGE_SIZE, FILTER_INDEX_KEY, PAGE_SIZE_OPTIONS } from '@/shared/constants';
import TableColumns from '@/components/ProjectList/TableColumns';
import { IProjectsViewModel } from '@/types/project/projectsViewModel.types';
import { IProjectFilter } from '@/types/project/project.types';
import { fetchProjects } from '@/features/projects/projectSlice';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { IProjectViewModel } from '@/types/project/projectViewModel.types';

const ProjectList: React.FC = () => {
  const { t } = useTranslation('allProjectList');
  const dispatch = useAppDispatch();

  const loading = useAppSelector(state => state.projectReducer.loading);

  const [searchTerm, setSearchTerm] = useState('');
  const [projects, setProjects] = useState<IProjectsViewModel>({});
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: DEFAULT_PAGE_SIZE
  });

  const filters = Object.values(IProjectFilter);

  const getFilterIndex = () => {
    return +(localStorage.getItem(FILTER_INDEX_KEY) || 0);
  };

  const setFilterIndex = (index: number) => {
    localStorage.setItem(FILTER_INDEX_KEY, index.toString());
  };

  useEffect(() => {
    getProjects();
  }, [dispatch, searchTerm, pagination]);

  const getProjects = async () => {
    const params = {
      index: pagination.current,
      size: pagination.pageSize,
      field: 'name',
      order: 'asc',
      filter: getFilterIndex(),
      search: searchTerm,
    }
    const result = await dispatch(fetchProjects(params)).unwrap();
    setProjects(result);
  };

  const handleRefresh = () => {
    getProjects();
  };

  const handleSegmentChange = (value: IProjectFilter) => {
    setFilterIndex(filters.indexOf(value));
    getProjects();
  };

  return (
    <div style={{ marginBlock: 65, minHeight: '90vh' }}>
      <PageHeader
        className="site-page-header"
        title={`${projects.total} ${t('projects')}`}
        style={{ padding: '16px 0' }}
        extra={
          <Flex gap={8} align="center">
            <Tooltip title={t('refreshProjects')}>
              <Button
                shape="circle"
                icon={<SyncOutlined spin={loading} />}
                onClick={() => handleRefresh()}
              />
            </Tooltip>
            <Segmented<IProjectFilter>
              options={filters}
              defaultValue={filters[getFilterIndex()] ?? filters[0]}
              onChange={(value: IProjectFilter) => handleSegmentChange(value)}
            />
            <Input
              placeholder={t('placeholder')}
              suffix={<SearchOutlined />}
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            <CreateProjectButton />
          </Flex>
        }
      />
      <Card className="project-card">
        <Table<IProjectViewModel>
          columns={TableColumns()}
          dataSource={projects.data}
          loading={loading}
          size='small'
          pagination={{
            showSizeChanger: true,
            defaultPageSize: DEFAULT_PAGE_SIZE,
            pageSizeOptions: PAGE_SIZE_OPTIONS,
            size: 'small',
            total: projects.total,
            onChange: (page, pageSize) => {
              setPagination({
                current: page,
                pageSize: pageSize
              });
            }
          }}
        />
      </Card>

      <CreateProjectDrawer />
    </div>
  );
};

export default ProjectList;
