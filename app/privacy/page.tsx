export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
        <p className="text-sm text-gray-600 mb-8">Last Updated: January 8, 2025</p>

        <div className="space-y-6 text-gray-700">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Information We Collect</h2>
            <p>We collect information you provide directly to us when you:</p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Create an account (name, email address, company information)</li>
              <li>Use our website generation services</li>
              <li>Communicate with us</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Provide, maintain, and improve our services</li>
              <li>Generate and deploy websites on your behalf</li>
              <li>Send you technical notices and support messages</li>
              <li>Respond to your comments and questions</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Information Sharing</h2>
            <p>We do not sell, trade, or rent your personal information to third parties. We may share your information with:</p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Service providers who assist in our operations (GitHub, Vercel, Google Cloud)</li>
              <li>When required by law or to protect our rights</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Data Security</h2>
            <p>We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Access and receive a copy of your personal data</li>
              <li>Correct inaccurate personal data</li>
              <li>Request deletion of your personal data</li>
              <li>Object to processing of your personal data</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Cookies and Tracking</h2>
            <p>We use cookies and similar tracking technologies to track activity on our service and store certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Third-Party Services</h2>
            <p>Our service may contain links to third-party websites or services that are not owned or controlled by Digital Architex. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Changes to This Privacy Policy</h2>
            <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy, please contact us at:</p>
            <p className="mt-2">
              <strong>Email:</strong> <a href="mailto:contact@digitalarchitex.com" className="text-blue-600 hover:text-blue-700">contact@digitalarchitex.com</a><br />
              <strong>Website:</strong> <a href="https://digitalarchitex.com" className="text-blue-600 hover:text-blue-700">https://digitalarchitex.com</a>
            </p>
          </section>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 text-center">
          <a href="/" className="text-blue-600 hover:text-blue-700 font-medium">← Back to Home</a>
        </div>
      </div>
    </div>
  );
}
