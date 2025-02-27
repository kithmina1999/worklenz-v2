import { Button, ColorPicker, ConfigProvider, Flex, Input } from 'antd';
import { CloseCircleOutlined, HolderOutlined, DragOutlined } from '@ant-design/icons';
import { nanoid } from '@reduxjs/toolkit';
import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { deletePhaseOption, fetchPhasesByProjectId, updatePhaseColor, updatePhaseName } from './phases.slice';
import { PhaseColorCodes } from '../../../../shared/constants';
import { ITaskPhase } from '@/types/tasks/taskPhase.types';
import { TFunction } from 'i18next';
import logger from '@/utils/errorLogger';
import { useState, useEffect } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { fetchTaskGroups } from '@/features/board/board-slice';
import { updatePhaseLabel } from '@/features/project/project.slice';

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

  const [phaseName, setPhaseName] = useState(option?.name || '');

  useEffect(() => {
    setPhaseName(option?.name || '');
  }, [option]);

  const handlePhaseNameInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhaseName(e.target.value);
  };

  const handlePhaseNameChange = async (e: React.FocusEvent<HTMLInputElement>) => {
    if (!projectId || !option) return;
    
    // Only update if the name has actually changed
    if (phaseName.trim() !== option.name.trim()) {
      try {
        const phase = { ...option, name: phaseName.trim() };
        const response = await dispatch(updatePhaseName({ 
          phaseId: option.id, 
          phase: phase, 
          projectId: projectId 
        })).unwrap();
        if (response.done) {
          dispatch(fetchPhasesByProjectId(projectId));
          await dispatch(fetchTaskGroups(projectId));
        }
      } catch (error) {
        logger.error('Error updating phase name', error);
        // Reset to original name if update fails
        setPhaseName(option.name);
      }
    }
  };

  // handle delete phase option
  const handleDeletePhaseOption = async () => {
    try {
      const response = await dispatch(
        deletePhaseOption({ phaseOptionId: option?.id || '', projectId: projectId || '' })
      ).unwrap();
      if (response.done) {
        dispatch(fetchPhasesByProjectId(projectId || ''));
        await dispatch(fetchTaskGroups(projectId || ''));
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
        await dispatch(fetchTaskGroups(projectId || ''));
      }
    } catch (error) {
      logger.error('Error changing phase color', error);
    }
  };

  const handleEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.currentTarget.blur();
    }
  };

  return (
    <ConfigProvider wave={{ disabled: true }}>
      <div ref={setNodeRef} style={style} {...attributes}>
        <Flex key={option ? option?.id : nanoid()} align="center" gap={8}>
          <div {...listeners} style={{ cursor: 'grab' }}>
          <HolderOutlined />
          </div>
          <Input
            type="text"
            value={phaseName}
            onChange={handlePhaseNameInput}
            onBlur={handlePhaseNameChange}
            onPressEnter={handleEnterPress}
            placeholder={t('enterPhaseName')}
          />
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
