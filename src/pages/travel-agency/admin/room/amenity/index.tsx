import { useEffect, useState } from 'react';
import {
  useCreateAmenityMutation,
  useDeleteAmenityMutation,
  useGetAmenitiesQuery,
  useGetMasterAmenitiesQuery
} from '../../../../../redux/api';
import { Breadcrumb, FloatingLabel, Form, Modal } from 'react-bootstrap';
import Button from 'components/base/Button';
import SearchBox from 'components/common/SearchBox';
import FilterTab from 'components/common/FilterTab';
import AdvanceTableProvider from 'providers/AdvanceTableProvider';
import AdvanceTable from 'components/base/AdvanceTable';
import useAdvanceTable from 'hooks/useAdvanceTable';
import { IAmenityProps, IMasterAmenityProps, useColumnsProps } from 'interface';
import AdvanceTableFooter from 'components/base/AdvanceTableFooter';
import { UilEdit, UilTrash } from '@iconscout/react-unicons';
import { Formik } from 'formik';
import { amenityValidationSchema } from 'validation';

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
      cell: ({ row }) => {
        const { amenity_name } = row.original;
        return <p className="fs-8 text-capitalize">{amenity_name}</p>;
      }
    },
    {
      accessorKey: 'mst_amenities',
      header: 'Room Master Amenity',
      cell: ({ row }) => {
        const { mst_amenities } = row.original;
        return (
          <p className="text-capitalize">
            {(mst_amenities as IMasterAmenityProps)?.amenity_name as string}
          </p>
        );
      }
    },
    {
      accessorKey: 'id',
      header: 'Actions',
      cell: ({ row }) => {
        const { _id } = row.original;
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
  return (
    <div>
      <Breadcrumb className="mb-0">
        <Breadcrumb.Item href="#!">Home</Breadcrumb.Item>
        <Breadcrumb.Item href="#!">Hotels</Breadcrumb.Item>
        <Breadcrumb.Item href="#!">Room</Breadcrumb.Item>
        <Breadcrumb.Item href="#!" active>
          Amenities
        </Breadcrumb.Item>
      </Breadcrumb>
      <h2 className="fs-5 my-4">
        Amenities Listing - {amenityData?.data.length}
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
                count: amenityData?.data.length as number,
                label: 'all',
                value: 'all',
                onClick: () => {}
              },
              {
                count: amenityData?.data.length as number,
                label: 'asc',
                value: 'asc',
                onClick: () => {}
              },
              {
                count: amenityData?.data.length as number,
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
              isAmenityLoading || isNewAmenityLoading || isDeleteLoading
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
