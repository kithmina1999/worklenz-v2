import { Drawer, Typography } from 'antd';
import React from 'react';
import { useAppSelector } from '../../../../hooks/useAppSelector';
import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { toggleDrawer } from './phaseSlice';

const PhaseDrawer = () => {
  // get drawer state from phase slice
  const isDrawerOpen = useAppSelector(
    (state) => state.phaseReducer.isPhaseDrawerOpen
  );
  const dispatch = useAppDispatch();

  return (
    <Drawer
      open={isDrawerOpen}
      onClose={() => dispatch(toggleDrawer())}
      title={
        <Typography.Text style={{ fontWeight: 500, fontSize: 16 }}>
          Configure phases
        </Typography.Text>
      }
    ></Drawer>
  );
};

export default PhaseDrawer;
