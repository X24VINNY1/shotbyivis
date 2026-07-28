import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import { 
  Camera, Film, Music, Car, Send, Menu, X, ArrowUpRight,
  ChevronRight, ChevronLeft, ChevronDown, Check, Plus, Trash2, ZoomIn,
  Shield, Lock, LogOut, Users, Calendar
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
  thumb?: string;
  description: string;
}

export interface BookingItem {
  id: string;
  name: string;
  email: string;
  service: string;
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

const DEFAULT_STAFF: StaffAccount[] = [
  { id: 'usr_owner1', username: 'ivis', name: 'Ivis (Owner)', role: 'owner', pass: 'ivis2026' },
  { id: 'usr_staff1', username: 'staff1', name: 'Staff Member', role: 'staff', pass: 'staff123' },
];

const SLIDESHOW_ITEMS = [
  { url: '/slideshow/slide1.jpg', title: 'Miami Night Music Video Shoot', category: 'Music Videos' },
  { url: '/slideshow/slide2.jpg', title: 'South Beach Model Editorial', category: 'Photography' },
  { url: '/slideshow/slide3.jpg', title: 'Exotic Supercar Showcase', category: 'Commercials' },
  { url: '/slideshow/slide4.jpg', title: 'Live VIP Concert Experience', category: 'Events' },
  { url: '/slideshow/slide5.jpg', title: 'High-Fashion Studio Portraiture', category: 'Photography' },
  { url: '/slideshow/slide6.jpg', title: 'Ocean Drive Lifestyle Content', category: 'Commercials' },
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
    title: 'Exotic Automotive Showcase',
    category: 'Commercials',
    type: 'image',
    url: '/slideshow/slide3.jpg',
    thumb: '/slideshow/slide3.jpg',
    description: 'Supercar shoot with ultra-sharp reflections under Miami streetlights.'
  },
  {
    id: 'ig4',
    title: 'VIP Stage Performance',
    category: 'Events',
    type: 'image',
    url: '/slideshow/slide4.jpg',
    thumb: '/slideshow/slide4.jpg',
    description: 'Live concert event recap shot with 4K cinema gear.'
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
    category: 'Commercials',
    type: 'image',
    url: '/slideshow/slide6.jpg',
    thumb: '/slideshow/slide6.jpg',
    description: 'Creative lifestyle production under Ocean Drive neon lights.'
  }
];

const SERVICES = [
  {
    icon: Film,
    title: 'Music Videos',
    desc: 'Full 4K/6K cinema camera shooting, direction, editing & color grading for singles and albums.',
    tags: ['Direction', '4K Cinema', 'VFX Edit', '3-Day Delivery'],
    range: 'From $1,200',
  },
  {
    icon: Camera,
    title: 'Photoshoots',
    desc: 'Fashion, portrait, and automotive photography sessions on location in Miami or studio.',
    tags: ['Portraits', 'Fashion', 'Automotive', '20 High-Res Edits'],
    range: 'From $450',
  },
  {
    icon: Music,
    title: 'Events & Club Coverage',
    desc: 'High-energy recap videos and highlights for concerts, clubs & private VIP occasions.',
    tags: ['Concerts', 'Clubs', 'Highlight Reels', 'Raw Footage'],
    range: 'From $800',
  },
  {
    icon: Car,
    title: 'Commercial / Brand Content',
    desc: 'Reels and promo content created for brands, exotic cars, and social media campaigns.',
    tags: ['TikTok/Reels', 'Commercial Rights', 'Audio Design', 'Social Cuts'],
    range: 'From $1,500',
  },
];

