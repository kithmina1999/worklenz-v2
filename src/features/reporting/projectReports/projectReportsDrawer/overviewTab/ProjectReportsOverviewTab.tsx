import React from 'react';
import ProjectReportsStatCard from './ProjectReportsStatCard';
import ProjectReportsStatusGraph from './ProjectReportsStatusGraph';
import ProjectReportsPriorityGraph from './ProjectReportsPriorityGraph';
import ProjectReportsDueDateGraph from './ProjectReportsDueDateGraph';

type ProjectReportsOverviewTabProps = {
  projectId?: string | null;
};

const ProjectReportsOverviewTab = ({ projectId = null }: ProjectReportsOverviewTabProps) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <ProjectReportsStatCard />
      <ProjectReportsStatusGraph />
      <ProjectReportsPriorityGraph />
      <ProjectReportsDueDateGraph />
    </div>
  );
};

export default ProjectReportsOverviewTab;
