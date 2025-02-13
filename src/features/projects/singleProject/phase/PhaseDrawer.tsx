import { Button, Drawer, Flex, Input, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../../../hooks/useAppSelector';
import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { addPhaseOption, fetchPhasesByProjectId, toggleDrawer } from './phases.slice';
import { Divider } from 'antd/lib';
import { PlusOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PhaseOptionItem from './PhaseOptionItem';

const PhaseDrawer = () => {
  const { t } = useTranslation('phases-drawer');
  const isDrawerOpen = useAppSelector(state => state.phaseReducer.isPhaseDrawerOpen);
  const dispatch = useAppDispatch();
  const { projectId } = useParams();
  const [phaseName, setPhaseName] = useState<string>('');
  const { phaseList, loadingPhases } = useAppSelector(state => state.phaseReducer);

  const handleAddOptions = () => {
    dispatch(addPhaseOption({ projectId: projectId || '' }));
    dispatch(fetchPhasesByProjectId(projectId || ''));
  };

  return (
    <Drawer
      open={isDrawerOpen}
      onClose={() => dispatch(toggleDrawer())}
      title={
        <Typography.Text style={{ fontWeight: 500, fontSize: 16 }}>
          {t('configurePhases')}
        </Typography.Text>
      }
    >
      <Flex vertical gap={8}>
        <Typography.Text>{t('phaseLabel')}</Typography.Text>
        <Input
          placeholder={t('enterPhaseName')}
          value={phaseName}
          onChange={e => setPhaseName(e.currentTarget.value)}
        />
      </Flex>

      <Divider style={{ marginBlock: 24 }} />

      <Flex vertical gap={16}>
        <Flex align="center" justify="space-between">
          <Typography.Text>{t('phaseOptions')}</Typography.Text>

          <Button type="primary" icon={<PlusOutlined />} onClick={handleAddOptions}>
            {t('addOption')}
          </Button>
        </Flex>

        <Flex vertical gap={16}>
          {phaseList.map(option => (
            <PhaseOptionItem
              key={option.id}
              option={option}
              projectId={projectId || ''}
              t={t}
            />
          ))}
        </Flex>
      </Flex>
    </Drawer>
  );
};

export default PhaseDrawer;
