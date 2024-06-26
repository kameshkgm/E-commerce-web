import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Footer, Navbar } from "../components";
import axios from 'axios';
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput, MDBCheckbox } from 'mdb-react-ui-kit';

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/register', { fullName, email, password });
      console.log(response.data.message);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        console.error('Registration failed:', error.response.data.message);
        setError(error.response.data.message);
      } else {
        console.error('Registration failed:', error);
        setError('An error occurred while registering');
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };



  return (
    <>
      <Navbar />
      <MDBContainer fluid className="p-7 my-5 h-custom">
        <MDBRow>
        <MDBCol col='10' md='6'>
  <img src="https://content.digitalwallonia.be/post/470776-20210329121735223/industriedufutur_digitalwallonia-1024x547.jpg"style={{ width: '700px', height: '600px' }} className="img-fluid" alt=""/>
</MDBCol>


          <MDBCol col='4' md='6'>
            <div className="d-flex flex-row align-items-center justify-content-center">
              <p className="lead fw-normal mb-0 me-3">Sign up with</p>
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

            <form onSubmit={handleSubmit}>
              <MDBInput wrapperClass='mb-4' label='Full Name' id='formControlLg' type='text' size="lg"
                value={fullName} onChange={(e) => setFullName(e.target.value)} />
              <MDBInput wrapperClass='mb-4' label='Email address' id='formControlLg' type='email' size="lg"
                value={email} onChange={(e) => setEmail(e.target.value)} />
              <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg' type={showPassword ? "text" : "password"} size="lg"
                value={password} onChange={(e) => setPassword(e.target.value)} />
              <div className="input-group mb-4">
                <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
                <button className="btn btn-outline-secondary ms-2" type="button" onClick={togglePasswordVisibility}>
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              {error && <div className="alert alert-danger" role="alert">{error}</div>}

              <div className='text-center text-md-start mt-4 pt-2'>
                <MDBBtn className="mb-0 px-5" size='lg' type="submit">Register</MDBBtn>
                <p className="small fw-bold mt-2 pt-1 mb-2">Already have an account? <Link to="/" className="link-danger">Login</Link></p>
              </div>
            </form>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <Footer />
    </>
  );
};

export default Register;
