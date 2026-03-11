import React from 'react';
import { ExternalLink } from 'lucide-react';
import { primaryResources, helpfulLinks } from '../data/links';

const Resources = () => {
    return (
        <section id="resources" className="py-20 bg-obsidian-0 border-t border-obsidian-2">
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center mb-16 animate-fade-in-up">
                    <span className="inline-block text-obsidian-accent font-mono text-xs font-bold tracking-[0.2em] uppercase mb-3 px-3 py-1 bg-obsidian-accent/10 rounded-full border border-obsidian-accent/20">
                        References
                    </span>
                    <h2 className="text-4xl font-heading font-bold text-obsidian-textPrimary mb-4">Resources Hub</h2>
                    <p className="text-lg text-obsidian-textSecondary max-w-2xl mx-auto">
                        Everything you need to go deep.
                    </p>
                </div>

                {/* Primary Resources Cards */}
                <div className="grid md:grid-cols-3 gap-6 mb-16">
                    {primaryResources.map((resource) => (
                        <a
                            key={resource.title}
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-6 rounded-2xl border border-obsidian-2 shadow-sm hover:shadow-[0_0_15px_rgba(0,242,255,0.15)] hover:border-obsidian-accent/50 transition-all duration-300 group hover:-translate-y-1 bg-obsidian-1"
                        >
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${resource.color}`}>
                                <resource.icon size={24} />
                            </div>
                            <h3 className="font-bold text-obsidian-textPrimary mb-2 flex items-center gap-2">
                                {resource.title}
                                <ExternalLink size={14} className="text-obsidian-3 group-hover:text-obsidian-accent" />
                            </h3>
                            <p className="text-sm text-obsidian-textSecondary leading-relaxed">
                                {resource.description}
                            </p>
                        </a>
                    ))}
                </div>
                {/* Helpful Links List section removed as per user request */}
            </div>
        </section>
    );
};

export default Resources;
