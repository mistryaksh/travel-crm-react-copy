import { Card } from 'react-bootstrap';
import chatIllustration from 'assets/img/spot-illustrations/chat.webp';
import chatDarkIllustration from 'assets/img/spot-illustrations/dark_chat.webp';
import Scrollbar from 'components/base/Scrollbar';

const ChatHomepageCard = () => {
  return (
    <Card className="h-100 w-100 d-none d-sm-block border border-primary">
      <Scrollbar>
        <Card.Body className="h-100 d-flex flex-column flex-center text-center">
          <img
            src={chatIllustration}
            alt="chat"
            height={260}
            width={320}
            className="mb-15 d-dark-none"
          />
          <img
            src={chatDarkIllustration}
            alt="chat"
            height={260}
            width={320}
            className="mb-15 d-light-none"
          />
          <h3 className="text-body fw-semibold mb-3 fs-7 fs-sm-6">
            Click to select a Conversation or,
          </h3>
          <h3 className="text-primary fw-semibold fs-7 fs-sm-6">
            Start a New Conversation
          </h3>
        </Card.Body>
      </Scrollbar>
    </Card>
  );
};

export default ChatHomepageCard;
