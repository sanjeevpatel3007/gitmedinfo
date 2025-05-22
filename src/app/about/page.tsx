import React from 'react';
import Image from 'next/image';

export default function AboutPage() {
  // Team members data
  const teamMembers = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Medical Director',
      image: '/images/team/sarah.jpg',
      bio: 'Dr. Johnson leads our medical verification team, bringing over 15 years of pharmaceutical experience to ensure accuracy in our medicine database.'
    },
    {
      name: 'Alex Chen',
      role: 'Technical Lead',
      image: '/images/team/alex.jpg',
      bio: 'Alex oversees our platform development and ensures our database remains secure, fast, and accessible to all users.'
    },
    {
      name: 'Maya Patel',
      role: 'Content Manager',
      image: '/images/team/maya.jpg',
      bio: 'Maya manages our content team, making sure complex medical information is presented in a clear, understandable format.'
    },
    {
      name: 'Dr. James Wilson',
      role: 'Research Advisor',
      image: '/images/team/james.jpg',
      bio: 'Dr. Wilson coordinates with medical institutions to keep our database updated with the latest research findings and medical guidelines.'
    }
  ];
  
  // Company values
  const values = [
    {
      title: 'Accuracy',
      description: 'We prioritize the accuracy of our medical information above all else, with rigorous verification processes.',
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      )
    },
    {
      title: 'Accessibility',
      description: 'Making medical information accessible to everyone in clear, understandable language.',
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      )
    },
    {
      title: 'Transparency',
      description: 'We are transparent about our sources and update processes for all medical information.',
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
        </svg>
      )
    },
    {
      title: 'User Privacy',
      description: 'We respect user privacy and maintain the highest standards of data protection.',
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
        </svg>
      )
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('/images/pattern-light.svg')] bg-repeat bg-center"></div>
        </div>
        
        <div className="container mx-auto px-4 py-24 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">About GetMedInfo</h1>
            <p className="text-xl text-blue-100 mb-8">
              Our mission is to provide reliable, accessible medical information to everyone who needs it
            </p>
          </div>
        </div>
      </div>

      {/* Our Story */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:gap-x-16">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-6 text-lg text-gray-600">
                <p>
                  GetMedInfo was founded in 2018 by a team of healthcare professionals and technology experts who recognized the need for accessible, reliable medical information online.
                </p>
                <p>
                  What started as a small database of common medicines has grown into a comprehensive platform with detailed information on thousands of medicines, helping millions of people better understand their medications.
                </p>
                <p>
                  Today, our team of medical professionals, researchers, and technology specialists work together to maintain and expand our database, ensuring that you have access to the most accurate and up-to-date medical information.
                </p>
              </div>
            </div>
            
            <div className="mt-10 lg:mt-0 lg:w-1/2">
              <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-lg">
                <Image 
                  src="/images/about/our-story.jpg" 
                  alt="GetMedInfo team working" 
                  fill 
                  style={{ objectFit: 'cover' }}
                  className="rounded-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide our work and ensure we provide the best service to our users
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all duration-300">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The dedicated professionals working to bring you reliable medical information
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
                <div className="relative h-64">
                  <Image 
                    src={member.image} 
                    alt={member.name} 
                    fill 
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-blue-600 mb-4">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Join Us in Our Mission</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Help us make reliable medical information accessible to everyone by supporting our platform or joining our team
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="/contact" 
              className="inline-flex items-center px-6 py-3 bg-white text-blue-700 font-medium rounded-lg hover:bg-blue-50 transition duration-300"
            >
              Contact Us
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </a>
            <a 
              href="/careers" 
              className="inline-flex items-center px-6 py-3 bg-transparent text-white border border-white font-medium rounded-lg hover:bg-white/10 transition duration-300"
            >
              Careers
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
} 