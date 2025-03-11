import { ITaskAttachmentViewModel } from "@/types/tasks/task-attachment-view-model";
import AttachmentsPreview from "./attachments-preview";
import './attachment-preview.css';

interface AttachmentsGridProps {
  attachments: ITaskAttachmentViewModel[];
  onDelete?: (id: string) => void;
  isCommentAttachment?: boolean;
}

const AttachmentsGrid = ({ 
  attachments, 
  onDelete, 
  isCommentAttachment = false 
}: AttachmentsGridProps) => {
  if (!attachments || attachments.length === 0) {
    return <div>No attachments found</div>;
  }

  return (
    <div className="attachments-grid">
      {attachments.map((attachment) => (
        <AttachmentsPreview
          key={attachment.id}
          attachment={attachment}
          onDelete={onDelete}
          isCommentAttachment={isCommentAttachment}
        />
      ))}
    </div>
  );
};

export default AttachmentsGrid; 