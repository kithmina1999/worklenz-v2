import { useState } from "react";
import { ITaskAttachmentViewModel } from "@/types/tasks/task-attachment-view-model";
import { Button, Modal, Spin, Tooltip, Typography } from "antd";
import { EyeOutlined, DownloadOutlined, DeleteOutlined } from "@ant-design/icons";
import { attachmentsApiService } from "@/api/attachments/attachments.api.service";
import { IconsMap } from "@/shared/constants";
import './attachment-preview.css';

interface AttachmentsPreviewProps {
  attachment: ITaskAttachmentViewModel;
  onDelete?: (id: string) => void;
  isCommentAttachment?: boolean;
}

const AttachmentsPreview = ({ 
  attachment, 
  onDelete, 
  isCommentAttachment = false 
}: AttachmentsPreviewProps) => {
  const [deleting, setDeleting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [currentFileUrl, setCurrentFileUrl] = useState<string | null>(null);
  const [currentFileType, setCurrentFileType] = useState<string | null>(null);
  const [previewWidth, setPreviewWidth] = useState(768);
  const [downloading, setDownloading] = useState(false);
  const [previewedFileId, setPreviewedFileId] = useState<string | null>(null);
  const [previewedFileName, setPreviewedFileName] = useState<string | null>(null);

  const getFileIcon = (type?: string) => {
    if (!type) return "search.png";
    return IconsMap[type] || "search.png";
  };

  const isImageFile = (): boolean => {
    const imageTypes = ["jpeg", "jpg", "bmp", "gif", "webp", "png", "ico"];
    const type = attachment?.type;
    if (type) return imageTypes.includes(type);
    return false;
  };

  const handleCancel = () => {
    setIsVisible(false);
    setPreviewedFileId(null);
    setPreviewedFileName(null);
  };

  const download = async (id?: string, name?: string) => {
    if (!id || !name) return;
    try {
      setDownloading(true);
      const api = isCommentAttachment 
        ? attachmentsApiService.downloadAttachment // Assuming this exists, adjust as needed
        : attachmentsApiService.downloadAttachment;
      
      const res = await api(id, name);
      
      if (res && res.done) {
        const link = document.createElement('a');
        link.href = res.body || '';
        link.download = name;
        link.click();
        link.remove();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setDownloading(false);
    }
  };

  const handleDelete = (id?: string) => {
    if (!id) return;
    setDeleting(true);
    if (onDelete) {
      onDelete(id);
    }
  };

  const isImage = (extension: string): boolean => {
    return ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', 'ico'].includes(extension);
  };

  const isVideo = (extension: string): boolean => {
    return ['mp4', 'webm', 'ogg'].includes(extension);
  };

  const isAudio = (extension: string): boolean => {
    return ['mp3', 'wav', 'ogg'].includes(extension);
  };

  const isDoc = (extension: string): boolean => {
    return ['ppt', 'pptx', 'doc', 'docx', 'xls', 'xlsx', 'pdf'].includes(extension);
  };

  const previewFile = (fileUrl?: string, id?: string, fileName?: string) => {
    if (!fileUrl || !id || !fileName) return;

    setPreviewedFileId(id);
    setPreviewedFileName(fileName);

    const extension = (fileUrl as string).split('.').pop()?.toLowerCase();

    if (!extension) return;
    setIsVisible(true);
    
    if (isImage(extension)) {
      setCurrentFileType('image');
    } else if (isVideo(extension)) {
      setCurrentFileType('video');
    } else if (isAudio(extension)) {
      setPreviewWidth(600);
      setCurrentFileType('audio');
    } else if (isDoc(extension)) {
      setCurrentFileType('document');
      setPreviewWidth(1024);
    } else {
      setPreviewWidth(600);
      setCurrentFileType('unknown');
    }

    setCurrentFileUrl(fileUrl);
  };

  return (
    <>
      <div className="ant-upload-list-picture-card-container">
        {attachment && (
          <div 
            className="ant-upload-list-item ant-upload-list-item-done ant-upload-list-item-list-type-picture-card"
          >
            <Tooltip
              title={
                <div>
                  <p style={{ margin: 0 }}>{attachment.name}</p>
                  <p style={{ margin: 0 }}>{attachment.size}</p>
                  <p style={{ margin: 0 }}>
                    {attachment.created_at ? new Date(attachment.created_at).toLocaleString() : ''}
                  </p>
                </div>
              }
              placement="bottom"
            >
              <div className="ant-upload-list-item-info">
                <img 
                  src={`/assets/images/files/${getFileIcon(attachment.type)}`} 
                  className="file-icon" 
                  alt="" 
                />
                <div 
                  className="ant-upload-span" 
                  style={{ 
                    backgroundImage: isImageFile() ? `url(${attachment.url})` : '' 
                  }}
                >
                  <a 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="ant-upload-list-item-thumbnail"
                    href={attachment.url}
                  >
                    {!isImageFile() && (
                      <span 
                        className="anticon anticon-file-unknown" 
                        style={{ fontSize: 34, color: '#cccccc' }}
                      />
                    )}
                  </a>
                </div>
              </div>
            </Tooltip>

            <span className="ant-upload-list-item-actions">
              <Button 
                type="text" 
                size="small"
                title="Preview file" 
                onClick={() => previewFile(attachment.url, attachment.id, attachment.name)}
                className="ant-upload-list-item-card-actions-btn"
              >
                <EyeOutlined />
              </Button>

              <Button 
                type="text" 
                size="small"
                title="Download file"
                onClick={() => download(attachment.id, attachment.name)}
                loading={downloading}
                className="ant-upload-list-item-card-actions-btn"
              >
                <DownloadOutlined />
              </Button>

              <Button 
                type="text" 
                size="small"
                title="Remove file"
                onClick={() => handleDelete(attachment.id)}
                loading={deleting}
                className="ant-upload-list-item-card-actions-btn"
              >
                <DeleteOutlined />
              </Button>
            </span>
          </div>
        )}
      </div>

      <Modal
        open={isVisible}
        title={<Typography.Text>{attachment?.name}</Typography.Text>}
        centered
        onCancel={handleCancel}
        width={previewWidth}
        className="attachment-preview-modal"
        footer={[
          previewedFileId && previewedFileName && (
            <Button 
              key="download"
              onClick={() => download(previewedFileId, previewedFileName)} 
              loading={downloading}
            >
              <DownloadOutlined /> Download
            </Button>
          )
        ]}
      >
        <div className="preview-container text-center position-relative">
          <div className="loader">
            <Spin />
          </div>
          
          {currentFileType === 'image' && (
            <>
              <Spin />
              <img src={currentFileUrl || ''} className="img-fluid position-relative" alt="" />
            </>
          )}
          
          {currentFileType === 'video' && (
            <>
              <Spin />
              <video className="position-relative" controls>
                <source src={currentFileUrl || ''} type="video/mp4" />
              </video>
            </>
          )}
          
          {currentFileType === 'audio' && (
            <>
              <Spin />
              <audio className="position-relative" controls>
                <source src={currentFileUrl || ''} type="audio/mpeg" />
              </audio>
            </>
          )}
          
          {currentFileType === 'document' && (
            <>
              <Spin />
              {currentFileUrl && (
                <iframe 
                  src={`https://docs.google.com/viewer?url=${encodeURIComponent(currentFileUrl)}&embedded=true`}
                  width="100%" 
                  height="500px" 
                  style={{ border: 'none' }}
                />
              )}
            </>
          )}
          
          {currentFileType === 'unknown' && (
            <p>The preview for this file type is not available.</p>
          )}
        </div>
      </Modal>
    </>
  );
};

export default AttachmentsPreview;
