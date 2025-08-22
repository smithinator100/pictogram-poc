# Pictogram POC

A Next.js application for creating animated pictograms with customizable extras, colors, and Lottie animations. This project provides an interactive interface to combine static SVG pictograms with dynamic animations and overlay elements.

![Pictogram Preview](https://img.shields.io/badge/Next.js-15.5.0-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)
![React](https://img.shields.io/badge/React-19.1.0-blue?logo=react)
![Lottie](https://img.shields.io/badge/Lottie-Animations-orange)

## ✨ Features

- **Dynamic Pictogram Selection**: Choose from a library of SVG pictograms
- **Customizable Extras**: Add overlay icons with custom colors and positioning
- **Lottie Animations**: Multiple animation types (slide-in, scale-in, spin, burst effects)
- **Color Customization**: Apply custom colors to extra elements and backgrounds
- **Responsive Design**: Built with Tailwind CSS and Shadcn UI components
- **Theme Support**: Light and dark mode background options
- **Interactive Controls**: Real-time preview with sidebar controls
- **GitHub Pages Deployment**: Configured for static site deployment

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd pictogram-poc
   ```

2. **Navigate to the project directory**
   ```bash
   cd pictogram
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Generate data files**
   ```bash
   npm run generate-data
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Visit [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
pictogram/
├── app/                          # Next.js App Router
│   ├── api/                      # API Routes
│   │   ├── pictograms/route.ts   # Dynamic pictogram discovery
│   │   ├── extras/route.ts       # Dynamic extra icons discovery
│   │   └── lottie-animations/route.ts # Animation files discovery
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Main application page
│   └── globals.css               # Global styles
├── components/ui/                # Shadcn UI Components
│   ├── sidebar.tsx               # Sidebar layout components
│   ├── card.tsx                  # Card components
│   ├── select.tsx                # Select dropdowns
│   ├── slider.tsx                # Range slider
│   ├── switch.tsx                # Toggle switches
│   └── ...                       # Other UI components
├── lib/                          # Utility Libraries
│   ├── lottie-config.ts          # Lottie animation configuration
│   ├── path-utils.ts             # Path handling utilities
│   └── utils.ts                  # General utilities
├── public/                       # Static Assets
│   ├── data/                     # Generated JSON data
│   │   ├── pictograms.json       # Pictogram metadata
│   │   └── extras.json           # Extra icons metadata
│   ├── images/                   # SVG Assets
│   │   ├── pictogram-*.svg       # Pictogram SVG files
│   │   └── extra-*.svg           # Extra icon SVG files
│   └── lottie/                   # Lottie Animation Files
│       ├── *.json                # Animation JSON files
│       └── images/               # Animation image assets
├── scripts/                      # Build Scripts
│   └── generate-data.js          # Data generation script
├── next.config.ts                # Next.js configuration
├── package.json                  # Dependencies and scripts
└── README.md                     # This file
```

## 🎯 How It Works

### Main Components

#### 1. **Main Interface (`app/page.tsx`)**
- **Sidebar Controls**: Interactive panel with pictogram selection, color pickers, and animation options
- **Preview Area**: Real-time animated preview with customizable background and sizing
- **Responsive Layout**: Uses Shadcn UI sidebar components for consistent UX

#### 2. **API Routes (`app/api/`)**
- **Dynamic Discovery**: Automatically scans file directories to find available assets
- **Pictograms API**: Discovers SVG files starting with "pictogram-"
- **Extras API**: Discovers SVG files starting with "extra-"
- **Lottie Animations API**: Discovers JSON files in the lottie directory

#### 3. **Lottie Animation Engine (`lib/lottie-config.ts`)**
- **Dynamic Asset Replacement**: Replaces placeholder images in Lottie files with selected pictograms
- **Color Manipulation**: Applies custom colors to animation elements and backgrounds
- **Layer Management**: Controls visibility of sparkles, extras, and flair layers
- **SVG Color Modification**: Dynamically modifies SVG fill colors for extra icons

#### 4. **Path Management (`lib/path-utils.ts`)**
- **Environment Detection**: Handles different base paths for development and GitHub Pages
- **Dynamic Path Generation**: Creates correct URLs for assets and API calls
- **Cross-Environment Compatibility**: Works in both local development and static deployment

### Data Flow

1. **Initialization**: App loads and fetches available pictograms, extras, and animations from API routes
2. **User Selection**: User selects pictogram, extra, color, and animation options via sidebar
3. **Animation Generation**: `loadPictogramAnimation()` function processes the selected options:
   - Loads the base Lottie animation JSON
   - Replaces image assets with selected pictogram and extra
   - Applies color transformations
   - Manages layer visibility based on user preferences
4. **Rendering**: Lottie React component renders the processed animation data
5. **Real-time Updates**: Changes in sidebar controls trigger re-generation and re-rendering

### Animation Types

- **Slide In**: Bottom, Top, Left, Right variations
- **Scale In**: Smooth, Spring, Burst (with flair effects)
- **Spin In**: Rotating entrance animation

### Customization Options

- **Pictograms**: 40+ SVG icons covering various themes (security, productivity, etc.)
- **Extras**: 20+ overlay icons (arrows, symbols, indicators)
- **Colors**: 9 predefined color options including alert colors and transparency
- **Backgrounds**: 8 background colors for light and dark modes
- **Size**: Adjustable from 128px to 1280px
- **Layers**: Toggle sparkles, extras, and flair effects

## 🎨 Adding New Assets

### Adding New Pictograms

1. **Add SVG File**: Place new SVG file in `public/images/` with filename starting with `pictogram-`
   ```
   public/images/pictogram-new-icon.svg
   ```

2. **Regenerate Data**: Run the data generation script
   ```bash
   npm run generate-data
   ```

3. **Restart Development Server**: The new pictogram will appear in the selection dropdown

### Adding New Extra Icons

1. **Add SVG File**: Place new SVG file in `public/images/` with filename starting with `extra-`
   ```
   public/images/extra-new-symbol.svg
   ```

2. **Regenerate Data**: Run the data generation script
   ```bash
   npm run generate-data
   ```

### Adding New Animations

1. **Add Lottie File**: Place new JSON file in `public/lottie/`
   ```
   public/lottie/my-custom-animation.json
   ```

2. **Asset Requirements**: Ensure the animation uses standard asset names:
   - `img_3.png` - Will be replaced with selected pictogram
   - `img_1.png` - Will be replaced with selected extra icon

3. **Layer Names**: Use standard layer names for automatic control:
   - `extra-bg` - Extra background color layer
   - `sparkles` - Sparkles effect layer
   - `flair` - Flair effect layer
   - `extra`, `extra-mask`, etc. - Extra icon layers

## 🚀 Deployment

### GitHub Pages

The project is configured for GitHub Pages deployment with static export.

#### Build and Deploy

```bash
# Build for production
npm run build

# Deploy (if using manual deployment)
npm run deploy
```

#### Configuration

The project uses environment-specific path handling:

- **Development**: Standard Next.js paths
- **Production**: Adds repository base path for GitHub Pages
- **Asset Loading**: Handles both local and remote asset loading

#### Environment Variables

Set these in your deployment environment:

```bash
NODE_ENV=production  # Enables production optimizations
```

### Manual Deployment

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy the `out/` directory** to your static hosting provider

## 🛠️ Development

### Available Scripts

```bash
npm run dev          # Start development server with Turbopack
npm run build        # Build for production with data generation
npm run start        # Start production server
npm run deploy       # Build and prepare for deployment
npm run generate-data # Generate JSON data files from assets
```

### Development Workflow

1. **Add new assets** to appropriate directories
2. **Run data generation** to update JSON files
3. **Test locally** with `npm run dev`
4. **Build and deploy** when ready

### Key Development Files

- **`app/page.tsx`**: Main application logic and UI
- **`lib/lottie-config.ts`**: Animation processing and customization
- **`scripts/generate-data.js`**: Asset discovery and data generation
- **`next.config.ts`**: Build and deployment configuration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Run data generation: `npm run generate-data`
5. Test your changes: `npm run dev`
6. Commit your changes: `git commit -am 'Add some feature'`
7. Push to the branch: `git push origin feature-name`
8. Submit a pull request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🎯 Tech Stack

- **Framework**: Next.js 15.5.0 with App Router
- **Language**: TypeScript 5.x
- **Frontend**: React 19.1.0
- **Animations**: Lottie React 2.4.1
- **UI Components**: Shadcn UI (Radix UI + Tailwind CSS)
- **Icons**: Lucide React
- **Styling**: Tailwind CSS 4.x
- **Build**: Turbopack (development), Static Export (production)
- **Deployment**: GitHub Pages compatible

## 🐛 Troubleshooting

### Common Issues

1. **Assets not loading**: Run `npm run generate-data` to refresh asset metadata
2. **Animation not updating**: Check browser console for loading errors
3. **Deployment issues**: Verify `next.config.ts` base path configuration
4. **Development server issues**: Clear `.next` cache and restart

### Debug Mode

Enable verbose logging by checking browser console during development. The app logs detailed information about asset loading and animation processing.

---

**Happy coding!** 🎉 Feel free to open issues or contribute improvements to make this pictogram tool even better.
