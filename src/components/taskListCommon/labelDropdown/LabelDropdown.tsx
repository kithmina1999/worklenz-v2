/* eslint-disable react-hooks/exhaustive-deps */
import { PlusOutlined } from '@ant-design/icons';
import {
  Badge,
  Button,
  Card,
  Checkbox,
  Divider,
  Dropdown,
  Flex,
  Input,
  InputRef,
  List,
  Typography,
} from 'antd';
import React, { useMemo, useRef, useState } from 'react';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { colors } from '../../../styles/colors';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import { LabelType } from '../../../types/label.type';
import { nanoid } from '@reduxjs/toolkit';
import { addLabel } from '../../../features/settings/label/labelSlice';

const LabelDropdown = () => {
  const labelInputRef = useRef<InputRef>(null);
  const dispatch = useAppDispatch();

  // get label list from label reducer
  const labelList = useAppSelector((state) => state.labelReducer.labelList);

  // this is for get the current string that type on search bar
  const [searchQuery, setSearchQuery] = useState<string>('');

  // used useMemo hook for re render the list when searching
  const filteredLabelData = useMemo(() => {
    return labelList.filter((label) =>
      label.labelName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [labelList, searchQuery]);

  const handleCreateLabel = (labelName: string) => {
    if (labelName.length > 0) {
      const newLabel: LabelType = {
        labelId: nanoid(),
        labelName,
        labelColor: '#1E90FF',
      };

      dispatch(addLabel(newLabel));
      setSearchQuery('');
    }
  };

  // custom dropdown content
  const labelDropdownContent = (
    <Card className="custom-card" styles={{ body: { padding: 8 } }}>
      <Flex vertical gap={8}>
        <Input
          ref={labelInputRef}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.currentTarget.value)}
          placeholder="Search by name"
        />

        <List style={{ padding: 0 }}>
          {filteredLabelData.length ? (
            filteredLabelData.map((label) => (
              <List.Item
                className="custom-list-item"
                key={label.labelId}
                style={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  gap: 8,
                  padding: '4px 8px',
                  border: 'none',
                }}
              >
                <Checkbox
                  id={label.labelId}
                  // onChange={() =>
                  //     handleSelectedFiltersCount(
                  //         e.target.checked
                  //     )
                  // }
                />

                <Flex gap={8}>
                  <Badge color={label.labelColor} />
                  {label.labelName}
                </Flex>
              </List.Item>
            ))
          ) : (
            <Typography.Text
              style={{ color: colors.lightGray }}
              onClick={() => handleCreateLabel(searchQuery)}
            >
              Hit enter to create!
            </Typography.Text>
          )}
        </List>

        <Divider style={{ margin: 0 }} />

        <Button
          type="primary"
          style={{ alignSelf: 'flex-end' }}
          onClick={() => handleCreateLabel(searchQuery)}
          onKeyDownCapture={(e) =>
            e.key === 'Enter' && handleCreateLabel(searchQuery)
          }
        >
          OK
        </Button>
      </Flex>
    </Card>
  );

  // function to focus label input
  const handleLabelDropdownOpen = (open: boolean) => {
    if (open) {
      setTimeout(() => {
        labelInputRef.current?.focus();
      }, 0);
    }
  };

  return (
    <Dropdown
      overlayClassName="custom-dropdown"
      trigger={['click']}
      dropdownRender={() => labelDropdownContent}
      onOpenChange={handleLabelDropdownOpen}
    >
      <Button
        type="dashed"
        icon={<PlusOutlined style={{ fontSize: 12 }} />}
        size="small"
      />
    </Dropdown>
  );
};

export default LabelDropdown;
