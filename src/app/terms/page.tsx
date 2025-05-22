import React from 'react';

export default function TermsOfUsePage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Terms of Use</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Please read these terms and conditions carefully before using our service
          </p>
        </div>
      </div>

      {/* Terms Content */}
      <section className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <div className="mb-8 text-gray-500 text-sm">
              <p>Last updated: June 1, 2023</p>
            </div>
            
            <div className="mb-12">
              <p className="text-gray-600">
                Please read these Terms of Use ("Terms", "Terms of Use") carefully before using the GetMedInfo website (the "Service") operated by GetMedInfo ("us", "we", or "our").
              </p>
              <p className="text-gray-600 mt-4">
                Your access to and use of the Service is conditioned on your acceptance of and compliance with these Terms. These Terms apply to all visitors, users, and others who access or use the Service.
              </p>
              <p className="text-gray-600 mt-4">
                By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.
              </p>
            </div>

            {/* Terms Sections */}
            <div className="space-y-12">
              {/* Section 1 */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Accounts</h2>
                <p className="text-gray-600 mb-4">
                  When you create an account with us, you must provide us with accurate, complete, and up-to-date information. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account on our Service.
                </p>
                <p className="text-gray-600 mb-4">
                  You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password, whether your password is with our Service or a third-party service.
                </p>
                <p className="text-gray-600">
                  You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.
                </p>
              </div>
              
              {/* Section 2 */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Intellectual Property</h2>
                <p className="text-gray-600 mb-4">
                  The Service and its original content, features, and functionality are and will remain the exclusive property of GetMedInfo and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of GetMedInfo.
                </p>
                <p className="text-gray-600">
                  All medicine information, text, graphics, photos, or other materials uploaded, downloaded, or appearing on the Service are protected by copyright as a collective work and/or compilation, pursuant to copyrights laws, and international conventions.
                </p>
              </div>
              
              {/* Section 3 */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Medical Disclaimer</h2>
                <p className="text-gray-600 mb-4">
                  The content provided on GetMedInfo is for informational purposes only and is not intended as medical advice, or as a substitute for medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
                </p>
                <p className="text-gray-600 mb-4">
                  Never disregard professional medical advice or delay in seeking it because of something you have read on the Service. GetMedInfo does not recommend or endorse any specific tests, physicians, products, procedures, opinions, or other information that may be mentioned on the Service.
                </p>
                <p className="text-gray-600">
                  Reliance on any information provided by GetMedInfo, its employees, others appearing on the Service at our invitation, or other visitors to the Service is solely at your own risk.
                </p>
              </div>
              
              {/* Section 4 */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. User Content</h2>
                <p className="text-gray-600 mb-4">
                  Our Service may allow you to post, link, store, share and otherwise make available certain information, text, graphics, videos, or other material ("User Content"). You are responsible for the User Content that you post to the Service, including its legality, reliability, and appropriateness.
                </p>
                <p className="text-gray-600 mb-4">
                  By posting User Content to the Service, you grant us the right and license to use, modify, publicly perform, publicly display, reproduce, and distribute such content on and through the Service. You retain any and all of your rights to any User Content you submit, post, or display on or through the Service and you are responsible for protecting those rights.
                </p>
                <p className="text-gray-600">
                  You represent and warrant that: (i) the User Content is yours or you have the right to use it and grant us the rights and license as provided in these Terms, and (ii) the posting of your User Content on or through the Service does not violate the privacy rights, publicity rights, copyrights, contract rights or any other rights of any person or entity.
                </p>
              </div>
              
              {/* Section 5 */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Links to Other Web Sites</h2>
                <p className="text-gray-600 mb-4">
                  Our Service may contain links to third-party websites or services that are not owned or controlled by GetMedInfo.
                </p>
                <p className="text-gray-600 mb-4">
                  GetMedInfo has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third-party websites or services. You further acknowledge and agree that GetMedInfo shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods, or services available on or through any such websites or services.
                </p>
                <p className="text-gray-600">
                  We strongly advise you to read the terms and conditions and privacy policies of any third-party websites or services that you visit.
                </p>
              </div>
              
              {/* Section 6 */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Termination</h2>
                <p className="text-gray-600 mb-4">
                  We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
                </p>
                <p className="text-gray-600 mb-4">
                  Upon termination, your right to use the Service will immediately cease. If you wish to terminate your account, you may simply discontinue using the Service, or notify us that you wish to delete your account.
                </p>
                <p className="text-gray-600">
                  All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity and limitations of liability.
                </p>
              </div>
              
              {/* Section 7 */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Limitation of Liability</h2>
                <p className="text-gray-600 mb-4">
                  In no event shall GetMedInfo, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been informed of the possibility of such damage.
                </p>
              </div>
              
              {/* Section 8 */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Disclaimer</h2>
                <p className="text-gray-600 mb-4">
                  Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE" basis. The Service is provided without warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement, or course of performance.
                </p>
                <p className="text-gray-600">
                  GetMedInfo, its subsidiaries, affiliates, and its licensors do not warrant that a) the Service will function uninterrupted, secure or available at any particular time or location; b) any errors or defects will be corrected; c) the Service is free of viruses or other harmful components; or d) the results of using the Service will meet your requirements.
                </p>
              </div>
              
              {/* Section 9 */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Governing Law</h2>
                <p className="text-gray-600 mb-4">
                  These Terms shall be governed and construed in accordance with the laws of the United States, without regard to its conflict of law provisions.
                </p>
                <p className="text-gray-600">
                  Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect. These Terms constitute the entire agreement between us regarding our Service, and supersede and replace any prior agreements we might have between us regarding the Service.
                </p>
              </div>
              
              {/* Section 10 */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Changes</h2>
                <p className="text-gray-600 mb-4">
                  We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
                </p>
                <p className="text-gray-600">
                  By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using the Service.
                </p>
              </div>
              
              {/* Section 11 */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Contact Us</h2>
                <p className="text-gray-600 mb-4">
                  If you have any questions about these Terms, please contact us at:
                </p>
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <p className="text-gray-700">GetMedInfo</p>
                  <p className="text-gray-700">123 Health Avenue</p>
                  <p className="text-gray-700">Medical District, CA 90210</p>
                  <p className="text-gray-700">Email: legal@getmedinfo.com</p>
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