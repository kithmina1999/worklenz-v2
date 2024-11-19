import { Button, Col, DatePicker, Flex, Input, Row } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import { toggleModal } from './scheduleSlice';

const ProjectTimelineModal = () => {
  const dispatch = useDispatch();

  const handleSave = () => {
    dispatch(toggleModal());
  };

  return (
    <Flex vertical gap={10} style={{width: '480px'}}>

      <Row>
        <Col span={12} style={{display: 'flex', flexDirection: 'column', paddingRight: '20px'}}>
            <span>Start Date</span>
            <DatePicker />
        </Col>
        <Col span={12} style={{display: 'flex', flexDirection: 'column', paddingLeft: '20px'}}>
        <span>End Date</span>
            <DatePicker />
        </Col>
      </Row>
    <Row>
      <Col span={12} style={{paddingRight: '20px'}}>
            <span >Start Date</span>
            <Input max={24} defaultValue={8} type='number' suffix='hours'/>
        </Col>

        <Col span={12} style={{paddingLeft: '20px'}}>
        <span>End Date</span>
        <Input max={24} defaultValue={8} type='number' suffix='hours'/>
        </Col>
    </Row>
    <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Button type="link">Delete</Button>
          <div style={{ display: 'flex', gap: '5px' }}>
            <Button onClick={() => dispatch(toggleModal())}>Cancel</Button>
            <Button type="primary" onClick={handleSave}>
              Save
            </Button>
          </div>
        </div>
    </Flex>
  );
};

export default ProjectTimelineModal;
