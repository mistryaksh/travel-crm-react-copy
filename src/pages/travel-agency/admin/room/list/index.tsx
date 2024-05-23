import React, { useEffect } from 'react';

import Button from 'components/base/Button';
import { Breadcrumb } from 'react-bootstrap';
import SearchBox from 'components/common/SearchBox';
import FilterTab from 'components/common/FilterTab';
import { useGetRoomsQuery } from '../../../../../redux/api';
import AdvanceTableProvider from 'providers/AdvanceTableProvider';
import AdvanceTable from 'components/base/AdvanceTable';
import AdvanceTableFooter from 'components/base/AdvanceTableFooter';
import useAdvanceTable from 'hooks/useAdvanceTable';
import { IAmenityProps, IRoomProps, useColumnsProps } from 'interface';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBaby,
  faBath,
  faBed,
  faPersonShelter,
  faUser,
  faBorderAll
} from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import RevealDropdown, {
  RevealDropdownTrigger
} from 'components/base/RevealDropdown';
import ActionDropdownItems from 'components/common/ActionDropdownItems';

export const ListRoomsPage = () => {
  const { isError, error, data, isLoading } = useGetRoomsQuery();
  const pageSize: number = 15;

  useEffect(() => {
    if (isError) {
      console.log(error);
    }
  }, [isError, error]);

  const columns: useColumnsProps<IRoomProps>[] = [
    {
      accessorKey: 'photos',
      header: 'Room Information',
      cell: ({ row }) => {
        const { photos, room_name, room_category, base_price } = row.original;
        return (
          <div className="d-flex gap-3 align-items-center my-2 pt-0 pb-0">
            <img
              width="80"
              className="object-fit-cover"
              src={photos[0]}
              alt={room_name}
            />
            <div className="d-flex flex-column gap-0">
              <Link
                to="#"
                className="fs-8 fw-bolder text-body-emphasis text-nowrap text-decoration-none"
              >
                {room_name}
              </Link>
              <p className="text-capitalize fw-semibold text-body text-nowrap mt-0 mb-2 d-flex flex-row gap-1 align-items-center">
                <FontAwesomeIcon icon={faBorderAll} />
                {room_category[0]?.category_name}
              </p>
              <h4 className="mt-0 mb-0 f2-bolder">$ {base_price} /-</h4>
            </div>
          </div>
        );
      }
    },
    {
      accessorKey: 'number_of_beds',
      header: 'no. of beds',

      cell: ({ row }) => {
        const { adult, number_of_beds } = row.original;
        return (
          <div className="d-flex gap-1 align-items-center align-middle">
            <div className="d-flex gap-1 align-items-center">
              <div className="d-flex gap-3 align-items-center justify-content-center bg-primary-subtle p-2 rounded">
                <FontAwesomeIcon
                  icon={faPersonShelter}
                  fontSize={18}
                  color="#3874ff"
                />
              </div>
              <h5 className="text-body-emphasis fw-semibold mb-0 me-3">
                0{adult}
              </h5>
            </div>
            <div className="d-flex gap-1 align-items-center">
              <div className="d-flex align-items-center justify-content-center bg-success-subtle p-2 rounded">
                <FontAwesomeIcon icon={faBed} fontSize={15} color="#25b003" />
              </div>
              <h5 className="text-body-emphasis fw-semibold mb-0 me-3">
                0{number_of_beds}
              </h5>
            </div>
          </div>
        );
      }
    },
    {
      accessorKey: 'adult',
      header: 'no. of guests',
      cell: ({ row }) => {
        const { adult, children } = row.original;
        return (
          <div className="d-flex gap-1 align-items-center">
            <div className="d-flex gap-1 align-items-center">
              <div className="d-flex align-items-center justify-content-center bg-warning-subtle p-2 rounded">
                <FontAwesomeIcon icon={faUser} fontSize={15} color="#E5780B" />
              </div>
              <h5 className="text-body-emphasis fw-semibold mb-0 me-3">
                0{adult}
              </h5>
            </div>
            <div className="d-flex gap-1 align-items-center">
              <div className="d-flex align-items-center justify-content-center bg-warning-subtle p-2     rounded">
                <FontAwesomeIcon icon={faBaby} fontSize={15} color="#E5780B" />
              </div>
              <h5 className="text-body-emphasis fw-semibold mb-0 me-3">
                0{children}
              </h5>
            </div>
          </div>
        );
      }
    },
    {
      accessorKey: 'bathroom',
      cell: ({ row }) => {
        const { bathroom } = row.original;
        return (
          <div>
            <div className="d-flex gap-1 align-items-center">
              <div className="d-flex align-items-center justify-content-center bg-danger-subtle p-1 rounded">
                <FontAwesomeIcon icon={faBath} fontSize={15} color="#EC1F00" />
              </div>
              <h5 className="text-body-emphasis fw-semibold mb-0 me-3">
                0{bathroom}
              </h5>
            </div>
          </div>
        );
      }
    },
    {
      accessorKey: 'amenities',
      meta: {
        cellProps: {
          width: '30%'
        }
      },
      cell: ({ row }) => {
        const { amenities } = row.original;
        return (
          <div className="d-flex gap-3">
            {amenities.length !== 0 &&
              (amenities as IAmenityProps[])?.map(({ amenity_name }) => (
                <div
                  className="bg-primary-lighter rounded-md text-uppercase fs-10 fw-bold text-gray-900 px-2 py-1"
                  key={amenity_name}
                >
                  {amenity_name}
                </div>
              ))}
            {amenities.length === 0 && <p>No amenities avaliable</p>}
          </div>
        );
      }
    },
    {
      accessorKey: 'room_size',
      header: 'room size Sq. m',
      meta: {
        headerProps: {
          className: 'text-end'
        }
      },
      cell: ({ row }) => {
        const { room_size } = row.original;
        return (
          <div className="d-flex flex-row align-items-center gap-3 justify-content-end">
            <h5 className="text-end">{room_size} Sq. m</h5>
            <RevealDropdownTrigger>
              <RevealDropdown>
                <ActionDropdownItems />
              </RevealDropdown>
            </RevealDropdownTrigger>
          </div>
        );
      }
    }
  ];

  const tableOptions = {
    data: data?.data || [],
    columns,
    pageSize: pageSize,
    pagination: true,
    sortable: true,
    selection: true
  };

  const table = useAdvanceTable({
    ...tableOptions,
    sortable: true
  });
  const navigate = useNavigate();
  return (
    <div>
      <Breadcrumb className="mb-0">
        <Breadcrumb.Item href="#!">Home</Breadcrumb.Item>
        <Breadcrumb.Item href="#!">Hotels</Breadcrumb.Item>
        <Breadcrumb.Item href="#!">Room</Breadcrumb.Item>
        <Breadcrumb.Item href="#!" active>
          Listings
        </Breadcrumb.Item>
      </Breadcrumb>
      <h2 className="fs-5 my-4">Room Listing - {data?.data.length}</h2>
      <FilterTab
        className="my-4"
        tabItems={[
          {
            count: data?.data.length as number,
            label: 'All',
            value: 'all',
            onClick: () => {}
          },
          {
            count: data?.data.length as number,
            label: 'Archived',
            value: 'asc',
            onClick: () => {}
          },
          {
            count: data?.data.length as number,
            label: 'Active',
            value: 'desc',
            onClick: () => {}
          }
        ]}
      />
      <div className="d-flex justify-content-between align-content-center">
        <div className="gap-3 d-flex">
          <Button variant="primary" onClick={() => navigate('/admin/new-room')}>
            Create Listing
          </Button>
          <Button variant="phoenix-primary">Exports</Button>
        </div>
        <div className="d-flex gap-3 align-content-center">
          <SearchBox />
        </div>
      </div>
      <div className="mt-5">
        <AdvanceTableProvider {...table}>
          <AdvanceTable
            isLoading={isLoading}
            tableProps={{
              size: 'sm',
              className: 'phoenix-table fs-9 mb-0 border-top border-200'
            }}
            rowClassName="hover-actions-trigger btn-reveal-trigger position-static"
          />
          <AdvanceTableFooter pagination showViewAllBtn={false} />
        </AdvanceTableProvider>
      </div>
    </div>
  );
};
