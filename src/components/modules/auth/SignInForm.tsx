import { faKey, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'components/base/Button';
import { Formik } from 'formik';
import { Col, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserSignInValidationSchema } from 'validation';
import { IUserProps } from 'interface';

const SignInForm = ({
  layout,
  loginFunc,
  isLoading
}: {
  layout: 'simple' | 'card' | 'split';
  loginFunc?: ({ email, password }: IUserProps) => void;
  isLoading?: boolean;
}) => {
  return (
    <>
      <div className="text-center mb-7">
        <h3 className="text-body-highlight">Sign In</h3>
        <p className="text-body-tertiary">Get access to your account</p>
      </div>

      {loginFunc && (
        <div>
          <Formik
            initialValues={{
              email: 'mistryaksh1998@gmail.com',
              password: 'abc123'
            }}
            validationSchema={UserSignInValidationSchema}
            onSubmit={loginFunc}
          >
            {({
              // errors,
              values,
              // touched,
              handleBlur,
              handleChange,
              handleSubmit
            }) => (
              <form onSubmit={handleSubmit}>
                <Form.Group className="mb-3 text-start">
                  <Form.Label htmlFor="email">Email address</Form.Label>
                  <div className="form-icon-container">
                    <Form.Control
                      onChange={handleChange('email')}
                      onBlur={handleBlur('email')}
                      value={values.email}
                      id="email"
                      type="email"
                      className="form-icon-input"
                      placeholder="name@example.com"
                    />
                    <FontAwesomeIcon
                      icon={faUser}
                      className="text-body fs-9 form-icon"
                    />
                  </div>
                </Form.Group>
                <Form.Group className="mb-3 text-start">
                  <Form.Label htmlFor="password">Password</Form.Label>
                  <div className="form-icon-container">
                    <Form.Control
                      onChange={handleChange('password')}
                      onBlur={handleBlur('password')}
                      value={values.password}
                      id="password"
                      type="password"
                      className="form-icon-input"
                      placeholder="Password"
                    />
                    <FontAwesomeIcon
                      icon={faKey}
                      className="text-body fs-9 form-icon"
                    />
                  </div>
                </Form.Group>
                <Row className="flex-between-center mb-7">
                  <Col xs="auto">
                    <Form.Check type="checkbox" className="mb-0">
                      <Form.Check.Input
                        type="checkbox"
                        name="remember-me"
                        id="remember-me"
                        defaultChecked
                      />
                      <Form.Check.Label htmlFor="remember-me" className="mb-0">
                        Remember me
                      </Form.Check.Label>
                    </Form.Check>
                  </Col>
                  <Col xs="auto">
                    <Link
                      to={`/pages/authentication/${layout}/forgot-password`}
                      className="fs-9 fw-semibold"
                    >
                      Forgot Password?
                    </Link>
                  </Col>
                </Row>
                <Button
                  loading={isLoading}
                  type="submit"
                  variant="primary"
                  className="w-100 mb-3"
                >
                  Sign In
                </Button>
              </form>
            )}
          </Formik>
        </div>
      )}
    </>
  );
};

export default SignInForm;
