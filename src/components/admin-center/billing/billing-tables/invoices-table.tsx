import { adminCenterApiService } from '@/api/admin-center/admin-center.api.service';
import { IBillingTransaction } from '@/types/admin-center/admin-center.types';
import { ContainerOutlined } from '@ant-design/icons';
import { Badge, Button, Table, TableProps } from 'antd';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface DataType {
  key: string;
  transactionId: string;
  startingDate: Date;
  endingDate: Date;
  status: string;
  paymentMethod: string;
}

const InvoicesTable: React.FC = () => {
  const { t } = useTranslation('current-bill');

  const [transactions, setTransactions] = useState<IBillingTransaction[]>([]);
  const [loadingTransactions, setLoadingTransactions] = useState(false);

  const fetchTransactions = async () => {
    try {
      setLoadingTransactions(true);
      const res = await adminCenterApiService.getTransactions();
      if (res.done) {
        setTransactions(res.body);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingTransactions(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const columns: TableProps['columns'] = [
    {
      title: t('transactionId'),
      key: 'transactionId',
      dataIndex: 'transactionId',
    },
    {
      title: t('transactionDate'),
      key: 'transactionDate',
      render: record => {
        const formattedStartingDate = new Date(record.startingDate).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });

        return `${formattedStartingDate}`;
      },
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
      title: t('paymentMethod'),
      key: 'paymentMethod',
      dataIndex: 'paymentMethod',
    },
    {
      title: t('status'),
      key: 'status',
      dataIndex: 'status',
      render: text => (
        <>
          <Badge status="success" />
          <span style={{ paddingLeft: '4px' }}>{text}</span>
        </>
      ),
    },
    {
      key: 'button',
      render: () => (
        <Button size="small">
          <ContainerOutlined />
        </Button>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={transactions}
      pagination={false}
      loading={loadingTransactions}
      rowKey="id"
    />
  );
};

export default InvoicesTable;
