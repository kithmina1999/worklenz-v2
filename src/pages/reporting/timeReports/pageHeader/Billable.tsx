import { CaretDownFilled } from "@ant-design/icons";
import { Button, Checkbox, Dropdown, MenuProps } from "antd";
import React from "react";

const Billable:React.FC = () => {
  
    const allItems = [
      { key: '1', label: 'Billable' },
      { key: '2', label: 'Non Billable' },
    ];
  
    // Dropdown items for the menu
    const menuItems: MenuProps['items'] = [
        {
          key: 'search',
          label: (
            <Checkbox>Billable</Checkbox>
          ),
        },
      {
        key: 'selectAll',
        label: (
            <Checkbox>Non Billable</Checkbox>
        ),
      },
    ];
  
    return (
      <div>
        <Dropdown
          menu={{ items: menuItems }}
          placement="bottomLeft"
          trigger={['click']}
          overlayStyle={{maxHeight: '330px', overflowY: 'auto'}}
        >
          <Button >
            Billable <CaretDownFilled />
          </Button>
        </Dropdown>
      </div>
    );
};

export default Billable;
