import React from 'react';
import { RouteObject } from 'react-router-dom';
import AccountSetup from '@/pages/accountSetup/AccountSetup';

const accountSetupRoute: RouteObject = {
  path: '/worklenz/setup',
  element: <AccountSetup />,
};

export default accountSetupRoute;
