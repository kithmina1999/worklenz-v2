import { Button, Collapse, CollapseProps, Flex, Skeleton, Tooltip, Typography, Upload } from 'antd';
import React, { useEffect, useState, useRef } from 'react';
import { LoadingOutlined, PlusOutlined, ReloadOutlined } from '@ant-design/icons';
import DescriptionEditor from './DescriptionEditor';
import SubTaskTable from './SubTaskTable';
import DependenciesTable from './dependencies-table';
import { useAppSelector } from '@/hooks/useAppSelector';
import TaskDetailsForm from './TaskDetailsForm';
import InfoTabFooter from './InfoTabFooter';
import { fetchTask } from '@/features/tasks/tasks.slice';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { TFunction } from 'i18next';
import { subTasksApiService } from '@/api/tasks/subtasks.api.service';
import { ISubTask } from '@/types/tasks/subTask.types';
import { ITaskDependency } from '@/types/tasks/task-dependency.types';
import { taskDependenciesApiService } from '@/api/tasks/task-dependencies.api.service';
import logger from '@/utils/errorLogger';
import AttachmentsUpload from './AttachmentsUpload';
import { getBase64 } from '@/utils/file-utils';
import { ITaskAttachment, ITaskAttachmentViewModel } from '@/types/tasks/task-attachment-view-model';
import taskAttachmentsApiService from '@/api/tasks/task-attachments.api.service';
import AttachmentsPreview from './attachments/attachments-preview';

interface TaskDrawerInfoTabProps {
  t: TFunction;
}

