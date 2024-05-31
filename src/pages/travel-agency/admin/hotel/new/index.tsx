/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import {
  UilCheck,
  UilCoffee,
  UilDollarSign,
  UilFile,
  UilImage,
  UilLocationArrow,
  UilLocationPoint,
  UilPlus,
  UilSearch,
  UilShieldPlus
} from '@iconscout/react-unicons';
import Button from 'components/base/Button';
import Mapbox from 'components/base/MapBox';
import {
  Breadcrumb,
  FloatingLabel,
  Form,
  FormControl,
  InputGroup,
  Nav,
  Tab
} from 'react-bootstrap';
import { Accordion } from 'react-bootstrap';
import { AmenitiesOptions } from '../form-component';
import Dropzone from 'components/base/Dropzone';

export const UploadNewHotelPage = () => {
  const propertyMaxLength: number = 60;
  const propertyDescriptionMaxLength: number = 360;
  const [propertyName, setPropertyName] = useState('With help text');
  const [propertyDescription, setPropertyDescription] = useState('');
  const [key, setKey] = useState<string>('info');

  return (
    <div>
      <Breadcrumb className="mb-0">
        <Breadcrumb.Item href="#!">Page 1</Breadcrumb.Item>
        <Breadcrumb.Item href="#!">Page 2</Breadcrumb.Item>
        <Breadcrumb.Item href="#!" active>
          Default
        </Breadcrumb.Item>
      </Breadcrumb>
      <h2 className="fs-5 my-2">Add New Property</h2>

      <Tab.Container
        defaultActiveKey={key}
        id="controlled-tab-example"
        activeKey={key}
        onSelect={k => setKey(k as string)}
      >
        <div className="d-flex row align-items-end flex-wrap-reverse gap-3 mt-6">
          <Tab.Content defaultValue={key} className="flex-1 col-xl-8">
            <Tab.Pane eventKey="info" className="">
              <h3 className="mb-4">Basic information</h3>
              <h4 className="mb-4">Property Information</h4>
              <FloatingLabel label="property name" className="mb-4">
                <FormControl
                  className="text-sm-start"
                  size="lg"
                  placeholder="Property name"
                  maxLength={propertyMaxLength}
                  value={propertyName}
                  onChange={prop => setPropertyName(prop.target.value)}
                />
                <h5 className="text-end text-body-quaternary fw-semibold mt-2">
                  <span className="text-primary">{propertyName.length}</span> /
                  <span>{propertyMaxLength}</span>
                </h5>
              </FloatingLabel>
              <FloatingLabel label="description" className="mb-4">
                <FormControl
                  size="lg"
                  rows={10}
                  placeholder="description"
                  cols={10}
                  style={{ height: 162 }}
                  as="textarea"
                  maxLength={propertyDescriptionMaxLength}
                  value={propertyDescription}
                  onChange={prop => setPropertyDescription(prop.target.value)}
                />
                <h5 className="text-end text-body-quaternary fw-semibold mt-2">
                  <span className="text-primary">
                    {propertyDescription.length}
                  </span>{' '}
                  /<span>{propertyDescriptionMaxLength}</span>
                </h5>
              </FloatingLabel>
              <div className="d-flex gap-4  mb-4">
                <FloatingLabel label="property name" className="flex-1">
                  <Form.Select>
                    <option>Hotel</option>
                    <option>Flight</option>
                    <option>Trip</option>
                  </Form.Select>
                </FloatingLabel>
                <FloatingLabel label="rating" className=" w-30">
                  <Form.Select>
                    <option>Star 5</option>
                    <option>Start 4</option>
                    <option>Star 3</option>
                    <option>Star 2</option>
                    <option>Star 1</option>
                  </Form.Select>
                </FloatingLabel>
              </div>
              <h4 className="my-3">Contact Information</h4>
              <div className="d-flex align-items-center gap-4 mb-4">
                <FloatingLabel label="email address" className="flex-1">
                  <FormControl placeholder="email address" />
                </FloatingLabel>
                <FloatingLabel label="phone number" className="flex-1">
                  <FormControl placeholder="phone number" />
                </FloatingLabel>
              </div>
              <h4 className="mb-4">Is it part of a hotel / property chain?</h4>
              <div className="d-flex align-items-center flex-row mb-3 gap-4  mb-4">
                <Form.Check
                  type="radio"
                  id="defaultRadio"
                  label="No"
                  name="radio"
                />
                <Form.Check
                  type="radio"
                  id="checkedRadio"
                  label="Yes"
                  name="radio"
                />
                <FloatingLabel
                  label="name of company, group or chain"
                  className="flex-1"
                >
                  <FormControl
                    disabled
                    value="With helper text"
                    placeholder="with helper text"
                  />
                </FloatingLabel>
              </div>
              <div className=" my-4">
                <h4 className="mb-4">
                  Do you use a Channel Management Systems?
                </h4>
                <div className="d-flex flex-row align-items-center flex-row mb-3 gap-4">
                  <Form.Check
                    type="radio"
                    id="defaultRadio"
                    label="No"
                    name="radio"
                  />
                  <Form.Check
                    type="radio"
                    id="checkedRadio"
                    label="Yes"
                    name="radio"
                  />
                  <FloatingLabel label="CMS Provider Name" className="flex-1">
                    <Form.Select as="search">
                      <option value=""></option>
                    </Form.Select>
                  </FloatingLabel>
                </div>
              </div>
              <div className="my-4">
                <Button className=" px-6 px-sm-11" variant="primary">
                  Next
                </Button>
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="location">
              <div className="flex-lg-column gap-4">
                <h3 className="mb-4">Location</h3>
                <InputGroup className="flex-row align-items-center">
                  <Button variant="phoenix-primary">
                    <UilLocationPoint />
                  </Button>
                  <FloatingLabel label="search address">
                    <FormControl as="input" placeholder="search address" />
                  </FloatingLabel>
                  <Button variant="phoenix-primary">
                    <UilLocationArrow />
                  </Button>
                </InputGroup>
                <Mapbox
                  accessKey={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
                  className="rounded-4 w-100 border my-4"
                  style={{ height: 250, width: '100%' }}
                  options={{
                    center: [-74.0020158, 40.7228022],
                    zoom: 14,
                    scrollZoom: false
                  }}
                />
                <FloatingLabel label="apartment / street">
                  <FormControl as="input" placeholder="apartment" />
                </FloatingLabel>
                <div className="d-flex mt-4 gap-3">
                  <FloatingLabel label="city" className="flex-1">
                    <FormControl as="input" placeholder="city" />
                  </FloatingLabel>

                  <FloatingLabel label="state (optional)" className="flex-1">
                    <FormControl as="input" placeholder="state" />
                  </FloatingLabel>
                </div>
                <div className="d-flex mt-4 gap-3">
                  <FloatingLabel label="zip code" className="flex-1">
                    <FormControl as="input" placeholder="zip code" />
                  </FloatingLabel>

                  <FloatingLabel label="country / region" className="flex-1">
                    <FormControl as="input" placeholder="country / region" />
                  </FloatingLabel>
                </div>
                <div className="form-check form-switch my-4 mx-0">
                  <input
                    className="form-check-input"
                    id="flexSwitchCheckChecked"
                    type="checkbox"
                    checked
                  />
                  <label htmlFor="flexSwitchCheckChecked" className="mb-1">
                    <h5>Show your specific location</h5>
                  </label>
                </div>
                <div className="my-4">
                  <Button className=" px-6 px-sm-11" variant="primary">
                    Next
                  </Button>
                </div>
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="amenities">
              <div className="flex-lg-column gap-4">
                <div className="flex-row d-flex gap-3 align-items-center">
                  <InputGroup className="flex-1">
                    <FloatingLabel label="search amenities">
                      <FormControl as="input" placeholder="search" />
                    </FloatingLabel>
                    <Button variant="phoenix-primary">
                      <UilSearch />
                    </Button>
                  </InputGroup>
                  <Button
                    variant="phoenix-primary"
                    className="fs-8"
                    startIcon={<UilPlus />}
                  >
                    {/* <UilPlus /> */}
                    Add amenity
                  </Button>
                </div>
                <Accordion draggable defaultActiveKey="0" className="py-3 mt-3">
                  {AmenitiesOptions.map(
                    ({ Icon, eventKey, label, options }) => (
                      <>
                        <Accordion.Item
                          eventKey={eventKey}
                          className="border-bottom border-300 "
                        >
                          <Accordion.Header>
                            <div className="gap-4 d-flex flex-row gap-2 align-items-center">
                              <div className="border border-2 border-primary p-2 rounded-5">
                                <Icon />
                              </div>
                              {label}
                            </div>
                          </Accordion.Header>
                          <Accordion.Body className="pt-0 d-flex flex-column gap-3 mt-3">
                            {options.map(({ checked, label, radioItem }) => (
                              <div
                                key={label}
                                className="border d-flex flex-row align-items-center justify-content-between w-100 pt-4 rounded-2 p-3"
                              >
                                <Form.Check
                                  checked={checked}
                                  type="switch"
                                  id="defaultSwitch"
                                  label={
                                    <h4 className="fw-bold text-capitalize fs-8">
                                      {label}
                                    </h4>
                                  }
                                />
                                <div className="d-flex flex-row gap-3">
                                  {checked &&
                                    radioItem.map((label, i) => (
                                      <Form.Check
                                        key={label}
                                        type="radio"
                                        id="checkedRadio"
                                        label={
                                          <h6 className="text-capitalize">
                                            {label}
                                          </h6>
                                        }
                                        defaultChecked={i === 0}
                                        name="radio"
                                      />
                                    ))}
                                </div>
                              </div>
                            ))}
                          </Accordion.Body>
                        </Accordion.Item>
                      </>
                    )
                  )}
                </Accordion>
                <div className="my-4">
                  <Button className=" px-6 px-sm-11" variant="primary">
                    Next
                  </Button>
                </div>
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="photos">
              <h3 className="mb-4">Add property picture</h3>
              <div className="border-2 rounded-2 border-gray-900 border-dashed">
                <Dropzone
                  // multiple={false}
                  onDrop={acceptedFiles => console.log(acceptedFiles)}
                />
                <div className="my-4">
                  <Button className=" px-6 px-sm-11" variant="primary">
                    Next
                  </Button>
                </div>
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="finance">
              <div className="d-flex flex-column gap-4">
                <h3 className="mb-2">Finance</h3>
                <h4 className="mb-2">
                  Payment from Phoenix Booking Management
                </h4>
                <div className="d-flex gap-4">
                  <FloatingLabel className="flex-1" label="payment currency">
                    <FormControl placeholder="INR" value="INR" disabled />
                  </FloatingLabel>
                  <FloatingLabel
                    className="flex-1"
                    label="Commission Percentage"
                  >
                    <FormControl placeholder="INR" value="FLAT 10%" disabled />
                  </FloatingLabel>
                </div>
                <FloatingLabel label="select payment method">
                  <Form.Select>
                    <option>Electronic Funds Transfer (EFT)</option>
                    <option>Option 1</option>
                    <option>Option 2</option>
                  </Form.Select>
                </FloatingLabel>
                <Form.Check
                  type="checkbox"
                  id="checkedCheckbox"
                  label={
                    <p className="fs-8 fw-normal">
                      Invoice to the name and address of property
                    </p>
                  }
                  defaultChecked
                />
                <FloatingLabel label="invoice email" style={{ marginTop: -20 }}>
                  <FormControl
                    as="input"
                    type="email"
                    placeholder="invoice email"
                  />
                </FloatingLabel>
                <div className="d-flex flex-row gap-3">
                  <Form.Check
                    type="radio"
                    id="creditCard"
                    label={
                      <label htmlFor="creditCard" className="fs-8 fw-normal">
                        Credit Card
                      </label>
                    }
                    name="radio"
                  />
                  <Form.Check
                    type="radio"
                    id="bankAccount"
                    label={
                      <label htmlFor="bankAccount" className="fs-8 fw-normal">
                        Bank Account
                      </label>
                    }
                    name="radio"
                  />
                  <Form.Check
                    type="radio"
                    id="online"
                    label={
                      <label htmlFor="online" className="fs-8 fw-normal">
                        Online
                      </label>
                    }
                    name="radio"
                  />
                </div>
                <div className="d-flex gap-3 flex-row">
                  <FloatingLabel label="select card" className="flex-1">
                    <Form.Select>
                      <option>Visa Debit Card</option>
                      <option>Option 1</option>
                      <option>Option 2</option>
                    </Form.Select>
                  </FloatingLabel>
                  <FloatingLabel label="Card number" className="flex-1">
                    <FormControl placeholder="card number" />
                  </FloatingLabel>
                </div>
                <FloatingLabel label="Card holder name">
                  <FormControl placeholder="card holder name" />
                </FloatingLabel>
                <h4 className="mb-2">Payment from Guests (On property)</h4>
                <div className="border d-flex flex-row align-items-center justify-content-between w-100 pt-3 px-3 rounded-2 p-2">
                  <Form.Check
                    type="switch"
                    id="defaultSwitch"
                    label={
                      <h4 className="fw-bold text-capitalize fs-8">
                        Cash Payment
                      </h4>
                    }
                  />
                </div>
                <div className="border d-flex flex-row align-items-center justify-content-between w-100 pt-3 px-3 rounded-2 p-2">
                  <Form.Check
                    type="switch"
                    id="defaultSwitch"
                    label={
                      <h4 className="fw-bold text-capitalize fs-8">
                        Card Payment
                      </h4>
                    }
                  />
                </div>
                <div className="border d-flex flex-row align-items-center justify-content-between w-100 pt-3 px-3 rounded-2 p-2">
                  <Form.Check
                    type="switch"
                    id="defaultSwitch"
                    label={
                      <h4 className="fw-bold text-capitalize fs-8">
                        MFS / Online Payment
                      </h4>
                    }
                  />
                </div>
                <div className="my-4">
                  <Button className=" px-6 px-sm-11" variant="primary">
                    Next
                  </Button>
                </div>
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="policies">
              <div className="d-flex flex-column gap-4">
                <h3 className="mb-2">Policies</h3>
                <div className="d-flex flex-row gap-3">
                  <Form.Check
                    checked
                    type="radio"
                    label={<p className="fs-8 fw-normal">Limited Check-in</p>}
                  />
                  <Form.Check
                    type="radio"
                    label={<p className="fs-8 fw-normal">24 hour Check-in</p>}
                  />
                </div>
                <div
                  className="d-flex gap-3 align-items-center"
                  style={{ marginTop: -20 }}
                >
                  <FloatingLabel label="check-in start" className="flex-1">
                    <FormControl placeholder="check-in start" />
                  </FloatingLabel>

                  <FloatingLabel label="check-in ends" className="flex-1">
                    <FormControl placeholder="check-in ends" />
                  </FloatingLabel>
                  <Form.Check
                    className="mt-3"
                    type="checkbox"
                    defaultChecked
                    label={<p className="fs-8 fw-normal">Late Check-in</p>}
                  />
                </div>
                <div className="border d-flex flex-row align-items-center justify-content-between w-100 pt-4 rounded-2 p-3">
                  <Form.Check
                    type="switch"
                    id="defaultSwitch"
                    label={
                      <h4 className="fw-bold text-capitalize fs-8">
                        Age Restriction
                      </h4>
                    }
                  />
                </div>
                <div className="border d-flex flex-row align-items-center justify-content-between w-100 pt-4 rounded-2 p-3">
                  <Form.Check
                    type="switch"
                    id="defaultSwitch"
                    label={
                      <h4 className="fw-bold text-capitalize fs-8">
                        Deposit Check-in
                      </h4>
                    }
                  />
                </div>
                <div className="border d-flex flex-row align-items-center justify-content-between w-100 pt-4 rounded-2 p-3">
                  <Form.Check
                    type="switch"
                    id="defaultSwitch"
                    label={
                      <h4 className="fw-bold text-capitalize fs-8">
                        Document at Check-in
                      </h4>
                    }
                  />
                </div>
                <h4 className="mb-2">Checkout Policy</h4>
                <FloatingLabel label="checkout before">
                  <FormControl placeholder="checkout before" />
                </FloatingLabel>
                <div className="border d-flex flex-row align-items-center justify-content-between w-100 pt-4 rounded-2 p-3">
                  <Form.Check
                    type="switch"
                    id="defaultSwitch"
                    label={
                      <h4 className="fw-bold text-capitalize fs-8">
                        Flexible Checkout
                      </h4>
                    }
                  />
                </div>
                <h4 className="mb-2">Cancellation Policy</h4>
                <div className="d-flex gap-3 align-items-center">
                  <Form.Check
                    type="radio"
                    id="defaultSwitch"
                    label={
                      <h4 className="fw-normal text-capitalize fs-8">
                        Non Refundable
                      </h4>
                    }
                  />
                  <Form.Check
                    type="radio"
                    id="defaultSwitch"
                    label={
                      <h4 className="fw-normal text-capitalize fs-8">
                        Optional Refund
                      </h4>
                    }
                  />
                </div>
                <div className="border d-flex flex-row align-items-center justify-content-between w-100 pt-4 rounded-2 p-3">
                  <Form.Check
                    type="switch"
                    id="defaultSwitch"
                    label={
                      <h4 className="fw-bold text-capitalize fs-8">
                        Full Refund
                      </h4>
                    }
                  />
                </div>
                <div className="border d-flex flex-row align-items-center justify-content-between w-100 pt-4 rounded-2 p-3">
                  <Form.Check
                    type="switch"
                    id="defaultSwitch"
                    label={
                      <h4 className="fw-bold text-capitalize fs-8">
                        Partial Checkout
                      </h4>
                    }
                  />
                </div>
                <h4 className="mb-2">Pet Policy</h4>
                <div className="d-flex gap-3 align-items-center">
                  <Form.Check
                    type="radio"
                    id="defaultSwitch"
                    label={
                      <h4 className="fw-normal text-capitalize fs-8">
                        Non Allowed
                      </h4>
                    }
                  />
                  <Form.Check
                    type="radio"
                    id="defaultSwitch"
                    label={
                      <h4 className="fw-normal text-capitalize fs-8">
                        Allowed
                      </h4>
                    }
                  />
                </div>
                <div className="border d-flex flex-row align-items-center justify-content-between w-100 pt-4 rounded-2 p-3">
                  <Form.Check
                    type="switch"
                    id="defaultSwitch"
                    label={
                      <h4 className="fw-bold text-capitalize fs-8">
                        Pet Restricted Zones
                      </h4>
                    }
                  />
                </div>
                <div className="border d-flex flex-row align-items-center justify-content-between w-100 pt-4 rounded-2 p-3">
                  <Form.Check
                    type="switch"
                    id="defaultSwitch"
                    label={
                      <h4 className="fw-bold text-capitalize fs-8">
                        Additional Charges
                      </h4>
                    }
                  />
                </div>
                <h4 className="mb-2">Child Policy</h4>
                <div>
                  <h5 className="mb-2">Age Segment 1</h5>
                  <div className="d-flex gap-3">
                    <FloatingLabel label="from (yrs)" style={{ width: '15%' }}>
                      <FormControl
                        placeholder="years"
                        value={0}
                        type="number"
                      />
                    </FloatingLabel>
                    <div className="flex-1">
                      <Form.Range min="0" max="5" />
                    </div>
                    <FloatingLabel label="to (yrs)" style={{ width: '15%' }}>
                      <FormControl
                        placeholder="years"
                        value={0}
                        type="number"
                      />
                    </FloatingLabel>
                  </div>
                </div>
                <div>
                  <h5 className="mb-2">Age Segment 2</h5>
                  <div className="d-flex gap-3">
                    <FloatingLabel label="from (yrs)" style={{ width: '15%' }}>
                      <FormControl
                        placeholder="years"
                        value={0}
                        type="number"
                      />
                    </FloatingLabel>
                    <div className="flex-1">
                      <Form.Range min="0" max="5" />
                    </div>
                    <FloatingLabel label="to (yrs)" style={{ width: '15%' }}>
                      <FormControl
                        placeholder="years"
                        value={0}
                        type="number"
                      />
                    </FloatingLabel>
                  </div>
                </div>
                <div>
                  <h5 className="mb-2">
                    Age Segment 3{' '}
                    <span className="text-primary fs-9 fw-normal">Remove</span>
                  </h5>
                  <div className="d-flex gap-3">
                    <FloatingLabel label="from (yrs)" style={{ width: '15%' }}>
                      <FormControl
                        placeholder="years"
                        value={0}
                        type="number"
                      />
                    </FloatingLabel>
                    <div className="flex-1">
                      <Form.Range min="0" max="5" />
                    </div>
                    <FloatingLabel label="to (yrs)" style={{ width: '15%' }}>
                      <FormControl
                        placeholder="years"
                        value={0}
                        type="number"
                      />
                    </FloatingLabel>
                  </div>
                </div>
                <div>
                  <Button
                    className="fs-8 fw-semibold"
                    startIcon={<UilPlus />}
                    variant="link"
                  >
                    Add Segment
                  </Button>
                </div>
                <div className="border d-flex flex-row align-items-center justify-content-between w-100 pt-4 rounded-2 p-3">
                  <Form.Check
                    type="switch"
                    id="defaultSwitch"
                    label={
                      <h4 className="fw-bold text-capitalize fs-8">
                        Documentation Requirement
                      </h4>
                    }
                  />
                </div>
                <h4 className="mb-2">Included Taxes in your rate</h4>
                <div className="border d-flex flex-row align-items-center justify-content-between w-100 pt-4 rounded-2 p-3">
                  <Form.Check
                    type="switch"
                    id="defaultSwitch"
                    label={
                      <h4 className="fw-bold text-capitalize fs-8">VAT</h4>
                    }
                  />
                </div>
                <div className="border d-flex flex-row align-items-center justify-content-between w-100 pt-4 rounded-2 p-3">
                  <Form.Check
                    type="switch"
                    id="defaultSwitch"
                    label={
                      <h4 className="fw-bold text-capitalize fs-8">GST</h4>
                    }
                  />
                </div>
                <div className="border d-flex flex-row align-items-center justify-content-between w-100 pt-4 rounded-2 p-3">
                  <Form.Check
                    type="switch"
                    id="defaultSwitch"
                    label={
                      <h4 className="fw-bold text-capitalize fs-8">
                        Hotel tax
                      </h4>
                    }
                  />
                </div>
                <div className="border d-flex flex-row align-items-center justify-content-between w-100 pt-4 rounded-2 p-3">
                  <Form.Check
                    type="switch"
                    id="defaultSwitch"
                    label={
                      <h4 className="fw-bold text-capitalize fs-8">
                        City / District tax
                      </h4>
                    }
                  />
                </div>
                <div className="border d-flex flex-row align-items-center justify-content-between w-100 pt-4 rounded-2 p-3">
                  <Form.Check
                    type="switch"
                    id="defaultSwitch"
                    label={
                      <h4 className="fw-bold text-capitalize fs-8">
                        Tourist tax
                      </h4>
                    }
                  />
                </div>
                <h4 className="mb-2">Your Documentations</h4>
                <FloatingLabel label="property registration no. (optional)">
                  <FormControl placeholder="property" />
                </FloatingLabel>
                <FloatingLabel label="business registration no. (optional)">
                  <FormControl placeholder="business" />
                </FloatingLabel>
                <FloatingLabel label="taxpayer identification no.">
                  <FormControl placeholder="business" />
                </FloatingLabel>
                <div className="my-4">
                  <Button className=" px-6 px-sm-11" variant="primary">
                    Next
                  </Button>
                </div>
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="done">
              <h4 className="mb-2">We’re building your property</h4>
              <p className="mb-5 text-body-tertiary">
                We're working on getting your property set up and ready for
                guests. Stay tuned for updates and start accepting bookings
                soon!
              </p>
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
                  Info
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  className="d-flex flex-1 align-items-center gap-3"
                  eventKey="location"
                >
                  <UilLocationPoint />
                  Location
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="amenities"
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
                  eventKey="finance"
                  className="d-flex align-items-center gap-3"
                >
                  <UilDollarSign />
                  Finance
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="policies"
                  className="d-flex align-items-center gap-3"
                >
                  <UilShieldPlus />
                  Policies
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
