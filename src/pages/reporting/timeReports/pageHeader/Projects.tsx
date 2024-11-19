import { CaretDownFilled } from "@ant-design/icons";
import { Button, Divider, Dropdown, Input, MenuProps } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { Checkbox } from "antd/lib";
import React, { useState } from "react";

const Projects:React.FC = () => {
    const [checkedList, setCheckedList] = useState<string[]>([]);
    const [searchText, setSearchText] = useState("");
    const [selectAll, setSelectAll] = useState(false);
  
    const allItems = [
      { key: '1', label: 'Project 1' },
      { key: '2', label: 'Project 2' },
      { key: '3', label: 'Project 3' },
    ];
  
    // Filter items based on search text
    const filteredItems = allItems.filter(item =>
      item.label.toLowerCase().includes(searchText.toLowerCase())
    );
  
    // Handle checkbox change for individual items
    const handleCheckboxChange = (key: string, checked: boolean) => {
      setCheckedList(prev => 
        checked ? [...prev, key] : prev.filter(item => item !== key)
      );
    };
  
    // Handle "Select All" checkbox change
    const handleSelectAllChange = (e: CheckboxChangeEvent) => {
      const isChecked = e.target.checked;
      setSelectAll(isChecked);
      setCheckedList(isChecked ? allItems.map(item => item.key) : []);
    };
  
    // Dropdown items for the menu
    const menuItems: MenuProps['items'] = [
        {
          key: 'search',
          label: (
            <Input
              placeholder="Search by project name"
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
            />
          ),
        },
      {
        key: 'selectAll',
        label: (
          <div>
              <Checkbox onChange={handleSelectAllChange} checked={selectAll}>
                Select All
              </Checkbox>
              <Divider style={{margin: '4px 0'}}/>
          </div>
        ),
      },
      ...filteredItems.map(item => ({
        key: item.key,
        label: (
          <Checkbox
            checked={checkedList.includes(item.key)}
            onChange={(e) => handleCheckboxChange(item.key, e.target.checked)}
          >
            {item.label}
          </Checkbox>
        ),
      })),
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
            Projects <CaretDownFilled />
          </Button>
        </Dropdown>
      </div>
    );
};

export default Projects;
