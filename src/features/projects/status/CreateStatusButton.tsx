import { SettingOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import React from 'react';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { toggleDrawer } from './StatusSlice';
import { colors } from '../../../styles/colors';

const CreateStatusButton = () => {
  const dispatch = useAppDispatch();

  return (
    <Tooltip title={`Status settings`}>
      <Button
        className="borderless-icon-btn"
        onClick={() => dispatch(toggleDrawer())}
        icon={
          <SettingOutlined
            style={{
              color: colors.skyBlue,
            }}
          />
        }
      />
    </Tooltip>
  );
};

export default CreateStatusButton;
