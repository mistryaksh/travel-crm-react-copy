import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  Icon,
  UilChartPie,
  UilCommentPlus,
  UilSignOutAlt
} from '@iconscout/react-unicons';

export interface Route {
  name: string;
  icon?: IconProp | string | string[];
  iconSet?: 'font-awesome' | 'feather' | 'unicons';
  pages?: Route[];
  path?: string;
  pathName?: string;
  flat?: boolean;
  topNavIcon?: string;
  dropdownInside?: boolean;
  active?: boolean;
  new?: boolean;
  hasNew?: boolean;
}

export interface RouteItems {
  label: string;
  horizontalNavLabel?: string;
  icon: Icon;
  labelDisabled?: boolean;
  pages: Route[];
  megaMenu?: boolean;
  active?: boolean;
}

export const routes: RouteItems[] = [
  {
    label: 'dashboard',
    horizontalNavLabel: 'home',
    active: true,
    icon: UilChartPie,
    labelDisabled: true,
    pages: [
      {
        name: 'Dashboard',
        path: '/',
        pathName: 'default-dashboard',
        icon: 'pie-chart',
        active: true
      },
      {
        name: 'Room',
        active: true,
        icon: 'triangle',
        pages: [
          {
            path: '/admin/list-room',
            name: 'List room',
            active: true
          },
          {
            path: '/admin/new-room',
            name: 'Add room',
            active: true
          }
        ]
      },
      {
        name: 'Hotel',
        icon: 'hotel',
        active: true,
        pages: [
          {
            path: '/admin/list-hotel',
            name: 'List Hotel',
            active: true,
            topNavIcon: 'briefcase'
          },
          {
            path: '/admin/new-hotel',
            name: 'Add Hotel',
            active: true,
            topNavIcon: 'briefcase'
          }
        ]
      },

      {
        path: 'customer',
        name: 'Customer',
        active: true,
        icon: 'user',
        pages: [
          {
            name: 'List customer',
            active: true,
            path: '/customer'
          },
          {
            name: 'Add customer',
            active: true,
            path: '/customer/new'
          }
        ]
      },
      {
        path: 'chat',
        name: 'Messages',
        active: true,
        icon: 'message-circle'
      }
    ]
  },
  {
    label: 'Others Options',
    icon: UilCommentPlus,
    pages: [
      {
        name: 'System Code',
        active: true,
        path: '/admin/system-code'
      },
      {
        name: 'property Type',
        active: true,
        path: '/admin/property-type'
      },

      {
        path: '/admin/amenity',
        name: 'Amenity',
        active: true
      },
      {
        path: '/admin/master/amenity',
        name: 'Master Amenity',
        active: true
      },
      {
        path: '/admin/payment-mode',
        name: 'Payment Mode',
        active: true
      },
      {
        path: '/admin/room/category',
        name: 'Room Category',
        active: true
      },
      {
        path: '/admin/room/bed',
        name: 'Bed Type',
        active: true
      }
    ]
  },
  {
    label: 'Logout',
    active: true,
    icon: UilSignOutAlt,
    pages: []
  }
];
