"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft, Cloud, Zap } from "lucide-react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function DeployServicePage() {
  const router = useRouter();
  const params = useParams();
  const slug = params.service as string;

  const [service, setService] = useState<any>(null);
  const [plans, setPlans] = useState<any[]>([]);
  const [selectedPlanIdx, setSelectedPlanIdx] = useState(0);
  const [selectedBilling, setSelectedBilling] = useState("monthly");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      // Ambil service dan semua plannya
      const { data: services, error } = await supabase
        .from("services")
        .select("id, slug, name, description, service_plans (id, name, description, cpu, ram_mb, price)")
        .eq("slug", slug)
        .limit(1);
      if (services && services.length > 0) {
        setService(services[0]);
        setPlans(services[0].service_plans || []);
      }
      setLoading(false);
    }
    fetchData();
  }, [slug]);

  // Billing cycle options
  const billingCycles = [
    { key: "monthly", label: "Monthly", desc: "Billed monthly", multiplier: 1 },
    { key: "quarterly", label: "Quarterly", desc: "Billed every 3 months", multiplier: 3 },
    { key: "biannual", label: "Biannual", desc: "Billed every 6 months", multiplier: 6 },
    { key: "yearly", label: "Yearly", desc: "Billed annually", multiplier: 12 },
  ];

  const selectedPlan = plans[selectedPlanIdx];
  const selectedBillingObj = billingCycles.find(b => b.key === selectedBilling) || billingCycles[0];
  const cost = selectedPlan ? selectedPlan.price * selectedBillingObj.multiplier : 0;

  // Reset billing cycle jika ganti plan
  const handlePlanChange = (idx: number) => {
    setSelectedPlanIdx(idx);
    setSelectedBilling("monthly");
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <button
          onClick={() => router.push("/dashboard/services/create")}
          className="flex items-center text-gray-600 hover:text-gray-900 font-medium mr-4"
        >
          <ArrowLeft className="w-5 h-5 mr-1" />
          Back to Categories
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Deploy {service ? service.name : slug}</h1>
          <p className="text-gray-500 text-sm mt-1">Configure and deploy your service in seconds</p>
        </div>
      </div>
      {loading ? (
        <div className="text-center text-gray-400 py-12">Loading...</div>
      ) : !service ? (
        <div className="text-center text-gray-400 py-12">Service not found.</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Service Configuration */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-4">
              <h2 className="font-semibold text-gray-900 mb-3">Service Configuration</h2>
              <label className="block text-sm font-medium text-gray-700 mb-2">Service Name</label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 placeholder-gray-400"
                placeholder="Enter your service name"
              />
            </div>

            {/* Choose Template/Plan */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-4">
              <h2 className="font-semibold text-gray-900 mb-3">Choose Template</h2>
              <div className="space-y-4">
                {plans.map((plan, idx) => (
                  <label
                    key={plan.id}
                    className={`flex items-center p-4 border-2 rounded-xl transition-all duration-200 cursor-pointer min-h-[96px] ${selectedPlanIdx === idx ? 'bg-blue-50 border-blue-400' : 'bg-white border-gray-200 hover:border-gray-300'}`}
                  >
                    <div className="bg-blue-100 rounded-lg p-2 mr-4 flex-shrink-0">
                      <Cloud className="w-6 h-6 text-blue-500" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">{plan.name}</div>
                      <div className="text-sm mb-1 text-gray-600">{plan.description}</div>
                      <div className="flex items-center text-xs text-gray-500 space-x-4 mb-1">
                        <span>@ {plan.cpu} CPU</span>
                        <span>= {plan.ram_mb} MB RAM</span>
                      </div>
                      <div className="font-medium text-blue-700">Rp {plan.price.toLocaleString()}/month</div>
                    </div>
                    <input
                      type="radio"
                      name="plan"
                      checked={selectedPlanIdx === idx}
                      onChange={() => handlePlanChange(idx)}
                      className="ml-4 w-5 h-5 accent-blue-500"
                    />
                  </label>
                ))}
              </div>
            </div>

            {/* Choose Billing Cycle */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="font-semibold text-gray-900 mb-3">Choose Billing Cycle</h2>
              <div className="space-y-3">
                {billingCycles.map(billing => (
                  <label key={billing.key} className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-all duration-200 ${selectedBilling === billing.key ? 'bg-blue-50 border-blue-400' : 'bg-white border-gray-200 hover:border-gray-300'}`}>
                    <div>
                      <div className="font-medium text-gray-900">{billing.label}</div>
                      <div className="text-xs text-gray-500">{billing.desc}</div>
                    </div>
                    <div className="font-semibold text-gray-900">Rp {(selectedPlan ? (selectedPlan.price * billing.multiplier).toLocaleString() : 0)}{billing.key === 'yearly' ? '/year' : billing.key === 'quarterly' ? '/3 months' : billing.key === 'biannual' ? '/6 months' : '/month'}</div>
                    <input
                      type="radio"
                      name="billing"
                      value={billing.key}
                      checked={selectedBilling === billing.key}
                      onChange={() => setSelectedBilling(billing.key)}
                      className="ml-4 w-5 h-5 accent-blue-500"
                    />
                  </label>
                ))}
              </div>
            </div>
          </div>
          {/* Right: Summary */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-8">
              <h2 className="font-semibold text-gray-900 mb-4">Deployment Summary</h2>
              <div className="mb-2 text-sm text-gray-500">Service Type</div>
              <div className="mb-3 font-medium text-gray-900">{service.name}</div>
              <div className="mb-2 text-sm text-gray-500">Template</div>
              <div className="mb-3 font-semibold text-gray-900">{selectedPlan ? selectedPlan.name : '-'}</div>
              <div className="mb-2 text-sm text-gray-500">Billing Cycle</div>
              <div className="mb-3 font-medium text-gray-900">{selectedBillingObj.label}</div>
              <div className="flex items-center justify-between border-t pt-4 mt-4">
                <div className="font-medium text-gray-900">Cost</div>
                <div className="font-bold text-blue-700 text-lg">Rp {cost.toLocaleString()}{selectedBillingObj.key === 'yearly' ? '/year' : selectedBillingObj.key === 'quarterly' ? '/3 months' : selectedBillingObj.key === 'biannual' ? '/6 months' : '/month'}</div>
              </div>
              <button
                className={`w-full flex items-center justify-center px-4 py-3 mt-6 bg-blue-600 text-white font-semibold rounded-lg transition-colors duration-200 text-base hover:bg-blue-700`}
                onClick={() => alert('Service deployed!')}
              >
                <Zap className="w-5 h-5 mr-2" />
                Deploy Service
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 