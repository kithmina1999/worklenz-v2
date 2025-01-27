import { setSearch } from '@/features/tasks/tasks.slice';
import { useAppSelector } from '@/hooks/useAppSelector';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Card, Dropdown, Flex, Input, InputRef, Space } from 'antd';
import React, { useRef, useState, useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import debounce from 'lodash/debounce';

const SearchDropdown = () => {
  const { t } = useTranslation('task-list-filters');
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const searchInputRef = useRef<InputRef>(null);

  // Debounced search dispatch
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      dispatch(setSearch(value));
    }, 300),
    [dispatch]
  );

  const handleSearch = useCallback(() => {
    debouncedSearch(searchValue);
  }, [searchValue, debouncedSearch]);

  const handleReset = useCallback(() => {
    setSearchValue('');
    dispatch(setSearch(''));
  }, [dispatch]);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  }, []);

  // Memoized dropdown content
  const searchDropdownContent = useMemo(() => (
    <Card className="custom-card" styles={{ body: { padding: 8, width: 360 } }}>
      <Flex vertical gap={8}>
        <Input 
          ref={searchInputRef} 
          value={searchValue} 
          onChange={handleSearchChange}
          placeholder={t('searchInputPlaceholder')} 
        />
        <Space>
          <Button type="primary" onClick={handleSearch}>
            {t('searchButton')}
          </Button>
          <Button onClick={handleReset}>{t('resetButton')}</Button>
        </Space>
      </Flex>
    </Card>
  ), [searchValue, handleSearch, handleReset, handleSearchChange, t]);

  const handleSearchDropdownOpen = useCallback((open: boolean) => {
    setIsOpen(open);
    if (open) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 0);
    }
  }, []);

  return (
    <Dropdown
      open={isOpen}
      overlayClassName="custom-dropdown"
      trigger={['click']}
      dropdownRender={() => searchDropdownContent}
      onOpenChange={handleSearchDropdownOpen}
    >
      <Button icon={<SearchOutlined />} />
    </Dropdown>
  );
};

export default React.memo(SearchDropdown);
