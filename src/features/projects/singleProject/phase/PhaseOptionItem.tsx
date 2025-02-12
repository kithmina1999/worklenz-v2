import React from 'react';
import { PhaseOption } from '../../../../types/phase.types';
import { Button, ConfigProvider, Flex, Input, Select, Tag } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';
import { nanoid } from '@reduxjs/toolkit';
import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { deletePhaseOption } from './phaseSlice';
import { PhaseColorCodes } from '../../../../shared/constants';

const PhaseOptionItem = ({
  option,
  phaseId,
}: {
  option: PhaseOption | null;
  phaseId: string | null;
}) => {
  const dispatch = useAppDispatch();

  // phase options color options
  const phaseOptionColorList = [
    ...PhaseColorCodes.map((color, index) => ({
      key: index,
      value: color,
      label: (
        <Tag
          color={color}
          style={{
            display: 'flex',
            alignItems: 'center',
            width: 20,
            height: 20,
            borderRadius: '50%',
          }}
        />
      ),
    })),
  ];

  // handle delete phase option
  const handleDeletePhaseOption = () => {
    dispatch(
      deletePhaseOption({
        optionId: option?.optionId || '',
        phaseId: phaseId || '',
      })
    );
  };

  return (
    <ConfigProvider wave={{ disabled: true }}>
      <Flex key={option ? option?.optionId : nanoid()}>
        <Input
          placeholder="Enter a name for label"
          value={option ? option?.optionName : `Untitled Phase 1`}
        />
        <Select
          variant="borderless"
          suffixIcon={null}
          options={phaseOptionColorList}
          defaultValue={option ? option?.optionColor : phaseOptionColorList[0]}
          style={{
            width: 60,
          }}
        />
        <Button
          className="borderless-icon-btn"
          icon={<CloseCircleOutlined />}
          onClick={handleDeletePhaseOption}
        />
      </Flex>
    </ConfigProvider>
  );
};

export default PhaseOptionItem;
