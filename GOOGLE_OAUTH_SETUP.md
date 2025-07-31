# Setup Google OAuth untuk Supabase

## Langkah 1: Buat Google OAuth Credentials

1. Buka [Google Cloud Console](https://console.cloud.google.com/)
2. Buat project baru atau pilih project yang sudah ada
3. Aktifkan Google+ API:
   - Buka **APIs & Services** > **Library**
   - Cari "Google+ API" dan aktifkan
4. Buat OAuth 2.0 credentials:
   - Buka **APIs & Services** > **Credentials**
   - Klik **Create Credentials** > **OAuth 2.0 Client IDs**
   - Pilih **Web application**
   - Isi form:
     - **Name**: PodCoreX
     - **Authorized JavaScript origins**:
       - `http://localhost:3000`
       - `https://yourdomain.com` (untuk production)
     - **Authorized redirect URIs**:
       - `http://localhost:3000/auth/callback`
       - `https://yourdomain.com/auth/callback` (untuk production)
5. Copy **Client ID** dan **Client Secret**

## Langkah 2: Konfigurasi di Supabase Dashboard

1. Buka dashboard Supabase project Anda
2. Buka **Authentication** > **Providers**
3. Aktifkan **Google** provider
4. Isi form:
   - **Client ID**: (dari Google Cloud Console)
   - **Client Secret**: (dari Google Cloud Console)
   - **Redirect URL**: `https://your-project.supabase.co/auth/v1/callback`
5. Klik **Save**

## Langkah 3: Update Environment Variables

Tambahkan ke file `.env.local`:

```env
# Google OAuth (opsional)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

## Langkah 4: Test Google Sign In

Setelah setup selesai, user bisa sign in dengan Google melalui:
- Halaman `/sign-in` (akan ada tombol Google)
- API call langsung ke Supabase

## Troubleshooting

### Error "Invalid redirect URI"
- Pastikan redirect URI di Google Cloud Console sama dengan yang di Supabase
- Format: `https://your-project.supabase.co/auth/v1/callback`

### Error "Client ID not found"
- Pastikan Google+ API sudah diaktifkan
- Cek apakah Client ID dan Secret sudah benar

### Error "Domain not verified"
- Untuk production, verifikasi domain di Google Cloud Console
- Untuk development, gunakan localhost 