"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SectionHeader from "@/components/Common/SectionHeader";
import templateData from "./templateData";
import type { Template } from "@/types/template";

const Template = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
	const [selectedCategory, setSelectedCategory] = useState("All");

	// Filter templates based on search and category
	const filteredTemplates = templateData.filter((template) => {
		const matchesSearch = template.title.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesCategory = selectedCategory === "All" || template.category === selectedCategory;
		return matchesSearch && matchesCategory;
	});

	const categories = ["All", "Business", "Productivity", "Communication", "Entertainment"];

	return (
		<section id="templates" className='overflow-hidden bg-gray-50 py-17.5 dark:bg-gray-900 lg:py-22.5 xl:py-27.5'>
			{/* Section Header */}
			<SectionHeader
				title={"Application Templates"}
				description='Choose from our curated collection of application templates and deploy them in seconds.'
			/>

			<div className='mx-auto w-full max-w-[1170px] px-4 sm:px-8 xl:px-0'>
				{/* Search and View Controls */}
				<div className='mb-8 flex items-center justify-center gap-2'>
					{/* Search Form */}
					<div className='relative w-full max-w-xl'>
						<input
							type='text'
							placeholder='Search templates...'
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className='w-full rounded-lg border border-gray-300 bg-white px-4 py-3 pl-10 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white'
						/>
						<svg
							className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400'
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
							/>
						</svg>
					</div>

					{/* View Toggle Buttons */}
					<div className='flex items-center'>
						<button
							onClick={() => setViewMode("grid")}
							className={`flex items-center gap-2 rounded-l-lg px-3 py-3 text-sm font-medium transition-colors ${
								viewMode === "grid"
									? "bg-primary text-white"
									: "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
							}`}
						>
							<svg className='h-4 w-4' fill='currentColor' viewBox='0 0 24 24'>
								<path d='M3 3h7v7H3V3zm0 11h7v7H3v-7zm11-11h7v7h-7V3zm0 11h7v7h-7v-7z' />
							</svg>
							Grid
						</button>
						<button
							onClick={() => setViewMode("list")}
							className={`flex items-center gap-2 rounded-r-lg px-3 py-3 text-sm font-medium transition-colors ${
								viewMode === "list"
									? "bg-primary text-white"
									: "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
							}`}
						>
							<svg className='h-4 w-4' fill='currentColor' viewBox='0 0 24 24'>
								<path d='M3 13h18v-2H3v2zm0 6h18v-2H3v2zM3 5v2h18V5H3z' />
							</svg>
							List
						</button>
					</div>
				</div>

				{/* Category Filters */}
				<div className='mb-8 flex flex-wrap items-center justify-center gap-2'>
					{categories.map((category) => (
						<button
							key={category}
							onClick={() => setSelectedCategory(category)}
							className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
								selectedCategory === category
									? "bg-primary text-white"
									: "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
							}`}
						>
							{category}
						</button>
					))}
				</div>

				{/* Templates Grid/List */}
				<div className={viewMode === "grid" ? "grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3" : "space-y-4"}>
					{filteredTemplates?.map((template: Template, key: number) => (
						<div key={key} className={`relative group overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl dark:bg-gray-800 p-6 flex flex-col`}>
							{/* Kategori kanan atas */}
							<span className="absolute right-4 top-4 rounded bg-gray-100 px-3 py-1 text-xs font-medium text-gray-500 dark:bg-gray-700 dark:text-gray-300">{template.category}</span>
							{/* Logo dan nama */}
							<div className="flex items-center gap-3 mb-3">
								{template.image && template.image.endsWith('.svg') ? (
									<img src={template.image} alt={template.title} width={40} height={40} className="rounded bg-gray-50 p-1 object-contain" />
								) : (
									<Image src={template.image} alt={template.title} width={40} height={40} className="rounded bg-gray-50 p-1 object-contain" />
								)}
								<span className="font-bold text-lg text-gray-900 dark:text-white">{template.title}</span>
							</div>
							<p className="mb-3 text-gray-500 text-sm">{template.description}</p>
							{/* Tags */}
							<div className="mb-4 flex flex-wrap gap-2">
								{template.tags?.map((tag) => (
									<span key={tag} className="rounded bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">{tag}</span>
								))}
							</div>
							{/* Harga */}
							<div className="mb-2 font-bold text-xl text-gray-900 dark:text-white">{template.priceUnit} {template.price?.toLocaleString("id-ID")}<span className="text-sm font-normal text-gray-400"> {template.pricePeriod}</span></div>
							{/* Tombol Deploy Now */}
							<Link href={template.link} className="mt-auto inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-2.5 font-medium text-white hover:bg-blue-700 transition">
								Deploy Now
								<svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
							</Link>
						</div>
					))}
				</div>

				{/* View All Templates Button */}
			</div>
		</section>
	);
};

export default Template; 