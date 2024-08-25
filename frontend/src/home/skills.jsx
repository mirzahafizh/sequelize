import React from 'react';

const Skills = () => {
  const baseImageUrl = `${import.meta.env.VITE_SERVER}/uploads/assets`;

  return (
    <section id="skills" className="container mx-auto p-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">Skills</h2>
      <div className="flex flex-wrap justify-between gap-8">
        {/* Skill Card 1 */}
        <div className="bg-white p-6 rounded-lg shadow-lg animate__animated animate__fadeIn animate__delay-1s flex-1">
          <div className="flex items-center mb-4">
            <svg className="w-8 h-8 text-blue-600 mr-3" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 0L2.5 21H21.5L12 0Z"></path>
            </svg>
            <h3 className="text-xl font-semibold mb-2">Pengembangan Web</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Berpengalaman dalam menciptakan pengalaman web yang dinamis menggunakan HTML, CSS, dan JavaScript, dengan keahlian dalam framework modern seperti React. Terampil dalam pengembangan server-side dengan PHP dan Node.js, serta berpengalaman dalam mengelola basis data dengan MySQL.
          </p>
          <div className="flex flex-wrap gap-4">
            {['html.png', 'css.svg.png', 'js.png', 'react.png', 'php.png', 'node.png', 'mysql.png'].map((icon) => (
              <div key={icon} className="flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full">
                <img src={`${baseImageUrl}/${icon}`} alt={icon.split('.')[0]} className="w-6 h-6 object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Skill Card 2 */}
        <div className="bg-white p-6 rounded-lg shadow-lg animate__animated animate__fadeIn animate__delay-2s flex-1">
          <div className="flex items-center mb-4">
            <svg className="w-8 h-8 text-purple-600 mr-3" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C8.69 20 6 17.31 6 14H8C8 16.21 9.79 18 12 18C14.21 18 16 16.21 16 14H18C18 17.31 15.31 20 12 20ZM12 4C9.33 4 7 6.33 7 9H9C9 7.34 10.34 6 12 6C13.66 6 15 7.34 15 9H17C17 6.33 14.67 4 12 4ZM9.5 9.5H14.5V11.5H9.5V9.5ZM9.5 13.5H14.5V15.5H9.5V13.5Z"></path>
            </svg>
            <h3 className="text-xl font-semibold mb-2">UI/UX Design</h3>
          </div>
          <p className="text-gray-600 mb-4">
            Berpengalaman dalam menciptakan desain yang ramah pengguna dan menarik secara visual menggunakan alat seperti Figma.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full">
              <img src={`${baseImageUrl}/figma.png`} alt="Figma" className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
