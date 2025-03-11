import { useState, useEffect } from 'react';
import { ITaskAttachmentViewModel } from '@/types/tasks/task-attachment-view-model';
import AttachmentsGrid from './attachments-grid';
import { Card, Typography } from 'antd';
import { attachmentsApiService } from '@/api/attachments/attachments.api.service';

interface AttachmentsExampleProps {
  taskId: string;
}

const AttachmentsExample = ({ taskId }: AttachmentsExampleProps) => {
  const [attachments, setAttachments] = useState<ITaskAttachmentViewModel[]>([]);
  const [loading, setLoading] = useState(false);

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
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await attachmentsApiService.deleteAttachment(id);
      if (response.done) {
        // Refresh the attachments list
        fetchAttachments();
      }
    } catch (error) {
      console.error('Error deleting attachment', error);
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
      />
    </Card>
  );
};

export default AttachmentsExample; 