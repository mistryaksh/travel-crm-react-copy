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
import { IPaymentModeProps, useColumnsProps } from 'interface';
import AdvanceTableProvider from 'providers/AdvanceTableProvider';
import {
  useAddPaymentModeMutation,
  useDeletePaymentModeMutation,
  useGetPaymentModeQuery,
  useLazyGetPaymentModeByIdQuery,
  useUpdatePaymentModeMutation
} from '../../../../../redux/api';
import { FloatingLabel, Modal } from 'react-bootstrap';
import { Formik } from 'formik';
import { Form } from 'react-bootstrap';
import { paymentModeSchema } from 'validation';
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

export const PaymentModeListPage = () => {
  const { isError, error, data, isLoading, isSuccess } =
    useGetPaymentModeQuery();
  const [
    AddPaymentMode,
    {
      isError: isNewError,
      error: newError,
      isLoading: isNewLoading,
      isSuccess: isNewSuccess,
      data: newData
    }
  ] = useAddPaymentModeMutation();
  const [
    DeletePaymentMode,
    {
      isError: isDeleteError,
      error: deleteError,
      isLoading: isDeleteLoading,
      isSuccess: isDeleteSuccess,
      data: deleteData
    }
  ] = useDeletePaymentModeMutation();
  const [
    GetPaymentMode,
    {
      isError: isGetError,
      error: getError,
      isLoading: isGetLoading,
      isSuccess: isGetSuccess,
      data: getData
    }
  ] = useLazyGetPaymentModeByIdQuery();
  const [
    UpdatePaymentMode,
    {
      isError: isUpdateError,
      error: updateError,
      isLoading: isUpdateLoading,
      isSuccess: isUpdateSuccess,
      data: updateData
    }
  ] = useUpdatePaymentModeMutation();

  useEffect(() => {
    if (isError) {
      console.log(error);
    }
    if (isSuccess) {
      console.log(data?.data);
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
    isSuccess,
    data?.data,
    isNewError,
    newError,
    isNewSuccess,
    newData?.data,
    isDeleteSuccess,
    deleteData?.data,
    isGetSuccess,
    getData?.data,
    isUpdateError,
    updateError,
    isUpdateSuccess,
    updateData?.data
  ]);

  const columns: useColumnsProps<IPaymentModeProps>[] = [
    {
      accessorKey: 'PaymentMode',
      header: 'Payment Modes',
      cell: ({
        row: {
          original: { PaymentMode, PaymentModeIcon }
        }
      }) => {
        return (
          <div className="d-flex gap-3 align-items-center py-2">
            <img width={60} src={PaymentModeIcon} alt={PaymentMode} />
            <span className="fs-8 fw-bold">{PaymentMode}</span>
          </div>
        );
      }
    },
    {
      accessorKey: 'PaymentModeId',
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
          original: { PaymentModeId }
        }
      }) => {
        return (
          <RevealDropdownTrigger>
            <RevealDropdown>
              <ActionDropdownItems
                dataId={PaymentModeId as string}
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
  const [show, setShow] = useState<boolean>(false);

  const handleClose = () => {
    setShow(false);
  };

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
  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    table.setGlobalFilter(e.target.value || undefined);
  };
  const onSubmit = async ({
    PaymentMode,
    PaymentModeIcon
  }: IPaymentModeProps) => {
    if (getData?.data.PaymentModeId) {
      await UpdatePaymentMode({
        PaymentModeId: getData?.data.PaymentModeId,
        PaymentMode,
        PaymentModeIcon
      });
    } else {
      await AddPaymentMode({ PaymentMode, PaymentModeIcon });
    }
  };

  const onDelete = async (id: string) => {
    await DeletePaymentMode(id);
  };

  const onUpdate = async (id: string) => {
    await GetPaymentMode(id);
    setShow(true);
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
            label: 'Payment Mode',
            url: '#!'
          },
          {
            label: 'List',
            active: true
          }
        ]}
      />
      <div className="mb-9">
        <h2 className="mb-4">Payment Mode</h2>
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
            PaymentMode: getData?.data?.PaymentMode || '',
            PaymentModeIcon: getData?.data?.PaymentModeIcon || ''
          }}
          onSubmit={async (values, { resetForm }) => {
            await onSubmit({ ...values });
            resetForm();
          }}
          validationSchema={paymentModeSchema}
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
                <Modal.Title>Create Payment mode</Modal.Title>
              </Modal.Header>
              <Modal.Body className="d-flex flex-column gap-3">
                <FloatingLabel label="Property Type Name">
                  <Form.Control
                    size="sm"
                    value={values.PaymentMode}
                    onChange={handleChange('PaymentMode')}
                    onBlur={handleBlur('PaymentMode')}
                    type="text"
                    placeholder="Payment mode Name"
                    autoFocus
                  />
                  {touched.PaymentMode && (
                    <p className="text-danger">{errors.PaymentMode}</p>
                  )}
                </FloatingLabel>
                <FloatingLabel label="Property Type Icon">
                  <Form.Control
                    size="sm"
                    value={values.PaymentModeIcon}
                    onChange={handleChange('PaymentModeIcon')}
                    onBlur={handleBlur('PaymentModeIcon')}
                    type="text"
                    placeholder="Payment mode Icon"
                  />
                  {touched.PaymentModeIcon && (
                    <p className="text-danger">{errors.PaymentModeIcon}</p>
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
