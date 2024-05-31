import { ChangeEvent, useEffect, useState } from 'react';

import { FloatingLabel, Form, Modal } from 'react-bootstrap';
import Button from 'components/base/Button';
import SearchBox from 'components/common/SearchBox';
import FilterTab, { FilterTabItem } from 'components/common/FilterTab';
import AdvanceTableProvider from 'providers/AdvanceTableProvider';
import AdvanceTable from 'components/base/AdvanceTable';
import useAdvanceTable from 'hooks/useAdvanceTable';
import { IAmenitiesCategoryProps, useColumnsProps } from 'interface';
import AdvanceTableFooter from 'components/base/AdvanceTableFooter';
import { UilEdit, UilTrash } from '@iconscout/react-unicons';
import { Formik } from 'formik';
import { faFileExport, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PageBreadcrumb from 'components/common/PageBreadcrumb';
import FilterButtonGroup, {
  FilterMenu
} from 'components/common/FilterButtonGroup';
import {
  useAddAmenityCategoryMutation,
  useDeleteAmenityCategoryMutation,
  useGetAmenityCategoryQuery
} from '../../../../../redux/api';
import { amenityCategoryValidationSchema } from 'validation';

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
    isLoading: isAmenityLoading,
    isSuccess: isAmenitySuccess
  } = useGetAmenityCategoryQuery();
  const [
    AddAmenityCategory,
    {
      isError: isNewError,
      error: newError,
      isLoading: isNewLoading,
      isSuccess: isNewSuccess,
      data: newData
    }
  ] = useAddAmenityCategoryMutation();
  const [
    DeleteAmenityCategory,
    {
      isError: isDeleteAmenityError,
      error: deleteAmenityError,
      isLoading: isDeleteAmenityLoading,
      isSuccess: isDeleteAmenitySuccess,
      data: deleteAmenityData
    }
  ] = useDeleteAmenityCategoryMutation();

  const onNewAmenity = async ({
    AmenitiesCategory,
    AmenitiesCategoryIcon
  }: IAmenitiesCategoryProps) => {
    await AddAmenityCategory({ AmenitiesCategory, AmenitiesCategoryIcon });
  };

  const OnDeleteAmenity = async (id: string) => {
    await DeleteAmenityCategory(id);
  };

  const pageSize: number = 10;

  const columns: useColumnsProps<IAmenitiesCategoryProps>[] = [
    {
      accessorKey: 'AmenitiesName',
      header: 'Room Amenity',
      meta: {
        cellProps: {
          style: {
            width: '20%'
          }
        }
      },
      cell: ({ row }) => {
        const { AmenitiesCategory } = row.original;
        return (
          <span className="fs-8 text-capitalize">{AmenitiesCategory}</span>
        );
      }
    },
    {
      accessorKey: 'AmenitiesCategorySystem',
      header: 'Room Master Amenity',
      cell: ({ row }) => {
        const { AmenitiesCategorySystem } = row.original;
        return (
          <span className="text-capitalize">{AmenitiesCategorySystem}</span>
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
        const { AmenitiesCategoryId } = row.original;
        return (
          <div className="d-flex gap-3 justify-content-end py-1">
            <div
              className="bg-info-subtle p-1 text-info rounded-1"
              onClick={() => console.log(AmenitiesCategoryId)}
            >
              <UilEdit size={18} />
            </div>
            <div>
              <Button
                className="bg-danger-subtle p-1 text-danger rounded-1"
                onClick={() =>
                  OnDeleteAmenity(AmenitiesCategoryId as unknown as string)
                }
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
    if (isAmenityError) {
      console.log(amenityError);
    }
    if (isAmenitySuccess) {
      console.log(amenityData?.data);
    }
    if (isNewError) {
      console.log(newError);
    }
    if (isNewSuccess) {
      console.log(newData?.data);
      setShow(false);
    }
    if (isDeleteAmenityError) {
      console.log(deleteAmenityError);
    }
    if (isDeleteAmenitySuccess) {
      console.log(deleteAmenityData.data);
    }
  }, [
    isAmenityError,
    amenityError,
    isAmenitySuccess,
    amenityData?.data,
    isNewError,
    newError,
    isNewSuccess,
    newData?.data,
    isDeleteAmenityError,
    deleteAmenityError,
    isDeleteAmenitySuccess,
    deleteAmenityData?.data
  ]);

  const tableOptions = {
    data: (amenityData?.data as IAmenitiesCategoryProps[]) || [],
    columns,
    pageSize: pageSize,
    pagination: true,
    sortable: true,
    selection: true
  };

  const table = useAdvanceTable({
    ...tableOptions
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
        <h2 className="mb-4">Amenities Category</h2>
        <FilterTab tabItems={tabItems} className="mb-2" />
        <AdvanceTableProvider {...table}>
          <div className="mb-4">
            <div className="d-flex flex-wrap gap-3">
              <SearchBox
                placeholder="Search amenities category"
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
                isAmenityLoading || isNewLoading || isDeleteAmenityLoading
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
            AmenitiesCategory: '',
            AmenitiesCategoryIcon: ''
          }}
          onSubmit={onNewAmenity}
          validationSchema={amenityCategoryValidationSchema}
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
                <Modal.Title>Create New Amenity Category</Modal.Title>
              </Modal.Header>
              <Modal.Body className="d-flex flex-column gap-3">
                <FloatingLabel label="category name">
                  <Form.Control
                    size="sm"
                    value={values.AmenitiesCategory}
                    onChange={handleChange('AmenitiesCategory')}
                    onBlur={handleBlur('AmenitiesCategory')}
                    type="text"
                    placeholder="amenity name"
                    autoFocus
                  />
                  {touched.AmenitiesCategory && (
                    <p className="text-danger">{errors.AmenitiesCategory}</p>
                  )}
                </FloatingLabel>
                <FloatingLabel label="category icon">
                  <Form.Control
                    size="sm"
                    value={values.AmenitiesCategoryIcon}
                    onChange={handleChange('AmenitiesCategoryIcon')}
                    onBlur={handleBlur('AmenitiesCategoryIcon')}
                    type="text"
                    placeholder="amenity icon"
                  />
                  {touched.AmenitiesCategoryIcon && (
                    <p className="text-danger">
                      {errors.AmenitiesCategoryIcon}
                    </p>
                  )}
                </FloatingLabel>
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
