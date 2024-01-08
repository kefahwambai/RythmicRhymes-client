import React from 'react';

const Footer = () => {
    let date = new Date();
    let year = date.getFullYear();
  return (
    <footer className="text-center bg-body-tertiary">
        
      <div 
        className="text-center p-3"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © {year} Copyright:{' '}
        
        <a className="text-body" href="https://kefahwambai.com/" target="_blank">
          kefahwambai.com
        </a>
      </div>
      
    </footer>
  );
};

export default Footer;
