import React from 'react'
import { Footer, Navbar } from "../components";
const AboutPage = () => {
  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">About Us</h1>
        <hr />
        <p className="lead text-center">Welcome to Electronics by SK, your premier destination for electronic components and accessories.

At Electronics by SK, we specialize in providing a vast selection of top-quality electronic components to DIY enthusiasts, hobbyists, engineers, and professionals alike.

Our mission is simple i.e, to offer a seamless shopping experience, exceptional customer service, and unparalleled expertise in electronic components.

With a commitment to quality and reliability, we source our products from trusted manufacturers to ensure that you receive only the best components for your projects.

Whether you're working on a small DIY project or a large-scale electronic endeavor, our dedicated team is here to help you find the perfect components to bring your ideas to life.

Thank you for choosing Electronics by SK as our trusted partner in electronics. We look forward to serving you and being a part of your electronic journey.

        </p>

        <h2 className="text-center py-4">Our Products</h2>
        <div className="row">
          <div className="col-md-3 col-sm-6 mb-3 px-3">
            <div className="card h-100">
              <img className="card-img-top img-fluid" src="https://2.bp.blogspot.com/-R35EaUxbjW0/V-Kb91s_IeI/AAAAAAAAA74/ZtL3QOGK1n43XU1FlwFEOGN3t-38M9_TwCLcB/s1600/ELECTRIC1.jpg" alt="" height={160} />
              <div className="card-body">
                <h5 className="card-title text-center">Passive components</h5>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 mb-3 px-3">
            <div className="card h-100">
              <img className="card-img-top img-fluid" src="https://www.hackatronic.com/wp-content/uploads/2019/12/active-electronic-components.jpg" alt="" height={160} />
              <div className="card-body">
                <h5 className="card-title text-center">Active components</h5>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 mb-3 px-3">
            <div className="card h-100">
              <img className="card-img-top img-fluid" src="https://5.imimg.com/data5/SELLER/Default/2020/12/OZ/EP/GL/7590293/lpt-18054-luminous-battery.jpg" alt="" height={160} />
              <div className="card-body">
                <h5 className="card-title text-center">Batteries</h5>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-sm-6 mb-3 px-3">
            <div className="card h-100">
              <img className="card-img-top img-fluid" src="https://bulkdevices.co.uk/pub/media/mageplaza/blog/post/c/o/computer_storage.jpg" alt="" height={160} />
              <div className="card-body">
                <h5 className="card-title text-center">Storage devices</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default AboutPage