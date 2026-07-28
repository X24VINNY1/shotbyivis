import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, Menu, X, ArrowUpRight,
  ChevronRight, Check
} from 'lucide-react';

function InstagramIcon({ size = 20, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  );
}

export interface PostItem {
  id: string;
  title: string;
  category: string;
  type: 'video' | 'image';
  url: string;
  description: string;
}

const SLIDESHOW_IMAGES = [
  '/slideshow/slide1.jpg',
  '/slideshow/slide2.jpg',
  '/slideshow/slide3.jpg',
  '/slideshow/slide4.jpg',
  '/slideshow/slide5.jpg',
  '/slideshow/slide6.jpg',
];

const REAL_INSTAGRAM_POSTS: PostItem[] = [
  {
    id: 'ig1',
    title: 'Miami Night Shoot',
    category: 'Music Videos',
    type: 'image',
    url: '/slideshow/slide1.jpg',
    description: 'Music video production on location in Miami.'
  },
  {
    id: 'ig2',
    title: 'Editorial Photography',
    category: 'Photography',
    type: 'image',
    url: '/slideshow/slide2.jpg',
    description: 'Model portraiture and fashion photoshoot.'
  },
  {
    id: 'ig3',
    title: 'Automotive Showcase',
    category: 'Commercials',
    type: 'image',
    url: '/slideshow/slide3.jpg',
    description: 'Exotic supercar visual production.'
  },
  {
    id: 'ig4',
    title: 'Live Event Coverage',
    category: 'Events',
    type: 'image',
    url: '/slideshow/slide4.jpg',
    description: 'Concert and stage performance recap.'
  },
  {
    id: 'ig5',
    title: 'Urban Portraiture',
    category: 'Photography',
    type: 'image',
    url: '/slideshow/slide5.jpg',
    description: 'Studio portrait shoot.'
  },
  {
    id: 'ig6',
    title: 'Miami Visual Production',
    category: 'Commercials',
    type: 'image',
    url: '/slideshow/slide6.jpg',
    description: 'Ocean Drive content shoot.'
  }
];

const SERVICES = [
  {
    id: 's1',
    title: 'Music Videos',
    price: 'Starting at $1,200',
    description: 'Full 4K/6K cinema camera shooting, direction, editing & color grading.',
    features: ['Direction & Filming', '4K / 6K Cinema Gear', 'Full Editing & Color Grade', '3-Day Turnaround']
  },
  {
    id: 's2',
    title: 'Photoshoots',
    price: 'Starting at $450',
    description: 'Fashion, portrait, and automotive photography sessions in Miami.',
    features: ['20 High-Res Edits', 'Studio or Location', 'Color Correction', 'Online Gallery']
  },
  {
    id: 's3',
    title: 'Event Coverage',
    price: 'Starting at $800',
    description: 'High-energy recap videos and highlights for concerts, clubs & private events.',
    features: ['1-2 Min Highlight Edit', 'Full Event Recap', 'Raw Footage Options', 'Fast Delivery']
  },
  {
    id: 's4',
    title: 'Commercial / Brands',
    price: 'Starting at $1,500',
    description: 'Reels and content created for brands, products, and social media campaigns.',
    features: ['Instagram/TikTok Specs', 'Audio & Sound Design', 'Commercial Usage Rights', 'Social Cuts']
  }
];