const STATS = [
  { value: '150+', label: 'Sessions Shot' },
  { value: '4K 60fps', label: 'Cinema Quality' },
  { value: 'Miami', label: 'Florida Location' },
  { value: '100%', label: 'Client Satisfaction' },
];

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [view, setView] = useState<'site' | 'admin-login' | 'admin-panel'>('site');
  const [adminTab, setAdminTab] = useState<'bookings' | 'portfolio' | 'staff'>('bookings');

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
          date: '2026-08-15',
          notes: 'Shooting music video at South Beach rooftop location.',
          status: 'Confirmed',
          timestamp: '10:30 AM'
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

  const [bookingForm, setBookingForm] = useState({ name: '', email: '', service: 'Music Videos', date: '', notes: '' });
  const [bookedSuccess, setBookedSuccess] = useState(false);

  const categories = ['All', 'Music Videos', 'Photography', 'Commercials', 'Events'];

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
      setView('admin-panel');
      setLoginUser('');
      setLoginPass('');
    } else {
      setLoginError('Invalid Username or Password.');
    }
  };

  const handleLogout = () => {
    setCurrentStaff(null);
    localStorage.removeItem('shotbyivis_current_staff');
    setView('site');
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

  const handleDeletePost = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = posts.filter(p => p.id !== id);
    setPosts(updated);
    localStorage.setItem('shotbyivis_real_posts', JSON.stringify(updated));
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newBooking: BookingItem = {
      id: 'bk_' + Math.random().toString(36).slice(2, 9),
      ...bookingForm,
      status: 'Pending',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updated = [newBooking, ...bookings];
    setBookings(updated);
    localStorage.setItem('shotbyivis_bookings', JSON.stringify(updated));

    setBookedSuccess(true);
    setTimeout(() => {
      setBookedSuccess(false);
      setBookingForm({ name: '', email: '', service: 'Music Videos', date: '', notes: '' });
    }, 4000);
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

  // ===== ADMIN DASHBOARD VIEW =====
  if (view === 'admin-panel' && currentStaff) {
    return (
      <div className="min-h-screen bg-[#060609] text-white selection:bg-[#ff007f] selection:text-white font-sans">
        {/* Admin Header */}
        <header className="bg-[#0c0c12] border-b border-white/10 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="ShotByIvis Logo" className="h-8 w-auto object-contain" />
            <div>
              <div className="font-bold text-sm tracking-wider uppercase flex items-center gap-2">
                SHOTBY<span className="neon-text-pink">IVIS</span> ADMIN PANEL
              </div>
              <div className="text-[10px] text-white/50 font-mono">
                Logged in as <span className="text-[#00f0ff]">{currentStaff.name}</span> ({currentStaff.role.toUpperCase()})
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => setView('site')} 
              className="px-4 py-2 rounded-full border border-white/20 text-white/80 hover:text-white text-xs font-bold uppercase tracking-wider transition-all"
            >
              View Website ↗
            </button>
            <button 
              onClick={handleLogout} 
              className="px-4 py-2 rounded-full bg-red-500/20 border border-red-500/40 text-red-400 hover:bg-red-500 hover:text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5"
            >
              <LogOut size={14} /> Log Out
            </button>
          </div>
        </header>

        {/* Main Dashboard Container */}
        <div className="max-w-7xl mx-auto px-6 py-10">
          
          {/* Admin Navigation Tabs */}
          <div className="flex flex-wrap gap-3 mb-8 border-b border-white/10 pb-4">
            <button
              onClick={() => setAdminTab('bookings')}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
                adminTab === 'bookings' 
                  ? 'bg-gradient-to-r from-[#ff007f] to-[#00f0ff] text-white shadow-lg' 
                  : 'bg-white/5 border border-white/10 text-white/60 hover:text-white'
              }`}
            >
              <Calendar size={14} /> Shoot Bookings ({bookings.length})
            </button>

            <button
              onClick={() => setAdminTab('portfolio')}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
                adminTab === 'portfolio' 
                  ? 'bg-gradient-to-r from-[#ff007f] to-[#00f0ff] text-white shadow-lg' 
                  : 'bg-white/5 border border-white/10 text-white/60 hover:text-white'
              }`}
            >
              <Camera size={14} /> Manage Portfolio ({posts.length})
            </button>

            {currentStaff.role === 'owner' && (
              <button
                onClick={() => setAdminTab('staff')}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
                  adminTab === 'staff' 
                    ? 'bg-gradient-to-r from-[#ff007f] to-[#00f0ff] text-white shadow-lg' 
                    : 'bg-white/5 border border-white/10 text-white/60 hover:text-white'
                }`}
              >
                <Users size={14} /> Staff & Owners ({staffAccounts.length})
              </button>
            )}
          </div>

          {/* TAB 1: SHOOT BOOKINGS */}
          {adminTab === 'bookings' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-black uppercase tracking-tight">Client Shoot Inquiries</h2>
                <span className="text-xs font-mono text-white/50">{bookings.length} Total Requests</span>
              </div>

              {bookings.length === 0 ? (
                <div className="p-10 rounded-2xl bg-[#0c0c12] border border-white/10 text-center text-white/40 text-sm">
                  No shoot booking requests yet.
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {bookings.map((b) => (
                    <div key={b.id} className="p-6 rounded-2xl bg-[#0c0c12] border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-lg text-white">{b.name}</span>
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                            b.status === 'Confirmed' ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                            b.status === 'Completed' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                            b.status === 'Declined' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                            'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                          }`}>
                            {b.status}
                          </span>
                        </div>

                        <div className="text-xs text-white/60 font-mono">
                          Service: <span className="text-[#00f0ff]">{b.service}</span> | Preferred Date: <span className="text-[#ff007f]">{b.date}</span>
                        </div>
                        <div className="text-xs text-white/50">Contact: {b.email}</div>
                        {b.notes && <div className="text-xs text-white/80 mt-2 bg-white/5 p-3 rounded-lg border border-white/5">"{b.notes}"</div>}
                      </div>

                      {/* Status Toggle Buttons */}
                      <div className="flex flex-wrap items-center gap-2">
                        <button 
                          onClick={() => updateBookingStatus(b.id, 'Confirmed')}
                          className="px-3 py-1.5 rounded-lg bg-green-500/20 text-green-400 hover:bg-green-500 hover:text-white text-xs font-bold uppercase transition-all"
                        >
                          Confirm
                        </button>
                        <button 
                          onClick={() => updateBookingStatus(b.id, 'Completed')}
                          className="px-3 py-1.5 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500 hover:text-white text-xs font-bold uppercase transition-all"
                        >
                          Completed
                        </button>
                        <button 
                          onClick={() => updateBookingStatus(b.id, 'Declined')}
                          className="px-3 py-1.5 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500 hover:text-white text-xs font-bold uppercase transition-all"
                        >
                          Decline
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: PORTFOLIO MANAGEMENT */}
          {adminTab === 'portfolio' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-black uppercase tracking-tight">Portfolio & Real Works</h2>
                <button
                  onClick={() => setAddModalOpen(true)}
                  className="px-5 py-2.5 rounded-full bg-[#ff007f] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 hover:scale-105 transition-all"
                >
                  <Plus size={16} /> Add Real Post
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((item) => (
                  <div key={item.id} className="p-4 rounded-2xl bg-[#0c0c12] border border-white/10 flex flex-col justify-between gap-4">
                    <div className="relative aspect-video rounded-xl overflow-hidden bg-black">
                      <img src={item.url} alt={item.title} className="w-full h-full object-cover" />
                      <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase bg-black/70 text-[#00f0ff]">
                        {item.category}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-bold text-sm text-white">{item.title}</h3>
                      <p className="text-xs text-white/50 mt-0.5 truncate">{item.description}</p>
                    </div>

                    <button
                      onClick={(e) => handleDeletePost(item.id, e)}
                      className="w-full py-2 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500 hover:text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5"
                    >
                      <Trash2 size={14} /> Remove Post
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: STAFF & OWNER MANAGEMENT */}
          {adminTab === 'staff' && currentStaff.role === 'owner' && (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-black uppercase tracking-tight">Staff & Team Logins</h2>
                  <p className="text-xs text-white/50 mt-1">Create accounts to give access to staff members or co-owners.</p>
                </div>
              </div>

              {/* Add New Staff Form */}
              <form onSubmit={handleCreateStaff} className="p-6 rounded-2xl bg-[#0c0c12] border border-white/10 space-y-4">
                <h3 className="font-bold text-sm text-white uppercase tracking-wider flex items-center gap-2">
                  <Plus size={16} className="text-[#00f0ff]" /> Add New Staff Member
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="text-[10px] font-mono font-bold uppercase text-white/60 block mb-1">Username</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="e.g. cameraman1"
                      value={newStaffUser}
                      onChange={(e) => setNewStaffUser(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#ff007f]"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono font-bold uppercase text-white/60 block mb-1">Full Name</label>
                    <input 
                      type="text" 
                      placeholder="Staff Member Name"
                      value={newStaffName}
                      onChange={(e) => setNewStaffName(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#ff007f]"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono font-bold uppercase text-white/60 block mb-1">Password</label>
                    <input 
                      type="text" 
                      required 
                      placeholder="Set Password"
                      value={newStaffPass}
                      onChange={(e) => setNewStaffPass(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#00f0ff]"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono font-bold uppercase text-white/60 block mb-1">Role</label>
                    <select 
                      value={newStaffRole}
                      onChange={(e) => setNewStaffRole(e.target.value as 'owner' | 'staff')}
                      className="w-full bg-[#14141d] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#00f0ff]"
                    >
                      <option value="staff">Staff Member</option>
                      <option value="owner">Full Owner Access</option>
                    </select>
                  </div>
                </div>

                <button 
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#ff007f] to-[#00f0ff] text-white font-bold text-xs uppercase tracking-wider shadow-md hover:scale-[1.01] transition-all"
                >
                  Create Staff Account
                </button>
              </form>

              {/* Staff Accounts List */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {staffAccounts.map((s) => (
                  <div key={s.id} className="p-5 rounded-2xl bg-[#0c0c12] border border-white/10 flex items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="font-bold text-base text-white flex items-center gap-2">
                        {s.name}
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase ${
                          s.role === 'owner' ? 'bg-[#ff007f]/20 text-[#ff007f] border border-[#ff007f]/30' : 'bg-[#00f0ff]/20 text-[#00f0ff] border border-[#00f0ff]/30'
                        }`}>
                          {s.role}
                        </span>
                      </div>
                      <div className="text-xs text-white/50 font-mono">Username: <span className="text-white">{s.username}</span></div>
                      <div className="text-xs text-white/40 font-mono">Password: <span className="text-white/80">{s.pass}</span></div>
                    </div>

                    {staffAccounts.length > 1 && s.username !== 'ivis' && (
                      <button
                        onClick={() => handleDeleteStaff(s.id)}
                        className="p-2.5 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all"
                        title="Delete account"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    );
  }

  // ===== ADMIN LOGIN VIEW =====
  if (view === 'admin-login') {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-6 relative">
        <div className="w-full max-w-md p-8 rounded-3xl bg-[#0c0c12] border border-white/10 shadow-2xl space-y-6 relative z-10">
          <div className="text-center space-y-2">
            <img src="/logo.png" alt="ShotByIvis Logo" className="h-14 w-auto object-contain mx-auto" />
            <h2 className="text-2xl font-black uppercase tracking-tight">Staff & Owner Portal</h2>
            <p className="text-xs text-white/50">Log in to manage bookings, portfolio & staff accounts.</p>
          </div>

          {loginError && (
            <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/40 text-red-400 text-xs font-bold text-center">
              {loginError}
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="text-[10px] font-mono uppercase font-bold text-white/60 block mb-1">Username</label>
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
              <label className="text-[10px] font-mono uppercase font-bold text-white/60 block mb-1">Password</label>
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
            className="w-full text-center text-xs text-white/40 hover:text-white transition-colors block pt-2"
          >
            ← Return to Website
          </button>
        </div>
      </div>
    );
  }

  // ===== MAIN PUBLIC WEBSITE VIEW =====
  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#ff007f] selection:text-white font-sans overflow-x-hidden">
      
      {/* ===== HEADER / NAVBAR ===== */}
      <header className="fixed top-0 inset-x-0 z-50 bg-[#050505]/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group">
            <img src="/logo.png" alt="ShotByIvis Logo" className="h-10 w-auto object-contain transition-transform group-hover:scale-105" />
            <span className="font-extrabold text-xl tracking-wider text-white">
              SHOTBY<span className="neon-text-pink">IVIS</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-[0.2em] font-medium text-white/70">
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
                className="px-4 py-2 rounded-full border border-[#00f0ff]/50 text-[#00f0ff] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 hover:bg-[#00f0ff] hover:text-black transition-all"
              >
                <Shield size={14} /> Admin Dashboard
              </button>
            ) : (
              <button
                onClick={() => setView('admin-login')}
                className="px-4 py-2 rounded-full border border-white/20 text-white/70 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 hover:border-white hover:text-white transition-all"
              >
                <Lock size={14} /> Staff Login
              </button>
            )}

            <a 
              href="https://www.instagram.com/shotbyivis/" 
              target="_blank" 
              rel="noreferrer"
              className="p-2.5 rounded-full border border-white/10 text-white/80 hover:text-[#ff007f] hover:border-[#ff007f] transition-all"
            >
              <InstagramIcon size={18} />
            </a>
            <button 
              onClick={() => scrollTo('contact')}
              className="px-6 py-2.5 rounded-full font-bold uppercase tracking-widest text-xs bg-gradient-to-r from-[#ff007f] to-[#00f0ff] text-white shadow-[0_0_20px_rgba(255,0,127,0.4)] hover:scale-105 transition-all"
            >
              Book Shoot
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 text-white/80">
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
              <button onClick={() => scrollTo('home')} className="text-left py-2 text-white/80">Home</button>
              <button onClick={() => scrollTo('portfolio')} className="text-left py-2 text-white/80">Portfolio</button>
              <button onClick={() => scrollTo('services')} className="text-left py-2 text-white/80">Services</button>
              <button onClick={() => scrollTo('about')} className="text-left py-2 text-white/80">About</button>
              <button onClick={() => scrollTo('contact')} className="text-left py-2 text-white/80">Contact</button>
              <button onClick={() => setView('admin-login')} className="text-left py-2 text-[#ff007f] flex items-center gap-2">
                <Lock size={16} /> Staff / Owner Panel
              </button>
              <a href="https://www.instagram.com/shotbyivis/" target="_blank" rel="noreferrer" className="py-2 text-[#00f0ff] flex items-center gap-2">
                <InstagramIcon size={16} /> Instagram @shotbyivis
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ===== HERO SECTION — Fullscreen Background Slideshow ===== */}
      <section id="home" className="relative h-screen w-full overflow-hidden bg-[#050505] flex items-center justify-center">
        <AnimatePresence mode="sync">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.05 }}
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

        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-[#050505]/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/60 via-transparent to-[#050505]/60" />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center flex flex-col items-center pt-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="flex flex-col items-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-[#ff007f]/40 bg-[#ff007f]/10 mb-6">
              <span className="w-2 h-2 rounded-full bg-[#ff007f] animate-ping" />
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#ff007f] font-bold">
                Miami Videography & Photography
              </span>
            </div>

            <h1
              className="text-white leading-[1.02] mb-6 font-black uppercase tracking-tight"
              style={{ fontSize: 'clamp(2.8rem, 7.5vw, 6.5rem)' }}
            >
              SHOT BY <span className="neon-text-pink">IVIS</span>
            </h1>

            <div className="flex items-center gap-3 mb-10 flex-wrap justify-center text-white/50 text-[11px] font-mono uppercase tracking-[0.2em]">
              <span>Music Videos</span>
              <span>·</span>
              <span>Photoshoots</span>
              <span>·</span>
              <span>Automotive</span>
              <span>·</span>
              <span>Events</span>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={() => scrollTo('portfolio')}
                className="px-9 py-4 bg-gradient-to-r from-[#ff007f] to-[#00f0ff] text-white tracking-[0.2em] uppercase text-xs font-bold rounded-full shadow-[0_0_25px_rgba(255,0,127,0.5)] hover:scale-105 transition-all"
              >
                View Portfolio
              </button>
              <button
                onClick={() => scrollTo('contact')}
                className="px-9 py-4 border border-white/30 text-white/90 tracking-[0.2em] uppercase text-xs font-bold rounded-full hover:border-[#00f0ff] hover:text-[#00f0ff] hover:bg-[#00f0ff]/10 transition-all"
              >
                Book a Shoot
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
              className="h-1 rounded-full transition-all duration-500 cursor-pointer"
              style={{
                width: idx === currentSlide ? '36px' : '14px',
                background: idx === currentSlide ? '#00f0ff' : 'rgba(255,255,255,0.3)',
                boxShadow: idx === currentSlide ? '0 0 10px #00f0ff' : 'none'
              }}
            />
          ))}
        </div>

        <div className="absolute bottom-20 right-10 text-white/40 hidden md:block font-mono text-xs tracking-widest z-20">
          0{currentSlide + 1} / 0{SLIDESHOW_ITEMS.length}
        </div>

        <button
          onClick={() => scrollTo('portfolio')}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30 hover:text-white transition-colors duration-300 z-20 animate-bounce"
        >
          <ChevronDown size={24} />
        </button>
      </section>

      {/* ===== PORTFOLIO SECTION — Responsive Masonry & Lightbox ===== */}
      <section id="portfolio" className="py-28 px-6 max-w-7xl mx-auto border-t border-white/10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <span className="text-[10px] font-mono text-[#00f0ff] uppercase tracking-[0.4em] block mb-2 font-bold">
              Real Works
            </span>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight">
              PORTFOLIO <span className="neon-text-pink">GALLERY</span>
            </h2>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                  activeCategory === cat 
                    ? 'bg-gradient-to-r from-[#ff007f] to-[#00f0ff] text-white shadow-[0_0_20px_rgba(255,0,127,0.5)]' 
                    : 'bg-white/5 border border-white/10 text-white/60 hover:text-white hover:border-white/30'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry Responsive Grid */}
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
          <Masonry gutter="20px">
            {filteredPosts.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -6 }}
                className="group relative rounded-2xl overflow-hidden bg-[#0c0c12] border border-white/10 hover:border-[#ff007f]/60 transition-all cursor-pointer shadow-xl"
                onClick={() => setSelectedLightboxIndex(idx)}
              >
                <div className="relative overflow-hidden bg-black">
                  <img
                    src={item.thumb || item.url}
                    alt={item.title}
                    className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 rounded-full bg-[#ff007f]/80 text-white flex items-center justify-center shadow-[0_0_20px_#ff007f]">
                      <ZoomIn size={20} />
                    </div>
                  </div>

                  {currentStaff && (
                    <button
                      onClick={(e) => handleDeletePost(item.id, e)}
                      className="absolute top-3 right-3 p-2 rounded-full bg-black/60 border border-white/20 text-white/50 hover:text-red-400 transition-all z-20"
                      title="Delete post"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}

                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[9px] font-mono font-bold uppercase tracking-widest bg-black/60 border border-white/20 text-[#00f0ff]">
                    {item.category}
                  </span>
                </div>

                <div className="p-5 flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-base text-white">{item.title}</h3>
                    <p className="text-xs text-white/50 mt-1">{item.description}</p>
                  </div>
                  <ArrowUpRight size={18} className="text-white/40 group-hover:text-[#ff007f] transition-colors" />
                </div>
              </motion.div>
            ))}
          </Masonry>
        </ResponsiveMasonry>

        {/* Instagram Direct Link Box */}
        <div className="mt-16 p-8 rounded-3xl bg-[#0c0c12] border border-[#00f0ff]/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_0_40px_rgba(0,240,255,0.1)]">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-14 h-14 rounded-2xl border border-[#ff007f] bg-[#ff007f]/10 flex items-center justify-center text-[#ff007f] shrink-0">
              <InstagramIcon size={28} />
            </div>
            <div>
              <h3 className="font-bold text-xl text-white uppercase tracking-tight">
                Follow <span className="neon-text-pink">@shotbyivis</span> On Instagram
              </h3>
              <p className="text-white/60 text-xs mt-1">Daily music video clips, reels, and behind-the-scenes content.</p>
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
      </section>

      {/* ===== SERVICES SECTION ===== */}
      <section id="services" className="py-28 px-6 bg-[#08080c] border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-[10px] font-mono text-[#ff007f] uppercase tracking-[0.4em] block mb-2 font-bold">
              Rates & Offerings
            </span>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight">
              SHOOTING <span className="neon-text-blue">SERVICES</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.title}
                  className="group relative p-8 rounded-3xl bg-[#0c0c12] border border-white/10 hover:border-[#ff007f]/60 transition-all duration-500 flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-2xl border border-white/15 bg-white/5 flex items-center justify-center text-white mb-6 group-hover:border-[#ff007f] group-hover:text-[#ff007f] transition-all">
                      <Icon size={22} />
                    </div>

                    <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                    <div className="text-base font-mono text-[#00f0ff] font-bold mb-4">{service.range}</div>
                    <p className="text-xs text-white/50 leading-relaxed mb-6">{service.desc}</p>

                    <div className="flex flex-wrap gap-2 mb-8">
                      {service.tags.map((tag) => (
                        <span key={tag} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] font-mono uppercase tracking-wider text-white/60">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => scrollTo('contact')}
                    className="w-full py-3 rounded-full border border-white/20 hover:border-[#ff007f] hover:bg-[#ff007f] text-white text-xs font-bold uppercase tracking-widest text-center transition-all"
                  >
                    Inquire Booking →
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== ABOUT SECTION ===== */}
      <section id="about" className="py-28 px-6 max-w-7xl mx-auto border-t border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl aspect-[3/4] max-h-[600px]">
              <img
                src="/slideshow/slide2.jpg"
                alt="ShotByIvis Director & Photographer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60" />
            </div>

            <div className="absolute -bottom-8 -right-4 lg:-right-8 p-6 rounded-2xl bg-[#0c0c12]/90 backdrop-blur-xl border border-white/10 grid grid-cols-2 gap-6 min-w-[260px]">
              {STATS.map((s) => (
                <div key={s.label}>
                  <div className="text-xl font-bold text-white neon-text-pink">{s.value}</div>
                  <div className="text-[9px] font-mono uppercase text-white/50 tracking-wider mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:pl-6">
            <span className="text-[10px] font-mono text-[#00f0ff] uppercase tracking-[0.4em] block mb-2 font-bold">
              Behind the Lens
            </span>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-8">
              ABOUT <span className="neon-text-pink">IVIS</span>
            </h2>

            <div className="space-y-4 text-white/70 text-sm leading-relaxed mb-10">
              <p>
                <b>ShotByIvis</b> is a premier Miami-based videographer and photographer with a sharp cinema eye. Specializing in high-energy music videos, model portraiture, and luxury automotive visuals.
              </p>
              <p>
                Equipped with RED & Sony cinema line gear, every production is shot with intention and color graded to perfection.
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
                className="px-8 py-4 border border-white/20 text-white hover:border-[#00f0ff] hover:text-[#00f0ff] text-xs font-bold uppercase tracking-wider rounded-full transition-all flex items-center gap-2"
              >
                <InstagramIcon size={16} /> @shotbyivis
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== BOOKING / CONTACT SECTION ===== */}
      <section id="contact" className="py-28 px-6 bg-[#08080c] border-t border-white/10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-[10px] font-mono text-[#ff007f] uppercase tracking-[0.4em] block mb-2 font-bold">
              Reserve Your Date
            </span>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight">
              BOOK A <span className="neon-text-blue">SHOOT</span>
            </h2>
          </div>

          <form onSubmit={handleBookingSubmit} className="bg-[#0c0c12] p-8 md:p-10 rounded-3xl border border-white/10 space-y-6 shadow-2xl">
            {bookedSuccess && (
              <div className="p-4 rounded-xl bg-[#00f0ff]/10 border border-[#00f0ff]/30 text-[#00f0ff] text-xs font-bold text-center flex items-center justify-center gap-2">
                <Check size={18} /> Shooting Request Sent! Ivis will reach out directly.
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-white/60 block mb-2">Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="Full Name"
                  value={bookingForm.name}
                  onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#ff007f]"
                />
              </div>
              <div>
                <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-white/60 block mb-2">Email / Phone</label>
                <input 
                  type="text" 
                  required
                  placeholder="Contact Number or Email"
                  value={bookingForm.email}
                  onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#ff007f]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-white/60 block mb-2">Service</label>
                <select 
                  value={bookingForm.service}
                  onChange={(e) => setBookingForm({ ...bookingForm, service: e.target.value })}
                  className="w-full bg-[#14141d] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00f0ff]"
                >
                  <option value="Music Videos">Music Videos</option>
                  <option value="Photoshoots">Photoshoots</option>
                  <option value="Event Coverage">Event Coverage</option>
                  <option value="Commercial / Brands">Commercial / Brands</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-white/60 block mb-2">Shoot Date</label>
                <input 
                  type="date" 
                  required
                  value={bookingForm.date}
                  onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#00f0ff]"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] font-mono font-bold uppercase tracking-wider text-white/60 block mb-2">Notes / Shoot Details</label>
              <textarea 
                rows={4}
                placeholder="Tell Ivis about your song, location or shoot vision..."
                value={bookingForm.notes}
                onChange={(e) => setBookingForm({ ...bookingForm, notes: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#ff007f]"
              />
            </div>

            <button 
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-[#ff007f] to-[#00f0ff] text-white font-bold text-xs uppercase tracking-widest rounded-xl shadow-[0_0_25px_rgba(255,0,127,0.5)] hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
            >
              Submit Request <Send size={14} />
            </button>
          </form>
        </div>
      </section>

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

              <h3 className="text-2xl font-bold text-white mb-1">Add Real Post</h3>
              <p className="text-white/50 text-xs mb-6">Paste image URL or video link below.</p>

              <form onSubmit={handleAddPost} className="space-y-4">
                <div>
                  <label className="text-[10px] font-mono uppercase text-white/60 block mb-1">Title</label>
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
                    <label className="text-[10px] font-mono uppercase text-white/60 block mb-1">Category</label>
                    <select 
                      value={newPost.category}
                      onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                      className="w-full bg-[#14141d] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#00f0ff]"
                    >
                      <option value="Music Videos">Music Videos</option>
                      <option value="Photography">Photography</option>
                      <option value="Commercials">Commercials</option>
                      <option value="Events">Events</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-mono uppercase text-white/60 block mb-1">Type</label>
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
                  <label className="text-[10px] font-mono uppercase text-white/60 block mb-1">Direct Image/Video URL</label>
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
                  <label className="text-[10px] font-mono uppercase text-white/60 block mb-1">Description</label>
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
              className="absolute top-6 right-6 text-white/70 hover:text-white p-3 rounded-full bg-white/10 transition-all z-50"
            >
              <X size={24} />
            </button>

            <button 
              onClick={(e) => { e.stopPropagation(); setSelectedLightboxIndex((prev) => (prev! - 1 + filteredPosts.length) % filteredPosts.length); }}
              className="absolute left-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3 rounded-full bg-white/10 transition-all z-50"
            >
              <ChevronLeft size={28} />
            </button>

            <button 
              onClick={(e) => { e.stopPropagation(); setSelectedLightboxIndex((prev) => (prev! + 1) % filteredPosts.length); }}
              className="absolute right-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3 rounded-full bg-white/10 transition-all z-50"
            >
              <ChevronRight size={28} />
            </button>

            <div 
              onClick={(e) => e.stopPropagation()}
              className="max-w-5xl w-full flex flex-col items-center"
            >
              <div className="relative rounded-2xl overflow-hidden max-h-[75vh] w-auto bg-black border border-white/10 shadow-2xl">
                <img 
                  src={filteredPosts[selectedLightboxIndex].url} 
                  alt={filteredPosts[selectedLightboxIndex].title} 
                  className="max-h-[75vh] w-auto object-contain"
                />
              </div>

              <div className="mt-4 text-center">
                <h3 className="text-2xl font-bold text-white">{filteredPosts[selectedLightboxIndex].title}</h3>
                <p className="text-white/60 text-xs mt-1">{filteredPosts[selectedLightboxIndex].description}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-white/10 py-12 px-6 bg-[#030305] text-xs text-white/40">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="ShotByIvis" className="h-7 w-auto object-contain" />
            <span className="font-bold text-white tracking-wider">SHOTBY<span className="neon-text-pink">IVIS</span></span>
          </div>

          <div className="flex items-center gap-4">
            <button onClick={() => setView('admin-login')} className="text-white/40 hover:text-white transition-colors flex items-center gap-1">
              <Lock size={12} /> Staff / Owner Access
            </button>
            <p>© 2026 ShotByIvis. All rights reserved. Miami, FL.</p>
          </div>

          <a href="https://www.instagram.com/shotbyivis/" target="_blank" rel="noreferrer" className="text-white/60 hover:text-[#ff007f] flex items-center gap-1.5 transition-colors">
            <InstagramIcon size={16} /> @shotbyivis
          </a>
        </div>
      </footer>

    </div>
  );
}
