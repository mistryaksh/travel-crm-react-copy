import React from 'react';

import {
  UilCalender,
  UilCloudDrizzle,
  UilLinkAdd,
  UilMinus,
  UilPlus,
  UilPlusCircle,
  UilArrowRight
} from '@iconscout/react-unicons';
import Button from 'components/base/Button';
import Unicon from 'components/base/Unicon';

import {
  LineChart,
  Tooltip,
  ResponsiveContainer,
  Line,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  CartesianGrid,
  Legend,
  ReferenceLine,
  XAxis,
  YAxis
} from 'recharts';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import { Card, CardBody, CardHeader, Col, Form, Row } from 'react-bootstrap';
import EcomTopRegionsTable from 'components/tables/EcomTopRegionsTable';
import FullCalendar from '@fullcalendar/react';
import EcomTopRegionsMap from 'components/leaflet-maps/EcomTopRegionsMap';
import { mapMarkerPoints } from 'data/mapMarkerPoints';

const booking = [
  {
    month: 'nov',
    customer: 250
  },
  {
    month: 'dec',
    customer: 300
  },
  {
    month: 'jan',
    customer: 100
  },
  {
    month: 'feb',
    customer: 350
  }
];

const commission = [
  { name: 'Group A', commission: 400 },
  { name: 'Group B', commission: 300 }
];

const COLORS = ['#eff2f6', '#003CC7'];

const commissionBar = [
  {
    name: 'nov',
    value: 120
  },
  {
    name: 'dec',
    value: 130
  },
  {
    name: 'jan',
    value: 140
  },
  {
    name: 'feb',
    value: 140
  },
  {
    name: 'mar',
    value: 120
  },
  {
    name: 'nov',
    value: 120
  },
  {
    name: 'dec',
    value: 130
  }
];

const data = [
  {
    user: 'user1',
    value: 140
  },
  {
    user: 'user1',
    value: 140
  },
  {
    user: 'user1',
    value: 160
  },
  {
    user: 'user1',
    value: 140
  },
  {
    user: 'user1',
    value: 160
  },
  {
    user: 'user1',
    value: 140
  },
  {
    user: 'user1',
    value: 160
  },
  {
    user: 'user1',
    value: 140
  },
  {
    user: 'user1',
    value: 140
  },
  {
    user: 'user1',
    value: 140
  },
  {
    user: 'user1',
    value: 160
  },
  {
    user: 'user1',
    value: 140
  },
  {
    user: 'user1',
    value: 160
  },
  {
    user: 'user1',
    value: 140
  },
  {
    user: 'user1',
    value: 160
  },
  {
    user: 'user1',
    value: 140
  },
  {
    user: 'user1',
    value: 140
  },
  {
    user: 'user1',
    value: 140
  },
  {
    user: 'user1',
    value: 160
  },
  {
    user: 'user1',
    value: 140
  },
  {
    user: 'user1',
    value: 160
  },
  {
    user: 'user1',
    value: 140
  },
  {
    user: 'user1',
    value: 160
  },
  {
    user: 'user1',
    value: 140
  }
];

const finance = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400
  },
  {
    name: 'Page B',
    uv: -3000,
    pv: 1398,
    amt: 2210
  },
  {
    name: 'Page C',
    uv: -2000,
    pv: -9800,
    amt: 2290
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000
  },
  {
    name: 'Page E',
    uv: -1890,
    pv: 4800,
    amt: 2181
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: -3800,
    amt: 2500
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100
  }
];

const data01 = [
  { name: 'flight', value: 400 },
  { name: 'hotel', value: 300 },

  { name: 'flight', value: 400 },
  { name: 'hotel', value: 500 }
];
const data02 = [
  { name: 'A1', value: 100 },
  { name: 'A2', value: 300 },
  { name: 'B1', value: 100 },
  { name: 'B2', value: 80 },
  { name: 'B3', value: 40 },
  { name: 'B4', value: 30 },
  { name: 'B5', value: 50 },
  { name: 'C1', value: 100 },
  { name: 'C2', value: 200 },
  { name: 'D1', value: 150 },
  { name: 'D2', value: 50 }
];

