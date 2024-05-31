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
import { Formik } from 'formik';
import useAdvanceTable from 'hooks/useAdvanceTable';
import { IBedTypeProps, useColumnsProps } from 'interface';
import AdvanceTableProvider from 'providers/AdvanceTableProvider';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { FloatingLabel, Form, Modal } from 'react-bootstrap';
import {
  useAddBedTypeMutation,
  useDeleteBedTypeMutation,
  useGetBedTypeQuery,
  useLazyGetBedTypeByIdQuery,
  useUpdateBedTypeMutation
} from '../../../../../redux/api';
import { bedTypeValidation } from 'validation';
import RevealDropdown, {
  RevealDropdownTrigger
} from 'components/base/RevealDropdown';
import ActionDropdownItems from 'components/common/ActionDropdownItems';

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

export const BedTypeListPage = () => {
  const [show, setShow] = useState<boolean>(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const {
    data: bedData,
    isError: isBedError,
    error: bedError,
    isLoading: isBedLoading,
    isSuccess: isBedSuccess
  } = useGetBedTypeQuery();
  const [
    CreateBedType,
    {
      isError: isNewError,
      error: newError,
      isLoading: isNewLoading,
      isSuccess: isNewSuccess,
      data: newData
    }
  ] = useAddBedTypeMutation();
  const [
    DeleteBedType,
    {
      isError: isDeleteError,
      error: deleteError,
      isLoading: isDeleteLoading,
      isSuccess: isDeleteSuccess,
      data: deleteData
    }
  ] = useDeleteBedTypeMutation();
  const [
    GetBedType,
    {
      isError: isGetError,
      error: getError,
      isLoading: isGetLoading,
      isSuccess: isGetSuccess,
      data: getData
    }
  ] = useLazyGetBedTypeByIdQuery();
  const [
    UpdateBedType,
    {
      isError: isUpdateError,
      error: updateError,
      isLoading: isUpdateLoading,
      data: updateData,
      isSuccess: isUpdateSuccess
    }
  ] = useUpdateBedTypeMutation();

  useEffect(() => {
    if (isBedError) {
      console.log(bedError);
    }
    if (isBedSuccess) {
      console.log(bedData?.data);
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
    if (isGetError) {
      console.log(getError);
    }
    if (isGetSuccess) {
      console.log(getData?.data);
      setShow(true);
    }
    if (isUpdateSuccess) {
      console.log(updateData?.data);
      setShow(false);
    }
    if (isUpdateError) {
      console.log(updateError);
    }
  }, [
    isBedError,
    bedError,
    isBedSuccess,
    bedData?.data,
    isDeleteError,
    deleteError,
    isDeleteSuccess,
    deleteData?.data,
    isGetError,
    getError,
    isGetSuccess,
    getData?.data,
    isUpdateError,
    updateError,
    isUpdateSuccess,
    updateData?.data
  ]);

  const columns: useColumnsProps<IBedTypeProps>[] = [
    {
      accessorKey: 'BedType',
      header: 'Bed Type',
      cell: ({
        row: {
          original: { BedTypeIcon, BedType }
        }
      }) => {
        return (
          <div className="d-flex align-items-center gap-3 py-2">
            <img width={40} src={BedTypeIcon} alt={BedType} />
            <span className="fs-8 fw-bold">{BedType}</span>
          </div>
        );
      }
    },
    {
      accessorKey: '_id',
      header: 'Action',
      meta: {
        cellProps: {
          className: 'text-end'
        },
        headerProps: {
          className: 'text-end'
        }
      },
      cell: ({
        row: {
          original: { _id }
        }
      }) => {
        return (
          <RevealDropdownTrigger>
            <RevealDropdown>
              <ActionDropdownItems
                dataId={_id as string}
                deleteFunc={onDelete}
                updateFunc={onUpdate}
              />
            </RevealDropdown>
          </RevealDropdownTrigger>
        );
      }
    }
  ];
  const pageSize: number = 10;

  const tableOptions = {
    data: bedData?.data || [],
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

  const onSubmit = async ({ BedTypeIcon, BedType }: IBedTypeProps) => {
    console.log(BedType, BedTypeIcon);
    if (getData?.data._id) {
      await UpdateBedType({ _id: getData.data._id, BedTypeIcon, BedType });
    } else await CreateBedType({ BedType, BedTypeIcon });
  };

  const onDelete = async (id: string) => {
    await DeleteBedType(id);
  };

  const onUpdate = async (id: string) => {
    await GetBedType(id);
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
            label: 'Bed',
            url: '#!'
          },
          {
            label: 'List',
            active: true
          }
        ]}
      />
      <div className="mb-9">
        <h2 className="mb-4">Bed Type</h2>
        <FilterTab tabItems={tabItems} className="mb-2" />
        <AdvanceTableProvider {...table}>
          <div className="mb-4">
            <div className="d-flex flex-wrap gap-3">
              <SearchBox
                placeholder="Search bed type"
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
                  Add Bed type
                </Button>
              </div>
            </div>
          </div>

          <div className="mx-n4 px-4 mx-lg-n6 px-lg-6 bg-body-emphasis border-top border-bottom border-translucent position-relative top-1">
            <AdvanceTable
              isLoading={
                isBedLoading ||
                isNewLoading ||
                isDeleteLoading ||
                isGetLoading ||
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
            BedType: getData?.data.BedType || '',
            BedTypeIcon: getData?.data.BedTypeIcon || ''
          }}
          onSubmit={onSubmit}
          validationSchema={bedTypeValidation}
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
                <Modal.Title>Add Bed Type</Modal.Title>
              </Modal.Header>
              <Modal.Body className="d-flex flex-column gap-3">
                <FloatingLabel label="Bed Type">
                  <Form.Control
                    size="sm"
                    value={values.BedType}
                    onChange={handleChange('BedType')}
                    onBlur={handleBlur('BedType')}
                    type="text"
                    placeholder="type"
                    autoFocus
                  />
                  {touched.BedType && (
                    <p className="text-danger">{errors.BedType}</p>
                  )}
                </FloatingLabel>
                <FloatingLabel label="Bed type icon">
                  <Form.Control
                    size="sm"
                    value={values.BedTypeIcon}
                    onChange={handleChange('BedTypeIcon')}
                    onBlur={handleBlur('BedTypeIcon')}
                    type="text"
                    placeholder="icon"
                  />
                  {touched.BedTypeIcon && (
                    <p className="text-danger">{errors.BedTypeIcon}</p>
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
