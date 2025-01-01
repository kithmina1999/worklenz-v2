import GreetingWithTime from './greeting-with-time';
import TasksList from '@/pages/home/task-list/tasks-list';
import TodoList from '@/pages/home/todo-list/todo-list';
import { Col, Flex } from 'antd';
import { useMediaQuery } from 'react-responsive';
import ProjectDrawer from '@/components/projects/project-drawer/project-drawer';
import CreateProjectButton from '@/components/projects/project-drawer/create-project-button';
import RecentAndFavouriteProjectList from '@/pages/home/recent-and-favourite-project-list/recent-and-favourite-project-list';
import { useDocumentTitle } from '@/hooks/useDoumentTItle';
import { useAppSelector } from '@/hooks/useAppSelector';
import { fetchProjectStatuses } from '@/features/projects/lookups/projectStatuses/projectStatusesSlice';
import { useEffect } from 'react';
import { fetchProjectCategories } from '@/features/projects/lookups/projectCategories/projectCategoriesSlice';
import { fetchProjectHealth } from '@/features/projects/lookups/projectHealth/projectHealthSlice';
import { useAppDispatch } from '@/hooks/useAppDispatch';

const HomePage = () => {
  const isDesktop = useMediaQuery({ query: '(min-width: 1024px)' });
  useDocumentTitle('Home');
  const dispatch = useAppDispatch();

  const { projectCategories: categories } = useAppSelector(state => state.projectCategoriesReducer);
  const { statuses } = useAppSelector(state => state.projectStatusesReducer);
  const { healths } = useAppSelector(state => state.projectHealthReducer);
  
  useEffect(() => {
    if (!healths.length) dispatch(fetchProjectHealth());
    if (!categories.length) dispatch(fetchProjectCategories());
    if (!statuses.length) dispatch(fetchProjectStatuses());
  }, [dispatch]);
  
  const createProjectButton = isDesktop ? (
    <div className="absolute right-0 top-1/2 -translate-y-1/2">
      <CreateProjectButton />
    </div>
  ) : (
    <CreateProjectButton />
  );

  const content = isDesktop ? (
    <Flex
      gap={24}
      align="flex-start"
      style={{
        width: '100%',
        marginBlockStart: 48,
      }}
    >
      <Flex style={{ minWidth: 500, width: '100%' }}>
        <TasksList />
      </Flex>
      <Flex vertical gap={24} style={{ width: '100%', maxWidth: 400 }}>
        <TodoList />
        <RecentAndFavouriteProjectList />
      </Flex>
    </Flex>
  ) : (
    <Flex
      vertical
      gap={24}
      style={{
        marginBlockStart: 24,
      }}
    >
      <TasksList />
      <TodoList />
      <RecentAndFavouriteProjectList />
    </Flex>
  );

  return (
    <div style={{ marginBlock: 96, minHeight: '90vh' }}>
      <Col style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <GreetingWithTime />
        {createProjectButton}
      </Col>

      {content}

      <ProjectDrawer categories={categories} statuses={statuses} healths={healths} />
    </div>
  );
};

export default HomePage;
