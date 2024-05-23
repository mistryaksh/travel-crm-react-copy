import {
  UilCheck,
  UilCoffee,
  UilDollarSign,
  UilFile,
  UilImage
} from '@iconscout/react-unicons';
import Button from 'components/base/Button';
import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import {
  Breadcrumb,
  DropdownButton,
  FloatingLabel,
  Form,
  FormControl,
  FormLabel,
  InputGroup,
  Nav,
  Tab
} from 'react-bootstrap';

type KeyType = 'info' | 'finance' | 'policies' | 'photos' | 'done';

export const NewRoomPage = () => {
  const [key, setKey] = useState<KeyType>('info');

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
        onSelect={k => setKey(k as unknown as KeyType)}
      >
        <div className="d-flex row align-items-end flex-wrap-reverse gap-5 mt-6">
          <Tab.Content defaultValue={key} className="col-xl-6 col-lg-6">
            <Tab.Pane eventKey="info" className="">
              <h3 className="mb-4">Room Details</h3>
              <h4 className="mb-2">Share your room details</h4>
              <p className="text-muted">
                Enjoy a comfortable stay in our well-appointed rooms with a
                variety of options to choose from.
              </p>
              <div className="d-flex items-center gap-5 mb-4">
                <div className="flex-1">
                  <FloatingLabel label="Room Category">
                    <Form.Select size="sm">
                      <option value="">All</option>
                      <option value="">King</option>
                      <option value="">One Sharer</option>
                      <option value="">Bridle Room</option>
                    </Form.Select>
                  </FloatingLabel>
                </div>
                <div className="flex-1">
                  <FloatingLabel label="Room Name">
                    <Form.Control placeholder="Room Name" size="sm" />
                  </FloatingLabel>
                </div>
              </div>
              <div className="d-flex gap-5 mb-4">
                <div className="flex-1">
                  <FormLabel htmlFor="bed">Bed Type</FormLabel>
                  {/* <FloatingLabel label="Bed Type"> */}
                  <Form.Select id="bed">
                    <option value="">All</option>
                    <option value="">King</option>
                    <option value="">One Sharer</option>
                    <option value="">Bridle Room</option>
                  </Form.Select>
                  {/* </FloatingLabel> */}
                </div>
                <div className="flex-1">
                  <FormLabel htmlFor="adult">Adult</FormLabel>
                  <InputGroup className="mb-3">
                    <Button variant="phoenix-secondary" id="button-addon1">
                      -
                    </Button>
                    <FormControl
                      value={0}
                      type="number"
                      id="adult"
                      aria-label="Example text with button addon"
                      aria-describedby="basic-addon1"
                    />
                    <Button variant="phoenix-secondary" id="button-addon1">
                      +
                    </Button>
                  </InputGroup>
                </div>
                <div className="flex-1">
                  <FormLabel htmlFor="children">Children Allowed</FormLabel>
                  <InputGroup className="mb-3">
                    <Button variant="phoenix-secondary" id="button-addon1">
                      -
                    </Button>
                    <FormControl
                      value={0}
                      type="number"
                      id="children"
                      aria-label="Example text with button addon"
                      aria-describedby="basic-addon1"
                    />
                    <Button variant="phoenix-secondary" id="button-addon1">
                      +
                    </Button>
                  </InputGroup>
                </div>
              </div>
              <div className="d-flex gap-5">
                <div className="flex-1">
                  <FormLabel>No. of Beds</FormLabel>
                  <InputGroup className="mb-3">
                    <Button variant="phoenix-secondary" id="button-addon1">
                      -
                    </Button>
                    <FormControl
                      value={0}
                      placeholder="Number of bed"
                      type="number"
                      id="children"
                      aria-label="Example text with button addon"
                      aria-describedby="basic-addon1"
                    />
                    <Button variant="phoenix-secondary" id="button-addon1">
                      +
                    </Button>
                  </InputGroup>
                </div>
                <div className="flex-1">
                  <FormLabel htmlFor="bathroom">Bathroom</FormLabel>
                  <InputGroup className="">
                    <Button variant="phoenix-secondary" id="button-addon1">
                      -
                    </Button>
                    <FormControl
                      value={0}
                      placeholder="Bathroom"
                      type="number"
                      id="bathroom"
                      aria-label="Example text with button addon"
                      aria-describedby="basic-addon1"
                    />
                    <Button variant="phoenix-secondary" id="button-addon1">
                      +
                    </Button>
                  </InputGroup>
                </div>
                <div className="flex-1">
                  <FormLabel htmlFor="balcony">Balcony</FormLabel>
                  <InputGroup className="">
                    <Button variant="phoenix-secondary" id="button-addon1">
                      -
                    </Button>
                    <FormControl
                      value={0}
                      placeholder="Balcony"
                      type="number"
                      id="balcony"
                      aria-label="Example text with button addon"
                      aria-describedby="basic-addon1"
                    />
                    <Button variant="phoenix-secondary" id="button-addon1">
                      +
                    </Button>
                  </InputGroup>
                </div>
              </div>
              <div className="d-flex gap-5">
                <div className="flex-1">
                  <FormLabel htmlFor="roomType">room Type</FormLabel>
                  <InputGroup className="">
                    <Button variant="phoenix-secondary" id="button-addon1">
                      -
                    </Button>
                    <FormControl
                      value={0}
                      placeholder="Room of this type"
                      type="number"
                      id="roomType"
                      aria-label="Example text with button addon"
                      aria-describedby="basic-addon1"
                    />
                    <Button variant="phoenix-secondary" id="button-addon1">
                      +
                    </Button>
                  </InputGroup>
                </div>
                <div className="flex-1">
                  <FormLabel htmlFor="size">Room size (OPT)</FormLabel>
                  <InputGroup>
                    <FormControl placeholder="Size" />
                    <DropdownButton
                      id="size"
                      variant="phoenix-secondary"
                      title="Sq. m"
                      align="end"
                    >
                      <Dropdown.Item href="#">Sq. m</Dropdown.Item>
                      <Dropdown.Item href="#">Sq. ft</Dropdown.Item>
                      <Dropdown.Item href="#">Sq. in</Dropdown.Item>
                    </DropdownButton>
                  </InputGroup>
                </div>
              </div>
              <h4 className="mt-7 mb-2">Sleeping arrangements</h4>
              <p className="mb-4 text-body-tertiary">
                Sleep well in our comfortable rooms with modern amenities.
              </p>
              <div className="d-flex gap-5 mb-4">
                <div className="flex-1">
                  <FormLabel htmlFor="single">Single bed</FormLabel>
                  <InputGroup className="">
                    <Button variant="phoenix-secondary" id="button-addon1">
                      -
                    </Button>
                    <FormControl
                      value={0}
                      placeholder="Room of this type"
                      type="number"
                      id="single"
                      aria-label="Example text with button addon"
                      aria-describedby="basic-addon1"
                    />
                    <Button variant="phoenix-secondary" id="button-addon1">
                      +
                    </Button>
                  </InputGroup>
                </div>
                <div className="flex-1">
                  <FormLabel htmlFor="double">Double bed</FormLabel>
                  <InputGroup className="">
                    <Button variant="phoenix-secondary" id="button-addon1">
                      -
                    </Button>
                    <FormControl
                      value={0}
                      placeholder="Room of this type"
                      type="number"
                      id="double"
                      aria-label="Example text with button addon"
                      aria-describedby="basic-addon1"
                    />
                    <Button variant="phoenix-secondary" id="button-addon1">
                      +
                    </Button>
                  </InputGroup>
                </div>
                <div className="flex-1">
                  <FormLabel htmlFor="queen">Queen bed</FormLabel>
                  <InputGroup className="">
                    <Button variant="phoenix-secondary" id="button-addon1">
                      -
                    </Button>
                    <FormControl
                      value={0}
                      placeholder="Room of this type"
                      type="number"
                      id="queen"
                      aria-label="Example text with button addon"
                      aria-describedby="basic-addon1"
                    />
                    <Button variant="phoenix-secondary" id="button-addon1">
                      +
                    </Button>
                  </InputGroup>
                </div>
              </div>
              <div className="d-flex gap-5 mb-4">
                <div className="flex-1">
                  <FormLabel
                    htmlFor="king"
                    className="text-body-highlight fw-bold"
                  >
                    King bed
                  </FormLabel>
                  <InputGroup className="">
                    <Button variant="phoenix-secondary" id="button-addon1">
                      -
                    </Button>
                    <FormControl
                      value={0}
                      placeholder="Room of this type"
                      type="number"
                      id="king"
                      aria-label="Example text with button addon"
                      aria-describedby="basic-addon1"
                    />
                    <Button
                      variant="phoenix-secondary"
                      className="bg-body-emphasis bg-body-hover lh-1"
                      id="button-addon1"
                    >
                      +
                    </Button>
                  </InputGroup>
                </div>
                <div className="flex-1">
                  <FormLabel htmlFor="sofa">Sofa bed</FormLabel>
                  <InputGroup className="">
                    <Button variant="phoenix-secondary" id="button-addon1">
                      -
                    </Button>
                    <FormControl
                      value={0}
                      placeholder="Room of this type"
                      type="number"
                      id="sofa"
                      aria-label="Example text with button addon"
                      aria-describedby="basic-addon1"
                    />
                    <Button variant="phoenix-secondary" id="button-addon1">
                      +
                    </Button>
                  </InputGroup>
                </div>
                <div className="flex-1">
                  <FormLabel htmlFor="extra">Extra bed</FormLabel>
                  <InputGroup className="">
                    <Button variant="phoenix-secondary" id="button-addon1">
                      -
                    </Button>
                    <FormControl
                      value={0}
                      placeholder="Room of this type"
                      type="number"
                      id="extra"
                      aria-label="Example text with button addon"
                      aria-describedby="basic-addon1"
                    />
                    <Button variant="phoenix-secondary" id="button-addon1">
                      +
                    </Button>
                  </InputGroup>
                </div>
              </div>
              <div className="mb-5 mt-7 d-flex gap-2 flex-wrap">
                <Button variant="phoenix-danger">Discard</Button>
                <Button variant="phoenix-primary">Save draft</Button>
                <Button
                  variant="primary"
                  className="px-6 px-sm-11"
                  onClick={() => setKey('finance')}
                >
                  Continue
                </Button>
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="finance">
              <h3 className="mb-4">Pricing</h3>
              <h4 className="mb-2">Base price per night</h4>
              <p className="text-muted">
                Get a great value stay with us, starting at our base price per
                night.
              </p>
            </Tab.Pane>
          </Tab.Content>
          <div className="col-xl-3 col-lg-3 d-flex flex-column align-items-end justify-content-end order-xl-1 mb-3">
            <Nav
              variant="underline"
              className="d-flex flex-lg-column flex-sm-row flex-xl-column flex-md-row flex-sm-row w-lg-25"
              defaultActiveKey="info"
            >
              <Nav.Item>
                <Nav.Link
                  eventKey="info"
                  className="d-flex flex-1 align-items-center gap-5"
                >
                  <UilFile />
                  Details
                </Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link
                  eventKey="finance"
                  className="d-flex align-items-center gap-5"
                >
                  <UilDollarSign />
                  Pricing
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="policies"
                  className="d-flex align-items-center gap-5"
                >
                  <UilCoffee />
                  Amenities
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="photos"
                  className="d-flex align-items-center gap-5"
                >
                  <UilImage />
                  Photos
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="done"
                  className="d-flex align-items-center gap-5"
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
