import Button from 'components/base/Button';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const ListCustomerPage = () => {
  const navigate = useNavigate();
  return (
    <div className="d-flex align-items-center justify-content-between">
      <h1>list customer page</h1>
      <Button
        onClick={() => navigate('/customer/new')}
        variant="phoenix-primary"
      >
        Add Customer
      </Button>
    </div>
  );
};
