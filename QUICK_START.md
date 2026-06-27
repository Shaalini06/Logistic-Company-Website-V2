# FASTER Logistics Website - Quick Start Guide

## 🚀 Get Started in 2 Minutes

### Step 1: Install & Run (30 seconds)

```bash
cd "Logistic-Company-Website"
npm install
npm run dev
```

### Step 2: Open Browser

```
http://localhost:3000
```

That's it! Your site is running! 🎉

---

## 📍 What You'll See

### Home Page

- Hero carousel with 3 slides
- 4 feature cards
- About section with image
- Animated statistics counter
- 6 services grid
- 3 pricing plans
- Testimonial carousel
- Newsletter signup
- Call-to-action button

### Navigation

**Top Menu:**

- Home
- About
- Services
- Pricing
- Features
- Get Quote (button)
- Pages (dropdown):
  - Quote
  - Team
  - Testimonials
  - Gallery
  - Blog
  - Contact

---

## 🎨 Customize in 5 Minutes

### Change Primary Color

1. Open `src/styles/main.css`
2. Find `:root` section (line 8)
3. Change `--primary-color: #FF6B00` to your color
4. Save - changes apply instantly!

### Update Company Name

1. Open `src/components/Navbar.jsx`
2. Change "FASTER" text in navbar-brand
3. Open `src/components/Footer.jsx`
4. Update footer company info
5. Save and refresh

### Update Contact Info

1. Open `src/components/Topbar.jsx`
2. Update phone and email
3. Open `src/pages/Contact.jsx`
4. Update address and hours

### Update Images

Replace these with your own images:

- Hero slides: `src/components/Hero.jsx`
- About section: `src/components/About.jsx`
- Gallery: `src/components/Gallery.jsx`
- Team photos: `src/components/Team.jsx`

---

## 📱 Test Responsive Design

### Breakpoints

- **Desktop**: Full width
- **Tablet** (992px): Optimized layout
- **Mobile** (768px): Stack layout
- **Small Mobile** (576px): Minimal spacing

**Test it:** Open DevTools (F12) → Toggle device toolbar → Test different sizes

---

## 🔗 All Routes

| URL            | Component   | What's Here      |
| -------------- | ----------- | ---------------- |
| `/`            | Home        | Landing page     |
| `/about`       | About       | Company info     |
| `/services`    | Services    | Service details  |
| `/pricing`     | Pricing     | Pricing & FAQ    |
| `/features`    | Features    | Feature showcase |
| `/quote`       | Quote       | Quote form       |
| `/team`        | Team        | Team members     |
| `/testimonial` | Testimonial | Customer reviews |
| `/gallery`     | Gallery     | Photo gallery    |
| `/blog`        | Blog        | Blog posts       |
| `/blog/1`      | BlogDetail  | Single blog post |
| `/contact`     | Contact     | Contact form     |
| `/random`      | NotFound    | 404 page         |

---

## 🎯 Key Files to Customize

### Content Changes

- `src/pages/Home.jsx` - Home page structure
- `src/pages/About.jsx` - About page content
- `src/components/Hero.jsx` - Hero carousel text
- `src/components/Services.jsx` - Service descriptions
- `src/components/Pricing.jsx` - Pricing plans
- `src/components/Team.jsx` - Team members

### Styling Changes

- `src/styles/main.css` - All CSS (line 8 has color variables)
- `src/components/Navbar.jsx` - Navigation styling
- `src/components/Footer.jsx` - Footer styling

### Config Changes

- `package.json` - Project name, version
- `index.html` - Page title, meta description
- `vite.config.js` - Build settings
- `.env.example` - Environment setup

---

## 🛠️ Common Tasks

### Add a New Page

```jsx
// 1. Create src/pages/NewPage.jsx
export default function NewPage() {
  return <div>Page content</div>
}

// 2. Add to src/routes/AppRoutes.jsx
<Route path="/newpage" element={<NewPage />} />

// 3. Add to navbar in src/components/Navbar.jsx
<Link to="/newpage">New Page</Link>
```

### Add a New Component

