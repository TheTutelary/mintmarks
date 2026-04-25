"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Coins, ChevronDown, LogOut, User, Shield, Gauge, Menu, X } from 'lucide-react';

export function Header() {
  const router = useRouter();
  const [authState, setAuthState] = useState<{ loggedIn: boolean; role: string | null; name: string | null }>({
    loggedIn: false,
    role: null,
    name: null
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('mintmarks_token');
    if (token) {
      try {
        const payloadStr = atob(token.split('.')[1]);
        const payload = JSON.parse(payloadStr);
        setAuthState({
          loggedIn: true,
          role: payload.role,
          name: payload.name || 'User'
        });
      } catch (e) {
        localStorage.removeItem('mintmarks_token');
      }
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem('mintmarks_token');
    setAuthState({ loggedIn: false, role: null, name: null });
    router.push('/');
  };

  return (
    <header className="sticky top-0 z-[60] w-full bg-[#EFEFEA]/90 backdrop-blur-sm border-b border-neutral-200/50">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between max-w-[1400px]">
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-[#E69123] to-[#B65D0A] shadow-md transition-transform group-hover:scale-105">
            <Coins className="h-3.5 w-3.5 text-white" />
          </div>
          <span className="font-serif italic font-black text-2xl md:text-3xl text-neutral-900 tracking-tight" style={{ fontWeight: 900 }}>
            MintMarks
          </span>
        </Link>
        
        {/* Mobile Menu Toggle */}
        <button 
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden flex items-center justify-center p-2 h-12 w-12 text-neutral-900 z-50 rounded-full active:bg-neutral-100 cursor-pointer"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? <X className="w-8 h-8 pointer-events-none" /> : <Menu className="w-8 h-8 pointer-events-none" />}
        </button>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/how-it-works" className="text-base font-medium text-neutral-600 hover:text-neutral-900 transition-colors">
            How it Works
          </Link>
          <Link href="/showcase" className="text-base font-medium text-[#B65D0A] hover:text-[#924A08] transition-colors">
            Showcase Gallery
          </Link>
          <Link href="/faq" className="text-base font-medium text-neutral-600 hover:text-neutral-900 transition-colors">
            FAQ
          </Link>
          
          <span className="text-[#C6C6C6]">|</span>

          {!authState.loggedIn ? (
            <>
              <Link href="/auth/login" className="text-base font-medium text-neutral-600 hover:text-neutral-900 transition-colors">
                Sign In
              </Link>
              <Link href="/auth/register" className="ml-2 text-base font-bold bg-[#E69123] text-white px-6 py-2.5 rounded-[1.25rem] hover:bg-[#D4811B] transition-colors shadow-sm">
                Begin Membership
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <Link href="/submit" className="text-base font-bold bg-[#E69123] text-white px-5 py-2.5 rounded-[1.25rem] hover:bg-[#D4811B] transition-colors shadow-sm">
                Submit a Coin
              </Link>

              {/* Management Dropdown for High-Level Roles */}
              {(authState.role === 'ADMIN' || authState.role === 'EXPERT') && (
                <div className="relative group">
                  <button className="flex items-center gap-2 text-base font-bold text-neutral-700 bg-white border border-neutral-200 px-4 py-2 rounded-full hover:bg-neutral-50 transition-colors">
                    <Shield className="w-4 h-4 text-[#E69123]" />
                    Management
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  
                  <div className="absolute right-0 mt-2 w-56 bg-white border border-neutral-200 rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 overflow-hidden">
                    {authState.role === 'ADMIN' && (
                      <>
                        <Link href="/admin/submissions" className="flex items-center gap-3 px-4 py-3 hover:bg-neutral-50 text-neutral-700 font-medium border-b border-neutral-100">
                          <Shield className="w-4 h-4" />
                          Admin Console
                        </Link>
                        <Link href="/admin/showcase" className="flex items-center gap-3 px-4 py-3 hover:bg-neutral-50 text-neutral-700 font-medium border-b border-neutral-100">
                          <Gauge className="w-4 h-4" />
                          Curation Panel
                        </Link>
                      </>
                    )}
                    {(authState.role === 'EXPERT' || authState.role === 'ADMIN') && (
                      <Link href="/expert" className="flex items-center gap-3 px-4 py-3 hover:bg-neutral-50 text-neutral-700 font-medium">
                        <User className="w-4 h-4" />
                        Expert Portal
                      </Link>
                    )}
                  </div>
                </div>
              )}
              
              <Link href="/dashboard" className="text-base font-bold text-neutral-600 hover:text-neutral-900 transition-colors px-2">
                Dashboard
              </Link>
              
              <button 
                onClick={handleSignOut}
                className="ml-2 text-base font-bold bg-neutral-900 text-white px-5 py-2.5 rounded-[1.25rem] hover:bg-neutral-800 transition-colors shadow-sm flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          )}
        </nav>

        {/* Mobile Sidebar Navigation */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 top-[80px] z-[55] bg-[#EFEFEA] md:hidden overflow-y-auto min-h-screen">
            <div className="flex flex-col p-6 gap-8">
              <Link 
                href="/how-it-works" 
                className="text-lg font-bold font-serif text-neutral-900"
                onClick={() => setMobileMenuOpen(false)}
              >
                How it Works
              </Link>
              <Link 
                href="/showcase" 
                className="text-lg font-bold font-serif text-[#B65D0A]"
                onClick={() => setMobileMenuOpen(false)}
              >
                Showcase Gallery
              </Link>
              <Link 
                href="/faq" 
                className="text-lg font-bold font-serif text-neutral-900"
                onClick={() => setMobileMenuOpen(false)}
              >
                FAQ
              </Link>
              
              {!authState.loggedIn ? (
                <div className="flex flex-col gap-4 mt-2">
                  <Link 
                    href="/auth/login" 
                    className="text-base font-medium text-neutral-600"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Link 
                    href="/auth/register" 
                    className="text-center text-base font-bold bg-[#E69123] text-white py-3 rounded-2xl"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Begin Membership
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col gap-5">
                  <Link 
                    href="/submit" 
                    className="text-center text-base font-bold bg-[#E69123] text-white py-3 rounded-2xl"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Submit a Coin
                  </Link>

                  {authState.role === 'ADMIN' && (
                    <div className="flex flex-col gap-3 border-l-2 border-brand-500 pl-4">
                      <div className="text-[0.75rem] font-bold text-brand-500 uppercase tracking-widest">Administration</div>
                      <Link href="/admin/submissions" className="text-base font-medium" onClick={() => setMobileMenuOpen(false)}>Submissions</Link>
                      <Link href="/admin/showcase" className="text-base font-medium" onClick={() => setMobileMenuOpen(false)}>Curation</Link>
                    </div>
                  )}
                  
                  {(authState.role === 'EXPERT' || authState.role === 'ADMIN') && (
                    <div className="flex flex-col gap-3 border-l-2 border-amber-500 pl-4">
                      <div className="text-[0.75rem] font-bold text-amber-500 uppercase tracking-widest">Expert Access</div>
                      <Link href="/expert" className="text-base font-medium" onClick={() => setMobileMenuOpen(false)}>Expert Portal</Link>
                    </div>
                  )}

                  <Link href="/dashboard" className="text-base font-medium text-neutral-600 mt-2" onClick={() => setMobileMenuOpen(false)}>
                    User Dashboard
                  </Link>
                  
                  <button 
                    onClick={() => { handleSignOut(); setMobileMenuOpen(false); }}
                    className="flex items-center justify-center gap-2 text-base font-bold bg-neutral-900 text-white py-3 rounded-2xl mt-4"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
