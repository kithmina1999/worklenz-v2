// DescriptionEditor.tsx
import React, { useState } from 'react';
import { Input } from 'antd';
import { Editor } from 'primereact/editor';

const DescriptionEditor = ({ description }: { description: string | null }) => {
  const [isEditorOpen, setIsEditorOpen] = useState<boolean>(false);

  return isEditorOpen ? (
    <Editor value={description || ''} style={{ width: '100%', height: 320 }} />
  ) : (
    <Input.TextArea
      defaultValue={description || ''}
      placeholder="Add a more detailed description..."
      onFocus={() => setIsEditorOpen(true)}
    />
  );
};

export default DescriptionEditor;
