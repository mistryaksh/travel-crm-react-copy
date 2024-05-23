import { ChangeEvent, useEffect, useState } from 'react';
import {
  useCreateAmenityMutation,
  useDeleteAmenityMutation,
  useGetAmenitiesQuery,
  useGetMasterAmenitiesQuery
} from '../../../../../redux/api';
import { FloatingLabel, Form, Modal } from 'react-bootstrap';
import Button from 'components/base/Button';
import SearchBox from 'components/common/SearchBox';
import FilterTab, { FilterTabItem } from 'components/common/FilterTab';
import AdvanceTableProvider from 'providers/AdvanceTableProvider';
import AdvanceTable from 'components/base/AdvanceTable';
import useAdvanceTable from 'hooks/useAdvanceTable';
import { IAmenityProps, IMasterAmenityProps, useColumnsProps } from 'interface';
import AdvanceTableFooter from 'components/base/AdvanceTableFooter';
import { UilEdit, UilTrash } from '@iconscout/react-unicons';
import { Formik } from 'formik';
import { amenityValidationSchema } from 'validation';
import { faFileExport, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PageBreadcrumb from 'components/common/PageBreadcrumb';
import FilterButtonGroup, {
  FilterMenu
} from 'components/common/FilterButtonGroup';

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
        label: 'Plants'
      },
      {
        label: 'Furniture'
      },
      {
        label: 'Fashion'
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
      },
      {
        label: 'Contact list will here'
      }
    ]
  }
];
export const AmenityPage = () => {
  const {
    data: amenityData,
    isError: isAmenityError,
    error: amenityError,
    isLoading: isAmenityLoading
  } = useGetAmenitiesQuery();
  const {
    isError: isMasterAmenityError,
    error: masterAmenityError,
    data: masterAmenityData,
    isLoading: isMasterAmenityDataLoading
  } = useGetMasterAmenitiesQuery();
  const [
    NewAmenity,
    {
      isError: isNewError,
      error: newError,
      data: newAmenityData,
      isLoading: isNewAmenityLoading,
      isSuccess: isNewAmenitySuccess
    }
  ] = useCreateAmenityMutation();
  const [
    DeleteAmenity,
    {
      isError: isDeleteError,
      error: deleteError,
      data: deleteData,
      isLoading: isDeleteLoading,
      isSuccess: isDeleteSuccess
    }
  ] = useDeleteAmenityMutation();

  const onNewAmenity = async ({
    amenity_name,
    default_action,
    mst_amenities
  }: IAmenityProps) => {
    await NewAmenity({
      amenity_name: amenity_name,
      default_action: default_action,
      mst_amenities: mst_amenities as string
    });
  };

  const OnDeleteAmenity = async (id: string) => {
    return await DeleteAmenity(id);
  };

  const pageSize: number = 10;

  const columns: useColumnsProps<IAmenityProps>[] = [
    {
      accessorKey: 'amenity_name',
      header: 'Room Amenity',
      meta: {
        cellProps: {
          style: {
            width: '20%'
          }
        }
      },
      cell: ({ row }) => {
        const { amenity_name } = row.original;
        return <span className="fs-8 text-capitalize">{amenity_name}</span>;
      }
    },
    {
      accessorKey: 'mst_amenities',
      header: 'Room Master Amenity',
      cell: ({ row }) => {
        const { mst_amenities } = row.original;
        return (
          <span className="text-capitalize">
            {(mst_amenities as IMasterAmenityProps)?.amenity_name as string}
          </span>
        );
      }
    },
    {
      accessorKey: 'id',
      header: 'Actions',
      meta: {
        headerProps: {
          className: 'text-end'
        },
        cellProps: {
          className: 'text-end'
        }
      },
      cell: ({ row }) => {
        const { _id } = row.original;
        return (
          <div className="d-flex gap-3 justify-content-end py-1">
            <div
              className="bg-info-subtle p-1 text-info rounded-1"
              onClick={() => console.log(_id)}
            >
              <UilEdit size={18} />
            </div>
            <div>
              <Button
                className="bg-danger-subtle p-1 text-danger rounded-1"
                onClick={() => OnDeleteAmenity(_id as unknown as string)}
              >
                <UilTrash size={18} />
              </Button>
            </div>
          </div>
        );
      }
    }
  ];
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (isMasterAmenityError) {
      console.log(masterAmenityError);
    }
    if (isAmenityError) {
      console.log(amenityError);
    }
    if (isNewError) {
      if ((newError as unknown as { data: string }).data) {
        console.log((newError as { data: { message: string } }).data.message);
      } else {
        console.log(newError);
      }
    }
    if (isNewAmenitySuccess) {
      setShow(false);
    }
    if (isDeleteError) {
      console.log(deleteError);
    }
    if (isDeleteSuccess) {
      console.log('DELEING SUCCESS', deleteData.data);
    }
    () => {
      setShow(false);
    };
  }, [
    isMasterAmenityError,
    masterAmenityError,
    isNewError,
    newError,
    isNewAmenitySuccess,
    newAmenityData,
    isDeleteError,
    deleteError,
    isAmenityError,
    amenityError
  ]);

  const tableOptions = {
    data: amenityData?.data || [],
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
            label: 'Amenities',
            url: '#!'
          },
          {
            label: 'List',
            active: true
          }
        ]}
      />
      <div className="mb-9">
        <h2 className="mb-4">Amenities</h2>
        <FilterTab tabItems={tabItems} className="mb-2" />
        <AdvanceTableProvider {...table}>
          <div className="mb-4">
            <div className="d-flex flex-wrap gap-3">
              <SearchBox
                placeholder="Search amenities"
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
                <Button variant="primary" onClick={handleShow}>
                  <FontAwesomeIcon icon={faPlus} className="me-2" />
                  Add amenity
                </Button>
              </div>
            </div>
          </div>

          <div className="mx-n4 px-4 mx-lg-n6 px-lg-6 bg-body-emphasis border-top border-bottom border-translucent position-relative top-1">
            <AdvanceTable
              isLoading={
                isAmenityLoading || isNewAmenityLoading || isDeleteLoading
              }
              tableProps={{ className: 'phoenix-table fs-9', size: 'sm' }}
            />
            <AdvanceTableFooter pagination />
          </div>
        </AdvanceTableProvider>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Formik
          initialValues={{
            amenity_name: '',
            default_action: false,
            mst_amenities: ''
          }}
          onSubmit={onNewAmenity}
          validationSchema={amenityValidationSchema}
        >
          {({
            handleBlur,
            handleChange,
            handleSubmit,
            errors,
            touched,
            values
          }) => (
            <Form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
              <Modal.Header closeButton>
                <Modal.Title>Create New Amenity</Modal.Title>
              </Modal.Header>
              <Modal.Body className="d-flex flex-column gap-3">
                <FloatingLabel label="amenity name">
                  <Form.Control
                    size="sm"
                    value={values.amenity_name}
                    onChange={handleChange('amenity_name')}
                    onBlur={handleBlur('amenity_name')}
                    type="text"
                    placeholder="amenity name"
                    autoFocus
                  />
                  {touched.amenity_name && (
                    <p className="text-danger">{errors.amenity_name}</p>
                  )}
                </FloatingLabel>
                {!isMasterAmenityDataLoading && (
                  <Form.Select
                    size="sm"
                    value={values.mst_amenities as string}
                    onChange={handleChange('mst_amenities')}
                    onBlur={handleBlur('mst_amenities')}
                  >
                    <option value={''}>All</option>
                    {masterAmenityData?.data.map(({ amenity_name, id }) => (
                      <option value={id} key={id}>
                        {amenity_name}
                      </option>
                    ))}
                  </Form.Select>
                )}
                <Form.Switch
                  checked={values.default_action as boolean}
                  onChange={handleChange('default_action')}
                  onBlur={handleBlur('default_action')}
                  label="Mark as active"
                />
              </Modal.Body>
              <Modal.Footer>
                <Button
                  type="button"
                  variant="phoenix-secondary"
                  onClick={handleClose}
                >
                  Close
                </Button>
                <Button type="submit" variant="primary">
                  Save Changes
                </Button>
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      </Modal>
    </div>
  );
};
