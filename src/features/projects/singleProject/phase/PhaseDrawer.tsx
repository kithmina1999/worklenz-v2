import { Button, Drawer, Flex, Input, Typography } from 'antd';
import React, { useState } from 'react';
import { useAppSelector } from '../../../../hooks/useAppSelector';
import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { addPhaseOption, toggleDrawer } from './phaseSlice';
import { useSelectedProject } from '../../../../hooks/useSelectedProject';
import { Divider } from 'antd/lib';
import { PlusOutlined } from '@ant-design/icons';
import PhaseOptionItem from './PhaseOptionItem';
import { PhaseOption } from '../../../../types/phase.types';
import { nanoid } from '@reduxjs/toolkit';

const PhaseDrawer = () => {
  // get drawer state from phase slice
  const isDrawerOpen = useAppSelector(
    (state) => state.phaseReducer.isPhaseDrawerOpen
  );
  const dispatch = useAppDispatch();

  // get currently selected project from useSelectedProject hook
  const selectedProject = useSelectedProject();

  // get phase data from phase reducer
  const phase =
    useAppSelector((state) => state.phaseReducer.phaseList).find(
      (phase) => phase.projectId === selectedProject?.projectId
    ) || null;

  const [phaseName, setPhaseName] = useState<string>(
    phase ? phase?.phase : 'Phase'
  );

  // handle add option
  const handleAddOptions = () => {
    const newPhaseOption: PhaseOption = {
      optionId: nanoid(),
      optionName: 'Untitiled Phase  1',
      optionColor: '#fbc84c',
    };

    dispatch(
      addPhaseOption({ phaseId: phase?.phaseId || '', option: newPhaseOption })
    );
  };

  return (
    <Drawer
      open={isDrawerOpen}
      onClose={() => dispatch(toggleDrawer())}
      title={
        <Typography.Text style={{ fontWeight: 500, fontSize: 16 }}>
          Configure phases
        </Typography.Text>
      }
    >
      <Flex vertical gap={8}>
        <Typography.Text>Phase Label :</Typography.Text>
        <Input
          placeholder="Enter a name for label"
          value={phaseName}
          onChange={(e) => setPhaseName(e.currentTarget.value)}
        />
      </Flex>

      <Divider style={{ marginBlock: 24 }} />

      <Flex vertical gap={16}>
        <Flex align="center" justify="space-between">
          <Typography.Text>Phase Options :</Typography.Text>

          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAddOptions}
          >
            Add Option
          </Button>
        </Flex>

        <Flex vertical gap={16}>
          {phase
            ? phase.phaseOptions.map((option) => (
                <PhaseOptionItem
                  key={option.optionId}
                  option={option}
                  phaseId={phase.phaseId || null}
                />
              ))
            : null}
        </Flex>
      </Flex>
    </Drawer>
  );
};

export default PhaseDrawer;
