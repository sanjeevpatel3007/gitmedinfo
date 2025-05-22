import React from 'react';

export default function CookiePolicyPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Cookie Policy</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Understanding how and why we use cookies on our website
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
              <p className="text-gray-600 mb-4">
                This Cookie Policy explains how GetMedInfo ("we", "us", or "our") uses cookies and similar technologies to recognize you when you visit our website at GetMedInfo.com ("Website"). It explains what these technologies are and why we use them, as well as your rights to control our use of them.
              </p>
              <p className="text-gray-600">
                This cookie policy is part of our Privacy Policy. Please read this Cookie Policy carefully before using our Website.
              </p>
            </div>

            {/* Policy Sections */}
            <div className="space-y-12">
              {/* Section 1 */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">What Are Cookies?</h2>
                <p className="text-gray-600 mb-4">
                  Cookies are small text files that are stored in your web browser that allows GetMedInfo or a third party to recognize you. Cookies can be used to collect, store, and share data about your activities across websites, including on our Website.
                </p>
                <p className="text-gray-600 mb-4">
                  Cookies can be "persistent" or "session" cookies. Persistent cookies remain on your personal computer or mobile device when you go offline, while session cookies are deleted as soon as you close your web browser.
                </p>
                <p className="text-gray-600">
                  They serve functions such as remembering your preferences, keeping track of your login information, and enabling certain site functionality. Cookies also allow us to track how our users interact with our Website, making it easier for us to improve functionality and user experience.
                </p>
              </div>
              
              {/* Section 2 */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Do We Use Cookies?</h2>
                <p className="text-gray-600 mb-4">
                  We use first party and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our Website to operate, and we refer to these as "essential" or "strictly necessary" cookies.
                </p>
                <p className="text-gray-600 mb-4">
                  Other cookies also enable us to track and target the interests of our users to enhance the experience on our Website. For example, GetMedInfo keeps track of which pages you visit within our site, in order to determine which services are the most popular.
                </p>
                <p className="text-gray-600">
                  Third parties serve cookies through our Website for advertising, analytics, and other purposes. This is described in more detail below.
                </p>
              </div>
              
              {/* Section 3 */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Types of Cookies We Use</h2>
                <p className="text-gray-600 mb-4">
                  The specific types of first and third-party cookies served through our Website and the purposes they perform are described below:
                </p>
                
                <div className="bg-gray-50 rounded-lg p-6 mb-6 border border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Essential Cookies</h3>
                  <p className="text-gray-600 mb-3">
                    These cookies are strictly necessary to provide you with services available through our Website and to use some of its features, such as access to secure areas. Without these cookies, services that you have asked for cannot be properly provided.
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Examples:</span> Authentication cookies that maintain your logged-in status and remember your preferences.
                  </p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-6 mb-6 border border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Performance and Functionality Cookies</h3>
                  <p className="text-gray-600 mb-3">
                    These cookies are used to enhance the performance and functionality of our Website but are non-essential to its use. However, without these cookies, certain functionality may become unavailable.
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Examples:</span> Cookies that remember your preferred language or region and customize the site accordingly.
                  </p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-6 mb-6 border border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Analytics and Customization Cookies</h3>
                  <p className="text-gray-600 mb-3">
                    These cookies collect information that is used either in aggregate form to help us understand how our Website is being used or how effective our marketing campaigns are, or to help us customize our Website for you.
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Examples:</span> Cookies from analytics services like Google Analytics that help us understand how users navigate through our site.
                  </p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Advertising Cookies</h3>
                  <p className="text-gray-600 mb-3">
                    These cookies are used to make advertising messages more relevant to you. They perform functions like preventing the same ad from continuously reappearing, ensuring that ads are properly displayed for advertisers, and in some cases selecting advertisements that are based on your interests.
                  </p>
                  <p className="text-gray-600">
                    <span className="font-medium">Examples:</span> Cookies used by advertising partners that collect information about your browsing history to show you relevant ads on other websites.
                  </p>
                </div>
              </div>
              
              {/* Section 4 */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">How Can You Control Cookies?</h2>
                <p className="text-gray-600 mb-6">
                  You have the right to decide whether to accept or reject cookies. You can exercise your cookie rights by setting your preferences in the Cookie Consent Manager popup or by setting your browser controls to accept or refuse cookies.
                </p>
                
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Browser Controls</h3>
                <p className="text-gray-600 mb-4">
                  Most web browsers allow you to control cookies through their settings preferences. However, if you limit the ability of websites to set cookies, you may worsen your overall user experience, since it will no longer be personalized to you. It may also stop you from saving customized settings like login information.
                </p>
                <p className="text-gray-600 mb-6">
                  Below are links to instructions on how to manage cookie settings on popular web browsers:
                </p>
                
                <ul className="list-disc pl-6 space-y-2 text-gray-600 mb-6">
                  <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google Chrome</a></li>
                  <li><a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Mozilla Firefox</a></li>
                  <li><a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Safari</a></li>
                  <li><a href="https://support.microsoft.com/en-us/windows/delete-and-manage-cookies-168dab11-0753-043d-7c16-ede5947fc64d" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Microsoft Edge</a></li>
                </ul>
                
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Opting Out of Third-Party Ad Networks</h3>
                <p className="text-gray-600 mb-4">
                  You can opt-out of third-party ad networks by setting your preferences on the Digital Advertising Alliance, Network Advertising Initiative, or European Interactive Digital Advertising Alliance websites. Opting out does not mean you will no longer receive online advertising; it means that the network from which you opted out will no longer deliver ads tailored to your preferences and usage patterns.
                </p>
              </div>
              
              {/* Section 5 */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">What About Other Tracking Technologies?</h2>
                <p className="text-gray-600 mb-4">
                  Cookies are not the only way to recognize or track visitors to a website. We may use other, similar technologies from time to time, like web beacons (sometimes called "tracking pixels" or "clear gifs"). These are tiny graphics files that contain a unique identifier that enables us to recognize when someone has visited our Website.
                </p>
                <p className="text-gray-600">
                  In many instances, these technologies are reliant on cookies to function properly, and so declining cookies will impair their functioning.
                </p>
              </div>
              
              {/* Section 6 */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Do You Use Flash Cookies or Local Shared Objects?</h2>
                <p className="text-gray-600 mb-4">
                  Our Website may also use so-called "Flash Cookies" (also known as Local Shared Objects or "LSOs") to, among other things, collect and store information about your use of our services, fraud prevention, and for other site operations.
                </p>
                <p className="text-gray-600">
                  If you do not want Flash Cookies stored on your computer, you can adjust the settings of your Flash player to block Flash Cookies storage. Please note that setting the Flash Player to restrict or limit acceptance of Flash Cookies may reduce or impede the functionality of some Flash applications.
                </p>
              </div>
              
              {/* Section 7 */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Do We Serve Targeted Advertising?</h2>
                <p className="text-gray-600 mb-4">
                  Third parties may serve cookies on your computer or mobile device to serve advertising through our Website. These companies may use information about your visits to this and other websites in order to provide relevant advertisements about goods and services that you may be interested in.
                </p>
                <p className="text-gray-600">
                  They may also employ technology that is used to measure the effectiveness of advertisements. This can be accomplished by them using cookies or web beacons to collect information about your visits to this and other sites in order to provide relevant advertisements about goods and services of potential interest to you.
                </p>
              </div>
              
              {/* Section 8 */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Updates to This Cookie Policy</h2>
                <p className="text-gray-600 mb-4">
                  We may update this Cookie Policy from time to time in order to reflect changes to the cookies we use or for other operational, legal, or regulatory reasons. Please therefore revisit this Cookie Policy regularly to stay informed about our use of cookies and related technologies.
                </p>
                <p className="text-gray-600">
                  The date at the top of this Cookie Policy indicates when it was last updated.
                </p>
              </div>
              
              {/* Section 9 */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
                <p className="text-gray-600 mb-4">
                  If you have any questions about our use of cookies or other technologies, please contact us at:
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