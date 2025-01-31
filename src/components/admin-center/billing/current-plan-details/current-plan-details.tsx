import React, { useEffect, useState } from 'react';
import { adminCenterApiService } from '@/api/admin-center/admin-center.api.service';
import {
  evt_billing_pause_plan,
  evt_billing_resume_plan,
} from '@/shared/worklenz-analytics-events';
import { useMixpanelTracking } from '@/hooks/useMixpanelTracking';
import logger from '@/utils/errorLogger';
import { Button, Card, Modal, Skeleton, Space, Tooltip, Typography } from 'antd/es';
import { IBillingAccountInfo } from '@/types/admin-center/admin-center.types';
import RedeemCodeDrawer from '@/features/adminCenter/billing/RedeemCodeDrawer';
import { toggleDrawer, toggleUpgradeModal } from '@/features/adminCenter/billing/billingSlice';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useTranslation } from 'react-i18next';
import UpgradePlans from '../upgrade-plans';

const CurrentPlanDetails = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation('current-bill');

  const [billingInfo, setBillingInfo] = useState<IBillingAccountInfo | null>(null);
  const [loadingInfo, setLoadingInfo] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showRedeem, setShowRedeem] = useState(false);
  const [pausingPlan, setPausingPlan] = useState(false);
  const [cancellingPlan, setCancellingPlan] = useState(false);

  const { trackMixpanelEvent } = useMixpanelTracking();
  const themeMode = useAppSelector(state => state.themeReducer.mode);
  const isModalOpen = useAppSelector(state => state.billingReducer.isModalOpen);

  const subscriptionStatus = {
    ACTIVE: 'active',
    PASTDUE: 'past_due',
    PAUSED: 'paused',
    DELETED: 'deleted',
    TRIALING: 'trialing',
  };

  useEffect(() => {
    getBillingAccountInfo();
  }, []);

  const getBillingAccountInfo = async () => {
    try {
      setLoadingInfo(true);
      const res = await adminCenterApiService.getBillingAccountInfo();
      if (res.done) {
        setBillingInfo(res.body);
      }
    } catch (e) {
      logger.error('Error getting billing account info', e);
    } finally {
      setLoadingInfo(false);
    }
  };

  const confirmPauseSubscription = async () => {
    try {
      setPausingPlan(true);
      const res = await adminCenterApiService.pauseSubscription();
      if (res.done) {
        setTimeout(() => {
          setPausingPlan(false);
          getBillingAccountInfo();
          trackMixpanelEvent(evt_billing_pause_plan);
        }, 8000);
      }
    } catch (error) {
      logger.error('Error pausing subscription', error);
    } finally {
      setPausingPlan(false);
    }
  };

  const confirmResumeSubscription = async () => {
    try {
      setCancellingPlan(true);
      const res = await adminCenterApiService.resumeSubscription();
      if (res.done) {
        setTimeout(() => {
          setCancellingPlan(false);
          getBillingAccountInfo();
          trackMixpanelEvent(evt_billing_resume_plan);
        }, 8000);
      }
    } catch (error) {
      logger.error('Error resuming subscription', error);
    } finally {
      setCancellingPlan(false);
    }
  };

  const shouldShowRedeemButton = () => {
    if (billingInfo?.trial_in_progress) return true;
    return billingInfo?.ltd_users ? billingInfo.ltd_users < 50 : false;
  };

  const showChangeButton = () => {
    if (!billingInfo?.status) return false;
    const status = [subscriptionStatus.ACTIVE, subscriptionStatus.PASTDUE];
    return status.includes(billingInfo.status);
  };

  const showPausePlanButton = () => {
    if (!billingInfo?.status) return false;
    const status = [subscriptionStatus.ACTIVE, subscriptionStatus.PASTDUE];
    return status.includes(billingInfo.status);
  };

  const showResumePlanButton = () => {
    if (!billingInfo?.status) return false;
    const status = [subscriptionStatus.PAUSED];
    return status.includes(billingInfo.status);
  };

  const renderExtra = () => {
    if (!billingInfo) return null;

    if (billingInfo.is_custom) return null;
    return (
      <Space>
        {showPausePlanButton() && (
          <Button type="link" danger loading={pausingPlan}>
            Pause Plan
          </Button>
        )}

        {showResumePlanButton() && (
          <Button type="primary" loading={cancellingPlan}>
            Resume Plan
          </Button>
        )}

        {billingInfo.trial_in_progress && (
          <Button type="primary" onClick={() => setIsVisible(true)}>
            Upgrade Plan
          </Button>
        )}

        {showChangeButton() && (
          <Button
            type="primary"
            loading={pausingPlan || cancellingPlan}
            onClick={() => setIsVisible(true)}
          >
            Change Plan
          </Button>
        )}
      </Space>
    );
  };

  const fetchBillingInfo = async () => {
    try {
      setLoadingInfo(true);
      const res = await adminCenterApiService.getBillingAccountInfo();
      if (res.done) {
        setBillingInfo(res.body);
      }
    } catch (e) {
      logger.error('Error getting billing account info', e);
    } finally {
      setLoadingInfo(false);
    }
  };

  useEffect(() => {
    fetchBillingInfo();
  }, []);

  return (
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
            open={isModalOpen}
            onCancel={() => dispatch(toggleUpgradeModal())}
            width={1000}
            centered
            okButtonProps={{ hidden: true }}
            cancelButtonProps={{ hidden: true }}
          >
            <UpgradePlans />
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
          <Typography.Text strong>{billingInfo?.plan_name}</Typography.Text>
          <Tooltip title={billingInfo?.trial_expire_date}>
            <Typography.Text></Typography.Text>
          </Tooltip>
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
  );
};

export default CurrentPlanDetails;
