import { Input } from 'antd';
import React, { useState } from 'react';
import { useAppSelector } from '@/hooks/useAppSelector';
import { colors } from '@/styles/colors';
import { useTranslation } from 'react-i18next';

const AddTaskListRow = () => {
  const [isEdit, setIsEdit] = useState<boolean>(false);

  // localization
  const { t } = useTranslation('task-list-table');

  // get data theme data from redux
  const themeMode = useAppSelector(state => state.themeReducer.mode);
  const customBorderColor = themeMode === 'dark' && ' border-[#303030]';

  return (
    <div className={`border-t ${customBorderColor}`}>
      {isEdit ? (
        <Input
          className="h-12 w-full rounded-none"
          style={{ borderColor: colors.skyBlue }}
          placeholder={t('addTaskInputPlaceholder')}
          onBlur={() => setIsEdit(false)}
        />
      ) : (
        <Input
          onFocus={() => setIsEdit(true)}
          className="w-[300px] border-none"
          value={t('addTaskText')}
        />
      )}
    </div>
  );
};

export default AddTaskListRow;
