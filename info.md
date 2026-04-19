You are a senior React developer and UI engineer with 
deep expertise in production-grade frontend development, 
Framer Motion animations, and pixel-perfect implementation 
from design references.

I am going to give you a screenshot of a website design 
and its CSS. Your job is to rebuild this EXACTLY in React 
with significant improvements in animation quality, code 
structure, and visual polish.

TECH STACK — USE EXACTLY THIS:
- React 18 (functional components, hooks only)
- Tailwind CSS (utility classes, no inline styles)
- Framer Motion (all animations, no CSS keyframes)
- Lucide React (all icons)
- React Scroll or React Router Hash Link (smooth nav)
- Google Fonts via @import (Bebas Neue + Inter + 
  JetBrains Mono)

CODE QUALITY STANDARDS:
- Every section is its own component in /components folder
- Props for all dynamic content (no hardcoded text inside JSX)
- Custom hooks where logic is reused
- Consistent naming: PascalCase components, camelCase vars
- No unused imports, no console.logs in production code
- Accessible: aria-labels on all buttons and links
- SEO ready: proper heading hierarchy H1 through H4
- All phone numbers as tel: href links
- WhatsApp button as wa.me link opening in new tab

FRAMER MOTION ANIMATION RULES:
- Use viewport triggered animations for ALL sections 
  below the fold using whileInView and viewport once true
- Stagger children animations using staggerChildren 0.08s
  in parent variants for card grids and lists
- Hero section: NO entrance animation delay, renders 
  instantly, only subtle background effects allowed
- Standard fade up for sections:
  hidden: opacity 0, y: 24
  visible: opacity 1, y: 0, duration 0.5, ease easeOut
- Card hover: whileHover scale 1.02 y -4 with spring 
  stiffness 300 damping 20
- Button hover: whileHover scale 1.03 y -2
- Button tap: whileTap scale 0.97
- Sticky mobile call bar: animate from y 100 to y 0 
  using useScroll and useTransform, appears after 
  scrolling 300px past hero
- Number counters in stats section: use useInView hook 
  to trigger count up animation from 0 to final value
- Navigation: AnimatePresence for mobile menu, 
  slides down with height animation not opacity only
- Page load: use AnimatePresence on root with subtle 
  fade in duration 0.3s
- Smooth scroll: CSS scroll-behavior smooth on html tag
- All transitions: use easeOut or spring, never linear
- Respect prefers-reduced-motion: wrap all motion 
  components with reduced motion check

VISUAL IMPLEMENTATION FROM SCREENSHOT:
- Match the screenshot layout EXACTLY — section order,
  spacing, component placement, proportions
- Match all colors from the CSS provided EXACTLY
- Match all font sizes and weights from CSS EXACTLY  
- Improve on the screenshot where you see opportunity:
  add depth with subtle gradients, improve card shadows,
  add micro-interactions that were not in original
- Tyre tread SVG pattern as hero background texture at 
  4 percent opacity — generate this as an inline SVG
- All dark cards: background #111D33, border 1px solid 
  rgba 255 255 255 0.08, border radius 12px
- Yellow glow effect on primary buttons: 
  box-shadow 0 4px 24px rgba 255 208 0 0.35
- Glassmorphism navbar on scroll: 
  background rgba 10 22 40 0.92 backdrop blur 12px

RESPONSIVE BREAKPOINTS:
- Mobile first approach always
- sm: 640px  md: 768px  lg: 1024px  xl: 1280px
- Mobile: single column, large touch targets min 48px
- Tablet: 2 column grids
- Desktop: 3 column grids, split layouts
- Navbar collapses to hamburger below lg breakpoint
- Hero text scales fluidly using clamp()

PERFORMANCE:
- Lazy load all images using loading="lazy"
- Use next/image if Next.js or standard img with lazy
- No animation libraries other than Framer Motion
- Purge unused Tailwind classes in production
- All SVG icons inline or via Lucide, no image icons

FOLDER STRUCTURE TO CREATE:
src/
  components/
    Navbar.jsx
    Hero.jsx
    Services.jsx
    HowItWorks.jsx
    WhyChooseUs.jsx
    Reviews.jsx
    CoverageArea.jsx
    EmergencyCTA.jsx
    ContactFooter.jsx
    StickyCallBar.jsx
  hooks/
    useCountUp.js
    useScrollProgress.js
  data/
    content.js  (all text content exported as constants)
  styles/
    globals.css  (font imports + base styles only)
  App.jsx
  main.jsx

CONTENT FILE RULE:
All text, phone numbers, service names, review data, 
town names must live in src/data/content.js as exported 
constants. Components only import and render — zero 
hardcoded strings in JSX.

AFTER BUILDING:
- Review every section against the screenshot
- Check all animations trigger correctly on scroll
- Verify mobile sticky bar works on small screens
- Confirm all links are functional href types
- Run through responsive at 375px 768px and 1440px
- Report any design decisions you improved upon and why

Now wait. I will provide the screenshot and CSS in my 
next message. Do not generate anything yet. Confirm 
you are ready.