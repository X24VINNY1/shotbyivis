import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { 
  Camera, Film, Send, Menu, X, ArrowUpRight,
  ChevronRight, ChevronLeft, ChevronDown, Check, Plus, Trash2, ZoomIn,
  Shield, Lock, LogOut, Calendar, Save, Edit, Edit2,
  Search, Bell, Sparkles, User, Box, Grid, ShieldCheck, BarChart3, Settings
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

// Background Particle Canvas
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const particles = Array.from({ length: 30 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2 + 1,
      color: Math.random() > 0.5 ? '#ff007f' : '#00f0ff',
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.4 + 0.1
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="particle-canvas" />;
}

// Inline Editable Text Component for Live Editor Mode
function EditableText({
  value,
  onChange,
  isLiveEditing,
  className = "",
  placeholder = "Edit text..."
}: {
  value: string;
  onChange: (val: string) => void;
  isLiveEditing: boolean;
  className?: string;
  placeholder?: string;
}) {
  const spanRef = useRef<HTMLSpanElement | null>(null);

  if (!isLiveEditing) {
    return <span className={className}>{value}</span>;
  }

  return (
    <span
      ref={spanRef}
      contentEditable
      suppressContentEditableWarning
      onBlur={() => {
        if (spanRef.current) {
          const text = spanRef.current.innerText;
          onChange(text);
        }
      }}
      className={`${className} outline-none border-b-2 border-dashed border-[#00f0ff] hover:bg-white/10 px-1 py-0.5 rounded cursor-text focus:border-[#ff007f] transition-all inline-block`}
      title="Click to edit visually"
    >
      {value || placeholder}
    </span>
  );
}

export interface PostItem {
  id: string;
  title: string;
  category: string;
  type: 'video' | 'image';
  url: string;
  thumb?: string;
  description: string;
}

export interface BookingItem {
  id: string;
  name: string;
  email: string;
  service: string;
  addOns: string[];
  date: string;
  notes: string;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Declined';
  timestamp: string;
}

export interface StaffAccount {
  id: string;
  username: string;
  name: string;
  role: 'owner' | 'staff';
  pass: string;
}

export interface SiteConfig {
  // Brand Header
  brandPink: string;
  brandBlue: string;
  headerCtaText: string;
  
  // Hero Section
  heroBadgeTagline: string;
  heroHeadline1: string;
  heroHeadline2: string;
  heroSubtext: string;
  heroBtnPrimary: string;
  heroBtnSecondary: string;

  // Portfolio Section
  portfolioTag: string;
  portfolioTitle: string;
  igBannerTitle: string;
  igBannerSub: string;
  instagramHandle: string;

  // Music Videos Package
  mvTitle: string;
  mvPrice: string;
  mvDesc: string;
  mvFeat1: string;
  mvFeat2: string;
  mvFeat3: string;

  // Photoshoot Package
  photoTitle: string;
  photoPrice: string;
  photoDesc: string;
  photoFeat1: string;
  photoFeat2: string;
  photoFeat3: string;

  // About Section
  aboutTag: string;
  aboutTitle: string;
  aboutBio: string;
  stat1Value: string;
  stat1Label: string;
  stat2Value: string;
  stat2Label: string;

  // Booking Wizard Section
  bookingTag: string;
  bookingTitle: string;

  // Footer
  footerCopyright: string;
}

const DEFAULT_SITE_CONFIG: SiteConfig = {
  brandPink: 'SHOTBY',
  brandBlue: 'IVIS',
  headerCtaText: 'Book Shoot',

  heroBadgeTagline: 'Miami Videography & Photography',
  heroHeadline1: 'SHOT BY',
  heroHeadline2: 'IVIS',
  heroSubtext: 'Music Videos · Photoshoots · Cinema Production',
  heroBtnPrimary: 'View Portfolio',
  heroBtnSecondary: 'Book a Shoot',

  portfolioTag: 'Real Works',
  portfolioTitle: 'PORTFOLIO GALLERY',
  igBannerTitle: 'Follow @shotbyivis On Instagram',
  igBannerSub: 'Daily music video clips, reels, and behind-the-scenes content.',
  instagramHandle: '@shotbyivis',

  mvTitle: 'Music Videos',
  mvPrice: '4K 60FPS CONTENT · WITH MIX + EFFECTS',
  mvDesc: 'Full 4K/6K cinema camera shooting, direction, editing & color grading for singles and albums.',
  mvFeat1: '4K 60FPS High Frame Rate Cinema Recording',
  mvFeat2: 'WITH MIX + EFFECTS (Sound & Color VFX)',
  mvFeat3: 'Full Video Direction & Shot List',

  photoTitle: 'Photoshoots',
  photoPrice: 'Regular Shoot & Retouching',
  photoDesc: 'Fashion, portrait, and automotive photography sessions on location in Miami or indoor studio.',
  photoFeat1: '20 High-Res Professionally Edited Photos',
  photoFeat2: 'Studio or Miami Location Shooting',
  photoFeat3: 'Skin Retouching & Color Correction',

  aboutTag: 'Behind the Lens',
  aboutTitle: 'ABOUT IVIS',
  aboutBio: 'ShotByIvis is a premier Miami-based videographer and photographer with a sharp cinema eye. Specializing in high-energy music videos and model portraiture. Equipped with RED & Sony cinema line gear, every production is shot with intention and color graded to perfection.',
  stat1Value: '150+',
  stat1Label: 'Sessions Shot',
  stat2Value: '4K 60fps',
  stat2Label: 'Cinema Quality',

  bookingTag: 'Interactive Reservation Engine',
  bookingTitle: 'ADVANCED BOOKING WIZARD',

  footerCopyright: '© 2026 ShotByIvis. All rights reserved. Miami, FL.'
};

const DEFAULT_STAFF: StaffAccount[] = [
  { id: 'usr_owner1', username: 'ivis', name: 'Ivis (Owner)', role: 'owner', pass: 'ivis2026' },
  { id: 'usr_staff1', username: 'staff1', name: 'Staff Member', role: 'staff', pass: 'staff123' },
];

const SLIDESHOW_ITEMS = [
  { url: '/slideshow/slide1.jpg', title: 'Miami Night Music Video Shoot', category: 'Music Videos' },
  { url: '/slideshow/slide2.jpg', title: 'South Beach Model Editorial', category: 'Photography' },
  { url: '/slideshow/slide3.jpg', title: 'Exotic Supercar Showcase', category: 'Photography' },
  { url: '/slideshow/slide4.jpg', title: 'VIP Stage Performance', category: 'Music Videos' },
  { url: '/slideshow/slide5.jpg', title: 'High-Fashion Studio Portraiture', category: 'Photography' },
  { url: '/slideshow/slide6.jpg', title: 'Ocean Drive Lifestyle Content', category: 'Photography' },
];

const REAL_INSTAGRAM_POSTS: PostItem[] = [
  {
    id: 'ig1',
    title: 'Miami Night Shoot — Reel',
    category: 'Music Videos',
    type: 'image',
    url: '/slideshow/slide1.jpg',
    thumb: '/slideshow/slide1.jpg',
    description: 'Cinematic music video production on location in Miami.'
  },
  {
    id: 'ig2',
    title: 'South Beach Editorial',
    category: 'Photography',
    type: 'image',
    url: '/slideshow/slide2.jpg',
    thumb: '/slideshow/slide2.jpg',
    description: 'High-fashion portraiture with neon color grading & studio retouching.'
  },
  {
    id: 'ig3',
    title: 'Exotic Automotive Shoot',
    category: 'Photography',
    type: 'image',
    url: '/slideshow/slide3.jpg',
    thumb: '/slideshow/slide3.jpg',
    description: 'Supercar photo session under Miami streetlights.'
  },
  {
    id: 'ig4',
    title: 'VIP Stage Reel',
    category: 'Music Videos',
    type: 'image',
    url: '/slideshow/slide4.jpg',
    thumb: '/slideshow/slide4.jpg',
    description: 'Live stage performance video shot with 4K cinema gear.'
  },
  {
    id: 'ig5',
    title: 'Urban Cyberpunk Portraiture',
    category: 'Photography',
    type: 'image',
    url: '/slideshow/slide5.jpg',
    thumb: '/slideshow/slide5.jpg',
    description: 'Synthwave color palette & sharp studio portraiture.'
  },
  {
    id: 'ig6',
    title: 'Downtown Skyline Shoot',
    category: 'Photography',
    type: 'image',
    url: '/slideshow/slide6.jpg',
    thumb: '/slideshow/slide6.jpg',
    description: 'Creative lifestyle production under Ocean Drive neon lights.'
  }
];

// Production Features / Add-ons for Music Videos
const MV_ADDONS = [
  { id: 'mv1', name: '4K 60FPS CONTENT', desc: 'Ultra-smooth 4K 60fps high frame rate cinema recording.' },
  { id: 'mv2', name: 'WITH MIX + EFFECTS', desc: 'Custom audio sync mix, neon color grading & trippy visual VFX.' },
  { id: 'mv3', name: '4K Aerial Drone Footage', desc: 'Licensed overhead drone operator for aerial shots.' },
  { id: 'mv4', name: '24-Hour Express Turnaround', desc: 'Priority video editing delivered within 24 hours of shoot.' },
  { id: 'mv5', name: 'Raw Uncut Video Files', desc: 'Full high-res original unedited footage files on drive.' },
  { id: 'mv6', name: 'Studio Location Booking', desc: 'Private indoor studio rental in Miami.' }
];

// Production Features / Add-ons for Photoshoots
const PHOTO_ADDONS = [
  { id: 'ph1', name: 'Regular Shoot & Retouching', desc: 'Standard photoshoot session with 20 high-res edited photos.' },
  { id: 'ph2', name: 'Studio Location Rental', desc: 'Private indoor studio rental in Miami.' },
  { id: 'ph3', name: '24-Hour Express Delivery', desc: 'Priority photo gallery delivery within 24 hours.' },
  { id: 'ph4', name: 'All Raw High-Res Photos', desc: 'Full uncompressed camera RAW image files.' },
  { id: 'ph5', name: 'Skin Retouching & Color Grading', desc: 'High-end fashion skin retouching & color correction.' }
];

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [view, setView] = useState<'site' | 'admin-login' | 'admin-panel'>('site');
  const [adminTab, setAdminTab] = useState<'overview' | 'bookings' | 'portfolio' | 'cms' | 'staff'>('overview');

  // Live Visual Editor State
  const [isLiveEditing, setIsLiveEditing] = useState(false);
  const [hasUnsavedLiveEdits, setHasUnsavedLiveEdits] = useState(false);

  // Site Configuration (CMS) State
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(() => {
    try {
      const saved = localStorage.getItem('shotbyivis_site_config');
      return saved ? { ...DEFAULT_SITE_CONFIG, ...JSON.parse(saved) } : DEFAULT_SITE_CONFIG;
    } catch {
      return DEFAULT_SITE_CONFIG;
    }
  });

  const updateConfigField = (key: keyof SiteConfig, val: string) => {
    setSiteConfig(prev => {
      const next = { ...prev, [key]: val };
      return next;
    });
    setHasUnsavedLiveEdits(true);
  };

  const handleSaveLiveEdits = () => {
    localStorage.setItem('shotbyivis_site_config', JSON.stringify(siteConfig));
    setHasUnsavedLiveEdits(false);
    alert('✨ Live visual edits saved to website!');
  };

  // Posts State
  const [posts, setPosts] = useState<PostItem[]>(() => {
    try {
      const saved = localStorage.getItem('shotbyivis_real_posts');
      return saved && JSON.parse(saved).length > 0 ? JSON.parse(saved) : REAL_INSTAGRAM_POSTS;
    } catch {
      return REAL_INSTAGRAM_POSTS;
    }
  });

  // Bookings State
  const [bookings, setBookings] = useState<BookingItem[]>(() => {
    try {
      const saved = localStorage.getItem('shotbyivis_bookings');
      return saved ? JSON.parse(saved) : [
        {
          id: 'bk_sample1',
          name: 'Alex Johnson',
          email: 'alex@example.com',
          service: 'Music Videos',
          addOns: ['4K 60FPS CONTENT', 'WITH MIX + EFFECTS', '4K Aerial Drone Footage'],
          date: '2026-08-15',
          notes: 'Shooting music video at South Beach rooftop location.',
          status: 'Confirmed',
          timestamp: '10:30 AM'
        },
        {
          id: 'bk_sample2',
          name: 'Marcus Vance',
          email: 'marcus@visuals.com',
          service: 'Photoshoot Session',
          addOns: ['Regular Shoot & Retouching', 'Studio Location Rental'],
          date: '2026-08-20',
          notes: 'Studio portrait shoot in Miami.',
          status: 'Confirmed',
          timestamp: '02:15 PM'
        }
      ];
    } catch {
      return [];
    }
  });

  // Staff Accounts State
  const [staffAccounts, setStaffAccounts] = useState<StaffAccount[]>(() => {
    try {
      const saved = localStorage.getItem('shotbyivis_staff');
      return saved && JSON.parse(saved).length > 0 ? JSON.parse(saved) : DEFAULT_STAFF;
    } catch {
      return DEFAULT_STAFF;
    }
  });

  // Current Logged In Staff
  const [currentStaff, setCurrentStaff] = useState<StaffAccount | null>(() => {
    try {
      const saved = localStorage.getItem('shotbyivis_current_staff');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Login Form State
  const [loginUser, setLoginUser] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [loginError, setLoginError] = useState('');

  // New Staff Account Form State
  const [newStaffUser, setNewStaffUser] = useState('');
  const [newStaffName, setNewStaffName] = useState('');
  const [newStaffPass, setNewStaffPass] = useState('');
  const [newStaffRole, setNewStaffRole] = useState<'owner' | 'staff'>('staff');

  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedLightboxIndex, setSelectedLightboxIndex] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);

  // Edit Post Modal State
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<PostItem | null>(null);

  const [newPost, setNewPost] = useState<{
    title: string;
    category: string;
    type: 'video' | 'image';
    url: string;
    description: string;
  }>({
    title: '',
    category: 'Music Videos',
    type: 'video',
    url: '',
    description: ''
  });

  // Advanced Wizard Booking State
  const [bookingStep, setBookingStep] = useState<1 | 2 | 3>(1);
  const [selectedService, setSelectedService] = useState<'Music Videos' | 'Photography'>('Music Videos');
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [clientName, setClientName] = useState('');
  const [clientContact, setClientContact] = useState('');
  const [shootDate, setShootDate] = useState('');
  const [shootNotes, setShootNotes] = useState('');
  const [bookedSuccess, setBookedSuccess] = useState(false);

  const categories = ['All', 'Music Videos', 'Photography'];

  const currentAddonsList = selectedService === 'Music Videos' ? MV_ADDONS : PHOTO_ADDONS;

  const filteredPosts = posts.filter(item => 
    activeCategory === 'All' || item.category === activeCategory
  );

  // Fullscreen Slideshow Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDESHOW_ITEMS.length);
    }, 5500);
    return () => clearInterval(timer);
  }, []);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    const found = staffAccounts.find(s => s.username.toLowerCase() === loginUser.trim().toLowerCase() && s.pass === loginPass);
    if (found) {
      setCurrentStaff(found);
      localStorage.setItem('shotbyivis_current_staff', JSON.stringify(found));
      setView('site');
      setIsLiveEditing(true);
      setLoginUser('');
      setLoginPass('');
    } else {
      setLoginError('Invalid Username or Password.');
    }
  };

  const handleLogout = () => {
    setCurrentStaff(null);
    setIsLiveEditing(false);
    localStorage.removeItem('shotbyivis_current_staff');
    setView('site');
  };

  const handleSaveCMS = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('shotbyivis_site_config', JSON.stringify(siteConfig));
    alert('Full site content saved successfully!');
  };

  const handleCreateStaff = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStaffUser.trim() || !newStaffPass.trim()) return;

    const created: StaffAccount = {
      id: 'usr_' + Math.random().toString(36).slice(2, 9),
      username: newStaffUser.trim().toLowerCase(),
      name: newStaffName.trim() || newStaffUser.trim(),
      role: newStaffRole,
      pass: newStaffPass.trim()
    };

    const updated = [...staffAccounts, created];
    setStaffAccounts(updated);
    localStorage.setItem('shotbyivis_staff', JSON.stringify(updated));

    setNewStaffUser('');
    setNewStaffName('');
    setNewStaffPass('');
    setNewStaffRole('staff');
  };

  const handleDeleteStaff = (id: string) => {
    if (staffAccounts.length <= 1) return;
    const updated = staffAccounts.filter(s => s.id !== id);
    setStaffAccounts(updated);
    localStorage.setItem('shotbyivis_staff', JSON.stringify(updated));
  };

  const handleAddPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.title || !newPost.url) return;

    const created: PostItem = {
      id: Math.random().toString(36).slice(2, 9),
      ...newPost,
      thumb: newPost.url
    };

    const updated = [created, ...posts];
    setPosts(updated);
    localStorage.setItem('shotbyivis_real_posts', JSON.stringify(updated));
    setAddModalOpen(false);
    setNewPost({ title: '', category: 'Music Videos', type: 'video', url: '', description: '' });
  };

  const handleOpenEditPost = (item: PostItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setEditingPost({ ...item });
    setEditModalOpen(true);
  };

  const handleSaveEditPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPost) return;

    const updated = posts.map(p => p.id === editingPost.id ? { ...editingPost, thumb: editingPost.url } : p);
    setPosts(updated);
    localStorage.setItem('shotbyivis_real_posts', JSON.stringify(updated));
    setEditModalOpen(false);
    setEditingPost(null);
  };

  const updatePostTitleOrDesc = (id: string, field: 'title' | 'description', val: string) => {
    const updated = posts.map(p => p.id === id ? { ...p, [field]: val } : p);
    setPosts(updated);
    localStorage.setItem('shotbyivis_real_posts', JSON.stringify(updated));
    setHasUnsavedLiveEdits(true);
  };

  const handleDeletePost = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = posts.filter(p => p.id !== id);
    setPosts(updated);
    localStorage.setItem('shotbyivis_real_posts', JSON.stringify(updated));
  };

  const toggleAddon = (name: string) => {
    if (selectedAddons.includes(name)) {
      setSelectedAddons(selectedAddons.filter(a => a !== name));
    } else {
      setSelectedAddons([...selectedAddons, name]);
    }
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newBooking: BookingItem = {
      id: 'bk_' + Math.random().toString(36).slice(2, 9),
      name: clientName,
      email: clientContact,
      service: selectedService,
      addOns: selectedAddons,
      date: shootDate,
      notes: shootNotes,
      status: 'Pending',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updated = [newBooking, ...bookings];
    setBookings(updated);
    localStorage.setItem('shotbyivis_bookings', JSON.stringify(updated));

    setBookedSuccess(true);
    setTimeout(() => {
      setBookedSuccess(false);
      setBookingStep(1);
      setClientName('');
      setClientContact('');
      setShootDate('');
      setShootNotes('');
      setSelectedAddons([]);
    }, 5000);
  };

  const updateBookingStatus = (id: string, status: BookingItem['status']) => {
    const updated = bookings.map(b => b.id === id ? { ...b, status } : b);
    setBookings(updated);
    localStorage.setItem('shotbyivis_bookings', JSON.stringify(updated));
  };

  const scrollTo = (id: string) => {
    if (view !== 'site') setView('site');
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
    setMobileMenuOpen(false);
  };

  // ===== EXACT VOID RP / ZEN2K ENTERPRISE ADMIN DASHBOARD =====
  if (view === 'admin-panel' && currentStaff) {
    return (
      <div className="min-h-screen bg-[#050508] text-white font-sans flex relative overflow-hidden selection:bg-[#ff007f] selection:text-white">
        
        {/* ===== LEFT ENTERPRISE SIDEBAR ===== */}
        <aside className="w-64 bg-[#08080c] border-r border-white/10 flex flex-col justify-between p-5 z-20 shrink-0">
          <div className="space-y-6">
            
            {/* Header: Logo & Status */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <img src="/logo.png" alt="ShotByIvis Logo" className="h-8 w-auto object-contain" />
                <div>
                  <div className="font-extrabold text-sm tracking-wider font-heading uppercase">
                    SHOTBY<span className="neon-text-pink">IVIS</span>
                  </div>
                  <div className="text-[9px] font-mono text-white/50">v4.8 PRO · SECURED</div>
                </div>
              </div>
              <button className="p-1.5 rounded-lg border border-white/10 text-white/40 hover:text-white">
                <ChevronLeft size={14} />
              </button>
            </div>

            {/* Navigation Tabs (Zen2K Pill Style) */}
            <nav className="space-y-1.5 text-xs font-bold uppercase tracking-wider">
              <button
                onClick={() => setAdminTab('overview')}
                className={`w-full py-2.5 px-4 rounded-full flex items-center justify-between transition-all ${
                  adminTab === 'overview'
                    ? 'bg-white text-black font-extrabold shadow-md'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className="flex items-center gap-2.5"><BarChart3 size={15} /> Analytics & Overview</span>
                {adminTab === 'overview' && <span className="w-2 h-2 rounded-full bg-black" />}
              </button>

              <button
                onClick={() => setAdminTab('bookings')}
                className={`w-full py-2.5 px-4 rounded-full flex items-center justify-between transition-all ${
                  adminTab === 'bookings'
                    ? 'bg-white text-black font-extrabold shadow-md'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className="flex items-center gap-2.5"><Calendar size={15} /> Shoot Inquiries</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${adminTab === 'bookings' ? 'bg-black text-white' : 'bg-white/10 text-white/80'}`}>{bookings.length}</span>
              </button>

              <button
                onClick={() => setAdminTab('portfolio')}
                className={`w-full py-2.5 px-4 rounded-full flex items-center justify-between transition-all ${
                  adminTab === 'portfolio'
                    ? 'bg-white text-black font-extrabold shadow-md'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className="flex items-center gap-2.5"><Camera size={15} /> Product Catalog</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${adminTab === 'portfolio' ? 'bg-black text-white' : 'bg-white/10 text-white/80'}`}>{posts.length}</span>
              </button>

              <button
                onClick={() => setAdminTab('cms')}
                className={`w-full py-2.5 px-4 rounded-full flex items-center justify-between transition-all ${
                  adminTab === 'cms'
                    ? 'bg-white text-black font-extrabold shadow-md'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className="flex items-center gap-2.5"><Settings size={15} /> System Configuration</span>
              </button>

              {currentStaff.role === 'owner' && (
                <button
                  onClick={() => setAdminTab('staff')}
                  className={`w-full py-2.5 px-4 rounded-full flex items-center justify-between transition-all ${
                    adminTab === 'staff'
                      ? 'bg-white text-black font-extrabold shadow-md'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span className="flex items-center gap-2.5"><ShieldCheck size={15} /> Security & Audit Trail</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${adminTab === 'staff' ? 'bg-black text-white' : 'bg-white/10 text-white/80'}`}>{staffAccounts.length}</span>
                </button>
              )}
            </nav>
          </div>

          {/* Bottom Actions */}
          <div className="space-y-2.5 pt-4 border-t border-white/10">
            <button 
              onClick={() => { setView('site'); setIsLiveEditing(true); }} 
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#ff007f] to-[#00f0ff] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
            >
              ⚡ Launch Visual Live Editor
            </button>
            <button 
              onClick={handleLogout} 
              className="w-full py-2.5 rounded-xl bg-red-500/20 border border-red-500/40 text-red-400 hover:bg-red-500 hover:text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
            >
              <LogOut size={14} /> Log Out
            </button>
          </div>
        </aside>

        {/* ===== RIGHT ENTERPRISE MAIN AREA ===== */}
        <main className="flex-1 overflow-y-auto bg-[#040406] p-8 flex flex-col justify-between">
          
          <div>
            {/* Top Enterprise Command Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-3 bg-[#0a0a0e] border border-white/10 px-4 py-2 rounded-full w-full max-w-md">
                <Search size={16} className="text-white/40" />
                <input 
                  type="text" 
                  placeholder="Search commands, shoot orders..."
                  className="bg-transparent text-xs text-white placeholder-white/40 focus:outline-none w-full"
                />
                <span className="text-[10px] font-mono bg-white/10 px-2 py-0.5 rounded text-white/60">Ctrl + K</span>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-[#0a0a0e] border border-white/10 px-3 py-1.5 rounded-full text-[10px] font-mono">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-white/70 font-bold uppercase">SHA-256 API SERVER ACTIVE</span>
                </div>

                <button 
                  onClick={() => setAddModalOpen(true)}
                  className="px-5 py-2 rounded-full bg-white text-black font-extrabold text-xs uppercase tracking-wider hover:bg-white/90 transition-all flex items-center gap-1.5 shadow-md"
                >
                  + Quick Action <ChevronDown size={14} />
                </button>

                <div className="flex items-center gap-2">
                  <button className="p-2 rounded-full border border-white/10 text-white/60 hover:text-white">
                    <Bell size={16} />
                  </button>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#ff007f] to-[#00f0ff] flex items-center justify-center font-bold text-xs text-white font-heading">
                    {currentStaff.name[0]}
                  </div>
                  <button onClick={handleLogout} className="p-2 rounded-full border border-white/10 text-white/60 hover:text-red-400">
                    <LogOut size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* ===== TAB 0: EXECUTIVE ANALYTICS & OVERVIEW ===== */}
            {adminTab === 'overview' && (
              <div className="space-y-8">
                
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <h1 className="text-2xl font-black uppercase tracking-tight font-heading flex items-center gap-2">
                      EXECUTIVE ANALYTICS & OVERVIEW <Sparkles size={20} className="text-[#00f0ff]" />
                    </h1>
                    <p className="text-xs text-white/50 mt-1">Real-time telemetry, transaction metrics, and production status</p>
                  </div>

                  <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono uppercase text-white/60 tracking-widest font-bold">
                    PERIOD: LAST 30 DAYS
                  </span>
                </div>

                {/* 4 Metric Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-6 rounded-2xl bg-[#09090e] border border-white/10 space-y-4">
                    <div className="flex items-center justify-between text-xs font-mono uppercase text-white/50 font-bold">
                      <span>SHOOT BOOKINGS</span>
                      <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center text-white/60">
                        <BarChart3 size={16} />
                      </div>
                    </div>
                    <div className="text-3xl font-black text-white font-heading">{bookings.length}</div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold flex items-center gap-1">
                        ↗ +18.4%
                      </span>
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl bg-[#09090e] border border-white/10 space-y-4">
                    <div className="flex items-center justify-between text-xs font-mono uppercase text-white/50 font-bold">
                      <span>COMPLETED PRODUCTIONS</span>
                      <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center text-white/60">
                        <Box size={16} />
                      </div>
                    </div>
                    <div className="text-3xl font-black text-white font-heading">{bookings.length}</div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold flex items-center gap-1">
                        ↗ +12.1%
                      </span>
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl bg-[#09090e] border border-white/10 space-y-4">
                    <div className="flex items-center justify-between text-xs font-mono uppercase text-white/50 font-bold">
                      <span>REGISTERED CLIENTS</span>
                      <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center text-white/60">
                        <User size={16} />
                      </div>
                    </div>
                    <div className="text-3xl font-black text-white font-heading">48</div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold flex items-center gap-1">
                        ↗ +8.5%
                      </span>
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl bg-[#09090e] border border-white/10 space-y-4">
                    <div className="flex items-center justify-between text-xs font-mono uppercase text-white/50 font-bold">
                      <span>ACTIVE PORTFOLIO WORKS</span>
                      <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center text-white/60">
                        <Grid size={16} />
                      </div>
                    </div>
                    <div className="text-3xl font-black text-white font-heading">{posts.length}</div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold">
                        ~ Optimal
                      </span>
                    </div>
                  </div>
                </div>

                {/* Middle Charts & Distribution Split */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  <div className="lg:col-span-2 p-6 rounded-2xl bg-[#09090e] border border-white/10 flex flex-col justify-between space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-bold text-sm text-white uppercase tracking-wider font-heading flex items-center gap-2">
                          📈 PRODUCTION TRAJECTORY
                        </h3>
                        <p className="text-xs text-white/40">30-day cumulative shoot activity</p>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] font-mono uppercase text-white/60 font-bold">
                        PEAK: 4K 60FPS
                      </span>
                    </div>

                    <div className="relative w-full h-48 flex items-end">
                      <svg className="w-full h-full overflow-visible" viewBox="0 0 500 150" fill="none">
                        <path 
                          d="M 0 110 Q 120 130 250 80 T 500 20 L 500 150 L 0 150 Z" 
                          fill="url(#chartGradient)" 
                        />
                        <path 
                          d="M 0 110 Q 120 130 250 80 T 500 20" 
                          stroke="white" 
                          strokeWidth="3" 
                          fill="none" 
                        />
                        <circle cx="250" cy="80" r="5" fill="white" />
                        <circle cx="500" cy="20" r="5" fill="white" />
                        <defs>
                          <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.2" />
                            <stop offset="100%" stopColor="#000000" stopOpacity="0.8" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>

                    <div className="flex justify-between text-[10px] font-mono text-white/40 uppercase border-t border-white/5 pt-3">
                      <span>WEEK 1</span>
                      <span>WEEK 2</span>
                      <span>WEEK 3</span>
                      <span>WEEK 4</span>
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl bg-[#09090e] border border-white/10 flex flex-col justify-between space-y-6">
                    <div>
                      <h3 className="font-bold text-sm text-white uppercase tracking-wider font-heading flex items-center gap-2 mb-1">
                        🎬 PRODUCTION VOLUME
                      </h3>
                      <p className="text-xs text-white/40">Distribution by service type</p>

                      <div className="space-y-4 mt-6">
                        <div>
                          <div className="flex justify-between text-xs font-bold text-white mb-1.5">
                            <span>Music Videos</span>
                            <span className="font-mono text-white/70">64%</span>
                          </div>
                          <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                            <div className="h-full bg-white rounded-full" style={{ width: '64%' }} />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-xs font-bold text-white mb-1.5">
                            <span>Photoshoots</span>
                            <span className="font-mono text-white/70">28%</span>
                          </div>
                          <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                            <div className="h-full bg-[#ff007f] rounded-full" style={{ width: '28%' }} />
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-xs font-bold text-white mb-1.5">
                            <span>Commercial & Other</span>
                            <span className="font-mono text-white/70">8%</span>
                          </div>
                          <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                            <div className="h-full bg-[#00f0ff] rounded-full" style={{ width: '8%' }} />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between text-xs">
                      <span className="text-white/60">Fulfillment Success Rate</span>
                      <span className="font-mono font-extrabold text-emerald-400">99.98%</span>
                    </div>
                  </div>
                </div>

                {/* Recent Transactions Table */}
                <div className="p-6 rounded-2xl bg-[#09090e] border border-white/10 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-sm text-white uppercase tracking-wider font-heading flex items-center gap-2">
                      🔄 RECENT SHOOT ORDERS
                    </h3>
                    <span className="text-[10px] font-mono text-white/40 uppercase">Showing latest requests</span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs text-white/70">
                      <thead className="text-[10px] font-mono uppercase text-white/40 border-b border-white/10">
                        <tr>
                          <th className="py-3 px-4">ORDER ID</th>
                          <th className="py-3 px-4">CLIENT</th>
                          <th className="py-3 px-4">SERVICE</th>
                          <th className="py-3 px-4">DATE</th>
                          <th className="py-3 px-4">STATUS</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {bookings.map((b) => (
                          <tr key={b.id} className="hover:bg-white/5 transition-colors">
                            <td className="py-3 px-4 font-mono font-bold text-white">#{b.id}</td>
                            <td className="py-3 px-4 font-bold text-white">{b.name}</td>
                            <td className="py-3 px-4 font-mono text-[#00f0ff]">{b.service}</td>
                            <td className="py-3 px-4 font-mono">{b.date}</td>
                            <td className="py-3 px-4">
                              <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase ${
                                b.status === 'Confirmed' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                              }`}>
                                {b.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            )}

            {/* TAB 1: SHOOT BOOKINGS */}
            {adminTab === 'bookings' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-black uppercase tracking-tight font-heading">Shoot Order Management</h2>
                  <span className="text-xs font-mono text-white/50">{bookings.length} Total Requests</span>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {bookings.map((b) => (
                    <div key={b.id} className="p-6 rounded-2xl bg-[#09090e] border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-base text-white font-heading">{b.name}</span>
                          <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase ${
                            b.status === 'Confirmed' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                          }`}>
                            {b.status}
                          </span>
                        </div>
                        <div className="text-xs text-white/60 font-mono">
                          Service: <span className="text-white font-bold">{b.service}</span> | Date: <span className="text-white">{b.date}</span>
                        </div>
                        {b.addOns && b.addOns.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {b.addOns.map(addon => (
                              <span key={addon} className="px-2.5 py-0.5 rounded-full bg-white/10 border border-white/15 text-[10px] font-mono text-[#00f0ff]">
                                ✓ {addon}
                              </span>
                            ))}
                          </div>
                        )}
                        <div className="text-xs text-white/50">Contact: {b.email}</div>
                        {b.notes && <div className="text-xs text-white/80 bg-white/5 p-3 rounded-lg border border-white/5">"{b.notes}"</div>}
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        <button 
                          onClick={() => updateBookingStatus(b.id, 'Confirmed')}
                          className="px-3.5 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-white text-xs font-bold uppercase transition-all"
                        >
                          Confirm
                        </button>
                        <button 
                          onClick={() => updateBookingStatus(b.id, 'Completed')}
                          className="px-3.5 py-1.5 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500 hover:text-white text-xs font-bold uppercase transition-all"
                        >
                          Completed
                        </button>
                        <button 
                          onClick={() => updateBookingStatus(b.id, 'Declined')}
                          className="px-3.5 py-1.5 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white text-xs font-bold uppercase transition-all"
                        >
                          Decline
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 2: PORTFOLIO MANAGEMENT */}
            {adminTab === 'portfolio' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-black uppercase tracking-tight font-heading">Product & Portfolio Catalog</h2>
                  <button
                    onClick={() => setAddModalOpen(true)}
                    className="px-5 py-2 rounded-full bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-white/90 transition-all shadow-md"
                  >
                    + Add New Item
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {posts.map((item) => (
                    <div key={item.id} className="p-4 rounded-2xl bg-[#09090e] border border-white/10 flex flex-col justify-between gap-4">
                      <div className="relative aspect-video rounded-xl overflow-hidden bg-black">
                        <img src={item.url} alt={item.title} className="w-full h-full object-cover" />
                        <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase bg-black/80 text-[#00f0ff] border border-white/10">
                          {item.category}
                        </span>
                      </div>

                      <div>
                        <h3 className="font-bold text-sm text-white font-heading">{item.title}</h3>
                        <p className="text-xs text-white/50 mt-0.5 truncate">{item.description}</p>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => handleOpenEditPost(item)}
                          className="w-1/2 py-2 rounded-xl bg-[#00f0ff]/15 border border-[#00f0ff]/30 text-[#00f0ff] hover:bg-[#00f0ff] hover:text-black text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5"
                        >
                          <Edit2 size={13} /> Edit Item
                        </button>
                        <button
                          onClick={(e) => handleDeletePost(item.id, e)}
                          className="w-1/2 py-2 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500 hover:text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5"
                        >
                          <Trash2 size={13} /> Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: FULL SITE EDITOR */}
            {adminTab === 'cms' && (
              <form onSubmit={handleSaveCMS} className="space-y-8 bg-[#09090e] p-8 rounded-2xl border border-white/10">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div>
                    <h2 className="text-xl font-black uppercase tracking-tight font-heading">FULL SITE CONTENT EDITOR</h2>
                    <p className="text-xs text-white/40 mt-1">Edit any text, headline, feature, or section across the entire website.</p>
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-white/90 transition-all shadow-md"
                  >
                    Save All Changes
                  </button>
                </div>

                {/* Section 1: Header & Brand */}
                <div className="space-y-4 border-b border-white/5 pb-6">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#00f0ff] font-heading">1. Header & Brand Typography</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-[10px] font-mono font-bold uppercase text-white/50 block mb-1">Brand Pink Name</label>
                      <input 
                        type="text" 
                        value={siteConfig.brandPink}
                        onChange={(e) => updateConfigField('brandPink', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-white"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-mono font-bold uppercase text-white/50 block mb-1">Brand Blue Name</label>
                      <input 
                        type="text" 
                        value={siteConfig.brandBlue}
                        onChange={(e) => updateConfigField('brandBlue', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-white"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-mono font-bold uppercase text-white/50 block mb-1">Header Button Label</label>
                      <input 
                        type="text" 
                        value={siteConfig.headerCtaText}
                        onChange={(e) => updateConfigField('headerCtaText', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 2: Hero Banner */}
                <div className="space-y-4 border-b border-white/5 pb-6">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#ff007f] font-heading">2. Hero Banner Section</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-mono font-bold uppercase text-white/50 block mb-1">Pill Badge Tagline</label>
                      <input 
                        type="text" 
                        value={siteConfig.heroBadgeTagline}
                        onChange={(e) => updateConfigField('heroBadgeTagline', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-white"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-mono font-bold uppercase text-white/50 block mb-1">Subtext Line</label>
                      <input 
                        type="text" 
                        value={siteConfig.heroSubtext}
                        onChange={(e) => updateConfigField('heroSubtext', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-mono font-bold uppercase text-white/50 block mb-1">Hero Main Title Line 1</label>
                      <input 
                        type="text" 
                        value={siteConfig.heroHeadline1}
                        onChange={(e) => updateConfigField('heroHeadline1', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-white"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-mono font-bold uppercase text-white/50 block mb-1">Hero Main Title Line 2 (Glowing)</label>
                      <input 
                        type="text" 
                        value={siteConfig.heroHeadline2}
                        onChange={(e) => updateConfigField('heroHeadline2', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 3: Packages & Services */}
                <div className="space-y-4 border-b border-white/5 pb-6">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-[#00f0ff] font-heading">3. Shooting Packages & Specifications</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* MV Package */}
                    <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-3">
                      <div className="font-bold text-xs text-white">Music Video Package</div>
                      <div>
                        <label className="text-[9px] font-mono uppercase text-white/50 block mb-1">Package Title</label>
                        <input 
                          type="text" 
                          value={siteConfig.mvTitle}
                          onChange={(e) => updateConfigField('mvTitle', e.target.value)}
                          className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="text-[9px] font-mono uppercase text-white/50 block mb-1">Package Tagline</label>
                        <input 
                          type="text" 
                          value={siteConfig.mvPrice}
                          onChange={(e) => updateConfigField('mvPrice', e.target.value)}
                          className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="text-[9px] font-mono uppercase text-white/50 block mb-1">Description</label>
                        <textarea 
                          rows={2}
                          value={siteConfig.mvDesc}
                          onChange={(e) => updateConfigField('mvDesc', e.target.value)}
                          className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs text-white"
                        />
                      </div>
                    </div>

                    {/* Photo Package */}
                    <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-3">
                      <div className="font-bold text-xs text-white">Photoshoot Package</div>
                      <div>
                        <label className="text-[9px] font-mono uppercase text-white/50 block mb-1">Package Title</label>
                        <input 
                          type="text" 
                          value={siteConfig.photoTitle}
                          onChange={(e) => updateConfigField('photoTitle', e.target.value)}
                          className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="text-[9px] font-mono uppercase text-white/50 block mb-1">Package Tagline</label>
                        <input 
                          type="text" 
                          value={siteConfig.photoPrice}
                          onChange={(e) => updateConfigField('photoPrice', e.target.value)}
                          className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="text-[9px] font-mono uppercase text-white/50 block mb-1">Description</label>
                        <textarea 
                          rows={2}
                          value={siteConfig.photoDesc}
                          onChange={(e) => updateConfigField('photoDesc', e.target.value)}
                          className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-xs text-white"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-white text-black font-extrabold text-xs uppercase tracking-widest hover:bg-white/90 transition-all shadow-md"
                >
                  Save Full Site Configuration
                </button>
              </form>
            )}

            {/* TAB 4: SECURITY & STAFF LOGINS */}
            {adminTab === 'staff' && currentStaff.role === 'owner' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-black uppercase tracking-tight font-heading">Security & Staff Audit Trail</h2>
                    <p className="text-xs text-white/40 mt-1">Manage team login credentials and access privileges.</p>
                  </div>
                </div>

                <form onSubmit={handleCreateStaff} className="p-6 rounded-2xl bg-[#09090e] border border-white/10 space-y-4">
                  <h3 className="font-bold text-xs text-white uppercase tracking-wider flex items-center gap-2 font-heading">
                    <Plus size={14} /> Create Staff Login Account
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                    <div>
                      <label className="text-[10px] font-mono uppercase text-white/50 block mb-1">Username</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="e.g. cameraman1"
                        value={newStaffUser}
                        onChange={(e) => setNewStaffUser(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-white"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-mono uppercase text-white/50 block mb-1">Full Name</label>
                      <input 
                        type="text" 
                        placeholder="Staff Name"
                        value={newStaffName}
                        onChange={(e) => setNewStaffName(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-white"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-mono uppercase text-white/50 block mb-1">Password</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="Set Password"
                        value={newStaffPass}
                        onChange={(e) => setNewStaffPass(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-white"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-mono uppercase text-white/50 block mb-1">Role</label>
                      <select 
                        value={newStaffRole}
                        onChange={(e) => setNewStaffRole(e.target.value as 'owner' | 'staff')}
                        className="w-full bg-[#14141d] border border-white/10 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-white"
                      >
                        <option value="staff">Staff Member</option>
                        <option value="owner">Full Owner Access</option>
                      </select>
                    </div>
                  </div>

                  <button 
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-white text-black font-bold text-xs uppercase tracking-wider hover:bg-white/90 transition-all"
                  >
                    Create Account
                  </button>
                </form>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {staffAccounts.map((s) => (
                    <div key={s.id} className="p-5 rounded-2xl bg-[#09090e] border border-white/10 flex items-center justify-between gap-4">
                      <div className="space-y-1">
                        <div className="font-bold text-sm text-white flex items-center gap-2 font-heading">
                          {s.name}
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase ${
                            s.role === 'owner' ? 'bg-[#ff007f]/20 text-[#ff007f]' : 'bg-[#00f0ff]/20 text-[#00f0ff]'
                          }`}>
                            {s.role}
                          </span>
                        </div>
                        <div className="text-xs text-white/50 font-mono">User: <span className="text-white font-bold">{s.username}</span></div>
                        <div className="text-xs text-white/40 font-mono">Pass: <span className="text-white/80">{s.pass}</span></div>
                      </div>

                      {staffAccounts.length > 1 && s.username !== 'ivis' && (
                        <button
                          onClick={() => handleDeleteStaff(s.id)}
                          className="p-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all"
                          title="Delete account"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          <div className="text-center text-[10px] font-mono text-white/30 uppercase pt-8">
            SHOTBYIVIS ENTERPRISE ADMIN ENGINE © 2026. ALL RIGHTS RESERVED.
          </div>
        </main>
      </div>
    );
  }

  // ===== ADMIN LOGIN VIEW =====
  if (view === 'admin-login') {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-6 relative overflow-hidden">
        <ParticleCanvas />
        <div className="w-full max-w-md p-8 rounded-3xl bg-[#0c0c12]/95 border border-white/15 shadow-2xl space-y-6 relative z-10 backdrop-blur-2xl">
          <div className="text-center space-y-2">
            <img src="/logo.png" alt="ShotByIvis Logo" className="h-14 w-auto object-contain mx-auto" />
            <h2 className="text-2xl font-black uppercase tracking-tight font-heading">Staff & Owner Portal</h2>
            <p className="text-xs text-white/60">Log in to manage bookings, portfolio & staff accounts.</p>
          </div>

          {loginError && (
            <div className="p-3.5 rounded-xl bg-red-500/20 border border-red-500/40 text-red-400 text-xs font-bold text-center">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="text-[10px] font-mono uppercase font-bold text-white/70 block mb-1">Username</label>
              <input 
                type="text" 
                required 
                placeholder="Username (e.g. ivis)"
                value={loginUser}
                onChange={(e) => setLoginUser(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#ff007f]"
              />
            </div>

            <div>
              <label className="text-[10px] font-mono uppercase font-bold text-white/70 block mb-1">Password</label>
              <input 
                type="password" 
                required 
                placeholder="Password"
                value={loginPass}
                onChange={(e) => setLoginPass(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00f0ff]"
              />
            </div>

            <button 
              type="submit"
              className="w-full py-3.5 bg-gradient-to-r from-[#ff007f] to-[#00f0ff] text-white font-bold text-xs uppercase tracking-widest rounded-xl shadow-lg hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
            >
              <Shield size={16} /> Sign In to Panel
            </button>
          </form>

          <button 
            onClick={() => setView('site')}
            className="w-full text-center text-xs text-white/50 hover:text-white transition-colors block pt-2"
          >
            ← Return to Website
          </button>
        </div>
      </div>
    );
  }

  // ===== MAIN PUBLIC WEBSITE VIEW =====
  return (
    <div className="min-h-screen bg-[#050508] text-white selection:bg-[#ff007f] selection:text-white font-sans overflow-x-hidden relative">
      <ParticleCanvas />

      {/* ===== FLOATING VISUAL LIVE EDITOR TOP BAR (WHEN LOGGED IN) ===== */}
      {currentStaff && (
        <div className="fixed top-0 inset-x-0 z-50 bg-[#07070c]/95 border-b border-[#00f0ff]/50 px-6 py-2.5 backdrop-blur-2xl flex items-center justify-between shadow-2xl text-xs font-mono">
          <div className="flex items-center gap-3">
            <span className={`w-2.5 h-2.5 rounded-full ${isLiveEditing ? 'bg-[#00f0ff] animate-ping' : 'bg-white/40'}`} />
            <span className="font-extrabold uppercase text-white tracking-wider flex items-center gap-2">
              <Edit size={14} className="text-[#00f0ff]" /> VISUAL LIVE EDITOR
            </span>
            <span className="text-white/60 hidden md:inline">
              {isLiveEditing ? '⚡ Click any text or portfolio item to edit live!' : '(Editor currently paused)'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsLiveEditing(!isLiveEditing)}
              className={`px-4 py-1.5 rounded-full font-bold uppercase tracking-wider text-[10px] transition-all ${
                isLiveEditing 
                  ? 'bg-[#00f0ff] text-black shadow-[0_0_15px_#00f0ff]' 
                  : 'bg-white/10 text-white border border-white/20 hover:border-white'
              }`}
            >
              {isLiveEditing ? 'Editor ACTIVE (Click Text)' : 'Enable Live Editor'}
            </button>

            {hasUnsavedLiveEdits && (
              <button
                onClick={handleSaveLiveEdits}
                className="px-4 py-1.5 rounded-full bg-gradient-to-r from-[#ff007f] to-[#00f0ff] text-white font-extrabold text-[10px] uppercase tracking-widest shadow-lg animate-bounce flex items-center gap-1.5"
              >
                <Save size={12} /> Save Live Changes
              </button>
            )}

            <button
              onClick={() => setView('admin-panel')}
              className="px-3 py-1.5 rounded-full border border-white/20 text-white/80 hover:text-white text-[10px] uppercase"
            >
              Admin Dashboard →
            </button>
          </div>
        </div>
      )}

      {/* Floating Save Widget Bottom-Right */}
      {hasUnsavedLiveEdits && (
        <button
          onClick={handleSaveLiveEdits}
          className="fixed bottom-6 right-6 z-50 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#ff007f] to-[#00f0ff] text-white font-black text-xs uppercase tracking-widest shadow-[0_0_30px_rgba(255,0,127,0.8)] hover:scale-105 transition-all flex items-center gap-2"
        >
          <Save size={16} /> Save Visual Changes
        </button>
      )}

      {/* ===== HEADER / NAVBAR ===== */}
      <header className={`fixed inset-x-0 z-40 bg-[#050508]/85 backdrop-blur-2xl border-b border-white/10 transition-all ${currentStaff ? 'top-10' : 'top-0'}`}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group">
            <img src="/logo.png" alt="ShotByIvis Logo" className="h-10 w-auto object-contain transition-transform group-hover:scale-105" />
            <span className="font-extrabold text-2xl tracking-wider text-white font-heading">
              <EditableText value={siteConfig.brandPink} onChange={(v) => updateConfigField('brandPink', v)} isLiveEditing={isLiveEditing} />
              <span className="neon-text-pink">
                <EditableText value={siteConfig.brandBlue} onChange={(v) => updateConfigField('brandBlue', v)} isLiveEditing={isLiveEditing} />
              </span>
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-[0.2em] font-semibold text-white/80">
            <button onClick={() => scrollTo('home')} className="hover:text-[#00f0ff] transition-colors">Home</button>
            <button onClick={() => scrollTo('portfolio')} className="hover:text-[#00f0ff] transition-colors">Portfolio</button>
            <button onClick={() => scrollTo('services')} className="hover:text-[#00f0ff] transition-colors">Services</button>
            <button onClick={() => scrollTo('about')} className="hover:text-[#00f0ff] transition-colors">About</button>
            <button onClick={() => scrollTo('contact')} className="hover:text-[#00f0ff] transition-colors">Contact</button>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            {currentStaff ? (
              <button
                onClick={() => setView('admin-panel')}
                className="px-4 py-2 rounded-full border border-[#00f0ff]/60 text-[#00f0ff] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 hover:bg-[#00f0ff] hover:text-black transition-all"
              >
                <Shield size={14} /> Admin Dashboard
              </button>
            ) : (
              <button
                onClick={() => setView('admin-login')}
                className="px-4 py-2 rounded-full border border-white/20 text-white/80 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 hover:border-white hover:text-white transition-all"
              >
                <Lock size={14} /> Staff Login
              </button>
            )}

            <a 
              href="https://www.instagram.com/shotbyivis/" 
              target="_blank" 
              rel="noreferrer"
              className="p-2.5 rounded-full border border-white/15 text-white/90 hover:text-[#ff007f] hover:border-[#ff007f] transition-all"
            >
              <InstagramIcon size={18} />
            </a>
            <button 
              onClick={() => scrollTo('contact')}
              className="px-6 py-2.5 rounded-full font-bold uppercase tracking-widest text-xs bg-gradient-to-r from-[#ff007f] to-[#00f0ff] text-white shadow-[0_0_20px_rgba(255,0,127,0.5)] hover:scale-105 transition-all"
            >
              <EditableText value={siteConfig.headerCtaText} onChange={(v) => updateConfigField('headerCtaText', v)} isLiveEditing={isLiveEditing} />
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 text-white/90">
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
              className="md:hidden bg-[#0a0a0d] border-b border-white/10 px-6 py-4 flex flex-col gap-4 text-xs font-bold uppercase tracking-wider"
            >
              <button onClick={() => scrollTo('home')} className="text-left py-2 text-white/90">Home</button>
              <button onClick={() => scrollTo('portfolio')} className="text-left py-2 text-white/90">Portfolio</button>
              <button onClick={() => scrollTo('services')} className="text-left py-2 text-white/90">Services</button>
              <button onClick={() => scrollTo('about')} className="text-left py-2 text-white/90">About</button>
              <button onClick={() => scrollTo('contact')} className="text-left py-2 text-white/90">Contact</button>
              <button onClick={() => setView('admin-login')} className="text-left py-2 text-[#ff007f] flex items-center gap-2">
                <Lock size={16} /> Staff / Owner Panel
              </button>
              <a href="https://www.instagram.com/shotbyivis/" target="_blank" rel="noreferrer" className="py-2 text-[#00f0ff] flex items-center gap-2">
                <InstagramIcon size={16} /> Instagram {siteConfig.instagramHandle}
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ===== HERO SECTION ===== */}
      <section id="home" className="relative h-screen w-full overflow-hidden bg-[#050508] flex items-center justify-center">
        <AnimatePresence mode="sync">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute inset-0"
          >
            <img
              src={SLIDESHOW_ITEMS[currentSlide].url}
              alt={SLIDESHOW_ITEMS[currentSlide].title}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/40 to-[#050508]/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050508]/60 via-transparent to-[#050508]/60" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center pt-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="flex flex-col items-center"
          >
            <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full border border-[#ff007f]/50 bg-[#ff007f]/15 mb-6 backdrop-blur-md">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff007f] animate-ping" />
              <span className="text-[11px] font-mono uppercase tracking-[0.3em] text-[#ff007f] font-bold">
                <EditableText value={siteConfig.heroBadgeTagline} onChange={(v) => updateConfigField('heroBadgeTagline', v)} isLiveEditing={isLiveEditing} />
              </span>
            </div>

            <h1
              className="text-white leading-[1.02] mb-6 font-black uppercase tracking-tight font-heading"
              style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}
            >
              <EditableText value={siteConfig.heroHeadline1} onChange={(v) => updateConfigField('heroHeadline1', v)} isLiveEditing={isLiveEditing} />{' '}
              <span className="neon-text-pink">
                <EditableText value={siteConfig.heroHeadline2} onChange={(v) => updateConfigField('heroHeadline2', v)} isLiveEditing={isLiveEditing} />
              </span>
            </h1>

            <div className="flex items-center gap-3 mb-10 flex-wrap justify-center text-white/80 text-[12px] font-mono uppercase tracking-[0.2em] font-medium">
              <span>
                <EditableText value={siteConfig.heroSubtext} onChange={(v) => updateConfigField('heroSubtext', v)} isLiveEditing={isLiveEditing} />
              </span>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={() => scrollTo('portfolio')}
                className="px-9 py-4 bg-gradient-to-r from-[#ff007f] to-[#00f0ff] text-white tracking-[0.2em] uppercase text-xs font-bold rounded-full shadow-[0_0_25px_rgba(255,0,127,0.6)] hover:scale-105 transition-all"
              >
                <EditableText value={siteConfig.heroBtnPrimary} onChange={(v) => updateConfigField('heroBtnPrimary', v)} isLiveEditing={isLiveEditing} />
              </button>
              <button
                onClick={() => scrollTo('contact')}
                className="px-9 py-4 border border-white/30 text-white/90 tracking-[0.2em] uppercase text-xs font-bold rounded-full hover:border-[#00f0ff] hover:text-[#00f0ff] hover:bg-[#00f0ff]/10 transition-all"
              >
                <EditableText value={siteConfig.heroBtnSecondary} onChange={(v) => updateConfigField('heroBtnSecondary', v)} isLiveEditing={isLiveEditing} />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-2.5 z-20">
          {SLIDESHOW_ITEMS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className="h-1.5 rounded-full transition-all duration-500 cursor-pointer"
              style={{
                width: idx === currentSlide ? '40px' : '16px',
                background: idx === currentSlide ? '#00f0ff' : 'rgba(255,255,255,0.4)',
                boxShadow: idx === currentSlide ? '0 0 12px #00f0ff' : 'none'
              }}
            />
          ))}
        </div>

        <div className="absolute bottom-20 right-10 text-white/60 hidden md:block font-mono text-xs tracking-widest z-20 font-bold">
          0{currentSlide + 1} / 0{SLIDESHOW_ITEMS.length}
        </div>

        <button
          onClick={() => scrollTo('portfolio')}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 hover:text-white transition-colors duration-300 z-20 animate-bounce"
        >
          <ChevronDown size={28} />
        </button>
      </section>

      {/* ===== PORTFOLIO SECTION ===== */}
      <motion.section 
        id="portfolio" 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="py-28 px-6 max-w-7xl mx-auto border-t border-white/10 relative z-10"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <span className="text-[11px] font-mono text-[#00f0ff] uppercase tracking-[0.4em] block mb-2 font-bold">
              <EditableText value={siteConfig.portfolioTag} onChange={(v) => updateConfigField('portfolioTag', v)} isLiveEditing={isLiveEditing} />
            </span>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight font-heading">
              <EditableText value={siteConfig.portfolioTitle} onChange={(v) => updateConfigField('portfolioTitle', v)} isLiveEditing={isLiveEditing} />
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                  activeCategory === cat 
                    ? 'bg-gradient-to-r from-[#ff007f] to-[#00f0ff] text-white shadow-[0_0_20px_rgba(255,0,127,0.5)]' 
                    : 'bg-white/5 border border-white/15 text-white/80 hover:text-white hover:border-white/40'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
          <Masonry gutter="24px">
            {filteredPosts.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -8 }}
                transition={{ type: 'spring', stiffness: 120, damping: 15 }}
                className="group relative rounded-2xl overflow-hidden glass-card glass-card-hover cursor-pointer shadow-2xl"
                onClick={() => setSelectedLightboxIndex(idx)}
              >
                <div className="relative overflow-hidden bg-black">
                  <img
                    src={item.thumb || item.url}
                    alt={item.title}
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-14 h-14 rounded-full bg-[#ff007f]/90 text-white flex items-center justify-center shadow-[0_0_25px_#ff007f]">
                      <ZoomIn size={24} />
                    </div>
                  </div>

                  {currentStaff && (
                    <div className="absolute top-3 right-3 flex items-center gap-2 z-20">
                      <button
                        onClick={(e) => handleOpenEditPost(item, e)}
                        className="p-2 rounded-full bg-black/80 border border-white/20 text-[#00f0ff] hover:bg-[#00f0ff] hover:text-black transition-all shadow-lg"
                        title="Edit image & post info"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button
                        onClick={(e) => handleDeletePost(item.id, e)}
                        className="p-2 rounded-full bg-black/80 border border-white/20 text-white/70 hover:text-red-400 transition-all shadow-lg"
                        title="Delete post"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  )}

                  <span className="absolute top-3 left-3 px-3.5 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest bg-black/80 border border-white/20 text-[#00f0ff]">
                    {item.category}
                  </span>
                </div>

                <div className="p-5 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-base text-white font-heading">
                      <EditableText value={item.title} onChange={(v) => updatePostTitleOrDesc(item.id, 'title', v)} isLiveEditing={isLiveEditing} />
                    </h3>
                    <p className="text-xs text-white/70 mt-1">
                      <EditableText value={item.description} onChange={(v) => updatePostTitleOrDesc(item.id, 'description', v)} isLiveEditing={isLiveEditing} />
                    </p>
                  </div>
                  <ArrowUpRight size={20} className="text-white/60 group-hover:text-[#ff007f] transition-colors" />
                </div>
              </motion.div>
            ))}
          </Masonry>
        </ResponsiveMasonry>

        <div className="mt-16 p-8 rounded-3xl glass-card border border-[#00f0ff]/40 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_0_40px_rgba(0,240,255,0.15)]">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-14 h-14 rounded-2xl border border-[#ff007f] bg-[#ff007f]/15 flex items-center justify-center text-[#ff007f] shrink-0 shadow-[0_0_15px_rgba(255,0,127,0.4)]">
              <InstagramIcon size={28} />
            </div>
            <div>
              <h3 className="font-bold text-xl text-white uppercase tracking-tight font-heading">
                <EditableText value={siteConfig.igBannerTitle} onChange={(v) => updateConfigField('igBannerTitle', v)} isLiveEditing={isLiveEditing} />
              </h3>
              <p className="text-white/80 text-xs mt-1">
                <EditableText value={siteConfig.igBannerSub} onChange={(v) => updateConfigField('igBannerSub', v)} isLiveEditing={isLiveEditing} />
              </p>
            </div>
          </div>
          <a
            href="https://www.instagram.com/shotbyivis/"
            target="_blank"
            rel="noreferrer"
            className="px-8 py-4 rounded-full bg-[#00f0ff] text-black font-extrabold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(0,240,255,0.6)] hover:scale-105 transition-all whitespace-nowrap"
          >
            Visit Instagram Feed ↗
          </a>
        </div>
      </motion.section>

      {/* ===== SERVICES SECTION ===== */}
      <motion.section 
        id="services" 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="py-28 px-6 bg-[#07070b]/90 border-t border-white/10 relative z-10"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-[11px] font-mono text-[#ff007f] uppercase tracking-[0.4em] block mb-2 font-bold">
              Rates & Offerings
            </span>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight font-heading">
              SHOOTING <span className="neon-text-blue">PACKAGES</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Music Video Package */}
            <motion.div 
              whileHover={{ y: -8 }}
              transition={{ type: 'spring', stiffness: 120, damping: 15 }}
              className="p-8 rounded-3xl glass-card border border-[#ff007f]/50 flex flex-col justify-between space-y-6 shadow-[0_0_35px_rgba(255,0,127,0.2)]"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl border border-[#ff007f] bg-[#ff007f]/15 flex items-center justify-center text-[#ff007f] mb-6 shadow-[0_0_15px_#ff007f]">
                  <Film size={28} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-1 font-heading">
                  <EditableText value={siteConfig.mvTitle} onChange={(v) => updateConfigField('mvTitle', v)} isLiveEditing={isLiveEditing} />
                </h3>
                <div className="text-sm font-mono text-[#00f0ff] font-extrabold uppercase tracking-wider mb-4">
                  <EditableText value={siteConfig.mvPrice} onChange={(v) => updateConfigField('mvPrice', v)} isLiveEditing={isLiveEditing} />
                </div>
                <p className="text-xs text-white/80 leading-relaxed mb-6">
                  <EditableText value={siteConfig.mvDesc} onChange={(v) => updateConfigField('mvDesc', v)} isLiveEditing={isLiveEditing} />
                </p>

                <ul className="space-y-2.5 mb-6 text-xs text-white/90">
                  <li className="flex items-center gap-2">
                    <Check size={16} className="text-[#ff007f]" /> 
                    <EditableText value={siteConfig.mvFeat1} onChange={(v) => updateConfigField('mvFeat1', v)} isLiveEditing={isLiveEditing} />
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={16} className="text-[#ff007f]" /> 
                    <EditableText value={siteConfig.mvFeat2} onChange={(v) => updateConfigField('mvFeat2', v)} isLiveEditing={isLiveEditing} />
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={16} className="text-[#ff007f]" /> 
                    <EditableText value={siteConfig.mvFeat3} onChange={(v) => updateConfigField('mvFeat3', v)} isLiveEditing={isLiveEditing} />
                  </li>
                </ul>
              </div>

              <button
                onClick={() => { setSelectedService('Music Videos'); scrollTo('contact'); }}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#ff007f] to-[#00f0ff] text-white text-xs font-bold uppercase tracking-widest text-center shadow-lg hover:scale-[1.02] transition-all"
              >
                Configure Music Video Booking →
              </button>
            </motion.div>

            {/* Photoshoots Package */}
            <motion.div 
              whileHover={{ y: -8 }}
              transition={{ type: 'spring', stiffness: 120, damping: 15 }}
              className="p-8 rounded-3xl glass-card border border-[#00f0ff]/50 flex flex-col justify-between space-y-6 shadow-[0_0_35px_rgba(0,240,255,0.2)]"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl border border-[#00f0ff] bg-[#00f0ff]/15 flex items-center justify-center text-[#00f0ff] mb-6 shadow-[0_0_15px_#00f0ff]">
                  <Camera size={28} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-1 font-heading">
                  <EditableText value={siteConfig.photoTitle} onChange={(v) => updateConfigField('photoTitle', v)} isLiveEditing={isLiveEditing} />
                </h3>
                <div className="text-sm font-mono text-[#ff007f] font-extrabold uppercase tracking-wider mb-4">
                  <EditableText value={siteConfig.photoPrice} onChange={(v) => updateConfigField('photoPrice', v)} isLiveEditing={isLiveEditing} />
                </div>
                <p className="text-xs text-white/80 leading-relaxed mb-6">
                  <EditableText value={siteConfig.photoDesc} onChange={(v) => updateConfigField('photoDesc', v)} isLiveEditing={isLiveEditing} />
                </p>

                <ul className="space-y-2.5 mb-6 text-xs text-white/90">
                  <li className="flex items-center gap-2">
                    <Check size={16} className="text-[#00f0ff]" /> 
                    <EditableText value={siteConfig.photoFeat1} onChange={(v) => updateConfigField('photoFeat1', v)} isLiveEditing={isLiveEditing} />
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={16} className="text-[#00f0ff]" /> 
                    <EditableText value={siteConfig.photoFeat2} onChange={(v) => updateConfigField('photoFeat2', v)} isLiveEditing={isLiveEditing} />
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={16} className="text-[#00f0ff]" /> 
                    <EditableText value={siteConfig.photoFeat3} onChange={(v) => updateConfigField('photoFeat3', v)} isLiveEditing={isLiveEditing} />
                  </li>
                </ul>
              </div>

              <button
                onClick={() => { setSelectedService('Photography'); scrollTo('contact'); }}
                className="w-full py-4 rounded-xl border border-white/30 hover:border-[#00f0ff] hover:bg-[#00f0ff] hover:text-black text-white text-xs font-bold uppercase tracking-widest text-center transition-all"
              >
                Configure Photoshoot Booking →
              </button>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* ===== ABOUT SECTION ===== */}
      <motion.section 
        id="about" 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="py-28 px-6 max-w-7xl mx-auto border-t border-white/10 relative z-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden border border-white/15 shadow-2xl aspect-[3/4] max-h-[600px]">
              <img
                src="/slideshow/slide2.jpg"
                alt="ShotByIvis Director & Photographer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-transparent opacity-60" />
            </div>

            <div className="absolute -bottom-8 -right-4 lg:-right-8 p-6 rounded-2xl bg-[#0c0c12]/95 backdrop-blur-2xl border border-white/15 grid grid-cols-2 gap-6 min-w-[260px] shadow-2xl">
              <div>
                <div className="text-2xl font-bold text-white neon-text-pink font-heading">
                  <EditableText value={siteConfig.stat1Value} onChange={(v) => updateConfigField('stat1Value', v)} isLiveEditing={isLiveEditing} />
                </div>
                <div className="text-[10px] font-mono uppercase text-white/60 tracking-wider mt-0.5 font-bold">
                  <EditableText value={siteConfig.stat1Label} onChange={(v) => updateConfigField('stat1Label', v)} isLiveEditing={isLiveEditing} />
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white neon-text-blue font-heading">
                  <EditableText value={siteConfig.stat2Value} onChange={(v) => updateConfigField('stat2Value', v)} isLiveEditing={isLiveEditing} />
                </div>
                <div className="text-[10px] font-mono uppercase text-white/60 tracking-wider mt-0.5 font-bold">
                  <EditableText value={siteConfig.stat2Label} onChange={(v) => updateConfigField('stat2Label', v)} isLiveEditing={isLiveEditing} />
                </div>
              </div>
            </div>
          </div>

          <div className="lg:pl-6">
            <span className="text-[11px] font-mono text-[#00f0ff] uppercase tracking-[0.4em] block mb-2 font-bold">
              <EditableText value={siteConfig.aboutTag} onChange={(v) => updateConfigField('aboutTag', v)} isLiveEditing={isLiveEditing} />
            </span>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-8 font-heading">
              <EditableText value={siteConfig.aboutTitle} onChange={(v) => updateConfigField('aboutTitle', v)} isLiveEditing={isLiveEditing} />
            </h2>

            <div className="space-y-4 text-white/90 text-sm leading-relaxed mb-10">
              <p>
                <EditableText value={siteConfig.aboutBio} onChange={(v) => updateConfigField('aboutBio', v)} isLiveEditing={isLiveEditing} />
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => scrollTo('contact')}
                className="px-8 py-4 bg-gradient-to-r from-[#ff007f] to-[#00f0ff] text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-lg hover:scale-105 transition-all"
              >
                Work With Ivis
              </button>
              <a
                href="https://www.instagram.com/shotbyivis/"
                target="_blank"
                rel="noreferrer"
                className="px-8 py-4 border border-white/30 text-white hover:border-[#00f0ff] hover:text-[#00f0ff] text-xs font-bold uppercase tracking-wider rounded-full transition-all flex items-center gap-2"
              >
                <InstagramIcon size={16} /> <EditableText value={siteConfig.instagramHandle} onChange={(v) => updateConfigField('instagramHandle', v)} isLiveEditing={isLiveEditing} />
              </a>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ===== ADVANCED INTERACTIVE BOOKING WIZARD ===== */}
      <motion.section 
        id="contact" 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="py-28 px-6 bg-[#07070b]/90 border-t border-white/10 relative z-10"
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-[11px] font-mono text-[#ff007f] uppercase tracking-[0.4em] block mb-2 font-bold">
              <EditableText value={siteConfig.bookingTag} onChange={(v) => updateConfigField('bookingTag', v)} isLiveEditing={isLiveEditing} />
            </span>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight font-heading">
              <EditableText value={siteConfig.bookingTitle} onChange={(v) => updateConfigField('bookingTitle', v)} isLiveEditing={isLiveEditing} />
            </h2>
          </div>

          <div className="flex items-center justify-between max-w-xl mx-auto mb-12 relative">
            <div className="absolute top-1/2 inset-x-0 h-0.5 bg-white/15 -translate-y-1/2 z-0" />
            
            <div className="relative z-10 flex flex-col items-center gap-2">
              <div className={`w-10 h-10 rounded-full font-bold text-xs flex items-center justify-center transition-all ${
                bookingStep === 1 ? 'bg-[#ff007f] text-white shadow-[0_0_15px_#ff007f]' : 'bg-[#0c0c12] border border-white/30 text-white/80'
              }`}>
                1
              </div>
              <span className="text-[10px] font-mono uppercase text-white/70 font-bold">Service</span>
            </div>

            <div className="relative z-10 flex flex-col items-center gap-2">
              <div className={`w-10 h-10 rounded-full font-bold text-xs flex items-center justify-center transition-all ${
                bookingStep === 2 ? 'bg-[#00f0ff] text-black shadow-[0_0_15px_#00f0ff]' : 'bg-[#0c0c12] border border-white/30 text-white/80'
              }`}>
                2
              </div>
              <span className="text-[10px] font-mono uppercase text-white/70 font-bold">Features & Add-Ons</span>
            </div>

            <div className="relative z-10 flex flex-col items-center gap-2">
              <div className={`w-10 h-10 rounded-full font-bold text-xs flex items-center justify-center transition-all ${
                bookingStep === 3 ? 'bg-gradient-to-r from-[#ff007f] to-[#00f0ff] text-white shadow-lg' : 'bg-[#0c0c12] border border-white/30 text-white/80'
              }`}>
                3
              </div>
              <span className="text-[10px] font-mono uppercase text-white/70 font-bold">Details & Confirm</span>
            </div>
          </div>

          <div className="glass-card p-8 md:p-12 rounded-3xl border border-white/15 shadow-2xl relative overflow-hidden">
            
            {bookedSuccess && (
              <div className="p-8 rounded-2xl bg-[#00f0ff]/15 border border-[#00f0ff]/50 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#00f0ff]/20 text-[#00f0ff] flex items-center justify-center mx-auto shadow-[0_0_20px_#00f0ff]">
                  <Check size={32} />
                </div>
                <h3 className="text-2xl font-bold text-white font-heading">Shooting Request Confirmed!</h3>
                <p className="text-xs text-white/90 max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="text-[#00f0ff] font-bold">{clientName}</span>. Your reservation for <span className="text-[#ff007f] font-bold">{selectedService}</span> on <span className="text-white font-bold">{shootDate}</span> has been logged! Ivis will reach out directly.
                </p>
              </div>
            )}

            {!bookedSuccess && (
              <form onSubmit={handleBookingSubmit} className="space-y-8">
                
                {bookingStep === 1 && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-white uppercase tracking-tight font-heading">Step 1: Choose Production Service</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div 
                        onClick={() => setSelectedService('Music Videos')}
                        className={`p-6 rounded-2xl border cursor-pointer transition-all ${
                          selectedService === 'Music Videos' 
                            ? 'border-[#ff007f] bg-[#ff007f]/15 shadow-[0_0_25px_rgba(255,0,127,0.3)]' 
                            : 'border-white/15 bg-white/5 hover:border-white/40'
                        }`}
                      >
                        <Film size={32} className="text-[#ff007f] mb-3" />
                        <h4 className="font-bold text-lg text-white font-heading">{siteConfig.mvTitle}</h4>
                        <p className="text-xs text-white/80 mt-1">{siteConfig.mvDesc}</p>
                        <div className="text-xs font-mono font-bold text-[#00f0ff] mt-4 uppercase">4K 60FPS CONTENT · WITH MIX + EFFECTS</div>
                      </div>

                      <div 
                        onClick={() => setSelectedService('Photography')}
                        className={`p-6 rounded-2xl border cursor-pointer transition-all ${
                          selectedService === 'Photography' 
                            ? 'border-[#00f0ff] bg-[#00f0ff]/15 shadow-[0_0_25px_rgba(0,240,255,0.3)]' 
                            : 'border-white/15 bg-white/5 hover:border-white/40'
                        }`}
                      >
                        <Camera size={32} className="text-[#00f0ff] mb-3" />
                        <h4 className="font-bold text-lg text-white font-heading">{siteConfig.photoTitle}</h4>
                        <p className="text-xs text-white/80 mt-1">{siteConfig.photoDesc}</p>
                        <div className="text-xs font-mono font-bold text-[#ff007f] mt-4 uppercase">Regular Shoot & High-Res Retouching</div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setBookingStep(2)}
                      className="w-full py-4 rounded-xl bg-gradient-to-r from-[#ff007f] to-[#00f0ff] text-white font-bold text-xs uppercase tracking-widest shadow-lg hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
                    >
                      Next: Choose Production Features <ChevronRight size={16} />
                    </button>
                  </div>
                )}

                {bookingStep === 2 && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-bold text-white uppercase tracking-tight font-heading">Step 2: Select Features ({selectedService})</h3>
                      <span className="text-xs font-mono text-[#00f0ff] font-bold">Selected: {selectedAddons.length}</span>
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                      {currentAddonsList.map((addon) => {
                        const active = selectedAddons.includes(addon.name);
                        return (
                          <div 
                            key={addon.id}
                            onClick={() => toggleAddon(addon.name)}
                            className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between gap-4 ${
                              active ? 'border-[#00f0ff] bg-[#00f0ff]/15' : 'border-white/15 bg-white/5 hover:border-white/30'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className={`w-5 h-5 rounded-md border flex items-center justify-center ${
                                active ? 'border-[#00f0ff] bg-[#00f0ff] text-black' : 'border-white/40'
                              }`}>
                                {active && <Check size={14} />}
                              </div>
                              <div>
                                <div className="font-bold text-sm text-white font-heading">{addon.name}</div>
                                <div className="text-xs text-white/70">{addon.desc}</div>
                              </div>
                            </div>
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                              active ? 'bg-[#00f0ff]/20 text-[#00f0ff]' : 'bg-white/5 text-white/40'
                            }`}>
                              {active ? 'Selected' : 'Select'}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={() => setBookingStep(1)}
                        className="w-1/3 py-4 rounded-xl border border-white/30 text-white/90 font-bold text-xs uppercase tracking-wider"
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={() => setBookingStep(3)}
                        className="w-2/3 py-4 rounded-xl bg-gradient-to-r from-[#ff007f] to-[#00f0ff] text-white font-bold text-xs uppercase tracking-widest shadow-lg flex items-center justify-center gap-2"
                      >
                        Next: Client Details & Date <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                )}

                {bookingStep === 3 && (
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-white uppercase tracking-tight font-heading">Step 3: Contact & Shoot Date</h3>

                    <div className="p-5 rounded-2xl bg-white/10 border border-white/15 space-y-2">
                      <div className="text-xs font-mono uppercase text-white/70 font-bold">Booking Request Summary</div>
                      <div className="flex justify-between text-sm font-bold text-white">
                        <span>Selected Service:</span>
                        <span className="text-[#00f0ff]">{selectedService}</span>
                      </div>
                      {selectedAddons.map(addon => (
                        <div key={addon} className="flex justify-between text-xs text-white/80 pl-2">
                          <span>✓ {addon}</span>
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="text-[10px] font-mono font-bold uppercase text-white/80 block mb-1">Your Name</label>
                        <input 
                          type="text" 
                          required
                          placeholder="Full Name"
                          value={clientName}
                          onChange={(e) => setClientName(e.target.value)}
                          className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#ff007f]"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-mono font-bold uppercase text-white/80 block mb-1">Phone or Email</label>
                        <input 
                          type="text" 
                          required
                          placeholder="Contact Info"
                          value={clientContact}
                          onChange={(e) => setClientContact(e.target.value)}
                          className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#ff007f]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[10px] font-mono font-bold uppercase text-white/80 block mb-1">Shoot Date</label>
                      <input 
                        type="date" 
                        required
                        value={shootDate}
                        onChange={(e) => setShootDate(e.target.value)}
                        className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00f0ff]"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-mono font-bold uppercase text-white/80 block mb-1">Vision / Notes</label>
                      <textarea 
                        rows={3}
                        placeholder="Tell Ivis about your song, location or shoot details..."
                        value={shootNotes}
                        onChange={(e) => setShootNotes(e.target.value)}
                        className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#ff007f]"
                      />
                    </div>

                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={() => setBookingStep(2)}
                        className="w-1/3 py-4 rounded-xl border border-white/30 text-white/90 font-bold text-xs uppercase tracking-wider"
                      >
                        Back
                      </button>
                      <button 
                        type="submit"
                        className="w-2/3 py-4 bg-gradient-to-r from-[#ff007f] to-[#00f0ff] text-white font-bold text-xs uppercase tracking-widest rounded-xl shadow-[0_0_25px_rgba(255,0,127,0.6)] hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
                      >
                        Submit Reservation <Send size={14} />
                      </button>
                    </div>
                  </div>
                )}

              </form>
            )}
          </div>
        </div>
      </motion.section>

      {/* ===== ADD REAL POST MODAL ===== */}
      <AnimatePresence>
        {addModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setAddModalOpen(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#0c0c12] p-6 rounded-3xl border border-white/20 max-w-lg w-full relative"
            >
              <button 
                onClick={() => setAddModalOpen(false)}
                className="absolute top-4 right-4 text-white/60 hover:text-white p-2"
              >
                <X size={20} />
              </button>

              <h3 className="text-2xl font-bold text-white mb-1 font-heading">Add Real Post</h3>
              <p className="text-white/60 text-xs mb-6">Paste image URL or video link below.</p>

              <form onSubmit={handleAddPost} className="space-y-4">
                <div>
                  <label className="text-[10px] font-mono uppercase text-white/70 block mb-1">Title</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g. South Beach Shoot"
                    value={newPost.title}
                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#ff007f]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-mono uppercase text-white/70 block mb-1">Category</label>
                    <select 
                      value={newPost.category}
                      onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                      className="w-full bg-[#14141d] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#00f0ff]"
                    >
                      <option value="Music Videos">Music Videos</option>
                      <option value="Photography">Photography</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-mono uppercase text-white/70 block mb-1">Type</label>
                    <select 
                      value={newPost.type}
                      onChange={(e) => setNewPost({ ...newPost, type: e.target.value as 'video' | 'image' })}
                      className="w-full bg-[#14141d] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#00f0ff]"
                    >
                      <option value="image">Image</option>
                      <option value="video">Video</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-mono uppercase text-white/70 block mb-1">Direct Image/Video URL</label>
                  <input 
                    type="url" 
                    required 
                    placeholder="https://..."
                    value={newPost.url}
                    onChange={(e) => setNewPost({ ...newPost, url: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#ff007f]"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-mono uppercase text-white/70 block mb-1">Description</label>
                  <input 
                    type="text" 
                    placeholder="Short description..."
                    value={newPost.description}
                    onChange={(e) => setNewPost({ ...newPost, description: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#00f0ff]"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#ff007f] to-[#00f0ff] text-white font-bold text-xs uppercase tracking-wider shadow-lg hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
                >
                  <Plus size={16} /> Save Post
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== EDIT PORTFOLIO POST MODAL ===== */}
      <AnimatePresence>
        {editModalOpen && editingPost && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setEditModalOpen(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#0c0c12] p-6 rounded-3xl border border-white/20 max-w-lg w-full relative space-y-4"
            >
              <button 
                onClick={() => setEditModalOpen(false)}
                className="absolute top-4 right-4 text-white/60 hover:text-white p-2"
              >
                <X size={20} />
              </button>

              <h3 className="text-2xl font-bold text-white mb-1 font-heading flex items-center gap-2">
                <Edit2 size={20} className="text-[#00f0ff]" /> Edit Portfolio Item
              </h3>
              <p className="text-white/60 text-xs mb-4">Update the image URL, category, title, or description.</p>

              <form onSubmit={handleSaveEditPost} className="space-y-4">
                <div>
                  <label className="text-[10px] font-mono uppercase text-white/70 block mb-1">Title</label>
                  <input 
                    type="text" 
                    required 
                    value={editingPost.title}
                    onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#ff007f]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-mono uppercase text-white/70 block mb-1">Category</label>
                    <select 
                      value={editingPost.category}
                      onChange={(e) => setEditingPost({ ...editingPost, category: e.target.value })}
                      className="w-full bg-[#14141d] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#00f0ff]"
                    >
                      <option value="Music Videos">Music Videos</option>
                      <option value="Photography">Photography</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-mono uppercase text-white/70 block mb-1">Type</label>
                    <select 
                      value={editingPost.type}
                      onChange={(e) => setEditingPost({ ...editingPost, type: e.target.value as 'video' | 'image' })}
                      className="w-full bg-[#14141d] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#00f0ff]"
                    >
                      <option value="image">Image</option>
                      <option value="video">Video</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-mono uppercase text-white/70 block mb-1">Image / Video URL</label>
                  <input 
                    type="text" 
                    required 
                    value={editingPost.url}
                    onChange={(e) => setEditingPost({ ...editingPost, url: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#ff007f]"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-mono uppercase text-white/70 block mb-1">Description</label>
                  <input 
                    type="text" 
                    value={editingPost.description}
                    onChange={(e) => setEditingPost({ ...editingPost, description: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#00f0ff]"
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#ff007f] to-[#00f0ff] text-white font-bold text-xs uppercase tracking-wider shadow-lg hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
                >
                  <Save size={16} /> Save Changes
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== LIGHTBOX GALLERY MODAL ===== */}
      <AnimatePresence>
        {selectedLightboxIndex !== null && filteredPosts[selectedLightboxIndex] && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setSelectedLightboxIndex(null)}
          >
            <button 
              onClick={() => setSelectedLightboxIndex(null)}
              className="absolute top-6 right-6 text-white/80 hover:text-white p-3 rounded-full bg-white/10 transition-all z-50"
            >
              <X size={24} />
            </button>

            <button 
              onClick={(e) => { e.stopPropagation(); setSelectedLightboxIndex((prev) => (prev! - 1 + filteredPosts.length) % filteredPosts.length); }}
              className="absolute left-6 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 rounded-full bg-white/10 transition-all z-50"
            >
              <ChevronLeft size={28} />
            </button>

            <button 
              onClick={(e) => { e.stopPropagation(); setSelectedLightboxIndex((prev) => (prev! + 1) % filteredPosts.length); }}
              className="absolute right-6 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 rounded-full bg-white/10 transition-all z-50"
            >
              <ChevronRight size={28} />
            </button>

            <div 
              onClick={(e) => e.stopPropagation()}
              className="max-w-5xl w-full flex flex-col items-center"
            >
              <div className="relative rounded-2xl overflow-hidden max-h-[75vh] w-auto bg-black border border-white/15 shadow-2xl">
                <img 
                  src={filteredPosts[selectedLightboxIndex].url} 
                  alt={filteredPosts[selectedLightboxIndex].title} 
                  className="max-h-[75vh] w-auto object-contain"
                />
              </div>

              <div className="mt-4 text-center">
                <h3 className="text-2xl font-bold text-white font-heading">{filteredPosts[selectedLightboxIndex].title}</h3>
                <p className="text-white/80 text-xs mt-1">{filteredPosts[selectedLightboxIndex].description}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-white/10 py-12 px-6 bg-[#030305] text-xs text-white/60 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="ShotByIvis" className="h-7 w-auto object-contain" />
            <span className="font-bold text-white tracking-wider font-heading">
              <EditableText value={siteConfig.brandPink} onChange={(v) => updateConfigField('brandPink', v)} isLiveEditing={isLiveEditing} />
              <span className="neon-text-pink">
                <EditableText value={siteConfig.brandBlue} onChange={(v) => updateConfigField('brandBlue', v)} isLiveEditing={isLiveEditing} />
              </span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button onClick={() => setView('admin-login')} className="text-white/60 hover:text-white transition-colors flex items-center gap-1 font-mono">
              <Lock size={12} /> Staff / Owner Access
            </button>
            <p>
              <EditableText value={siteConfig.footerCopyright} onChange={(v) => updateConfigField('footerCopyright', v)} isLiveEditing={isLiveEditing} />
            </p>
          </div>

          <a href="https://www.instagram.com/shotbyivis/" target="_blank" rel="noreferrer" className="text-white/80 hover:text-[#ff007f] flex items-center gap-1.5 transition-colors font-mono">
            <InstagramIcon size={16} /> <EditableText value={siteConfig.instagramHandle} onChange={(v) => updateConfigField('instagramHandle', v)} isLiveEditing={isLiveEditing} />
          </a>
        </div>
      </footer>

    </div>
  );
}
