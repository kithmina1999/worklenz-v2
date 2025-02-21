import {
  useGetProjectsQuery,
  useToggleFavoriteProjectMutation,
} from '@/api/projects/projects.v1.api.service';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { IProjectViewModel } from '@/types/project/projectViewModel.types';
import { Rate } from 'antd';
import { TFunction } from 'i18next';
import { useCallback } from 'react';

export const ProjectRateCell: React.FC<{
  record: IProjectViewModel;
  t: TFunction;
}> = ({ record, t }) => {
  const dispatch = useAppDispatch();
  const [toggleFavoriteProject] = useToggleFavoriteProjectMutation();
  const { requestParams } = useAppSelector(state => state.projectsReducer);
  const { refetch: refetchProjects } = useGetProjectsQuery(requestParams);

  const handleFavorite = useCallback(async () => {
    if (record.id) {
      await toggleFavoriteProject(record.id);
      refetchProjects();
    }
  }, [dispatch, record.id]);

  return (
    <div className="flex items-center"
    onClick={e => {
      e.stopPropagation();
      handleFavorite();
    }}>
      <Rate
        value={record.favorite ? 1 : 0}
        count={1}
        className="mr-2"
        tooltips={[t('addToFavourites')]}
      />
    </div>
  );
};
