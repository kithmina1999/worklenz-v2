import React from "react";
import Team from "./Team";
import Categories from "./Categories";
import Projects from "./Projects";
import Billable from "./Billable";

const TimeReportPageHeader:React.FC = () => {
  return (
    <div style={{display: 'flex', gap: '8px'}}>
      <Team />
      <Categories />
      <Projects />
      <Billable />
    </div>
  )
};

export default TimeReportPageHeader;
