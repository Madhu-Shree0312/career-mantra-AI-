# Career Mantra AI - Deployment Guide 🚀

## 🌐 Deployment Options

### Option 1: Vercel (Frontend) + Railway (Backend) ⭐ Recommended

#### Frontend Deployment (Vercel)

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit - Career Mantra AI"
git branch -M main
git remote add origin your-repo-url
git push -u origin main
```

2. **Deploy to Vercel**
- Go to [vercel.com](https://vercel.com)
- Click "New Project"
- Import your GitHub repository
- Select `frontend` as root directory
- Click "Deploy"

3. **Configure Environment**
- No environment variables needed for frontend
- Vercel will auto-detect Vite

#### Backend Deployment (Railway)

1. **Deploy to Railway**
- Go to [railway.app](https://railway.app)
- Click "New Project"
- Select "Deploy from GitHub repo"
- Choose your repository
- Select `backend` as root directory

2. **Add Environment Variables**
```
OPENAI_API_KEY=your_openai_api_key
PORT=3001
JWT_SECRET=your-production-secret-key
```

3. **Configure Build**
- Start Command: `node server.js`
- Build Command: `npm install`

4. **Get Backend URL**
- Copy your Railway backend URL (e.g., `https://your-app.railway.app`)

5. **Update Frontend**
- In `frontend/vite.config.js`, update proxy target:
```javascript
server: {
  proxy: {
    '/api': {
      target: 'https://your-app.railway.app',
      changeOrigin: true
    }
  }
}
```

### Option 2: Netlify (Frontend) + Render (Backend)

#### Frontend (Netlify)

