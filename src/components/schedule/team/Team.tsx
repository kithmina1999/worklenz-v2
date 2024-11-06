import React, { useEffect, useState } from 'react';
import { Member } from '../../../types/schedule/schedule.types';

interface GanttChartProps {
  members: Member[];
}

const getDaysBetween = (start: Date, end: Date): number => {
  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.round((end.getTime() - start.getTime()) / msPerDay);
};

const timelineStart = new Date();
const timelineEnd = new Date(timelineStart);
timelineEnd.setDate(timelineStart.getDate() + 15);

const totalDays = getDaysBetween(timelineStart, timelineEnd);

const GanttChart: React.FC<GanttChartProps> = ({ members }) => {
  const [weekends, setWeekends] = useState<boolean[]>([]);

  useEffect(() => {
    const weekendsArray = Array.from({ length: totalDays }, (_, i) => {
      const date = new Date(timelineStart);
      date.setDate(timelineStart.getDate() + i);
      return date.getDay() === 0 || date.getDay() === 6;
    });
    setWeekends(weekendsArray);
  }, []);

  return (
    <div style={{ border: '1px solid rgba(0, 0, 0, 0.2)' }}>
      {/* Header Row for Dates */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${totalDays}, 75px)`,
          gap: '2px',
          paddingLeft: '200px',
          height: '60px',
          borderBottom: '1px solid rgba(0, 0, 0, 0.2)',
        }}
      >
        {Array.from({ length: totalDays }, (_, i) => {
          const date = new Date(timelineStart);
          date.setDate(timelineStart.getDate() + i);
          const formattedDate = date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
          });

          return (
            <div
              key={i}
              style={{
                textAlign: 'center',
                fontSize: '14px',
                width: '83px',
                padding: '16px 16px 0px 16px',
                fontWeight: 'bold',
                color: weekends[i] ? 'rgba(0, 0, 0, 0.27)' : '',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {formattedDate}
            </div>
          );
        })}
      </div>

      {/* Render members */}
      {members.map((member) => (
        <div key={member.memberId}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ whiteSpace: 'nowrap', width: '200px' }}>{member.memberName}</span>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: `repeat(${totalDays}, 75px)`,
                height: '72px',
              }}
            >
              {/* Render each day */}
              {Array.from({ length: totalDays }, (_, i) => (
                <div
                  key={i}
                  style={{
                    fontSize: '14px',
                    fontWeight: 'bold',
                    backgroundColor: weekends[i] ? 'rgba(217, 217, 217, 0.4)' : '',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: '10px 0',
                    height: '92px',
                  }}
                >
                  <div
                    style={{
                      width: '62px',
                      backgroundColor: 'rgba(200, 200, 200, 0.35)',
                      justifyContent: 'center',
                      display: 'flex',
                      alignItems: 'center',
                      height: '100%',
                    }}
                  >
                    0h
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Render Projects */}
          {member.projects.map((project) => {
            const projectStart = new Date(project.startDate);
            const projectEnd = new Date(project.endDate);
            const startOffset = getDaysBetween(timelineStart, projectStart);
            const projectDuration = getDaysBetween(projectStart, projectEnd);

            return (
              <div key={project.projectId} style={{ display: 'flex' }}>
                <span style={{ whiteSpace: 'nowrap', width: '200px' }}>{project.projectName}</span>
                {/* Timeline grid for project bar */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${totalDays}, 75px)`,
                    position: 'relative',
                    width: `${86 * totalDays}px`,
                  }}
                >
                  {/* Project Bar */}
                  <div
                    style={{
                      gridColumnStart: startOffset + 1,
                      gridColumnEnd: startOffset + projectDuration + 1,
                      backgroundColor: 'rgba(240, 248, 255, 1)',
                      height: '66px',
                      borderRadius: '5px',
                      marginTop: '20px',
                      border: '1px solid rgba(149, 197, 248, 1)'
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

const Team: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/TeamData.json');
        const data = await response.json();
        setMembers(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return <GanttChart members={members} />;
};

export default Team;
