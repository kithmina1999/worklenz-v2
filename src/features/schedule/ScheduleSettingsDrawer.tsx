import { Button, Checkbox, Drawer, Form, Input } from "antd";
import React, { ReactHTMLElement, useState } from "react";
import { useAppSelector } from "../../hooks/useAppSelector";
import { toggleSettingsDrawer, updateSettings } from "./scheduleSlice";
import { useDispatch } from "react-redux";

const ScheduleSettingsDrawer: React.FC = () => {
  const isDrawerOpen = useAppSelector((state) => state.scheduleReducer.isSettingsDrawerOpen);
  const dispatch = useDispatch();

  const options = [
    { label: 'Monday', value: 'Monday' },
    { label: 'Tuesday', value: 'Tuesday' },
    { label: 'Wednesday', value: 'Wednesday' },
    { label: 'Thursday', value: 'Thursday' },
    { label: 'Friday', value: 'Friday' },
    { label: 'Saturday', value: 'Saturday' },
    { label: 'Sunday', value: 'Sunday' },
  ];

  const [workingDays, setWorkingDays] = useState(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']);
  const [workingHours, setWorkingHours] = useState(8);

  const onChangeWorkingDays = (checkedValues: string[]) => {
    setWorkingDays(checkedValues);
  };

  const onChangeWorkingHours = (e:React.ChangeEvent<HTMLInputElement>) => {
    setWorkingHours(Number(e.target.value));
  };

  const onSave = () => {
    dispatch(updateSettings({ workingDays, workingHours }));
    dispatch(toggleSettingsDrawer());
  };

  return (
    <div>
      <Drawer
        title="Settings"
        open={isDrawerOpen}
        onClose={() => {
          dispatch(toggleSettingsDrawer());
        }}
      >
        <Form layout="vertical">
          <Form.Item label="Working days">
            <Checkbox.Group
              options={options}
              defaultValue={workingDays}
              onChange={onChangeWorkingDays}
            />
          </Form.Item>

          <Form.Item label="Working hours">
            <Input
              max={24}
              defaultValue={workingHours}
              type="number"
              suffix={<span style={{ color: 'rgba(0, 0, 0, 0.46)' }}>hours</span>}
              onChange={onChangeWorkingHours}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" style={{ width: '100%' }} onClick={onSave}>
              Save
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
};

export default ScheduleSettingsDrawer;
