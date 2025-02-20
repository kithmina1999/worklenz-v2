import { Button, Drawer, Flex, Input, Skeleton, Spin, Typography } from 'antd';
import { useState } from 'react';
import { useAppSelector } from '../../../../hooks/useAppSelector';
import { useAppDispatch } from '../../../../hooks/useAppDispatch';
import { addPhaseOption, fetchPhasesByProjectId, toggleDrawer, updatePhaseOrder, updatePhaseListOrder } from './phases.slice';
import { Divider } from 'antd/lib';
import { PlusOutlined } from '@ant-design/icons';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PhaseOptionItem from './PhaseOptionItem';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  restrictToVerticalAxis,
} from '@dnd-kit/modifiers';
import { ITaskPhase } from '@/types/tasks/taskPhase.types';
import logger from '@/utils/errorLogger';
import { fetchTaskGroups } from '@/features/tasks/tasks.slice';


interface UpdateSortOrderBody {
  from_index: number;
  to_index: number;
  phases: ITaskPhase[];
  project_id: string;
}

const PhaseDrawer = () => {
  const { t } = useTranslation('phases-drawer');
  const isDrawerOpen = useAppSelector(state => state.phaseReducer.isPhaseDrawerOpen);
  const dispatch = useAppDispatch();
  const { projectId } = useParams();
  const [phaseName, setPhaseName] = useState<string>('');
  const { phaseList, loadingPhases } = useAppSelector(state => state.phaseReducer);
  const [sorting, setSorting] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleAddOptions = async () => {
    await dispatch(addPhaseOption({ projectId: projectId || '' }));
    await dispatch(fetchPhasesByProjectId(projectId || ''));
    await dispatch(fetchTaskGroups(projectId || ''));
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const oldIndex = phaseList.findIndex((item) => item.id === active.id);
      const newIndex = phaseList.findIndex((item) => item.id === over.id);
      
      // Create a new array with the updated order
      const newPhaseList = arrayMove(phaseList, oldIndex, newIndex);
      
      try {
        setSorting(true);
        
        // Optimistically update the UI
        dispatch(updatePhaseListOrder(newPhaseList));
        
        const body: UpdateSortOrderBody = {
          from_index: oldIndex,
          to_index: newIndex,
          phases: newPhaseList,
          project_id: projectId || ''
        };

        // Update the sort order
        await dispatch(updatePhaseOrder({ 
          projectId: projectId || '',
          body
        })).unwrap();
      } catch (error) {
        // If there's an error, revert back to the server state
        dispatch(fetchPhasesByProjectId(projectId || ''));
        logger.error('Error updating phase order', error);
      } finally {
        setSorting(false);
      }
    }
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

        <Spin spinning={loadingPhases || sorting}>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToVerticalAxis]}
          >
            <SortableContext
              items={phaseList.map(item => item.id)}
              strategy={verticalListSortingStrategy}
            >
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
            </SortableContext>
          </DndContext>
        </Spin>
      </Flex>
    </Drawer>
  );
};

export default PhaseDrawer;
