export type Template = {
	title: string;
	description: string;
	image: string;
	link: string;
	category: string;
	tags?: string[];
	price?: number;
	priceUnit?: string;
	pricePeriod?: string;
	github?: string;
	external?: string;
}; 