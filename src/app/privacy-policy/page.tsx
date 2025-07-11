import React from "react";
import Breadcrumb from "@/components/Common/Breadcrumb";
import Header from "@/components/Header";

const PrivacyPolicy = () => {
	return (
		<>
			<Header />
			<Breadcrumb pageTitle="Privacy Policy" />
			
			<section className="relative z-1 overflow-hidden pb-17.5 pt-30 lg:pb-20 lg:pt-30 xl:pb-25 xl:pt-[170px]">
				<div className="mx-auto w-full max-w-[1170px] px-4 sm:px-8 xl:px-0">
					<div className="prose prose-lg max-w-none dark:prose-invert">
						<h1 className="mb-8 text-3xl font-bold text-black dark:text-white">
							Privacy Policy
						</h1>
						
						<p className="mb-6 text-gray-600 dark:text-gray-300">
							Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
						</p>

						<div className="space-y-6 text-gray-600 dark:text-gray-300">
							<div>
								<h2 className="mb-4 text-xl font-semibold text-black dark:text-white">
									1. Information We Collect
								</h2>
								<p className="mb-4">
									We collect information you provide directly to us, such as when you create an account, 
									subscribe to our services, or contact us for support. This may include:
								</p>
								<ul className="ml-6 list-disc space-y-2">
									<li>Name and contact information</li>
									<li>Account credentials</li>
									<li>Payment information</li>
									<li>Usage data and analytics</li>
									<li>Communication preferences</li>
								</ul>
							</div>

							<div>
								<h2 className="mb-4 text-xl font-semibold text-black dark:text-white">
									2. How We Use Your Information
								</h2>
								<p className="mb-4">
									We use the information we collect to:
								</p>
								<ul className="ml-6 list-disc space-y-2">
									<li>Provide and maintain our services</li>
									<li>Process transactions and send related information</li>
									<li>Send technical notices, updates, and support messages</li>
									<li>Respond to your comments and questions</li>
									<li>Improve our services and develop new features</li>
								</ul>
							</div>

							<div>
								<h2 className="mb-4 text-xl font-semibold text-black dark:text-white">
									3. Information Sharing
								</h2>
								<p>
									We do not sell, trade, or otherwise transfer your personal information to third parties 
									without your consent, except as described in this policy or as required by law.
								</p>
							</div>

							<div>
								<h2 className="mb-4 text-xl font-semibold text-black dark:text-white">
									4. Data Security
								</h2>
								<p>
									We implement appropriate security measures to protect your personal information against 
									unauthorized access, alteration, disclosure, or destruction.
								</p>
							</div>

							<div>
								<h2 className="mb-4 text-xl font-semibold text-black dark:text-white">
									5. Your Rights
								</h2>
								<p className="mb-4">
									You have the right to:
								</p>
								<ul className="ml-6 list-disc space-y-2">
									<li>Access your personal information</li>
									<li>Correct inaccurate information</li>
									<li>Request deletion of your information</li>
									<li>Opt-out of marketing communications</li>
									<li>Export your data</li>
								</ul>
							</div>

							<div>
								<h2 className="mb-4 text-xl font-semibold text-black dark:text-white">
									6. Contact Us
								</h2>
								<p>
									If you have any questions about this Privacy Policy, please contact us at:{" "}
									<a 
										href="mailto:info@podcorex.com" 
										className="text-primary hover:text-primary-dark"
									>
										info@podcorex.com
									</a>
								</p>
								<p className="mt-2">
									PodCoreX<br />
									https://podcorex.com
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default PrivacyPolicy; 