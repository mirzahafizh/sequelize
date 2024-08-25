import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto flex flex-wrap justify-between px-8 font-mono">
        {/* Zash Tech Section */}
        <div className="w-full md:w-1/2 lg:w-1/4 mb-8 md:mb-0">
          <h2 className="text-lg font-semibold mb-4">ITSpace</h2>
          <p>Building the Future with Advanced Technology.</p>
        </div>

        {/* Useful Links Section */}
        <div className="w-full md:w-1/2 lg:w-1/4 mb-8 md:mb-0">
          <h2 className="text-lg font-semibold mb-4">Useful Links</h2>
          <ul className="list-none p-0">
            <li className="mb-2">
              <a href="#hero" className="hover:underline">About</a>
            </li>
            <li className="mb-2">
              <a href="#projects" className="hover:underline">Projects</a>
            </li>
            <li>
              <a href="#contact" className="hover:underline">Contact</a>
            </li>
          </ul>
        </div>

        {/* Contact Info Section */}
        <div className="w-full md:w-1/2 lg:w-1/4 mb-8 md:mb-0">
          <h2 className="text-lg font-semibold mb-4">Contact Info</h2>

          <p>
            Phone: <a href="https://wa.me/6282154170626" target="_blank" rel="noopener noreferrer" className="hover:underline">+6282154170626</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
