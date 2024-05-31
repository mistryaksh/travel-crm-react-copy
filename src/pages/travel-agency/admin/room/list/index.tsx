import React, { ChangeEvent } from 'react';

import Button from 'components/base/Button';
import SearchBox from 'components/common/SearchBox';
import FilterTab, { FilterTabItem } from 'components/common/FilterTab';
import AdvanceTableProvider from 'providers/AdvanceTableProvider';
import AdvanceTable from 'components/base/AdvanceTable';
import AdvanceTableFooter from 'components/base/AdvanceTableFooter';
import useAdvanceTable from 'hooks/useAdvanceTable';
import { IAmenitiesProps, IRoomProps, useColumnsProps } from 'interface';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBaby,
  faBath,
  faBed,
  faPersonShelter,
  faUser,
  faBorderAll,
  faFileExport,
  faPlus
} from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import RevealDropdown, {
  RevealDropdownTrigger
} from 'components/base/RevealDropdown';
import ActionDropdownItems from 'components/common/ActionDropdownItems';
import PageBreadcrumb from 'components/common/PageBreadcrumb';
import FilterButtonGroup, {
  FilterMenu
} from 'components/common/FilterButtonGroup';
import Badge from 'components/base/Badge';

const tabItems: FilterTabItem[] = [
  {
    label: 'All',
    value: 'all',
    count: 68817
  },
  {
    label: 'Archived',
    value: 'archived',
    count: 70348
  },
  {
    label: 'Trash',
    value: 'trash',
    count: 17
  }
];
const filterMenus: FilterMenu[] = [
  {
    label: 'Category',
    items: [
      {
        label: 'Single'
      },
      {
        label: 'King'
      },
      {
        label: 'Queen'
      }
    ]
  },
  {
    label: 'Contacts',
    items: [
      {
        label: 'Blue Olive Plant sellers. Inc'
      },
      {
        label: 'Beatrice Furnitures'
      },
      {
        label: 'Kizzstore'
      }
    ]
  }
];

