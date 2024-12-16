import { Flex, Skeleton } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import CustomSearchbar from '@components/CustomSearchbar';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import ProjectsReportsTable from '@/pages/reporting/projectsReports/projectsReportsTable/projects-reports-table';
import { IRPTProject } from '@/types/reporting/reporting.types';

type OverviewReportsProjectsTabProps = { teamsId?: string | null };

const OverviewReportsProjectsTab = ({
  teamsId = null,
}: OverviewReportsProjectsTabProps) => {
  const [searchQuery, setSearhQuery] = useState<string>('');
  const [projectList, setProjectList] = useState<IRPTProject[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // localization
  const { t } = useTranslation('reporting-projects-drawer');

  const dispatch = useAppDispatch();

  // used useMemo hook for re render the list when searching
  const filteredProjectsData = useMemo(() => {
    return projectList.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, projectList]);

  return (
    <Flex vertical gap={24}>
      <CustomSearchbar
        placeholderText={t('searchByNameInputPlaceholder')}
        searchQuery={searchQuery}
        setSearchQuery={setSearhQuery}
      />

      <ProjectsReportsTable
        projectList={filteredProjectsData}
        loading={isLoading}
      />
    </Flex>
  );
};

export default OverviewReportsProjectsTab;
