import { HiDatabase, HiOutlineSearchCircle, HiOutlineInformationCircle } from "react-icons/hi";
import { MdCategory } from "react-icons/md";

export default function InfoSection() {
  const features = [
    {
      icon: <HiDatabase className="text-blue-600 text-3xl" />,
      title: "Comprehensive Database",
      description: "Explore thousands of medicines with accurate and regularly updated data.",
    },
    {
      icon: <MdCategory className="text-blue-600 text-3xl" />,
      title: "Organized Categories",
      description: "Find medicines easily through clear and intuitive category organization.",
    },
    {
      icon: <HiOutlineSearchCircle className="text-blue-600 text-3xl" />,
      title: "Powerful Search",
      description: "Quickly locate medicines by name, use, or composition using smart search.",
    },
    {
      icon: <HiOutlineInformationCircle className="text-blue-600 text-3xl" />,
      title: "Detailed Info",
      description: "Understand composition, dosage, uses, side effects, and warnings in one place.",
    }
  ];

  const benefits = [
    "Verified data from trusted medical sources",
    "Always up to date with the latest changes",
    "Simple and user-friendly experience",
    "Complete medicine information in one place"
  ];
  
  return (
    <section className="py-16 md:py-24">
      {/* Header */}
        <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center py-1.5 px-4 mb-4 rounded-full bg-blue-50 border border-blue-100">
          <span className="text-sm font-medium text-blue-600">Benefits</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Why Choose Our Platform?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
          Our platform helps you understand medicines better with reliable and easy-to-access information.
          </p>
        </div>
        
      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {features.map((feature, index) => (
            <div 
              key={index}
            className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-100 transition-all duration-300 group"
          >
            <div className="mb-6 relative h-16 w-16 flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl group-hover:scale-110 transition-transform duration-300">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
        
      {/* Info Banner */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl overflow-hidden shadow-sm">
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
            <div className="inline-flex items-center py-1 px-3 mb-6 rounded-full bg-blue-100 text-blue-600 text-xs font-medium">
              TRUSTED SOURCE
            </div>
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-6">
                Your Trusted Source for Medicine Information
              </h3>
            <p className="text-gray-700 mb-8 leading-relaxed">
              We’re committed to offering clear, verified, and expert-reviewed medicine information so you can feel confident in your healthcare decisions.
            </p>

            <div className="space-y-4">
              {benefits.map((item, i) => (
                <div key={i} className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <svg className="h-4 w-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:w-1/2 relative min-h-[360px] lg:min-h-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-transparent z-10" />
            <img
              src="/images/info2.png"
                alt="Healthcare Professional"
              className="object-cover w-full h-full hover:scale-105 transition-transform duration-700"
              />
          </div>
        </div>
      </div>
    </section>
  );
} 
