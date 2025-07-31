// Cara pakai:
// 1. Install supabase-js: npm install @supabase/supabase-js
// 2. Set env var SUPABASE_URL dan SUPABASE_SERVICE_ROLE_KEY (bukan anon key!)
// 3. Jalankan: npx ts-node src/scripts/seedSupabase.ts

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

async function seed() {
  // 1. Insert master services
  const { data: services, error: serviceError } = await supabase
    .from('services')
    .insert([
      { slug: 'waha-plus-cloud', name: 'WAHA Plus Cloud', description: 'WA API cloud', category: 'Communication' },
      { slug: 'n8n', name: 'n8n', description: 'Workflow automation', category: 'Automation' },
      { slug: 'go-whatsapp', name: 'Go WhatsApp', description: 'Go-based WhatsApp API', category: 'Communication' }
    ])
    .select();
  if (serviceError) console.error('Service error:', serviceError);

  // Ambil id service untuk relasi
  const wahaId = services?.find(s => s.slug === 'waha-plus-cloud')?.id;
  const n8nId = services?.find(s => s.slug === 'n8n')?.id;

  // 2. Insert service_plans (contoh untuk WAHA Plus Cloud & n8n)
  const { data: plans, error: planError } = await supabase
    .from('service_plans')
    .insert([
      { service_id: wahaId, name: 'WAHA Plus Cloud (512)', description: '512MB RAM, 0.5 CPU', cpu: 0.5, ram_mb: 512, price: 35000 },
      { service_id: wahaId, name: 'WAHA Plus Cloud (1G)', description: '1GB RAM, 1 CPU', cpu: 1, ram_mb: 1024, price: 60000 },
      { service_id: n8nId, name: 'n8n Basic', description: '0.5 CPU, 512MB RAM', cpu: 0.5, ram_mb: 512, price: 15000 }
    ])
    .select();
  if (planError) console.error('Plan error:', planError);

  // Ambil id plan untuk relasi
  const wahaPlanId = plans?.find(p => p.name === 'WAHA Plus Cloud (512)')?.id;

  // 3. Insert user_services (instance milik user, ganti user_id dengan UUID user Anda)
  const { data: userService, error: userServiceError } = await supabase
    .from('user_services')
    .insert([
      {
        user_id: '00000000-0000-0000-0000-000000000000', // Ganti dengan UUID user dari Supabase Auth
        service_id: wahaId,
        plan_id: wahaPlanId,
        name: 'WAHA Bot Customer',
        billing_cycle: 'monthly',
        status: 'active',
        auto_renewal: true,
        expiry_date: '2024-12-31'
      }
    ])
    .select();
  if (userServiceError) console.error('UserService error:', userServiceError);

  // Ambil id user_service untuk relasi
  const userServiceId = userService?.[0]?.id;

  // 4. Insert billing_history (contoh pembayaran)
  const { data: billing, error: billingError } = await supabase
    .from('billing_history')
    .insert([
      {
        user_service_id: userServiceId,
        amount: 35000,
        billing_cycle: 'monthly',
        status: 'paid'
      }
    ]);
  if (billingError) console.error('Billing error:', billingError);

  // Log hasil
  console.log({ services, plans, userService, billing });
}

seed(); 