import React from "react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
	return (
		<footer className='relative z-1 mt-auto overflow-hidden bg-gray-900 py-16'>
			<div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
				{/* Main Footer Content */}
				<div className='grid grid-cols-1 gap-8 lg:grid-cols-5'>
					{/* Company Info */}
					<div className='lg:col-span-2'>
						<Link href='/' className='inline-block'>
							<div className="flex items-center">
								<div className="bg-primary rounded-lg px-3 py-1 mr-2">
									<span className="text-white font-bold text-sm">PC</span>
								</div>
								<span className="text-xl font-bold text-white">PodCoreX</span>
							</div>
						</Link>
						<p className='mt-6 max-w-md text-sm leading-6 text-gray-300'>
							PodCoreX offers seamless container and application purchasing solutions for businesses of all sizes.
						</p>
					</div>

					{/* Quick Links */}
					<div>
						<h3 className='text-sm font-semibold leading-6 text-white'>Quick Links</h3>
						<ul className='mt-6 space-y-4'>
							<li>
								<Link href='/' className='text-sm leading-6 text-gray-300 hover:text-white'>
									Home
								</Link>
							</li>
							<li>
								<Link href='/sign-up' className='text-sm leading-6 text-gray-300 hover:text-white'>
									Get Started
								</Link>
							</li>
							<li>
								<Link href='/sign-in' className='text-sm leading-6 text-gray-300 hover:text-white'>
									Login
								</Link>
							</li>
						</ul>
					</div>

					{/* Product */}
					<div>
						<h3 className='text-sm font-semibold leading-6 text-white'>Product</h3>
						<ul className='mt-6 space-y-4'>
							<li>
								<Link href='#features' className='text-sm leading-6 text-gray-300 hover:text-white'>
									Features
								</Link>
							</li>
							<li>
								<Link href='#pricing' className='text-sm leading-6 text-gray-300 hover:text-white'>
									Pricing
								</Link>
							</li>
						</ul>
					</div>

					{/* Contact */}
					<div>
						<h3 className='text-sm font-semibold leading-6 text-white'>Contact</h3>
						<ul className='mt-6 space-y-4'>
							<li>
								<Link href='mailto:support@podcorex.com' className='flex items-center gap-2 text-sm leading-6 text-gray-300 hover:text-white'>
									<svg className='h-4 w-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
										<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' />
									</svg>
									support@podcorex.com
								</Link>
							</li>
							<li>
								<Link href='tel:+62851-9005-2577' className='flex items-center gap-2 text-sm leading-6 text-gray-300 hover:text-white'>
									<svg className='h-4 w-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
										<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z' />
									</svg>
									+62821-1454-1538
								</Link>
							</li>
						</ul>
					</div>
				</div>

				{/* Bottom Section */}
				<div className='mt-16 border-t border-gray-800 pt-8'>
					<div className='flex flex-col items-center justify-between gap-4 sm:flex-row'>
						<p className='text-sm leading-5 text-gray-400'>
							© {new Date().getFullYear()} PodCoreX - PT Mandala Digital Teknologi. All rights reserved.
						</p>
						<div className='flex space-x-6'>
							<Link href='/privacy-policy' className='text-sm leading-5 text-gray-400 hover:text-gray-300'>
								Privacy Policy
							</Link>
							<Link href='/terms-of-service' className='text-sm leading-5 text-gray-400 hover:text-gray-300'>
								Terms of Service
							</Link>
							<Link href='/cookie-policy' className='text-sm leading-5 text-gray-400 hover:text-gray-300'>
								Cookie Policy
							</Link>
						</div>
					</div>
				</div>
			</div>

			{/* Background Shapes */}
			<div className='hidden sm:block'>
				<div className='absolute bottom-0 left-0 -z-1'>
					<Image
						src='/images/footer/footer-grid-01.svg'
						alt='grid'
						width={305}
						height={305}
					/>
				</div>
				<div className='absolute right-0 top-0 -z-1'>
					<Image
						src='/images/footer/footer-grid-02.svg'
						alt='grid'
						width={305}
						height={305}
					/>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
