import { CaretDownFilled } from '@ant-design/icons';
import ConfigProvider from 'antd/es/config-provider';
import Flex from 'antd/es/flex';
import Select from 'antd/es/select';
import { useMemo } from 'react';

import { colors } from '@/styles/colors';
import ConfigPhaseButton from '@features/projects/singleProject/phase/ConfigPhaseButton';
import { useSelectedProject } from '@/hooks/useSelectedProject';
import { useAppSelector } from '@/hooks/useAppSelector';
import CreateStatusButton from '@features/projects/status/CreateStatusButton';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { IGroupBy } from '@features/tasks/tasks.slice';
import { setGroup } from '@features/tasks/tasks.slice';

const GroupByFilterDropdown = () => {
  const { t } = useTranslation('task-list-filters');
  const dispatch = useAppDispatch();
  const { group: groupBy } = useAppSelector(state => state.taskReducer);
  const selectedProject = useSelectedProject();
  const phaseList = useAppSelector(state => state.phaseReducer.phaseList);

  const phase = useMemo(() => 
    phaseList.find(phase => phase.projectId === selectedProject?.id) || null,
    [phaseList, selectedProject?.id]
  );

  const groupDropdownMenuItems = useMemo(() => [
    { key: IGroupBy.STATUS, value: IGroupBy.STATUS, label: t('statusText') },
    { key: IGroupBy.PRIORITY, value: IGroupBy.PRIORITY, label: t('priorityText') },
    {
      key: IGroupBy.PHASE,
      value: IGroupBy.PHASE,
      label: phase ? phase?.phase : t('phaseText'),
    },
    { key: IGroupBy.MEMBERS, value: IGroupBy.MEMBERS, label: t('memberText') },
  ], [t, phase]);

  const handleChange = (value: IGroupBy) => {
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
