import React from 'react';
import { Award, Users, Heart, Star, MapPin } from 'lucide-react';

const AboutUs: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Transforming Healthcare with
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-600"> Innovation</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            We're dedicated to making quality healthcare accessible, affordable, and personalized for everyone through cutting-edge technology and compassionate care.
          </p>
        </div>

        {/* Mission & Values Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-8 rounded-2xl border border-blue-100 dark:border-blue-800">
            <div className="bg-blue-600 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
              <Heart className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Our Mission</h3>
            <p className="text-gray-600 dark:text-gray-400">
              To democratize healthcare by providing intelligent, accessible, and personalized medical solutions that empower individuals to take control of their health journey.
            </p>
          </div>

          <div className="bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-900/20 dark:to-teal-800/20 p-8 rounded-2xl border border-teal-100 dark:border-teal-800">
            <div className="bg-teal-600 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Our Values</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Compassion, innovation, and integrity guide everything we do. We believe in transparent, patient-centered care that respects privacy and promotes well-being.
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-8 rounded-2xl border border-green-100 dark:border-green-800">
            <div className="bg-green-600 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
              <Award className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">Our Vision</h3>
            <p className="text-gray-600 dark:text-gray-400">
              A world where everyone has instant access to reliable medical information and personalized healthcare guidance, regardless of location or circumstance.
            </p>
          </div>
        </div>

        {/* Statistics */}
        <div className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-3xl p-12 mb-20 text-white">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">50,000+</div>
              <div className="text-blue-100">Patients Helped</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">1,200+</div>
              <div className="text-blue-100">Medical Professionals</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">98%</div>
              <div className="text-blue-100">Satisfaction Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-blue-100">Available Support</div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Meet Our Expert Team</h3>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Our diverse team of medical professionals, engineers, and researchers work together to deliver exceptional healthcare solutions.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Dr. Sarah Johnson",
                role: "Chief Medical Officer",
                image: "https://images.pexels.com/photos/5407206/pexels-photo-5407206.jpeg?auto=compress&cs=tinysrgb&w=400",
                credentials: "MD, Internal Medicine"
              },
              {
                name: "Dr. Michael Chen",
                role: "Head of AI Research",
                image: "https://images.pexels.com/photos/6749778/pexels-photo-6749778.jpeg?auto=compress&cs=tinysrgb&w=400",
                credentials: "PhD, Computer Science"
              },
              {
                name: "Dr. Emily Rodriguez",
                role: "Director of Patient Care",
                image: "https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=400",
                credentials: "MD, Family Medicine"
              }
            ].map((member, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700">
                <img src={member.image} alt={member.name} className="w-full h-64 object-cover" />
                <div className="p-6">
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">{member.name}</h4>
                  <p className="text-blue-600 dark:text-blue-400 font-medium mb-2">{member.role}</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{member.credentials}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;