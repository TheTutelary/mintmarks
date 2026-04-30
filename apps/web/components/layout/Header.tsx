"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Coins, ChevronDown, LogOut, User, Shield, Gauge, Menu, X } from 'lucide-react';
import { Button, Container } from '@/components/ui';

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
    <header className="sticky top-0 z-[60] w-full bg-neutral-50/90 backdrop-blur-md border-b border-neutral-200/50">
      <Container size="xl" className="h-20 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 group shrink-0 relative z-[70]">
          <div className="flex h-6 w-6 items-center justify-center rounded-full heritage-gradient shadow-md transition-transform group-hover:scale-110">
            <Coins className="h-4 w-4 text-white" />
          </div>
          <span className="font-serif italic font-black text-2xl lg:text-3xl text-neutral-900 tracking-tight leading-none">
            MintMarks
          </span>
        </Link>
        
        {/* Mobile Menu Toggle - Switches earlier (lg instead of md) to prevent nav/logo overlap */}
        <button 
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden flex items-center justify-center p-2 text-neutral-900 z-[70] rounded-xl active:bg-neutral-200/50 transition-colors"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
        
        <nav className="hidden lg:flex items-center gap-x-6 xl:gap-x-8 shrink-0">
          <Link href="/how-it-works" className="text-[15px] font-bold text-neutral-500 hover:text-neutral-900 transition-colors whitespace-nowrap">
            Process
          </Link>
          <Link href="/showcase" className="text-[15px] font-bold text-brand-700 hover:text-brand-900 transition-colors whitespace-nowrap">
            Showcase
          </Link>
          <Link href="/faq" className="text-[15px] font-bold text-neutral-500 hover:text-neutral-900 transition-colors whitespace-nowrap">
            FAQ
          </Link>
          
          <div className="w-px h-5 bg-neutral-200 mx-1" />

          {!authState.loggedIn ? (
            <div className="flex items-center gap-4">
              <Link href="/auth/login" className="text-[15px] font-bold text-neutral-500 hover:text-neutral-900 transition-colors whitespace-nowrap">
                Sign In
              </Link>
              <Button href="/auth/register" variant="primary" size="sm" className="whitespace-nowrap">
                Begin Membership
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Button href="/submit" variant="primary" size="sm" className="whitespace-nowrap">
                Submit a Coin
              </Button>

              {(authState.role === 'ADMIN' || authState.role === 'EXPERT') && (
                <div className="relative group">
                  <button className="flex items-center gap-2 text-[15px] font-bold text-neutral-700 bg-white border border-neutral-200 px-4 py-2 rounded-full hover:bg-neutral-50 transition-colors shadow-sm whitespace-nowrap">
                    <Shield className="w-4 h-4 text-brand-600" />
                    Board
                    <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                  </button>
                  
                  <div className="absolute right-0 mt-3 w-64 bg-white border border-neutral-200 rounded-3xl shadow-premium opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 overflow-hidden py-2">
                    {authState.role === 'ADMIN' && (
                      <>
                        <Link href="/admin/submissions" className="flex items-center gap-3 px-6 py-3 hover:bg-neutral-50 text-neutral-700 font-bold transition-colors">
                          <Shield className="w-4 h-4 text-brand-600" />
                          Admin Console
                        </Link>
                        <Link href="/admin/showcase" className="flex items-center gap-3 px-6 py-3 hover:bg-neutral-50 text-neutral-700 font-bold transition-colors">
                          <Gauge className="w-4 h-4 text-brand-600" />
                          Curation Panel
                        </Link>
                      </>
                    )}
                    {(authState.role === 'EXPERT' || authState.role === 'ADMIN') && (
                      <Link href="/expert" className="flex items-center gap-3 px-6 py-3 hover:bg-neutral-50 text-neutral-700 font-bold transition-colors">
                        <User className="w-4 h-4 text-brand-600" />
                        Expert Portal
                      </Link>
                    )}
                  </div>
                </div>
              )}
              
              <Link href="/dashboard" className="text-[15px] font-bold text-neutral-500 hover:text-neutral-900 transition-colors px-1 whitespace-nowrap">
                Vault
              </Link>
              
              <Button 
                onClick={handleSignOut}
                variant="dark"
                size="sm"
                leftIcon={<LogOut className="w-4 h-4" />}
                className="whitespace-nowrap"
              >
                Sign Out
              </Button>
            </div>
          )}
        </nav>

        {/* Mobile Sidebar Navigation */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 top-0 z-[65] bg-neutral-50 lg:hidden overflow-y-auto animate-in fade-in duration-300">
            <Container className="flex flex-col pt-32 pb-16 gap-10">
              <div className="space-y-6">
                <div className="text-[10px] font-black text-brand-600 uppercase tracking-[0.3em] mb-4 ml-1">Main Navigation</div>
                <Link 
                  href="/how-it-works" 
                  className="block text-3xl font-serif-black text-neutral-900 active:text-brand-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Process
                </Link>
                <Link 
                  href="/showcase" 
                  className="block text-3xl font-serif-black text-brand-700 active:text-brand-900"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Showcase Gallery
                </Link>
                <Link 
                  href="/faq" 
                  className="block text-3xl font-serif-black text-neutral-900 active:text-brand-600"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  FAQ
                </Link>
              </div>
              
              <div className="h-px bg-neutral-200 w-full" />

              {!authState.loggedIn ? (
                <div className="flex flex-col gap-6">
                  <div className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.3em] mb-4 ml-1">Membership</div>
                  <Link 
                    href="/auth/login" 
                    className="text-2xl font-bold text-neutral-500"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                  <Button 
                    href="/auth/register" 
                    size="lg"
                    className="w-full text-xl py-5"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Begin Membership
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col gap-8">
                  <Button 
                    href="/submit" 
                    size="lg"
                    className="w-full text-xl py-5 shadow-premium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Submit a Coin
                  </Button>

                  <div className="grid gap-6">
                    <div className="text-[10px] font-black text-neutral-400 uppercase tracking-[0.3em] ml-1">Account & Vault</div>
                    <Link href="/dashboard" className="text-2xl font-bold text-neutral-900" onClick={() => setMobileMenuOpen(false)}>
                      My Vault
                    </Link>
                    
                    {authState.role === 'ADMIN' && (
                      <div className="flex flex-col gap-4 border-l-4 border-brand-500 pl-6 py-2">
                        <div className="text-[10px] font-black text-brand-500 uppercase tracking-widest">Administration</div>
                        <Link href="/admin/submissions" className="text-xl font-bold" onClick={() => setMobileMenuOpen(false)}>Submissions</Link>
                        <Link href="/admin/showcase" className="text-xl font-bold" onClick={() => setMobileMenuOpen(false)}>Curation</Link>
                      </div>
                    )}
                    
                    {(authState.role === 'EXPERT' || authState.role === 'ADMIN') && (
                      <div className="flex flex-col gap-4 border-l-4 border-brand-400 pl-6 py-2">
                        <div className="text-[10px] font-black text-brand-400 uppercase tracking-widest">Expert Board</div>
                        <Link href="/expert" className="text-xl font-bold" onClick={() => setMobileMenuOpen(false)}>Expert Portal</Link>
                      </div>
                    )}
                  </div>
                  
                  <Button 
                    onClick={() => { handleSignOut(); setMobileMenuOpen(false); }}
                    variant="dark"
                    size="lg"
                    leftIcon={<LogOut className="w-5 h-5" />}
                    className="w-full mt-4"
                  >
                    Sign Out
                  </Button>
                </div>
              )}
            </Container>
          </div>
        )}
      </Container>
    </header>
  );
}
