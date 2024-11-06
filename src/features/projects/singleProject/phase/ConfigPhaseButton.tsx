import { SettingOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import React from 'react';
import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { toggleDrawer } from './phaseSlice';
import { useAppSelector } from '../../../../hooks/useAppSelector';
import { colors } from '../../../../styles/colors';

const ConfigPhaseButton = ({ color }: { color: string }) => {
  // get theme details from redux
  const themeMode = useAppSelector((state) => state.themeReducer.mode);

  const dispatch = useAppDispatch();

  return (
    <Tooltip title={`Phase settings`}>
      <Button
        className="borderless-icon-btn"
        onClick={() => dispatch(toggleDrawer())}
        icon={
          <SettingOutlined
            style={{
              color:
                color !== colors.darkGray
                  ? color
                  : themeMode === 'dark'
                    ? colors.white
                    : colors.darkGray,
            }}
          />
        }
      />
    </Tooltip>
  );
};

export default ConfigPhaseButton;
