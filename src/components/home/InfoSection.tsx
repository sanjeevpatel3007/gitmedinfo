import Image from 'next/image';

export default function InfoSection() {
  const features = [
    {
      icon: "/icons/medicine.svg",
      title: "Comprehensive Medicine Database",
      description: "Access detailed information about thousands of medicines in our comprehensive database, regularly updated with the latest data."
    },
    {
      icon: "/icons/category.svg",
      title: "Organized by Categories",
      description: "Easily find what you're looking for with our well-organized categories, making navigation simple and intuitive."
    },
    {
      icon: "/icons/search.svg",
      title: "Powerful Search",
      description: "Use our advanced search functionality to quickly find specific medicines based on name, composition, or use."
    },
    {
      icon: "/icons/information.svg",
      title: "Detailed Information",
      description: "Get comprehensive details including composition, dosage, uses, side effects, warnings, and more for each medicine."
    }
  ];
  
  return (
    <div className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose Our Platform?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our platform provides reliable, accurate, and comprehensive information about medicines to help you make informed decisions about your health
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg hover:border-blue-100 transition duration-300"
            >
              <div className="mb-4 relative h-16 w-16 mx-auto">
                <Image 
                  src={feature.icon} 
                  alt={feature.title}
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3 text-center">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-center">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 bg-blue-50 rounded-2xl overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">
                Your Trusted Source for Medicine Information
              </h3>
              <p className="text-gray-700 mb-6">
                We are committed to providing accurate, up-to-date, and comprehensive information about medicines to help you understand your medications better. Our database is maintained by healthcare professionals to ensure reliability.
              </p>
              <ul className="space-y-3">
                {[
                  "Verified information from trusted sources",
                  "Updated regularly with the latest data",
                  "Easy to understand and navigate",
                  "Comprehensive details about each medicine"
                ].map((item, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:w-1/2 relative min-h-[300px] lg:min-h-0">
              <Image
                src="/images/healthcare-professional.jpg"
                alt="Healthcare Professional"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 