export const ListRoomsPage = () => {
  const pageSize: number = 15;

  const columns: useColumnsProps<IRoomProps>[] = [
    {
      accessorKey: 'photos',
      header: 'Room Information',
      meta: {
        headerProps: { style: { width: 350 }, className: 'ps-4' },
        cellProps: { className: 'ps-4' }
      },
      cell: ({ row }) => {
        const { photos, room_name } = row.original;
        return (
          <div className="d-flex gap-3 align-items-center my-2 pt-0 pb-0">
            <img width={53} src={photos[0]} alt={room_name} />
            <div className="d-flex flex-column gap-0">
              <Link to="#" className="fw-semibold line-clamp-3">
                {room_name}
              </Link>
              <span className="text-capitalize fw-semibold text-body text-nowrap mt-0 mb-2 d-flex flex-row gap-1 align-items-center">
                <FontAwesomeIcon icon={faBorderAll} />
                {/* {room_category[0]} */}
              </span>
            </div>
          </div>
        );
      }
    },
    {
      accessorKey: 'base_price',
      accessorFn: ({ base_price }) => `${base_price}`,
      header: 'Price',
      meta: {
        headerProps: { style: { width: 150 }, className: 'ps-4 text-end' },
        cellProps: { className: 'fw-bold ps-4 text-body-tertiary text-end' }
      },
      cell: ({ row: { original } }) => {
        const { base_price } = original;
        return <span className="fw-bold">$ {base_price}</span>;
      }
    },
    {
      accessorKey: 'number_of_beds',
      header: 'no. of beds',

      meta: {
        headerProps: { style: { width: 150 }, className: 'ps-4 text-end' },
        cellProps: { className: 'fw-bold ps-4 text-body-tertiary text-end' }
      },

      cell: ({ row }) => {
        const { adult, number_of_beds } = row.original;
        return (
          <div className="d-flex gap-1 align-items-center justify-content-end">
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

      meta: {
        headerProps: { style: { width: 150 }, className: 'ps-4 text-end' },
        cellProps: { className: 'fw-bold ps-4 text-body-tertiary text-end' }
      },
      cell: ({ row }) => {
        const { adult, children } = row.original;
        return (
          <div className="d-flex gap-1 align-items-center justify-content-end">
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

      meta: {
        headerProps: { style: { width: 150 }, className: 'ps-4 text-end' },
        cellProps: { className: 'fw-bold ps-4 text-body-tertiary text-end' }
      },
      cell: ({ row }) => {
        const { bathroom } = row.original;
        return (
          <div>
            <div className="d-flex gap-1 align-items-center justify-content-end">
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
        headerProps: { style: { width: 450 }, className: 'ps-3' },
        cellProps: { style: { minWidth: 225 }, className: 'ps-3' }
      },
      cell: ({ row }) => {
        const { amenities } = row.original;
        return (
          <div className="d-flex flex-wrap gap-2">
            {amenities.length !== 0 &&
              (amenities as IAmenitiesProps[])?.map(({ AmenitiesName }) => (
                <Link
                  key={AmenitiesName}
                  to="#"
                  className="text-decoration-none"
                >
                  <Badge variant="tag">{AmenitiesName}</Badge>
                </Link>
              ))}
            {amenities.length === 0 && <span>No amenities avaliable</span>}
          </div>
        );
      }
    },
    {
      accessorKey: 'room_size',
      header: 'room size Sq. m',
      meta: {
        headerProps: { style: { width: 150 } },
        cellProps: { className: 'text-end' }
      },
      cell: ({ row }) => {
        const { room_size } = row.original;
        return (
          <div className="d-flex flex-row align-items-center gap-3 justify-content-end">
            <h5 className="text-end">{room_size} Sq. m</h5>
          </div>
        );
      }
    },
    {
      id: 'action',
      cell: () => (
        <RevealDropdownTrigger>
          <RevealDropdown>
            <ActionDropdownItems />
          </RevealDropdown>
        </RevealDropdownTrigger>
      ),
      meta: {
        headerProps: { style: { width: '7%' } },
        cellProps: { className: 'text-end' }
      }
    }
  ];

  const tableOptions = {
    data: [],
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

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    table.setGlobalFilter(e.target.value || undefined);
  };

  return (
    <div>
      <PageBreadcrumb
        items={[
          {
            label: 'Home',
            url: '#!'
          },
          {
            label: 'Rooms',
            url: '#!'
          },
          {
            label: 'List',
            active: true
          }
        ]}
      />
      <div className="mb-9">
        <h2 className="mb-4">Room Listing</h2>
        <FilterTab tabItems={tabItems} className="mb-2" />
        <AdvanceTableProvider {...table}>
          <div className="mb-4">
            <div className="d-flex flex-wrap gap-3">
              <SearchBox
                placeholder="Search rooms"
                onChange={handleSearchInputChange}
              />
              <div className="scrollbar overflow-hidden-y">
                <FilterButtonGroup menus={filterMenus} />
              </div>
              <div className="ms-xxl-auto">
                <Button variant="link" className="text-body me-4 px-0">
                  <FontAwesomeIcon icon={faFileExport} className="fs-9 me-2" />
                  Export
                </Button>
                <Button
                  variant="primary"
                  onClick={() => navigate('/admin/new-room')}
                >
                  <FontAwesomeIcon icon={faPlus} className="me-2" />
                  Add Room
                </Button>
              </div>
            </div>
          </div>

          <div className="mx-n4 px-4 mx-lg-n6 px-lg-6 bg-body-emphasis border-top border-bottom border-translucent position-relative top-1">
            <AdvanceTable
              tableProps={{ className: 'phoenix-table fs-9', size: 'sm' }}
            />
            <AdvanceTableFooter pagination />
          </div>
        </AdvanceTableProvider>
      </div>
    </div>
  );
};

export * from './room-category';
