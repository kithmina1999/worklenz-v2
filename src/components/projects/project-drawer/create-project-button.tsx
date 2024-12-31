import { Button, Drawer, Dropdown } from 'antd';
import { startTransition, useEffect, useState } from 'react';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { toggleDrawer } from '@/features/projects/projectsSlice';
import { DownOutlined, EditOutlined, ImportOutlined } from '@ant-design/icons';
import TemplateDrawer from '@components/account-setup/template-drawer/template-drawer';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { setProject, setProjectId } from '@/features/project/project.slice';
import { IProjectViewModel } from '@/types/project/projectViewModel.types';

interface CreateProjectButtonProps {
  className?: string;
}

const CreateProjectButton: React.FC<CreateProjectButtonProps> = ({ className }) => {
  const dispatch = useAppDispatch();
  const [isTemplateDrawerOpen, setIsTemplateDrawerOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState<string>('');
  const location = useLocation();
  const { t } = useTranslation('create-first-project-form');

  useEffect(() => {
    const pathKey = location.pathname.split('/').pop();
    setCurrentPath(pathKey ?? 'home');
  }, [location]);

  const handleTemplateDrawerOpen = () => {
    startTransition(() => {
      setIsTemplateDrawerOpen(true);
    });
  };

  const handleTemplateDrawerClose = () => {
    setIsTemplateDrawerOpen(false);
  };

  const handleTemplateSelect = (templateId: string) => {
    // TODO: Implement template selection logic
    console.log('Selected template:', templateId);
    handleTemplateDrawerClose();
  };

  const dropdownItems = [
    {
      key: 'template',
      label: (
        <div className="w-full m-0 p-0" onClick={handleTemplateDrawerOpen}>
          <ImportOutlined className="mr-2" />
          {currentPath === 'home' ? 'Import from template' : 'Create from template'}
        </div>
      ),
    },
  ];

  const handleCreateProject = () => {
    dispatch(setProjectId(null));
    dispatch(setProject({} as IProjectViewModel));
    dispatch(toggleDrawer());
  };


  return (
    <div className={className}>
      <Dropdown.Button
        type="primary"
        icon={<DownOutlined />}
        onClick={handleCreateProject}
        menu={{ items: dropdownItems }}
      >
        <EditOutlined /> Create Project
      </Dropdown.Button>

      <Drawer
        title={t('templateDrawerTitle')}
        width={1000}
        onClose={handleTemplateDrawerClose}
        open={isTemplateDrawerOpen}
        footer={
          <div className="flex justify-end px-4 py-2.5">
            <Button className="mr-2" onClick={handleTemplateDrawerClose}>
              {t('cancel')}
            </Button>
            <Button type="primary">{t('create')}</Button>
          </div>
        }
      >
        <TemplateDrawer 
          showBothTabs={false} 
          templateSelected={handleTemplateSelect}
        />
      </Drawer>
    </div>
  );
};

export default CreateProjectButton;
