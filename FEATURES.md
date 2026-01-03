# Career Mantra AI - Features Documentation

## 🎨 Visual Design System

### Color Palette
```
Primary Gradient: Blue (#3B82F6) → Purple (#9333EA)
Secondary Gradient: Orange (#F97316) → Red (#EF4444)
Accent Colors: Pink (#EC4899), Cyan (#06B6D4), Green (#10B981)
Background: Dark gradients (Gray-900, Purple-900, Blue-900)
Text: White with opacity variants (100%, 90%, 80%, 70%, 60%, 50%)
```

### Typography
- **Headings**: Bold, 2xl-6xl sizes
- **Body**: Regular, sm-base sizes
- **Labels**: Medium weight, sm size
- **Font**: System fonts (San Francisco, Segoe UI, Roboto)

### Spacing
- **Padding**: 4px, 8px, 12px, 16px, 24px, 32px
- **Gaps**: 8px, 12px, 16px, 24px
- **Rounded Corners**: 8px (lg), 12px (xl), 16px (2xl)

## 🔐 Authentication System

### Login Page Features
✅ **Email/Password Login**
- Email validation
- Password visibility toggle
- Remember me checkbox
- Error handling with user-friendly messages

✅ **Registration**
- Name, email, password fields
- Password strength validation
- Duplicate email detection
- Automatic login after registration

✅ **UI Elements**
- Animated background blobs
- Floating logo animation
- Glassmorphism card design
- Smooth tab switching (Login/Sign Up)
- Gradient buttons with hover effects

### Security
- bcrypt password hashing (10 rounds)
- JWT tokens (7-day expiration)
- Protected API routes
- Token validation middleware

## 📊 Dashboard

### Layout
```
┌─────────────────────────────────────┐
│  Welcome Message + User Name        │
│  "Your AI Career Tools"             │
├─────────────────────────────────────┤
│  [Stats: Conversations | Resumes |  │
│         Career Paths]               │
├─────────────────────────────────────┤
│  ┌──────┐  ┌──────┐  ┌──────┐     │
│  │ Chat │  │Resume│  │Roadmap│     │
│  │  AI  │  │  AI  │  │  AI   │     │
│  └──────┘  └──────┘  └──────┘     │
├─────────────────────────────────────┤
│  Bottom CTA: "Ready to Transform    │
│  Your Career?"                      │
└─────────────────────────────────────┘
```

### Tool Cards
Each card includes:
- **Icon**: Gradient background with tool icon
- **Title**: Bold, descriptive name
- **Description**: Brief explanation
- **Features**: 3 bullet points
- **Hover Effect**: Scale up, gradient overlay, arrow animation

### Responsive Behavior
- **Desktop**: 3 columns
- **Tablet**: 2 columns
- **Mobile**: 1 column (stacked)

## 💬 AI Career Q&A Chat

### Interface Components

#### Welcome Screen
- Large sparkle icon
- Welcome message
- 6 Quick Action Cards:
  1. Resume Review (Blue)
  2. Interview Prep (Purple)
  3. Career Transition (Pink)
  4. Skill Development (Green)
  5. Job Search Strategy (Orange)
  6. Career Goals (Indigo)

#### Chat Interface
```
┌─────────────────────────────────────┐
│  [Bot Avatar] AI Message            │
│  ┌─────────────────────────────┐   │
│  │ AI response text...         │   │
│  └─────────────────────────────┘   │
│                                     │
│           User Message [User Avatar]│
│   ┌─────────────────────────────┐  │
│   │ User question text...       │  │
│   └─────────────────────────────┘  │
├─────────────────────────────────────┤
│  [Input Field]  [Send Button]      │
└─────────────────────────────────────┘
```

#### Features
- Real-time AI responses
- Message history with timestamps
- Session management
- Auto-scroll to latest message
- Loading indicator
- Error handling

#### Quick Actions
- Pre-written prompts for common queries
- Click to populate input field
- Color-coded by category
- Hover animations

## 📝 AI Resume Analyzer

### Input Section
```
┌─────────────────────────────────────┐
│  [Icon] AI Resume Analyzer          │
│  Description text                   │
├─────────────────────────────────────┤
│  Resume Content                     │
│  ┌─────────────────────────────┐   │
│  │                             │   │
│  │  [Paste resume text here]  │   │
│  │                             │   │
│  └─────────────────────────────┘   │
│                                     │
│  [Analyze Resume Button]            │
└─────────────────────────────────────┘
```

### Results Layout
```
┌──────────────────┬──────────────┐
│  Detailed        │  Score       │
│  Analysis        │  ┌────────┐  │
│  ┌────────────┐  │  │   85   │  │
│  │ AI feedback│  │  └────────┘  │
│  │ on resume  │  │              │
│  └────────────┘  │  Quick Tips  │
│                  │  • Tip 1     │
│  Suggestions     │  • Tip 2     │
│  ┌────────────┐  │  • Tip 3     │
│  │ Improvement│  │  • Tip 4     │
│  │ tips       │  │              │
│  └────────────┘  │              │
└──────────────────┴──────────────┘
```

