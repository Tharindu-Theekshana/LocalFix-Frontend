import React from 'react';
import Navbar from '../components/Navbar';
import FooterSection from '../components/FooterSection';

export default function PrivacyPolicy() {
  return (
    <>
      <Navbar />
    <div className="min-h-screen bg-white text-gray-800 px-4 py-10 sm:px-8 lg:px-32 pt-28">
        <h1 className="text-3xl font-bold text-[#001B5E] mb-6">Privacy Policy</h1>

      <section className="space-y-6 text-justify">
        <p>
          At <strong>LocalFix</strong>, we value your privacy and are committed to protecting your personal data. We collect
          and use limited information to deliver a reliable and secure service.
        </p>

        <div>
          <h2 className="text-xl font-semibold text-blue-950 mb-2">What We Collect</h2>
          <ul className="list-disc ml-6 space-y-1">
            <li>Email addresses</li>
            <li>Contact information</li>
            <li>IP addresses</li>
            <li>Device/browser information</li>
            <li>Login activity & session tracking</li>
            <li>Analytics (e.g., Google Analytics)</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-blue-950 mb-2">How We Use It</h2>
          <p>
            We screen, record, and display only service provider data that helps customers connect with reliable household
            or office repair professionals.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-blue-950 mb-2">Disclosure</h2>
          <p>
            LocalFix does not charge service providers for listing nor do we sell your data. We maintain transparency and
            integrity in our listings.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-blue-950 mb-2">Communication</h2>
          <p>
            By using our platform, you consent to receiving updates and information relevant to the services you interact with.
            You can opt out at any time by contacting us.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-blue-950 mb-2">Security</h2>
          <p>
            We use modern encryption and security tools to safeguard your data. Any form of content duplication or scraping will
            be legally pursued.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-blue-950 mb-2">Contact</h2>
          <p>
            If you have any concerns or want to remove your information from LocalFix, feel free to reach out at:{' '}
            <a href="mailto:info@localfix.lk" className="text-[#001B5E] font-medium underline">info@localfix.lk</a>
          </p>
        </div>
      </section>
    </div>
    <FooterSection/>
    </>
  );
}
