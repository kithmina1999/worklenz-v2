import { Flex } from 'antd';
import React, { useState } from 'react';
import TimeLogItem from './TimeLogItem';
import { ITaskLogViewModel } from '@/types/tasks/task-log-view.types';

type TimeLogListProps = {
  timeLoggedList: ITaskLogViewModel[];
};

const TimeLogList = ({ timeLoggedList }: TimeLogListProps) => {
  return (
    <Flex vertical gap={6}>
      {timeLoggedList.map(log => (
        <TimeLogItem
          key={log.id}
          log={log}
        />
      ))}
    </Flex>
  );
};

export default TimeLogList;
