# API Setup Guide

## Issue: Invalid Gemini API Key

Your API is not working because the Gemini API key is invalid or expired.

## How to Fix:

### 1. Get a Valid Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated API key

### 2. Update Your Environment File

1. Open `backend/.env`
2. Replace `YOUR_VALID_GEMINI_API_KEY_HERE` with your actual API key:
   ```
   GEMINI_API_KEY=your_actual_api_key_here
   PORT=3001
   JWT_SECRET=career-mantra-ai-secret-key-2024-change-in-production
   ```

### 3. Restart Your Backend Server

```bash
cd backend
npm run dev
```

### 4. Test the API

The API should now work properly. You can test it by:
- Using the chat feature in your frontend
- Visiting `http://localhost:3001/health` to check server status

## What Was Fixed:

1. ✅ Updated Gemini model from `gemini-2.5-flash` to `gemini-1.5-flash`
2. ✅ Added proper API key validation
3. ✅ Improved error messages for debugging
4. ✅ Added configuration checks

## Next Steps:

After getting your API key, your Career Mantra AI application will be fully functional with:
- Chat functionality
- Resume analysis
- Career roadmap generation
- User authentication