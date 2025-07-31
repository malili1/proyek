# Setup Environment Variables

## Langkah 1: Buat file .env.local

Buat file `.env.local` di root project dengan isi berikut:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Next.js Secret Key (untuk JWT signing)
NEXTAUTH_SECRET=yq/TIx0GEAjyVL3BGkeRRXAE0KQm1gqIml+yGwri4es=
NEXTAUTH_URL=http://localhost:3000

# Database URL (jika menggunakan Prisma)
DATABASE_URL=your_database_url_here

# Stripe Configuration (jika menggunakan Stripe)
STRIPE_SECRET_KEY=your_stripe_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
```

## Langkah 2: Dapatkan Supabase Credentials

1. Buka [supabase.com](https://supabase.com)
2. Login ke dashboard
3. Pilih project Anda
4. Buka **Settings** > **API**
5. Copy nilai berikut:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role secret** → `SUPABASE_SERVICE_ROLE_KEY`

## Langkah 3: Update .env.local

Ganti nilai-nilai berikut di file `.env.local`:

```env
# Contoh (ganti dengan nilai asli dari Supabase)
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Langkah 4: Secret Key

Secret key sudah di-generate secara otomatis:
- `NEXTAUTH_SECRET=yq/TIx0GEAjyVL3BGkeRRXAE0KQm1gqIml+yGwri4es=`

**Jangan share secret key ini ke publik!**

## Langkah 5: Test Konfigurasi

Setelah setup selesai, jalankan:

```bash
npm run dev
```

Aplikasi seharusnya berjalan tanpa error.

## Catatan Penting

- File `.env.local` sudah ada di `.gitignore`, jadi tidak akan masuk ke git
- Jangan commit file `.env.local` ke repository
- Untuk production, gunakan environment variables di hosting platform (Vercel, Netlify, dll)
- Secret key yang di-generate sudah aman dan unik untuk project ini

## Troubleshooting

Jika ada error "Invalid API key":
1. Pastikan URL dan key Supabase sudah benar
2. Restart development server setelah mengubah .env.local
3. Cek apakah project Supabase sudah aktif

Jika ada error "Secret key required":
1. Pastikan `NEXTAUTH_SECRET` sudah diisi
2. Restart development server 