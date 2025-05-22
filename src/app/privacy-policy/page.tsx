import React from 'react';

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Privacy Policy</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            How we collect, use, and protect your personal information
          </p>
        </div>
      </div>

      {/* Policy Content */}
      <section className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <div className="mb-8 text-gray-500 text-sm">
              <p>Last updated: June 1, 2023</p>
            </div>
            
            <div className="mb-12">
              <p className="text-gray-600 mb-6">
                At GetMedInfo, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.
              </p>
              <p className="text-gray-600">
                We reserve the right to make changes to this Privacy Policy at any time and for any reason. We will alert you about any changes by updating the "Last Updated" date of this Privacy Policy. You are encouraged to periodically review this Privacy Policy to stay informed of updates.
              </p>
            </div>

            {/* Policy Sections */}
            <div className="space-y-12">
              {/* Section 1 */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Collection of Your Information</h2>
                <p className="text-gray-600 mb-4">
                  We may collect information about you in a variety of ways. The information we may collect via the website includes:
                </p>
                
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Personal Data</h3>
                <p className="text-gray-600 mb-4">
                  Personally identifiable information, such as your name, email address, and phone number, that you voluntarily provide when registering an account or contacting us. You are under no obligation to provide us with personal information, but your refusal to do so may prevent you from using certain features of the website.
                </p>
                
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Usage Data</h3>
                <p className="text-gray-600 mb-4">
                  When you access our website, we may automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device. Additionally, as you browse the website, we collect information about the individual web pages or products that you view, what websites or search terms referred you to the site, and information about how you interact with the website.
                </p>
                
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Search History</h3>
                <p className="text-gray-600">
                  If you are logged into your account, we may collect information about your medicine search history to provide you with improved recommendations and quick access to previously viewed medicines. You can clear this history at any time from your account settings.
                </p>
              </div>
              
              {/* Section 2 */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Use of Your Information</h2>
                <p className="text-gray-600 mb-4">
                  Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the website to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-4">
                  <li>Create and maintain your account.</li>
                  <li>Provide personalized medicine information and recommendations.</li>
                  <li>Respond to your inquiries and customer service requests.</li>
                  <li>Email you regarding your account or medicine information updates.</li>
                  <li>Improve our website and user experience.</li>
                  <li>Compile anonymous statistical data for research purposes.</li>
                  <li>Administer promotions, surveys, and contests.</li>
                  <li>Deliver targeted advertising, newsletters, and other information regarding our website and services.</li>
                  <li>Protect against fraud and unauthorized access to our services.</li>
                </ul>
              </div>
              
              {/* Section 3 */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Disclosure of Your Information</h2>
                <p className="text-gray-600 mb-4">
                  We may share information we have collected about you in certain situations. Your information may be disclosed as follows:
                </p>
                
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Business Partners</h3>
                <p className="text-gray-600 mb-4">
                  We may share your information with our business partners to offer you certain products, services, or promotions.
                </p>
                
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Third-Party Service Providers</h3>
                <p className="text-gray-600 mb-4">
                  We may share your information with third parties that perform services for us or on our behalf, including payment processing, data analysis, email delivery, hosting services, customer service, and marketing assistance.
                </p>
                
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Legal Requirements</h3>
                <p className="text-gray-600">
                  We may disclose your information if required to do so by law or in response to valid requests by public authorities (e.g., a court or a government agency).
                </p>
              </div>
              
              {/* Section 4 */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Security of Your Information</h2>
                <p className="text-gray-600 mb-4">
                  We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
                </p>
                <p className="text-gray-600">
                  Any information disclosed online is vulnerable to interception and misuse by unauthorized parties. Therefore, we cannot guarantee complete security if you provide personal information.
                </p>
              </div>
              
              {/* Section 5 */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rights</h2>
                <p className="text-gray-600 mb-4">
                  You have certain rights regarding your personal information, including:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-4">
                  <li><strong>Right to Access:</strong> You have the right to request copies of your personal information.</li>
                  <li><strong>Right to Rectification:</strong> You have the right to request that we correct any information you believe is inaccurate.</li>
                  <li><strong>Right to Erasure:</strong> You have the right to request that we erase your personal information, under certain conditions.</li>
                  <li><strong>Right to Restrict Processing:</strong> You have the right to request that we restrict the processing of your personal information, under certain conditions.</li>
                  <li><strong>Right to Object to Processing:</strong> You have the right to object to our processing of your personal information, under certain conditions.</li>
                  <li><strong>Right to Data Portability:</strong> You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.</li>
                </ul>
                <p className="text-gray-600">
                  To exercise any of these rights, please contact us using the details provided in the Contact section.
                </p>
              </div>
              
              {/* Section 6 */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookies and Web Beacons</h2>
                <p className="text-gray-600 mb-4">
                  We may use cookies, web beacons, tracking pixels, and other tracking technologies on the website to help customize the website and improve your experience. By using the website, you agree to our use of cookies.
                </p>
                <p className="text-gray-600">
                  Most web browsers allow you to control cookies through their settings preferences. However, if you limit the ability of websites to set cookies, you may impair your overall user experience, as it will no longer be personalized to you.
                </p>
              </div>
              
              {/* Section 7 */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
                <p className="text-gray-600 mb-4">
                  If you have questions or comments about this Privacy Policy, please contact us at:
                </p>
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <p className="text-gray-700">GetMedInfo</p>
                  <p className="text-gray-700">123 Health Avenue</p>
                  <p className="text-gray-700">Medical District, CA 90210</p>
                  <p className="text-gray-700">Email: privacy@getmedinfo.com</p>
                  <p className="text-gray-700">Phone: +1 (555) 123-4567</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 