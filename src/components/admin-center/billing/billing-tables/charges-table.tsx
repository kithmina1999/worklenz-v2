import { adminCenterApiService } from '@/api/admin-center/admin-center.api.service';
import { IBillingCharge, IBillingChargesResponse } from '@/types/admin-center/admin-center.types';
import { Table, TableProps } from 'antd';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface DataType {
  key: string;
  description: string;
  startingDate: Date;
  endingDate: Date;
  billStatus: string;
  perUserValue: number;
  users: number;
  amount: number;
}

const ChargesTable: React.FC = () => {
  const { t } = useTranslation('current-bill');
  const [charges, setCharges] = useState<IBillingChargesResponse>({});
  const [loadingCharges, setLoadingCharges] = useState(false);

  const fetchCharges = async () => {
    try {
      setLoadingCharges(true);
      const res = await adminCenterApiService.getCharges();
      if (res.done) {
        setCharges(res.body);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingCharges(false);
    }
  };

  const columns: TableProps['columns'] = [
    {
      title: t('description'),
      key: 'name',
      dataIndex: 'name',
    },
    {
      title: t('billingPeriod'),
      key: 'billingPeriod',
      render: record => {
        const formattedStartingDate = new Date(record.startingDate).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
        const formattedEndingDate = new Date(record.endingDate).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });

        return `${formattedStartingDate} - ${formattedEndingDate}`;
      },
    },
    {
      title: t('billStatus'),
      key: 'status',
      dataIndex: 'status',
    },
    {
      title: t('perUserValue'),
      key: 'perUserValue',
      dataIndex: 'perUserValue',
      render: (_, record) => <span>{record.currency} {record.unit_price}</span>,
    },
    {
      title: t('users'),
      key: 'users',
      dataIndex: 'users',
    },
    {
      title: t('amount'),
      key: 'amount',
      dataIndex: 'amount',
      render: text => <span>USD {text}</span>,
    },
  ];

  useEffect(() => {
    fetchCharges();
  }, []);

  return (
    <Table<IBillingCharge>
      columns={columns}
      dataSource={charges.plan_charges}
      pagination={false}
      loading={loadingCharges}
      rowKey="id"
    />
  );
};

export default ChargesTable;
