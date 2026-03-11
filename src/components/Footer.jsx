import React from 'react';
import { Zap } from 'lucide-react';

const Footer = () => (
    <footer className="relative bg-obsidian-1 border-t border-obsidian-2 pt-10 pb-8 text-obsidian-textSecondary text-sm overflow-hidden">
        {/* Top accent gradient bar */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-obsidian-accent/40 to-transparent" />

        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Brand */}
            <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-obsidian-accent/10 border border-obsidian-accent/20 flex items-center justify-center">
                    <Zap size={14} className="text-obsidian-accent" />
                </div>
                <div>
                    <p className="font-heading font-bold text-obsidian-textPrimary text-sm leading-none">IxNetwork Portal</p>
                    <p className="text-[10px] text-obsidian-textSecondary/60 mt-0.5">A personal project by Ashwin Joshi · Not affiliated with or supported by Keysight Technologies.</p>
                </div>
            </div>

            {/* Links */}
            <div className="flex gap-6 text-xs font-mono">
                <a href="#" className="hover:text-obsidian-accent transition-colors">Privacy</a>
                <a href="#" className="hover:text-obsidian-accent transition-colors">Terms</a>
                <a href="https://github.com/OpenIxia" target="_blank" rel="noopener noreferrer" className="hover:text-obsidian-accent transition-colors">GitHub</a>
            </div>
        </div>
    </footer>
);

export default Footer;
