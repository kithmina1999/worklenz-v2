import { useState, useEffect } from 'react';
import { ITaskAttachmentViewModel } from '@/types/tasks/task-attachment-view-model';
import AttachmentsGrid from './attachments-grid';
import { Card, Typography, message } from 'antd';
import { attachmentsApiService } from '@/api/attachments/attachments.api.service';
import taskAttachmentsApiService from '@/api/tasks/task-attachments.api.service';
import { getBase64 } from '@/utils/file-utils';
import { useAppSelector } from '@/hooks/useAppSelector';
import type { RcFile } from 'antd/es/upload';

interface AttachmentsExampleProps {
  taskId: string;
}

const AttachmentsExample = ({ taskId }: AttachmentsExampleProps) => {
  const [attachments, setAttachments] = useState<ITaskAttachmentViewModel[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const { projectId } = useAppSelector(state => state.projectReducer);

  const fetchAttachments = async () => {
    if (!taskId) return;
    
    try {
      setLoading(true);
      const response = await attachmentsApiService.getTaskAttachments(taskId);
      if (response.done && response.body?.data) {
        setAttachments(response.body.data);
      }
    } catch (error) {
      console.error('Error fetching task attachments', error);
      message.error('Failed to load attachments');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    // The actual deletion is handled in the AttachmentsPreview component
    // Here we just need to refresh the attachments list
    fetchAttachments();
  };

  const handleUpload = async (file: RcFile) => {
    if (!taskId || !projectId) {
      message.error('Task ID or Project ID is missing');
      return;
    }

    try {
      setUploading(true);
      const base64 = await getBase64(file);
      
      const body = {
        file: base64 as string,
        file_name: file.name,
        task_id: taskId,
        project_id: projectId,
        size: file.size,
      };
      
      const response = await taskAttachmentsApiService.createTaskAttachment(body);
      
      if (response.done) {
        message.success('File uploaded successfully');
        fetchAttachments();
      }
    } catch (error) {
      console.error('Error uploading file', error);
      message.error('Failed to upload file');
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    fetchAttachments();
  }, [taskId]);

  return (
    <Card 
      title={<Typography.Text>Attachments</Typography.Text>}
      loading={loading}
    >
      <AttachmentsGrid 
        attachments={attachments} 
        onDelete={handleDelete}
        onUpload={handleUpload}
      />
    </Card>
  );
};

export default AttachmentsExample; 