export const DashboardPage = () => {
  return (
    <>
      <div className="row mb-4 mb-xl-6 mb-xxl-4 gy-3 justify-content-between">
        <div className="col-auto">
          <h2 className="mb-0 text-body-emphasis">Travel Agency</h2>
        </div>
        <div className="col-auto">
          <div className="d-flex gap-3">
            <Button
              startIcon={<Unicon icon={UilLinkAdd} />}
              className="btn btn-outline-phoenix-primary gap-4"
              href="#!"
            >
              New Package
            </Button>
            <Button
              className="btn-primary gap-3"
              startIcon={<Unicon icon={UilCalender} />}
            >
              Book Now
            </Button>
          </div>
        </div>
      </div>
      <Row className="mb-10">
        <Col sm={12} xl={6} lg={6} className="d-flex flex-column gap-5">
          <Row className="border-bottom">
            <Col sm={12} xl={8} lg={8} md={6}>
              <h5>Total Value</h5>
              <h3 className="my-2">$2,345.00</h3>
              <p>
                <span className="bg-primary-subtle border border-primary px-2 rounded-md">
                  <UilPlus size={16} />{' '}
                  <span className="fs-9 text-primary">23.35%</span>
                </span>{' '}
                <span className="text-gray-500 fs-9">From last month</span>
              </p>
            </Col>
            <Col sm={12} xl={4} lg={4} md={6}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  width={500}
                  height={300}
                  data={booking}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5
                  }}
                >
                  <Tooltip />
                  <Line
                    dot={false}
                    type="linear"
                    dataKey="customer"
                    stroke="#bc3803"
                    strokeWidth={2}
                  />
                  <Line type="monotone" dataKey="revenue" stroke="#bc3803" />
                </LineChart>
              </ResponsiveContainer>
            </Col>
          </Row>
          <Row className="border-bottom">
            <Col sm={12} xl={8} lg={8}>
              <h5>Booked Flights</h5>
              <h3 className="my-2">1,432</h3>
              <p>
                <span className="bg-success-subtle border border-success px-2 rounded-md">
                  <UilPlus className="text-success" size={16} />{' '}
                  <span className="fs-9 text-success">23.35%</span>
                </span>{' '}
                <span className="text-gray-500 fs-9">From last month</span>
              </p>
            </Col>
            <Col sm={12} xl={4} lg={4}>
              <div className="d-flex align-items-center gap-5">
                <UilCloudDrizzle size={50} className="text-warning" />
                <div className="d-flex flex-column gap-0">
                  <p className="fs-8 text-muted">Rain Chances</p>
                  <p className="fs-6 fw-bolder">95%</p>
                </div>
              </div>
            </Col>
          </Row>
          <Row className="border-bottom align-center">
            <Col sm={12} xl={8} lg={8}>
              <h5>Commission</h5>
              <h3 className="my-2">$3,339.00</h3>
              <p className="gap-3 d-flex flex-row align-items-center">
                <span className="bg-danger-subtle border border-danger px-2 rounded-md">
                  <UilMinus className="text-danger" size={16} />
                  <span className="fs-9 text-danger">12.21%</span>
                </span>
                <span className="text-gray-500 fs-9">From last month</span>
              </p>
            </Col>
            <Col sm={12} xl={4} lg={4}>
              <ResponsiveContainer
                height={170}
                width={300}
                // className="border"
              >
                <PieChart>
                  <Pie
                    data={commission}
                    cx={90}
                    cy={80}
                    innerRadius={70}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={0}
                    dataKey="commission"
                  >
                    {commission.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </Col>
          </Row>

          <Row className="border-bottom align-center">
            <Col sm={12} xl={8} lg={8}>
              <h5>Canceled Booking</h5>
              <h3 className="my-2">120.00</h3>
              <p className="gap-3 d-flex flex-row align-items-center">
                <span className="bg-danger-subtle border border-danger px-2 rounded-md">
                  <UilMinus className="text-danger" size={16} />
                  <span className="fs-9 text-danger">5.76%</span>
                </span>
                <span className="text-gray-500 fs-9">From last month</span>
              </p>
            </Col>
            <Col
              sm={12}
              xl={4}
              lg={4}
              className="d-flex justify-content-end align-items-center"
            >
              <ResponsiveContainer width="100%" height="50%">
                <BarChart data={commissionBar}>
                  <Tooltip
                  // content={({ payload }) => {
                  //   console.log(payload);
                  //   return <div>{(payload as any)[0].month}</div>;
                  // }}
                  />
                  <Bar radius={[3, 3, 0, 0]} dataKey="value" fill="#003CC7" />
                </BarChart>
              </ResponsiveContainer>
            </Col>
          </Row>
        </Col>
        <Col sm={12} xl={6} lg={6} md={6} className="px-3">
          <div className="d-flex justify-content-between align-items-center">
            <div className="flex-1">
              <h3 className="text-body-highlight">Financial activities</h3>
              <p className="text-muted">Yearly Balance</p>
            </div>
            <div className="d-flex flex-row gap-3">
              <Form.Select>
                <option value="hotel">hotel</option>
                <option value="hotel">flight</option>
                <option value="hotel">trip</option>
              </Form.Select>
              <Button variant="phoenix-primary">
                <UilPlusCircle />
              </Button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={500}>
            <BarChart
              width={500}
              height={300}
              data={finance}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <ReferenceLine y={0} stroke="#000" />
              <Bar dataKey="pv" fill="#8884d8" />
              <Bar dataKey="uv" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </Col>
      </Row>
      <Row className="mb-10">
        <Col sm={12} md={12} xxl={6} xl={6} lg={6}>
          <Card className="p-4">
            <CardHeader className="border-0 p-0">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <h3 className="text-body-highlight">Visitors</h3>
                  <p className="mb-0 text-body-tertiary">
                    Users across countries
                  </p>
                </div>
                <div>
                  <Button variant="phoenix-primary">More</Button>
                </div>
              </div>
            </CardHeader>

            <CardBody className="p-0">
              <h4 className="d-flex align-items-center my-3 gap-2 text-body-highlight mb-3">
                <span
                  className="real-time-user"
                  data-countup='{"endValue":119}'
                >
                  188
                </span>
                <span className="fs-9 fw-normal">User per second</span>
              </h4>
              <ResponsiveContainer width="100%" height={50} className="my-4">
                <BarChart height={40} data={data}>
                  <Tooltip />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]} fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
              <EcomTopRegionsTable />
            </CardBody>
          </Card>
        </Col>
        <Col sm={12} md={12} xxl={6} xl={6} lg={6}>
          <Card className="p-4">
            <CardHeader className="border-0 p-0">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <h3 className="text-body-highlight">Holidays</h3>
                  <p className="mb-0 text-body-tertiary">Holidays next month</p>
                </div>
                <div>
                  <Button
                    variant="phoenix-primary"
                    className="align-items-center"
                    endIcon={<UilArrowRight />}
                  >
                    Calender
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardBody className="p-0">
              <FullCalendar
                height={360}
                events={[
                  { title: 'event 1', date: '2024-05-01' },
                  { title: 'event 2', date: '2024-05-02' }
                ]}
                plugins={[dayGridPlugin]}
                initialView="dayGridMonth"
              />
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row className="mb-10">
        <Col sm={12} md={6} xxl={6} lg={6}>
          <Card className="p-4">
            <CardHeader className="border-0 p-0">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <h3 className="text-body-highlight">Gross Profit</h3>
                  <p className="mb-0 text-body-tertiary">
                    Annual income according to the board
                  </p>
                </div>
                <div>
                  <Button variant="phoenix-primary">More</Button>
                </div>
              </div>
            </CardHeader>
            <CardBody className="p-0">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart width={300} height={300}>
                  <Pie
                    data={data01}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={60}
                    fill="#8884d8"
                  />
                  <Pie
                    data={data02}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    innerRadius={20}
                    outerRadius={20}
                    fill="#8884d8"
                  />
                  <Pie
                    data={data02}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={90}
                    fill="#82ca9d"
                    // label
                  />
                  <Legend
                    content={({ payload }) => {
                      return (
                        <div className="d-flex justify-content-start align-items-center gap-5">
                          <div className="d-flex gap-3 align-items-center">
                            <div
                              style={{
                                backgroundColor: '#82ca9d',
                                padding: 5
                              }}
                            />
                            {(payload as { value: number }[])[0].value}
                          </div>
                          <div className="d-flex gap-3 align-items-center">
                            <div
                              style={{
                                backgroundColor: (
                                  payload as { color: string }[]
                                )[1].color,
                                padding: 5
                              }}
                            />
                            {(payload as { value: number }[])[1].value}
                          </div>
                        </div>
                      );
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </CardBody>
          </Card>
        </Col>
        <Col sm={12} md={6} xxl={6} lg={6}>
          <div className="d-flex justify-content-between align-items-center">
            <div className="flex-1">
              <h3 className="text-body-highlight">Financial activities</h3>
              <p className="text-muted">Completed and canceled bookings</p>
            </div>
            <div className="d-flex flex-row gap-3">
              <Form.Select>
                <option value="hotel">hotel</option>
                <option value="hotel">flight</option>
                <option value="hotel">trip</option>
              </Form.Select>
              <Button variant="phoenix-primary">
                <UilPlusCircle />
              </Button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={500}>
            <BarChart
              width={500}
              height={300}
              data={finance}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              {/* <YAxis /> */}
              <Tooltip />
              <Legend />
              <ReferenceLine y={0} stroke="#000" />
              <Bar dataKey="pv" fill="#8884d8" />
              <Bar dataKey="uv" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </Col>
      </Row>
      <EcomTopRegionsMap data={mapMarkerPoints} />
    </>
  );
};
