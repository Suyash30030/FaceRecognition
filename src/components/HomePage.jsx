import React from 'react';
import InfiniteCarousel from './Carousel';
import image1 from '../assets/images/1.jpg';
import image2 from '../assets/images/2.jpg';
import image3 from '../assets/images/3.jpg';
import image4 from '../assets/images/4.jpg';
import image5 from '../assets/images/5.jpg';

const TeamMember = ({ name, role, section }) => (
  <div className="flex flex-col items-center p-6 bg-white border border-purple-300 rounded-lg shadow-md">
    <h3 className="text-2xl font-semibold text-purple-800 mb-2">{name}</h3>
    <p className="text-gray-700 text-lg">{role}</p>
    <p className="text-gray-500 text-sm">{section}</p>
  </div>
);

const HomePage = () => {
  const screenshots = [image1, image2, image3, image4, image5];

  const teamMembers = [
    { name: 'Suyash Parganiha', role: '2130153', section: 'Electronics & Computer Science' },
    { name: 'Subhasish Sahoo', role: '2130150', section: 'Electronics & Computer Science' },
    { name: 'Sai Sritam Sarangi', role: '2130160', section: 'Electronics & Computer Science' },
    { name: 'Siwen Mohapatra', role: '2130138', section: 'Electronics & Computer Science' },
  ];

  const techStack = ['Raspberry Pi', 'TensorFlow.js', 'JavaScript', 'React', 'Firebase'];

  return (
    <div className="bg-gray-100">
      {/* Hero Section */}
      <section className="py-20 bg-white">
        <h1 className="text-4xl font-bold mb-6 text-purple-800 text-center">Anti Car Theft Using Face Recognition - Implemented Using Raspberry Pi</h1>
        <p className="text-xl text-gray-700 mb-8 px-4 md:px-12 lg:px-24">
          The "Anti Car Theft Using Face Recognition" project represents a significant advancement in vehicle security technology. By combining face recognition capabilities with the compact and efficient Raspberry Pi, this solution not only helps in preventing car theft incidents but also provides a seamless user experience for authorized individuals. This project stands as a testament to the potential of integrating artificial intelligence and IoT in everyday applications, making transportation safer and more secure.
        </p>
        <div className="text-center">
          <a href="/face-verify" className="inline-block bg-purple-600 text-white font-semibold py-2 px-4 rounded hover:bg-purple-700 transition duration-200 no-underline">
            Get Started ⬈
          </a>
        </div>
      </section>

      {/* Screenshots Section */}
      <section className="py-12 bg-gray-100">
        <h2 className="text-3xl font-bold mb-8 text-center text-purple-800">Project Screenshots</h2>
        <div className="mx-4 md:mx-8 lg:mx-16">
          <InfiniteCarousel images={screenshots} />
        </div>
      </section>

      {/* Technology Stack Section */}
      <section className="py-12 bg-white">
        <h2 className="text-3xl font-bold mb-8 text-center text-purple-800">Technology Stack</h2>
        <ul className="flex justify-center space-x-6">
          {techStack.map((tech, index) => (
            <li key={index} className="text-lg text-purple-600">{tech}</li>
          ))}
        </ul>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-100">
        <h2 className="text-3xl font-bold mb-8 text-center text-purple-800">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4 md:px-8 lg:px-16">
          {teamMembers.map((member, index) => (
            <TeamMember key={index} {...member} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
