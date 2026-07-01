import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage } from "@/components/layout/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Decruz Marketing SMS messaging terms, compliance information, and general terms of service governing use of our website.",
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" effectiveDate="January 1st, 2026">
      <h2>SMS Messaging Terms &amp; Compliance</h2>

      <h3>1. Program Description</h3>
      <p>
        Decruz Marketing offers a mobile messaging program that sends
        appointment confirmations, scheduling reminders, and customer support
        updates to customers who have booked a strategy session or requested
        information through our website at{" "}
        <a href="https://decruzmarketing.com" target="_blank" rel="noreferrer">
          https://decruzmarketing.com
        </a>
        . Users must explicitly provide express written consent via our web
        forms to receive these messages.
      </p>

      <h3>2. Cancellation &amp; Opt-Out Instructions</h3>
      <p>
        You can cancel the SMS service at any time. Simply reply STOP to any
        message we send you. Upon sending STOP, we will send you a single SMS
        message to confirm that you have been unsubscribed. After this
        confirmation, you will no longer receive SMS messages from us unless you
        intentionally re-opt in through our website.
      </p>

      <h3>3. Support Information</h3>
      <p>
        If you experience any issues with the messaging program, reply with the
        keyword HELP for more assistance, or reach out directly to{" "}
        <a href="mailto:decruzmarketing@gmail.com">decruzmarketing@gmail.com</a>{" "}
        or call <a href="tel:+16615644775">(661) 564-4775</a> during regular
        business hours.
      </p>

      <h3>4. Carrier Liability</h3>
      <p>Wireless carriers are not liable for delayed or undelivered messages.</p>

      <h3>5. Message &amp; Data Rates</h3>
      <p>
        Message and data rates may apply for any messages sent to you from us
        and to us from you. Message frequency varies based on your specific
        interactions, service usage, and appointment schedule. For questions
        about your text plan or data plan, please contact your wireless
        provider.
      </p>

      <h3>6. Supported Carriers</h3>
      <p>
        Our SMS program is compatible with all major U.S. wireless carriers,
        including AT&amp;T, T-Mobile, Verizon, and most regional wireless
        providers.
      </p>

      <h3>7. Age Restriction</h3>
      <p>
        You must be 18 years of age or older to participate in our SMS program.
      </p>

      <h3>8. Privacy Policy</h3>
      <p>
        Decruz Marketing values your privacy. No mobile information will be
        shared with third parties or affiliates for marketing or promotional
        purposes. For all other privacy-related inquiries, please refer to our{" "}
        <Link href="/privacy-policy">Privacy Policy</Link>.
      </p>

      <h2>General Terms of Service</h2>
      <p>
        This website (the &ldquo;Site&rdquo;) is owned and operated by Decruz
        Marketing (&ldquo;COMPANY,&rdquo; &ldquo;we&rdquo; or &ldquo;us&rdquo;).
        By using the Site, you agree to be bound by these Terms of Service and to
        use the Site in accordance with these Terms of Service and our Privacy
        Policy. Accessing the Site in any manner, whether automated or
        otherwise, constitutes use of the Site and your agreement to be bound by
        these Terms.
      </p>

      <h3>Intellectual Property Rights</h3>
      <p>
        <strong>Our Limited License to You.</strong> This Site and all materials
        available on it are the property of Decruz Marketing and are protected
        by copyright, trademark, and other intellectual property laws. The Site
        is provided solely for your personal non-commercial use. You may not
        modify, copy, reproduce, republish, or distribute any material from the
        Site without explicit authorization.
      </p>
      <p>
        <strong>Your License to Us.</strong> By submitting any material to us via
        the Site or digital venues, you represent that you own the material. You
        grant Decruz Marketing a royalty-free, perpetual, non-exclusive,
        worldwide license to use, modify, and distribute such material for
        business purposes.
      </p>

      <h3>Disclaimers</h3>
      <p>
        The information, products, and services offered on or through the Site
        are provided &ldquo;as is&rdquo; and without warranties of any kind. You
        agree to indemnify and hold harmless Decruz Marketing and its affiliates
        from any claims arising out of your breach of these Terms of Service.
      </p>

      <h3>Online Commerce</h3>
      <p>
        Certain sections of the Site may allow you to interact with third-party
        vendors. We are not responsible for the quality or reliability of
        products or services provided by third parties. Your dealings with such
        vendors are solely between you and the third party.
      </p>

      <h3>Registration &amp; Passwords</h3>
      <p>
        To access certain features, you may be required to register. You agree to
        provide accurate and complete information. You are responsible for
        maintaining the confidentiality of your login credentials and must notify
        us immediately of any unauthorized use of your account.
      </p>

      <h3>Termination</h3>
      <p>
        We reserve the right to terminate or suspend your access to the Site
        without notice for conduct that we deem inappropriate or unlawful.
      </p>

      <h3>Governing Law</h3>
      <p>
        These Terms of Service shall be governed by and construed in accordance
        with the laws of the State of California. Any dispute arising under these
        Terms shall be resolved exclusively through binding arbitration in that
        jurisdiction.
      </p>

      <h3>Contact Us</h3>
      <p>
        If you have questions about these Terms of Service, please contact us at:
      </p>
      <p>
        <strong>Decruz Marketing</strong>
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
        By using our website and services, you consent to these Terms of Service
        and acknowledge our{" "}
        <Link href="/privacy-policy">Privacy Policy</Link>.
      </p>
    </LegalPage>
  );
}
