import useConfigMountEffect from 'hooks/useConfigMountEffect';
import useSettingsMountEffect from 'hooks/useSettingsMountEffect';
import { DashboardPage } from 'pages/dashboard';

const NavbarTopSlim = () => {
  useSettingsMountEffect({
    disableNavigationType: true,
    disableHorizontalNavbarAppearance: true,
    disableVerticalNavbarAppearance: true,
    disableHorizontalNavbarShape: true,
    disableResetButton: true
  });

  useConfigMountEffect({
    navbarTopShape: 'slim',
    navbarPosition: 'horizontal',
    navbarTopAppearance: 'darker'
  });

  return <DashboardPage />;
};

export default NavbarTopSlim;
