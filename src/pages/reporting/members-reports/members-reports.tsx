import { Button, Card, Checkbox, Dropdown, Flex, Skeleton, Space, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { DownOutlined } from '@ant-design/icons';
import MembersReportsTable from './members-reports-table/members-reports-table';
import TimeWiseFilter from './TimeWiseFilter';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useTranslation } from 'react-i18next';
import CustomSearchbar from '@components/CustomSearchbar';
import { useDocumentTitle } from '@/hooks/useDoumentTItle';
import CustomPageHeader from '../page-header/custom-page-header';
import { fetchMembersData } from '@/features/reporting/membersReports/membersReportsSlice';

const MembersReports = () => {
  const { t } = useTranslation('reporting-members');
  const dispatch = useAppDispatch();
  useDocumentTitle('Reporting - Members');

  const [searchQuery, setSearhQuery] = useState<string>('');

  const { membersList, isLoading } = useAppSelector(state => state.membersReportsReducer);

  return (
    <Flex vertical>
      <CustomPageHeader
        title={`Members`}
        children={
          <Space>
            <Button>
              <Checkbox>
                <Typography.Text>{t('includeArchivedButton')}</Typography.Text>
              </Checkbox>
            </Button>

            <TimeWiseFilter />

            <Dropdown menu={{ items: [{ key: '1', label: t('excelButton') }] }}>
              <Button type="primary" icon={<DownOutlined />} iconPosition="end">
                {t('exportButton')}
              </Button>
            </Dropdown>
          </Space>
        }
      />

      <Card
        title={
          <Flex justify="flex-end">
            {/* searchbar  */}
            <CustomSearchbar
              placeholderText={t('searchByNameInputPlaceholder')}
              searchQuery={searchQuery}
              setSearchQuery={setSearhQuery}
            />
          </Flex>
        }
      >
        {isLoading ? <Skeleton /> : <MembersReportsTable />}
      </Card>
    </Flex>
  );
};

export default MembersReports;
