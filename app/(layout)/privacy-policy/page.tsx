import Container from "@/components/layout/Container";
import React from "react";
import Link from "next/link";
import Icon from "@/components/layout/Icon";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="flex flex-col min-h-screen gap-y-[60px]">
      <Container className="mt-[45px] md:mt-[30px] pt-[100px] pb-[60px] text-blue1">
        <div className="max-w-[1380px] mx-auto">
          <h1 className="headline-xxl !leading-[68px] mb-[30px]">
            Privacy Policy &amp; Data Protection
          </h1>

          <div className="space-y-8">
            {/* Introduction */}
            <section>
              <p className="highlight-text-md">
                Ether Guild ("Company"), a Wyoming Nonprofit corporation, is committed to protecting User's privacy.
                Ethismoney.xyz is a website operated by the Company, which has prepared this Privacy Policy (this "Policy")
                to describe to the user ("User") Company's practices regarding the Personal Information (as defined below)
                Company collects, why Company collects it, and how Company uses and discloses it.
              </p>
            </section>

            {/* Acceptance Section */}
            <section>
              <h2 className="headline-xl !leading-[41px] mb-4 text-blue2">ACCEPTANCE OF THE POLICY</h2>
              <p className="text-md text-blue1">
                User's privacy matters to Company, so User should take the time to get to know Company's policies and practices.
                Please understand that Company reserves the right to change any of Company's policies and practices at any time,
                but User can always find the latest version of this Policy here on this page. User's continued use of the Website
                after Company makes changes is deemed to be acceptance of those changes, so please check this Policy periodically for updates.
              </p>
              <p className="mt-4 text-md text-blue1">
                This Policy describes the types of information Company collects from User or that User may provide when User visits
                the Website or utilizes the Website and Company's practices for collecting, using, maintaining, protecting, and disclosing that information.
              </p>
              <p className="mt-4 text-md text-blue1">
                Please read this Policy carefully to understand Company's practices regarding User's information and how Company will treat it.
                If User does not agree with Company's policies and practices, then please do not use the Website. By using the Website,
                User agrees to the terms of this Policy.
              </p>
            </section>

            {/* Personal Information Collection */}
            <section>
              <h2 className="headline-xl !leading-[41px] mb-4 text-blue2">PERSONAL INFORMATION COMPANY COLLECTS</h2>
              <p className="text-md text-blue1">
                As used herein, "Personal Information" means information that identifies or is reasonably capable of identifying
                an individual, directly or indirectly, and information that is capable of being associated with an identified or
                reasonably identifiable individual.
              </p>

              <h3 className="headline-lg !leading-[41px] mt-6 mb-3 text-blue2">Personal Information Company Collects from User</h3>
              <p className="text-md text-blue1">Company (or Company's Affiliates) may collect and store the following categories of Personal Information directly from User:</p>
              <ul className="list-disc pl-6 mt-2 space-y-2 text-md text-blue1">
                <li>Identification information, such as name, email, phone number, postal address, Wallet address, social media handles and information, and any information that may be legally required, including information required for Know Your Customer ("KYC") verification purposes such as User's social security number;</li>
                <li>Commercial activity information, such as public blockchain data, including Wallet addresses;</li>
                <li>Information User provides to Company through correspondence, including Account opening, customer support, messages, text boxes, other user content, or the like;</li>
              </ul>
            </section>

            {/* Automatic Collection */}
            <section>
              <h3 className="headline-lg !leading-[41px] mt-6 mb-3 text-blue2">Personal Information That May Be Collected Automatically</h3>
              <p className="text-md text-blue1">Company (or Company's Affiliates) may collect and store the following categories of Personal Information automatically through User's use of the Website:</p>
              <ul className="list-disc pl-6 mt-2 space-y-2 text-md text-blue1">
                <li>Online identifier information, such as IP address and log information, domain names, and similar identifying names or addresses;</li>
                <li>Device information, such as hardware, software, operating system, browser, device name, language preferences;</li>
                <li>Usage data, such as system activity, internal and external information related to the Website, clickstream information;</li>
                <li>Geolocation data, such as information about User's device location.</li>
              </ul>
            </section>

            {/* Age Restriction */}
            <section>
              <h2 className="headline-xl !leading-[41px] mb-4 text-blue2">INTENDED FOR USERS 18+</h2>
              <p className="text-md text-blue1">
                Company does not knowingly collect data from or market to anyone under 18 years of age. Company does not knowingly
                solicit data from or market to anyone under 18 years of age. By using the Website, User represents that User is at
                least 18 years old, or that User is the parent or guardian of such a minor and consents to such minor dependent's
                use of the Website. If Company learns that Personal Information from Users less than 18 years of age has been collected,
                Company will deactivate the Account and take reasonable measures to promptly delete such data from Company's records.
                If User becomes aware of any data Company may have collected from anyone under age 18, please contact Company at legal@bankless.com.
              </p>
            </section>

            {/* Usage of Information */}
            <section>
              <h2 className="headline-xl !leading-[41px] mb-4 text-blue2">HOW COMPANY USES USER'S PERSONAL INFORMATION</h2>
              <p className="text-md text-blue1">
                Company collects Personal Information about User in an attempt to provide User with the best experience possible,
                protect User from risks related to improper use and fraud, and help Company maintains and improves the Website.
                Company may use User's Personal Information to:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-2 text-md text-blue1">
                <li>Provide User with the Website</li>
                <li>Comply with Legal and Regulatory Requirements</li>
                <li>Detect and Prevent Fraud</li>
                <li>Protect the Security and Integrity of the Website</li>
                <li>Provide User with Customer Support</li>
                <li>Market Company's Products</li>
                <li>Other Business Purposes</li>
              </ul>
            </section>

            {/* Contact Information */}
            <section>
              <h2 className="headline-xl !leading-[41px] mb-4 text-blue2">CONTACT US</h2>
              <p className="text-md text-blue1">
                If User has questions or concerns regarding this policy or Company's use of User's Personal Information,
                please feel free to email Company at info@etherguild.xyz; or write to Company at:
              </p>
              <div className="mt-4 text-md text-blue1">
                <p>Ether Guild</p>
                <p>Attn: Data Protection Officer</p>
                <p>_____</p>
              </div>
            </section>
          </div>
        </div>

      </Container>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy; 