import React from 'react';
import { Shield, CarFront, Code } from 'lucide-react';
import InfiniteCarousel from './Carousel';
import image1 from '../assets/images/1.jpg';
import image2 from '../assets/images/2.jpg';
import image3 from '../assets/images/3.jpg';
import image4 from '../assets/images/4.jpg';
import image5 from '../assets/images/5.jpg';

// Feature Card Component
const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 text-center">
    <div className="mb-4 flex justify-center">
      <Icon className="text-purple-600 w-12 h-12" />
    </div>
    <h3 className="text-xl font-semibold text-purple-800 mb-3">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const HomePage = () => {
  const screenshots = [image1, image2, image3, image4, image5];

  const features = [
    {
      icon: Shield,
      title: 'Advanced Security',
      description: 'Cutting-edge face recognition technology to prevent unauthorized vehicle access.'
    },
    {
      icon: CarFront,
      title: 'Vehicle Integration',
      description: 'Seamless implementation with Raspberry Pi for smart vehicle protection.'
    },
    {
      icon: Code,
      title: 'Open Source',
      description: 'Transparent and customizable solution for developers and security enthusiasts.'
    }
  ];

  return (
    <div className="bg-gray-50">
      {/* Hero Section with Animated Background */}
      <section className="relative py-32 bg-gradient-to-br from-purple-600 to-indigo-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center leading-tight">
            Anti Car Theft Using 
            <span className="block text-yellow-300 mt-2">Face Recognition</span>
          </h1>
          <p className="text-xl text-white/90 mb-8 text-center max-w-4xl mx-auto">
            Revolutionizing vehicle security through intelligent face recognition technology. 
            Our innovative solution leverages Raspberry Pi and advanced machine learning 
            to provide unparalleled protection and peace of mind.
          </p>
          <div className="flex justify-center space-x-4">
            <a 
              href="/face-recognition" 
              className="
                inline-block bg-yellow-400 text-purple-900 
                font-semibold py-3 px-6 rounded-full 
                hover:bg-yellow-500 transition duration-300 
                transform hover:-translate-y-1 shadow-lg
                no-underline flex items-center
              "
            >
              Face Recognition <Shield className="ml-2" />
            </a>
            <a 
              href="/documentation" 
              className="
                inline-block border-2 border-white 
                text-white font-semibold py-3 px-6 
                rounded-full hover:bg-white hover:text-purple-700 
                transition duration-300 transform hover:-translate-y-1
                no-underline flex items-center
              "
            >
              Documentation
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-purple-800">
            Project Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Screenshots Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center text-purple-800">
            Project Visualization
          </h2>
          <InfiniteCarousel images={screenshots} />
        </div>
      </section>
    </div>
  );
};

export default HomePage;

// Custom CSS for background pattern (you'd typically put this in a separate CSS file)
const styles = `
.bg-pattern {
  background-image: 
    linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%), 
    linear-gradient(-45deg, rgba(255,255,255,0.1) 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, rgba(255,255,255,0.1) 75%),
    linear-gradient(-45deg, transparent 75%, rgba(255,255,255,0.1) 75%);
  background-size: 20px 20px;
  background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
}
`;
