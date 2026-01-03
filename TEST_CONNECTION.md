# Testing Backend Connection 🧪

## ✅ Your Setup is Already Connected!

The backend and frontend are already connected. Here's how to test it:

## 🎯 Quick Test Steps

### 1. Make Sure Backend is Running

Check your terminal - you should see:
```
🚀 Career Mantra AI Backend running on http://localhost:3001
📝 Registered users: 0
🤖 AI: Google Gemini Pro
```

If not running, start it:
```bash
cd backend
npm start
```

### 2. Open Your Browser

Go to: **http://localhost:5174**

### 3. Register/Login

Create an account or login

### 4. Test the AI Chat

1. Click **"AI Career Q&A Chat"** card
2. Type a question, for example:
   - "What skills do I need to become a data scientist?"
   - "How do I prepare for a software engineering interview?"
   - "What career path should I choose after graduation?"
3. Press **Enter** or click **Send**
4. Wait 2-5 seconds
5. You should see the AI response!

## 🔍 How It Works

### Frontend → Backend Connection

**File:** `frontend/src/components/ChatInterface.jsx`

```javascript
// Line 38-42
const response = await axios.post('/api/chat', {
  messages: [...messages, userMessage],
  systemPrompt: `You are Career Mantra AI...`
});
```

This sends your question to the backend.

### Backend → Gemini AI

**File:** `backend/server.js`

```javascript
// Line 108-127
app.post('/api/chat', async (req, res) => {
  const { messages, systemPrompt } = req.body;
  
  // Build prompt
  const prompt = `${systemPrompt}
  
  User: ${lastUserMessage.content}`;
  
  // Call Gemini AI
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  
  // Send back to frontend
  res.json({ message: text });
});
```

### Gemini AI → Response

Gemini processes your question and generates an intelligent answer about careers.

## 🧪 Test with Browser Console

1. Open browser console (F12)
2. Go to Network tab
3. Type a question in chat
4. You should see:
   - **Request:** POST to `/api/chat`
   - **Status:** 200 OK
   - **Response:** JSON with AI message

## 🔧 Troubleshooting

### If Chat Doesn't Work:

**1. Check Backend is Running**
```bash
# Should show backend running
curl http://localhost:3001/health
```

**2. Check Gemini API Key**
```bash
# In backend/.env
GEMINI_API_KEY=AIzaSyBqg4bKpHKcldwKTsCTFg5AowLRgWh57aU
```

**3. Check Browser Console**
- Press F12
- Look for errors in Console tab
- Check Network tab for failed requests

**4. Test Backend Directly**

Open PowerShell and test:
```powershell
$body = @{
    messages = @(
        @{
            role = "user"
            content = "Hello, what is data science?"
        }
    )
    systemPrompt = "You are a career coach."
} | ConvertTo-Json -Depth 10

Invoke-RestMethod -Uri "http://localhost:3001/api/chat" -Method Post -Body $body -ContentType "application/json"
```

You should get an AI response!

## ✅ Connection Checklist

- [ ] Backend running on port 3001
- [ ] Frontend running on port 5174
- [ ] Gemini API key in backend/.env
- [ ] Can access http://localhost:5174
- [ ] Can register/login
- [ ] Can see chat interface
- [ ] Can type and send messages
- [ ] Receive AI responses

## 📊 Expected Behavior

### When You Send a Message:

1. **Input box** - You type your question
2. **Send button** - Click or press Enter
3. **User message** - Appears in blue bubble on right
4. **Loading** - Spinning icon appears
5. **AI response** - Appears in white bubble on left (2-5 seconds)
6. **Chat history** - Both messages saved

### Example Conversation:

**You:** "What skills do I need for data science?"

**AI:** "For a career in data science, I recommend focusing on these key skills:

1. **Programming Languages:**
   - Python (essential for data manipulation and ML)
   - R (for statistical analysis)
   - SQL (for database queries)

2. **Mathematics & Statistics:**
   - Linear algebra
   - Probability and statistics
   - Calculus basics

3. **Machine Learning:**
   - Supervised learning algorithms
   - Unsupervised learning
   - Model evaluation

4. **Tools & Libraries:**
   - Pandas, NumPy (data manipulation)
   - Scikit-learn (machine learning)
   - Matplotlib, Seaborn (visualization)

5. **Soft Skills:**
   - Problem-solving
   - Communication
   - Business understanding

Start with Python and statistics, then gradually build your ML skills. Practice with real datasets on Kaggle!"

## 🎉 It's Already Working!

Your backend is **already connected** and **already generating Q&A responses**. Just:

1. Open the app
2. Go to chat
3. Ask a question
4. Get AI answer!

That's it! 🚀

## 📝 API Endpoint Details

### POST /api/chat

**Request:**
```json
{
  "messages": [
    {
      "role": "user",
      "content": "Your question here"
    }
  ],
  "systemPrompt": "You are Career Mantra AI..."
}
```

**Response:**
```json
{
  "message": "AI generated answer here..."
}
```

**Status Codes:**
- `200` - Success, AI response returned
- `500` - Error (API key missing or Gemini error)

## 🔗 All Connected Endpoints

1. **Chat:** `POST /api/chat` ✅
2. **Resume:** `POST /api/analyze-resume` ✅
3. **Roadmap:** `POST /api/generate-roadmap` ✅
4. **Register:** `POST /api/auth/register` ✅
5. **Login:** `POST /api/auth/login` ✅

All endpoints are connected and working!

---

**Your AI Q&A is ready to use!** Just open the app and start chatting! 💬
