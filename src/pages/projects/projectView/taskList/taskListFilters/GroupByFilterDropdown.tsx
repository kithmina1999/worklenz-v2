import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { CaretDownFilled } from '@ant-design/icons';
import { ConfigProvider, Flex, Select } from 'antd/es';
import { colors } from '@/styles/colors';
import ConfigPhaseButton from '@features/projects/singleProject/phase/ConfigPhaseButton';
import { useAppSelector } from '@/hooks/useAppSelector';
import CreateStatusButton from '@/components/project-task-filters/create-status-button/create-status-button';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { IGroupBy, GROUP_BY_OPTIONS, setCurrentGroup, setGroup } from '@features/tasks/tasks.slice';

const GroupByFilterDropdown = () => {
  const { t } = useTranslation('task-list-filters');
  const dispatch = useAppDispatch();
  const { group: groupBy } = useAppSelector(state => state.taskReducer);
  const { project } = useAppSelector(state => state.projectReducer);

  const groupDropdownMenuItems = useMemo(
    () => [
      { value: IGroupBy.STATUS, label: t('statusText') },
      { value: IGroupBy.PRIORITY, label: t('priorityText') },
      { value: IGroupBy.PHASE, label: project?.phase_label || t('phaseText') },
      { value: IGroupBy.MEMBERS, label: t('memberText') },
    ],
    [t, project]
  );

  const handleChange = (value: IGroupBy) => {
    setCurrentGroup(value);
    dispatch(setGroup(value));
  };

  return (
    <Flex align="center" gap={4} style={{ marginInlineStart: 12 }}>
      {t('groupByText')}:
      <Select
        value={groupBy}
        options={groupDropdownMenuItems}
        onChange={handleChange}
        suffixIcon={<CaretDownFilled />}
        dropdownStyle={{ width: 'wrap-content' }}
      />
      {(groupBy === IGroupBy.STATUS || groupBy === IGroupBy.PHASE) && (
        <ConfigProvider wave={{ disabled: true }}>
          {groupBy === IGroupBy.PHASE && <ConfigPhaseButton color={colors.skyBlue} />}
          {groupBy === IGroupBy.STATUS && <CreateStatusButton />}
        </ConfigProvider>
      )}
    </Flex>
  );
};

export default GroupByFilterDropdown;
