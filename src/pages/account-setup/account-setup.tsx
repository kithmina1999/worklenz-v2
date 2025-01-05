import React, { useState } from 'react';
import { Alert, Button, Form, Input, List, Space, Steps, Typography } from 'antd';
import { CloseCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { RootState } from '@/app/store';
import { useDocumentTitle } from '@/hooks/useDoumentTItle';
import { getUserSession } from '@/utils/session-helper';
import { validateEmail } from '@/utils/validateEmail';
import logo from '@/assets/images/logo.png';
import logoDark from '@/assets/images/logo-dark-mode.png';

import './account-setup.css';
import { IAccountSetupRequest } from '@/types/project-templates/project-templates.types';
import { profileSettingsApiService } from '@/api/settings/profile/profile-settings.api.service';
import { useNavigate } from 'react-router-dom';
import logger from '@/utils/errorLogger';
import { setCurrentStep, setEmails } from '@/features/account-setup/account-setup.slice';
import { OrganizationStep } from '@/components/account-setup/organization-step';
import { ProjectStep } from '@/components/account-setup/project-step';
import { TasksStep } from '@/components/account-setup/tasks-step';
import MembersStep from '@/components/account-setup/members-step';
import { evt_account_setup_complete } from '@/shared/worklenz-analytics-events';
import { useMixpanelTracking } from '@/hooks/useMixpanelTracking';
import { verifyAuthentication } from '@/features/auth/authSlice';

const { Title } = Typography;

interface Task {
  id: number;
  value: string;
}

interface Email {
  id: number;
  value: string;
}

const AccountSetup: React.FC = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation('account-setup');
  useDocumentTitle(t('setupYourAccount', 'Account Setup'));
  const navigate = useNavigate();
  const { trackMixpanelEvent } = useMixpanelTracking();

  const { currentStep, organizationName, projectName, templateId, tasks, emails } = useSelector(
    (state: RootState) => state.accountSetupReducer
  );
  const userDetails = getUserSession();
  const themeMode = useSelector((state: RootState) => state.themeReducer.mode);

  const isDarkMode = themeMode === 'dark';
  const organizationNamePlaceholder = userDetails?.name ? `e.g. ${userDetails?.name}'s Team` : '';

  const styles = {
    form: {
      width: '600px',
      paddingBottom: '1rem',
      marginTop: '3rem',
      height: '100%',
      overflow: 'hidden',
    },
    label: {
      color: isDarkMode ? '' : '#00000073',
      fontWeight: 500,
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: '1rem',
    },
    drawerFooter: {
      display: 'flex',
      justifyContent: 'right',
      padding: '10px 16px',
    },
    container: {
      height: '100vh',
      width: '100vw',
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      padding: '3rem 0',
      backgroundColor: isDarkMode ? 'black' : '#FAFAFA',
    },
    contentContainer: {
      backgroundColor: isDarkMode ? '#141414' : 'white',
      marginTop: '1.5rem',
      paddingTop: '3rem',
      margin: '1.5rem auto 0',
      width: '100%',
      maxWidth: '66.66667%',
      maxHeight: '100vh',
      display: 'flex',
      flexDirection: 'column' as const,
    },
    space: {
      display: 'flex',
      flexDirection: 'column' as const,
      alignItems: 'center',
      gap: '0',
      flexGrow: 1,
      width: '100%',
    },
    steps: {
      margin: '1rem 0',
      width: '600px',
    },
    stepContent: {
      flexGrow: 1,
      width: '600px',
    },
    actionButtons: {
      flexGrow: 1,
      width: '600px',
      marginBottom: '1rem',
    },
  };

  const completeAccountSetup = async (skip = false) => {
    try {
      const model: IAccountSetupRequest = {
        team_name: organizationName,
        project_name: projectName,
        tasks: tasks.map(task => task.value),
        team_members: skip ? [] : emails.map(email => email.value),
      };
      const res = await profileSettingsApiService.setupAccount(model);
      if (res.done && res.body.id) {
        trackMixpanelEvent(evt_account_setup_complete);
        navigate('/worklenz/home');
      }
    } catch (error) {
      logger.error('completeAccountSetup', error);
    }
  };

  const steps = [
    {
      title: '',
      content: (
        <OrganizationStep
          onEnter={() => dispatch(setCurrentStep(currentStep + 1))}
          styles={styles}
          organizationNamePlaceholder={organizationNamePlaceholder}
        />
      ),
    },
    {
      title: '',
      content: (
        <ProjectStep
          onEnter={() => dispatch(setCurrentStep(currentStep + 1))}
          styles={styles}
          isDarkMode={isDarkMode}
        />
      ),
    },
    {
      title: '',
      content: (
        <TasksStep
          onEnter={() => dispatch(setCurrentStep(currentStep + 1))}
          styles={styles}
          isDarkMode={isDarkMode}
        />
      ),
    },
    {
      title: '',
      content: (
        <MembersStep
          isDarkMode={isDarkMode}
          styles={styles}
        />
      ),
    },
  ];

  const isValid = () => {
    switch (currentStep) {
      case 0:
        return organizationName.trim() === '';
      case 1:
        return projectName.trim() === '';
      case 2:
        return tasks.length !== 0 && tasks[0].value.trim() === '';
      case 3:
        return emails.length === 0 && emails[0].value.trim() !== '';
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (currentStep === 3) {
      completeAccountSetup();
    } else {
      dispatch(setCurrentStep(currentStep + 1));
    }
  };

  return (
    <div style={styles.container}>
      <div>
        <img src={isDarkMode ? logoDark : logo} alt="Logo" width={235} height={50} />
      </div>
      <Title level={5} style={{ textAlign: 'center', margin: '4px 0 24px' }}>
        {t('setupYourAccount')}
      </Title>
      <div style={styles.contentContainer}>
        <Space className={isDarkMode ? 'dark-mode' : ''} direction="vertical" style={styles.space}>
          <Steps
            className={isValid() ? 'step' : 'progress-steps'}
            current={currentStep}
            items={steps}
            style={styles.steps}
          />
          <div className="step-content" style={styles.stepContent}>
            {steps[currentStep].content}
          </div>
          <div style={styles.actionButtons}>
            <div
              style={{
                display: 'flex',
                justifyContent: currentStep !== 0 ? 'space-between' : 'flex-end',
              }}
            >
              {currentStep !== 0 && (
                <div>
                  <Button
                    style={{ padding: 0 }}
                    type="link"
                    className="my-7"
                    onClick={() => dispatch(setCurrentStep(currentStep - 1))}
                  >
                    {t('goBack')}
                  </Button>
                  {currentStep === 3 && (
                    <Button
                      style={{ color: isDarkMode ? '' : '#00000073', fontWeight: 500 }}
                      type="link"
                      className="my-7"
                      onClick={() => completeAccountSetup(true)}
                    >
                      {t('skipForNow')}
                    </Button>
                  )}
                </div>
              )}
              <Button
                type="primary"
                htmlType="submit"
                disabled={isValid()}
                className="mt-7 mb-7"
                onClick={nextStep}
              >
                {t('continue')}
              </Button>
            </div>
          </div>
        </Space>
      </div>
    </div>
  );
};

export default AccountSetup;
