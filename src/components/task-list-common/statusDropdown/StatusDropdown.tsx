import { Badge, Flex, Select, Typography } from 'antd';
import { useState } from 'react';
import './statusDropdown.css';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { useTranslation } from 'react-i18next';
import { getStatusColor } from '../../../utils/getStatusColor';

type StatusDropdownProps = {
  status_id: string | undefined;
  onChange: (value: string) => void;
};

const StatusDropdown = ({ status_id, onChange }: StatusDropdownProps) => {
  // localization
  const { t } = useTranslation('task-list-table');

  const themeMode = useAppSelector(state => state.themeReducer.mode);
  const statusList = useAppSelector(state => state.statusReducer.status);

  const handleStatusChange = (value: string) => {
    const selectedOption = statusList.find(el => el.id === value);
    if (selectedOption) {
      onChange(selectedOption.id);
    }
  };

  return (
    <>
      {status_id && (
        <Select
          value={status_id}
          onChange={handleStatusChange}
          style={{ width: 120 }}
          dropdownStyle={{ borderRadius: 8 }}
          options={statusList.map(status => ({
            value: status.id,
            label: (
              <Flex gap={8} align="center">
                <Badge color={getStatusColor(status.category, themeMode)} />
                <Typography.Text>{status.name}</Typography.Text>
              </Flex>
            ),
          }))}
        />
      )}
    </>
  );
};

export default StatusDropdown;