1. **Deploy to Netlify**
- Go to [netlify.com](https://netlify.com)
- Drag and drop `frontend/dist` folder
- Or connect GitHub repo

2. **Build Settings**
```
Base directory: frontend
Build command: npm run build
Publish directory: frontend/dist
```

#### Backend (Render)

1. **Deploy to Render**
- Go to [render.com](https://render.com)
- Click "New Web Service"
- Connect GitHub repo
- Select `backend` directory

2. **Settings**
```
Environment: Node
Build Command: npm install
Start Command: node server.js
```

3. **Environment Variables**
```
OPENAI_API_KEY=your_key
PORT=3001
JWT_SECRET=your_secret
```

### Option 3: Heroku (Full Stack)

#### Prepare for Heroku

1. **Create Procfile** in root:
```
web: cd backend && node server.js
```

2. **Update package.json** in root:
```json
{
  "scripts": {
    "start": "cd backend && node server.js",
    "build": "cd frontend && npm install && npm run build"
  }
}
```

3. **Deploy**
```bash
heroku create career-mantra-ai
heroku config:set OPENAI_API_KEY=your_key
heroku config:set JWT_SECRET=your_secret
git push heroku main
```

### Option 4: DigitalOcean App Platform

1. **Create App**
- Go to DigitalOcean
- Click "Create App"
- Connect GitHub repo

2. **Configure Components**

**Frontend:**
```
Type: Static Site
Build Command: npm run build
Output Directory: dist
```

**Backend:**
```
Type: Web Service
Build Command: npm install
Run Command: node server.js
```

3. **Environment Variables**
```
OPENAI_API_KEY=your_key
JWT_SECRET=your_secret
```

## 🔧 Pre-Deployment Checklist

### Code Preparation
- [ ] Remove console.logs
- [ ] Update API URLs for production
- [ ] Set strong JWT_SECRET
- [ ] Enable HTTPS
- [ ] Add rate limiting
- [ ] Optimize images
- [ ] Minify code

### Security
- [ ] Change default JWT_SECRET
- [ ] Use environment variables
- [ ] Enable CORS properly
- [ ] Add rate limiting
- [ ] Implement input validation
- [ ] Use HTTPS only
- [ ] Secure cookies

### Performance
- [ ] Enable gzip compression
- [ ] Add caching headers
- [ ] Optimize bundle size
- [ ] Lazy load components
- [ ] Use CDN for assets
- [ ] Minify CSS/JS

### Database (Optional)
- [ ] Set up MongoDB Atlas
- [ ] Configure connection string
- [ ] Add database models
- [ ] Implement data persistence

## 🗄️ Adding Database (MongoDB)

### 1. Setup MongoDB Atlas

```bash
npm install mongoose
```

### 2. Create User Model

```javascript
// backend/models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('User', userSchema);
```

### 3. Connect to Database

```javascript
// backend/server.js
import mongoose from 'mongoose';

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
```

### 4. Update Environment Variables

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/career-mantra
```

## 🔐 Production Security

### 1. Environment Variables

**Never commit:**
- `.env` files
- API keys
- Secrets

**Always use:**
- Environment variables
- Secret management services
- Encrypted storage

### 2. HTTPS Configuration

```javascript
// backend/server.js
import https from 'https';
import fs from 'fs';

const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

https.createServer(options, app).listen(443);
```

### 3. Rate Limiting

```bash
npm install express-rate-limit
```

```javascript
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

### 4. Helmet for Security Headers

```bash
npm install helmet
```

```javascript
import helmet from 'helmet';
app.use(helmet());
```

## 📊 Monitoring & Analytics

### 1. Error Tracking (Sentry)

```bash
npm install @sentry/node
```

```javascript
import * as Sentry from '@sentry/node';

Sentry.init({
  dsn: process.env.SENTRY_DSN
});
```

### 2. Analytics (Google Analytics)

Add to `frontend/index.html`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
```

### 3. Uptime Monitoring

Use services like:
- UptimeRobot
- Pingdom
- StatusCake

## 🚀 CI/CD Pipeline

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
    
    - name: Install dependencies
      run: |
        cd frontend && npm install
        cd ../backend && npm install
    
    - name: Build frontend
      run: cd frontend && npm run build
    
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v20
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.ORG_ID }}
        vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## 🌍 Custom Domain

### 1. Purchase Domain
- Namecheap
- GoDaddy
- Google Domains

### 2. Configure DNS

**For Vercel:**
```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

**For Railway:**
```
Type: CNAME
Name: api
Value: your-app.railway.app
```

### 3. Update CORS

```javascript
app.use(cors({
  origin: ['https://careermantra.ai', 'https://www.careermantra.ai'],
  credentials: true
}));
```

## 📱 PWA Configuration (Optional)

### 1. Add Manifest

Create `frontend/public/manifest.json`:
```json
{
  "name": "Career Mantra AI",
  "short_name": "Career Mantra",
  "description": "Your Intelligent Career Companion",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#1a1a2e",
  "theme_color": "#3b82f6",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

### 2. Add Service Worker

```javascript
// frontend/public/sw.js
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('career-mantra-v1').then((cache) => {
      return cache.addAll([
        '/',
        '/index.html',
        '/src/main.jsx'
      ]);
    })
  );
});
```

## 🎯 Post-Deployment

### 1. Test Everything
- [ ] Login/Register
- [ ] All AI tools
- [ ] Mobile responsiveness
- [ ] API endpoints
- [ ] Error handling

### 2. Monitor Performance
- [ ] Page load times
- [ ] API response times
- [ ] Error rates
- [ ] User analytics

### 3. Gather Feedback
- [ ] User testing
- [ ] Bug reports
- [ ] Feature requests
- [ ] Performance issues

## 📈 Scaling Considerations

### When to Scale
- More than 1000 daily users
- Slow response times
- High API costs
- Database bottlenecks

### How to Scale
1. **Caching**: Redis for session storage
2. **CDN**: CloudFlare for static assets
3. **Load Balancing**: Multiple backend instances
4. **Database**: Read replicas
5. **API**: Rate limiting and queuing

## 💰 Cost Estimates

### Free Tier (0-100 users)
- Frontend: Free (Vercel/Netlify)
- Backend: Free (Railway/Render)
- Database: Free (MongoDB Atlas)
- OpenAI: ~$10/month
- **Total: ~$10/month**

### Small Scale (100-1000 users)
- Frontend: Free
- Backend: $5-10/month
- Database: Free
- OpenAI: ~$50/month
- **Total: ~$60/month**

### Medium Scale (1000-10000 users)
- Frontend: $20/month
- Backend: $25/month
- Database: $10/month
- OpenAI: ~$200/month
- **Total: ~$255/month**

## 🎉 Deployment Complete!

Your Career Mantra AI is now live and ready to help students! 🚀

### Share Your App
- 🌐 Website: https://your-domain.com
- 📱 Mobile: Works on all devices
- 🔗 Share: Social media, portfolio, resume

---

**Congratulations on deploying Career Mantra AI!** 🎊
