import { Avatar, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { avatarNamesMap } from "../../../shared/constants";

// Function to generate an array of dates and their original Date objects
const generateDates = () => {
  const dates = [];
  const today = new Date();

  for (let i = 0; i < 15; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    dates.push(date); // Store the Date object for further checks
  }

  return dates;
};

const Team: React.FC = () => {
  const hours = 5;
  const [colorPercentage, setColorPercentage] = useState(0);

  const dates = generateDates();

  useEffect(() => {
    setColorPercentage((hours / 8) * 100);
  }, [hours]);

  return (
    <table style={{ border: '1px solid rgba(0, 0, 0, 0.2)', width: '100%' }}>
      <thead>
        <tr style={{ border: '1px solid rgba(0, 0, 0, 0.2)' }}>
          <th style={{ width: '275px', border: '1px solid rgba(0, 0, 0, 0.2)' }}></th>
          {dates.map((date, index) => (
            <th key={index}>
            <span style={{ padding: '8px', display: 'flex'}}>
              {`${date.toLocaleString("en-US", { weekday: "short" })} ${date.toLocaleString("en-US", { month: "short" })} ${date.getDate()}`}
            </span>
          </th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr style={{ height: '88px', }}>
          <td style={{ borderRight: '1px solid rgba(0, 0, 0, 0.2)', display: 'flex', alignItems: 'center', gap: '5px', height: '88px' }}>
            <Avatar style={{ backgroundColor: avatarNamesMap['R'] }}>R</Avatar>
            <Typography.Text style={{ fontSize: '16px' }}>Raveesha Dilanka</Typography.Text>
          </td>
          {dates.map((date, index) => {
            const isWeekend = date.getDay() === 0 || date.getDay() === 6;
            const topColor = isWeekend
              ? 'rgba(79, 76, 76, 0.4)' 
              : 'rgba(6, 126, 252, 0.4)';

            return (
              <td key={index} style={{backgroundColor: isWeekend ? 'rgba(217, 217, 217, 0.4)' : ''}}>
                <span
                  style={{
                    background: hours <= 8
                      ? `linear-gradient(to top, ${topColor} ${colorPercentage}%, rgba(217, 217, 217, 0.25) ${colorPercentage}%)`
                      : 'rgba(255, 0, 0, 0.4)',
                    padding: '23px',
                    borderRadius: '5px',
                    display: 'inline-block',
                    width: '100%',
                    height: '100%',
                    textAlign: 'center',
                  }}
                >
                  {hours}h
                </span>
              </td>
            );
          })}
        </tr>

        <tr style={{ height: '88px', }}>
          <td style={{ borderRight: '1px solid rgba(0, 0, 0, 0.2)', display: 'flex', alignItems: 'center', gap: '5px', height: '88px' }}>
            <Avatar style={{ backgroundColor: avatarNamesMap['R'] }}>R</Avatar>
            <Typography.Text style={{ fontSize: '16px' }}>Raveesha Dilanka</Typography.Text>
          </td>
          {dates.map((date, index) => {
            const isWeekend = date.getDay() === 0 || date.getDay() === 6;
            const topColor = isWeekend
              ? 'rgba(79, 76, 76, 0.4)' 
              : 'rgba(6, 126, 252, 0.4)';

            return (
              <td key={index} style={{backgroundColor: isWeekend ? 'rgba(217, 217, 217, 0.4)' : ''}}>
                <span
                  style={{
                    background: hours <= 8
                      ? `linear-gradient(to top, ${topColor} ${colorPercentage}%, rgba(217, 217, 217, 0.25) ${colorPercentage}%)`
                      : 'rgba(255, 0, 0, 0.4)',
                    padding: '23px',
                    borderRadius: '5px',
                    display: 'inline-block',
                    width: '100%',
                    height: '100%',
                    textAlign: 'center',
                  }}
                >
                  {hours}h
                </span>
              </td>
            );
          })}
        </tr>
      </tbody>
    </table>
  );
};

export default Team;
