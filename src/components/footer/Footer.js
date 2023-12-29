import React from 'react';

const Footer = () => {
    let date = new Date();
    let year = date.getFullYear();
  return (
    <footer className="text-center bg-body-tertiary">
      {/* Grid container */}
      <div className="container pt-4">
        {/* Section: Social media */}
        <section className="mb-4">
        
          {/* Twitter */}
          <a
            data-mdb-ripple-init
            className="btn btn-link btn-floating btn-lg text-body m-1"
            href="#!"
            role="button"
            data-mdb-ripple-color="dark"
          >
            <i className="fab fa-twitter"></i>
          </a>

          {/* Instagram */}
          <a
            data-mdb-ripple-init
            className="btn btn-link btn-floating btn-lg text-body m-1"
            href="#!"
            role="button"
            data-mdb-ripple-color="dark"
          >
            <i className="fab fa-instagram"></i>
          </a>

          {/* Linkedin */}
          <a
            data-mdb-ripple-init
            className="btn btn-link btn-floating btn-lg text-body m-1"
            href="#!"
            role="button"
            data-mdb-ripple-color="dark"
          >
            <i className="fab fa-linkedin"></i>
          </a>

        </section>
       
      </div>
     
      <div
        className="text-center p-3"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}
      >
        © {year} Copyright:{' '}
        <a className="text-body" href="https://kefahwambai.com/" target="_blank">
          kefahwambai.com
        </a>
      </div>
      
    </footer>
  );
};

export default Footer;
