import React, { useState, useEffect } from 'react';
import { createAdmission } from '../../api/schoolApi';

const emptyAdmissionForm = {
  name: '', class: '', dob: '', phone: '', email: '', address: '', parentName: '',
};

const SchoolHome = ({ onLogin }) => {
  const [rollNumber, setRollNumber] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const [admissionForm, setAdmissionForm] = useState(emptyAdmissionForm);
  const [submittingAdmission, setSubmittingAdmission] = useState(false);
  const [admissionSubmitted, setAdmissionSubmitted] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onLogin(rollNumber, password);
    } catch (err) {
      alert(err.response?.data?.message || 'Invalid roll number or password.');
    } finally {
      setLoading(false);
    }
  };

  const handleAdmissionSubmit = async (e) => {
    e.preventDefault();
    setSubmittingAdmission(true);
    try {
      await createAdmission(admissionForm);
      setAdmissionSubmitted(true);
      setAdmissionForm(emptyAdmissionForm);
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to submit admission application.');
    } finally {
      setSubmittingAdmission(false);
    }
  };

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'academics', label: 'Academics' },
    { id: 'facilities', label: 'Campus' },
    { id: 'admission', label: 'Admission' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <div className="min-h-screen bg-white text-[#0F1B2D] antialiased">
      {/* Global Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,600&family=Inter:wght@300;400;500;600;700&display=swap');
        .font-serif { font-family: 'Playfair Display', Georgia, serif; }
        .font-sans { font-family: 'Inter', -apple-system, sans-serif; }
        .gold-line {
          background: linear-gradient(90deg, transparent, #B8894A, transparent);
        }
        .gold-text {
          background: linear-gradient(135deg, #B8894A, #8B6230);
          -webkit-background-clip: text; background-clip: text; color: transparent;
        }
        .hairline { border-color: rgba(15, 27, 45, 0.08); }
        .btn-navy {
          background: #0F1B2D; color: white;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .btn-navy:hover {
          background: #1A2A42;
          transform: translateY(-2px);
          box-shadow: 0 12px 32px -8px rgba(15, 27, 45, 0.3);
        }
        .btn-outline {
          border: 1px solid rgba(15, 27, 45, 0.2);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .btn-outline:hover {
          border-color: #0F1B2D;
          background: #0F1B2D; color: white;
        }
        .card-hover {
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .card-hover:hover {
          transform: translateY(-4px);
          box-shadow: 0 24px 48px -16px rgba(15, 27, 45, 0.12);
        }
        .link-underline {
          position: relative;
        }
        .link-underline::after {
          content: ''; position: absolute; left: 0; bottom: -2px;
          width: 0; height: 1px; background: #B8894A;
          transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .link-underline:hover::after { width: 100%; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
        .fade-up-1 { animation-delay: 0.1s; opacity: 0; }
        .fade-up-2 { animation-delay: 0.2s; opacity: 0; }
        .fade-up-3 { animation-delay: 0.3s; opacity: 0; }
        .fade-up-4 { animation-delay: 0.4s; opacity: 0; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>

      <div className="font-sans">
        {/* ================= TOP ANNOUNCEMENT BAR ================= */}
        <div className="bg-[#0F1B2D] text-white text-center py-2.5 px-4">
          <p className="text-[11px] sm:text-xs tracking-[0.2em] uppercase font-light">
            <span className="text-[#D4A868]">Admissions Open</span>
            <span className="mx-3 text-white/30">|</span>
            2024–25 Session
            <span className="mx-3 text-white/30">|</span>
            <a href="#admission" className="link-underline">Apply Today</a>
          </p>
        </div>

        {/* ================= HEADER ================= */}
        <header className={`sticky top-0 z-50 bg-white transition-all duration-500 ${
          scrolled ? 'shadow-[0_1px_0_rgba(15,27,45,0.06)]' : ''
        }`}>
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="flex justify-between items-center h-20">
              {/* Logo */}
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 bg-[#0F1B2D] flex items-center justify-center relative">
                  <span className="font-serif text-xl font-bold text-white">A</span>
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#B8894A]"></div>
                </div>
                <div>
                  <h1 className="font-serif text-xl font-bold text-[#0F1B2D] leading-none tracking-tight">AARIVOtech</h1>
                  <p className="text-[9px] uppercase tracking-[0.3em] text-[#0F1B2D]/40 mt-1">Est. 1999</p>
                </div>
              </div>

              {/* Desktop Nav */}
              <nav className="hidden lg:flex items-center gap-9">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className="link-underline text-[13px] font-medium text-[#0F1B2D]/70 hover:text-[#0F1B2D] transition-colors tracking-wide"
                  >
                    {link.label}
                  </button>
                ))}
              </nav>

              {/* CTA */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowLoginModal(true)}
                  className="hidden sm:inline-flex items-center gap-2 btn-navy px-6 py-2.5 text-[13px] font-semibold tracking-wide"
                >
                  Student Login
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>

                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="lg:hidden p-2 text-[#0F1B2D]"
                >
                  <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                    {mobileMenuOpen
                      ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden bg-white border-t hairline">
              <div className="px-6 py-4 space-y-1">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className="block w-full text-left px-3 py-3 text-[#0F1B2D]/70 hover:text-[#0F1B2D] hover:bg-[#0F1B2D]/[0.03] text-sm font-medium tracking-wide transition"
                  >
                    {link.label}
                  </button>
                ))}
                <button
                  onClick={() => { setMobileMenuOpen(false); setShowLoginModal(true); }}
                  className="w-full mt-2 btn-navy px-4 py-3 text-sm font-semibold"
                >
                  Student Login
                </button>
              </div>
            </div>
          )}
        </header>

        {/* ================= HERO ================= */}
        <section id="home" className="relative border-b hairline overflow-hidden scroll-mt-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 lg:py-32">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              {/* Left: Text */}
              <div className="lg:col-span-7">
                <div className="fade-up fade-up-1">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="h-px w-12 bg-[#B8894A]"></div>
                    <span className="text-[11px] uppercase tracking-[0.35em] text-[#B8894A] font-medium">
                      Education for a Better Tomorrow
                    </span>
                  </div>
                </div>

                <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] font-bold leading-[1.02] text-[#0F1B2D] mb-8 tracking-tight fade-up fade-up-2">
                  Where <span className="italic gold-text">knowledge</span>
                  <br />
                  meets <span className="italic">character</span>.
                </h1>

                <p className="text-lg text-[#0F1B2D]/60 max-w-xl leading-relaxed mb-10 fade-up fade-up-3">
                  A quarter-century of nurturing brilliant minds through rigorous academics,
                  timeless values, and a campus built for curiosity.
                </p>

                <div className="flex flex-wrap items-center gap-4 mb-14 fade-up fade-up-4">
                  <button
                    onClick={() => scrollToSection('admission')}
                    className="btn-navy px-8 py-4 text-sm font-semibold tracking-wide inline-flex items-center gap-2"
                  >
                    Apply for Admission
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                  <button
                    onClick={() => scrollToSection('about')}
                    className="btn-outline px-8 py-4 text-sm font-semibold tracking-wide text-[#0F1B2D]"
                  >
                    Discover Our Story
                  </button>
                </div>

                {/* Stats inline */}
                <div className="grid grid-cols-4 gap-6 max-w-2xl pt-8 border-t hairline">
                  {[
                    { value: '25+', label: 'Years' },
                    { value: '2000+', label: 'Students' },
                    { value: '120+', label: 'Faculty' },
                    { value: '98%', label: 'Pass Rate' },
                  ].map((stat, i) => (
                    <div key={i}>
                      <p className="font-serif text-3xl lg:text-4xl font-bold text-[#0F1B2D]">{stat.value}</p>
                      <p className="text-[10px] uppercase tracking-[0.2em] text-[#0F1B2D]/40 mt-1.5">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Editorial Image Block */}
              <div className="lg:col-span-5 relative">
                <div className="relative aspect-[4/5] bg-[#0F1B2D] overflow-hidden">
                  {/* Decorative Frame */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#0F1B2D] via-[#1A2A42] to-[#0F1B2D]"></div>

                  {/* Gold Corner Accents */}
                  <div className="absolute top-6 left-6 w-12 h-12 border-t-2 border-l-2 border-[#B8894A]"></div>
                  <div className="absolute bottom-6 right-6 w-12 h-12 border-b-2 border-r-2 border-[#B8894A]"></div>

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-10">
                    <div className="w-16 h-16 border border-[#B8894A]/40 flex items-center justify-center mb-6">
                      <svg className="w-8 h-8 text-[#B8894A]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <p className="font-serif italic text-2xl text-white/90 leading-snug mb-4">
                      "Education is the most powerful weapon which you can use to change the world."
                    </p>
                    <div className="w-12 h-px bg-[#B8894A] my-4"></div>
                    <p className="text-[11px] uppercase tracking-[0.3em] text-white/40">
                      — Our Philosophy
                    </p>
                  </div>

                  {/* Bottom Badge */}
                  <div className="absolute bottom-0 left-0 right-0 bg-[#B8894A] text-white py-3.5 px-6 flex items-center justify-between">
                    <span className="text-[11px] uppercase tracking-[0.2em] font-medium">Now Enrolling</span>
                    <span className="font-serif text-sm italic">2024–25</span>
                  </div>
                </div>

                {/* Floating Year Badge */}
                <div className="hidden lg:flex absolute -top-6 -left-6 w-24 h-24 bg-white border hairline items-center justify-center flex-col shadow-sm">
                  <span className="font-serif text-3xl font-bold text-[#B8894A]">99</span>
                  <span className="text-[9px] uppercase tracking-[0.2em] text-[#0F1B2D]/50 mt-0.5">Since</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= TRUST STRIP ================= */}
        <section className="border-b hairline">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
              {[
                { text: 'CBSE Affiliated', sub: 'Board No. 1234567' },
                { text: 'ISO 9001:2015', sub: 'Certified Institution' },
                { text: 'Smart Campus', sub: 'Digital Classrooms' },
                { text: 'Green Campus', sub: 'Eco-Conscious' },
              ].map((item, i) => (
                <div key={i} className="text-center md:text-left">
                  <p className="font-serif text-sm font-semibold text-[#0F1B2D]">{item.text}</p>
                  <p className="text-[10px] uppercase tracking-[0.15em] text-[#0F1B2D]/40 mt-1">{item.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= ABOUT ================= */}
        <section id="about" className="py-24 lg:py-32 scroll-mt-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            {/* Section Header */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
              <div className="lg:col-span-5">
                <div className="flex items-center gap-3 mb-6">
                  <span className="font-serif text-sm text-[#B8894A] italic">01</span>
                  <div className="h-px w-12 bg-[#B8894A]"></div>
                  <span className="text-[11px] uppercase tracking-[0.3em] text-[#0F1B2D]/50">About Us</span>
                </div>
                <h2 className="font-serif text-4xl lg:text-5xl font-bold text-[#0F1B2D] leading-[1.1]">
                  A legacy of <span className="italic gold-text">excellence</span>, built since 1999.
                </h2>
              </div>
              <div className="lg:col-span-7 lg:pt-12">
                <p className="text-[#0F1B2D]/60 text-lg leading-relaxed mb-5">
                  For over two decades, AARIVOtech has been a beacon of academic excellence — blending
                  time-honoured teaching traditions with modern pedagogy.
                </p>
                <p className="text-[#0F1B2D]/60 leading-relaxed">
                  Our educators, modern infrastructure, and balanced curriculum ensure every student
                  receives the individual attention they deserve to thrive in a changing world.
                </p>
              </div>
            </div>

            {/* Editorial Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#0F1B2D]/10 border hairline">
              {[
                { num: '01', title: 'Our Mission', body: 'Nurture every student\'s potential through critical thinking, creativity, and compassion.' },
                { num: '02', title: 'Our Vision', body: 'To be recognized globally for innovation in teaching and holistic student development.' },
                { num: '03', title: 'Our Values', body: 'Integrity, curiosity, respect, and a lifelong love for learning shape everything we do.' },
              ].map((item, i) => (
                <div key={i} className="bg-white p-10 lg:p-12 card-hover">
                  <span className="font-serif text-5xl text-[#B8894A]/30 italic">{item.num}</span>
                  <h3 className="font-serif text-2xl font-bold text-[#0F1B2D] mt-6 mb-4">{item.title}</h3>
                  <p className="text-[#0F1B2D]/60 leading-relaxed text-[15px]">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= ACADEMICS ================= */}
        <section id="academics" className="py-24 lg:py-32 bg-[#FAFAF7] border-y hairline scroll-mt-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="font-serif text-sm text-[#B8894A] italic">02</span>
                  <div className="h-px w-12 bg-[#B8894A]"></div>
                  <span className="text-[11px] uppercase tracking-[0.3em] text-[#0F1B2D]/50">Academics</span>
                </div>
                <h2 className="font-serif text-4xl lg:text-5xl font-bold text-[#0F1B2D] leading-[1.1] max-w-2xl">
                  Programs crafted for every <span className="italic gold-text">stage</span> of learning.
                </h2>
              </div>
              <p className="text-[#0F1B2D]/50 max-w-sm text-sm leading-relaxed lg:pb-3">
                From foundational literacy to career-focused streams — a curriculum that grows with your child.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { grade: 'Primary', range: '1st – 5th', desc: 'Foundational literacy, numeracy, and curiosity-driven activity learning.' },
                { grade: 'Middle School', range: '6th – 8th', desc: 'Science, social studies, languages and an introduction to computer science.' },
                { grade: 'Secondary', range: '9th – 10th', desc: 'Board exam preparation with strong focus on core subjects.' },
                { grade: 'Senior Secondary', range: '11th – 12th', desc: 'Science, Commerce, and Humanities streams with career counselling.' },
                { grade: 'Co-curricular', range: 'All Grades', desc: 'Art, music, debate, robotics and sports to build well-rounded personalities.' },
                { grade: 'Career Guidance', range: '9th – 12th', desc: 'Dedicated counsellors to help plan streams and competitive exams.' },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="group bg-white border hairline p-8 lg:p-10 card-hover relative overflow-hidden"
                >
                  {/* Gold top bar on hover */}
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#B8894A] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"></div>

                  <div className="flex items-start justify-between mb-8">
                    <span className="text-[10px] uppercase tracking-[0.25em] text-[#0F1B2D]/40 font-medium">
                      {item.range}
                    </span>
                    <span className="font-serif text-sm text-[#B8894A] italic">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-[#0F1B2D] mb-4">{item.grade}</h3>
                  <p className="text-[#0F1B2D]/55 text-[15px] leading-relaxed mb-6">{item.desc}</p>

                  <div className="flex items-center gap-2 text-[#0F1B2D] text-[12px] uppercase tracking-[0.2em] font-medium opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-500">
                    Learn More
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= FACILITIES ================= */}
        <section id="facilities" className="py-24 lg:py-32 scroll-mt-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <div className="flex items-center justify-center gap-3 mb-6">
                <span className="font-serif text-sm text-[#B8894A] italic">03</span>
                <div className="h-px w-12 bg-[#B8894A]"></div>
                <span className="text-[11px] uppercase tracking-[0.3em] text-[#0F1B2D]/50">Campus</span>
              </div>
              <h2 className="font-serif text-4xl lg:text-5xl font-bold text-[#0F1B2D] leading-[1.1]">
                Facilities that <span className="italic gold-text">inspire</span>.
              </h2>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[#0F1B2D]/10 border hairline">
              {[
                { title: 'Modern Library', desc: '15,000+ books & digital reading zone.', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253' },
                { title: 'Science Labs', desc: 'Fully equipped Physics, Chem & Bio labs.', icon: 'M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z' },
                { title: 'Computer Lab', desc: 'Latest systems, high-speed internet.', icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
                { title: 'Sports Complex', desc: 'Basketball, football & cricket ground.', icon: 'M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7' },
                { title: 'Art & Music', desc: 'Creative spaces for expression.', icon: 'M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z' },
                { title: 'Transport', desc: 'GPS-enabled buses on all routes.', icon: 'M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4' },
                { title: 'Cafeteria', desc: 'Hygienic, nutritious daily meals.', icon: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z' },
                { title: 'Medical Room', desc: 'On-campus nurse & first-aid.', icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z' },
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-8 group hover:bg-[#FAFAF7] transition-colors duration-500">
                  <div className="w-10 h-10 flex items-center justify-center mb-6 text-[#0F1B2D]/40 group-hover:text-[#B8894A] transition-colors duration-500">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.3">
                      <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                    </svg>
                  </div>
                  <h4 className="font-serif text-lg font-bold text-[#0F1B2D] mb-2">{item.title}</h4>
                  <p className="text-[#0F1B2D]/50 text-[13px] leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= ADMISSION ================= */}
        <section id="admission" className="py-24 lg:py-32 bg-[#0F1B2D] text-white scroll-mt-24 relative overflow-hidden">
          {/* Gold corner decorations */}
          <div className="absolute top-0 right-0 w-32 h-32 border-t-2 border-r-2 border-[#B8894A]/20"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 border-b-2 border-l-2 border-[#B8894A]/20"></div>

          <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              {/* Left Copy */}
              <div className="lg:col-span-5">
                <div className="flex items-center gap-3 mb-6">
                  <span className="font-serif text-sm text-[#B8894A] italic">04</span>
                  <div className="h-px w-12 bg-[#B8894A]"></div>
                  <span className="text-[11px] uppercase tracking-[0.3em] text-white/50">Admission 2024–25</span>
                </div>
                <h2 className="font-serif text-4xl lg:text-5xl font-bold leading-[1.1] mb-8">
                  Begin your <span className="italic text-[#D4A868]">journey</span> with us.
                </h2>
                <p className="text-white/60 leading-relaxed mb-12">
                  Fill out the form and our admission team will get back to you within two working days.
                </p>

                <div className="space-y-8">
                  {[
                    { step: '01', title: 'Submit Application', desc: 'Fill the form with basic details.' },
                    { step: '02', title: 'Document Verification', desc: 'Our team reviews your submission.' },
                    { step: '03', title: 'Interview & Confirm', desc: 'Meet us, then welcome aboard.' },
                  ].map((s, i) => (
                    <div key={i} className="flex gap-5">
                      <div className="font-serif text-2xl text-[#B8894A] w-10 flex-shrink-0">{s.step}</div>
                      <div className="border-l border-white/10 pl-5">
                        <h4 className="font-medium mb-1.5 text-white/90">{s.title}</h4>
                        <p className="text-white/40 text-sm">{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Form */}
              <div className="lg:col-span-7">
                <div className="bg-white text-[#0F1B2D] p-8 lg:p-12">
                  {admissionSubmitted ? (
                    <div className="text-center py-16">
                      <div className="w-20 h-20 border-2 border-[#B8894A] flex items-center justify-center mx-auto mb-8">
                        <svg className="w-10 h-10 text-[#B8894A]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h4 className="font-serif text-3xl font-bold mb-4">Application Received</h4>
                      <p className="text-[#0F1B2D]/60 mb-10 max-w-md mx-auto leading-relaxed">
                        Thank you for applying. Our team will reach out shortly on your phone or email.
                      </p>
                      <button
                        onClick={() => setAdmissionSubmitted(false)}
                        className="btn-navy px-8 py-3.5 text-sm font-semibold tracking-wide"
                      >
                        Submit Another Application
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleAdmissionSubmit}>
                      <div className="mb-10">
                        <h3 className="font-serif text-2xl font-bold text-[#0F1B2D] mb-2">Student Admission Form</h3>
                        <p className="text-[#0F1B2D]/50 text-sm">All fields marked with * are required.</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                        <div className="md:col-span-2">
                          <label className="block text-[10px] uppercase tracking-[0.2em] text-[#0F1B2D]/50 font-medium mb-2.5">
                            Student's Full Name *
                          </label>
                          <input
                            required
                            value={admissionForm.name}
                            onChange={(e) => setAdmissionForm({ ...admissionForm, name: e.target.value })}
                            className="w-full px-0 py-3 bg-transparent border-0 border-b border-[#0F1B2D]/15 focus:border-[#B8894A] outline-none transition text-[#0F1B2D] placeholder-[#0F1B2D]/25"
                            placeholder="Enter full name"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] uppercase tracking-[0.2em] text-[#0F1B2D]/50 font-medium mb-2.5">
                            Class Applying For *
                          </label>
                          <input
                            required
                            value={admissionForm.class}
                            onChange={(e) => setAdmissionForm({ ...admissionForm, class: e.target.value })}
                            className="w-full px-0 py-3 bg-transparent border-0 border-b border-[#0F1B2D]/15 focus:border-[#B8894A] outline-none transition text-[#0F1B2D] placeholder-[#0F1B2D]/25"
                            placeholder="e.g. 9th A"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] uppercase tracking-[0.2em] text-[#0F1B2D]/50 font-medium mb-2.5">
                            Date of Birth
                          </label>
                          <input
                            type="date"
                            value={admissionForm.dob}
                            onChange={(e) => setAdmissionForm({ ...admissionForm, dob: e.target.value })}
                            className="w-full px-0 py-3 bg-transparent border-0 border-b border-[#0F1B2D]/15 focus:border-[#B8894A] outline-none transition text-[#0F1B2D]"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] uppercase tracking-[0.2em] text-[#0F1B2D]/50 font-medium mb-2.5">
                            Parent / Guardian *
                          </label>
                          <input
                            required
                            value={admissionForm.parentName}
                            onChange={(e) => setAdmissionForm({ ...admissionForm, parentName: e.target.value })}
                            className="w-full px-0 py-3 bg-transparent border-0 border-b border-[#0F1B2D]/15 focus:border-[#B8894A] outline-none transition text-[#0F1B2D] placeholder-[#0F1B2D]/25"
                            placeholder="Guardian's name"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] uppercase tracking-[0.2em] text-[#0F1B2D]/50 font-medium mb-2.5">
                            Phone Number *
                          </label>
                          <input
                            required
                            type="tel"
                            value={admissionForm.phone}
                            onChange={(e) => setAdmissionForm({ ...admissionForm, phone: e.target.value })}
                            className="w-full px-0 py-3 bg-transparent border-0 border-b border-[#0F1B2D]/15 focus:border-[#B8894A] outline-none transition text-[#0F1B2D] placeholder-[#0F1B2D]/25"
                            placeholder="+91 98765 43210"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-[10px] uppercase tracking-[0.2em] text-[#0F1B2D]/50 font-medium mb-2.5">
                            Email Address *
                          </label>
                          <input
                            required
                            type="email"
                            value={admissionForm.email}
                            onChange={(e) => setAdmissionForm({ ...admissionForm, email: e.target.value })}
                            className="w-full px-0 py-3 bg-transparent border-0 border-b border-[#0F1B2D]/15 focus:border-[#B8894A] outline-none transition text-[#0F1B2D] placeholder-[#0F1B2D]/25"
                            placeholder="parent@example.com"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-[10px] uppercase tracking-[0.2em] text-[#0F1B2D]/50 font-medium mb-2.5">
                            Residential Address *
                          </label>
                          <textarea
                            required
                            rows={3}
                            value={admissionForm.address}
                            onChange={(e) => setAdmissionForm({ ...admissionForm, address: e.target.value })}
                            className="w-full px-0 py-3 bg-transparent border-0 border-b border-[#0F1B2D]/15 focus:border-[#B8894A] outline-none transition text-[#0F1B2D] placeholder-[#0F1B2D]/25 resize-none"
                            placeholder="Enter full address"
                          />
                        </div>
                        <div className="md:col-span-2 mt-6">
                          <button
                            type="submit"
                            disabled={submittingAdmission}
                            className="w-full btn-navy py-4 text-sm font-semibold tracking-wide disabled:opacity-60 inline-flex items-center justify-center gap-2"
                          >
                            {submittingAdmission ? 'Submitting…' : 'Submit Application'}
                            {!submittingAdmission && (
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                              </svg>
                            )}
                          </button>
                          <p className="text-center text-[11px] text-[#0F1B2D]/40 mt-4 tracking-wide">
                            By submitting, you agree to be contacted by our admission team.
                          </p>
                        </div>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= CONTACT ================= */}
        <section id="contact" className="py-24 lg:py-32 scroll-mt-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <div className="flex items-center justify-center gap-3 mb-6">
                <span className="font-serif text-sm text-[#B8894A] italic">05</span>
                <div className="h-px w-12 bg-[#B8894A]"></div>
                <span className="text-[11px] uppercase tracking-[0.3em] text-[#0F1B2D]/50">Get in Touch</span>
              </div>
              <h2 className="font-serif text-4xl lg:text-5xl font-bold text-[#0F1B2D] leading-[1.1]">
                We'd love to <span className="italic gold-text">hear</span> from you.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[#0F1B2D]/10 border hairline max-w-5xl mx-auto">
              {[
                { label: 'Visit Us', value: '123 Education Lane,\nKnowledge City, 110001', icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z' },
                { label: 'Call Us', value: '+91 98765 43210\n+91 11 4567 8900', icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z' },
                { label: 'Email Us', value: 'admissions@aarivotech.edu\ninfo@aarivotech.edu', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
              ].map((item, i) => (
                <div key={i} className="bg-white p-10 text-center group hover:bg-[#FAFAF7] transition-colors duration-500">
                  <div className="w-12 h-12 mx-auto flex items-center justify-center mb-6 text-[#0F1B2D]/40 group-hover:text-[#B8894A] transition-colors duration-500">
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.2">
                      <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                    </svg>
                  </div>
                  <p className="text-[10px] uppercase tracking-[0.3em] text-[#0F1B2D]/40 mb-3">{item.label}</p>
                  <p className="text-[#0F1B2D] whitespace-pre-line leading-relaxed text-[15px]">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= CTA BANNER ================= */}
        <section className="border-t hairline">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-20 text-center">
            <p className="font-serif italic text-2xl lg:text-3xl text-[#0F1B2D]/70 mb-8">
              Already a student?
            </p>
            <button
              onClick={() => setShowLoginModal(true)}
              className="btn-navy px-10 py-4 text-sm font-semibold tracking-wide inline-flex items-center gap-2"
            >
              Access Student Portal
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </section>

        {/* ================= FOOTER ================= */}
        <footer className="border-t hairline">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 py-14">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-12">
              {/* Brand */}
              <div className="md:col-span-5">
                <div className="flex items-center gap-3.5 mb-5">
                  <div className="w-11 h-11 bg-[#0F1B2D] flex items-center justify-center relative">
                    <span className="font-serif text-xl font-bold text-white">A</span>
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#B8894A]"></div>
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#0F1B2D]">AARIVOtech</h3>
                    <p className="text-[9px] uppercase tracking-[0.3em] text-[#0F1B2D]/40 mt-0.5">Est. 1999</p>
                  </div>
                </div>
                <p className="text-[#0F1B2D]/50 text-sm leading-relaxed max-w-sm">
                  Education for a better tomorrow. Nurturing brilliant minds and building character since 1999.
                </p>
              </div>

              {/* Links */}
              <div className="md:col-span-2">
                <h4 className="text-[10px] uppercase tracking-[0.25em] text-[#0F1B2D]/40 font-medium mb-5">School</h4>
                <ul className="space-y-3 text-sm">
                  <li><button onClick={() => scrollToSection('about')} className="text-[#0F1B2D]/70 hover:text-[#B8894A] transition">About</button></li>
                  <li><button onClick={() => scrollToSection('academics')} className="text-[#0F1B2D]/70 hover:text-[#B8894A] transition">Academics</button></li>
                  <li><button onClick={() => scrollToSection('facilities')} className="text-[#0F1B2D]/70 hover:text-[#B8894A] transition">Campus</button></li>
                </ul>
              </div>

              <div className="md:col-span-2">
                <h4 className="text-[10px] uppercase tracking-[0.25em] text-[#0F1B2D]/40 font-medium mb-5">Admission</h4>
                <ul className="space-y-3 text-sm">
                  <li><button onClick={() => scrollToSection('admission')} className="text-[#0F1B2D]/70 hover:text-[#B8894A] transition">Apply</button></li>
                  <li><button onClick={() => scrollToSection('contact')} className="text-[#0F1B2D]/70 hover:text-[#B8894A] transition">Contact</button></li>
                  <li><a href="#" className="text-[#0F1B2D]/70 hover:text-[#B8894A] transition">Fee Structure</a></li>
                </ul>
              </div>

              <div className="md:col-span-3">
                <h4 className="text-[10px] uppercase tracking-[0.25em] text-[#0F1B2D]/40 font-medium mb-5">Legal</h4>
                <ul className="space-y-3 text-sm">
                  <li><a href="#" className="text-[#0F1B2D]/70 hover:text-[#B8894A] transition">Privacy Policy</a></li>
                  <li><a href="#" className="text-[#0F1B2D]/70 hover:text-[#B8894A] transition">Terms of Use</a></li>
                  <li><a href="/admin-login" className="text-[#0F1B2D]/70 hover:text-[#B8894A] transition">Staff Login</a></li>
                </ul>
              </div>
            </div>

            <div className="pt-8 border-t hairline flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-xs text-[#0F1B2D]/40">
                © 2024 AARIVOtech. All rights reserved.
              </p>
              <p className="text-xs text-[#0F1B2D]/40 italic font-serif">
                Education for a Better Tomorrow
              </p>
            </div>
          </div>
        </footer>
      </div>

      {/* ================= LOGIN MODAL ================= */}
      {showLoginModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#0F1B2D]/60 backdrop-blur-sm"
          onClick={(e) => e.target === e.currentTarget && setShowLoginModal(false)}
        >
          <div className="relative w-full max-w-md bg-white shadow-2xl">
            {/* Gold top bar */}
            <div className="h-1 bg-gradient-to-r from-transparent via-[#B8894A] to-transparent"></div>

            {/* Close */}
            <button
              onClick={() => setShowLoginModal(false)}
              className="absolute top-5 right-5 p-2 text-[#0F1B2D]/40 hover:text-[#0F1B2D] transition"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="p-10">
              <div className="text-center mb-10">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <div className="h-px w-8 bg-[#B8894A]"></div>
                  <span className="text-[10px] uppercase tracking-[0.35em] text-[#B8894A] font-medium">
                    Student Portal
                    
                  </span>
                  <div className="h-px w-8 bg-[#B8894A]"></div>
                </div>
                <h2 className="font-serif text-3xl font-bold text-[#0F1B2D] mb-2">Welcome Back</h2>
                <p className="text-[#0F1B2D]/50 text-sm">Sign in to access your dashboard</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-7">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-[#0F1B2D]/50 font-medium mb-2.5">
                    Roll Number
                  </label>
                  <input
                    type="text"
                    value={rollNumber}
                    onChange={(e) => setRollNumber(e.target.value)}
                    placeholder="S001"
                    className="w-full px-0 py-3 bg-transparent border-0 border-b border-[#0F1B2D]/15 focus:border-[#B8894A] outline-none transition text-[#0F1B2D] placeholder-[#0F1B2D]/25"
                    required
                    autoFocus
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-[#0F1B2D]/50 font-medium mb-2.5">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-0 py-3 bg-transparent border-0 border-b border-[#0F1B2D]/15 focus:border-[#B8894A] outline-none transition text-[#0F1B2D] placeholder-[#0F1B2D]/25"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-navy py-4 text-sm font-semibold tracking-wide disabled:opacity-60 mt-4"
                >
                  {loading ? 'Signing in…' : 'Sign In'}
                </button>
              </form>

              <div className="mt-8 pt-8 border-t hairline">
                <p className="text-center text-xs text-[#0F1B2D]/40">
                  Demo credentials
                </p>
                <p className="text-center text-xs text-[#0F1B2D]/60 mt-1.5 font-mono">
                  <span className="text-[#B8894A]">S001</span> / <span className="text-[#B8894A]">student123</span>
                </p>
                <a
                  href="/admin-login"
                  className="mt-5 block text-center text-xs text-[#0F1B2D]/50 hover:text-[#B8894A] transition tracking-wide"
                >
                  Staff / Admin Login →
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SchoolHome;