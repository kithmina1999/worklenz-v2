import React from 'react';
import TaskCard from '../taskCard/TaskCard';
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './Done.css';

const Done: React.FC = () => {
    return (
        <div style={{ paddingTop: '6px' }}>
            <div
                className="done-wraper"
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    flexGrow: 1,
                    flexBasis: 0,
                    maxWidth: '325px',
                    width: '325px',
                    marginRight: '8px',
                    padding: '8px',
                    borderRadius: '4px',
                    maxHeight: 'calc(100vh - 220px)',
                }}
            >
                <div
                    style={{
                        touchAction: 'none',
                        userSelect: 'none',
                        cursor: 'grab',
                        fontSize: '14px',
                        paddingTop: '0',
                        margin: '0.25rem',
                    }}
                >
                    <div
                        style={{
                            fontWeight: 600,
                            marginBottom: '16px',
                            alignItems: 'center',
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        Done (1)
                    </div>
                </div>

                {/* Wrap the scrollable area with PerfectScrollbar */}
                <PerfectScrollbar style={{ maxHeight: 'calc(100vh - 250px)', padding: '2px 16px 2px 2px' }}>
                    <TaskCard />
                    <TaskCard />
                    <TaskCard />
                    <TaskCard />
                    <TaskCard />
                    <TaskCard />
                    <TaskCard />
                    <TaskCard />
                    <TaskCard />
                    <TaskCard />
                </PerfectScrollbar>
            </div>
        </div>
    );
};

export default Done;
