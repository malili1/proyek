"use client";
import React, { useEffect, useState, useRef } from "react";
import SectionHeader from "@/components/Common/SectionHeader";
import { pricingData } from "@/pricing/pricingData";
import PriceItem from "./PriceItem";


const Pricing = () => {

  return (
    <section
      id="pricing"
      className="overflow-hidden py-17.5 lg:py-22.5 xl:py-27.5"
    >
      {/* <!-- section title --> */}
      <SectionHeader
        title={"Simple, Transparent Pricing"}
        description="Get started with PodCoreX today and experience the power of container management"
      />

      <div className="mx-auto w-full max-w-[1170px] px-4 sm:px-8 xl:px-0">
        <div className="flex justify-center">
          <div className="w-full max-w-2xl">
            {pricingData &&
              pricingData.map((price, key) => (
                <PriceItem
                  plan={price}
                  key={key}
                />
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
