import React from 'react';
import InfiniteCarousel from './Carousel';

const TeamMember = ({ name, role, image }) => (
  <div className="flex flex-col items-center p-4">
    <img src={image} alt={name} className="w-32 h-32 rounded-full mb-4" />
    <h3 className="text-xl font-semibold">{name}</h3>
    <p className="text-gray-600">{role}</p>
  </div>
);

const HomePage = () => {
  const screenshots = [
    '/api/placeholder/800/600',
    '/api/placeholder/800/600',
    '/api/placeholder/800/600'
  ];

  const teamMembers = [
    { name: 'John Doe', role: 'Lead Developer', image: '/api/placeholder/200/200' },
    { name: 'Jane Smith', role: 'UI/UX Designer', image: '/api/placeholder/200/200' },
    { name: 'Mike Johnson', role: 'ML Engineer', image: '/api/placeholder/200/200' }
  ];

  return (
    <div className="container mx-auto px-4">
      {/* Hero Section */}
      <section className="py-16 text-center">
        <h1 className="text-4xl font-bold mb-6">&lt;majorProject /&gt;</h1>
        <p className="text-xl text-gray-600 mb-8">
          A cutting-edge face recognition system built with React and TensorFlow.js.
          Our solution provides real-time face detection and matching capabilities.
        </p>
      </section>

      {/* Screenshots Section */}
      <section className="py-8">
        <h2 className="text-3xl font-bold mb-8 text-center">Project Screenshots</h2>
        <InfiniteCarousel images={screenshots} />
      </section>

      {/* Team Section */}
      <section className="py-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <TeamMember key={index} {...member} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-4 bg-gray-100 text-center text-gray-700">
        <p>© 2024 &lt;majorProject /&gt;. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
