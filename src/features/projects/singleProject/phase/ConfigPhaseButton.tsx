import { SettingOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import React from 'react';
import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { toggleDrawer } from './phaseSlice';

const ConfigPhaseButton = ({ color }: { color: string }) => {
  const dispatch = useAppDispatch();

  return (
    <Tooltip title={`Phase settings`}>
      <Button
        className="borderless-icon-btn"
        onClick={() => dispatch(toggleDrawer())}
        icon={<SettingOutlined style={{ color: color }} />}
      />
    </Tooltip>
  );
};

export default ConfigPhaseButton;
