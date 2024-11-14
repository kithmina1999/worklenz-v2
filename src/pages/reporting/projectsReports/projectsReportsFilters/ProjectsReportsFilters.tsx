import { Flex, Input } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import ProjectStatusFilterDropdown from './ProjectStatusFilterDropdown';
import ProjectHealthFilterDropdown from './ProjectHealthFilterDropdown';
import ProjectCategoriesFilterDropdown from './ProjectCategoriesFilterDropdown';
import ProjectManagersFilterDropdown from './ProjectManagersFiterDropdown';
import ProjectTableShowFieldsDropdown from './ProjectTableShowFieldsDropdown';

const ProjectsReportsFilters = () => {
  const { t } = useTranslation('reportingProjectsFilters');

  return (
    <Flex gap={8} align="center" justify="space-between">
      <Flex gap={8} wrap={'wrap'}>
        {/* status dropdown  */}
        <ProjectStatusFilterDropdown />
        {/* health dropdown  */}
        <ProjectHealthFilterDropdown />
        {/* category dropdown  */}
        <ProjectCategoriesFilterDropdown />
        {/* project managers dropdown  */}
        <ProjectManagersFilterDropdown />
      </Flex>

      <Flex gap={12}>
        {/* show fields dropdown  */}
        <ProjectTableShowFieldsDropdown />

        {/* searchbar  */}
        <Input.Search placeholder={t('searchByNamePlaceholder')} />
      </Flex>
    </Flex>
  );
};

export default ProjectsReportsFilters;
