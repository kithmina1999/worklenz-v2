import { CaretDownFilled } from '@ant-design/icons';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import Badge from 'antd/es/badge';
import Button from 'antd/es/button';
import Card from 'antd/es/card';
import Checkbox from 'antd/es/checkbox';
import Dropdown from 'antd/es/dropdown';
import List from 'antd/es/list';
import Space from 'antd/es/space';

import { useAppSelector } from '@/hooks/useAppSelector';
import { colors } from '@/styles/colors';
import { ITaskPriority } from '@/types/tasks/taskPriority.types';
import { setLabels, setPriorities } from '@/features/tasks/tasks.slice';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { fetchTaskGroups } from '@/features/board/board-slice';

interface PriorityFilterDropdownProps {
  priorities: ITaskPriority[];
}

const PriorityFilterDropdown = ({ priorities }: PriorityFilterDropdownProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation('task-list-filters');
  const { priorities: selectedPriorities } = useAppSelector(state => state.taskReducer);
  const themeMode = useAppSelector(state => state.themeReducer.mode);
  const { projectId } = useAppSelector(state => state.projectReducer);

  const handleSelectedPriority = (priorityId: string) => {
    const newPriorities = selectedPriorities.includes(priorityId)
      ? selectedPriorities.filter(id => id !== priorityId)
      : [...selectedPriorities, priorityId];

    dispatch(setPriorities(newPriorities));
    if (projectId) {
      dispatch(fetchTaskGroups(projectId));
    }
  };

  const priorityDropdownContent = useMemo(
    () => (
      <Card className="custom-card" style={{ width: 120 }} styles={{ body: { padding: 0 } }}>
        <List style={{ padding: 0, maxHeight: 250, overflow: 'auto' }}>
          {priorities?.map(priority => (
            <List.Item
              className={`custom-list-item ${themeMode === 'dark' ? 'dark' : ''}`}
              key={priority.id}
              onClick={() => handleSelectedPriority(priority.id)}
              style={{
                display: 'flex',
                gap: 8,
                padding: '4px 8px',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              <Space>
                <Checkbox
                  id={priority.id}
                  checked={selectedPriorities.includes(priority.id)}
                  onChange={() => handleSelectedPriority(priority.id)}
                />
                <Badge color={priority.color_code} />
                {priority.name}
              </Space>
            </List.Item>
          ))}
        </List>
      </Card>
    ),
    [priorities, selectedPriorities, themeMode]
  );

  return (
    <Dropdown
      overlayClassName="custom-dropdown"
      trigger={['click']}
      dropdownRender={() => priorityDropdownContent}
    >
      <Button
        icon={<CaretDownFilled />}
        iconPosition="end"
        style={{
          backgroundColor: selectedPriorities.length > 0 ? colors.paleBlue : colors.transparent,

          color: selectedPriorities.length > 0 ? colors.darkGray : 'inherit',
        }}
      >
        <Space>
          {t('priorityText')}
          {selectedPriorities.length > 0 && (
            <Badge size="small" count={selectedPriorities.length} color={colors.skyBlue} />
          )}
        </Space>
      </Button>
    </Dropdown>
  );
};

export default PriorityFilterDropdown;
