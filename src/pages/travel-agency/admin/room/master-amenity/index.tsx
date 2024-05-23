import Button from 'components/base/Button';
import FilterTab, { FilterTabItem } from 'components/common/FilterTab';
import SearchBox from 'components/common/SearchBox';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Form, Modal } from 'react-bootstrap';
import {
  useCreateMasterAmenityMutation,
  useDeleteMasterAmenityByIdMutation,
  useGetMasterAmenitiesQuery
} from '../../../../../redux/api';
import AdvanceTableProvider from 'providers/AdvanceTableProvider';
import AdvanceTable from 'components/base/AdvanceTable';
import AdvanceTableFooter from 'components/base/AdvanceTableFooter';
import useAdvanceTable from 'hooks/useAdvanceTable';
import { IMasterAmenityProps, useColumnsProps } from 'interface';
import { UilEdit, UilTrash } from '@iconscout/react-unicons';
import { masterAmenityValidationSchema } from 'validation';
import { Formik } from 'formik';
import { FloatingLabel } from 'react-bootstrap';
import FilterButtonGroup, {
  FilterMenu
} from 'components/common/FilterButtonGroup';
import PageBreadcrumb from 'components/common/PageBreadcrumb';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExport, faPlus } from '@fortawesome/free-solid-svg-icons';

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
      }
    ]
  }
];

export const MasterAmenityPage = () => {
  const {
    isError: isMasterAmenityError,
    error: masterAmenityError,
    data: masterAmenity,
    isLoading: isMasterAmenityLoading
  } = useGetMasterAmenitiesQuery();
  const [
    NewMasterAmenity,
    {
      isError: isNewMasterAmenityError,
      error: newMasterAmenityError,
      data: newMasterAmenity,
      isLoading: isNewMasterAmenityLoading,
      isSuccess: isNewMasterAmenitySuccess
    }
  ] = useCreateMasterAmenityMutation();
  const [
    DeleteMasterAmenity,
    {
      isError: isDeleteMasterAmenityError,
      error: deleteMasterAmenityError,
      data: deleteMasterAmenity,
      isLoading: isDeleteMasterAmenityLoading,
      isSuccess: isDeleteMasterAmenitySuccess
    }
  ] = useDeleteMasterAmenityByIdMutation();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const pageSize: number = 10;

  useEffect(() => {
    if (isMasterAmenityError) {
      console.log(masterAmenityError);
    }
    if (isNewMasterAmenityError) {
      console.log(newMasterAmenityError);
    }
    if (isNewMasterAmenitySuccess) {
      console.log(newMasterAmenity?.data);
      setShow(false);
    }
    if (isDeleteMasterAmenitySuccess) {
      console.log(deleteMasterAmenity.data);
    }
    if (isDeleteMasterAmenityError) {
      console.log(deleteMasterAmenityError);
    }
  }, [
    isMasterAmenityError,
    masterAmenityError,
    isNewMasterAmenityError,
    newMasterAmenityError,
    isNewMasterAmenitySuccess,
    newMasterAmenity?.data,
    isDeleteMasterAmenityError,
    deleteMasterAmenityError
  ]);

  const columns: useColumnsProps<IMasterAmenityProps>[] = [
    {
      accessorKey: 'amenity_name',
      header: 'Room Amenity',
      searchInput: true,
      meta: {
        cellProps: {
          style: {
            width: '80%'
          }
        }
      },
      cell: ({ row }) => {
        const { amenity_name } = row.original;
        return <span className="fs-8 text-capitalize">{amenity_name}</span>;
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
        const { _id, id } = row.original;
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
                onClick={() => onDeleteMasterAmenity(id as unknown as string)}
              >
                <UilTrash size={18} />
              </Button>
            </div>
          </div>
        );
      }
    }
  ];

  const tableOptions = {
    data: masterAmenity?.data || [],
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

  const onNewMasterAmenity = async (props: IMasterAmenityProps) => {
    console.log(props);
    await NewMasterAmenity({ ...props });
  };
  const onDeleteMasterAmenity = async (id: string) => {
    console.log(id);
    await DeleteMasterAmenity(id);
  };

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
        <h2 className="mb-4">Master Amenities</h2>
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
                  Add Master Amenity
                </Button>
              </div>
            </div>
          </div>

          <div className="mx-n4 px-4 mx-lg-n6 px-lg-6 bg-body-emphasis border-top border-bottom border-translucent position-relative top-1">
            <AdvanceTable
              isLoading={
                isMasterAmenityLoading ||
                isNewMasterAmenityLoading ||
                isDeleteMasterAmenityLoading
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
            default_action: false
          }}
          onSubmit={onNewMasterAmenity}
          validationSchema={masterAmenityValidationSchema}
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
