import MainLayout from 'layouts/MainLayout';
import { RouteObject, createBrowserRouter } from 'react-router-dom';

import App from 'App';
import MainLayoutProvider from 'providers/MainLayoutProvider';
import Error404 from 'pages/error/Error404';
import { DashboardPage } from 'pages/dashboard';
import {
  AmenityPage,
  BedTypeListPage,
  ListCustomerPage,
  ListRoomsPage,
  MasterAmenityPage,
  NewCustomerPage,
  NewRoomPage,
  PaymentModeListPage,
  PropertyTypeListPage,
  RoomCategoryPage,
  SystemCodeListPage,
  UploadNewHotelPage
} from 'pages/travel-agency';
import ChatHomepage from 'pages/apps/chat/ChatHomepage';
import ChatConversation from 'pages/apps/chat/ChatConversation';
import { CommonChatPage } from 'pages/common-chat';
import SignIn from 'pages/pages/authentication/simple/SignIn';
import { PrivateRoutes } from 'components/protection';

const routes: RouteObject[] = [
  {
    element: <App />,
    children: [
      {
        path: '/admin/sign-in',
        element: <SignIn />
      },

      {
        path: '/',
        element: (
          <PrivateRoutes>
            <MainLayoutProvider>
              <MainLayout />
            </MainLayoutProvider>
          </PrivateRoutes>
        ),
        children: [
          {
            index: true,
            element: <DashboardPage />
          },
          {
            path: '/admin/new-hotel',
            index: true,
            element: <UploadNewHotelPage />
          },
          {
            path: '/admin/property-type',
            index: true,
            element: <PropertyTypeListPage />
          },
          {
            path: '/admin/system-code',
            index: true,
            element: <SystemCodeListPage />
          },
          {
            path: '/admin/amenity',
            index: true,
            element: <AmenityPage />
          },
          {
            path: '/admin/master/amenity',
            index: true,
            element: <MasterAmenityPage />
          },
          {
            path: '/admin/new-room',
            index: true,
            element: <NewRoomPage />
          },
          {
            path: '/admin/list-room',
            index: true,
            element: <ListRoomsPage />
          },
          {
            path: '/admin/payment-mode',
            index: true,
            element: <PaymentModeListPage />
          },
          {
            path: '/admin/room/category',
            index: true,
            element: <RoomCategoryPage />
          },
          {
            path: '/admin/room/bed',
            index: true,
            element: <BedTypeListPage />
          },
          {
            path: '*',
            element: <Error404 />
          },
          {
            path: 'chat',
            element: <CommonChatPage />,
            children: [
              {
                index: true,
                element: <ChatHomepage />
              },
              {
                path: ':userId/conversation',
                element: <ChatConversation />
              }
            ]
          },
          {
            path: 'customer',
            element: <ListCustomerPage />
          },
          {
            path: '/customer/new',
            element: <NewCustomerPage />
          }
        ]
      }
    ]
  }
];

export const router = createBrowserRouter(routes);

export default routes;
