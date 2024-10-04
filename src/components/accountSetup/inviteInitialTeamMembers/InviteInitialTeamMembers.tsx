import React, { useState } from 'react';
import { Alert, Button, Form, Input, List, Typography } from 'antd';
import { PlusOutlined, CloseCircleOutlined, MailOutlined } from '@ant-design/icons';
import './InviteInitialTeamMembers.css';

const { Title, Text } = Typography;

interface InviteInitialTeamMembersProps {
  onContinue: () => void;
  onGoBack: () => void;
}

interface Email {
  id: number;
  value: string;
}
const InviteInitialTeamMembers : React.FC<InviteInitialTeamMembersProps> = ({onContinue,onGoBack}) => {
    const [emails, setEmails] = useState<Email[]>([{ id: Date.now(), value: '' }]);

    const handleInputChange = (id: number, e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setEmails(emails.map(email=> (email.id === id ? { ...email, value } : email)));
    };
  
    const addEmail = () => {
      const lastTask = emails[emails.length - 1]
      if (lastTask.value.trim() !== '') {
        setEmails([...emails, { id: Date.now(), value: '' }]);
      } else {
        <Alert message="Please fill the email before adding a new one" type="error" />
      }
    };
  
    const removeEmail = (id: number) => {
      if (emails.length > 1) {
          setEmails(emails.filter(email => email.id !== id));
        }
    };
  
    const isButtonDisabled = emails.some(email => email.value.trim() === '');
  
    return (
      <Form
        style={{
          minHeight: '300px',
          width: '600px',
          paddingBottom: '1rem',
          marginBottom: '3rem',
          marginTop: '3rem',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Form.Item>
          <Title level={2} style={{ marginBottom: '1rem' }}>
          Invite your team to work with
          <br />
          <Text style={{fontSize: '20px', fontWeight: 400}}>"<mark>Test</mark>"</Text>
          </Title>
        </Form.Item>
        <Form.Item
          layout="vertical"
          rules={[{ required: true }]}
          label={
            <span style={{ color: '#00000073', fontWeight: 500 }}>
              Invite with email <span style={{marginLeft: '0.25rem'}}><MailOutlined /></span>
            </span>
          }
        >
          <List
            dataSource={emails}
            renderItem={email => (
              <List.Item>
                <div style={{ display: 'flex', width: '600px' }}>
                  <Input
                    placeholder="Email address"
                    value={email.value}
                    onChange={e => handleInputChange(email.id, e)}
                  />
                  <Button
                    className="custom-close-button"
                    style={{ marginLeft: '48px' }}
                    type="text"
                    icon={<CloseCircleOutlined style={{ color: '#00000073', fontSize: '20px' }} />}
                    onClick={() => removeEmail(email.id)}
                  />
                </div>
              </List.Item>
            )}
          />
          <Button
            type="dashed"
            icon={<PlusOutlined />}
            onClick={addEmail}
            style={{ marginTop: '16px' }}
          >
            Add another
          </Button>
        <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'space-between' }}>
            <div>
          <Button style={{ padding: '4px 15px 4px 0' }} type="link" onClick={onGoBack}>
            Go back
          </Button>
          <Button style={{ color: '#00000073', fontWeight: 500}} type="text" >
            Skip for now
          </Button>
            </div>
          <Button
            type="primary"
            htmlType="submit"
            disabled={isButtonDisabled}
            onClick={onContinue}
          >
            Continue
          </Button>
        </div>
        </Form.Item>
      </Form>
    );
  };

export default InviteInitialTeamMembers;
