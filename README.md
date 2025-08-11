
# React Calendar App

A simple, clean calendar application built with React and Vite.

## Features

- Monthly calendar view
- Add events to specific dates
- Navigate between months
- Responsive design
- Clean, modern UI

## Running on Replit

1. Click the **Run** button to start the development server
2. The app will be available at the provided URL
3. Make changes to the code and see them reflected immediately

## Running Locally in VS Code

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Setup Steps

1. **Clone or download this project**
   ```bash
   git clone <your-repo-url>
   cd react-calendar-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   - The app will be available at `http://localhost:5173`
   - The terminal will show the exact URL

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

### VS Code Setup Tips

1. **Recommended Extensions:**
   - ES7+ React/Redux/React-Native snippets
   - Prettier - Code formatter
   - Auto Rename Tag

2. **Format on Save:**
   - Add to VS Code settings.json:
   ```json
   {
     "editor.formatOnSave": true,
     "editor.defaultFormatter": "esbenp.prettier-vscode"
   }
   ```

3. **Integrated Terminal:**
   - Use `Ctrl + ` ` (backtick) to open terminal in VS Code
   - Run commands directly from the integrated terminal

## Project Structure

```
src/
├── App.jsx          # Main application component
├── App.css          # Application styles
└── main.jsx         # React application entry point
```

## Usage

1. **Navigate months:** Use the arrow buttons in the calendar header
2. **Add events:** Click the "+ Add Event" button
3. **View events:** Events appear as blue boxes on calendar dates

## Customization

- Modify `App.css` to change colors and styling
- Edit `App.jsx` to add new features
- The calendar is fully responsive and mobile-friendly

## Building for Production

```bash
npm run build
```

This creates a `dist` folder with optimized files ready for deployment.
