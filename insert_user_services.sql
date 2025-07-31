-- Insert contoh data user_services
-- Pastikan user_id, service_id, dan plan_id sesuai dengan data yang ada di database

-- Contoh untuk user dengan ID tertentu (ganti dengan user_id yang sebenarnya)
INSERT INTO user_services (user_id, service_id, plan_id, status, auto_renewal, created_at, expires_at) VALUES
-- User service untuk n8n
('<<user_id_anda>>', 1, 1, 'active', true, NOW(), NOW() + INTERVAL '30 days'),

-- User service untuk Activepieces  
('<<user_id_anda>>', 2, 3, 'active', true, NOW(), NOW() + INTERVAL '15 days'),

-- User service untuk WAHA Plus Cloud
('<<user_id_anda>>', 3, 5, 'inactive', false, NOW(), NOW() - INTERVAL '5 days'),

-- User service untuk Flowise
('<<user_id_anda>>', 4, 7, 'active', true, NOW(), NOW() + INTERVAL '45 days'),

-- User service untuk Go WhatsApp
('<<user_id_anda>>', 5, 9, 'pending', true, NOW(), NOW() + INTERVAL '7 days');

-- Catatan: 
-- 1. Ganti <<user_id_anda>> dengan user_id yang sebenarnya dari tabel auth.users
-- 2. Pastikan service_id dan plan_id sesuai dengan data di tabel services dan service_plans
-- 3. Status bisa: 'active', 'inactive', 'pending'
-- 4. auto_renewal: true/false
-- 5. expires_at: tanggal kadaluarsa service 