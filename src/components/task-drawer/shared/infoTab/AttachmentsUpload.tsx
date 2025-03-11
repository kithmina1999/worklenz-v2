import React from 'react';
import { Upload, Flex, Typography } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { TFunction } from 'i18next';
import type { UploadChangeParam, UploadFile } from 'antd/es/upload/interface';

interface AttachmentsUploadProps {
  t: TFunction;
  loadingTask: boolean;
  onFilesSelected?: (files: File[]) => void;
}

const AttachmentsUpload: React.FC<AttachmentsUploadProps> = ({ t, loadingTask, onFilesSelected }) => {
  const handleChange = (info: UploadChangeParam<UploadFile<any>>) => {
    // Extract files from the upload info
    const files = info.fileList
      .filter(file => file.originFileObj)
      .map(file => file.originFileObj as File);
    
    // Pass the files to the parent component
    if (files.length > 0 && onFilesSelected) {
      onFilesSelected(files);
    }
  };

  return (
    <Upload
      name="attachment"
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      onChange={handleChange}
      beforeUpload={() => false} // Prevent auto upload
      multiple={true}
    >
      <button style={{ border: 0, background: 'none' }} type="button">
        <Flex vertical align="center" gap={4}>
          {loadingTask ? <LoadingOutlined /> : <PlusOutlined />}
          <Typography.Text style={{ fontSize: 12 }}>
            {t('taskInfoTab.attachments.chooseOrDropFileToUpload')}
          </Typography.Text>
        </Flex>
      </button>
    </Upload>
  );
};

export default AttachmentsUpload; 