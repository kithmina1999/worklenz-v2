import { useParams } from 'react-router-dom';
import { useAppSelector } from './useAppSelector';

// this custom hook return currently selected project
export const useSelectedProject = () => {
  const { projectId } = useParams();

  const projectList = useAppSelector(
    (state) => state.projectReducer.projectsList
  );

  const selectedProject = projectList.find(
    (project) => project.projectId === projectId
  );

  try {
    return selectedProject;
  } catch (error) {
    console.error('custom error: error in selecting a project');
  }
};
