import { Flex, PaginationProps, Skeleton } from 'antd';
import { useEffect, useMemo, useState } from 'react';
import CustomSearchbar from '@components/CustomSearchbar';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import ProjectsReportsTable from '@/pages/reporting/projectsReports/projectsReportsTable/projects-reports-table';
import { IRPTProject } from '@/types/reporting/reporting.types';
import logger from '@/utils/errorLogger';
import { reportingApiService } from '@/api/reporting/reporting.api.service';
import { DEFAULT_PAGE_SIZE } from '@/shared/constants';

type OverviewReportsProjectsTabProps = { teamsId?: string | null };

const OverviewReportsProjectsTab = ({
  teamsId = null,
}: OverviewReportsProjectsTabProps) => {
  const [searchQuery, setSearhQuery] = useState<string>('');
  const [projectList, setProjectList] = useState<IRPTProject[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pagination, setPagination] = useState<PaginationProps>({
    current: 1,
    pageSize: DEFAULT_PAGE_SIZE,
    total: 0,
  });
  const { includeArchivedProjects } = useAppSelector((state) => state.reportingReducer);

  const getOverviewProjects = async () => {
    setIsLoading(true);
    try {
      const data = {
        team_id: teamsId,
        index: pagination.current,
        size: pagination.pageSize,
        field: 'name',
        order: 'asc',
        search: searchQuery,
        filter: 0,
        archived: includeArchivedProjects,
      };
      const { done, body } = await reportingApiService.getOverviewProjects(data);
      if (done) {
        setProjectList(body.projects || []);
        setPagination({ ...pagination, total: body.total });
      }
    } catch (error) {
      logger.error('getOverviewProjects', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getOverviewProjects();
  }, [pagination.current, pagination.pageSize, searchQuery, teamsId, includeArchivedProjects]);

  const { t } = useTranslation('reporting-projects-drawer');

  const dispatch = useAppDispatch();

  return (
    <Flex vertical gap={24}>
      <CustomSearchbar
        placeholderText={t('searchByNameInputPlaceholder')}
        searchQuery={searchQuery}
        setSearchQuery={setSearhQuery}
      />

      <ProjectsReportsTable
        projectList={projectList}
        loading={isLoading}
        pagination={pagination}
        setPagination={setPagination}
      />
    </Flex>
  );
};

export default OverviewReportsProjectsTab;
