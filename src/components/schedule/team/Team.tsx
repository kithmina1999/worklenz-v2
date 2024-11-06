import { Avatar, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { avatarNamesMap } from '../../../shared/constants';
import { Member } from '../../../types/schedule/schedule.types';

const fetchData = async () => {
  const response = await fetch('/TeamData.json');
  const data = await response.json();
  return data;
};

const generateDates = () => {
  const dates = [];
  const today = new Date();

  for (let i = 0; i < 15; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    dates.push(date);
  }

  return dates;
};

const Team: React.FC = () => {
  const [colorPercentage, setColorPercentage] = useState(0);
  const [members, setMembers] = useState<Member[]>([]);

  const dates = generateDates();

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchData();
        setMembers(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    loadData();
  }, []);

  const getDateStyle = (date: Date) => {
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    const topColor = isWeekend
      ? 'rgba(79, 76, 76, 0.4)'
      : 'rgba(6, 126, 252, 0.4)';

    return { isWeekend, topColor };
  };

  const calculateAssignedHours = (member: Member, date: Date) => {
    let totalHours = 0;

    member.projects.forEach((project) => {
      const projectStartDate = new Date(project.startDate);
      const projectEndDate = new Date(project.endDate);

      if (date >= projectStartDate && date <= projectEndDate) {
        totalHours += project.perDayHours;
      }
    });

    return totalHours;
  };

  return (
    <table style={{ border: '1px solid rgba(0, 0, 0, 0.2)', width: '100%' }}>
      <thead>
        <tr style={{ border: '1px solid rgba(0, 0, 0, 0.2)' }}>
          <th
            style={{ width: '275px', border: '1px solid rgba(0, 0, 0, 0.2)' }}
          ></th>
          {dates.map((date, index) => {
            const { isWeekend } = getDateStyle(date);
            return (
              <th key={index}>
                <span
                  style={{
                    padding: '8px',
                    display: 'flex',
                    color: isWeekend ? 'rgba(0, 0, 0, 0.27)' : '',
                  }}
                >
                  {`${date.toLocaleString('en-US', { weekday: 'short' })} ${date.toLocaleString('en-US', { month: 'short' })} ${date.getDate()}`}
                </span>
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {members.map((member) => (
          <>
            <tr style={{ height: '88px' }} key={member.memberId}>
              <td
                style={{
                  borderRight: '1px solid rgba(0, 0, 0, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  height: '88px',
                }}
              >
                <Avatar
                  style={{
                    backgroundColor:
                      avatarNamesMap[member.memberName.charAt(0)],
                  }}
                >
                  {member.memberName.charAt(0)}
                </Avatar>
                <Typography.Text style={{ fontSize: '16px' }}>
                  {member.memberName}
                </Typography.Text>
              </td>
              {dates.map((date, index) => {
                const assignedHours = calculateAssignedHours(member, date);
                const { isWeekend, topColor } = getDateStyle(date);

                return (
                  <td
                    key={index}
                    style={{
                      backgroundColor: isWeekend
                        ? 'rgba(217, 217, 217, 0.4)'
                        : '',
                    }}
                  >
                    <span
                      style={{
                        background:
                          assignedHours <= 8
                            ? `linear-gradient(to top, ${topColor} ${(assignedHours / 8) * 100}%, rgba(200, 200, 200, 0.35) ${(assignedHours / 8) * 100}%)`
                            : 'rgba(255, 0, 0, 0.4)',
                        padding: '23px',
                        borderRadius: '5px',
                        display: 'inline-block',
                        width: '100%',
                        height: '100%',
                        textAlign: 'center',
                      }}
                    >
                      {assignedHours}h
                    </span>
                  </td>
                );
              })}
            </tr>
            {member.projects.map((project) => {
              const projectStartDate = new Date(project.startDate);
              const projectEndDate = new Date(project.endDate);

              const startIndex = dates.findIndex(
                (date) =>
                  date.toDateString() === projectStartDate.toDateString()
              );
              const endIndex = dates.findIndex(
                (date) => date.toDateString() === projectEndDate.toDateString()
              );

              return (
                <tr key={project.projectId} style={{ marginBottom: '8px' }}>
                  <td style={{ height: '66px', borderRight: '1px solid rgba(0, 0, 0, 0.2)', }}>{project.projectName}</td>

                  {dates.slice(0, startIndex).map((date, index) => (
                    <td key={index}>{/* Empty cell */}</td>
                  ))}

                  <td colSpan={endIndex - startIndex + 1}>
                    <div
                      style={{
                        backgroundColor: 'rgba(240, 248, 255, 1)',
                        border: '1px solid rgba(149, 197, 248, 1)',
                        borderRadius: '5px',
                        height: '66px',
                        paddingLeft: '12px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                      }}
                    >
                      <span style={{ fontWeight: 'bold' }}>Total {project.totalHours}h</span>
                      <span style={{ fontSize: '12px' }}>Per Day {project.perDayHours}h</span>
                    </div>
                  </td>
                </tr>
              );
            })}
          </>
        ))}
      </tbody>
    </table>
  );
};

export default Team;
