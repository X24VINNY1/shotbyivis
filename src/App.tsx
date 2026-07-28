import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Camera, Play, Film, Music, Car, Send, Menu, X, ArrowUpRight,
  ChevronRight, CheckCircle2, Shield, Sparkles
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

// Data Arrays for Portfolio and Services
const PORTFOLIO_ITEMS = [
  {
    id: 'p1',
    title: 'Miami Nights — Music Video',
    category: 'Music Videos',
    type: 'video',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-party-lights-in-a-nightclub-43362-large.mp4',
    thumbnail: '/cyberpunk_miami_videography_1785202641353.jpg',
    description: 'Directed & shot cinematic visuals with hot pink & electric blue lighting for Miami hip hop single.',
    tag: 'Trending',
    views: '125K+'
  },
  {
    id: 'p2',
    title: 'South Beach Fashion Portraiture',
    category: 'Photography',
    type: 'image',
    thumbnail: '/model_photoshoot_1785202660894.jpg',
    description: 'High-fashion editorial night photoshoot under neon glow aesthetics on Ocean Drive.',
    tag: 'Editorial',
    views: '45K+'
  },
  {
    id: 'p3',
    title: 'Exotic Lambo Supercar Reel',
    category: 'Commercials',
    type: 'video',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-sports-car-driving-on-a-road-at-night-41555-large.mp4',
    thumbnail: '/exotic_car_shoot_1785202672117.jpg',
    description: '4K 60fps dynamic gimbal automotive showcase video with custom color grading.',
    tag: 'Featured',
    views: '210K+'
  },
  {
    id: 'p4',
    title: 'Vip Concert Stage Experience',
    category: 'Events',
    type: 'video',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-dj-playing-music-at-a-club-41527-large.mp4',
    thumbnail: '/music_video_shoot_1785202650901.jpg',
    description: 'Live performance recap featuring stage pyro, crowd energy, and multi-cam setup.',
    tag: 'Live Event',
    views: '88K+'
  },
  {
    id: 'p5',
    title: 'Luxury Brand Campaign',
    category: 'Photography',
    type: 'image',
    thumbnail: '/cyberpunk_miami_videography_1785202641353.jpg',
    description: 'Studio commercial product photography with vibrant cyberpunk reflections.',
    tag: 'Commercial',
    views: '62K+'
  },
  {
    id: 'p6',
    title: 'Cyberpunk Drone Cinema',
    category: 'Cinematography',
    type: 'video',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-city-lights-at-night-41524-large.mp4',
    thumbnail: '/cyberpunk_miami_videography_1785202641353.jpg',
    description: 'FPV drone aerial shots through downtown Miami skyscrapers under neon light.',
    tag: 'FPV Drone',
    views: '310K+'
  }
];

const SERVICES = [
  {
    id: 's1',
    title: 'Music Video Production',
    price: 'Starting at $1,200',
    icon: Film,
    accent: 'pink',
    features: [
      'Full 4K / 6K Cinema Camera Shooting',
      'Professional Gimbal & Drone Shots',
      'VFX Editing & Cyberpunk Color Grading',
      'Fast 3-Day Turnaround Delivery'
    ]
  },
  {
    id: 's2',
    title: 'Photoshoot Packages',
    price: 'Starting at $450',
    icon: Camera,
    accent: 'blue',
    features: [
      'Portrait, Fashion & Automotive Sessions',
      'High-End Retouching & Color Pop',
      '20+ Edits in Full Resolution',
      'Location Scouting Included'
    ]
  },
  {
    id: 's3',
    title: 'Events & Club Coverage',
    price: 'Starting at $800',
    icon: Music,
    accent: 'pink',
    features: [
      'Full Event Recap Video (1-2 Min Reel)',
      'High Energy Highlight Edit',
      'Same-Week Delivery Guaranteed',
      'Raw Footage Included Upon Request'
    ]
  },
  {
    id: 's4',
    title: 'Commercial & Brand Content',
    price: 'Starting at $1,500',
    icon: Car,
    accent: 'blue',
    features: [
      'Instagram/TikTok Reels Optimized',
      'Professional Sound Design & Audio Sync',
      'Custom Motion Graphics Logos',
      'Full Commercial Rights'
    ]
  }
];

