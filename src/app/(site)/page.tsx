import Home from "@/components/Home";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "PodCoreX - Deploy Aplikasi dalam 15 Detik | Platform SaaS Indonesia",
	description: "PodCoreX adalah platform SaaS Indonesia untuk deploy aplikasi dengan cepat. Dapatkan template n8n, Activepieces, WAHA Plus Cloud dan lainnya. Deploy dalam 15 detik!",
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
	openGraph: {
		type: "website",
		title: "PodCoreX - Deploy Aplikasi dalam 15 Detik",
		description: "Platform SaaS Indonesia untuk deploy aplikasi dengan cepat. Template n8n, Activepieces, WAHA Plus Cloud dan lainnya.",
		url: "https://podcorex.com",
		siteName: "PodCoreX",
		locale: "id_ID",
		images: [
			{
				url: "/images/og-image.png",
				width: 1200,
				height: 630,
				alt: "PodCoreX - Platform Deploy Aplikasi Indonesia",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "PodCoreX - Deploy Aplikasi dalam 15 Detik",
		description: "Platform SaaS Indonesia untuk deploy aplikasi dengan cepat. Template n8n, Activepieces, WAHA Plus Cloud dan lainnya.",
		images: ["/images/twitter-image.png"],
	},
	alternates: {
		canonical: "/",
	},
};

export default function HomePage() {
	return (
		<main>
			<Home />
		</main>
	);
}
