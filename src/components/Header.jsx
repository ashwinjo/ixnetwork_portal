import React, { useState, useEffect } from 'react';
import { Menu, X, Zap } from 'lucide-react';

const Header = ({ onNavigate }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogoClick = () => {
        onNavigate('home');
        setIsMobileMenuOpen(false);
    };

    return (
        <>
            {/* 1-px electric top accent bar */}
            <div className="fixed top-0 left-0 right-0 h-px z-50 bg-gradient-to-r from-transparent via-obsidian-accent/60 to-transparent" />

            <header
                className={`fixed top-px left-0 right-0 z-40 transition-all duration-300 ${
                    isScrolled
                        ? 'bg-obsidian-1/90 backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.4)] border-b border-obsidian-2 py-3'
                        : 'bg-transparent py-5'
                }`}
            >
                <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
                    {/* Logo */}
                    <button
                        onClick={handleLogoClick}
                        className="flex items-center gap-3 group"
                    >
                        <div className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-obsidian-accent/10 border border-obsidian-accent/30 shadow-[0_0_12px_rgba(0,242,255,0.15)] group-hover:shadow-[0_0_20px_rgba(0,242,255,0.3)] transition-shadow duration-300">
                            <Zap size={18} className="text-obsidian-accent" />
                        </div>
                        <div className="leading-none">
                            <span className="block font-heading font-bold text-lg text-obsidian-accent tracking-tight leading-none">
                                IxNetwork
                            </span>
                            <span className="block text-[9px] font-mono text-obsidian-textSecondary tracking-[0.22em] uppercase mt-0.5">
                                Automation Portal
                            </span>
                        </div>
                    </button>

                    {/* Mobile toggle */}
                    <button
                        className="md:hidden text-obsidian-textSecondary hover:text-obsidian-accent transition-colors p-1"
                        onClick={() => setIsMobileMenuOpen(v => !v)}
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>

                {/* Mobile drawer */}
                {isMobileMenuOpen && (
                    <div className="md:hidden absolute top-full left-0 right-0 bg-obsidian-1/95 backdrop-blur-md border-b border-obsidian-2 p-6 shadow-xl animate-fade-in-down">
                        <nav className="flex flex-col gap-3">
                            {[
                                { label: 'Foundation', href: '#foundation', view: 'home' },
                                { label: 'Anatomy',    href: '#anatomy',    view: 'home' },
                                { label: 'Resources',  href: '#resources',  view: 'home' },
                                { label: 'API Ref',    href: null,          view: 'api'  },
                            ].map(link => (
                                <button
                                    key={link.label}
                                    onClick={() => {
                                        onNavigate(link.view);
                                        if (link.view === 'home' && link.href) {
                                            setTimeout(() => {
                                                document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                                            }, 100);
                                        }
                                        setIsMobileMenuOpen(false);
                                    }}
                                    className="text-left text-sm font-mono text-obsidian-textSecondary hover:text-obsidian-accent transition-colors py-1"
                                >
                                    {link.label}
                                </button>
                            ))}
                        </nav>
                    </div>
                )}
            </header>
        </>
    );
};

export default Header;
