# DhakaCity AI

An AI-powered assistant for residents of Dhanmondi, Dhaka to discover restaurants, hospitals, and diagnostic centers.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Apply database migrations
npm run db:migrate

# Seed baseline places
npm run db:seed

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## 🔐 Environment Variables

Add the following keys in `.env`:

```bash
DATABASE_URL="postgresql://..."
OPENAI_API_KEY="sk-..."
OPENAI_EMBEDDING_MODEL="text-embedding-3-small"
OPENAI_CHAT_MODEL="gpt-4o-mini"
```

## 📁 Project Structure

```
dhakacity-ai/
├── app/
│   ├── layout.tsx          # Root layout with sticky header
│   ├── page.tsx            # Home page with chat and categories
│   ├── search/
│   │   └── page.tsx        # Search page with filters
│   ├── place/
│   │   └── [id]/
│   │       └── page.tsx    # Dynamic place details page
│   └── admin/
│       └── page.tsx        # Admin dashboard
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── chat-box.tsx        # AI chat input component
│   ├── category-buttons.tsx
│   ├── place-card.tsx      # Place preview card
│   ├── place-details.tsx   # Full place details
│   ├── search-filters.tsx  # Search filters sidebar
│   ├── admin-place-form.tsx
│   ├── open-now-badge.tsx
│   └── map-embed.tsx       # Map display component
├── lib/
│   ├── mock-data.ts        # Sample place data
│   └── utils.ts            # Utility functions
└── types/
    └── place.ts            # TypeScript type definitions
```

## 🎨 Features

### 🏠 Home Page (`/`)
- Hero section with "Ask Dhaka AI" title
- Chat input box for AI queries
- 4 large category buttons:
  - 🍽️ Restaurants
  - 🏥 Hospitals
  - 🔬 Diagnostics
  - 📍 Near Me
- Mock AI responses with place cards

### 🔍 Search Page (`/search`)
- Search bar with live filtering
- Sidebar filters:
  - Category dropdown
  - "Open Now" checkbox
  - Price range selector
- Grid of place cards
- URL params support (`?category=restaurant`)

### 📍 Place Details (`/place/[id]`)
- Full place information
- Photos gallery placeholder
- Address and location
- Open/Closed status badge
- Tags display
- Call button
- Google Maps embed placeholder
- AI-generated summary text

### ⚙️ Admin Dashboard (`/admin`)
- Stats cards (Total, Featured, Categories)
- Add/Edit place form with fields:
  - Name, Category, Address
  - Lat/Lng coordinates
  - Phone, Open hours
  - Price range, Tags
  - Featured toggle
- Form logs data to console

## 🛠️ Tech Stack

- **Framework:** Next.js 16.2.4 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **UI Components:** shadcn/ui
- **Icons:** Emoji (no icon library needed)

## 📦 Components

### Core Components
- `ChatBox` - AI chat interface
- `CategoryButtons` - Category navigation
- `PlaceCard` - Place preview card
- `PlaceDetails` - Full place information
- `SearchFilters` - Filter controls
- `AdminPlaceForm` - Admin form
- `OpenNowBadge` - Status indicator
- `MapEmbed` - Map placeholder

### shadcn/ui Components Used
- Button
- Card
- Input
- Badge
- Checkbox
- Label
- Select

## 🗂️ Data Structure

```typescript
type Place = {
  id: string;
  name: string;
  category: "restaurant" | "hospital" | "diagnostic";
  address: string;
  lat: number;
  lng: number;
  phone: string;
  openHours: string;
  priceRange: string; // ৳, ৳৳, ৳৳৳, ৳৳৳৳
  tags: string[];
  featured: boolean;
  images: string[];
};
```

## 📱 Mobile-First Design

- Responsive grid layouts
- Large tap targets (48px min)
- Sticky header navigation
- Touch-friendly controls
- Mobile-optimized cards

## 🔄 Current Status

**Database-backed app:**
- Prisma + Postgres (Supabase-ready) for places, tags, and embeddings
- API routes for create/list/place details and Ask Dhaka AI
- Vector search helpers with pgvector support
- Admin form writes directly to database

**Seed data:**
- Baseline seed script included using current sample place set
- Easy to extend with larger import scripts for Google Maps datasets

## 🌐 API Endpoints

- `GET /api/places`
  - Query: `q`, `category`, `openNow`, `priceRange`, `lat`, `lng`, `limit`
- `POST /api/places`
  - Creates place with tags, images, and embedding upsert
- `GET /api/places/[id]`
  - Returns place details with tags
- `POST /api/ask`
  - RAG-style place matching and AI answer generation

## 🚀 Deploy (Vercel + Supabase)

1. Create Supabase project and copy pooled Postgres connection string.
2. Ensure pgvector extension is enabled (migration also attempts this).
3. Set env vars in Vercel Project Settings:
  - `DATABASE_URL`
  - `OPENAI_API_KEY`
  - `OPENAI_EMBEDDING_MODEL` (optional)
  - `OPENAI_CHAT_MODEL` (optional)
4. Run migrations on production database:

```bash
npm run db:migrate
```

5. Seed initial data (optional):

```bash
npm run db:seed
```

6. Deploy to Vercel.

## 📄 License

MIT

## 👨‍💻 Developer

Built with ❤️ for Dhanmondi residents
# Dhakacity_AI
