import React from 'react'
import Layout from '../components/Layout/Layout'

const AboutUs = () => {
  return (
    <Layout>
{/* About 4 - Bootstrap Brain Component */}
<section className="py-3 py-md-5 py-xl-8">
  <div className="container">
    <div className="row">
      <div className="col-12 col-md-10 col-lg-8">
        <h3 className="fs-5 mb-2 text-secondary text-uppercase">About</h3>
        <h2 className="display-5 mb-4">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Exercitationem ad delectus laboriosam a ab reprehenderit quis adipisci. Assumenda, facere. Nostrum accusantium omnis amet id ipsum nisi. Veritatis consectetur maxime doloribus!</h2>
        <button type="button" className="btn btn-lg btn-primary mb-3 mb-md-4 mb-xl-5">Connect Now</button>
      </div>
    </div>
  </div>
  <div className="container">
    <div className="row gy-3 gy-md-4 gy-lg-0">
      <div className="col-12 col-lg-6">
        <div className="card bg-light p-3 m-0">
          <div className="row gy-3 gy-md-0 align-items-md-center">
            <div className="col-md-5">
              <img src="images.png" className="img-fluid rounded-start" alt="..." />
            </div>
            <div className="col-md-7">
              <div className="card-body p-0">
                <h2 className="card-title h4 mb-3">Why Choose Us?</h2>
                <p className="card-text lead">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione dolore soluta non? Adipisci, quas quaerat, saepe excepturi a aut similique odit fugiat ad esse sunt nihil provident ullam fugit placeat.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-12 col-lg-6">
        <div className="card bg-light p-3 m-0">
          <div className="row gy-3 gy-md-0 align-items-md-center">
            <div className="col-md-5">
              <img src="images.png" className="img-fluid rounded-start" alt="..." />
            </div>
            <div className="col-md-7">
              <div className="card-body p-0">
                <h2 className="card-title h4 mb-3">Visionary Team</h2>
                <p className="card-text lead">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sapiente dignissimos repudiandae velit! Soluta vitae in eveniet saepe atque debitis reprehenderit ad ipsum! Ab accusamus blanditiis voluptates</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

    </Layout>

  )
}

export default AboutUs