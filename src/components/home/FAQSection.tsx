'use client';

import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs: FAQItem[] = [
    {
      question: "How accurate is the medicine information?",
      answer: "All information on GetMedInfo is thoroughly researched and verified by healthcare professionals. We update our database regularly to ensure accuracy and compliance with the latest medical guidelines."
    },
    {
      question: "How can I search for a specific medicine?",
      answer: "You can use the search bar at the top of our website to look for specific medicines by name, active ingredient, or condition. The search feature supports partial matches and auto-suggestions to help you find what you need quickly."
    },
    {
      question: "Are there any side effects not listed for medicines?",
      answer: "We strive to list all known side effects, but individual reactions may vary. Always consult your healthcare provider or pharmacist for personalized advice regarding potential side effects specific to your health condition."
    },
    {
      question: "How often is the medicine database updated?",
      answer: "Our database is updated monthly with new medicines and latest information. For critical updates on existing medicines, we implement changes immediately upon verified information becoming available."
    },
    {
      question: "Can I contribute information or corrections?",
      answer: "Yes, we welcome user contributions! If you spot an error or have additional verified information, please use our Contact form. All submissions are reviewed by our medical team before being added to the database."
    }
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center py-1.5 px-4 mb-4 rounded-full bg-blue-50 border border-blue-100">
          <span className="text-sm font-medium text-blue-600">FAQ</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Find answers to common questions about our medicine information platform and services
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        {faqs.map((faq, index) => (
          <div 
            key={index} 
            className="mb-4 border border-gray-200 rounded-xl overflow-hidden bg-white"
          >
            <button 
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center p-5 text-left"
              aria-expanded={activeIndex === index}
            >
              <span className="text-lg font-medium text-gray-800">{faq.question}</span>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center border border-blue-200 bg-blue-50 text-blue-600 transition-transform duration-300 ${activeIndex === index ? 'rotate-180' : ''}`}>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </button>
            
            <div 
              className={`transition-all duration-300 ease-in-out overflow-hidden ${activeIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
            >
              <div className="p-5 pt-0 text-gray-600 bg-blue-50/30 border-t border-gray-100">
                {faq.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
} 