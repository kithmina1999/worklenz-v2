import { Input } from 'antd';
import React, { useState } from 'react';
import { useAppSelector } from '@/hooks/useAppSelector';
import { colors } from '@/styles/colors';
import { useTranslation } from 'react-i18next';

const TaskListInstantTaskInput = () => {
  const [isEdit, setIsEdit] = useState<boolean>(false);

  // localization
  const { t } = useTranslation('task-list-table');

  // get data theme data from redux
  const themeMode = useAppSelector((state) => state.themeReducer.mode);
  const customBorderColor = themeMode === 'dark' && ' border-[#303030]';

  return (
    <div className={`border-t ${customBorderColor}; border-b-[1px] border-r-[1px]`}>
      {isEdit ? (
        <Input
          className="w-full rounded-none"
          style={{ borderColor: colors.skyBlue, height: '40px' }}
          placeholder={t('addTaskInputPlaceholder')}
          onBlur={() => setIsEdit(false)}
        />
      ) : (
        <Input
          onFocus={() => setIsEdit(true)}
          className="w-[300px] border-none"
          style={{ height: '34px' }}
          value={t('addTaskText')}
        />
      )}
    </div>
  );
};

export default TaskListInstantTaskInput;
