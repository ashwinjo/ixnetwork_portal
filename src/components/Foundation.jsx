import React from 'react';
import { Database, Server, Globe, Clock, ChevronDown, ChevronUp, Copy, Check, AlertTriangle, Play, Settings, Activity, Archive, Terminal, ExternalLink, ArrowUp } from 'lucide-react';
import treeModelImg from '../assets/ixnetwork-tree-model.png';
import architectureImg from '../assets/ixnetwork-architecture.png';
import migrationImg from '../assets/ixnetwork-migration.png';
import SessionComponents from './SessionComponents';

const TimelineItem = ({ label, title, desc, time, seconds }) => (
    <a
        href={`https://www.youtube.com/watch?v=ZpCkv6Jm0Mo&t=${seconds}s`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-start gap-4 p-3 rounded-lg bg-obsidian-1/50 border border-obsidian-2 hover:border-obsidian-accent/30 transition-all group"
    >
        <span className="shrink-0 font-mono text-[10px] text-obsidian-accent bg-obsidian-accent/10 px-2 py-1 rounded border border-obsidian-accent/20">
            {time}
        </span>
        <div className="flex-1">
            <div className="flex items-center gap-2 mb-0.5">
                <span className="text-[9px] uppercase font-bold text-obsidian-textSecondary tracking-tighter opacity-70">{label}</span>
                <span className="text-obsidian-textPrimary font-bold text-xs">{title}</span>
            </div>
            <p className="text-[11px] text-obsidian-textSecondary leading-relaxed group-hover:text-obsidian-textPrimary transition-colors">
                {desc}
            </p>
        </div>
    </a>
);

const Foundation = () => {
    return (
        <section id="foundation" className="py-24 border-y border-obsidian-2 bg-obsidian-0">
            <div className="max-w-6xl mx-auto px-6">

                {/* Header Section */}
                <div className="text-center mb-16 animate-fade-in-up">
                    <span className="inline-block text-obsidian-accent font-mono text-xs font-bold tracking-[0.2em] uppercase mb-3 px-3 py-1 bg-obsidian-accent/10 rounded-full border border-obsidian-accent/20">
                        Architecture
                    </span>
                    <h2 className="text-4xl font-heading font-bold text-obsidian-textPrimary mb-4">Foundation of IxNetwork Automation</h2>
                    <p className="text-lg text-obsidian-textSecondary max-w-2xl mx-auto">
                        Understanding the core architecture and the unified object model is the key to mastering automation.
                    </p>
                </div>

                {/* Automation Platform Architecture Image */}
                <div className="mb-20 text-center">
                    <h3 className="text-2xl font-bold text-obsidian-textPrimary mb-6">Automation Platform Architecture</h3>
                    <div className="bg-obsidian-1 p-4 rounded-2xl border border-obsidian-2 shadow-sm inline-block w-full max-w-4xl mx-auto flex items-center justify-center relative">
                        <img
                            src={architectureImg}
                            alt="Automation Platform Architecture"
                            className="max-width-full h-auto rounded opacity-90 hover:opacity-100 transition-opacity"
                        />
                    </div>
                </div>

                {/* Migration Section */}
                <div className="mb-20 text-center">
                    <h3 className="text-2xl font-bold text-obsidian-textPrimary mb-6">From tight couplings to REST API first automation</h3>
                    <div className="bg-obsidian-1 p-4 rounded-2xl border border-obsidian-2 shadow-sm inline-block w-full max-w-4xl mx-auto flex items-center justify-center relative">
                        <img
                            src={migrationImg}
                            alt="Migration Pattern"
                            className="max-width-full h-auto rounded opacity-90 hover:opacity-100 transition-opacity"
                        />
                    </div>
                </div>

                <div className="mb-24">
                    <SessionComponents />
                </div>

                <div className="grid lg:grid-cols-2 gap-12 items-start mb-24">
                    {/* Column 1: Tree Model Card, Video, Timeline */}
                    <div className="space-y-8">
                        {/* Tree Structure Hierarchical object-oriented data model Card */}
                        <div className="bg-obsidian-1 p-8 rounded-2xl border border-obsidian-2 relative overflow-hidden group shadow-2xl">
                            <div className="absolute -top-10 -right-10 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Server size={200} className="text-obsidian-accent" />
                            </div>
                            <h3 className="text-xl font-bold text-obsidian-textPrimary mb-4 flex items-center gap-3">
                                <div className="w-1.5 h-6 bg-obsidian-accent rounded-full" />
                                Tree Structure Hierarchical object-oriented data model
                            </h3>

                            {/* Inserted Tree Model Image */}
                            <div className="mb-8 relative rounded-xl border border-obsidian-2 overflow-hidden bg-white/5">
                                <img
                                    src={treeModelImg}
                                    alt="Tree Data Model"
                                    className="w-full h-auto opacity-90 hover:opacity-100 transition-opacity py-4 px-2"
                                />
                            </div>

                            <p className="text-obsidian-textSecondary leading-relaxed relative z-10 text-md">
                                Beyond the interface, the model remains synchronized and deterministic.
                                We provide <span className="text-obsidian-accent font-mono font-bold px-1.5 py-0.5 bg-obsidian-accent/10 rounded">4 major gateways</span> to perform operations on
                                IxNetwork Session Components.
                            </p>

                            <div className="grid grid-cols-2 gap-4 mt-8">
                                {[
                                    { name: 'Web GUI', icon: Globe },
                                    { name: 'REST API Browser', icon: Database },
                                    { name: 'ixnetwork_restpy python library', icon: Clock },
                                    { name: 'IxNetwork ResourceManager Open API', icon: Server }
                                ].map((way) => (
                                    <div key={way.name} className="flex items-center gap-3 text-xs font-mono font-bold text-obsidian-textPrimary bg-obsidian-0/50 p-3 rounded-lg border border-obsidian-2 hover:border-obsidian-accent/40 transition-all">
                                        <way.icon size={14} className="text-obsidian-accent" />
                                        {way.name}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Video Walkthrough */}
                        <div className="space-y-4">
                            <h4 className="text-obsidian-textPrimary font-bold text-lg flex items-center gap-2">
                                <Play size={20} className="text-obsidian-accent" />
                                IxNetwork Web Edition Overview
                            </h4>
                            <div className="bg-obsidian-1 rounded-2xl aspect-video relative overflow-hidden shadow-2xl border border-obsidian-2">
                                <iframe
                                    className="absolute inset-0 w-full h-full"
                                    src="https://www.youtube.com/embed/ZpCkv6Jm0Mo"
                                    title="IxNetwork Web Edition Overview"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>

                        {/* Automation Focus Timeline */}
                        <div className="mt-8">
                            <h4 className="text-obsidian-accent font-bold text-xs uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
                                <Clock size={14} /> Automation Focus
                            </h4>
                            <div className="space-y-3">
                                <TimelineItem label="Automation Story" title="REST API History" desc="A live log that records manual UI clicks and translates them into REST calls." time="02:48" seconds={168} />
                                <TimelineItem label="Developer Tools" title="Python Code Generation" desc="Automatic generation of Python snippets based on UI actions for script integration." time="03:15" seconds={195} />
                                <TimelineItem label="Learning Resources" title="In-built Documentation" desc="Quick reference guides and a full API library accessible directly from the UI." time="03:26" seconds={206} />
                                <TimelineItem label="API Exploration" title="REST API Browser" desc="A hierarchical tree view to browse, edit, and commit changes directly to the API." time="04:30" seconds={270} />
                                <TimelineItem label="AI/Ops Monitoring" title="Script Watch" desc="A real-time dialog that logs every API call made by an external script (e.g., from VS Code)." time="05:16" seconds={316} />
                            </div>
                        </div>
                    </div>

                    {/* Column 2: Structural Continuity */}
                    <div className="space-y-8">
                        <div className="bg-obsidian-1 p-6 rounded-2xl border border-obsidian-2">
                            <div className="inline-block px-3 py-1 rounded-full bg-obsidian-accent/10 text-obsidian-accent text-[10px] font-bold uppercase tracking-widest mb-4">
                                Structural Continuity
                            </div>
                            <h3 className="text-2xl font-bold text-obsidian-textPrimary font-mono mb-4">Hierarchical Consistency</h3>
                            <p className="text-md text-obsidian-textSecondary leading-relaxed mb-6">
                                Once you figure out the API path <span className="text-obsidian-accent font-mono text-sm">"/api/v1/sessions/1/ixnetwork/traffic"</span>,
                                you can see this <span className="text-obsidian-textPrimary font-semibold">same hierarchy</span> reflected across all 4 access modes.
                                Discovery in the GUI is the absolute blueprint for your automation.
                            </p>
                            <div className="bg-obsidian-0 p-4 rounded-xl border border-obsidian-2 font-mono text-[12px] text-obsidian-accent shadow-inner text-center">
                                /api/v1/sessions/1/ixnetwork/traffic
                            </div>
                        </div>

                        {/* ResourceManager APIs Section */}
                        <div className="bg-obsidian-1 p-6 rounded-2xl border border-obsidian-2 relative overflow-hidden group">
                            <div className="absolute -bottom-6 -right-6 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Database size={100} className="text-obsidian-accent" />
                            </div>
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-xl font-bold text-obsidian-textPrimary flex items-center gap-2">
                                    <Database size={18} className="text-obsidian-accent" />
                                    IxNetwork ResourceManager API's
                                </h3>
                                <a
                                    href="https://openixia.github.io/ixnetwork_openapi/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 rounded-lg bg-obsidian-2 text-obsidian-accent hover:bg-obsidian-accent/10 hover:shadow-[0_0_10px_rgba(0,242,255,0.2)] transition-all"
                                    title="View OpenAPI Spec"
                                >
                                    <ExternalLink size={16} />
                                </a>
                            </div>
                            <p className="text-sm text-obsidian-textSecondary leading-relaxed">
                                Use Resource Manager for <span className="text-obsidian-textPrimary font-semibold">bulk configuration</span> and rapid environment setup.
                                It allows you to export/import large configuration blocks as JSON, bypassing the need for individual object creation calls.
                            </p>
                            <div className="mt-4 flex flex-wrap gap-2">
                                {['Config Export', 'Batch Import', 'JSON Support'].map(tag => (
                                    <span key={tag} className="px-2 py-0.5 rounded bg-obsidian-2 text-[10px] text-obsidian-accent font-mono border border-obsidian-accent/10">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Foundation;
