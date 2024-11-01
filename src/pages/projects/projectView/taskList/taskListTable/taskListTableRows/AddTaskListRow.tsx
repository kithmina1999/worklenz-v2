import { Input } from 'antd';
import React, { useState } from 'react';
import { useAppSelector } from '../../../../../../hooks/useAppSelector';
import { colors } from '../../../../../../styles/colors';

const AddTaskListRow = () => {
  const [isEdit, setIsEdit] = useState<boolean>(false);

  // get data theme data from redux
  const themeMode = useAppSelector((state) => state.themeReducer.mode);
  const customBorderColor = themeMode === 'dark' && ' border-[#303030]';

  return (
    <div className={`border-t ${customBorderColor}`}>
      {isEdit ? (
        <Input
          className="h-12 w-full rounded-none"
          style={{ borderColor: colors.skyBlue }}
          placeholder="Type your task and hit enter"
          onBlur={() => setIsEdit(false)}
        />
      ) : (
        <Input
          onFocus={() => setIsEdit(true)}
          className="w-[300px] border-none"
          value="+ Add Task"
        />
      )}
    </div>
  );
};

export default AddTaskListRow;
