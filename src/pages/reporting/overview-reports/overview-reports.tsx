import { useEffect } from 'react';
import { Button, Card, Checkbox, Flex, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { fetchTeamsData } from '../../../features/reporting/overviewReports/overviewReportsSlice';
import { useDocumentTitle } from '../../../hooks/useDoumentTItle';
import { toggleIncludeArchived } from '@/features/reporting/reporting.slice';
import { useMixpanelTracking } from '@/hooks/useMixpanelTracking';
import { evt_reporting_overview } from '@/shared/worklenz-analytics-events';
import CustomPageHeader from '@/pages/reporting/page-header/custom-page-header';
import OverviewStats from '../overviewReports/overview-stats/overview-stats';
import OverviewReportsTable from '../overviewReports/overview-table/overview-reports-table';

const OverviewReports = () => {
  const { t } = useTranslation('reporting-overview');
  const dispatch = useAppDispatch();
  const { trackMixpanelEvent } = useMixpanelTracking();
  const includeArchivedProjects = useAppSelector(
    state => state.reportingReducer.includeArchivedProjects
  );

  useDocumentTitle('Reporting - Overview');

  useEffect(() => {
    dispatch(fetchTeamsData());
  }, [dispatch]);

  useEffect(() => {
    trackMixpanelEvent(evt_reporting_overview);
  }, [trackMixpanelEvent]);

  const handleArchiveToggle = () => {
    dispatch(toggleIncludeArchived());
  };

  return (
    <Flex vertical gap={24}>
      <CustomPageHeader
        title={t('overviewTitle')}
        children={
          <Button type="text" onClick={handleArchiveToggle}>
            <Checkbox checked={includeArchivedProjects} />
            <Typography.Text>{t('includeArchivedButton')}</Typography.Text>
          </Button>
        }
      />

      <OverviewStats />

      <Card>
        <Flex vertical gap={12}>
          <Typography.Text strong style={{ fontSize: 16 }}>
            {t('teamsText')}
          </Typography.Text>
          <OverviewReportsTable />
        </Flex>
      </Card>
    </Flex>
  );
};

export default OverviewReports;
