import React, { useEffect, useRef } from 'react';
import { Form, Input, Button, List, Alert, message, InputRef } from 'antd';
import { CloseCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { Typography } from 'antd';
import { setEmails, setTasks } from '@/features/account-setup/account-setup.slice';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { validateEmail } from '@/utils/validateEmail';
import { Rule } from 'antd/es/form';

const { Title } = Typography;

interface Email {
  id: number;
  value: string;
}

interface MembersStepProps {
  isDarkMode: boolean;
  styles: any;
}

const MembersStep: React.FC<MembersStepProps> = ({ isDarkMode, styles }) => {
  const { t } = useTranslation('account-setup');
  const { emails } = useSelector((state: RootState) => state.accountSetupReducer);
  const inputRefs = useRef<(InputRef | null)[]>([]);
  const dispatch = useDispatch();

  const addEmail = () => {
    const newId = emails.length > 0 ? Math.max(...emails.map(t => t.id)) + 1 : 0;
    dispatch(setEmails([...emails, { id: newId, value: '' }]));
    setTimeout(() => {
      inputRefs.current[newId]?.focus();
    }, 0);
  };

  const removeEmail = (id: number) => {
    if (emails.length > 1) {
      dispatch(setEmails(emails.filter(email => email.id !== id)));
    }
  };

  const updateEmail = (id: number, value: string) => {
    dispatch(setEmails(emails.map(email => (email.id === id ? { ...email, value } : email))));
  };

  const handleKeyPress = (e: React.KeyboardEvent, isLast: boolean) => {
    e.preventDefault();
    if (isLast) {
      addEmail();
    }
  };

  useEffect(() => {
    setTimeout(() => inputRefs.current[0]?.focus(), 200);
  }, []);

  const formRules = {
    email: [
      {
        type: 'email',
        message: t('invalidEmail'),
      },
    ],
  };

  return (
    <Form className="invite-members-form" style={{ ...styles.form, minHeight: '300px' }}>
      <Form.Item>
        <Title level={2}>{t('step3Title')}</Title>
      </Form.Item>
      <List
        dataSource={emails}
        renderItem={(email, index) => (
          <List.Item key={email.id} rules={formRules.email as Rule[]}>
            <div style={{ display: 'flex', width: '600px' }}>
              <Form.Item
                name={`email-${email.id}`}
                rules={formRules.email as Rule[]}
                style={{ flex: 1 }}
              >
                <Input
                  placeholder="Your Email"
                  value={email.value}
                  onChange={e => updateEmail(email.id, e.target.value)}
                  onPressEnter={e => handleKeyPress(e, email.id === emails.length - 1)}
                  ref={el => (inputRefs.current[index] = el)}
                />
              </Form.Item>
              <Button
                className="custom-close-button"
                style={{ marginLeft: '48px' }}
                type="text"
                icon={<CloseCircleOutlined />}
                disabled={emails.length === 1}
                onClick={() => removeEmail(email.id)}
              />
            </div>
          </List.Item>
        )}
      />
      <Button
        type="dashed"
        icon={<PlusOutlined />}
        onClick={() => addEmail()}
        style={{ marginTop: '16px' }}
      >
        {t('addAnother')}
      </Button>
    </Form>
  );
};

export default MembersStep;
