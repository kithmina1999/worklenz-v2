import React from 'react';
import { Form, Input, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { setOrganizationName } from '@/features/account-setup/account-setup.slice';
import { RootState } from '@/app/store';

const { Title } = Typography;

interface Props {
  onEnter: () => void;
  styles: any;
  organizationNamePlaceholder: string;
}

export const OrganizationStep: React.FC<Props> = ({
  onEnter,
  styles,
  organizationNamePlaceholder,
}) => {
  const { t } = useTranslation('account-setup');
  const dispatch = useDispatch();
  const { organizationName } = useSelector((state: RootState) => state.accountSetupReducer);

  return (
    <Form className="step-form" style={styles.form}>
      <Form.Item>
        <Title level={2} style={{ marginBottom: '1rem' }}>
          {t('organizationStepTitle')}
        </Title>
      </Form.Item>
      <Form.Item
        layout="vertical"
        rules={[{ required: true }]}
        label={<span style={styles.label}>{t('organizationStepLabel')}</span>}
      >
        <Input
          placeholder={organizationNamePlaceholder}
          value={organizationName}
          onChange={e => dispatch(setOrganizationName(e.target.value))}
          onPressEnter={onEnter}
        />
      </Form.Item>
    </Form>
  );
};
