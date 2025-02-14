import { Flex } from 'antd';
import BoardSectionCard from './board-section-card/board-section-card';
import BoardCreateSectionCard from './board-section-card/board-create-section-card';
import TaskDrawer from '@/components/task-drawer/task-drawer';
import { createPortal } from 'react-dom';

const BoardSectionCardContainer = ({
  datasource,
  group,
}: {
  datasource: any;
  group: 'status' | 'priority' | 'phases' | 'members';
}) => {
  return (
    <Flex
      gap={16}
      align="flex-start"
      className="max-w-screen max-h-[620px] min-h-[620px] overflow-x-scroll p-[1px]"
    >
      {datasource.map((data: any) => (
        <BoardSectionCard taskGroup={data} />
      ))}

      {group !== 'priority' && <BoardCreateSectionCard />}

      {createPortal(<TaskDrawer />, document.body, 'task-drawer')}
    </Flex>
  );
};

export default BoardSectionCardContainer;