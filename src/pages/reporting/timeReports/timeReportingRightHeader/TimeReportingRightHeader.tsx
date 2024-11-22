import React from "react";
import CustomPageHeader from "../../pageHeader/CustomPageHeader";
import { Button, Checkbox, Dropdown, Space, Typography } from "antd";
import TimeWiseFilter from "../../membersReports/TimeWiseFilter";
import { DownOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

interface headerState {
    title: string
}

const TimeReportingRightHeader:React.FC<headerState> = ({title}) => {

    const {t} = useTranslation('timeReport')

  return (
    <CustomPageHeader
        title={title}
        children={
          <Space>
            <Button>
              <Checkbox />
              <Typography.Text>{t('includeArchivedProjects')}</Typography.Text>
            </Button>
            <TimeWiseFilter />
            <Dropdown menu={{ items: [{ key: '1', label: 'Excel' }] }}>
              <Button type="primary" icon={<DownOutlined />} iconPosition="end">
                {t('export')}
              </Button>
            </Dropdown>
          </Space>
        }
    />
  )
};

export default TimeReportingRightHeader;
