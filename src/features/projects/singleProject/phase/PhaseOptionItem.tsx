import { Button, ColorPicker, ConfigProvider, Flex, Input } from 'antd';
import { CloseCircleOutlined, HolderOutlined, DragOutlined } from '@ant-design/icons';
import { nanoid } from '@reduxjs/toolkit';
import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { deletePhaseOption, fetchPhasesByProjectId, updatePhaseColor } from './phases.slice';
import { PhaseColorCodes } from '../../../../shared/constants';
import { ITaskPhase } from '@/types/tasks/taskPhase.types';
import { TFunction } from 'i18next';
import logger from '@/utils/errorLogger';
import { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const PhaseOptionItem = ({
  option,
  projectId,
  t,
}: {
  option: ITaskPhase | null;
  projectId: string | null;
  t: TFunction;
}) => {
  const [color, setColor] = useState(option ? option?.color_code : PhaseColorCodes[0]);
  const dispatch = useAppDispatch();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ 
    id: option?.id || 'temp-id'
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  // handle delete phase option
  const handleDeletePhaseOption = async () => {
    try {
      const response = await dispatch(
        deletePhaseOption({ phaseOptionId: option?.id || '', projectId: projectId || '' })
      ).unwrap();
      if (response.done) {
        dispatch(fetchPhasesByProjectId(projectId || ''));
      }
    } catch (error) {
      logger.error('Error deleting phase option', error);
    }
  };

  const handleColorChange = async () => {
    if (!projectId || !option) return;
    try {
      const phase = { ...option, color_code: color };
      const response = await dispatch(updatePhaseColor({ projectId, body: phase })).unwrap();
      if (response.done) {
        dispatch(fetchPhasesByProjectId(projectId || ''));
      }
    } catch (error) {
      logger.error('Error changing phase color', error);
    }
  };

  return (
    <ConfigProvider wave={{ disabled: true }}>
      <div ref={setNodeRef} style={style} {...attributes}>
        <Flex key={option ? option?.id : nanoid()} align="center" gap={8}>
          <div {...listeners} style={{ cursor: 'grab' }}>
          <HolderOutlined />
          </div>
          <Input placeholder={t('enterPhaseName')} value={option?.name} />
          <ColorPicker
            onChange={value => setColor(value.toHexString())}
            onChangeComplete={handleColorChange}
            value={color}
          />
          <Button
            className="borderless-icon-btn"
            icon={<CloseCircleOutlined />}
            onClick={handleDeletePhaseOption}
          />
        </Flex>
      </div>
    </ConfigProvider>
  );
};

export default PhaseOptionItem;
