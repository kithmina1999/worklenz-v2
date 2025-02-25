import { Badge, Button, Card, Checkbox, Empty, Flex, Input, List, Typography } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { ITaskLabel } from '@/types/tasks/taskLabel.types';
import { InputRef } from 'antd/es/input';

interface LabelsDropdownProps {
  labelsList: ITaskLabel[];
  themeMode: string;
  createLabelText: string;
  selectedLabels: ITaskLabel[];
  labelsInputRef: React.RefObject<InputRef>;
  onLabelChange: (e: CheckboxChangeEvent, label: ITaskLabel) => void;
  onCreateLabelTextChange: (value: string) => void;
  onApply: () => void;
  t: (key: string) => string;
}

const LabelsDropdown = ({
  labelsList,
  themeMode,
  createLabelText,
  selectedLabels,
  labelsInputRef,
  onLabelChange,
  onCreateLabelTextChange,
  onApply,
  t
}: LabelsDropdownProps) => {
  return (
    <Card className="custom-card" styles={{ body: { padding: 8 } }}>
      <Flex vertical>
        {!createLabelText && (
          <List style={{ padding: 0, height: 250, overflow: 'auto' }}>
            {labelsList?.length ? (
              labelsList.map(label => (
                <List.Item
                  className={themeMode === 'dark' ? 'custom-list-item dark' : 'custom-list-item'}
                  key={label.id}
                  style={{
                    display: 'flex',
                    gap: 8,
                    justifyContent: 'flex-start',
                    padding: '4px 8px',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  <Checkbox
                    id={label.id}
                    checked={selectedLabels.some(l => l.id === label.id)}
                    onChange={e => onLabelChange(e, label)}
                  >
                    <Badge color={label.color_code} text={label.name} />
                  </Checkbox>
                </List.Item>
              ))
            ) : (
              <Empty />
            )}
          </List>
        )}

        <Flex style={{ paddingTop: 8 }} vertical justify="space-between" gap={8}>
          <Input
            ref={labelsInputRef}
            value={createLabelText}
            onChange={e => onCreateLabelTextChange(e.currentTarget.value)}
            placeholder={t('createLabel')}
            onPressEnter={onApply}
          />
          {createLabelText && (
            <Typography.Text type="secondary" style={{ fontSize: 12 }}>
              {t('hitEnterToCreate')}
            </Typography.Text>
          )}
          {!createLabelText && labelsList.length > 0 && (
            <Button
              type="primary"
              size="small"
              onClick={onApply}
              style={{ width: '100%' }}
            >
              {t('apply')}
            </Button>
          )}
        </Flex>
      </Flex>
    </Card>
  );
};

export default LabelsDropdown; 