export default function App() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeMedia, setActiveMedia] = useState<typeof PORTFOLIO_ITEMS[0] | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bookingForm, setBookingForm] = useState({ name: '', email: '', service: 'Music Video Production', date: '', notes: '' });
  const [bookedSuccess, setBookedSuccess] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const categories = ['All', 'Music Videos', 'Photography', 'Commercials', 'Events'];

  const filteredPortfolio = PORTFOLIO_ITEMS.filter(item => 
    activeCategory === 'All' || item.category === activeCategory
  );

  // Background Particles canvas (Hot Pink & Blue dots)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);

    const particles: { x: number; y: number; r: number; color: string; speedY: number; speedX: number; opacity: number }[] = [];
    const colors = ['#ff007f', '#00f0ff', '#ffffff'];

    for (let i = 0; i < 75; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2 + 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedY: Math.random() * 0.6 + 0.2,
        speedX: (Math.random() - 0.5) * 0.4,
        opacity: Math.random() * 0.5 + 0.2
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.fill();

        p.y -= p.speedY;
        p.x += p.speedX;

        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }
      }
      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookedSuccess(true);
    setTimeout(() => {
      setBookedSuccess(false);
      setBookingForm({ name: '', email: '', service: 'Music Video Production', date: '', notes: '' });
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-[#050508] text-white relative selection:bg-[#ff007f] selection:text-white">
      {/* Background Particle Canvas */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 opacity-40" />

      {/* Grid Pattern Overlay */}
      <div 
        className="fixed inset-0 pointer-events-none z-0 opacity-15"
        style={{
          backgroundImage: 'linear-gradient(rgba(0,240,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,0,127,0.2) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}
      />

      {/* Glow Orbs */}
      <div className="fixed top-20 left-10 w-96 h-96 bg-[#ff007f]/15 rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="fixed bottom-20 right-10 w-96 h-96 bg-[#00f0ff]/15 rounded-full blur-[140px] pointer-events-none z-0" />

      {/* ===== NAVBAR ===== */}
      <nav className="sticky top-0 z-50 glass-panel border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo with Transparent User Image */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="relative w-12 h-12 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#ff007f] to-[#00f0ff] blur-md opacity-70 group-hover:opacity-100 transition-opacity" />
              <img 
                src="/logo.png" 
                alt="ShotByIvis Logo" 
                className="w-11 h-11 object-contain relative z-10 animate-logo-float" 
              />
            </div>
            <span className="font-extrabold text-xl tracking-tight uppercase" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
              <span className="neon-text-pink">SHOTBY</span>
              <span className="neon-text-blue">IVIS</span>
            </span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold tracking-wider uppercase">
            {['Home', 'Portfolio', 'Services', 'About', 'Book Now'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="text-white/70 hover:text-white transition-colors relative py-1 group"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-[#ff007f] to-[#00f0ff] group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <a 
              href="https://www.instagram.com/shotbyivis/" 
              target="_blank" 
              rel="noreferrer"
              className="p-2.5 rounded-full glass-panel-pink text-[#ff007f] hover:scale-110 hover:shadow-[0_0_20px_rgba(255,0,127,0.6)] transition-all"
            >
              <InstagramIcon size={20} />
            </a>
            <a 
              href="#book-now"
              className="px-6 py-2.5 rounded-full font-bold uppercase tracking-wider text-xs bg-gradient-to-r from-[#ff007f] to-[#00f0ff] text-white shadow-[0_0_25px_rgba(255,0,127,0.5)] hover:shadow-[0_0_35px_rgba(0,240,255,0.8)] hover:scale-105 active:scale-95 transition-all"
            >
              Book Session
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-white/80 hover:text-white"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden glass-panel border-t border-white/10 px-6 py-4 flex flex-col gap-4 text-sm font-bold uppercase"
            >
              {['Home', 'Portfolio', 'Services', 'About', 'Book Now'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 border-b border-white/5 text-white/80 hover:text-[#00f0ff]"
                >
                  {item}
                </a>
              ))}
              <a 
                href="https://www.instagram.com/shotbyivis/" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-2 text-[#ff007f] py-2"
              >
                <InstagramIcon size={18} /> Instagram @shotbyivis
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ===== HERO SECTION — Reference Two-Column Layout ===== */}
      <section id="home" className="relative min-h-[90vh] flex items-center overflow-hidden py-12 md:py-0">
        <div className="max-w-7xl mx-auto px-6 w-full relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* Left: Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col text-center md:text-left"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel-pink w-fit mx-auto md:mx-0 mb-6">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff007f] animate-ping" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#ff007f] font-bold">
                Miami Videographer & Photographer
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-none tracking-tight mb-6" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
              <span className="neon-text-pink block">SHOTBY</span>
              <span className="neon-text-blue block">IVIS</span>
            </h1>

            <p className="text-white/70 text-base sm:text-lg max-w-lg mb-8 leading-relaxed mx-auto md:mx-0">
              High-end cinematic music videos, high fashion portrait photography, and Miami lifestyle visuals. Crafted with neon aesthetic and 4K cinema precision.
            </p>

            {/* Stats Counter Bar */}
            <div className="grid grid-cols-3 gap-4 p-4 rounded-2xl glass-panel border border-white/10 max-w-md mx-auto md:mx-0 mb-8">
              <div className="text-center">
                <div className="text-2xl font-black neon-text-pink">150+</div>
                <div className="text-[11px] text-white/50 uppercase tracking-widest font-mono">Videos Shot</div>
              </div>
              <div className="text-center border-x border-white/10">
                <div className="text-2xl font-black neon-text-blue">1M+</div>
                <div className="text-[11px] text-white/50 uppercase tracking-widest font-mono">Total Views</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-black text-white">4K 60FPS</div>
                <div className="text-[11px] text-white/50 uppercase tracking-widest font-mono">Quality</div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <a 
                href="#portfolio"
                className="px-8 py-4 rounded-xl font-bold uppercase tracking-wider text-sm bg-gradient-to-r from-[#ff007f] to-[#00f0ff] text-white shadow-[0_0_30px_rgba(255,0,127,0.6)] hover:shadow-[0_0_40px_rgba(0,240,255,0.9)] hover:scale-105 transition-all flex items-center gap-2"
              >
                View Portfolio <ChevronRight size={18} />
              </a>
              <a 
                href="#book-now"
                className="px-8 py-4 rounded-xl font-bold uppercase tracking-wider text-sm glass-panel border border-white/20 hover:border-[#00f0ff] hover:text-[#00f0ff] transition-all"
              >
                Get Quote
              </a>
            </div>
          </motion.div>

          {/* Right: 3D Animated Logo Emblem Visual */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center justify-center relative"
          >
            <div className="relative w-72 h-72 sm:w-96 sm:h-96 md:w-[440px] md:h-[440px] flex items-center justify-center">
              {/* Pulsing Back Ring */}
              <div className="absolute inset-0 rounded-full border-2 border-[#ff007f]/40 animate-ping opacity-30" />
              <div className="absolute inset-4 rounded-full border border-[#00f0ff]/40 animate-spin" style={{ animationDuration: '15s' }} />

              {/* Glowing Background Glow */}
              <div className="absolute inset-10 rounded-full bg-gradient-to-tr from-[#ff007f]/30 via-purple-600/20 to-[#00f0ff]/30 blur-3xl animate-neon-pulse" />

              {/* 3D Floating Logo */}
              <div className="relative z-10 w-full h-full p-8 animate-logo-float">
                <img 
                  src="/logo.png" 
                  alt="ShotByIvis 3D Emblem" 
                  className="w-full h-full object-contain filter drop-shadow-[0_0_30px_rgba(255,0,127,0.7)] drop-shadow-[0_0_60px_rgba(0,240,255,0.5)]" 
                />
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ===== PORTFOLIO GALLERY ===== */}
      <section id="portfolio" className="py-24 px-6 relative z-10 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-12">
            <span className="text-xs font-mono uppercase tracking-widest neon-text-blue font-bold">Featured Work</span>
            <h2 className="text-4xl md:text-5xl font-black uppercase mt-2 tracking-tight" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
              <span className="neon-text-pink">VISUAL</span> <span className="text-white">PORTFOLIO</span>
            </h2>
            <p className="text-white/60 text-sm max-w-md mx-auto mt-2">
              Browse recent music videos, photoshoots, and creative projects shot across Miami.
            </p>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mt-8">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                    activeCategory === cat 
                      ? 'bg-gradient-to-r from-[#ff007f] to-[#00f0ff] text-white shadow-[0_0_20px_rgba(255,0,127,0.5)]' 
                      : 'glass-panel text-white/60 hover:text-white hover:border-white/30'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Portfolio Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPortfolio.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8 }}
                className="group relative rounded-2xl overflow-hidden glass-panel border border-white/10 hover:border-[#ff007f]/50 transition-all shadow-xl"
              >
                {/* Media Image / Thumbnail */}
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={item.thumbnail} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-transparent opacity-80" />

                  {/* Play Button Overlay for Videos */}
                  {item.type === 'video' && (
                    <button 
                      onClick={() => setActiveMedia(item)}
                      className="absolute inset-0 flex items-center justify-center group-hover:scale-110 transition-transform"
                    >
                      <div className="w-14 h-14 rounded-full bg-[#ff007f]/80 text-white flex items-center justify-center shadow-[0_0_25px_rgba(255,0,127,0.9)] backdrop-blur-md">
                        <Play size={24} className="ml-1 fill-white" />
                      </div>
                    </button>
                  )}

                  {/* Badge */}
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest glass-panel-pink text-[#ff007f]">
                    {item.tag}
                  </span>
                </div>

                {/* Content Details */}
                <div className="p-6">
                  <div className="flex items-center justify-between text-xs text-white/50 mb-2">
                    <span>{item.category}</span>
                    <span className="neon-text-blue font-mono">{item.views} views</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                    {item.title}
                  </h3>
                  <p className="text-white/60 text-xs leading-relaxed mb-4">
                    {item.description}
                  </p>

                  <button 
                    onClick={() => setActiveMedia(item)}
                    className="w-full py-2.5 rounded-xl glass-panel border border-white/10 hover:border-[#00f0ff] hover:text-[#00f0ff] text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2"
                  >
                    Watch Visual <ArrowUpRight size={14} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== SERVICES & PACKAGES ===== */}
      <section id="services" className="py-24 px-6 relative z-10 bg-[#08080f] border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-16">
            <span className="text-xs font-mono uppercase tracking-widest neon-text-pink font-bold">Rates & Packages</span>
            <h2 className="text-4xl md:text-5xl font-black uppercase mt-2 tracking-tight" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
              <span className="text-white">SHOOTING</span> <span className="neon-text-blue">SERVICES</span>
            </h2>
            <p className="text-white/60 text-sm max-w-md mx-auto mt-2">
              Transparent pricing for video shoots, photoshoots, and event coverage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((s) => {
              const Icon = s.icon;
              const isPink = s.accent === 'pink';
              return (
                <motion.div
                  key={s.id}
                  whileHover={{ y: -8 }}
                  className={`rounded-2xl p-6 glass-panel border ${
                    isPink ? 'hover:border-[#ff007f]/60' : 'hover:border-[#00f0ff]/60'
                  } transition-all flex flex-col justify-between`}
                >
                  <div>
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${
                      isPink ? 'glass-panel-pink text-[#ff007f]' : 'glass-panel-blue text-[#00f0ff]'
                    }`}>
                      <Icon size={24} />
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                      {s.title}
                    </h3>
                    <div className={`text-lg font-black font-mono mb-6 ${isPink ? 'neon-text-pink' : 'neon-text-blue'}`}>
                      {s.price}
                    </div>

                    <ul className="space-y-3 mb-8">
                      {s.features.map((feat) => (
                        <li key={feat} className="flex items-center gap-2 text-xs text-white/70">
                          <CheckCircle2 size={14} className={isPink ? 'text-[#ff007f]' : 'text-[#00f0ff]'} />
                          {feat}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <a 
                    href="#book-now"
                    className={`w-full py-3 rounded-xl font-bold uppercase tracking-wider text-xs text-center transition-all ${
                      isPink 
                        ? 'bg-[#ff007f] text-white hover:shadow-[0_0_25px_rgba(255,0,127,0.7)]' 
                        : 'bg-[#00f0ff] text-black hover:shadow-[0_0_25px_rgba(0,240,255,0.7)]'
                    }`}
                  >
                    Select Package
                  </a>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== ABOUT SECTION ===== */}
      <section id="about" className="py-24 px-6 relative z-10 border-t border-white/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          
          <div className="relative flex justify-center">
            <div className="w-80 h-80 sm:w-96 sm:h-96 rounded-3xl overflow-hidden glass-panel p-4 border border-[#00f0ff]/40 shadow-[0_0_50px_rgba(0,240,255,0.2)]">
              <img 
                src="/cyberpunk_miami_videography_1785202641353.jpg" 
                alt="Ivis Behind the Lens" 
                className="w-full h-full object-cover rounded-2xl" 
              />
            </div>
            <div className="absolute -bottom-6 -right-2 glass-panel-pink p-4 rounded-2xl border border-[#ff007f]">
              <div className="flex items-center gap-3">
                <Camera size={24} className="text-[#ff007f]" />
                <div>
                  <div className="text-xs text-white/60 font-mono">LOCATION</div>
                  <div className="text-sm font-bold text-white">Miami, Florida</div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <span className="text-xs font-mono uppercase tracking-widest neon-text-blue font-bold">Behind the Camera</span>
            <h2 className="text-4xl md:text-5xl font-black uppercase mt-2 mb-6 tracking-tight" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
              <span className="text-white">MEET</span> <span className="neon-text-pink">IVIS</span>
            </h2>
            
            <p className="text-white/70 text-base leading-relaxed mb-4">
              ShotByIvis is a premier Miami-based videographer and photographer specializing in music videos, model portfolio shoots, luxury automotive content, and high-energy event coverage.
            </p>
            <p className="text-white/70 text-base leading-relaxed mb-8">
              With a signature cyberpunk synthwave aesthetic blending electric blue and hot pink neon tones, every frame is crafted to look like a blockbuster film.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl glass-panel border border-white/10">
                <Shield size={20} className="text-[#00f0ff] mb-2" />
                <div className="font-bold text-sm text-white">Pro Gear</div>
                <div className="text-xs text-white/50">RED & Sony Cinema Line</div>
              </div>
              <div className="p-4 rounded-xl glass-panel border border-white/10">
                <Sparkles size={20} className="text-[#ff007f] mb-2" />
                <div className="font-bold text-sm text-white">Fast Turnaround</div>
                <div className="text-xs text-white/50">3-5 Days Full Edit</div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ===== BOOKING FORM ===== */}
      <section id="book-now" className="py-24 px-6 relative z-10 bg-[#08080f] border-t border-white/10">
        <div className="max-w-3xl mx-auto">
          
          <div className="text-center mb-12">
            <span className="text-xs font-mono uppercase tracking-widest neon-text-pink font-bold">Reserve Your Date</span>
            <h2 className="text-4xl md:text-5xl font-black uppercase mt-2 tracking-tight" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
              <span className="neon-text-blue">BOOK</span> <span className="text-white">A SHOOT</span>
            </h2>
            <p className="text-white/60 text-sm max-w-md mx-auto mt-2">
              Fill out the form below to lock in your shoot date with Ivis.
            </p>
          </div>

          <form onSubmit={handleBookingSubmit} className="glass-panel p-8 rounded-3xl border border-white/10 shadow-2xl space-y-6">
            {bookedSuccess && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }} 
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-xl glass-panel-blue text-[#00f0ff] text-sm text-center font-bold flex items-center justify-center gap-2"
              >
                <CheckCircle2 size={18} /> Shooting Request Received! Ivis will text/email you within 2 hours.
              </motion.div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-white/60 mb-2 block">Your Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="Enter full name"
                  value={bookingForm.name}
                  onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 focus:border-[#ff007f] rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-white/60 mb-2 block">Email / Phone</label>
                <input 
                  type="text" 
                  required
                  placeholder="Email or phone number"
                  value={bookingForm.email}
                  onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 focus:border-[#00f0ff] rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-white/60 mb-2 block">Service Type</label>
                <select 
                  value={bookingForm.service}
                  onChange={(e) => setBookingForm({ ...bookingForm, service: e.target.value })}
                  className="w-full bg-[#12121c] border border-white/10 focus:border-[#ff007f] rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                >
                  <option value="Music Video Production">Music Video Production</option>
                  <option value="Photoshoot Package">Photoshoot Package</option>
                  <option value="Events & Club Coverage">Events & Club Coverage</option>
                  <option value="Commercial Shoot">Commercial Shoot</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-white/60 mb-2 block">Preferred Shoot Date</label>
                <input 
                  type="date" 
                  required
                  value={bookingForm.date}
                  onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 focus:border-[#00f0ff] rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-white/60 mb-2 block">Project Details / Vision</label>
              <textarea 
                rows={4}
                placeholder="Tell Ivis about your song, location preference, or shoot vision..."
                value={bookingForm.notes}
                onChange={(e) => setBookingForm({ ...bookingForm, notes: e.target.value })}
                className="w-full bg-white/5 border border-white/10 focus:border-[#ff007f] rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors"
              />
            </div>

            <button 
              type="submit"
              className="w-full py-4 rounded-xl font-bold uppercase tracking-wider text-sm bg-gradient-to-r from-[#ff007f] to-[#00f0ff] text-white shadow-[0_0_30px_rgba(255,0,127,0.6)] hover:shadow-[0_0_40px_rgba(0,240,255,0.9)] hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
            >
              Submit Booking Request <Send size={16} />
            </button>
          </form>
        </div>
      </section>

      {/* ===== MEDIA MODAL ===== */}
      <AnimatePresence>
        {activeMedia && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setActiveMedia(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-panel p-4 md:p-6 rounded-3xl border border-white/20 max-w-4xl w-full relative"
            >
              <button 
                onClick={() => setActiveMedia(null)}
                className="absolute top-4 right-4 text-white/60 hover:text-white p-2 rounded-full glass-panel"
              >
                <X size={20} />
              </button>

              <h3 className="text-2xl font-bold text-white mb-4 pr-10" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
                {activeMedia.title}
              </h3>

              <div className="relative rounded-2xl overflow-hidden bg-black aspect-video mb-4">
                {activeMedia.type === 'video' ? (
                  <video 
                    src={activeMedia.videoUrl} 
                    controls 
                    autoPlay 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img 
                    src={activeMedia.thumbnail} 
                    alt={activeMedia.title} 
                    className="w-full h-full object-cover"
                  />
                )}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-white/70">
                <p>{activeMedia.description}</p>
                <a 
                  href="https://www.instagram.com/shotbyivis/" 
                  target="_blank" 
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-[#ff007f] text-white font-bold text-xs flex items-center gap-2 hover:scale-105 transition-all"
                >
                  <InstagramIcon size={14} /> Follow @shotbyivis
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-white/10 bg-[#030305] py-12 px-6 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="ShotByIvis Logo" className="w-8 h-8 object-contain" />
            <span className="font-extrabold text-lg uppercase tracking-tight" style={{ fontFamily: "'Rajdhani', sans-serif" }}>
              <span className="neon-text-pink">SHOTBY</span>
              <span className="neon-text-blue">IVIS</span>
            </span>
          </div>

          <p className="text-white/40 text-xs text-center md:text-left">
            © 2026 ShotByIvis. All rights reserved. Miami Videography & Photography.
          </p>

          <div className="flex items-center gap-4">
            <a href="https://www.instagram.com/shotbyivis/" target="_blank" rel="noreferrer" className="text-white/60 hover:text-[#ff007f] text-xs flex items-center gap-1 transition-colors">
              <InstagramIcon size={16} /> @shotbyivis
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}
