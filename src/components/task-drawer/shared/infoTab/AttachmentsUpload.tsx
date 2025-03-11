import React from 'react';
import { Upload } from 'antd';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import { TFunction } from 'i18next';
import type { UploadProps } from 'antd';

interface AttachmentsUploadProps {
  t: TFunction;
  loadingTask: boolean;
  uploading: boolean;
  onFilesSelected: (files: File[]) => void;
}

const AttachmentsUpload = ({ 
  t, 
  loadingTask, 
  uploading, 
  onFilesSelected 
}: AttachmentsUploadProps) => {
  const handleBeforeUpload: UploadProps['beforeUpload'] = (file, fileList) => {
    onFilesSelected(fileList);
    return false; // Prevent default upload behavior
  };

  return (
    <Upload
      listType="picture-card"
      showUploadList={false}
      beforeUpload={handleBeforeUpload}
      disabled={loadingTask || uploading}
      className="upload-button-container"
      accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.zip,.rar"
      multiple
    >
      <div className="upload-button">
        {uploading ? <LoadingOutlined spin /> : <PlusOutlined />}
        <div className="upload-button-text">
          {uploading ? t('taskInfoTab.attachments.uploading') : t('taskInfoTab.attachments.chooseOrDropFileToUpload')}
        </div>
      </div>
    </Upload>
  );
};

export default AttachmentsUpload; 