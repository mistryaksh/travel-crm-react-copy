import SignInForm from 'components/modules/auth/SignInForm';
import { IUserProps } from 'interface';
import AuthSimpleLayout from 'layouts/AuthSimpleLayout';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSignInMutation } from '../../../../redux/api';
import { setToken } from 'utils';
import { Toast } from 'react-bootstrap';
import Button from 'components/base/Button';
import { UilTimes } from '@iconscout/react-unicons';

const SignIn = () => {
  const [SignIn, { isError, error: apiError, data, isSuccess, isLoading }] =
    useSignInMutation();
  const [error, setError] = useState<string>('');
  const [show, setShow] = useState<boolean>(false);
  const navigate = useNavigate();

  const onSubmit = async ({ email, password }: IUserProps) => {
    await SignIn({ email, password });
  };

  useEffect(() => {
    if (isError) {
      console.log((apiError as { data: { message: string } }).data.message);
      if ((apiError as { data: { message: string } }).data) {
        setError((apiError as { data: { message: string } }).data.message);
      } else {
        console.log(apiError);
      }
    }
    if (error) {
      setShow(true);
    }
    if (isSuccess) {
      console.log(data?.data);
      setToken(data?.data?.token);
      navigate('/', { replace: true });
    }
  }, [isError, apiError, isSuccess, data?.data, error]);
  return (
    <AuthSimpleLayout>
      {error.length !== 0 && (
        <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
          <Toast.Header closeButton={false}>
            <strong className="me-auto">Error</strong>
            <Button className="ms-2 p-0 " onClick={() => setShow(false)}>
              <UilTimes className="fs-7" />
            </Button>
          </Toast.Header>
          <Toast.Body>{error}</Toast.Body>
        </Toast>
      )}
      <SignInForm loginFunc={onSubmit} isLoading={isLoading} layout="card" />
    </AuthSimpleLayout>
  );
};

export default SignIn;
