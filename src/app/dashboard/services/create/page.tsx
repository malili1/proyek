"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Cloud } from "lucide-react";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function CreateServicePage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchServices() {
      setLoading(true);
      const { data, error } = await supabase
        .from("services")
        .select("id, slug, name, description, category, service_plans (id, name, price)")
        .order("name", { ascending: true });
      setServices(data || []);
      setLoading(false);
    }
    fetchServices();
  }, []);

  const filtered = services.filter((service) =>
    service.name.toLowerCase().includes(search.toLowerCase()) ||
    (service.description || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center mb-6">
        <button
          onClick={() => router.push("/dashboard/services")}
          className="flex items-center text-gray-600 hover:text-gray-900 font-medium mr-4"
        >
          <ArrowLeft className="w-5 h-5 mr-1" />
          Back
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Add Service</h1>
          <p className="text-gray-500 text-sm mt-1">Choose a service template to add to your account</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search service categories..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full max-w-md px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 placeholder-gray-400 shadow-sm"
        />
      </div>

      {/* Service Templates Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-full text-center text-gray-400 py-12">Loading...</div>
        ) : filtered.length === 0 ? (
          <div className="col-span-full text-center text-gray-400 py-12">No service found.</div>
        ) : (
          filtered.map((service) => (
            <div
              key={service.id}
              className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 flex flex-col justify-between hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex items-center mb-4">
                <div className="bg-blue-50 rounded-lg p-2 mr-3">
                  <Cloud className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 leading-tight">{service.name}</h2>
                </div>
              </div>
              <div className="flex-1">
                <p className="text-gray-600 text-sm mb-4 min-h-[40px]">{service.description}</p>
                <p className="text-gray-500 text-xs mb-4">
                  Starts from{" "}
                  <span className="font-medium text-gray-900">
                    {service.service_plans && service.service_plans.length > 0
                      ? `Rp ${service.service_plans[0].price.toLocaleString()}/month`
                      : "-"}
                  </span>
                </p>
              </div>
              <button
                className="w-full flex items-center justify-center px-4 py-2 mt-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
                onClick={() => router.push(`/dashboard/services/deploy/${service.slug}`)}
              >
                <Cloud className="w-4 h-4 mr-2" />
                Deploy
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
} 