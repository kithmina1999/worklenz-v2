import { Button, Card, Checkbox, Dropdown, Flex, Skeleton, Space, Typography } from 'antd';
import React, { useEffect } from 'react';
import CustomPageHeader from '@/pages/reporting/page-header/custom-page-header';
import { DownOutlined } from '@ant-design/icons';
import ProjectReportsTable from './projectsReportsTable/projects-reports-table';
import ProjectsReportsFilters from './projectsReportsFilters/ProjectsReportsFilters';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { fetchProjectData } from '@features/reporting/projectReports/projectReportsSlice';
import { useAppSelector } from '@/hooks/useAppSelector';

const ProjectsReports = () => {
  const dispatch = useAppDispatch();

  // get project list and loading state from project repors reducer
  const { projectList, isLoading } = useAppSelector(
    (state) => state.projectReportsReducer,
  );

  // load data from project reports reducer
  useEffect(() => {
    dispatch(fetchProjectData());
  }, [dispatch]);

  return (
    <Flex vertical>
      <CustomPageHeader
        title={`${projectList.length === 1 ? projectList.length + ' Project' : projectList.length + ' Projects'} `}
        children={
          <Space>
            <Button>
              <Checkbox />
              <Typography.Text>Include Archived Projects</Typography.Text>
            </Button>

            <Dropdown menu={{ items: [{ key: '1', label: 'Excel' }] }}>
              <Button type="primary" icon={<DownOutlined />} iconPosition="end">
                Export
              </Button>
            </Dropdown>
          </Space>
        }
      />

      <Card title={<ProjectsReportsFilters />}>
        {isLoading ? (
          <Skeleton />
        ) : (
          <ProjectReportsTable projectList={projectList} />
        )}
      </Card>
    </Flex>
  );
};

export default ProjectsReports;
