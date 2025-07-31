# Setup Supabase untuk PodCoreX

## Langkah-langkah Setup

### 1. Buat Proyek Supabase

1. Kunjungi [supabase.com](https://supabase.com)
2. Buat akun atau login
3. Buat proyek baru
4. Pilih region yang terdekat (misalnya Singapore untuk Indonesia)
5. Tunggu hingga proyek selesai dibuat

### 2. Dapatkan Environment Variables

Setelah proyek dibuat, dapatkan environment variables dari:
- **Settings** > **API**
- Copy **Project URL** dan **anon public** key

### 3. Setup Environment Variables

Buat file `.env.local` di root proyek dengan isi:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### 4. Setup Database Schema

1. Buka **SQL Editor** di dashboard Supabase
2. Copy dan paste isi dari file `supabase/schema.sql`
3. Jalankan query untuk membuat tabel dan policies

### 5. Konfigurasi Authentication

1. Buka **Authentication** > **Settings**
2. Aktifkan **Email confirmations** jika diperlukan
3. Atur **Site URL** ke domain Anda
4. Tambahkan redirect URLs:
   - `http://localhost:3000/auth/callback`
   - `https://yourdomain.com/auth/callback`

### 6. Test Aplikasi

1. Jalankan aplikasi: `npm run dev`
2. Coba daftar akun baru di `/sign-up`
3. Coba login di `/sign-in`
4. Pastikan redirect ke dashboard berfungsi

## Fitur yang Tersedia

- ✅ Email/Password Authentication
- ✅ Session Management
- ✅ Protected Routes
- ✅ User Profiles
- ✅ Row Level Security (RLS)
- ✅ Auto-generated user profiles

## Troubleshooting

### Error "Invalid API key"
- Pastikan environment variables sudah benar
- Restart development server setelah mengubah .env

### Error "Email not confirmed"
- Cek folder spam untuk email konfirmasi
- Atau disable email confirmation di Supabase dashboard

### Error "Invalid redirect URL"
- Pastikan redirect URL sudah ditambahkan di Supabase dashboard
- Gunakan URL yang benar (localhost untuk development)

## Next Steps

Setelah setup selesai, Anda bisa:

1. Menambahkan fitur social login (Google, GitHub, dll)
2. Menambahkan tabel tambahan sesuai kebutuhan
3. Mengintegrasikan dengan fitur lain seperti billing, notifications, dll
4. Setup production environment 