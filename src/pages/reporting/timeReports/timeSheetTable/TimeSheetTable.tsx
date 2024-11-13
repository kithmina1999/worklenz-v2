import React, { useEffect, useState } from "react";
import { MemberLoggedTimeType, ProjectType } from "../../../../types/timeSheet/project.types";
import { ClockCircleOutlined } from "@ant-design/icons";
import { Progress } from "antd";

const TimeSheetTable: React.FC = () => {
    const [projects, setProjects] = useState<ProjectType[]>([]);
    const [members, setMembers] = useState<MemberLoggedTimeType[]>([]);

    useEffect(() => {
        const fetchProjectsData = async () => {
            try {
                const response = await fetch('/TimeSheet.json');
                const data = await response.json();
                setProjects(data);
            } catch (error) {
                console.error('Error fetching project data:', error);
            }
        };

        const fetchMembersData = async () => {
            try {
                const response = await fetch('/TimeSheetMember.json');
                const data = await response.json();
                setMembers(data);
            } catch (error) {
                console.error('Error fetching member data:', error);
            }
        };

        fetchProjectsData();
        fetchMembersData();
    }, []);

    return (
        <div style={{ width: '100%' }}>
            {/* Header Row for Member Names */}
            <div style={{ display: 'flex', height: '77.6px' }}>
                <div style={{ width: '200px', borderRight: '1px solid #f5f5f5', borderBottom: '1px solid #f5f5f5' }}></div>
                {members.map((member) => (
                    <div key={member.memberId} style={{ width: '100px', padding: '16px 6px', borderRight: '1px solid #f5f5f5', borderTop: '1px solid #f5f5f5', borderBottom: '1px solid #f5f5f5', fontWeight: '500' }}>
                        {member.memberName}
                    </div>
                ))}
                <div style={{ width: '120px', borderBottom: '1px solid #f5f5f5', position: 'sticky', backgroundColor: '#f8f7f9', fontWeight: '500', padding: '16px 12px', alignItems: 'center', justifyContent: 'center', display: 'flex' }}>Total</div>
            </div>

            {/* Rows for Each Project */}
            {projects.map((project) => (
                <div key={project.projectId} style={{ display: 'flex', height: '77.6px' }}>
                    <div style={{ width: '200px', padding: '16px 8px 16px 12px', position: "sticky", borderRight: '1px solid #f5f5f5', borderBottom: '1px solid #f5f5f5', borderLeft: '1px solid #f5f5f5' }}>
                        <span><ClockCircleOutlined style={{ color: 'rgb(203, 200, 161)' }} /> {project.projectName}</span>
                        <Progress percent={30} size='small' />
                    </div>

                    {/* Render Logged Time for Each Member */}
                    {members.map((member) => {
                        // Find the logged time for the current project and member
                        const memberLoggedTime = project.members.find((projMember) => projMember.memberId === member.memberId)?.memberLoggedTime;

                        return (
                            <div key={member.memberId} style={{ width: '100px', padding: '16px 6px', borderRight: '1px solid #f5f5f5', borderBottom: '1px solid #f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {memberLoggedTime || '-'}
                            </div>
                        );
                    })}
                    <div style={{ width: '120px', borderBottom: '1px solid #f5f5f5', position: 'sticky', backgroundColor: '#f8f7f9', fontWeight: '500', padding: '16px 12px', alignItems: 'center', justifyContent: 'center', display: 'flex' }}></div>
                </div>
            ))}

            {/* Footer row */}
            <div style={{ display: 'flex', height: '54.8px',}}>
                <div style={{width: '200px',padding: '16px 8px 16px 12px', backgroundColor: '#f8f7f9'}}>Total</div>
                {members.map((member) => (
                    <div key={member.memberId} style={{ width: '100px', padding: '16px 6px', borderRight: '1px solid #f5f5f5', borderTop: '1px solid #f5f5f5', borderBottom: '1px solid #f5f5f5', fontWeight: '500', backgroundColor: '#f8f7f9' }}>
                    </div>
                ))}
                <div style={{width: '120px', padding: '16px 6px', borderRight: '1px solid #f5f5f5', borderTop: '1px solid #f5f5f5', borderLeft: '1px solid #f5f5f5', fontWeight: '500', backgroundColor: '#f8f7f9' }}></div>
            </div>
        </div>
    );
};

export default TimeSheetTable;
