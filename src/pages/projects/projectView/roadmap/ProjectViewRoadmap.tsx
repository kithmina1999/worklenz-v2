import React, { useEffect, useState } from 'react';
import { Gantt, Task, ViewMode } from 'gantt-task-react';
import 'gantt-task-react/dist/index.css';
import './projectViewRoadmap.css';
import { CaretDownOutlined } from '@ant-design/icons';

const ProjectViewRoadmap = () => {
  const initialTasks: Task[] = [
    {
      id: 'project-ceydigital',
      name: 'Ceydigital',
      start: new Date('2023-07-01'),
      end: new Date('2024-12-31'),
      type: 'project',
      progress: 40,
      hideChildren: false,
    },
    {
      id: 'task-1',
      name: 'UI Design',
      start: new Date('2023-07-10'),
      end: new Date('2023-08-15'),
      type: 'task',
      progress: 80,
      project: 'project-ceydigital',
    },
    {
      id: 'task-2',
      name: 'Backend Development',
      start: new Date('2023-08-20'),
      end: new Date('2023-12-31'),
      type: 'task',
      progress: 50,
      project: 'project-ceydigital',
    },
    {
      id: 'task-3',
      name: 'Frontend Development',
      start: new Date('2023-09-01'),
      end: new Date('2024-01-30'),
      type: 'task',
      progress: 30,
      project: 'project-ceydigital',
    },
    {
      id: 'task-4',
      name: 'Testing & QA',
      start: new Date('2024-02-01'),
      end: new Date('2024-04-15'),
      type: 'task',
      progress: 0,
      project: 'project-ceydigital',
    },
    {
      id: 'task-5',
      name: 'Deployment',
      start: new Date('2024-05-01'),
      end: new Date('2024-05-15'),
      type: 'task',
      progress: 0,
      project: 'project-ceydigital',
    },
  ];

  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const handleExpanderClick = (task: Task) => {
    const updatedTasks = tasks.map((t) =>
      t.id === task.id ? { ...t, hideChildren: !t.hideChildren } : t
    );
    setTasks(updatedTasks);
  };

  useEffect(() => {
    const expandDiv = document.querySelector('._2QjE6');
    if (expandDiv) {
      expandDiv.innerHTML = `<CaretDownOutlined />`;
      console.log('chnaged');
    }
  }, []);

  return (
    <div style={{ maxWidth: '100%', overflowX: 'auto' }}>
      <Gantt
        tasks={tasks}
        viewMode={ViewMode.Day}
        onExpanderClick={handleExpanderClick}
      />
    </div>
  );
};

export default ProjectViewRoadmap;
