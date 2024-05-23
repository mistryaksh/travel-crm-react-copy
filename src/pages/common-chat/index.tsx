import classNames from 'classnames';
import Avatar from 'components/base/Avatar';
import Badge from 'components/base/Badge';
import PageBreadcrumb from 'components/common/PageBreadcrumb';
import moment from 'moment';
import React, { useEffect } from 'react';
import { Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const CommonChatPage = () => {
  useEffect(() => {}, []);
  const unseenMessageCount: number = 5;

  return (
    <div>
      <h2 className="fs-5 my-2">Chat with your contact</h2>
      <h4 className="text-muted">Click on user to start chat</h4>
      <PageBreadcrumb
        items={[
          { label: 'Home', active: false, url: '/' },
          { label: 'Contact', active: false, url: '/contacts' },
          { label: 'Chat', active: true, url: 'home/contact/chat' }
        ]}
      />
      <div className="chat p-3 gap-3 d-flex">
        <div className="border w-30 p-2 scrollbar">
          <Nav.Item
            // key={conversation.id}
            className={unseenMessageCount > 0 ? 'read' : 'unread'}
          >
            <Nav.Link
              as={Link}
              to={`#`}
              // onClick={markedAsRead}
              className={classNames(
                'd-flex align-items-center justify-content-center',
                {
                  unread: unseenMessageCount > 0
                  // active: currentConversation?.user.id === conversation.user.id
                }
              )}
            >
              <div className="position-relative me-2 me-sm-0 me-xl-2 hover-primary">
                <Avatar
                  src={`https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745`}
                  size="xl"
                  className="d-block"
                  imageClassName="border border-2 border-light-subtle"
                />
                {unseenMessageCount > 0 && (
                  <span
                    className="bg-primary rounded-circle top-0 end-0 position-absolute text-white d-flex flex-center fs-10 fw-semibold d-none d-sm-flex d-xl-none lh-1"
                    style={{ height: '1rem', width: '1rem' }}
                  >
                    {5}
                  </span>
                )}
              </div>
              <div className="flex-1 d-sm-none d-xl-block">
                <div className="d-flex justify-content-between align-items-center">
                  <h5 className="text-body fw-normal name text-nowrap">
                    Kumar Jyoti
                  </h5>
                  <p className="fs-10 text-body-tertiary text-opacity-85 mb-0 text-nowrap">
                    {moment(new Date()).fromNow()}
                  </p>
                </div>
                <div className="d-flex justify-content-between">
                  <p className="fs-9 mb-0 line-clamp-1 text-body-tertiary text-opacity-85 message">
                    Hello Aakash
                  </p>
                  {unseenMessageCount > 0 && (
                    <Badge
                      variant="phoenix"
                      bg="primary"
                      className="px-1 unread-badge ms-1"
                    >
                      {unseenMessageCount}
                    </Badge>
                  )}
                </div>
              </div>
            </Nav.Link>
          </Nav.Item>
        </div>
        <div className="flex-1 border p-2">1</div>
      </div>
    </div>
  );
};
