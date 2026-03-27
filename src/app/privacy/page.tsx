import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | AutoHarvester",
  description:
    "AutoHarvester's privacy policy. Learn how we collect, use, and protect your personal information.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24 lg:pt-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-[#f5f5f0] mb-4">
            Privacy{" "}
            <span className="text-[#b8956e]">Policy</span>
          </h1>
          <p className="text-[#a0a0a0]">
            Last updated: March 2024
          </p>
        </div>

        <div className="prose prose-invert prose-lg max-w-none">
          <div className="space-y-8 text-[#a0a0a0]">
            <section>
              <h2 className="text-2xl font-bold text-[#f5f5f0] mb-4">
                1. Introduction
              </h2>
              <p>
                AutoHarvester (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your privacy. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your 
                information when you visit our website autoharvester.com.au and use our services.
              </p>
              <p>
                Please read this privacy policy carefully. If you do not agree with the terms 
                of this privacy policy, please do not access the site or use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#f5f5f0] mb-4">
                2. Information We Collect
              </h2>
              <p className="mb-4">We collect information that you provide directly to us, including:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Account information (name, email address, phone number)</li>
                <li>Billing and payment information</li>
                <li>Search preferences and alert settings</li>
                <li>Communication history with our support team</li>
                <li>Any other information you choose to provide</li>
              </ul>
              
              <p className="mt-4 mb-4">We also automatically collect certain information when you use our services:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Log data (IP address, browser type, pages visited)</li>
                <li>Device information</li>
                <li>Usage patterns and preferences</li>
                <li>Cookies and similar technologies</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#f5f5f0] mb-4">
                3. How We Use Your Information
              </h2>
              <p className="mb-4">We use the information we collect to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Provide, maintain, and improve our services</li>
                <li>Process transactions and send related information</li>
                <li>Send technical notices, updates, and support messages</li>
                <li>Respond to your comments and questions</li>
                <li>Personalize your experience and deliver relevant content</li>
                <li>Monitor and analyze trends, usage, and activities</li>
                <li>Detect, prevent, and address technical issues</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#f5f5f0] mb-4">
                4. Information Sharing
              </h2>
              <p>
                We do not sell, trade, or otherwise transfer your personally identifiable 
                information to third parties without your consent, except as described below:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Service providers who assist in our operations</li>
                <li>Legal compliance and protection of rights</li>
                <li>Business transfers (mergers, acquisitions, or asset sales)</li>
                <li>With your consent or at your direction</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#f5f5f0] mb-4">
                5. Data Security
              </h2>
              <p>
                We implement appropriate technical and organizational measures to protect 
                your personal information against unauthorized access, alteration, disclosure, 
                or destruction. However, no method of transmission over the Internet or 
                electronic storage is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#f5f5f0] mb-4">
                6. Your Rights
              </h2>
              <p className="mb-4">Depending on your location, you may have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Object to processing of your information</li>
                <li>Request restriction of processing</li>
                <li>Data portability</li>
              </ul>
              <p className="mt-4">
                To exercise these rights, please contact us at privacy@autoharvester.com.au.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#f5f5f0] mb-4">
                7. Cookies
              </h2>
              <p>
                We use cookies and similar tracking technologies to track activity on our 
                service and hold certain information. You can instruct your browser to refuse 
                all cookies or to indicate when a cookie is being sent.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#f5f5f0] mb-4">
                8. Changes to This Policy
              </h2>
              <p>
                We may update our Privacy Policy from time to time. We will notify you of 
                any changes by posting the new Privacy Policy on this page and updating 
                the "Last updated" date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#f5f5f0] mb-4">
                9. Contact Us
              </h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <div className="mt-4 p-4 rounded-lg bg-[#141414] border border-white/[0.06]">
                <p className="text-[#f5f5f0] font-medium">AutoHarvester</p>
                <p className="text-[#a0a0a0]">Email: privacy@autoharvester.com.au</p>
                <p className="text-[#a0a0a0]">Address: Melbourne, Australia</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
