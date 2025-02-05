import { Button, Card, Col, Modal, Progress, Row, Tooltip, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import './current-bill.css';
import { InfoCircleTwoTone } from '@ant-design/icons';
import ChargesTable from './billing-tables/charges-table';
import InvoicesTable from './billing-tables/invoices-table';
import UpgradePlansLKR from './drawers/upgrade-plans-lkr/upgrade-plans-lkr';
import { RootState } from '../../../app/store';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { useMediaQuery } from 'react-responsive';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '../../../hooks/useAppDispatch';
import {
  toggleDrawer,
  toggleUpgradeModal,
} from '../../../features/adminCenter/billing/billingSlice';
import RedeemCodeDrawer from './drawers/redeem-code-drawer/redeem-code-drawer';
import CurrentPlanDetails from './current-plan-details/current-plan-details';
import AccountStorage from './account-storage/account-storage';
import { IBillingAccountInfo } from '@/types/admin-center/admin-center.types';
import { fetchBillingInfo } from '@/features/admin-center/admin-center.slice';
import UpgradePlans from './drawers/upgrade-plans/upgrade-plans';

const CurrentBill: React.FC = () => {
  const themeMode = useAppSelector((state: RootState) => state.themeReducer.mode);
  const dispatch = useAppDispatch();
  const { t } = useTranslation('admin-center/current-bill');

  const { loadingBillingInfo, billingInfo, isRedeemCodeDrawerOpen, isUpgradeModalOpen } = useAppSelector(state => state.adminCenterReducer);

  const isTablet = useMediaQuery({ query: '(min-width: 1025px)' });
  const browserTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  useEffect(() => {
    dispatch(fetchBillingInfo());
  }, [dispatch]);

  return (
    <div style={{ width: '100%' }} className="current-billing">
      {isTablet ? (
        <Row>
          <Col span={16} style={{ paddingRight: '10px' }}>
            <CurrentPlanDetails />
          </Col>

          <Col span={8} style={{ paddingLeft: '10px' }}>
            <AccountStorage themeMode={themeMode} />
          </Col>
        </Row>
      ) : (
        <div>
          <Col span={24}>
            <Card
              title={
                <span
                  style={{
                    color: `${themeMode === 'dark' ? '#ffffffd9' : '#000000d9'}`,
                    fontWeight: 500,
                    fontSize: '16px',
                  }}
                >
                  {t('currentPlanDetails')}
                </span>
              }
              extra={
                <div
                  style={{
                    marginTop: '8px',
                    marginRight: '8px',
                  }}
                >
                  <Button type="primary" onClick={() => dispatch(toggleUpgradeModal())}>
                    {t('upgradePlan')}
                  </Button>
                  <Modal
                    open={isUpgradeModalOpen}
                    onCancel={() => dispatch(toggleUpgradeModal())}
                    width={1000}
                    centered
                    okButtonProps={{ hidden: true }}
                    cancelButtonProps={{ hidden: true }}
                  >
                    {browserTimeZone === 'Asia/Colombo' ? <UpgradePlansLKR /> : <UpgradePlans />}
                  </Modal>
                </div>
              }
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '50%',
                  padding: '0 12px',
                }}
              >
                <div style={{ marginBottom: '14px' }}>
                  <Typography.Text style={{ fontWeight: 700 }}>
                    {t('cardBodyText01')}
                  </Typography.Text>
                  <Typography.Text>{t('cardBodyText02')}</Typography.Text>
                </div>
                <Button
                  type="link"
                  style={{
                    margin: 0,
                    padding: 0,
                    width: '90px',
                  }}
                  onClick={() => {
                    dispatch(toggleDrawer());
                  }}
                >
                  {t('redeemCode')}
                </Button>
                <RedeemCodeDrawer />
              </div>
            </Card>
          </Col>

          <Col span={24} style={{ marginTop: '1.5rem' }}>
            <AccountStorage themeMode={themeMode} />
          </Col>
        </div>
      )}

      <div style={{ marginTop: '1.5rem' }}>
        <Card
          title={
            <span
              style={{
                color: `${themeMode === 'dark' ? '#ffffffd9' : '#000000d9'}`,
                fontWeight: 500,
                fontSize: '16px',
                display: 'flex',
                gap: '4px',
              }}
            >
              <span>{t('charges')}</span>
              <Tooltip title={t('tooltip')}>
                <InfoCircleTwoTone />
              </Tooltip>
            </span>
          }
          style={{ marginTop: '16px' }}
        >
          <ChargesTable />
        </Card>
      </div>

      <div style={{ marginTop: '1.5rem' }}>
        <Card
          title={
            <span
              style={{
                color: `${themeMode === 'dark' ? '#ffffffd9' : '#000000d9'}`,
                fontWeight: 500,
                fontSize: '16px',
                display: 'flex',
                gap: '4px',
              }}
            >
              {t('invoices')}
            </span>
          }
          style={{ marginTop: '16px' }}
        >
          <InvoicesTable />
        </Card>
      </div>
    </div>
  );
};

export default CurrentBill;
