import React, { ChangeEvent, useEffect, useState } from 'react';
import {
  useAddSystemCodeMutation,
  useDeleteSystemCodeMutation,
  useGetSystemCodesQuery,
  useLazyGetSystemCodeByIdQuery,
  useUpdateSystemCodeMutation
} from '../../../../../redux/api';
import FilterTab, { FilterTabItem } from 'components/common/FilterTab';
import AdvanceTableProvider from 'providers/AdvanceTableProvider';
import SearchBox from 'components/common/SearchBox';
import FilterButtonGroup, {
  FilterMenu
} from 'components/common/FilterButtonGroup';
import { FloatingLabel, FormControl, Toast } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExport, faPlus } from '@fortawesome/free-solid-svg-icons';
import PageBreadcrumb from 'components/common/PageBreadcrumb';
import AdvanceTable from 'components/base/AdvanceTable';
import AdvanceTableFooter from 'components/base/AdvanceTableFooter';
import { ISystemCodeProps, useColumnsProps } from 'interface';
import useAdvanceTable from 'hooks/useAdvanceTable';
import { Formik } from 'formik';
import Button from 'components/base/Button';
import moment from 'moment';
import RevealDropdown, {
  RevealDropdownTrigger
} from 'components/base/RevealDropdown';
import ActionDropdownItems from 'components/common/ActionDropdownItems';
import { UilTimes } from '@iconscout/react-unicons';

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

export const SystemCodeListPage = () => {
  const pageSize: number = 15;
  const {
    data: systemCodes,
    // error,
    isLoading
  } = useGetSystemCodesQuery();
  const [
    CreateSystemCode,
    {
      isError: isAddError,
      error: addError,
      isLoading: isAddLoading,
      isSuccess: isAddSuccess,
      data: addData
    }
  ] = useAddSystemCodeMutation();
  const [
    DeleteSystemCode,
    {
      isSuccess: isDeleteSuccess,
      error: deleteError,
      isLoading: isDeleteLoading,
      data: deleteData,
      isError: isDeleteError
    }
  ] = useDeleteSystemCodeMutation();
  const [
    GetSystemCode,
    {
      isError: isGetError,
      error: getError,
      data: getData,
      isLoading: isGetLoading,
      isSuccess: isGetSuccess
    }
  ] = useLazyGetSystemCodeByIdQuery();
  const [
    UpdateSystemCode,
    {
      isError: isUpdateError,
      error: updateError,
      isLoading: isUpdateLoading,
      data: updateData,
      isSuccess: isUpdateSuccess
    }
  ] = useUpdateSystemCodeMutation();

  const columns: useColumnsProps<ISystemCodeProps>[] = [
    {
      accessorKey: 'namePrefix',
      header: 'Name prefixes',
      meta: {
        cellProps: {
          width: '70%'
        }
      }
    },
    {
      accessorKey: 'createdAt',
      header: 'Uploaded on',

      cell: ({
        row: {
          original: { createdAt }
        }
      }) => {
        return (
          <span>
            {createdAt
              ? moment(createdAt).format('DD-MM-YYYY On hh:mm A')
              : 'N/A'}
          </span>
        );
      }
    },
    {
      header: 'Action',
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
                updateFunc={onUpdateSelect}
              />
            </RevealDropdown>
          </RevealDropdownTrigger>
        );
      }
    }
  ];

  const tableOptions = {
    data: systemCodes?.data || [],
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

  const onSubmit = async ({ name }: { name: string }) => {
    if (getData?.data) {
      await UpdateSystemCode({ namePrefix: name, _id: getData.data._id });
    } else {
      await CreateSystemCode({
        namePrefix: name as string
      });
    }
  };

  const onDelete = async (id: string) => {
    await DeleteSystemCode(id as string);
  };

  const onUpdateSelect = async (id: string) => {
    console.log('on update', id);
    await GetSystemCode(id);
  };

  const [deleteToast, setDeleteToast] = useState<boolean>(false);
  const [newToast, setNewToast] = useState<boolean>(false);
  useEffect(() => {
    if (isAddError) {
      console.log(addError);
    }
    if (isAddSuccess) {
      console.log(addData?.data);
      setNewToast(true);
    }
    if (isDeleteError) {
      console.log(deleteError);
    }
    if (isDeleteSuccess) {
      setDeleteToast(true);
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
    }
  }, [
    isAddError,
    addError,
    isAddError,
    addData?.data,
    isDeleteError,
    deleteError,
    isDeleteSuccess,
    deleteData?.data,
    isAddSuccess,
    isGetError,
    getError,
    isGetSuccess,
    getData?.data,
    isUpdateError,
    updateError,
    isUpdateSuccess,
    updateData?.data
  ]);
  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    table.setGlobalFilter(e.target.value || undefined);
  };
  return (
    <div>
      {deleteToast && (
        <div className="position-fixed bottom-0 end-0 p-3 z-5">
          <Toast
            onClose={() => setDeleteToast(false)}
            show={deleteToast}
            delay={2000}
            autohide
          >
            <Toast.Header closeButton={false}>
              <strong className="me-auto">Notification</strong>
              <Button
                className="ms-2 p-0 "
                onClick={() => setDeleteToast(false)}
              >
                <UilTimes className="fs-7" />
              </Button>
            </Toast.Header>
            <Toast.Body>System code removed from your list</Toast.Body>
          </Toast>
        </div>
      )}
      {newToast && (
        <div className="position-fixed bottom-0 end-0 p-3 z-5">
          <Toast
            onClose={() => setNewToast(false)}
            show={newToast}
            delay={2000}
            autohide
          >
            <Toast.Header closeButton={false}>
              <strong className="me-auto">Notification</strong>
              <Button className="ms-2 p-0 " onClick={() => setNewToast(false)}>
                <UilTimes className="fs-7" />
              </Button>
            </Toast.Header>
            <Toast.Body>
              {addData?.data.namePrefix} is added to your list
            </Toast.Body>
          </Toast>
        </div>
      )}
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
        <h2 className="mb-4">System Code</h2>
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
              </div>
            </div>
          </div>

          <div className="mx-n4 px-4 mx-lg-n6 px-lg-6 bg-body-emphasis border-top border-bottom border-translucent position-relative top-1">
            <AdvanceTable
              isLoading={
                isLoading ||
                isAddLoading ||
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
      <Formik
        enableReinitialize
        initialValues={{
          name: getData?.data.namePrefix || ''
        }}
        onSubmit={async (values, { resetForm }) => {
          await onSubmit({ name: values?.name as string });
          resetForm();
        }}
      >
        {({
          errors,
          touched,
          values,
          handleBlur,
          handleChange,
          handleSubmit
        }) => (
          <form
            onSubmit={handleSubmit}
            className="d-flex gap-5 align-items-center w-100"
          >
            <FloatingLabel label="Create name prefix" className="flex-1">
              <FormControl
                value={values.name}
                onChange={handleChange('name')}
                onBlur={handleBlur('name')}
                placeholder="Enter name"
              />
            </FloatingLabel>
            {touched.name && errors.name}
            <Button
              type="submit"
              variant="primary"
              endIcon={<FontAwesomeIcon icon={faPlus} />}
            >
              Save
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
};
