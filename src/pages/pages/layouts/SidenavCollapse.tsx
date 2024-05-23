import useConfigMountEffect from 'hooks/useConfigMountEffect';
import useSettingsMountEffect from 'hooks/useSettingsMountEffect';
import { DashboardPage } from 'pages/dashboard';

const SidenavCollapse = () => {
  useSettingsMountEffect({
    disableNavigationType: true,
    disableHorizontalNavbarAppearance: true,
    disableVerticalNavbarAppearance: true,
    disableHorizontalNavbarShape: true,
    disableResetButton: true
  });

  useConfigMountEffect({
    isNavbarVerticalCollapsed: true
  });

  return <DashboardPage />;
};

export default SidenavCollapse;
