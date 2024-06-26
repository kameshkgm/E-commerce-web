import React, { useState, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import { Footer, Navbar } from "../components";
import axios from 'axios';
import { AuthContext } from "../components/AuthContext"; 
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox, MDBCard, MDBCardBody } from 'mdb-react-ui-kit';
// import './components/Styling/Loginform.scss'; // Adjust path based on your directory structure


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const authContext = useContext(AuthContext); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/login', { email, password });
      const userDetails = response.data.user;
      authContext.login(userDetails);
      console.log('Login successful:', userDetails);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        console.error('Login failed:', error.response.data.message);
        setError(error.response.data.message);
      } else {
        console.error('Login failed:', error);
        setError('An error occurred while logging in');
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  if (authContext.loggedIn) {
    return <Navigate to="/home" />;
  }

  return (
    <>
      <Navbar />
      <MDBContainer fluid className="p-3 my-5 h-custom">
        <MDBRow>
          <MDBCol col='10' md='6'>
            <img src="https://blogs.sw.siemens.com/wp-content/uploads/sites/3/2020/02/3Pillars4FutureElectronicsManufacturing.jpg" className="img-fluid" alt="" />
          </MDBCol>

          <MDBCol col='4' md='6'>
            <div className="d-flex flex-row align-items-center justify-content-center">
              <p className="lead fw-normal mb-0 me-3">Sign in with</p>
              <MDBBtn floating size='md' tag='a' className='me-2'>
                <MDBIcon fab icon='facebook-f' />
              </MDBBtn>
              <MDBBtn floating size='md' tag='a' className='me-2'>
                <MDBIcon fab icon='twitter' />
              </MDBBtn>
              <MDBBtn floating size='md' tag='a' className='me-2'>
                <MDBIcon fab icon='linkedin-in' />
              </MDBBtn>
            </div>

            <div className="divider d-flex align-items-center my-4">
              <p className="text-center fw-bold mx-3 mb-0">Or</p>
            </div>

            <MDBCard className="card">
              <MDBCardBody>
                <form onSubmit={handleSubmit}>
                  <MDBInput wrapperClass='mb-4' label='Email address' id='formControlLg' type='email' size="lg"
                    value={email} onChange={(e) => setEmail(e.target.value)} />
                  
                  <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg' type={showPassword ? "text" : "password"} size="lg"
                    value={password} onChange={(e) => setPassword(e.target.value)}
                    append={
                      <button className="btn btn-outline-secondary" type="button" onClick={togglePasswordVisibility}>
                        <MDBIcon icon={showPassword ? "eye-slash" : "eye"} />
                      </button>
                    }
                  />
                  
                  <div className="input-group mb-4">
                    <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
                    <a href="!#" className="ms-auto">Forgot password?</a>
                  </div>

                  {error && <div className="alert alert-danger" role="alert">{error}</div>}

                  <div className='text-center text-md-start mt-4 pt-2'>
                    <MDBBtn className="mb-0 px-5" size='lg' type="submit">Login</MDBBtn>
                    <p className="small fw-bold mt-2 pt-1 mb-2">Don't have an account? <Link to="/register" className="link-danger">Register</Link></p>
                  </div>
                </form>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <Footer />
    </>
  );
};

export default Login;
