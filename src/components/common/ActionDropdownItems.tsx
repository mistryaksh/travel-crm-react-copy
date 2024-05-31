import { FC } from 'react';
import { Dropdown } from 'react-bootstrap';

interface ActionDropdownItemsProps {
  dataId?: string;
  deleteFunc?: (id: string) => void;
  updateFunc?: (id: string) => void;
}

const ActionDropdownItems: FC<ActionDropdownItemsProps> = ({
  dataId,
  deleteFunc,
  updateFunc
}) => {
  console.log(dataId);
  return (
    <>
      <Dropdown.Item eventKey="1" onClick={() => console.log(dataId)}>
        View
      </Dropdown.Item>
      <Dropdown.Item
        eventKey="2"
        onClick={() => {
          if (updateFunc) {
            updateFunc(dataId as string);
          }
        }}
      >
        Modify
      </Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item
        onClick={() => {
          if (deleteFunc) {
            deleteFunc(dataId as string);
          }
        }}
        eventKey="4"
        className="text-danger"
      >
        Remove
      </Dropdown.Item>
    </>
  );
};

export default ActionDropdownItems;
