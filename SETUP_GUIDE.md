# FASTER Logistics Website - Project Setup Guide

## ✅ Project Created Successfully!

Your complete React 18 + Vite logistics website is ready to use. Follow the steps below to get started.

## 📦 Installation & Running

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Start Development Server

```bash
npm run dev
```

The application will start at `http://localhost:3000`

### Step 3: Build for Production

```bash
npm run build
```

Output will be in the `dist/` folder.

## 📁 Project Structure

### Core Files

- **index.html** - React entry point with root div
- **vite.config.js** - Vite configuration
- **package.json** - Dependencies and scripts

### Source Code (src/)

- **main.jsx** - Application entry, imports all libraries
- **App.jsx** - Root component with BrowserRouter
- **routes/AppRoutes.jsx** - All 13 page routes
- **components/** - Reusable UI components (16 components)
- **pages/** - Page components (13 pages)
- **styles/main.css** - All styling (1500+ lines)

## 🎯 Key Routes

| Route          | Component   | Description           |
| -------------- | ----------- | --------------------- |
| `/`            | Home        | Main landing page     |
| `/about`       | About       | Company information   |
| `/services`    | Services    | Service offerings     |
| `/pricing`     | Pricing     | Pricing plans         |
| `/features`    | Features    | Feature showcase      |
| `/quote`       | Quote       | Quote request form    |
| `/team`        | Team        | Team members          |
| `/testimonial` | Testimonial | Customer testimonials |
| `/gallery`     | Gallery     | Image gallery         |
| `/blog`        | Blog        | Blog listing          |
| `/blog/:id`    | BlogDetail  | Individual blog post  |
| `/contact`     | Contact     | Contact form          |
| `*`            | NotFound    | 404 page              |

## 🎨 Components Overview

### Layout Components (6)

1. **Layout** - Master wrapper
2. **Preloader** - Loading spinner
3. **Topbar** - Top header
4. **Navbar** - Navigation bar
5. **Footer** - Footer
6. **BackToTop** - Scroll-to-top button

### Content Components (10)

1. **Hero** - Swiper carousel with 3 slides
2. **Features** - 4-column feature grid
3. **About** - 2-column about section
4. **Counter** - Animated statistics
5. **Services** - 6-service grid
6. **Pricing** - 3 pricing plans
7. **Testimonials** - Testimonial carousel
8. **Team** - 8-member team grid
9. **Gallery** - Masonry gallery with lightbox
10. **Newsletter** - Newsletter signup
11. **CTA** - Call-to-action sections
12. **PageHeader** - Page header banner

## 🚀 Development Workflow

### Adding a New Page

1. Create new file in `src/pages/NewPage.jsx`
2. Import components and build layout
3. Add route to `src/routes/AppRoutes.jsx`
4. Create navigation link in `src/components/Navbar.jsx`

### Adding a New Component

1. Create file in `src/components/NewComponent.jsx`
2. Use existing component patterns
3. Add AOS attributes for animations
4. Import and use in pages

### Styling

- All styles in `src/styles/main.css`
- CSS variables defined in `:root`
- Mobile-first responsive design
- Breakpoints: 576px, 768px, 992px, 1200px

## 🎨 Design System

### Colors

```css
--primary-color: #ff6b00 (Orange) --secondary-color: #0b1f3a (Dark Blue)
  --accent-color: #f4f7fa (Light Gray) --text-color: #333333 (Dark Gray);
```

### Spacing

- Section padding: 100px (60px mobile)
- Gap between items: 15-30px
- Card border radius: 16px

### Typography

- Font: Poppins (Google Fonts)
- Weights: 300-900
- Body: 1rem / 1.6 line-height
- Headings: Bold, 1.3 line-height

## 📚 Libraries & Dependencies

| Library      | Version | Purpose           |
| ------------ | ------- | ----------------- |
| React        | 18.2.0  | UI Framework      |
| Vite         | 5.0.8   | Build tool        |
| React Router | 6.20.0  | Routing           |
| Bootstrap    | 5.3.2   | CSS Framework     |
| Swiper       | 11.0.3  | Carousels         |
| AOS          | 2.3.4   | Scroll animations |
| GLightbox    | 3.2.0   | Image gallery     |
| Font Awesome | 6.4.0   | Icons             |

## 🎬 Available Scripts

```bash
# Start development server (port 3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🔧 Customization

### Change Primary Color

1. Edit `--primary-color` in `src/styles/main.css`
2. Update color references throughout (usually automatically styled)

### Change Company Name

1. Update navbar brand in `src/components/Navbar.jsx`
2. Update footer company info in `src/components/Footer.jsx`
3. Update meta description in `index.html`
4. Update title tags in each page

### Change Content

- Edit component data arrays
- Update form fields and validation
- Modify page layouts in `src/pages/`

## 📱 Responsive Breakpoints

```css
/* Desktop */
@media (max-width: 1400px) {
}

/* Laptop */
@media (max-width: 1200px) {
}

/* Tablet */
@media (max-width: 992px) {
}

/* Mobile */
@media (max-width: 768px) {
}

/* Small Mobile */
@media (max-width: 576px) {
}
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Connect to Vercel
3. Deploy automatically

### Netlify

1. Run `npm run build`
2. Drag `dist/` folder to Netlify

### Traditional Server

1. Run `npm run build`
2. Upload `dist/` folder
3. Configure for SPA routing

## ⚙️ Configuration

### Vite Config (`vite.config.js`)

- Dev server on port 3000
- React plugin enabled
- Build optimizations configured

### Environment Variables

Create `.env` file for:

```
VITE_API_URL=...
VITE_APP_NAME=...
```

## 🐛 Troubleshooting

### Port 3000 Already in Use

```bash
# Use different port
npm run dev -- --port 3001
```

### Build Errors

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### CSS Not Loading

1. Check `main.jsx` imports
2. Verify `main.css` path
3. Clear browser cache

## 📊 Performance Tips

1. **Images**: Optimize before adding to gallery
2. **Components**: Use React.memo for heavy components
3. **Routing**: Code-split pages with lazy loading
4. **CSS**: Unused styles are automatically removed
5. **Build**: Production build is optimized by default

## 🔐 Security

- No sensitive data in client code
- Use environment variables for APIs
- Sanitize user inputs in forms
- Keep dependencies updated

## 📞 Support & Maintenance

### Regular Updates

```bash
npm update
npm audit fix
```

### Monitoring

- Check browser console for errors
- Monitor performance with Lighthouse
- Test on multiple devices/browsers

## 🎓 Learning Resources

- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev)
- [Bootstrap Docs](https://getbootstrap.com)
- [Swiper API](https://swiperjs.com)
- [AOS Library](https://github.com/michalsnik/aos)

## 📝 Notes

- All components follow React best practices
- Proper cleanup in useEffect hooks
- Event listeners properly removed
- No memory leaks from subscriptions
- Responsive design tested on all breakpoints

## ✨ What's Included

✅ 13 fully functional pages
✅ 16 reusable components
✅ Complete styling (1500+ lines)
✅ Responsive design (all breakpoints)
✅ Animations (AOS, Swiper, custom CSS)
✅ Forms (Quote, Contact, Newsletter)
✅ Image gallery with lightbox
✅ Team member showcase
✅ Blog listing and detail pages
✅ Testimonials carousel
✅ Pricing plans
✅ Contact information
✅ Footer with links
✅ Mobile navigation
✅ SEO meta tags

## 🎉 Ready to Launch!

Your logistics website is complete and ready to deploy. Customize the content, colors, and images, then launch to production!

---

**FASTER** - Your Modern Logistics Solution
