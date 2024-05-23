import useConfigMountEffect from 'hooks/useConfigMountEffect';
import useSettingsMountEffect from 'hooks/useSettingsMountEffect';
import { DashboardPage } from 'pages/dashboard';

import React from 'react';

const DualNav = () => {
  useSettingsMountEffect({
    disableNavigationType: true,
    disableVerticalNavbarAppearance: true,
    disableHorizontalNavbarShape: true,
    disableResetButton: true
  });

  useConfigMountEffect({
    navbarPosition: 'dual',
    navbarTopShape: 'default'
  });

  return <DashboardPage />;
};

export default DualNav;