```jsx
// 1. Create src/components/NewComponent.jsx
export default function NewComponent() {
  return <div data-aos="fade-up">Content with animation</div>;
}

// 2. Import and use in pages
import NewComponent from "../components/NewComponent";
```

### Change a Color

```css
/* Edit src/styles/main.css line 8 */
:root {
  --primary-color: #ff6b00; /* Change this */
  --secondary-color: #0b1f3a; /* Or this */
  /* ... */
}
```

### Add Form Handling

```jsx
const handleSubmit = (e) => {
  e.preventDefault();
  // Add your logic here
  console.log(new FormData(e.target));
};
```

---

## 📚 Documentation Files

- `README.md` - Full project overview
- `SETUP_GUIDE.md` - Detailed setup instructions
- `PROJECT_CHECKLIST.md` - What's completed
- `FILE_MANIFEST.md` - All files listed
- `QUICK_START.md` - This file

---

## 🚢 Deploy in 3 Steps

### Option 1: Vercel (Easiest)

```bash
# 1. Push to GitHub
git add .
git commit -m "Initial commit"
git push origin main

# 2. Visit vercel.com
# 3. Import your repository
# 4. Deploy!
```

### Option 2: Netlify

```bash
# 1. Build
npm run build

# 2. Drag dist/ folder to Netlify.com
# 3. Done!
```

### Option 3: Traditional Hosting

```bash
# 1. Build
npm run build

# 2. Upload dist/ folder via FTP to your server

# 3. Configure server (add _redirects file):
/* /index.html 200
```

---

## ✅ Before Deployment

- [ ] Update company name everywhere
- [ ] Update contact information
- [ ] Replace all placeholder images
- [ ] Update content (services, pricing, team)
- [ ] Test all links
- [ ] Test on mobile
- [ ] Update meta description in index.html
- [ ] Update favicon
- [ ] Test form submissions
- [ ] Check loading times
- [ ] Fix any broken links
- [ ] Remove old HTML files

---

## 💡 Tips & Tricks

### Dev Server Tips

- Auto-reload on file changes
- Hot module replacement (HMR)
- Super fast recompilation
- Detailed error messages

### Performance Tips

- Images load via CDN (unsplash.com)
- CSS is minified in production
- JS is code-split by route
- No unused CSS in build

### Debugging Tips

- Use Chrome DevTools F12
- React DevTools extension
- Check console for errors
- Use VS Code debugger

### Animation Tips

- Add `data-aos="fade-up"` for animations
- Adjust delay: `data-aos-delay="100"`
- Change duration: `data-aos-duration="600"`
- See more: [AOS documentation](https://github.com/michalsnik/aos)

---

## 🐛 Troubleshooting

### Port 3000 in use?

```bash
npm run dev -- --port 3001
```

### Node modules corrupted?

```bash
rm -rf node_modules package-lock.json
npm install
```

### Build fails?

```bash
# Clear cache and rebuild
npm run build -- --force
```

### Styles not updating?

```bash
# Hard refresh in browser
Ctrl+Shift+R (Windows)
Cmd+Shift+R (Mac)
```

---

## 📞 Need Help?

**Common Questions:**

- How do I change colors? → Edit `src/styles/main.css`
- How do I add pages? → Create file in `src/pages/`
- How do I deploy? → Follow "Deploy in 3 Steps" above
- How do I add images? → Replace URLs in components
- How do I customize forms? → Edit `src/pages/Quote.jsx` or `Contact.jsx`

**Resources:**

- [React Docs](https://react.dev)
- [Vite Docs](https://vitejs.dev)
- [Bootstrap Docs](https://getbootstrap.com)
- [React Router Docs](https://reactrouter.com)

---

## 🎉 You're All Set!

Your professional logistics website is ready to go!

### Next Steps:

1. ✅ Run the server (`npm run dev`)
2. ✅ Explore all pages
3. ✅ Customize content
4. ✅ Test responsive design
5. ✅ Deploy to production

**Questions?** Check the other documentation files or refer to the library documentation links above.

**Happy coding!** 🚀

---

**FASTER Logistics Website**
Built with ❤️ using React 18 + Vite
