import "../styles/globals.css";
import "../styles/satoshi.css";
import { Inter } from "next/font/google";
import { AuthProvider } from '@/contexts/AuthContext'
import { Metadata } from 'next'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: 'PodCoreX - Deploy Applications in 15 Seconds | Indonesian SaaS Platform',
    template: '%s | PodCoreX'
  },
  description: 'PodCoreX is an Indonesian SaaS platform for quick application deployment. Get n8n, Activepieces, WAHA Plus Cloud templates and more. Deploy in 15 seconds!',
  keywords: [
    'deploy applications',
    'indonesian saas',
    'n8n workflow',
    'activepieces',
    'waha plus cloud',
    'automation platform',
    'application templates',
    'cloud deployment',
    'workflow automation',
    'whatsapp api',
    'application integration',
    'indonesian platform',
    'quick deploy',
    'saas boilerplate',
    'indonesian startup',
    'cloud applications',
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
    title: 'PodCoreX - Deploy Applications in 15 Seconds',
    description: 'Indonesian SaaS platform for quick application deployment. n8n, Activepieces, WAHA Plus Cloud templates and more.',
    url: 'https://podcorex.com',
    siteName: 'PodCoreX',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'PodCoreX - Indonesian Application Deployment Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PodCoreX - Deploy Applications in 15 Seconds',
    description: 'Indonesian SaaS platform for quick application deployment. n8n, Activepieces, WAHA Plus Cloud templates and more.',
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
		<html lang='en' suppressHydrationWarning={true}>
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
				<AuthProvider>
					{children}
				</AuthProvider>
			</body>
		</html>
	);
};

export default layout;
