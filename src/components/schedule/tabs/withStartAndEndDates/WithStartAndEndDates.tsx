import StatusGroupTables from "../../../../pages/projects/projectView/taskList/groupTables/statusTables/StatusGroupTables";
import PriorityGroupTables from "../../../../pages/projects/projectView/taskList/groupTables/priorityTables/PriorityGroupTables";
import { TaskType } from "../../../../types/task.types";
import { useAppSelector } from "../../../../hooks/useAppSelector";
import GroupByFilterDropdown from "../../../../pages/projects/projectView/taskList/taskListFilters/GroupByFilterDropdown";

const WithStartAndEndDates = () => {
    const dataSource: TaskType[] = useAppSelector(
        (state) => state.taskReducer.tasks
      );
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
        <div style={{display: 'flex', gap: '5px', flexDirection: 'column', border: '1px solid rgba(0, 0, 0, 0.21)', padding: '20px', borderRadius: '15px'}}>
            <span style={{fontSize: '24px', fontWeight: 'bold', color: 'rgba(112, 113, 114, 1)'}}>2024-11-04 - 2024-12-24</span>
            <div style={{display: 'flex', alignItems: 'center', width: '100%', gap: '200px', color: 'rgba(121, 119, 119, 1)'}}>
                <div style={{width: '50%'}}>
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                        <span>Allocated time</span>
                        <span>8 hours</span>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                        <span>Total Logged</span>
                        <span>7 hours</span>
                    </div>
                </div>
                <div style={{width: '50%'}}>
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                        <span>Logged Billable</span>
                        <span>5 hours</span>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                        <span>Logged Non Billable</span>
                        <span>2 hours</span>
                    </div>
                </div>
            </div>
        </div>
        <div>
        <GroupByFilterDropdown />
        </div>
        <div>
            <StatusGroupTables datasource={dataSource} />
            <PriorityGroupTables datasource={dataSource} />
        </div>
    </div>
  )
};

export default WithStartAndEndDates;
