'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Defined types for our help content
interface HelpTopic {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export default function HelpCenterPage() {
  // State for search
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeFAQ, setActiveFAQ] = useState<string | null>(null);
  
  // Help Topics
  const helpTopics: HelpTopic[] = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      description: 'New to GetMedInfo? Learn how to make the most of our platform.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
        </svg>
      )
    },
    {
      id: 'medicine-search',
      title: 'Finding Medicines',
      description: 'Tips and tricks for finding the medicine information you need quickly.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
      )
    },
    {
      id: 'understanding-info',
      title: 'Understanding Medicine Info',
      description: 'Learn how to interpret the medicine information provided on our platform.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
        </svg>
      )
    },
    {
      id: 'account-settings',
      title: 'Account & Settings',
      description: 'Manage your account, preferences, and personalized features.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
        </svg>
      )
    },
    {
      id: 'troubleshooting',
      title: 'Troubleshooting',
      description: 'Solutions to common issues and technical problems.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path>
        </svg>
      )
    },
    {
      id: 'data-privacy',
      title: 'Data & Privacy',
      description: 'Learn about how we protect your data and privacy.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
        </svg>
      )
    }
  ];
  
  // FAQ data
  const faqData: FAQItem[] = [
    {
      question: "How do I create an account?",
      answer: "To create an account, click on the 'Sign Up' button in the top right corner of the page. Fill in your details, verify your email address, and you're ready to go!",
      category: "account-settings"
    },
    {
      question: "How do I search for a specific medicine?",
      answer: "You can use the search bar at the top of our website to look for specific medicines by name, active ingredient, or condition. The search feature supports partial matches and auto-suggestions to help you find what you need quickly.",
      category: "medicine-search"
    },
    {
      question: "How accurate is the medicine information?",
      answer: "All information on GetMedInfo is thoroughly researched and verified by healthcare professionals. We update our database regularly to ensure accuracy and compliance with the latest medical guidelines.",
      category: "understanding-info"
    },
    {
      question: "What do I do if I forgot my password?",
      answer: "If you forgot your password, go to the login page and click on 'Forgot Password'. Enter your email address and follow the instructions sent to your inbox to reset your password.",
      category: "account-settings"
    },
    {
      question: "How often is the medicine database updated?",
      answer: "Our database is updated monthly with new medicines and latest information. For critical updates on existing medicines, we implement changes immediately upon verified information becoming available.",
      category: "understanding-info"
    },
    {
      question: "Can I save medicines to view later?",
      answer: "Yes, when logged in, you can save medicines to your personal list by clicking the bookmark icon on any medicine page. Access your saved medicines from your account dashboard.",
      category: "getting-started"
    },
    {
      question: "Why can't I find a specific medicine?",
      answer: "We're constantly expanding our database. If you can't find a specific medicine, it might not be in our system yet. You can request it to be added via the 'Contact Us' form.",
      category: "troubleshooting"
    },
    {
      question: "How do I report incorrect information?",
      answer: "If you find any inaccurate information, use the 'Report' button on the medicine page, or contact us directly with details of the correction needed.",
      category: "troubleshooting"
    },
    {
      question: "Is my search history stored?",
      answer: "Search history is only stored if you are logged into your account and have this feature enabled in your privacy settings. You can clear your history at any time from your account dashboard.",
      category: "data-privacy"
    }
  ];
  
  // Filter FAQs based on search query and category
  const filteredFAQs = faqData.filter(faq => {
    const matchesSearch = searchQuery === '' || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  const toggleFAQ = (question: string) => {
    setActiveFAQ(activeFAQ === question ? null : question);
  };

  // Categories
  const categories = [
    { id: 'all', name: 'All Topics' },
    { id: 'getting-started', name: 'Getting Started' },
    { id: 'medicine-search', name: 'Finding Medicines' },
    { id: 'understanding-info', name: 'Understanding Info' },
    { id: 'account-settings', name: 'Account & Settings' },
    { id: 'troubleshooting', name: 'Troubleshooting' },
    { id: 'data-privacy', name: 'Data & Privacy' }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Help Center</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-10">
            Find answers to your questions and learn how to get the most out of GetMedInfo
          </p>
          
          {/* Search */}
          <div className="max-w-xl mx-auto relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search for help topics..."
              className="w-full pl-10 pr-4 py-3 rounded-full border-0 shadow focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
        </div>
      </div>

      {/* Help Topics */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Browse Help Topics</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {helpTopics.map((topic) => (
              <Link 
                href={`/help/${topic.id}`} 
                key={topic.id}
                className="bg-white rounded-xl p-8 border border-gray-200 shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
                  {topic.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{topic.title}</h3>
                <p className="text-gray-600">{topic.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Guides */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Popular User Guides</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Step-by-step guides to help you navigate our platform with ease
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "How to Search for Medicines",
                image: "/images/help/search-guide.jpg",
                link: "/help/guides/search"
              },
              {
                title: "Understanding Medicine Interactions",
                image: "/images/help/interactions-guide.jpg",
                link: "/help/guides/interactions"
              },
              {
                title: "Creating and Managing Your Account",
                image: "/images/help/account-guide.jpg",
                link: "/help/guides/account"
              }
            ].map((guide, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-200">
                <div className="relative h-48 bg-blue-100">
                  <div className="absolute inset-0 flex items-center justify-center text-blue-300">
                    <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                    </svg>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{guide.title}</h3>
                  <p className="text-gray-600 mb-4">Step-by-step instructions to help you make the most of this feature.</p>
                  <Link href={guide.link} className="inline-flex items-center text-blue-600 hover:text-blue-800">
                    Read Guide
                    <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Quick answers to common questions about using GetMedInfo
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full transition-colors ${
                  activeCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
          
          {/* FAQ List */}
          <div className="space-y-4">
            {filteredFAQs.length > 0 ? (
              filteredFAQs.map((faq, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg overflow-hidden bg-white"
                >
                  <button
                    onClick={() => toggleFAQ(faq.question)}
                    className="w-full flex justify-between items-center p-5 text-left"
                  >
                    <span className="text-lg font-medium text-gray-800">{faq.question}</span>
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center border border-blue-200 bg-blue-50 text-blue-600 transition-transform duration-300 ${activeFAQ === faq.question ? 'rotate-180' : ''}`}>
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"></path>
                      </svg>
                    </div>
                  </button>
                  
                  <div className={`transition-all duration-300 ease-in-out overflow-hidden ${activeFAQ === faq.question ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="p-5 pt-0 text-gray-600 bg-blue-50/30 border-t border-gray-100">
                      {faq.answer}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <div className="inline-block p-4 rounded-full bg-gray-100 mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M9 16h6"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">No results found</h3>
                <p className="text-gray-500">
                  Try adjusting your search or filter to find what you're looking for.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* Contact Support */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12 border border-blue-100">
            <div className="inline-block p-3 rounded-full bg-blue-100 mb-6">
              <svg className="h-8 w-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
              </svg>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Still need help?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-8">
              Can't find what you're looking for? Our support team is ready to assist you with any questions you may have.
            </p>
            <Link href="/contact" className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition duration-300">
              Contact Support
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
} 