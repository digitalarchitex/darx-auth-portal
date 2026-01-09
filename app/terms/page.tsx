export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Terms of Service</h1>
        <p className="text-sm text-gray-600 mb-8">Last Updated: January 8, 2025</p>

        <div className="space-y-6 text-gray-700">
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Acceptance of Terms</h2>
            <p>By accessing and using DARX (Digital Architecture Experience) services provided by Digital Architex, you accept and agree to be bound by the terms and provision of this agreement.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Description of Service</h2>
            <p>DARX provides AI-powered website generation services, including:</p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Automated website creation based on client requirements</li>
              <li>GitHub repository management and version control</li>
              <li>Deployment to Vercel hosting platform</li>
              <li>Dashboard for tracking website status and deployments</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">3. User Accounts</h2>
            <p>To access our services, you must:</p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Create an account with accurate and complete information</li>
              <li>Maintain the security of your account credentials</li>
              <li>Be responsible for all activities under your account</li>
              <li>Notify us immediately of any unauthorized use</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Acceptable Use</h2>
            <p>You agree not to use our services to:</p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Violate any laws or regulations</li>
              <li>Infringe on intellectual property rights</li>
              <li>Distribute malware or harmful code</li>
              <li>Engage in fraudulent or deceptive practices</li>
              <li>Interfere with or disrupt our services</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Intellectual Property</h2>
            <p>You retain all rights to the content you provide. The websites we generate for you are your property. However, we retain rights to:</p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Our proprietary technology and AI systems</li>
              <li>The DARX platform and infrastructure</li>
              <li>Our branding and trademarks</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Third-Party Services</h2>
            <p>Our services integrate with third-party platforms including GitHub, Vercel, and Google Cloud. Your use of these platforms is subject to their respective terms of service.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Service Availability</h2>
            <p>We strive to maintain high availability but do not guarantee uninterrupted service. We reserve the right to:</p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Modify or discontinue services with notice</li>
              <li>Perform scheduled maintenance</li>
              <li>Suspend access for violations of these terms</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Payment and Billing</h2>
            <p>If applicable to your service tier:</p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>Fees are charged according to your selected plan</li>
              <li>All fees are non-refundable unless otherwise stated</li>
              <li>We reserve the right to change pricing with notice</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Limitation of Liability</h2>
            <p>To the maximum extent permitted by law, Digital Architex shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use our services.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">10. Warranties Disclaimer</h2>
            <p>Our services are provided "as is" without warranties of any kind, either express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">11. Termination</h2>
            <p>We may terminate or suspend your account and access to services:</p>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              <li>For violations of these terms</li>
              <li>At your request</li>
              <li>For prolonged inactivity</li>
              <li>If required by law</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">12. Changes to Terms</h2>
            <p>We reserve the right to modify these terms at any time. We will provide notice of significant changes. Your continued use of services after changes constitutes acceptance of the new terms.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">13. Governing Law</h2>
            <p>These terms shall be governed by and construed in accordance with the laws of the jurisdiction in which Digital Architex operates, without regard to its conflict of law provisions.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">14. Contact Information</h2>
            <p>For questions about these Terms of Service, please contact us at:</p>
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
