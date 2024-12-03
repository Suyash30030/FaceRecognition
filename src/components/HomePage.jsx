import React from 'react';
import { Shield, CarFront, Code, TrendingUp, Lock } from 'lucide-react';
import InfiniteCarousel from './Carousel';
import image1 from '../assets/images/1.jpg';
import image2 from '../assets/images/2.jpg';
import image3 from '../assets/images/3.jpg';
import image4 from '../assets/images/4.jpg';
import image5 from '../assets/images/5.jpg';

// Feature Card Component with Enhanced Design
const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="
    bg-white p-6 rounded-xl shadow-lg 
    hover:shadow-2xl transition-all duration-300 
    transform hover:-translate-y-2 
    border-b-4 border-purple-500
    flex flex-col items-center
  ">
    <div className="
      mb-4 p-4 rounded-full 
      bg-purple-100 text-purple-600 
      inline-flex items-center justify-center
    ">
      <Icon className="w-8 h-8" />
    </div>
    <h3 className="text-xl font-bold text-purple-800 mb-3 text-center">
      {title}
    </h3>
    <p className="text-gray-600 text-center leading-relaxed">
      {description}
    </p>
  </div>
);

const HomePage = () => {
  const screenshots = [image1, image2, image3, image4, image5];

  const features = [
    {
      icon: Lock,
      title: 'TensorFlow Face Recognition',
      description: 'Advanced face recognition powered by TensorFlow, enabling precise and robust identity verification.'
    },
    {
      icon: CarFront,
      title: 'Blazeface API Integration',
      description: 'Utilizing Blazeface API with Intersection over Union (IoU) for accurate and real-time face detection.'
    },
    {
      icon: Code,
      title: 'React.js Face Comparison',
      description: 'Leveraging React.js libraries for efficient and dynamic face comparison technologies.'
    }
  ];

  return (
    <div className="bg-gray-50">
      {/* Enhanced Hero Section with Modern Design */}
      <section className="
        relative py-32 
        bg-gradient-to-br from-purple-600 to-indigo-700 
        text-white overflow-hidden
      ">
        <div className="
          absolute inset-0 
          bg-pattern opacity-10 
          animate-pulse
        "></div>
        <div className="
          container mx-auto px-4 
          relative z-10 
          flex flex-col items-center
        ">
          <h1 className="
            text-4xl md:text-6xl font-extrabold 
            mb-6 text-center leading-tight
            bg-clip-text text-transparent 
            bg-gradient-to-r from-white to-yellow-300
          ">
            Next-Generation Vehicle Security
          </h1>
          <p className="
            text-xl text-white/90 mb-8 
            text-center max-w-3xl mx-auto
            leading-relaxed
          ">
            Empowering vehicle owners with state-of-the-art security technologies. 
            Our innovative solution combines advanced machine learning, 
            real-time monitoring, and intelligent protection systems 
            to ensure unparalleled safety and peace of mind.
          </p>
          <div className="flex justify-center space-x-4">
            <a 
              href="#features" 
              className="
                inline-block bg-yellow-400 text-purple-900 
                font-semibold py-3 px-6 rounded-full 
                hover:bg-yellow-500 transition duration-300 
                transform hover:-translate-y-1 shadow-lg
                no-underline flex items-center
                group
              "
            >
              Explore Features 
              <Shield className="ml-2 group-hover:rotate-12 transition-transform" />
            </a>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="
            text-4xl font-bold mb-16 text-center 
            text-purple-900 
            bg-clip-text text-transparent 
            bg-gradient-to-r from-purple-600 to-indigo-700
          ">
            Innovative Protection Technologies
          </h2>
          <div className="
            grid grid-cols-1 md:grid-cols-3 gap-8
            place-items-stretch
          ">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* Screenshots Section with Enhanced Typography */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="
            text-4xl font-bold mb-12 text-center 
            text-purple-900
            bg-clip-text text-transparent 
            bg-gradient-to-r from-purple-600 to-indigo-700
          ">
            Project Visualization
          </h2>
          <InfiniteCarousel images={screenshots} />
        </div>
      </section>
    </div>
  );
};

export default HomePage;

// Custom CSS for background pattern
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

@keyframes pulse {
  0%, 100% { opacity: 0.1; }
  50% { opacity: 0.2; }
}

.animate-pulse {
  animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
`;
