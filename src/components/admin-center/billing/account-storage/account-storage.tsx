import { useAppSelector } from '@/hooks/useAppSelector';
import { Card, Progress, Typography } from 'antd/es';
import { t } from 'i18next';
import { useTranslation } from 'react-i18next';

interface IAccountStorageProps {
  themeMode: string;
}

const AccountStorage = ({ themeMode }: IAccountStorageProps) => {
  const { t } = useTranslation('admin-center/current-bill');;

  const { loadingBillingInfo, billingInfo } = useAppSelector(state => state.adminCenterReducer);
  return (
    <Card
      loading={loadingBillingInfo}
      title={
        <span
          style={{
            color: `${themeMode === 'dark' ? '#ffffffd9' : '#000000d9'}`,
            fontWeight: 500,
            fontSize: '16px',
          }}
        >
          {t('accountStorage')}
        </span>
      }
    >
      <div style={{ display: 'flex' }}>
        <div style={{ padding: '0 8px' }}>
          <Progress
            percent={billingInfo?.usedPercentage ?? 0}
            type="circle"
            format={percent => <span style={{ fontSize: '13px' }}>{percent}% Used</span>}
          />
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '0 8px',
          }}
        >
          <Typography.Text>
            {t('used')} <strong>{billingInfo?.usedStorage ?? 0} GB</strong>
          </Typography.Text>
          <Typography.Text>
            {t('remaining')} <strong>{billingInfo?.remainingStorage ?? 0} GB</strong>
          </Typography.Text>
        </div>
      </div>
    </Card>
  );
};

export default AccountStorage;
