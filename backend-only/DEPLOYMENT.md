# Backend-only Payload/Express deploy için temel kurulum adımları:

1. Bu klasörü ayrı bir repo olarak GitHub'a yükleyin veya mevcut projenizde sadece backend deploy için kullanın.
2. Render veya başka bir Node.js hosting platformunda bu klasörü deploy edin.
3. Ortam değişkenlerini (.env veya platform panelinden) girin:
   - MONGODB_URI
   - PAYLOAD_SECRET
   - PORT (opsiyonel, default: 3001)
4. Build komutu: npm install
5. Start komutu: npm run start
6. Admin paneline erişim: https://<render-url>/admin
