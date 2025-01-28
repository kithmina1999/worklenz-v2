import { CaretDownFilled } from '@ant-design/icons';
import { Badge, Button, Card, Checkbox, Dropdown, List, Space } from 'antd';
import React, { useMemo } from 'react';
import { colors } from '@/styles/colors';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '@/hooks/useAppSelector';
import { ITaskPriority } from '@/types/tasks/taskPriority.types';
import { setLabels, setPriorities } from '@/features/tasks/tasks.slice';
import { useAppDispatch } from '@/hooks/useAppDispatch';

interface PriorityFilterDropdownProps {
  priorities: ITaskPriority[];
}

const PriorityFilterDropdown = ({ priorities }: PriorityFilterDropdownProps) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation('task-list-filters');
  const { priorities: selectedPriorities } = useAppSelector(state => state.taskReducer);
  const themeMode = useAppSelector(state => state.themeReducer.mode);

  const handleSelectedPriority = (priorityId: string) => {
    let newPriorities = [...selectedPriorities];
    console.log(newPriorities);
    if (newPriorities.includes(priorityId)) {
      newPriorities.splice(newPriorities.indexOf(priorityId), 1);
      dispatch(setPriorities(newPriorities));
    } else {
      newPriorities.push(priorityId);
      dispatch(setPriorities(newPriorities));
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
    [priorities, themeMode]
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
