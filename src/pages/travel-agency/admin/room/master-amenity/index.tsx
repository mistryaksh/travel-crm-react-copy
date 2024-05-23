import Button from 'components/base/Button';
import FilterTab from 'components/common/FilterTab';
import SearchBox from 'components/common/SearchBox';
import React, { useEffect, useState } from 'react';
import { Breadcrumb, Form, Modal } from 'react-bootstrap';
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
      meta: {
        cellProps: {
          style: {
            width: '80%'
          }
        }
      },
      cell: ({ row }) => {
        const { amenity_name } = row.original;
        return <p className="fs-8 text-capitalize">{amenity_name}</p>;
      }
    },
    {
      accessorKey: 'id',
      header: 'Actions',
      cell: ({ row }) => {
        const { _id, id } = row.original;
        return (
          <div className="d-flex gap-3">
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
  return (
    <div>
      <Breadcrumb className="mb-0">
        <Breadcrumb.Item href="#!">Home</Breadcrumb.Item>
        <Breadcrumb.Item href="#!">Hotels</Breadcrumb.Item>
        <Breadcrumb.Item href="#!">Room</Breadcrumb.Item>
        <Breadcrumb.Item href="#!" active>
          Master Amenities
        </Breadcrumb.Item>
      </Breadcrumb>
      <h2 className="fs-5 my-4">
        Master Amenities Listing - {masterAmenity?.data.length}
      </h2>
      <div className="d-flex justify-content-between align-content-center">
        <div className="gap-3 d-flex">
          <Button variant="primary" onClick={handleShow}>
            Create Listing
          </Button>
          <Button variant="phoenix-primary">Exports</Button>
        </div>
        <div className="d-flex gap-3 align-content-center">
          <SearchBox />
          <FilterTab
            className="mt-1"
            tabItems={[
              {
                count: masterAmenity?.data.length as number,
                label: 'all',
                value: 'all',
                onClick: () => {}
              },
              {
                count: masterAmenity?.data.length as number,
                label: 'asc',
                value: 'asc',
                onClick: () => {}
              },
              {
                count: masterAmenity?.data.length as number,
                label: 'desc',
                value: 'desc',
                onClick: () => {}
              }
            ]}
          />
        </div>
      </div>
      <div className="mt-5">
        <AdvanceTableProvider {...table}>
          <AdvanceTable
            isLoading={
              isMasterAmenityLoading ||
              isNewMasterAmenityLoading ||
              isDeleteMasterAmenityLoading
            }
            tableProps={{
              size: 'sm',
              className: 'phoenix-table fs-9 mb-0 border-top border-200'
            }}
            rowClassName="hover-actions-trigger btn-reveal-trigger position-static"
          />
          <AdvanceTableFooter pagination showViewAllBtn={false} />
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
