import { Table } from 'antd';
import React from 'react';
import './AllProjectList.css';
import TableColumns from '../TableColumns';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { ProjectType } from '../../../types/project.types';

interface DataType {
  key: string;
  name: string;
  client: string;
  category: string;
  status: string;
  totalTasks: number;
  completedTasks: number;
  lastUpdated: Date;
  startDate: Date | null;
  endDate: Date | null;
  members: string[];
}

const AllProjectList: React.FC = () => {
  // get data from project reducer
  const projectList: ProjectType[] = useAppSelector(
    (state) => state.projectReducer.projectsViewModel
  );

  const projectData: DataType[] = [
    ...projectList.map((project) => ({
      key: project.projectId,
      name: project.projectName,
      client: '-',
      category: 'Test',
      status: 'Proposed',
      totalTasks: 10,
      completedTasks: 6,
      lastUpdated: new Date('2024-10-08T08:30:00'),
      startDate: null,
      endDate: null,
      members: [
        'Chathuranga Pathum',
        'Chamika Jayasri',
        'Raveesha Dilanka',
        'Sachintha Prasad',
      ],
    })),
  ];

  return (
    <Table
      columns={TableColumns()}
      dataSource={projectData}
      className="custom-two-colors-row-table"
      rowClassName={() => 'custom-row'}
      pagination={{
        showSizeChanger: true,
        defaultPageSize: 20,
        pageSizeOptions: ['5', '10', '15', '20', '50', '100'],
        size: 'small',
      }}
    />
  );
};

export default AllProjectList;
