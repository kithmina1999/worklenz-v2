import { PlusOutlined } from '@ant-design/icons';
import { Button, Tooltip } from 'antd';
import React, { useState } from 'react';
import CustomColumnModal from './custom-column-modal';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { setCustomColumnModalAttributes, toggleCustomColumnModalOpen } from '@/features/projects/singleProject/task-list-custom-columns/task-list-custom-columns-slice';

const AddCustomColumnButton = () => {
  const dispatch = useAppDispatch();

  const handleModalOpen = () => {
    dispatch(setCustomColumnModalAttributes({modalType: 'create', columnId: null}));
    dispatch(toggleCustomColumnModalOpen(true));
  };

  return (
    <>
      <Tooltip title={'Add a custom column'}>
        <Button
          icon={<PlusOutlined />}
          style={{
            background: 'transparent',
            border: 'none',
            boxShadow: 'none',
          }}
          onClick={handleModalOpen}
        />
      </Tooltip>

    </>
  );
};

export default AddCustomColumnButton;
