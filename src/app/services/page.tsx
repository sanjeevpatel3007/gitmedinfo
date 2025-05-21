'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Define service types
interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export default function ServicesPage() {
  // Services data
  const services: Service[] = [
    {
      id: 'medicine-catalog',
      title: 'Medicine Catalog',
      description: 'Access our comprehensive database of medicines with detailed information about dosage, side effects, and usage instructions.',
      icon: '/icons/medicine.svg',
      features: [
        'Search by name, category, or symptoms',
        'Detailed medicine information',
        'Side effects and contraindications',
        'Generic alternatives when available',
        'User reviews and ratings'
      ]
    },
    {
      id: 'health-tracking',
      title: 'Health Tracking',
      description: 'Monitor your health metrics and medication schedule with our easy-to-use tracking tools.',
      icon: '/icons/health.svg',
      features: [
        'Medication reminders',
        'Symptom tracking',
        'Health metrics monitoring',
        'Progress reports',
        'Shareable data with healthcare providers'
      ]
    },
    {
      id: 'consultation',
      title: 'Online Consultation',
      description: 'Connect with healthcare professionals for advice and guidance on medication and health concerns.',
      icon: '/icons/consultation.svg',
      features: [
        'Chat with pharmacists',
        'Video consultations',
        'Prescription reviews',
        'Medication interaction checks',
        '24/7 emergency support'
      ]
    },
    {
      id: 'delivery',
      title: 'Medicine Delivery',
      description: 'Get your prescribed medications delivered to your doorstep with our reliable delivery service.',
      icon: '/icons/delivery.svg',
      features: [
        'Same-day delivery options',
        'Secure packaging',
        'Real-time tracking',
        'Temperature-controlled transport',
        'Contactless delivery'
      ]
    }
  ];

  const [activeService, setActiveService] = useState<string>(services[0].id);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Health Services</h1>
            <p className="text-xl opacity-90 mb-8">
              Comprehensive healthcare solutions to support your well-being and medication needs
            </p>
            <Link 
              href="/contact" 
              className="inline-block bg-white text-blue-700 font-medium px-6 py-3 rounded-lg hover:bg-blue-50 transition duration-300"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-7xl mx-auto">
          {/* Service Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {services.map((service) => (
              <button
                key={service.id}
                onClick={() => setActiveService(service.id)}
                className={`px-5 py-3 rounded-lg font-medium transition-all duration-300 ${
                  activeService === service.id
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {service.title}
              </button>
            ))}
          </div>

          {/* Service Details */}
          {services.map((service) => (
            <div
              key={service.id}
              className={`transition-all duration-500 ${
                activeService === service.id ? 'block' : 'hidden'
              }`}
            >
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/2 p-8 md:p-12">
                    <div className="inline-block p-3 bg-blue-100 rounded-lg mb-6">
                      <div className="w-12 h-12 flex items-center justify-center text-blue-600">
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd"></path>
                        </svg>
                      </div>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">{service.title}</h2>
                    <p className="text-lg text-gray-600 mb-8">{service.description}</p>
                    
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Key Features</h3>
                    <ul className="space-y-3">
                      {service.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <span className="flex-shrink-0 h-6 w-6 text-green-500">
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                          </span>
                          <span className="ml-3 text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="mt-10">
                      <Link 
                        href={`/services/${service.id}`}
                        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Learn More
                        <svg className="ml-2 -mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                  <div className="md:w-1/2 bg-gray-100 flex items-center justify-center p-12">
                    <div className="w-full max-w-md h-64 relative">
                      <div className="absolute inset-0 bg-blue-600 rounded-lg opacity-10"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg className="w-32 h-32 text-blue-600 opacity-50" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.5 3a.5.5 0 01.5.5V4h8v-.5a.5.5 0 011 0V4h1a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V5a1 1 0 011-1h1v-.5a.5.5 0 01.5-.5zM16 6H4v10h12V6z" clipRule="evenodd"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-blue-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to get started?</h2>
            <p className="text-xl opacity-90 mb-8">
              Join thousands of users who trust our platform for their healthcare needs
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                href="/auth/register" 
                className="inline-block bg-white text-blue-700 font-medium px-6 py-3 rounded-lg hover:bg-blue-50 transition duration-300"
              >
                Sign Up Now
              </Link>
              <Link 
                href="/contact" 
                className="inline-block bg-transparent text-white border border-white font-medium px-6 py-3 rounded-lg hover:bg-blue-800 transition duration-300"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 