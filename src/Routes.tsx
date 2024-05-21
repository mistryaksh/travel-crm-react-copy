import MainLayout from 'layouts/MainLayout';
import { RouteObject, createBrowserRouter } from 'react-router-dom';

import App from 'App';
import MainLayoutProvider from 'providers/MainLayoutProvider';
import Error404 from 'pages/error/Error404';
import { DashboardPage } from 'pages/dashboard';
import {
  AmenityPage,
  ListCustomerPage,
  ListRoomsPage,
  MasterAmenityPage,
  NewCustomerPage,
  NewRoomPage,
  UploadNewHotelPage
} from 'pages/travel-agency';
import ChatHomepage from 'pages/apps/chat/ChatHomepage';
import ChatConversation from 'pages/apps/chat/ChatConversation';
import { CommonChatPage } from 'pages/common-chat';

const routes: RouteObject[] = [
  {
    element: <App />,
    children: [
      {
        path: '/',
        element: (
          <MainLayoutProvider>
            <MainLayout />
          </MainLayoutProvider>
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
