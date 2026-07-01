import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Decruz Marketing collects, uses, and protects your personal information, including SMS opt-in data and consent records.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage title="Privacy Policy" effectiveDate="January 1st, 2026">
      <div className="rounded-md border border-line bg-blush-wash px-6 py-5">
        <p className="mt-0 font-mono text-[0.7rem] font-medium uppercase tracking-[0.14em] text-ink">
          Important Notice Regarding Text Messaging Data
        </p>
        <p>
          Decruz Marketing (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or
          &ldquo;our&rdquo;) <strong>DOES NOT</strong> share customer opt-in
          information, including phone numbers and consent records, with any
          affiliates or third parties for marketing, promotional, or any other
          purposes. All text messaging originator opt-in data is kept strictly
          confidential and is not sold, rented, or traded under any
          circumstances.
        </p>
      </div>

      <h2>1. Information We Collect</h2>
      <p>We collect the following types of information to provide our services:</p>
      <ul>
        <li>
          <strong>Personal Information:</strong> Name, email address, phone
          number, and physical address.
        </li>
        <li>
          <strong>Opt-in Data:</strong> Specific timestamps and records of your
          consent to receive SMS, email, or other communications.
        </li>
        <li>
          <strong>Usage Data:</strong> IP address, browser type, and website
          analytics collected via cookies to improve your experience.
        </li>
      </ul>

      <h2>2. How We Use Your Information</h2>
      <p>We use your data solely for:</p>
      <ul>
        <li>Providing marketing consultations and lead generation services.</li>
        <li>Sending appointment confirmations and reminders.</li>
        <li>
          Communicating regarding service updates and requested inquiries.
        </li>
        <li>Maintaining internal records of your communication preferences.</li>
      </ul>

      <h2>3. SMS Messaging &amp; Compliance</h2>
      <p>
        <strong>Opt-In &amp; Consent:</strong> You will only receive SMS
        messages if you have provided express written consent through our
        website forms. Consent is strictly optional and is not a condition of
        purchase. We maintain verifiable, timestamped records of all opt-in
        actions.
      </p>
      <p>
        <strong>Opt-Out Instructions:</strong> You can cancel SMS notifications
        at any time by replying STOP. Upon sending STOP, you will receive a
        single final confirmation message, and no further messages will be sent
        unless you intentionally re-opt in.
      </p>
      <p>
        <strong>Help &amp; Support:</strong> Reply HELP for assistance or
        contact us directly at{" "}
        <a href="mailto:decruzmarketing@gmail.com">decruzmarketing@gmail.com</a>.
      </p>
      <p>
        <strong>SMS Data Protection Statement:</strong> No mobile information
        will be shared with third parties or affiliates for marketing or
        promotional purposes. Information sharing with subcontractors in
        technical support services, such as customer service providers, is
        permitted solely for the purpose of assisting us in providing our
        services to you. All other use case categories exclude text messaging
        originator opt-in data and consent; this information will not be shared
        with any third parties.
      </p>

      <h2>4. Information Sharing &amp; Disclosure</h2>
      <p>
        We do not sell or rent personal information. We may only disclose
        information:
      </p>
      <ul>
        <li>
          <strong>Service Providers:</strong> To third-party vendors (e.g., SMS
          aggregators) solely for the purpose of delivering the messages you
          have consented to receive. These providers are contractually
          prohibited from using your data for any other purpose.
        </li>
        <li>
          <strong>Legal Compliance:</strong> If required by law or to protect
          our legal rights.
        </li>
      </ul>
      <p>
        <strong>Note:</strong> All the above categories exclude text messaging
        originator opt-in data and consent; this specific information will not
        be shared with any third parties or affiliates.
      </p>

      <h2>5. Data Security</h2>
      <p>
        We implement and maintain strict security measures, including encryption
        and secure access controls, to safeguard your personal information and
        consent records against unauthorized access or disclosure.
      </p>

      <h2>6. Your Rights</h2>
      <p>
        You have the right to access, update, or request the deletion of your
        personal data at any time. To exercise these rights, please contact us
        using the information below.
      </p>

      <h2>7. Cookies &amp; Tracking Technologies</h2>
      <p>We use cookies and similar technologies to:</p>
      <ul>
        <li>Analyze site traffic and user behavior</li>
        <li>Remember your preferences</li>
        <li>Improve website functionality and user experience</li>
        <li>Measure the effectiveness of our services</li>
      </ul>
      <p>
        You may control cookies through your browser settings. Disabling cookies
        may limit your ability to use certain features of our website.
      </p>

      <h2>8. Contact Us</h2>
      <p>
        For questions regarding this Privacy Policy or your data, please
        contact:
      </p>
      <p>
        <strong>Decruz Marketing</strong>
        <br />
        Address: 6201 Madan St., Bakersfield CA 93307
        <br />
        Phone: <a href="tel:+16615644775">(661) 564-4775</a>
        <br />
        Email:{" "}
        <a href="mailto:decruzmarketing@gmail.com">decruzmarketing@gmail.com</a>
        <br />
        Website:{" "}
        <a href="https://decruzmarketing.com" target="_blank" rel="noreferrer">
          https://decruzmarketing.com
        </a>
      </p>
      <p>
        By using our website and services, you consent to this Privacy Policy.
      </p>
    </LegalPage>
  );
}