const TaskDrawerInfoTab = ({ t }: TaskDrawerInfoTabProps) => {
  const dispatch = useAppDispatch();

  const { projectId } = useAppSelector(state => state.projectReducer);
  const { taskFormViewModel, loadingTask, selectedTaskId } = useAppSelector(
    state => state.taskDrawerReducer
  );
  const [subTasks, setSubTasks] = useState<ISubTask[]>([]);
  const [loadingSubTasks, setLoadingSubTasks] = useState<boolean>(false);

  const [taskDependencies, setTaskDependencies] = useState<ITaskDependency[]>([]);
  const [loadingTaskDependencies, setLoadingTaskDependencies] = useState<boolean>(false);

  const [processingUpload, setProcessingUpload] = useState(false);
  const selectedFilesRef = useRef<File[]>([]);

  const [taskAttachments, setTaskAttachments] = useState<ITaskAttachmentViewModel[]>([]);
  const [loadingTaskAttachments, setLoadingTaskAttachments] = useState<boolean>(false);

  const handleFilesSelected = (files: File[]) => {
    console.log('files', files);
    if (!taskFormViewModel?.task?.id || !projectId) return;
    console.log('taskFormViewModel?.task?.id', taskFormViewModel?.task?.id);

    if (!processingUpload) {
      setProcessingUpload(true);

      setTimeout(async () => {
        const filesToUpload = [...files];
        selectedFilesRef.current = filesToUpload;

        filesToUpload.forEach(async file => {
          const base64 = await getBase64(file);
          const body: ITaskAttachment = {
            file: base64 as string,
            file_name: file.name,
            task_id: taskFormViewModel?.task?.id || '',
            project_id: projectId,
            size: file.size,
          };
          console.log('body', body);
          await taskAttachmentsApiService.createTaskAttachment(body);
        });
        setProcessingUpload(false);
        selectedFilesRef.current = [];

      }, 100);
    }
  };

  const fetchTaskData = () => {
    if (!loadingTask && selectedTaskId && projectId) {
      dispatch(fetchTask({ taskId: selectedTaskId, projectId }));
    }
  };

  const panelStyle: React.CSSProperties = {
    border: 'none',
    paddingBlock: 0,
  };

  const infoItems: CollapseProps['items'] = [
    {
      key: 'details',
      label: <Typography.Text strong>{t('taskInfoTab.details.title')}</Typography.Text>,
      children: <TaskDetailsForm taskFormViewModel={taskFormViewModel} />,
      style: panelStyle,
      className: 'custom-task-drawer-info-collapse',
    },
    {
      key: 'description',
      label: <Typography.Text strong>{t('taskInfoTab.description.title')}</Typography.Text>,
      children: (
        <DescriptionEditor
          description={taskFormViewModel?.task?.description || null}
          taskId={taskFormViewModel?.task?.id || ''}
          parentTaskId={taskFormViewModel?.task?.parent_task_id || ''}
        />
      ),
      style: panelStyle,
      className: 'custom-task-drawer-info-collapse',
    },
    {
      key: 'subTasks',
      label: <Typography.Text strong>{t('taskInfoTab.subTasks.title')}</Typography.Text>,
      extra: (
        <Tooltip title={t('taskInfoTab.subTasks.refreshSubTasks')} trigger={'hover'}>
          <Button
            shape="circle"
            icon={<ReloadOutlined spin={loadingSubTasks} />}
            onClick={() => fetchSubTasks()}
          />
        </Tooltip>
      ),
      children: (
        <SubTaskTable
          subTasks={subTasks}
          loadingSubTasks={loadingSubTasks}
          refreshSubTasks={() => fetchSubTasks()}
          t={t}
        />
      ),
      style: panelStyle,
      className: 'custom-task-drawer-info-collapse',
    },
    {
      key: 'dependencies',
      label: <Typography.Text strong>{t('taskInfoTab.dependencies.title')}</Typography.Text>,
      children: (
        <DependenciesTable
          task={taskFormViewModel?.task || {}}
          t={t}
          taskDependencies={taskDependencies}
          loadingTaskDependencies={loadingTaskDependencies}
          refreshTaskDependencies={() => fetchTaskDependencies()}
        />
      ),
      style: panelStyle,
      className: 'custom-task-drawer-info-collapse',
    },
    {
      key: 'attachments',
      label: <Typography.Text strong>{t('taskInfoTab.attachments.title')}</Typography.Text>,
      children: (
        <Flex vertical gap={16}>
          {taskAttachments.length > 0 && taskAttachments.map((attachment) => (
            <AttachmentsPreview key={attachment.id} attachment={attachment} />
          ))}
          <AttachmentsUpload t={t} loadingTask={loadingTask} onFilesSelected={handleFilesSelected} />
        </Flex>
      ),
      style: panelStyle,
      className: 'custom-task-drawer-info-collapse',
    },
    {
      key: 'comments',
      label: <Typography.Text strong>{t('taskInfoTab.comments.title')}</Typography.Text>,
      style: panelStyle,
      className: 'custom-task-drawer-info-collapse',
    },
  ];

  const fetchSubTasks = async () => {
    if (!selectedTaskId || loadingSubTasks) return;
    try {
      setLoadingSubTasks(true);
      const res = await subTasksApiService.getSubTasks(selectedTaskId);
      if (res.done) {
        setSubTasks(res.body);
      }
    } catch (error) {
      logger.error('Error fetching sub tasks:', error);
    } finally {
      setLoadingSubTasks(false);
    }
  };

  const fetchTaskDependencies = async () => {
    if (!selectedTaskId || loadingTaskDependencies) return;
    try {
      setLoadingTaskDependencies(true);
      const res = await taskDependenciesApiService.getTaskDependencies(selectedTaskId);
      if (res.done) {
        setTaskDependencies(res.body);
      }
    } catch (error) {
      logger.error('Error fetching task dependencies:', error);
    } finally {
      setLoadingTaskDependencies(false);
    }
  };

  const fetchTaskAttachments = async () => {
    if (!selectedTaskId || loadingTaskAttachments) return;
    try {
      setLoadingTaskAttachments(true);
      const res = await taskAttachmentsApiService.getTaskAttachments(selectedTaskId);
      if (res.done) {
        setTaskAttachments(res.body);
      }
    } catch (error) {
      logger.error('Error fetching task attachments:', error);
    } finally {
      setLoadingTaskAttachments(false);
    }
  };

  useEffect(() => {
    fetchTaskData();
    fetchSubTasks();
    fetchTaskDependencies();
    fetchTaskAttachments();
    return () => {
      setSubTasks([]);
      setTaskDependencies([]);
      setTaskAttachments([]);
      selectedFilesRef.current = [];
    };
  }, [selectedTaskId, projectId]);

  return (
    <Skeleton active loading={loadingTask}>
      <Flex vertical justify="space-between" style={{ height: '78vh' }}>
        <Collapse
          items={infoItems}
          bordered={false}
          style={{ maxHeight: 600, overflow: 'auto' }}
          defaultActiveKey={[
            'details',
            'description',
            'subTasks',
            'dependencies',
            'attachments',
            'comments',
          ]}
        />
        <InfoTabFooter />
      </Flex>
    </Skeleton>
  );
};

export default TaskDrawerInfoTab;