### Analysis Output
- **Score**: 0-100 with circular progress indicator
- **Analysis**: Detailed strengths and weaknesses
- **Suggestions**: Specific improvements
- **Quick Tips**: General resume best practices

### Responsive Design
- **Desktop**: 2-column layout (analysis + sidebar)
- **Tablet**: 2-column layout (narrower)
- **Mobile**: 1-column (stacked)

## 🗺️ Career Roadmap Generator

### Input Form
```
┌─────────────────────────────────────┐
│  [Icon] Career Roadmap Generator    │
│  Description text                   │
├─────────────────────────────────────┤
│  Current Role *    │ Target Role *  │
│  [Input field]     │ [Input field]  │
├────────────────────┼────────────────┤
│  Experience        │ Current Skills │
│  [Input field]     │ [Input field]  │
├─────────────────────────────────────┤
│  [Generate Career Roadmap Button]   │
└─────────────────────────────────────┘
```

### Roadmap Display
```
┌─────────────────────────────────────┐
│  Your Career Journey                │
│  From [Current] to [Target]         │
├─────────────────────────────────────┤
│  Roadmap Steps                      │
│  ┌─┐                                │
│  │1│ Step 1 Title                   │
│  └┬┘ Description                    │
│   │  ✓ Action 1                     │
│   │  ✓ Action 2                     │
│  ┌┴┐                                │
│  │2│ Step 2 Title                   │
│  └┬┘ Description                    │
│   │  ✓ Action 1                     │
│   │  ✓ Action 2                     │
│  ┌┴┐                                │
│  │3│ Step 3 Title                   │
│  └─┘ Description                    │
│      ✓ Action 1                     │
│      ✓ Action 2                     │
├─────────────────────────────────────┤
│  Estimated Timeline                 │
│  [Timeline text]                    │
├─────────────────────────────────────┤
│  Recommended Resources              │
│  [Resources text]                   │
└─────────────────────────────────────┘
```

### Features
- Step-by-step progression
- Numbered steps with visual timeline
- Actionable items for each step
- Estimated timeline
- Learning resources
- Responsive layout

## 🎯 Sidebar Navigation

### Desktop Sidebar
```
┌─────────────────────┐
│ [Logo] Career       │
│        Mantra AI    │
├─────────────────────┤
│ [Avatar] User Name  │
│          Email      │
├─────────────────────┤
│ [Home] Dashboard    │
│ [+] New Chat        │
├─────────────────────┤
│ Recent Chats        │
│ • Chat 1            │
│ • Chat 2            │
│ • Chat 3            │
├─────────────────────┤
│ AI Features:        │
│ • Career Q&A        │
│ • Resume Analysis   │
│ • Career Roadmaps   │
├─────────────────────┤
│ [Logout] Logout     │
└─────────────────────┘
```

### Mobile Sidebar
- Hamburger menu button (☰)
- Slide-in from left
- Overlay background
- Same content as desktop
- Touch-friendly buttons

## 📱 Responsive Features

### Breakpoints
- **sm**: 640px
- **md**: 768px
- **lg**: 1024px
- **xl**: 1280px
- **2xl**: 1536px

### Mobile Optimizations
- Collapsible sidebar
- Stacked layouts
- Larger touch targets (min 44x44px)
- Simplified navigation
- Optimized font sizes
- Reduced animations for performance

### Tablet Optimizations
- 2-column layouts
- Balanced spacing
- Adaptive navigation
- Medium-sized components

### Desktop Optimizations
- 3-column layouts
- Full sidebar always visible
- Hover effects
- Larger content areas
- Multi-column forms

## 🎭 Animations

### Background Animations
```css
@keyframes blob {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
}
```

### Logo Animation
```css
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
```

### Card Hover Effects
- Scale: 1.0 → 1.05
- Translate Y: 0 → -8px
- Shadow: sm → 2xl
- Gradient overlay: 0% → 100% opacity

### Button Animations
- Hover: Scale 1.0 → 1.02
- Active: Scale 1.0 → 0.98
- Loading: Spin animation

## 🔔 User Feedback

### Loading States
- Spinner icons
- "Analyzing..." text
- "Generating..." text
- Disabled buttons
- Reduced opacity

### Error States
- Red background with border
- Error icon
- Clear error message
- Retry suggestions

### Success States
- Green checkmarks
- Success messages
- Smooth transitions
- Confirmation feedback

## 🎨 Glassmorphism Effects

### Properties
```css
background: rgba(255, 255, 255, 0.1);
backdrop-filter: blur(10px);
border: 1px solid rgba(255, 255, 255, 0.2);
```

### Usage
- Cards
- Sidebar
- Header
- Input fields
- Modals
- Overlays

## 🚀 Performance

### Optimizations
- Lazy loading components
- Memoized callbacks
- Debounced inputs
- Optimized re-renders
- CSS animations (GPU accelerated)
- Minimal bundle size
- Code splitting

### Loading Times
- Initial load: < 2s
- Page transitions: < 300ms
- API responses: 1-3s (depends on OpenAI)
- Animation duration: 150-300ms

---

**Career Mantra AI** - Thoughtfully designed for the best user experience! ✨
