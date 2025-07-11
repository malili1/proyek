"use client";
import { Price } from "@/types/priceItem";
import Image from "next/image";
import Link from "next/link";

type Props = {
  plan: Price;
  isBilling?: boolean;
  subscriptionPlan?: any;
};

const PriceItem = ({ plan }: Props) => {
  const active = plan?.active;
  const activeStyle = active
    ? "bg-white text-black"
    : "bg-primary text-white hover:bg-primary-dark";

  return (
    <div
      className={`relative rounded-[20px] p-10 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-1 ${
        active 
          ? "bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white" 
          : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
      }`}
    >
      {active && (
        <span
          className={`absolute right-4.5 top-4.5 inline-flex rounded-full px-4 py-2 font-satoshi font-medium bg-white/20 text-white backdrop-blur-sm border border-white/30`}
        >
          Popular
        </span>
      )}

      <div className="mb-7 flex items-center gap-5">
        <div
          className={`flex h-18 w-full max-w-[72px] items-center justify-center rounded-2xl ${
            active ? "bg-white/20 backdrop-blur-sm" : "bg-blue-50 dark:bg-blue-900/20"
          }`}
        >
          <Image src={plan?.icon} alt={plan?.nickname} width={34} height={34} />
        </div>
        <div>
          <span
            className={`block text-lg font-medium ${
              active ? "text-white/90" : "text-gray-600 dark:text-gray-400"
            }`}
          >
            {plan?.subtitle}
          </span>
          <h3
            className={`font-satoshi text-2xl font-bold ${
              active ? "text-white" : "text-black dark:text-white"
            }`}
          >
            {plan.nickname}
          </h3>
        </div>
      </div>

      <p className={`${
        active ? "text-white/90" : "text-gray-600 dark:text-gray-400"
      }`}>
        {plan?.description}
      </p>

      {/* <!-- divider --> */}
      <div
        className={`my-6 h-px w-full ${
          active ? "bg-white/30" : "bg-gray-200 dark:bg-gray-700"
        }`}
      ></div>

      <h4
        className={`mb-4.5 font-satoshi text-heading-4 font-bold leading-[1.22] lg:text-heading-2 xl:text-[54px] text-center text-blue-600 dark:text-blue-400`}
      >
        FREE
      </h4>

      <div className="mt-9 flex flex-col gap-3">
        <Link
          href="/sign-up"
          className={`flex w-full justify-center rounded-full p-3.5 font-satoshi font-medium transition-all duration-200 ${
            active 
              ? "bg-white text-blue-600 hover:bg-gray-100" 
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          Get Started
        </Link>
        
        <Link
          href="/templates"
          className={`flex w-full justify-center rounded-full border-2 p-3.5 font-satoshi font-medium transition-all duration-200 ${
            active 
              ? "border-white text-white hover:bg-white hover:text-blue-600" 
              : "border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
          }`}
        >
          See App Template
        </Link>
      </div>
    </div>
  );
};

export default PriceItem;
