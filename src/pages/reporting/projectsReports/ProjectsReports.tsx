import {
  Button,
  Card,
  Checkbox,
  Dropdown,
  Flex,
  Skeleton,
  Space,
  Typography,
} from 'antd';
import React, { useEffect, useState } from 'react';
import CustomPageHeader from '../pageHeader/CustomPageHeader';
import { DownOutlined } from '@ant-design/icons';
import ProjectReportsTable from './projectsReportsTable/ProjectsReportsTable';
import ProjectsReportsFilters from './projectsReportsFilters/ProjectsReportsFilters';

const ProjectsReports = () => {
  const [projectList, setProjectList] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // load data from projects.json
  useEffect(() => {
    const fetchProjectData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/reportingMockData/projects.json');
        if (!response.ok) throw new Error(`Response error: ${response.status}`);
        const result = await response.json();
        setProjectList(result);
        setIsLoading(false);
      } catch (error) {
        console.error('Project data fetching error', error);
      }
    };

    fetchProjectData();
  }, []);

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
