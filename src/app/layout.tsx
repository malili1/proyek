import "../styles/globals.css";
import "../styles/satoshi.css";
import { Inter } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs'
import { Metadata } from 'next'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: 'PodCoreX - Deploy Aplikasi dalam 15 Detik | Platform SaaS Indonesia',
    template: '%s | PodCoreX'
  },
  description: 'PodCoreX adalah platform SaaS Indonesia untuk deploy aplikasi dengan cepat. Dapatkan template n8n, Activepieces, WAHA Plus Cloud dan lainnya. Deploy dalam 15 detik!',
  keywords: [
    'deploy aplikasi',
    'saas indonesia',
    'n8n workflow',
    'activepieces',
    'waha plus cloud',
    'automation platform',
    'template aplikasi',
    'cloud deployment',
    'workflow automation',
    'whatsapp api',
    'integrasi aplikasi',
    'platform indonesia',
    'deploy cepat',
    'saas boilerplate',
    'startup indonesia',
    'aplikasi cloud',
    'automation tools',
    'workflow builder',
    'api integration',
    'cloud services'
  ],
  authors: [{ name: 'PodCoreX Team' }],
  creator: 'PodCoreX',
  publisher: 'PodCoreX',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://podcorex.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'PodCoreX - Deploy Aplikasi dalam 15 Detik',
    description: 'Platform SaaS Indonesia untuk deploy aplikasi dengan cepat. Template n8n, Activepieces, WAHA Plus Cloud dan lainnya.',
    url: 'https://podcorex.com',
    siteName: 'PodCoreX',
    locale: 'id_ID',
    type: 'website',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'PodCoreX - Platform Deploy Aplikasi Indonesia',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PodCoreX - Deploy Aplikasi dalam 15 Detik',
    description: 'Platform SaaS Indonesia untuk deploy aplikasi dengan cepat. Template n8n, Activepieces, WAHA Plus Cloud dan lainnya.',
    images: ['/images/twitter-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
}

const layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<html lang='id' suppressHydrationWarning={true}>
			<head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="theme-color" content="#2563eb" />
				<meta name="msapplication-TileColor" content="#2563eb" />
				<meta name="apple-mobile-web-app-capable" content="yes" />
				<meta name="apple-mobile-web-app-status-bar-style" content="default" />
				<meta name="apple-mobile-web-app-title" content="PodCoreX" />
				<meta name="application-name" content="PodCoreX" />
				<meta name="mobile-web-app-capable" content="yes" />
				<meta name="msapplication-config" content="/browserconfig.xml" />
				<link rel="icon" href="/favicon.ico" />
				<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
				<link rel="manifest" href="/manifest.json" />
			</head>
			<body
				className={`${inter.className} flex min-h-screen flex-col dark:bg-[#151F34]`}
			>
				<ClerkProvider
					appearance={{
						baseTheme: undefined,
						elements: {
							formButtonPrimary: 
								"bg-primary hover:bg-primary-dark text-white font-medium py-2 px-4 rounded-md transition-colors duration-200",
							card: "bg-transparent shadow-none",
							headerTitle: "text-2xl font-bold text-gray-900 dark:text-white",
							headerSubtitle: "text-gray-600 dark:text-gray-400",
							socialButtonsBlockButton: 
								"w-full flex justify-center items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200",
							socialButtonsBlockButtonText: "text-gray-700 dark:text-gray-300",
							dividerLine: "bg-gray-300 dark:bg-gray-600",
							dividerText: "text-gray-500 dark:text-gray-400",
							formFieldInput: 
								"appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm",
							formFieldLabel: "block text-sm font-medium text-gray-700 dark:text-gray-300",
							footerActionLink: "font-medium text-primary hover:text-primary-dark",
							footerActionText: "text-gray-600 dark:text-gray-400",
						},
					}}
					signInUrl="/sign-in"
					signUpUrl="/sign-up"
					afterSignInUrl="/dashboard"
					afterSignUpUrl="/dashboard"
				>
					{children}
				</ClerkProvider>
			</body>
		</html>
	);
};

export default layout;
