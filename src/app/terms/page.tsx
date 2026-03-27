import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | AutoHarvester",
  description:
    "AutoHarvester's terms of service. Read about the terms and conditions governing your use of our platform.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] pt-24 lg:pt-32">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-[#f5f5f0] mb-4">
            Terms of{" "}
            <span className="text-[#b8956e]">Service</span>
          </h1>
          <p className="text-[#a0a0a0]">
            Last updated: March 2024
          </p>
        </div>

        <div className="prose prose-invert prose-lg max-w-none">
          <div className="space-y-8 text-[#a0a0a0]">
            <section>
              <h2 className="text-2xl font-bold text-[#f5f5f0] mb-4">
                1. Agreement to Terms
              </h2>
              <p>
                By accessing or using AutoHarvester&apos;s website and services, you agree to be 
                bound by these Terms of Service. If you disagree with any part of the terms, 
                you may not access the service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#f5f5f0] mb-4">
                2. Description of Service
              </h2>
              <p>
                AutoHarvester provides a platform that aggregates and analyzes car pricing 
                data from various sources. Our services include price history tracking, 
                market trend analysis, sold price databases, and related features.
              </p>
              <p className="mt-4">
                We reserve the right to modify, suspend, or discontinue any part of our 
                services at any time without prior notice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#f5f5f0] mb-4">
                3. User Accounts
              </h2>
              <p className="mb-4">When you create an account with us, you must provide accurate and complete information.</p>
              <p className="mb-4">You are responsible for:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Maintaining the confidentiality of your account password</li>
                <li>All activities that occur under your account</li>
                <li>Notifying us immediately of any unauthorized access</li>
              </ul>
              <p className="mt-4">
                We reserve the right to terminate accounts that violate these terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#f5f5f0] mb-4">
                4. Acceptable Use
              </h2>
              <p className="mb-4">You agree not to use our services to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe upon the rights of others</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Use automated means to access our services without permission</li>
                <li>Copy, distribute, or disclose any part of our service without authorization</li>
                <li>Interfere with the proper working of our service</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#f5f5f0] mb-4">
                5. Data and API Usage
              </h2>
              <p className="mb-4">
                For users with API access, the following additional terms apply:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>API usage is subject to rate limits as specified in your plan</li>
                <li>You may not resell or redistribute our data without written permission</li>
                <li>Attribution to AutoHarvester is required for public use of our data</li>
                <li>We may monitor API usage to ensure compliance</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#f5f5f0] mb-4">
                6. Intellectual Property
              </h2>
              <p>
                The service and its original content, features, and functionality are and 
                will remain the exclusive property of AutoHarvester and its licensors. 
                The service is protected by copyright, trademark, and other laws.
              </p>
              <p className="mt-4">
                Our trademarks and trade dress may not be used in connection with any 
                product or service without prior written consent.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#f5f5f0] mb-4">
                7. Disclaimer of Warranties
              </h2>
              <p>
                Our services are provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis. 
                We make no warranties, expressed or implied, regarding the accuracy, 
                reliability, or availability of our data or services.
              </p>
              <p className="mt-4">
                While we strive for accuracy, we do not guarantee that our pricing data 
                is complete, correct, or current. You should verify any information 
                before making financial decisions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#f5f5f0] mb-4">
                8. Limitation of Liability
              </h2>
              <p>
                In no event shall AutoHarvester, nor its directors, employees, partners, 
                agents, suppliers, or affiliates, be liable for any indirect, incidental, 
                special, consequential, or punitive damages arising from your use of our 
                services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#f5f5f0] mb-4">
                9. Indemnification
              </h2>
              <p>
                You agree to defend, indemnify, and hold harmless AutoHarvester and its 
                licensees and licensors from any claims, damages, obligations, losses, 
                liabilities, costs, or debt arising from your use of the service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#f5f5f0] mb-4">
                10. Termination
              </h2>
              <p>
                We may terminate or suspend your account immediately, without prior notice 
                or liability, for any reason, including breach of these Terms.
              </p>
              <p className="mt-4">
                Upon termination, your right to use the service will immediately cease. 
                All provisions of the Terms which by their nature should survive 
                termination shall survive.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#f5f5f0] mb-4">
                11. Governing Law
              </h2>
              <p>
                These Terms shall be governed and construed in accordance with the laws 
                of Victoria, Australia, without regard to its conflict of law provisions.
              </p>
              <p className="mt-4">
                Our failure to enforce any right or provision of these Terms will not be 
                considered a waiver of those rights.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#f5f5f0] mb-4">
                12. Changes to Terms
              </h2>
              <p>
                We reserve the right to modify or replace these Terms at any time. If a 
                revision is material, we will try to provide at least 30 days' notice 
                prior to any new terms taking effect.
              </p>
              <p className="mt-4">
                By continuing to access or use our service after those revisions become 
                effective, you agree to be bound by the revised terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-[#f5f5f0] mb-4">
                13. Contact Us
              </h2>
              <p>
                If you have any questions about these Terms, please contact us:
              </p>
              <div className="mt-4 p-4 rounded-lg bg-[#141414] border border-white/[0.06]">
                <p className="text-[#f5f5f0] font-medium">AutoHarvester</p>
                <p className="text-[#a0a0a0]">Email: legal@autoharvester.com.au</p>
                <p className="text-[#a0a0a0]">Address: Melbourne, Australia</p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
