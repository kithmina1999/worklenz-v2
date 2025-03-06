import { setupSocketHandlers } from './socketHandlers';

const TaskGroupWrapper = ({ taskGroups, groupBy }: TaskGroupWrapperProps) => {
  useEffect(() => {
    const cleanupSocketHandlers = setupSocketHandlers(socket, dispatch, currentSession, loadingAssignees, groups, projectId);
    return () => cleanupSocketHandlers();
  }, [socket, currentSession?.team_id, loadingAssignees, groups, dispatch, projectId]);

  // ... existing code ...
};

export default TaskGroupWrapper; 