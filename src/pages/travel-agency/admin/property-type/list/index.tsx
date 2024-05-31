import React, { ChangeEvent, useEffect, useState } from 'react';

import { faFileExport, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AdvanceTable from 'components/base/AdvanceTable';
import AdvanceTableFooter from 'components/base/AdvanceTableFooter';
import Button from 'components/base/Button';
import FilterButtonGroup, {
  FilterMenu
} from 'components/common/FilterButtonGroup';
import FilterTab, { FilterTabItem } from 'components/common/FilterTab';
import PageBreadcrumb from 'components/common/PageBreadcrumb';
import SearchBox from 'components/common/SearchBox';
import useAdvanceTable from 'hooks/useAdvanceTable';
import { useColumnsProps, IPropertyTypeProps } from 'interface';
import AdvanceTableProvider from 'providers/AdvanceTableProvider';
import {
  useAddPropertyTypeMutation,
  useDeletePropertyTypeMutation,
  useGetPropertyTypesQuery,
  useLazyGetPropertyTypeByIdQuery,
  useUpdatePropertyTypeByIdMutation
} from '../../../../../redux/api';
import { FloatingLabel, Form, Modal } from 'react-bootstrap';
import { Formik } from 'formik';
import { propertyTypesSchema } from 'validation';
import RevealDropdown, {
  RevealDropdownTrigger
} from 'components/base/RevealDropdown';
import ActionDropdownItems from 'components/common/ActionDropdownItems';
import moment from 'moment';

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
  }
];
export const PropertyTypeListPage = () => {
  const pageSize: number = 15;
  const {
    data: propertyTypes,
    error,
    isError,
    isLoading
  } = useGetPropertyTypesQuery();
  const [
    CreatePropertyType,
    {
      isError: isNewPropertyTypeError,
      error: newPropertyTypeError,
      data: newPropertyTypeData,
      isLoading: isNewPropertyTypeLoading,
      isSuccess: isPropertyTypeSuccess
    }
  ] = useAddPropertyTypeMutation();
  const [
    DeletePropertyType,
    {
      isError: isDeleteError,
      error: deleteError,
      isLoading: isDeleteLoading,
      isSuccess: isDeleteSuccess,
      data: deleteData
    }
  ] = useDeletePropertyTypeMutation();
  const [
    GetProperType,
    {
      isError: isPropertyTypeError,
      error: propertyTypeError,
      isLoading: isGetPropertyTypeLoading,
      isSuccess: isGetPropertyTypeSuccess,
      data: getPropertyTypeData
    }
  ] = useLazyGetPropertyTypeByIdQuery();
  const [
    UpdatePropertyType,
    {
      isError: isUpdateError,
      error: updateError,
      isLoading: isUpdateLoading,
      isSuccess: isUpdateSuccess,
      data: updateData
    }
  ] = useUpdatePropertyTypeByIdMutation();

  const columns: useColumnsProps<IPropertyTypeProps>[] = [
    {
      id: 'Property Type',
      accessorKey: 'PropertyType',
      header: 'Type',
      cell: ({
        row: {
          original: { PropertyType, PropertyTypeIcon }
        }
      }) => {
        return (
          <div className=" d-flex gap-3 align-items-center py-2">
            <div className="w-25">
              {PropertyTypeIcon ? (
                <img
                  src={PropertyTypeIcon}
                  alt={PropertyType as string}
                  style={{ width: 50 }}
                />
              ) : (
                'N/A'
              )}
            </div>
            <span className="text-capitalize text-gray-900 fw-bold">
              {PropertyType ? PropertyType : 'N/A'}
            </span>
          </div>
        );
      }
    },

    {
      accessorKey: 'PropertyTypeSystemCode',
      header: 'System Code',
      meta: {
        cellProps: {
          className: 'text-gray-500'
        }
      }
    },
    {
      header: 'Action',
      meta: {
        headerProps: {
          className: 'text-end'
        }
      },
      cell: ({
        row: {
          original: { _id, createdAt }
        }
      }) => {
        return (
          <div className="d-flex gap-3 align-items-center justify-content-end">
            <span>{moment(createdAt).format('DD-MM-YYYY hh:mm A')}</span>
            <RevealDropdownTrigger>
              <RevealDropdown>
                <ActionDropdownItems
                  dataId={_id as string}
                  deleteFunc={onDelete}
                  updateFunc={onUpdate}
                />
              </RevealDropdown>
            </RevealDropdownTrigger>
          </div>
        );
      }
    }
  ];

  const tableOptions = {
    data: propertyTypes?.data || [],
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

  useEffect(() => {
    if (isError) {
      console.log(error);
    }
    if (isNewPropertyTypeError) {
      console.log(newPropertyTypeError);
    }
    if (isPropertyTypeSuccess) {
      console.log(newPropertyTypeData?.data);
      setShow(false);
    }
    if (isDeleteError) {
      console.log(deleteError);
    }
    if (isDeleteSuccess) {
      console.log(deleteData?.data);
    }
    if (isPropertyTypeError) {
      console.log(propertyTypeError);
    }
    if (isGetPropertyTypeSuccess) {
      setShow(true);
    }
    if (isUpdateError) {
      console.log(updateError);
    }
    if (isUpdateSuccess) {
      setShow(false);
    }
  }, [
    isError,
    error,
    isNewPropertyTypeError,
    newPropertyTypeError,
    isPropertyTypeSuccess,
    newPropertyTypeData?.data,
    isDeleteError,
    deleteError,
    isDeleteSuccess,
    deleteData?.data,
    isPropertyTypeError,
    propertyTypeError,
    isGetPropertyTypeSuccess,
    getPropertyTypeData?.data,
    isUpdateError,
    updateError,
    isUpdateSuccess,
    updateData?.data
  ]);

  const [show, setShow] = useState<boolean>(false);

  const handleClose = () => {
    setShow(false);
  };

  const onSubmit = async ({
    PropertyType,
    PropertyTypeIcon
  }: IPropertyTypeProps) => {
    if (getPropertyTypeData?.data) {
      await UpdatePropertyType({
        PropertyType: PropertyType,
        PropertyTypeIcon,
        _id: getPropertyTypeData?.data._id
      });
    } else {
      await CreatePropertyType({ PropertyType, PropertyTypeIcon });
    }
  };

  const onDelete = async (id: string) => {
    await DeletePropertyType(id);
  };

  const onUpdate = async (id: string) => {
    await GetProperType(id);
    setShow(true);
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
            url: '/'
          },
          {
            label: 'Property Type',
            url: '#!'
          },
          {
            label: 'List',
            active: true
          }
        ]}
      />
      <div className="mb-9">
        <h2 className="mb-4">Property Type</h2>
        <FilterTab tabItems={tabItems} className="mb-2" />
        <AdvanceTableProvider {...table}>
          <div className="mb-4">
            <div className="d-flex flex-wrap gap-3 justify-content-between">
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
                <Button variant="primary" onClick={() => setShow(true)}>
                  <FontAwesomeIcon icon={faPlus} className="me-2" />
                  Add Property Type
                </Button>
              </div>
            </div>
          </div>

          <div className="mx-n4 px-4 mx-lg-n6 px-lg-6 bg-body-emphasis border-top border-bottom border-translucent position-relative top-1">
            <AdvanceTable
              isLoading={
                isLoading ||
                isNewPropertyTypeLoading ||
                isDeleteLoading ||
                isGetPropertyTypeLoading ||
                isUpdateLoading
              }
              tableProps={{ className: 'phoenix-table fs-9', size: 'sm' }}
            />
            <AdvanceTableFooter pagination />
          </div>
        </AdvanceTableProvider>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Formik
          enableReinitialize
          initialValues={{
            PropertyType: getPropertyTypeData?.data.PropertyType || '',
            PropertyTypeIcon: getPropertyTypeData?.data.PropertyTypeIcon || ''
          }}
          onSubmit={async (values, { resetForm }) => {
            await onSubmit({ ...values });
            resetForm();
          }}
          validationSchema={propertyTypesSchema}
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
                <Modal.Title>Create Property Type</Modal.Title>
              </Modal.Header>
              <Modal.Body className="d-flex flex-column gap-3">
                <FloatingLabel label="Property Type Name">
                  <Form.Control
                    size="sm"
                    value={values.PropertyType}
                    onChange={handleChange('PropertyType')}
                    onBlur={handleBlur('PropertyType')}
                    type="text"
                    placeholder="Property Type Name"
                    autoFocus
                  />
                  {touched.PropertyType && (
                    <p className="text-danger">{errors.PropertyType}</p>
                  )}
                </FloatingLabel>
                <FloatingLabel label="Property Type Icon">
                  <Form.Control
                    size="sm"
                    value={values.PropertyTypeIcon}
                    onChange={handleChange('PropertyTypeIcon')}
                    onBlur={handleBlur('PropertyTypeIcon')}
                    type="text"
                    placeholder="Property Type Icon"
                  />
                  {touched.PropertyType && (
                    <p className="text-danger">{errors.PropertyType}</p>
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
