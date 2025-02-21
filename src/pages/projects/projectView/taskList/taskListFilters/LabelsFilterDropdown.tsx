import { CaretDownFilled } from '@ant-design/icons';
import Badge from 'antd/es/badge';
import Button from 'antd/es/button';
import Card from 'antd/es/card';
import Checkbox from 'antd/es/checkbox';
import Dropdown from 'antd/es/dropdown';
import Empty from 'antd/es/empty';
import Flex from 'antd/es/flex';
import Input, { InputRef } from 'antd/es/input';
import List from 'antd/es/list';
import Space from 'antd/es/space';

import { useMemo, useRef, useState } from 'react';
import { useAppSelector } from '@/hooks/useAppSelector';
import { colors } from '@/styles/colors';
import { useTranslation } from 'react-i18next';
import { ITaskLabel } from '@/types/tasks/taskLabel.types';
import { fetchTaskGroups, setLabels } from '@/features/tasks/tasks.slice';
import { useAppDispatch } from '@/hooks/useAppDispatch';

interface LabelsFilterDropdownProps {
  labels: ITaskLabel[];
}

const LabelsFilterDropdown = (props: LabelsFilterDropdownProps) => {
  const dispatch = useAppDispatch();
  const labelInputRef = useRef<InputRef>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const { labels } = useAppSelector(state => state.taskReducer);
  const { projectId } = useAppSelector(state => state.projectReducer);
  const { t } = useTranslation('task-list-filters');

  const filteredLabelData = useMemo(() => {
    return props.labels.filter(label =>
      label.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [props.labels, searchQuery]);

  const themeMode = useAppSelector(state => state.themeReducer.mode);

  // handle selected filters count
  const handleSelectedFiltersCount = (checked: boolean, labelId: string) => {
    let newLabels = [...labels];
    if (checked) {
      newLabels.push(labelId);
      dispatch(setLabels(newLabels));
    } else {
      newLabels.splice(newLabels.indexOf(labelId), 1);
      dispatch(setLabels(newLabels));
    }
    if (projectId) dispatch(fetchTaskGroups(projectId));
  };

  // function to focus labels input
  const handleLabelsDropdownOpen = (open: boolean) => {
    if (open) {
      setTimeout(() => {
        labelInputRef.current?.focus();
      }, 0);
    }
  };

  // custom dropdown content
  const labelsDropdownContent = (
    <Card className="custom-card" styles={{ body: { padding: 8, width: 260 } }}>
      <Flex vertical gap={8}>
        <Input
          ref={labelInputRef}
          value={searchQuery}
          onChange={e => setSearchQuery(e.currentTarget.value)}
          placeholder={t('searchInputPlaceholder')}
        />

        <List style={{ padding: 0, maxHeight: 250, overflow: 'auto' }}>
          {filteredLabelData.length ? (
            filteredLabelData.map(label => (
              <List.Item
                className={`custom-list-item ${themeMode === 'dark' ? 'dark' : ''}`}
                key={label.id}
                style={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  gap: 8,
                  padding: '4px 8px',
                  border: 'none',
                }}
              >
                <Checkbox
                  id={label.id}
                  checked={labels.includes(label.id || '')}
                  onChange={e => handleSelectedFiltersCount(e.target.checked, label.id || '')}
                >
                  <Flex gap={8}>
                    <Badge color={label.color_code} />
                    {label.name}
                  </Flex>
                </Checkbox>
              </List.Item>
            ))
          ) : (
            <Empty />
          )}
        </List>
      </Flex>
    </Card>
  );

  return (
    <Dropdown
      overlayClassName="custom-dropdown"
      trigger={['click']}
      dropdownRender={() => labelsDropdownContent}
      onOpenChange={handleLabelsDropdownOpen}
    >
      <Button
        icon={<CaretDownFilled />}
        iconPosition="end"
        style={{
          backgroundColor:
            labels.length > 0
              ? themeMode === 'dark'
                ? '#003a5c'
                : colors.paleBlue
              : colors.transparent,

          color: labels.length > 0 ? (themeMode === 'dark' ? 'white' : colors.darkGray) : 'inherit',
        }}
      >
        <Space>
          {t('labelsText')}
          {labels.length > 0 && <Badge size="small" count={labels.length} color={colors.skyBlue} />}
        </Space>
      </Button>
    </Dropdown>
  );
};

export default LabelsFilterDropdown;
