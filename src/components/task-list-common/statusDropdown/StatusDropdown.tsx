import { Badge, Flex, Select, Typography } from 'antd';
import { useState } from 'react';
import './statusDropdown.css';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { useTranslation } from 'react-i18next';
import { getStatusColor } from '../../../utils/getStatusColor';
import { ITaskStatus } from '@/types/status.types';

type StatusDropdownProps = {
  statusList: ITaskStatus[];
  status_id: string | undefined;
  onChange: (value: string) => void;
};

const StatusDropdown = ({ statusList, status_id, onChange }: StatusDropdownProps) => {
  // localization
  const { t } = useTranslation('task-list-table');

  const themeMode = useAppSelector(state => state.themeReducer.mode);

  const handleStatusChange = (value: string) => {
    const selectedOption = statusList.find(el => el.id === value);
    if (selectedOption && selectedOption.id) {
      onChange(selectedOption.id);
    }
  };

  return (
    <>
      {status_id && (
        <Select
          variant='borderless'
          value={status_id}
          onChange={handleStatusChange}
          dropdownStyle={{ borderRadius: 8, minWidth: 150, maxWidth: 200 }}
          labelRender={(value) => {
            const status = statusList.find(status => status.id === value.value);
            return status ? <Badge color={status.color_code} text={status.name} /> : '';
          }}
          options={statusList.map(status => ({
            value: status.id,
            label: (
              <Flex gap={8} align="center">
                <Badge color={status.color_code} text={status.name} />
              </Flex>
            ),
          }))}
        />
      )}
    </>
  );
};

export default StatusDropdown;