export default function App() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [posts] = useState<PostItem[]>(() => {
    try {
      const saved = localStorage.getItem('shotbyivis_real_posts');
      return saved && JSON.parse(saved).length > 0 ? JSON.parse(saved) : REAL_INSTAGRAM_POSTS;
    } catch {
      return REAL_INSTAGRAM_POSTS;
    }
  });

  const [activeCategory, setActiveCategory] = useState('All');
  const [activeMedia, setActiveMedia] = useState<PostItem | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bookingForm, setBookingForm] = useState({ name: '', email: '', service: 'Music Videos', date: '', notes: '' });
  const [bookedSuccess, setBookedSuccess] = useState(false);

  const categories = ['All', 'Music Videos', 'Photography', 'Commercials', 'Events'];

  const filteredPosts = posts.filter(item => 
    activeCategory === 'All' || item.category === activeCategory
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % SLIDESHOW_IMAGES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookedSuccess(true);
    setTimeout(() => {
      setBookedSuccess(false);
      setBookingForm({ name: '', email: '', service: 'Music Videos', date: '', notes: '' });
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-[#070709] text-white selection:bg-[#ff007f] selection:text-white font-sans">
      
      {/* ===== HEADER ===== */}
      <header className="sticky top-0 z-50 bg-[#070709]/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3">
            <img src="/logo.png" alt="ShotByIvis" className="h-9 w-auto object-contain" />
            <span className="font-extrabold text-xl tracking-wider text-white">
              SHOTBY<span className="text-[#ff007f]">IVIS</span>
            </span>
          </a>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-widest font-semibold text-white/70">
            <a href="#portfolio" className="hover:text-[#00f0ff] transition-colors">Portfolio</a>
            <a href="#services" className="hover:text-[#00f0ff] transition-colors">Services</a>
            <a href="#about" className="hover:text-[#00f0ff] transition-colors">About</a>
            <a href="#contact" className="hover:text-[#00f0ff] transition-colors">Contact</a>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <a 
              href="https://www.instagram.com/shotbyivis/" 
              target="_blank" 
              rel="noreferrer"
              className="text-white/80 hover:text-[#ff007f] transition-colors p-2"
              title="Instagram @shotbyivis"
            >
              <InstagramIcon size={20} />
            </a>
            <a 
              href="#contact"
              className="px-5 py-2.5 rounded-full border border-[#ff007f] text-white hover:bg-[#ff007f] text-xs font-bold uppercase tracking-wider transition-all"
            >
              Book Shoot
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-white/80"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#070709] border-b border-white/10 px-6 py-4 flex flex-col gap-4 text-xs font-bold uppercase tracking-wider">
            <a href="#portfolio" onClick={() => setMobileMenuOpen(false)} className="py-2 text-white/80">Portfolio</a>
            <a href="#services" onClick={() => setMobileMenuOpen(false)} className="py-2 text-white/80">Services</a>
            <a href="#about" onClick={() => setMobileMenuOpen(false)} className="py-2 text-white/80">About</a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="py-2 text-white/80">Contact</a>
            <a href="https://www.instagram.com/shotbyivis/" target="_blank" rel="noreferrer" className="text-[#ff007f] py-2 flex items-center gap-2">
              <InstagramIcon size={16} /> Instagram @shotbyivis
            </a>
          </div>
        )}
      </header>

      {/* ===== HERO SECTION ===== */}
      <section className="relative pt-12 pb-20 md:py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Clean Editorial Typography */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <div className="flex items-center gap-2 mb-4 text-xs font-mono tracking-widest text-[#00f0ff] uppercase">
              <span className="w-2 h-2 rounded-full bg-[#ff007f]" />
              <span>Miami, FL — Director & Photographer</span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight leading-none mb-6">
              SHOT BY <br />
              <span className="text-[#ff007f]">IVIS</span>
            </h1>

            <p className="text-white/70 text-base sm:text-lg max-w-lg mb-8 leading-relaxed">
              Official portfolio for <b>@shotbyivis</b>. Specializing in high-end music video production, editorial portrait photography, and automotive visuals.
            </p>

            <div className="flex flex-wrap gap-4">
              <a 
                href="#portfolio"
                className="px-7 py-3.5 bg-[#ff007f] text-white text-xs font-extrabold uppercase tracking-wider rounded-lg hover:bg-[#ff007f]/90 transition-all flex items-center gap-2"
              >
                View Works <ChevronRight size={16} />
              </a>
              <a 
                href="https://www.instagram.com/shotbyivis/"
                target="_blank"
                rel="noreferrer"
                className="px-7 py-3.5 border border-white/20 hover:border-[#00f0ff] text-white hover:text-[#00f0ff] text-xs font-extrabold uppercase tracking-wider rounded-lg transition-all flex items-center gap-2"
              >
                <InstagramIcon size={16} /> Instagram @shotbyivis
              </a>
            </div>
          </div>

          {/* Right Column: Clean Slideshow Frame */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-[#121217] border border-white/10 shadow-2xl">
              <AnimatePresence mode="wait">
                <motion.img
                  key={slideIndex}
                  src={SLIDESHOW_IMAGES[slideIndex]}
                  alt="ShotByIvis Portfolio Work"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>

              {/* Bottom Info Bar */}
              <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-center justify-between">
                <span className="text-xs font-mono text-white/80 uppercase">
                  @shotbyivis ({slideIndex + 1}/{SLIDESHOW_IMAGES.length})
                </span>
                <div className="flex gap-1.5">
                  {SLIDESHOW_IMAGES.map((_, i) => (
                    <button 
                      key={i}
                      onClick={() => setSlideIndex(i)}
                      className={`h-1.5 rounded-full transition-all ${slideIndex === i ? 'w-5 bg-[#00f0ff]' : 'w-1.5 bg-white/40'}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ===== PORTFOLIO GRID ===== */}
      <section id="portfolio" className="py-20 px-6 border-t border-white/10 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs font-mono text-[#00f0ff] uppercase tracking-widest block mb-1">Selected Works</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight">PORTFOLIO</h2>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-md text-xs font-bold uppercase tracking-wider transition-all ${
                  activeCategory === cat 
                    ? 'bg-white text-black' 
                    : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Portfolio Masonry / Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4 }}
              className="group relative bg-[#0f0f14] border border-white/10 rounded-xl overflow-hidden cursor-pointer"
              onClick={() => setActiveMedia(item)}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-black">
                <img 
                  src={item.url} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="px-4 py-2 bg-white text-black text-xs font-bold uppercase tracking-wider rounded-md">View Work</span>
                </div>
              </div>

              <div className="p-4 flex items-center justify-between border-t border-white/5">
                <div>
                  <h3 className="font-bold text-sm text-white">{item.title}</h3>
                  <span className="text-xs text-white/50">{item.category}</span>
                </div>
                <ArrowUpRight size={16} className="text-white/40 group-hover:text-[#ff007f] transition-colors" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Instagram Direct Link Box */}
        <div className="mt-12 p-8 rounded-2xl bg-[#0f0f14] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <InstagramIcon size={32} className="text-[#ff007f]" />
            <div>
              <h3 className="font-bold text-lg text-white">More recent work on Instagram</h3>
              <p className="text-white/60 text-xs mt-0.5">Check out @shotbyivis for daily reels and behind the scenes footage.</p>
            </div>
          </div>
          <a
            href="https://www.instagram.com/shotbyivis/"
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3 bg-white text-black font-extrabold text-xs uppercase tracking-wider rounded-lg hover:bg-[#00f0ff] transition-all whitespace-nowrap"
          >
            Visit @shotbyivis ↗
          </a>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section id="services" className="py-20 px-6 border-t border-white/10 max-w-7xl mx-auto">
        <div className="mb-12">
          <span className="text-xs font-mono text-[#ff007f] uppercase tracking-widest block mb-1">Rates & Booking</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight">SERVICES</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((s) => (
            <div 
              key={s.id}
              className="p-6 rounded-2xl bg-[#0f0f14] border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between"
            >
              <div>
                <h3 className="text-lg font-bold text-white mb-1">{s.title}</h3>
                <div className="text-sm font-mono text-[#00f0ff] mb-4">{s.price}</div>
                <p className="text-xs text-white/60 leading-relaxed mb-6">{s.description}</p>
                <ul className="space-y-2 mb-6">
                  {s.features.map((feat) => (
                    <li key={feat} className="text-xs text-white/70 flex items-center gap-2">
                      <Check size={12} className="text-[#ff007f]" /> {feat}
                    </li>
                  ))}
                </ul>
              </div>

              <a 
                href="#contact"
                className="w-full py-2.5 rounded-lg border border-white/20 hover:border-[#ff007f] hover:bg-[#ff007f] text-white text-xs font-bold uppercase tracking-wider text-center transition-all"
              >
                Inquire Rates
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ===== CONTACT / BOOKING FORM ===== */}
      <section id="contact" className="py-20 px-6 border-t border-white/10 max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <span className="text-xs font-mono text-[#00f0ff] uppercase tracking-widest block mb-1">Get In Touch</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight">BOOK A SHOOT</h2>
        </div>

        <form onSubmit={handleBookingSubmit} className="bg-[#0f0f14] p-8 rounded-2xl border border-white/10 space-y-6">
          {bookedSuccess && (
            <div className="p-4 rounded-lg bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-[#00f0ff] text-xs font-bold text-center">
              Request Sent! Ivis will reach out to you directly via text/email.
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-xs font-bold uppercase text-white/60 block mb-2">Name</label>
              <input 
                type="text" 
                required
                placeholder="Full Name"
                value={bookingForm.name}
                onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#ff007f]"
              />
            </div>
            <div>
              <label className="text-xs font-bold uppercase text-white/60 block mb-2">Email or Phone</label>
              <input 
                type="text" 
                required
                placeholder="Contact Details"
                value={bookingForm.email}
                onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#ff007f]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-xs font-bold uppercase text-white/60 block mb-2">Service</label>
              <select 
                value={bookingForm.service}
                onChange={(e) => setBookingForm({ ...bookingForm, service: e.target.value })}
                className="w-full bg-[#16161d] border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#ff007f]"
              >
                <option value="Music Videos">Music Videos</option>
                <option value="Photoshoots">Photoshoots</option>
                <option value="Event Coverage">Event Coverage</option>
                <option value="Commercial / Brands">Commercial / Brands</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold uppercase text-white/60 block mb-2">Shoot Date</label>
              <input 
                type="date" 
                required
                value={bookingForm.date}
                onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#ff007f]"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold uppercase text-white/60 block mb-2">Notes / Vision</label>
            <textarea 
              rows={4}
              placeholder="Tell Ivis about your song, location or shoot details..."
              value={bookingForm.notes}
              onChange={(e) => setBookingForm({ ...bookingForm, notes: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#ff007f]"
            />
          </div>

          <button 
            type="submit"
            className="w-full py-4 bg-[#ff007f] hover:bg-[#ff007f]/90 text-white font-extrabold text-xs uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-2"
          >
            Submit Request <Send size={14} />
          </button>
        </form>
      </section>

      {/* ===== MEDIA FULLSCREEN MODAL ===== */}
      <AnimatePresence>
        {activeMedia && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setActiveMedia(null)}
          >
            <div 
              onClick={(e) => e.stopPropagation()}
              className="bg-[#0f0f14] p-4 rounded-2xl border border-white/20 max-w-3xl w-full relative"
            >
              <button 
                onClick={() => setActiveMedia(null)}
                className="absolute top-4 right-4 text-white/60 hover:text-white p-2"
              >
                <X size={20} />
              </button>

              <h3 className="text-xl font-bold text-white mb-3 pr-8">{activeMedia.title}</h3>

              <div className="relative rounded-lg overflow-hidden bg-black aspect-video mb-4">
                <img 
                  src={activeMedia.url} 
                  alt={activeMedia.title} 
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex items-center justify-between text-xs text-white/60">
                <p>{activeMedia.description}</p>
                <a 
                  href="https://www.instagram.com/shotbyivis/" 
                  target="_blank" 
                  rel="noreferrer"
                  className="text-[#ff007f] font-bold flex items-center gap-1"
                >
                  <InstagramIcon size={14} /> Instagram @shotbyivis
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-white/10 py-10 px-6 text-center text-xs text-white/40">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="ShotByIvis" className="h-6 w-auto" />
            <span className="font-bold text-white tracking-wider">SHOTBY<span className="text-[#ff007f]">IVIS</span></span>
          </div>
          <p>© 2026 ShotByIvis. All rights reserved. Miami, FL.</p>
          <a href="https://www.instagram.com/shotbyivis/" target="_blank" rel="noreferrer" className="text-white/60 hover:text-[#ff007f]">
            Instagram @shotbyivis
          </a>
        </div>
      </footer>

    </div>
  );
}
