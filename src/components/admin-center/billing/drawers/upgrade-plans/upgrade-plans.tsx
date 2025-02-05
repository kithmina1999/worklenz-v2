import { useEffect, useState } from 'react';
import { adminCenterApiService } from '@/api/admin-center/admin-center.api.service';
import { IPricingPlans } from '@/types/admin-center/admin-center.types';
import logger from '@/utils/errorLogger';
import Typography from 'antd/es/typography';
import { Button, Card, Col, Flex, Form, Row, Select, Tag, Tooltip } from 'antd/es';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useTranslation } from 'react-i18next';
import { SUBSCRIPTION_STATUS } from '@/shared/constants';
import { CheckCircleFilled, InfoCircleFilled, InfoCircleOutlined } from '@ant-design/icons';

const UpgradePlans = () => {
  const { t } = useTranslation('admin-center/current-bill');
  const [plans, setPlans] = useState<IPricingPlans>({});
  const [selectedCard, setSelectedCard] = useState(2);
  const [selectedSeatCount, setSelectedSeatCount] = useState(5);
  const [seatCountOptions, setSeatCountOptions] = useState<number[]>([]);
  const [form] = Form.useForm();

  const { billingInfo } = useAppSelector(state => state.adminCenterReducer);
  const themeMode = useAppSelector(state => state.themeReducer.mode);

  const populateSeatCountOptions = (currentSeats: number) => {
    if (!currentSeats) return [];

    const step = 5;
    const maxSeats = 90;
    const minValue = Math.min(currentSeats + 1);
    const rangeStart = Math.ceil(minValue / step) * step;
    const range = Array.from(
      { length: Math.floor((maxSeats - rangeStart) / step) + 1 },
      (_, i) => rangeStart + i * step
    );

    return currentSeats < step
      ? [...Array.from({ length: rangeStart - minValue }, (_, i) => minValue + i), ...range]
      : range;
  };

  const fetchPricingPlans = async () => {
    try {
      const res = await adminCenterApiService.getPlans();
      if (res.done) {
        setPlans(res.body);
      }
    } catch (error) {
      logger.error('Error fetching pricing plans', error);
    }
  };

  const isSelected = (cardIndex: number) =>
    selectedCard === cardIndex ? { border: '2px solid #1890ff' } : {};

  const cardStyles = {
    title: {
      color: themeMode === 'dark' ? '#ffffffd9' : '#000000d9',
      fontWeight: 500,
      fontSize: '16px',
      display: 'flex',
      gap: '4px',
      justifyContent: 'center',
    },
    priceContainer: {
      display: 'grid',
      gridTemplateColumns: 'auto',
      rowGap: '10px',
      padding: '20px 20px 0',
    },
    featureList: {
      display: 'grid',
      gridTemplateRows: 'auto auto auto',
      gridTemplateColumns: '200px',
      rowGap: '7px',
      padding: '10px',
      justifyItems: 'start',
      alignItems: 'start',
    },
    checkIcon: { color: '#52c41a' },
  };

  const calculateAnnualTotal = (price: string | undefined) => {
    if (!price) return;
    return (12 * parseFloat(price) * selectedSeatCount).toFixed(2);
  };

  const calculateMonthlyTotal = (price: string | undefined) => {
    if (!price) return;
    return (parseFloat(price) * selectedSeatCount).toFixed(2);
  };

  useEffect(() => {
    fetchPricingPlans();
    if (billingInfo?.total_used) {
      setSeatCountOptions(populateSeatCountOptions(billingInfo.total_used));
      form.setFieldsValue({ seatCount: selectedSeatCount });
    }
  }, [billingInfo]);

  const renderFeature = (text: string) => (
    <div>
      <CheckCircleFilled style={cardStyles.checkIcon} />
      &nbsp;<span>{text}</span>
    </div>
  );

  return (
    <div>
      <Flex justify="center" align="center">
        <Typography.Title level={2}>
          {billingInfo?.status === SUBSCRIPTION_STATUS.TRIALING
            ? t('selectPlan')
            : t('changeSubscriptionPlan')}
        </Typography.Title>
      </Flex>

      <Flex justify="center" align="center">
        <Form form={form}>
          <Form.Item name="seatCount" label={t('noOfSeats')}>
            <Select
              style={{ width: 100 }}
              value={selectedSeatCount}
              options={seatCountOptions.map(option => ({
                value: option,
                text: option.toString(),
              }))}
              onChange={setSelectedSeatCount}
            />
          </Form.Item>
        </Form>
      </Flex>

      <Flex>
        <Row className="w-full">
          {/* Free Plan */}
          <Col span={8} style={{ padding: '0 4px' }}>
            <Card
              style={{ ...isSelected(1), height: '100%' }}
              hoverable
              title={<span style={cardStyles.title}>{t('freePlan')}</span>}
              onClick={() => setSelectedCard(1)}
            >
              <div style={cardStyles.priceContainer}>
                <Flex justify="space-between" align="center">
                  <Typography.Title level={1}>$ 0.00</Typography.Title>
                  <Typography.Text>{t('freeForever')}</Typography.Text>
                </Flex>
                <Flex justify="center" align="center">
                  <Typography.Text strong style={{ fontSize: '16px' }}>
                    {t('bestForPersonalUse')}
                  </Typography.Text>
                </Flex>
              </div>

              <div style={cardStyles.featureList}>
                {renderFeature(`${plans.free_tier_storage} ${t('storage')}`)}
                {renderFeature(`${plans.projects_limit} ${t('projects')}`)}
                {renderFeature(`${plans.team_member_limit} ${t('teamMembers')}`)}
              </div>
            </Card>
          </Col>

          {/* Annual Plan */}
          <Col span={8} style={{ padding: '0 4px' }}>
            <Card
              style={{ ...isSelected(2), height: '100%' }}
              hoverable
              title={
                <span style={cardStyles.title}>
                  {t('annualPlan')}{' '}
                  <Tag color="volcano" style={{ lineHeight: '21px' }}>
                    {t('tag')}
                  </Tag>
                </span>
              }
              onClick={() => setSelectedCard(2)}
            >
              <div style={cardStyles.priceContainer}>
                <Flex justify="space-between" align="center">
                  <Typography.Title level={1}>$ {plans.annual_price}</Typography.Title>
                  <Typography.Text>seat / month</Typography.Text>
                </Flex>
                <Flex justify="center" align="center">
                  <Typography.Text strong style={{ fontSize: '16px' }}>
                    Total ${calculateAnnualTotal(plans.annual_price)}/ year
                    <Tooltip
                      title={
                        '$' + plans.annual_price + ' x 12 months x ' + selectedSeatCount + ' seats'
                      }
                    >
                      <InfoCircleOutlined
                        style={{ color: 'grey', fontSize: '16px', marginLeft: '4px' }}
                      />
                    </Tooltip>
                  </Typography.Text>
                </Flex>
                <Flex justify="center" align="center">
                  <Typography.Text>{t('billedAnnually')}</Typography.Text>
                </Flex>
              </div>

              <div style={cardStyles.featureList} className="mt-4">
                {renderFeature(t('startupText01'))}
                {renderFeature(t('startupText02'))}
                {renderFeature(t('startupText03'))}
                {renderFeature(t('startupText04'))}
                {renderFeature(t('startupText05'))}
              </div>
            </Card>
          </Col>

          {/* Monthly Plan */}
          <Col span={8} style={{ padding: '0 4px' }}>
            <Card
              style={{ ...isSelected(3), height: '100%' }}
              hoverable
              title={<span style={cardStyles.title}>{t('monthlyPlan')}</span>}
              onClick={() => setSelectedCard(3)}
            >
              <div style={cardStyles.priceContainer}>
                <Flex justify="space-between" align="center">
                  <Typography.Title level={1}>$ {plans.monthly_price}</Typography.Title>
                  <Typography.Text>seat / month</Typography.Text>
                </Flex>
                <Flex justify="center" align="center">
                  <Typography.Text strong style={{ fontSize: '16px' }}>
                    Total ${calculateMonthlyTotal(plans.monthly_price)}/ month
                    <Tooltip
                      title={'$' + plans.monthly_price + ' x ' + selectedSeatCount + ' seats'}
                    >
                      <InfoCircleOutlined
                        style={{ color: 'grey', fontSize: '16px', marginLeft: '4px' }}
                      />
                    </Tooltip>
                  </Typography.Text>
                </Flex>
                <Flex justify="center" align="center">
                  <Typography.Text>{t('billedMonthly')}</Typography.Text>
                </Flex>
              </div>

              <div style={cardStyles.featureList}>
                {renderFeature(t('startupText01'))}
                {renderFeature(t('startupText02'))}
                {renderFeature(t('startupText03'))}
                {renderFeature(t('startupText04'))}
                {renderFeature(t('startupText05'))}
              </div>
            </Card>
          </Col>
        </Row>
      </Flex>
      <Row justify="end" className="mt-4">
        {selectedCard === 1 && (
          <Button type="primary" htmlType="submit">
            Try for free
          </Button>
        )}
        {selectedCard === 3 && (
          <Button type="primary" htmlType="submit">
            Continue with {t('monthlyPlan')}
          </Button>
        )}
        {selectedCard === 2 && (
          <Button type="primary" htmlType="submit">
            Continue with {t('annualPlan')}
          </Button>
        )}
      </Row>
    </div>
  );
};

export default UpgradePlans;
