# Troubleshooting Guide

## Error: "Cannot read properties of undefined (reading 'clientModules')"

### Penyebab
Error ini biasanya terjadi karena:
1. Cache Next.js yang corrupt
2. Konfigurasi webpack yang bermasalah
3. Module yang tidak ter-load dengan benar

### Solusi

#### 1. Clear Cache
```bash
# Hapus cache Next.js
rm -rf .next

# Hapus cache node_modules
rm -rf node_modules/.cache

# Restart development server
npm run dev
```

#### 2. Reinstall Dependencies
```bash
# Hapus node_modules
rm -rf node_modules
rm package-lock.json

# Install ulang
npm install
```

#### 3. Update Next.js Config
Pastikan `next.config.js` sudah benar:

```javascript
/** @type {import('next').NextConfig} */

const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "lh3.googleusercontent.com",
				port: "",
			},
			// ... other patterns
		],
	},
	webpack: (config, { isServer }) => {
		if (!isServer) {
			config.resolve.fallback = {
				...config.resolve.fallback,
				fs: false,
			};
		}
		return config;
	},
};

module.exports = nextConfig;
```

## Error: "Module not found"

### Penyebab
- Import path yang salah
- File yang tidak ada
- Dependencies yang belum diinstall

### Solusi
```bash
# Cek apakah semua dependencies terinstall
npm install

# Build untuk melihat error detail
npm run build
```

## Error: "Port already in use"

### Solusi
```bash
# Kill process yang menggunakan port 3000
lsof -ti:3000 | xargs kill -9

# Atau gunakan port lain
npm run dev -- -p 3001
```

## Error: "Environment variables not found"

### Solusi
1. Pastikan file `.env.local` ada di root project
2. Restart development server setelah mengubah environment variables
3. Cek apakah variable names sudah benar

## Error: "Supabase connection failed"

### Solusi
1. Cek environment variables di `.env.local`
2. Pastikan Supabase project aktif
3. Cek network connection
4. Restart development server

## Error: "Google OAuth not working"

### Solusi
1. Pastikan Google provider sudah diaktifkan di Supabase
2. Cek Client ID dan Secret sudah benar
3. Pastikan redirect URI sudah sesuai
4. Cek domain verification di Google Cloud Console

## Performance Issues

### Solusi
```bash
# Clear cache
rm -rf .next

# Build production untuk test performance
npm run build
npm start
```

## Development Best Practices

### 1. Regular Cleanup
```bash
# Setiap minggu, jalankan:
rm -rf .next
npm install
npm run dev
```

### 2. Check Dependencies
```bash
# Update dependencies secara berkala
npm update

# Cek security vulnerabilities
npm audit
```

### 3. Environment Management
- Gunakan `.env.local` untuk development
- Jangan commit `.env.local` ke git
- Gunakan environment variables di production

## Common Commands

```bash
# Development
npm run dev

# Build
npm run build

# Production
npm start

# Lint
npm run check-lint

# Format
npm run fix-format
```

## Still Having Issues?

Jika masih ada error:

1. **Check logs** di terminal development
2. **Check browser console** untuk error JavaScript
3. **Check Network tab** di browser developer tools
4. **Restart development server** dengan `Ctrl+C` lalu `npm run dev`
5. **Clear browser cache** dan hard refresh

## Contact Support

Jika error masih berlanjut:
1. Screenshot error message
2. Copy log dari terminal
3. Cek versi Node.js dan npm
4. Cek sistem operasi dan browser 