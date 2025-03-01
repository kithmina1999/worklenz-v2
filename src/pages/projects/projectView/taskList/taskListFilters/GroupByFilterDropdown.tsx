import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { CaretDownFilled } from '@ant-design/icons';
import { ConfigProvider, Flex, Dropdown, Button } from 'antd/es';
import { colors } from '@/styles/colors';
import ConfigPhaseButton from '@features/projects/singleProject/phase/ConfigPhaseButton';
import { useAppSelector } from '@/hooks/useAppSelector';
import CreateStatusButton from '@/components/project-task-filters/create-status-button/create-status-button';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { IGroupBy, GROUP_BY_OPTIONS, setCurrentGroup, setGroup } from '@features/tasks/tasks.slice';

const GroupByFilterDropdown = () => {
  const { t } = useTranslation('task-list-filters');
  const dispatch = useAppDispatch();
  const { groupBy } = useAppSelector(state => state.taskReducer);
  const { project, projectView } = useAppSelector(state => state.projectReducer);

  const items = useMemo(
    () => {
      const menuItems = [
        { key: IGroupBy.STATUS, label: t('statusText') },
        { key: IGroupBy.PRIORITY, label: t('priorityText') },
        { key: IGroupBy.PHASE, label: project?.phase_label || t('phaseText') },
      ];

      if (projectView !== 'list') {
        menuItems.push({ key: IGroupBy.MEMBERS, label: t('memberText') });
      }

      return menuItems;
    },
    [t, project, projectView]
  );

  const handleMenuClick = ({ key }: { key: string }) => {
    setCurrentGroup(key as IGroupBy);
    dispatch(setGroup(key as IGroupBy));
  };

  useEffect(() => {
    if (projectView === 'list') {
      ;
    }
  }, [projectView]);

  return (
    <Flex align="center" gap={4} style={{ marginInlineStart: 12 }}>
      {t('groupByText')}:
      <Dropdown
        trigger={['click']}
        menu={{
          items,
          onClick: handleMenuClick,
          selectedKeys: [groupBy],
        }}
      >
        <Button>
          {items.find(item => item.key === groupBy)?.label} <CaretDownFilled />
        </Button>
      </Dropdown>
      {(groupBy === IGroupBy.STATUS || groupBy === IGroupBy.PHASE) && (
        <ConfigProvider wave={{ disabled: true }}>
          {groupBy === IGroupBy.PHASE && <ConfigPhaseButton />}
          {groupBy === IGroupBy.STATUS && <CreateStatusButton />}
        </ConfigProvider>
      )}
    </Flex>
  );
};

export default GroupByFilterDropdown;
