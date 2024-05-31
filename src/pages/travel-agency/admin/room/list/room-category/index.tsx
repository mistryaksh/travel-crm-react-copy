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
import { IRoomCategoryProps, useColumnsProps } from 'interface';
import AdvanceTableProvider from 'providers/AdvanceTableProvider';
import React, { ChangeEvent, useEffect, useState } from 'react';
import {
  useAddRoomCategoryMutation,
  useDeleteRoomCategoryMutation,
  useGetRoomCategoryQuery,
  useLazyGetRoomCategoryByIdQuery,
  useUpdateRoomCategoryMutation
} from '../../../../../../redux/api';
import { FloatingLabel, Form, Modal } from 'react-bootstrap';
import { Formik } from 'formik';
import { roomCategorySchema } from 'validation';
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

export const RoomCategoryPage = () => {
  const { isError, error, data, isLoading } = useGetRoomCategoryQuery();
  const [
    AddCategory,
    {
      isError: isNewError,
      error: newError,
      isLoading: isNewLoading,
      isSuccess: isNewSuccess,
      data: newData
    }
  ] = useAddRoomCategoryMutation();
  const [
    DeleteCategory,
    {
      isError: isDeleteError,
      error: deleteError,
      data: deleteData,
      isLoading: isDeleteLoading,
      isSuccess: isDeleteSuccess
    }
  ] = useDeleteRoomCategoryMutation();
  const [
    GetCategory,
    {
      isError: isGetError,
      error: getError,
      isLoading: isGetLoading,
      isSuccess: isGetSuccess,
      data: getData
    }
  ] = useLazyGetRoomCategoryByIdQuery();
  const [
    UpdateCategory,
    {
      isError: isUpdateError,
      error: updateError,
      data: updateData,
      isLoading: isUpdateLoading,
      isSuccess: isUpdateSuccess
    }
  ] = useUpdateRoomCategoryMutation();

  useEffect(() => {
    if (isError) {
      console.log(error);
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
    }
    if (isUpdateError) {
      console.log(updateError);
    }
    if (isUpdateSuccess) {
      console.log(updateData?.data);
      setShow(false);
    }
  }, [
    isError,
    error,
    isNewError,
    newError,
    isNewSuccess,
    newData?.data,
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

  const columns: useColumnsProps<IRoomCategoryProps>[] = [
    {
      accessorKey: 'RoomCategory',
      header: 'Category',
      cell: ({
        row: {
          original: { RoomCategoryIcon, RoomCategory }
        }
      }) => {
        return (
          <div className="d-flex gap-3 align-items-center">
            <img src={RoomCategoryIcon} alt={RoomCategory} width={40} />
            <span className="fs-8 text-capitalize fw-bold">{RoomCategory}</span>
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
          original: { RoomCategoryId }
        }
      }) => {
        return (
          <RevealDropdownTrigger>
            <RevealDropdown>
              <ActionDropdownItems
                dataId={RoomCategoryId as string}
                deleteFunc={onDelete}
                updateFunc={onUpdate}
              />
            </RevealDropdown>
          </RevealDropdownTrigger>
        );
      }
    }
  ];
  const [show, setShow] = useState<boolean>(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const pageSize: number = 10;
  const tableOptions = {
    data: data?.data || [],
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

  const onSubmit = async ({ ...all }: IRoomCategoryProps) => {
    if (getData?.data) {
      await UpdateCategory({
        RoomCategoryId: getData?.data.RoomCategoryId,
        ...all
      });
    } else await AddCategory({ ...all });
  };

  const onDelete = async (id: string) => {
    await DeleteCategory(id);
  };

  const onUpdate = async (id: string) => {
    await GetCategory(id);
    setShow(true);
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
            label: 'Category',
            url: '#!'
          },
          {
            label: 'List',
            active: true
          }
        ]}
      />
      <div className="mb-9">
        <h2 className="mb-4">Rooom Category</h2>
        <FilterTab tabItems={tabItems} className="mb-2" />
        <AdvanceTableProvider {...table}>
          <div className="mb-4">
            <div className="d-flex flex-wrap gap-3">
              <SearchBox
                placeholder="Search room category"
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
                  Add room category
                </Button>
              </div>
            </div>
          </div>

          <div className="mx-n4 px-4 mx-lg-n6 px-lg-6 bg-body-emphasis border-top border-bottom border-translucent position-relative top-1">
            <AdvanceTable
              isLoading={
                isLoading ||
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
            RoomCategory: getData?.data?.RoomCategory || '',
            RoomCategoryIcon: getData?.data?.RoomCategoryIcon || ''
          }}
          onSubmit={onSubmit}
          validationSchema={roomCategorySchema}
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
                <Modal.Title>Add New Room Category</Modal.Title>
              </Modal.Header>
              <Modal.Body className="d-flex flex-column gap-3">
                <FloatingLabel label="category name">
                  <Form.Control
                    size="sm"
                    value={values.RoomCategory}
                    onChange={handleChange('RoomCategory')}
                    onBlur={handleBlur('RoomCategory')}
                    type="text"
                    placeholder="amenity name"
                    autoFocus
                  />
                  {touched.RoomCategory && (
                    <p className="text-danger">{errors.RoomCategory}</p>
                  )}
                </FloatingLabel>
                <FloatingLabel label="category icon">
                  <Form.Control
                    size="sm"
                    value={values.RoomCategoryIcon}
                    onChange={handleChange('RoomCategoryIcon')}
                    onBlur={handleBlur('RoomCategoryIcon')}
                    type="text"
                    placeholder="amenity icon"
                  />
                  {touched.RoomCategoryIcon && (
                    <p className="text-danger">{errors.RoomCategoryIcon}</p>
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
