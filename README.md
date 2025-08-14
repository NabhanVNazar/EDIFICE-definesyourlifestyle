# EDIFICE - AI-Powered Home Design Application

EDIFICE is a comprehensive, AI-powered home design application that makes professional home design accessible to everyone. No CAD or architectural experience needed!

## 🏠 Features

### Core Workflow
- **User Input Stage**: Collect plot details and requirements
- **AI Blueprint Generation**: Automatic 2D floor plan creation
- **Interactive 2D Editor**: Drag-and-drop editing with professional tools
- **3D Visualization**: Immersive walkthrough and orbit views
- **Elevation Design**: AI-suggested exterior styles
- **Export & Share**: Professional files and shareable links

### Advanced Features
- **AI Assistant**: Always-on guidance throughout the design process
- **Real-time Collaboration**: Share designs with family and contractors
- **Cost Estimation**: Automatic material and construction cost calculations
- **Project Management**: Save, load, and manage multiple projects
- **Professional Export**: PDF, CAD files, and high-resolution images

## 🚀 Technology Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS + Framer Motion
- **2D Editor**: Fabric.js for interactive canvas
- **3D Visualization**: Three.js + React Three Fiber
- **Backend**: Supabase (Database + Authentication)
- **State Management**: Zustand with persistence
- **Build Tool**: Vite for fast development

## 🛠️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd edifice
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   ```
   
   Fill in your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

## 🗄️ Database Setup

EDIFICE uses Supabase for backend services. You'll need to set up the following tables:

### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  plan TEXT DEFAULT 'free' CHECK (plan IN ('free', 'premium')),
  projects_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Projects Table
```sql
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  plot_data JSONB NOT NULL,
  requirements_data JSONB NOT NULL,
  blueprint_data JSONB,
  elevation_style TEXT,
  materials JSONB,
  cost_estimate NUMERIC,
  area_calculation JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Row Level Security (RLS)
```sql
-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Users can only see their own data
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Projects policies
CREATE POLICY "Users can view own projects" ON projects
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create projects" ON projects
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own projects" ON projects
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own projects" ON projects
  FOR DELETE USING (auth.uid() = user_id);
```

## 🎨 Design System

### Color Palette
- **Primary**: Warm amber tones (#F59E0B, #D97706)
- **Secondary**: Earth tones and natural colors
- **Accent**: Orange gradients for highlights
- **Neutral**: Gray scale for text and backgrounds

### Typography
- **Headings**: Slab-serif fonts for professional feel
- **Body**: Clean sans-serif for readability
- **Code**: Monospace for technical elements

### Components
- Consistent spacing using 8px grid system
- Smooth animations with Framer Motion
- Responsive design for all screen sizes
- Accessible color contrasts and interactions

## 📱 Features Overview

### Landing Page
- Hero section with compelling value proposition
- Feature showcase with interactive elements
- Customer testimonials and social proof
- Integrated authentication system

### Design Workflow
1. **Input Requirements**: Plot size, rooms, preferences
2. **AI Blueprint**: Automatic floor plan generation
3. **2D Editor**: Professional editing tools
4. **3D Visualization**: Immersive walkthroughs
5. **Elevation Styles**: AI-suggested exteriors
6. **Export**: Professional deliverables

### AI Assistant
- Context-aware guidance
- Step-by-step help
- Design suggestions
- Real-time chat interface

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Project Structure
```
src/
├── components/          # React components
│   ├── common/         # Shared components
│   ├── landing/        # Landing page components
│   ├── steps/          # Workflow step components
│   ├── workflow/       # Workflow management
│   ├── ai/            # AI assistant components
│   └── demo/          # Demo video components
├── services/           # API and business logic
├── store/             # Zustand state management
├── types/             # TypeScript type definitions
├── lib/               # Utility libraries
└── styles/            # Global styles
```

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify
1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Add environment variables in Netlify dashboard

### Deploy to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts
4. Add environment variables in Vercel dashboard

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support, email support@edifice.ai or join our Discord community.

## 🎯 Roadmap

- [ ] Mobile app development
- [ ] Advanced AI features
- [ ] VR/AR visualization
- [ ] Contractor marketplace
- [ ] Building code compliance
- [ ] Energy efficiency analysis

---

Built with ❤️ for dreamers and builders everywhere.