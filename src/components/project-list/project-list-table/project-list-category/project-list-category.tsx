import { IProjectViewModel } from '@/types/project/projectViewModel.types';
import { Tooltip, Tag } from 'antd';
import { TFunction } from 'i18next';
import { useAppSelector } from '@/hooks/useAppSelector';

export const CategoryCell: React.FC<{ record: IProjectViewModel; t: TFunction }> = ({
  record,
  t,
}) => {
  if (!record.category_name) return '-';

  const { categories } = useAppSelector(state => state.projectCategoriesReducer);

  const filterByCategory = (category: string | undefined) => {
    if (!category) return;

    const categoryName = categories.find(c => c.id === category)?.name;
  
    console.log('clicked', category);
  };

  return (
    <Tooltip title={`${t('clickToFilter')} "${record.category_name}"`}>
      <Tag
        color="#ff9c3c"
        className="rounded-full table-tag"
        onClick={(e) => {
          e.stopPropagation();
          filterByCategory(record.category_id);
        }}
      >
        {record.category_name}
      </Tag>
    </Tooltip>
  );
};
