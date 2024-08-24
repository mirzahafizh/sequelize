import 'animate.css';
import React from 'react';

const Hero = () => {
  // You can directly define the image URL here
  const imageUrl = 'http://localhost:3000/uploads/ITSPACE.png'; // Replace with the actual image URL

  return (
    <section id="hero" className="container mx-auto p-4 md:p-8 flex flex-col md:flex-row items-stretch gap-8 mt-20">
      <div className="w-full md:w-1/2 p-4 flex flex-col justify-center animate__animated animate__bounceInLeft">
        <h1 className="font-bold text-2xl md:text-4xl">Selamat Datang di IT.Space</h1>
        <p className="mt-4 text-base md:text-lg text-focus-in text-justify">
        IT.Space adalah penyedia layanan teknologi yang berkomitmen untuk menyediakan solusi inovatif dan efektif dalam pengembangan web. Kami menggabungkan kreativitas dan keahlian teknis untuk menciptakan situs web yang tidak hanya menarik tetapi juga memberikan performa yang optimal.
        </p>
      </div>
      <div className="w-full md:w-1/2 p-4 flex items-center justify-center animate__animated animate__bounceInRight hidden md:flex">
        {imageUrl && (
          <img
            src={imageUrl}
            alt="Zash Tech Hero"
            className="h-40 w-40 md:h-60 md:w-60 shadow-lg shadow-gray-500 object-cover rounded-full mt-4"
          />
        )}
      </div>
    </section>
  );
};

export default Hero;
