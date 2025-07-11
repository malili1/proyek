import React from "react";
import Breadcrumb from "@/components/Common/Breadcrumb";
import Header from "@/components/Header";

const CookiePolicy = () => {
	return (
		<>
			<Header />
			<Breadcrumb pageTitle="Cookie Policy" />
			
			<section className="relative z-1 overflow-hidden pb-17.5 pt-30 lg:pb-20 lg:pt-30 xl:pb-25 xl:pt-[170px]">
				<div className="mx-auto w-full max-w-[1170px] px-4 sm:px-8 xl:px-0">
					<div className="prose prose-lg max-w-none dark:prose-invert">
						<h1 className="mb-8 text-3xl font-bold text-black dark:text-white">
							Cookie Policy
						</h1>
						
						<p className="mb-6 text-gray-600 dark:text-gray-300">
							Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
						</p>

						<div className="space-y-6 text-gray-600 dark:text-gray-300">
							<div>
								<h2 className="mb-4 text-xl font-semibold text-black dark:text-white">
									1. What Are Cookies
								</h2>
								<p>
									Cookies are small text files that are placed on your computer or mobile device when you 
									visit a website. They are widely used to make websites work more efficiently and to 
									provide information to website owners.
								</p>
							</div>

							<div>
								<h2 className="mb-4 text-xl font-semibold text-black dark:text-white">
									2. How We Use Cookies
								</h2>
								<p className="mb-4">
									We use cookies for several purposes, including:
								</p>
								<ul className="ml-6 list-disc space-y-2">
									<li>Essential cookies: Required for the website to function properly</li>
									<li>Analytics cookies: Help us understand how visitors interact with our website</li>
									<li>Preference cookies: Remember your settings and preferences</li>
									<li>Marketing cookies: Used to deliver relevant advertisements</li>
								</ul>
							</div>

							<div>
								<h2 className="mb-4 text-xl font-semibold text-black dark:text-white">
									3. Types of Cookies We Use
								</h2>
								<div className="space-y-4">
									<div>
										<h3 className="mb-2 text-lg font-medium text-black dark:text-white">
											Essential Cookies
										</h3>
										<p>
											These cookies are necessary for the website to function and cannot be switched off. 
											They are usually only set in response to actions made by you which amount to a 
											request for services, such as setting your privacy preferences, logging in, or 
											filling in forms.
										</p>
									</div>
									<div>
										<h3 className="mb-2 text-lg font-medium text-black dark:text-white">
											Analytics Cookies
										</h3>
										<p>
											These cookies allow us to count visits and traffic sources so we can measure and 
											improve the performance of our site. They help us to know which pages are the 
											most and least popular and see how visitors move around the site.
										</p>
									</div>
									<div>
										<h3 className="mb-2 text-lg font-medium text-black dark:text-white">
											Preference Cookies
										</h3>
										<p>
											These cookies enable the website to provide enhanced functionality and 
											personalization. They may be set by us or by third-party providers whose 
											services we have added to our pages.
										</p>
									</div>
								</div>
							</div>

							<div>
								<h2 className="mb-4 text-xl font-semibold text-black dark:text-white">
									4. Third-Party Cookies
								</h2>
								<p>
									We may use third-party services that place cookies on your device. These services 
									include analytics providers, advertising networks, and social media platforms. 
									Each third-party service has its own privacy policy and cookie policy.
								</p>
							</div>

							<div>
								<h2 className="mb-4 text-xl font-semibold text-black dark:text-white">
									5. Managing Cookies
								</h2>
								<p className="mb-4">
									You can control and manage cookies in several ways:
								</p>
								<ul className="ml-6 list-disc space-y-2">
									<li>Browser settings: Most browsers allow you to refuse or accept cookies</li>
									<li>Cookie consent: We provide cookie consent options when you first visit our site</li>
									<li>Third-party opt-outs: Many third-party services provide opt-out mechanisms</li>
									<li>Device settings: You can manage cookies through your device settings</li>
								</ul>
							</div>

							<div>
								<h2 className="mb-4 text-xl font-semibold text-black dark:text-white">
									6. Updates to This Policy
								</h2>
								<p>
									We may update this Cookie Policy from time to time to reflect changes in our practices 
									or for other operational, legal, or regulatory reasons. We will notify you of any 
									material changes by posting the new Cookie Policy on this page.
								</p>
							</div>

							<div>
								<h2 className="mb-4 text-xl font-semibold text-black dark:text-white">
									7. Contact Us
								</h2>
								<p>
									If you have any questions about our use of cookies, please contact us at:{" "}
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

export default CookiePolicy; 