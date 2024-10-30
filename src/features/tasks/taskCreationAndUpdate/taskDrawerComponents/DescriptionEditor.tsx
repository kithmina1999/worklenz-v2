// DescriptionEditor.tsx
import React, { useState } from 'react';
import { Input } from 'antd';
import { Editor } from 'primereact/editor';
import { TaskType } from '../../../../types/task.types';

const DescriptionEditor = ({
  selectedTask,
}: {
  selectedTask: TaskType | null;
}) => {
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  return isEditorOpen ? (
    <Editor
      value={selectedTask?.description || ''}
      style={{ width: '100%', height: 320 }}
    />
  ) : (
    <Input.TextArea
      defaultValue={selectedTask?.description || ''}
      placeholder="Add a more detailed description..."
      onFocus={() => setIsEditorOpen(true)}
    />
  );
};

export default DescriptionEditor;
