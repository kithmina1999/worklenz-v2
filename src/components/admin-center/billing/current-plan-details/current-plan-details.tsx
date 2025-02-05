import React, { useState } from 'react';
import { adminCenterApiService } from '@/api/admin-center/admin-center.api.service';
import {
  evt_billing_pause_plan,
  evt_billing_resume_plan,
} from '@/shared/worklenz-analytics-events';
import { useMixpanelTracking } from '@/hooks/useMixpanelTracking';
import logger from '@/utils/errorLogger';
import { Button, Card, Flex, Modal, Space, Tooltip, Typography } from 'antd/es';
import RedeemCodeDrawer from '../drawers/redeem-code-drawer/redeem-code-drawer';
import {
  fetchBillingInfo,
  toggleRedeemCodeDrawer,
  toggleUpgradeModal,
} from '@/features/admin-center/admin-center.slice';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useTranslation } from 'react-i18next';
import { WarningTwoTone } from '@ant-design/icons';
import { calculateTimeGap } from '@/utils/calculate-time-gap';
import { formatDate } from '@/utils/timeUtils';
import UpgradePlansLKR from '../drawers/upgrade-plans-lkr/upgrade-plans-lkr';
import UpgradePlans from '../drawers/upgrade-plans/upgrade-plans';
import { SUBSCRIPTION_STATUS } from '@/shared/constants';

const CurrentPlanDetails = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation('admin-center/current-bill');
  const { trackMixpanelEvent } = useMixpanelTracking();

  const [isVisible, setIsVisible] = useState(false);
  const [pausingPlan, setPausingPlan] = useState(false);
  const [cancellingPlan, setCancellingPlan] = useState(false);

  const themeMode = useAppSelector(state => state.themeReducer.mode);
  const { loadingBillingInfo, billingInfo, freePlanSettings, isUpgradeModalOpen } = useAppSelector(
    state => state.adminCenterReducer
  );

  const browserTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const confirmPauseSubscription = async () => {
    try {
      setPausingPlan(true);
      const res = await adminCenterApiService.pauseSubscription();
      if (res.done) {
        setTimeout(() => {
          setPausingPlan(false);
          dispatch(fetchBillingInfo());
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
          dispatch(fetchBillingInfo());
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
    if (billingInfo.is_ltd_user) return false;

    const status = [SUBSCRIPTION_STATUS.ACTIVE, SUBSCRIPTION_STATUS.PASTDUE];
    return status.includes(billingInfo.status);
  };

  const showPausePlanButton = () => {
    if (!billingInfo?.status) return false;
    if (billingInfo.is_ltd_user) return false;

    const status = [SUBSCRIPTION_STATUS.ACTIVE, SUBSCRIPTION_STATUS.PASTDUE];
    return status.includes(billingInfo.status);
  };

  const showResumePlanButton = () => {
    if (!billingInfo?.status) return false;
    if (billingInfo.is_ltd_user) return false;
    const status = [SUBSCRIPTION_STATUS.PAUSED];
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
          <Button type="primary" onClick={() => dispatch(toggleUpgradeModal())}>
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

  const renderLtdDetails = () => {
    if (!billingInfo) return null;
    if (billingInfo.is_custom) return null;
    return (
      <Flex vertical>
        <Typography.Text strong>{billingInfo?.plan_name}</Typography.Text>
        <Typography.Text>{t('ltdUsers', { ltd_users: billingInfo?.ltd_users })}</Typography.Text>
      </Flex>
    );
  };

  const renderTrialDetails = () => {
    const checkIfTrialExpired = () => {
      if (!billingInfo?.trial_expire_date) return false;
      const today = new Date();
      const trialExpireDate = new Date(billingInfo?.trial_expire_date);
      return today > trialExpireDate;
    };
    return (
      <Flex vertical>
        <Typography.Text strong>
          {t('trialPlan')}
          &nbsp;
          {checkIfTrialExpired() ? <WarningTwoTone color="yellow" /> : null}
        </Typography.Text>
        <Tooltip title={formatDate(new Date(billingInfo?.trial_expire_date || ''))}>
          <Typography.Text>
            {t(checkIfTrialExpired() ? 'trialExpired' : 'trialInProgress', {
              trial_expire_string: calculateTimeGap(billingInfo?.trial_expire_date || ''),
            })}
          </Typography.Text>
        </Tooltip>
      </Flex>
    );
  };

  const renderFreePlan = () => {
    return (
      <Typography.Text>
        <br />-{' '}
        {freePlanSettings?.team_member_limit === 0
          ? 'Unlimited'
          : freePlanSettings?.team_member_limit}{' '}
        team members <br />- {freePlanSettings?.projects_limit} projects <br />-{' '}
        {freePlanSettings?.free_tier_storage} MB storage
      </Typography.Text>
    );
  };

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
      loading={loadingBillingInfo}
      extra={renderExtra()}
    >
      <Flex vertical>
        <div style={{ marginBottom: '14px' }}>
          {billingInfo?.is_ltd_user && renderLtdDetails()}
          {billingInfo?.status === SUBSCRIPTION_STATUS.TRIALING && renderTrialDetails()}
          {billingInfo?.status === SUBSCRIPTION_STATUS.FREE && renderFreePlan()}
        </div>
        {shouldShowRedeemButton() && (
          <>
            <Button
              type="link"
              style={{
                margin: 0,

            padding: 0,
            width: '90px',
          }}
          onClick={() => {
            dispatch(toggleRedeemCodeDrawer());
          }}
        >
            {t('redeemCode')}
          </Button>
          <RedeemCodeDrawer />
        </>
      )}
      <Modal

          style={{
            width: '60vw',
          }}
          open={isUpgradeModalOpen}
          onCancel={() => dispatch(toggleUpgradeModal())}
          width={1000}
          centered
          okButtonProps={{ hidden: true }}
          cancelButtonProps={{ hidden: true }}
        >
          {browserTimeZone === 'Asia/Colombo' ? <UpgradePlansLKR /> : <UpgradePlans />}
        </Modal>
      </Flex>
    </Card>
  );
};

export default CurrentPlanDetails;
