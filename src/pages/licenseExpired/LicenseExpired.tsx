import { Button, Result } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const LicenseExpired = () => {
    const navigate = useNavigate()
  return (
    <div style={{ marginBlock: 65, minHeight: '90vh' }}>
        <Result
    status="warning"
    title="Your Worklenz trial has expired!"
    subTitle="Please upgrade now."
    extra={
      <Button type="primary" key="console" onClick={() => navigate('/worklenz/admin-center/billing')}>
        Upgrade Now
      </Button>
    }
  />
    </div>
  )
};

export default LicenseExpired;
