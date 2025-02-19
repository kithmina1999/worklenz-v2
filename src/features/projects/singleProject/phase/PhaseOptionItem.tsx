import { Button, ColorPicker, ConfigProvider, Flex, Input } from 'antd';
import { CloseCircleOutlined, HolderOutlined } from '@ant-design/icons';
import { nanoid } from '@reduxjs/toolkit';
import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { deletePhaseOption, fetchPhasesByProjectId, updatePhaseColor } from './phases.slice';
import { PhaseColorCodes } from '../../../../shared/constants';
import { AggregationColor } from 'antd/es/color-picker/color';
import { ITaskPhase } from '@/types/tasks/taskPhase.types';
import { TFunction } from 'i18next';
import logger from '@/utils/errorLogger';

const PhaseOptionItem = ({
  option,
  projectId,
  t,
}: {
  option: ITaskPhase | null;
  projectId: string | null;
  t: TFunction;
}) => {
  const dispatch = useAppDispatch();

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

  const handleColorChange = async (value: any) => {
    if (!projectId || !option) return;
    try {
      const phase = { ...option, color_code: value.toHexString() };
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
      <Flex key={option ? option?.id : nanoid()} align="center" gap={8}>
        <HolderOutlined style={{ cursor: 'move' }} />
        <Input placeholder={t('enterPhaseName')} value={option?.name} />
        <ColorPicker
          onChangeComplete={handleColorChange}
          value={option ? option?.color_code : PhaseColorCodes[0]}
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
