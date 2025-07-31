# Cache Troubleshooting Guide

## Masalah yang Sering Terjadi

### 1. Webpack Cache Error
```
[webpack.cache.PackFileCacheStrategy] Caching failed for pack: Error: ENOENT: no such file or directory
```

### 2. File Not Found Error
```
GET /_next/static/chunks/app/(site)/layout.js 404
GET /_next/static/chunks/main-app.js 404
```

### 3. Development Server Hang
- Server tidak merespons
- Hot reload tidak berfungsi
- Port sudah digunakan

## Solusi Lengkap

### Langkah 1: Kill Process
```bash
# Kill semua process Next.js
pkill -f "next dev"
pkill -f "next start"

# Atau kill process di port tertentu
lsof -ti:3000 | xargs kill -9
lsof -ti:3001 | xargs kill -9
```

### Langkah 2: Clear Cache
```bash
# Hapus cache Next.js
rm -rf .next

# Hapus cache node_modules
rm -rf node_modules/.cache

# Hapus cache browser (opsional)
# Buka browser developer tools > Application > Clear Storage
```

### Langkah 3: Reinstall Dependencies (Jika Perlu)
```bash
# Hapus node_modules
rm -rf node_modules
rm package-lock.json

# Install ulang
npm install
```

### Langkah 4: Build Fresh
```bash
# Build production untuk test
npm run build

# Jika build berhasil, jalankan dev server
npm run dev
```

## Troubleshooting Berdasarkan Error

### Error: "Caching failed for pack"
**Penyebab:** Cache webpack corrupt
**Solusi:**
```bash
rm -rf .next
npm run dev
```

### Error: "File not found"
**Penyebab:** File belum di-build atau cache corrupt
**Solusi:**
```bash
rm -rf .next
npm run build
npm run dev
```

### Error: "Port already in use"
**Penyebab:** Process lama masih berjalan
**Solusi:**
```bash
lsof -ti:3000 | xargs kill -9
npm run dev
```

### Error: "Module not found"
**Penyebab:** Import path salah atau file hilang
**Solusi:**
```bash
npm install
npm run build
```

## Prevention Tips

### 1. Regular Cleanup
```bash
# Setiap minggu, jalankan:
rm -rf .next
npm run dev
```

### 2. Use Different Ports
```bash
# Jika port 3000 bermasalah
npm run dev -- -p 3001
```

### 3. Monitor File Changes
- Pastikan tidak ada file yang terhapus
- Cek git status untuk file yang berubah
- Backup file penting sebelum cleanup

### 4. Environment Variables
```bash
# Pastikan .env.local ada
ls -la .env.local

# Jika tidak ada, buat ulang
cp env.template .env.local
```

## Advanced Troubleshooting

### Jika Masih Bermasalah

#### 1. Check Node Version
```bash
node --version
npm --version
```

#### 2. Clear Global Cache
```bash
npm cache clean --force
```

#### 3. Reset Next.js
```bash
rm -rf .next
rm -rf node_modules
npm install
npm run dev
```

#### 4. Check Disk Space
```bash
df -h
```

### Debug Mode
```bash
# Jalankan dengan debug info
DEBUG=* npm run dev
```

## Common Commands

```bash
# Quick fix
rm -rf .next && npm run dev

# Full reset
rm -rf .next node_modules package-lock.json && npm install && npm run dev

# Build test
npm run build && npm start

# Port check
lsof -i :3000
```

## Warning Signs

### Perhatikan Jika:
- Build time terlalu lama (>2 menit)
- Memory usage tinggi
- Hot reload tidak berfungsi
- File changes tidak terdeteksi

### Solusi:
1. Restart development server
2. Clear cache
3. Check file watchers
4. Monitor system resources

## Production Deployment

### Untuk Production:
```bash
# Build production
npm run build

# Test production build
npm start

# Deploy dengan fresh cache
rm -rf .next
npm run build
```

## Monitoring

### Tools yang Berguna:
- **htop** - Monitor system resources
- **lsof** - Check port usage
- **du -sh .next** - Check cache size
- **npm ls** - Check dependencies

### Logs:
- Check terminal output untuk error
- Browser console untuk client-side errors
- Network tab untuk failed requests

## Best Practices

### 1. Regular Maintenance
- Clear cache setiap minggu
- Update dependencies secara berkala
- Monitor disk space

### 2. Development Workflow
- Gunakan git untuk version control
- Backup file penting
- Test build sebelum commit

### 3. Environment Management
- Gunakan .env.local untuk development
- Jangan commit .env files
- Document environment variables

## Emergency Recovery

### Jika Semua Gagal:
```bash
# 1. Backup project
cp -r . ../backup-project

# 2. Fresh clone
cd ..
rm -rf saasbold-lite
git clone <repository-url>
cd saasbold-lite

# 3. Setup ulang
npm install
cp ../backup-project/.env.local .
npm run dev
```

Cache issues sudah umum di Next.js, tapi dengan panduan ini seharusnya bisa diatasi dengan mudah! 🚀 