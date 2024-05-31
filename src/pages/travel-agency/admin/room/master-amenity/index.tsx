import Button from 'components/base/Button';
import FilterTab, { FilterTabItem } from 'components/common/FilterTab';
import SearchBox from 'components/common/SearchBox';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Form, Modal } from 'react-bootstrap';

import AdvanceTableProvider from 'providers/AdvanceTableProvider';
import AdvanceTable from 'components/base/AdvanceTable';
import AdvanceTableFooter from 'components/base/AdvanceTableFooter';
import useAdvanceTable from 'hooks/useAdvanceTable';
import {
  IAmenitiesCategoryProps,
  IAmenitiesProps,
  useColumnsProps
} from 'interface';
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
import {
  useCreateAmenityMutation,
  useDeleteAmenityMutation,
  useGetAmenityCategoryQuery,
  useGetAmenityQuery
} from '../../../../../redux/api';
import {
  handleCategoryInput,
  handleSelectedCategory,
  useAmenitySlice
} from '../../../../../redux/feature';
import { useAppDispatch } from '../../../../../redux';
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
    isError: isAmenityError,
    error: amenityError,
    data: amenityData,
    isLoading: isAmenityLoading,
    isSuccess: isAmenitySuccess
  } = useGetAmenityQuery();
  const {
    isError: isCategoryError,
    error: categoryError,
    data: categoryData,
    isLoading: isCategoryLoading
  } = useGetAmenityCategoryQuery();
  const [
    NewAmenity,
    {
      isError: isNewError,
      error: newError,
      data: newData,
      isLoading: isNewLoading,
      isSuccess: isNewSuccess
    }
  ] = useCreateAmenityMutation();
  const [
    DeleteAmenity,
    {
      isError: isDeleteError,
      error: deleteError,
      isLoading: isDeleteLoading,
      isSuccess: isDeleteSuccess,
      data: deleteData
    }
  ] = useDeleteAmenityMutation();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { selectedCategory, categoryInput } = useAmenitySlice();
  const dispatch = useAppDispatch();
  const pageSize: number = 10;

  useEffect(() => {
    if (isAmenityError) {
      console.log(amenityError);
    }
    if (isAmenitySuccess) {
      console.log('RECEIVED DATA', amenityData?.data);
    }
    if (isCategoryError) {
      console.log(categoryError);
    }

    if (isNewError) {
      console.log(newError);
    }
    if (isNewSuccess) {
      console.log(newData?.data);
      setShow(false);
    }
    if (isDeleteError) {
      console.log(deleteError);
    }
    if (isDeleteSuccess) {
      console.log(deleteData?.data);
    }
  }, [
    isAmenityError,
    amenityError,
    isAmenitySuccess,
    amenityData?.data,
    isCategoryError,
    categoryError,
    isNewError,
    newError,
    newData?.data,
    isNewSuccess,
    isDeleteError,
    deleteError,
    isDeleteSuccess,
    deleteData?.data
  ]);

  const columns: useColumnsProps<IAmenitiesProps>[] = [
    {
      accessorKey: 'AmenitiesName',
      header: 'Room Amenity',
      searchInput: true,
      cell: ({ row }) => {
        const { AmenitiesName, AmenitiesIcon } = row.original;
        return (
          <div className="d-flex align-items-center gap-3 py-2">
            <img src={AmenitiesIcon} width={40} alt={AmenitiesName} />
            <span className="fs-8 text-capitalize fw-bold">
              {AmenitiesName}
            </span>
          </div>
        );
      }
    },
    {
      accessorKey: 'AmenitiesShortDetail',
      header: 'Detail',
      searchInput: true,
      cell: ({ row }) => {
        const { AmenitiesShortDetail } = row.original;
        return <span className="fs-9">{AmenitiesShortDetail}</span>;
      }
    },
    {
      accessorKey: 'AmenitiesCategoryId',
      header: 'Tags',
      cell: ({
        row: {
          original: { AmenitiesCategoryId }
        }
      }) => {
        return (
          <div className="d-flex gap-3 align-items-center">
            {(AmenitiesCategoryId as IAmenitiesCategoryProps[])?.map(
              ({ AmenitiesCategory, AmenitiesCategoryId }) => {
                return (
                  <Badge key={AmenitiesCategoryId} variant="tag">
                    {AmenitiesCategory}
                  </Badge>
                );
              }
            )}
          </div>
        );
      }
    },
    {
      accessorKey: 'AmenitiesShortDetail',
      header: 'Detail',
      searchInput: true,
      cell: ({ row }) => {
        const { AmenitiesShortDetail } = row.original;
        return <span className="fs-9">{AmenitiesShortDetail}</span>;
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
                onClick={() => onDeleteMasterAmenity(_id as unknown as string)}
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

  const onNewMasterAmenity = async (props: IAmenitiesProps) => {
    await NewAmenity({
      ...props,
      AmenitiesCategoryId: selectedCategory
    });
  };
  const onDeleteMasterAmenity = async (id: string) => {
    console.log(id);
    await DeleteAmenity(id);
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
                isAmenityLoading ||
                isCategoryLoading ||
                isNewLoading ||
                isDeleteLoading
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
            AmenitiesName: '',
            AmenitiesIcon: '',
            isChargeable: false,
            // AmenitiesCategoryId: selectedCategory,
            AmenitiesShortDetail: ''
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
                    value={values.AmenitiesName}
                    onChange={handleChange('AmenitiesName')}
                    onBlur={handleBlur('AmenitiesName')}
                    type="text"
                    placeholder="amenity name"
                    autoFocus
                  />
                  {touched.AmenitiesName && (
                    <p className="text-danger">{errors.AmenitiesName}</p>
                  )}
                </FloatingLabel>
                <FloatingLabel label="amenity icon">
                  <Form.Control
                    size="sm"
                    value={values.AmenitiesIcon}
                    onChange={handleChange('AmenitiesIcon')}
                    onBlur={handleBlur('AmenitiesIcon')}
                    type="text"
                    placeholder="amenity icon"
                  />
                  {touched.AmenitiesIcon && (
                    <p className="text-danger">{errors.AmenitiesIcon}</p>
                  )}
                </FloatingLabel>

                <FloatingLabel label="amenity details">
                  <Form.Control
                    size="sm"
                    value={values.AmenitiesShortDetail}
                    onChange={handleChange('AmenitiesShortDetail')}
                    onBlur={handleBlur('AmenitiesShortDetail')}
                    type="text"
                    placeholder="amenity details"
                  />
                  {touched.AmenitiesShortDetail && (
                    <p className="text-danger">{errors.AmenitiesShortDetail}</p>
                  )}
                </FloatingLabel>
                {selectedCategory.map((id: string, i: number) => (
                  <div key={i}>{id}</div>
                ))}

                <Form.Select
                  onChange={prop => {
                    dispatch(handleCategoryInput(prop.target.value));
                    dispatch(handleSelectedCategory(prop.target.value));
                  }}
                  value={categoryInput}
                >
                  {categoryData?.data.map(
                    ({ AmenitiesCategoryId, AmenitiesCategory }) => (
                      <option
                        id={AmenitiesCategory}
                        key={AmenitiesCategoryId}
                        value={AmenitiesCategoryId}
                      >
                        {AmenitiesCategory}
                      </option>
                    )
                  )}
                </Form.Select>
                <Form.Switch
                  checked={values.isChargeable as boolean}
                  onChange={handleChange('isChargeable')}
                  onBlur={handleBlur('isChargeable')}
                  label="Is Chargable"
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
