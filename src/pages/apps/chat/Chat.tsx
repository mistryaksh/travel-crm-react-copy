import { FC } from 'react';
import ChatHomepageCard from 'components/cards/ChatHomepageCard';
import ChatSidebar from 'components/modules/chat/ChatSidebar';

const Chat: FC = () => {
  return (
    <div className="chat d-flex gap-3">
      <ChatSidebar />
      <ChatHomepageCard />
    </div>
  );
};

export default Chat;
