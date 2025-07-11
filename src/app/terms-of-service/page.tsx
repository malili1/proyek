import React from "react";
import Breadcrumb from "@/components/Common/Breadcrumb";
import Header from "@/components/Header";

const TermsOfService = () => {
	return (
		<>
			<Header />
			<Breadcrumb pageTitle="Terms of Service" />
			
			<section className="relative z-1 overflow-hidden pb-17.5 pt-30 lg:pb-20 lg:pt-30 xl:pb-25 xl:pt-[170px]">
				<div className="mx-auto w-full max-w-[1170px] px-4 sm:px-8 xl:px-0">
					<div className="prose prose-lg max-w-none dark:prose-invert">
						<h1 className="mb-8 text-3xl font-bold text-black dark:text-white">
							Terms of Service
						</h1>
						
						<p className="mb-6 text-gray-600 dark:text-gray-300">
							Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
						</p>

						<div className="space-y-6 text-gray-600 dark:text-gray-300">
							<div>
								<h2 className="mb-4 text-xl font-semibold text-black dark:text-white">
									1. Acceptance of Terms
								</h2>
								<p>
									By accessing and using PodCoreX services, you accept and agree to be bound by the terms 
									and provision of this agreement. If you do not agree to abide by the above, please do 
									not use this service.
								</p>
							</div>

							<div>
								<h2 className="mb-4 text-xl font-semibold text-black dark:text-white">
									2. Use License
								</h2>
								<p className="mb-4">
									Permission is granted to temporarily download one copy of the materials (information or software) 
									on PodCoreX's website for personal, non-commercial transitory viewing only.
								</p>
								<p className="mb-4">This is the grant of a license, not a transfer of title, and under this license you may not:</p>
								<ul className="ml-6 list-disc space-y-2">
									<li>Modify or copy the materials</li>
									<li>Use the materials for any commercial purpose or for any public display</li>
									<li>Attempt to reverse engineer any software contained on the website</li>
									<li>Remove any copyright or other proprietary notations from the materials</li>
									<li>Transfer the materials to another person</li>
								</ul>
							</div>

							<div>
								<h2 className="mb-4 text-xl font-semibold text-black dark:text-white">
									3. Disclaimer
								</h2>
								<p>
									The materials on PodCoreX's website are provided on an 'as is' basis. PodCoreX makes no 
									warranties, expressed or implied, and hereby disclaims and negates all other warranties 
									including without limitation, implied warranties or conditions of merchantability, fitness 
									for a particular purpose, or non-infringement of intellectual property or other violation of rights.
								</p>
							</div>

							<div>
								<h2 className="mb-4 text-xl font-semibold text-black dark:text-white">
									4. Limitations
								</h2>
								<p>
									In no event shall PodCoreX or its suppliers be liable for any damages (including, without 
									limitation, damages for loss of data or profit, or due to business interruption) arising 
									out of the use or inability to use the materials on PodCoreX's website.
								</p>
							</div>

							<div>
								<h2 className="mb-4 text-xl font-semibold text-black dark:text-white">
									5. Revisions and Errata
								</h2>
								<p>
									The materials appearing on PodCoreX's website could include technical, typographical, or 
									photographic errors. PodCoreX does not warrant that any of the materials on its website 
									are accurate, complete or current.
								</p>
							</div>

							<div>
								<h2 className="mb-4 text-xl font-semibold text-black dark:text-white">
									6. Links
								</h2>
								<p>
									PodCoreX has not reviewed all of the sites linked to its website and is not responsible 
									for the contents of any such linked site. The inclusion of any link does not imply 
									endorsement by PodCoreX of the site.
								</p>
							</div>

							<div>
								<h2 className="mb-4 text-xl font-semibold text-black dark:text-white">
									7. Contact Information
								</h2>
								<p>
									If you have any questions about these Terms of Service, please contact us at:{" "}
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

export default TermsOfService; 