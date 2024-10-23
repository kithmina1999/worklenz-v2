import React from 'react'
import TaskCard from '../taskCard/TaskCard'
import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css'
import './Doing.css'

const Doing: React.FC = () => {
    return (
        <div style={{ paddingTop: '6px' }}>
            <div
                className="doing-wraper"
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
                            color: '#000000d9',
                            fontWeight: 600,
                            marginBottom: '16px',
                            alignItems: 'center',
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        Doing (1)
                    </div>
                </div>

                <PerfectScrollbar
                    style={{
                        maxHeight: 'calc(100vh - 250px)',
                        padding: '2px 16px 2px 2px',
                    }}
                >
                    <TaskCard status="doing" />
                </PerfectScrollbar>
            </div>
        </div>
    )
}

export default Doing
