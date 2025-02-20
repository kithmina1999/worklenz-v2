import { Flex } from 'antd';
import BoardSectionCard from './board-section-card/board-section-card';
import BoardCreateSectionCard from './board-section-card/board-create-section-card';
import {
  SortableContext,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';

const BoardSectionCardContainer = ({
  datasource,
  group,
}: {
  datasource: any;
  group: 'status' | 'priority' | 'phases' | 'members';
}) => {
  return (
    <SortableContext 
      items={datasource.map((section: any) => section.id)}
      strategy={horizontalListSortingStrategy}
    >
      <Flex
        gap={16}
        align="flex-start"
        className="max-w-screen max-h-[620px] min-h-[620px] overflow-x-scroll p-[1px]"
      >
        {datasource.map((data: any) => (
          <BoardSectionCard key={data.id} taskGroup={data} />
        ))}

        {group !== 'priority' && <BoardCreateSectionCard />}
      </Flex>
    </SortableContext>
  );
};

export default BoardSectionCardContainer;