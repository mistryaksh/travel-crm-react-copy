import {
  UilCheck,
  UilCoffee,
  UilDollarSign,
  UilFile,
  UilImage
} from '@iconscout/react-unicons';
import React, { useState } from 'react';
import {
  Breadcrumb,
  FloatingLabel,
  Form,
  InputGroup,
  Nav,
  Tab
} from 'react-bootstrap';

export const NewRoomPage = () => {
  const [key, setKey] = useState<string>('info');

  return (
    <div>
      <Breadcrumb className="mb-0">
        <Breadcrumb.Item href="#!">Home</Breadcrumb.Item>
        <Breadcrumb.Item href="#!">Room</Breadcrumb.Item>
        <Breadcrumb.Item href="#!" active>
          New Room
        </Breadcrumb.Item>
      </Breadcrumb>
      <h2 className="fs-5 my-2">Add New Room</h2>
      <Tab.Container
        defaultActiveKey={key}
        id="controlled-tab-example"
        activeKey={key}
        onSelect={k => setKey(k as string)}
      >
        <div className="d-flex row align-items-end flex-wrap-reverse gap-3 mt-6">
          <Tab.Content defaultValue={key} className="flex-1 col-xl-8">
            <Tab.Pane eventKey="info" className="">
              <h3 className="mb-4">Room Details</h3>
              <h4 className="mb-2">Share your room details</h4>
              <p className="text-muted">
                Enjoy a comfortable stay in our well-appointed rooms with a
                variety of options to choose from.
              </p>
              <div className="d-flex items-center gap-3 mb-4">
                <div className="flex-1">
                  <FloatingLabel label="Room Category">
                    <Form.Select>
                      <option value="">All</option>
                      <option value="">King</option>
                      <option value="">One Sharer</option>
                      <option value="">Bridle Room</option>
                    </Form.Select>
                  </FloatingLabel>
                </div>
                <div className="flex-1">
                  <FloatingLabel label="Room Name">
                    <Form.Control placeholder="Room Name" />
                  </FloatingLabel>
                </div>
              </div>
              <div className="d-flex items-center gap-3 mb-4">
                <div className="flex-1">
                  <FloatingLabel label="Bed Type">
                    <Form.Select>
                      <option value="">All</option>
                      <option value="">King</option>
                      <option value="">One Sharer</option>
                      <option value="">Bridle Room</option>
                    </Form.Select>
                  </FloatingLabel>
                </div>
                <div className="flex-1">
                  <InputGroup className="mb-3" size="lg">
                    <InputGroup.Text typeof="button">-</InputGroup.Text>
                    <Form.Control
                      type="number"
                      placeholder="Adult"
                      aria-label="Amount (to the nearest dollar)"
                    />
                    <InputGroup.Text>+</InputGroup.Text>
                  </InputGroup>
                </div>
                <div className="flex-1">
                  <InputGroup className="mb-3" size="lg">
                    <InputGroup.Text typeof="button">-</InputGroup.Text>
                    <Form.Control
                      type="number"
                      placeholder="Children allowed
"
                      aria-label="Amount (to the nearest dollar)"
                    />
                    <InputGroup.Text>+</InputGroup.Text>
                  </InputGroup>
                </div>
              </div>
              <div className="d-flex gap-3">
                <div className="flex-1">
                  <InputGroup className="mb-3" size="lg">
                    <InputGroup.Text typeof="button">-</InputGroup.Text>
                    <Form.Control
                      type="number"
                      placeholder="Number of bed"
                      aria-label="Amount (to the nearest dollar)"
                    />
                    <InputGroup.Text>+</InputGroup.Text>
                  </InputGroup>
                </div>{' '}
                <div className="flex-1">
                  <InputGroup className="mb-3" size="lg">
                    <InputGroup.Text typeof="button">-</InputGroup.Text>
                    <Form.Control
                      type="number"
                      placeholder="Bathroom"
                      aria-label="Amount (to the nearest dollar)"
                    />
                    <InputGroup.Text>+</InputGroup.Text>
                  </InputGroup>
                </div>{' '}
                <div className="flex-1">
                  <InputGroup className="mb-3" size="lg">
                    <InputGroup.Text typeof="button">-</InputGroup.Text>
                    <Form.Control
                      type="number"
                      placeholder="Balcony"
                      aria-label="Amount (to the nearest dollar)"
                    />
                    <InputGroup.Text>+</InputGroup.Text>
                  </InputGroup>
                </div>
              </div>
              <div className="d-flex gap-3">
                <div className="flex-1">
                  <InputGroup className="mb-3" size="lg">
                    <InputGroup.Text typeof="button">-</InputGroup.Text>
                    <Form.Control
                      type="number"
                      placeholder="Room of this type"
                      aria-label="Amount (to the nearest dollar)"
                    />
                    <InputGroup.Text>+</InputGroup.Text>
                  </InputGroup>
                </div>
                <div className="flex-1">
                  <FloatingLabel label="Size (Sq. m)">
                    <Form.Control
                      placeholder="Size (Sq. mr)"
                      aria-label="Size"
                    />
                  </FloatingLabel>
                </div>
              </div>
            </Tab.Pane>
          </Tab.Content>
          <div className="col-xl-4 order-xl-1 mb-3">
            <Nav
              variant="underline"
              className="d-flex flex-lg-column flex-sm-row flex-xl-column flex-md-row flex-sm-row w-lg-25"
              defaultActiveKey="info"
            >
              <Nav.Item>
                <Nav.Link
                  eventKey="info"
                  className="d-flex flex-1 align-items-center gap-3"
                >
                  <UilFile />
                  Details
                </Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link
                  eventKey="finance"
                  className="d-flex align-items-center gap-3"
                >
                  <UilDollarSign />
                  Pricing
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="policies"
                  className="d-flex align-items-center gap-3"
                >
                  <UilCoffee />
                  Amenities
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="photos"
                  className="d-flex align-items-center gap-3"
                >
                  <UilImage />
                  Photos
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="done"
                  className="d-flex align-items-center gap-3"
                >
                  <UilCheck />
                  Done
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </div>
        </div>
      </Tab.Container>
    </div>
  );
};
