import React, { useState } from 'react';
import {
    Activity, Settings, Play, Database, Archive, Terminal,
    AlertTriangle, Copy, Check, ChevronRight, FileCode, List,
    ExternalLink, BookOpen,
} from 'lucide-react';
import { testPhases } from '../data/testPhases';

// ─────────────────────────────────────────────────────────────────────────────
//  Python Syntax Tokenizer
// ─────────────────────────────────────────────────────────────────────────────
const KW = new Set([
    'from','import','def','class','return','if','else','elif','for','while',
    'in','not','and','or','is','None','True','False','try','except','finally',
    'with','as','pass','raise','yield','lambda','del','global','nonlocal',
    'assert','break','continue',
]);

const BI = new Set([
    'print','len','range','str','int','float','list','dict','tuple','set',
    'bool','type','isinstance','format','sorted','map','filter','zip',
    'enumerate','open','super','object','Exception','ValueError','TypeError',
]);

function tokenize(code) {
    const tokens = [];
    let i = 0;
    while (i < code.length) {
        const ch = code[i];

        // Newline
        if (ch === '\n') { tokens.push({ t: 'nl', v: '\n' }); i++; continue; }

        // Triple-quoted string / docstring
        const tri = code.slice(i, i + 3);
        if (tri === '"""' || tri === "'''") {
            let j = i + 3;
            while (j < code.length && code.slice(j, j + 3) !== tri) j++;
            j += 3;
            tokens.push({ t: 'doc', v: code.slice(i, j) });
            i = j; continue;
        }

        // Single-line string
        if (ch === '"' || ch === "'") {
            let j = i + 1;
            while (j < code.length && code[j] !== ch && code[j] !== '\n') {
                if (code[j] === '\\') j++;
                j++;
            }
            tokens.push({ t: 'str', v: code.slice(i, j + 1) });
            i = j + 1; continue;
        }

        // Comment
        if (ch === '#') {
            let j = i;
            while (j < code.length && code[j] !== '\n') j++;
            tokens.push({ t: 'cmt', v: code.slice(i, j) });
            i = j; continue;
        }

        // Number
        if (/\d/.test(ch)) {
            let j = i;
            while (j < code.length && /[\d.]/.test(code[j])) j++;
            tokens.push({ t: 'num', v: code.slice(i, j) });
            i = j; continue;
        }

        // Identifier / keyword / builtin / function-call
        if (/[a-zA-Z_]/.test(ch)) {
            let j = i;
            while (j < code.length && /[a-zA-Z0-9_]/.test(code[j])) j++;
            const w = code.slice(i, j);
            const isCall = /^\s*\(/.test(code.slice(j));
            if (KW.has(w))         tokens.push({ t: 'kw',  v: w });
            else if (BI.has(w))    tokens.push({ t: 'bi',  v: w });
            else if (isCall)       tokens.push({ t: 'fn',  v: w });
            else                   tokens.push({ t: 'id',  v: w });
            i = j; continue;
        }

        // Operator
        if (/[+\-*\/=<>!&|^~%]/.test(ch)) {
            let j = i;
            while (j < code.length && /[+\-*\/=<>!&|^~%]/.test(code[j])) j++;
            tokens.push({ t: 'op', v: code.slice(i, j) });
            i = j; continue;
        }

        // Whitespace (non-newline)
        if (/[ \t]/.test(ch)) {
            let j = i;
            while (j < code.length && /[ \t]/.test(code[j])) j++;
            tokens.push({ t: 'ws', v: code.slice(i, j) });
            i = j; continue;
        }

        // Punctuation / fallback
        tokens.push({ t: 'pu', v: ch });
        i++;
    }
    return tokens;
}

// Flatten tokens that contain embedded newlines, then group into lines
function toLines(tokens) {
    const flat = [];
    for (const tok of tokens) {
        if (tok.t === 'nl') { flat.push(tok); continue; }
        if (tok.v.includes('\n')) {
            tok.v.split('\n').forEach((part, idx, arr) => {
                if (part) flat.push({ t: tok.t, v: part });
                if (idx < arr.length - 1) flat.push({ t: 'nl', v: '\n' });
            });
        } else {
            flat.push(tok);
        }
    }
    const lines = [[]];
    for (const tok of flat) {
        if (tok.t === 'nl') lines.push([]);
        else lines[lines.length - 1].push(tok);
    }
    return lines;
}

// Token → Tailwind color class
const COLOR = {
    kw:  'text-violet-400',
    bi:  'text-teal-400',
    str: 'text-amber-300',
    doc: 'text-emerald-400/80',
    cmt: 'text-slate-500 italic',
    num: 'text-green-400',
    fn:  'text-cyan-300',
    op:  'text-pink-400',
    pu:  'text-slate-400',
    id:  'text-slate-200',
    ws:  '',
    nl:  '',
};

// ─────────────────────────────────────────────────────────────────────────────
//  Syntax Highlighter Component
// ─────────────────────────────────────────────────────────────────────────────
const SyntaxHighlighter = ({ code }) => {
    const lines = toLines(tokenize(code));
    return (
        <div className="font-mono text-[12.5px] leading-[1.75]">
            {lines.map((lineTokens, i) => (
                <div
                    key={i}
                    className="flex group hover:bg-white/[0.025] transition-colors duration-75"
                >
                    {/* Line number */}
                    <span className="select-none w-10 text-right pr-3 text-[10px] text-slate-600 flex-shrink-0 border-r border-slate-700/30 mr-4 pt-px leading-[1.75]">
                        {i + 1}
                    </span>
                    {/* Tokens */}
                    <span className="flex-1 whitespace-pre">
                        {lineTokens.map((tok, j) => (
                            <span key={j} className={COLOR[tok.t] || ''}>{tok.v}</span>
                        ))}
                    </span>
                </div>
            ))}
        </div>
    );
};

// ─────────────────────────────────────────────────────────────────────────────
//  Phase Icon
// ─────────────────────────────────────────────────────────────────────────────
const PhaseIcon = ({ id, size = 14 }) => {
    const p = { size, className: 'flex-shrink-0' };
    return ({
        setup:        <Activity   {...p} />,
        config:       <Settings   {...p} />,
        execution:    <Play       {...p} />,
        verification: <Database   {...p} />,
        teardown:     <Archive    {...p} />,
    }[id] || <Terminal {...p} />);
};

// ─────────────────────────────────────────────────────────────────────────────
//  Install Prerequisites Card
// ─────────────────────────────────────────────────────────────────────────────
const InstallCard = () => (
    <div className="bg-obsidian-1 rounded-2xl border border-obsidian-2 p-7 mb-10 shadow-xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-[0.04] group-hover:opacity-[0.08] transition-opacity duration-500 pointer-events-none">
            <Terminal size={96} className="text-obsidian-accent" />
        </div>
        <div className="relative z-10">
            <h3 className="text-base font-heading font-bold text-obsidian-textPrimary mb-2 flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-obsidian-accent/10 border border-obsidian-accent/20 flex items-center justify-center">
                    <Archive size={14} className="text-obsidian-accent" />
                </div>
                Prerequisites — Install ixnetwork_restpy
            </h3>
            <p className="text-sm text-obsidian-textSecondary mb-5 leading-relaxed">
                Initialize your Python environment with the official RestPy client before running any test phase.
            </p>
            <div className="bg-obsidian-0 rounded-xl p-5 font-mono text-[13px] text-obsidian-accent border border-obsidian-2 shadow-inner">
                <div className="text-obsidian-3/60 text-[9px] uppercase font-bold tracking-[0.18em] mb-3"># Terminal Setup</div>
                <div className="space-y-1.5">
                    {[
                        'python -m venv ixnvenv',
                        'source ixnvenv/bin/activate',
                        'pip install ixnetwork-restpy',
                    ].map((cmd, i) => (
                        <div key={i} className="flex gap-4">
                            <span className="text-obsidian-3/40 select-none w-4">{i + 1}</span>
                            <span className={i === 2 ? 'text-obsidian-textPrimary font-bold' : ''}>{cmd}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
);

// ─────────────────────────────────────────────────────────────────────────────
//  IDE Code Portal
// ─────────────────────────────────────────────────────────────────────────────
const AnatomyIDE = () => {
    const [activePhaseId, setActivePhaseId] = useState('setup');
    const [approachMap, setApproachMap]     = useState({});
    const [copied, setCopied]               = useState(false);
    const [infoTab, setInfoTab]             = useState('steps');

    const phase      = testPhases.find(p => p.id === activePhaseId);
    const phaseIdx   = testPhases.findIndex(p => p.id === activePhaseId);
    const approachNm = approachMap[activePhaseId] || phase.approaches[0].name;
    const approach   = phase.approaches.find(a => a.name === approachNm) || phase.approaches[0];

    const handleCopy = () => {
        navigator.clipboard.writeText(approach.code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const selectPhase = (id) => {
        setActivePhaseId(id);
        setInfoTab('steps');
    };

    return (
        <div
            className="rounded-2xl overflow-hidden border border-obsidian-2 shadow-[0_24px_64px_rgba(0,0,0,0.55)] flex flex-col bg-obsidian-0"
            style={{ height: '680px' }}
        >
            {/* ── macOS title bar ── */}
            <div className="flex items-center gap-3 px-4 py-2.5 bg-obsidian-2/80 border-b border-obsidian-2 flex-shrink-0">
                <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-[#ff5f57]/80" />
                    <span className="w-3 h-3 rounded-full bg-[#febc2e]/80" />
                    <span className="w-3 h-3 rounded-full bg-[#28c840]/80" />
                </div>
                <div className="flex-1 flex items-center justify-center gap-1.5 text-[11px] font-mono text-obsidian-textSecondary/50">
                    <FileCode size={12} />
                    <span>ixnetwork_automation.py</span>
                </div>
                <span className="text-[10px] font-mono text-obsidian-textSecondary/30">Python 3.x</span>
            </div>

            {/* ── Main layout ── */}
            <div className="flex flex-1 overflow-hidden">

                {/* ── Sidebar (desktop only) ── */}
                <div className="hidden lg:flex w-52 flex-shrink-0 flex-col border-r border-obsidian-2 bg-obsidian-1/40">
                    <div className="px-3 py-2 text-[9px] uppercase tracking-[0.22em] text-obsidian-textSecondary/35 font-bold border-b border-obsidian-2">
                        Explorer
                    </div>

                    {/* Phase list */}
                    <div className="flex-1 overflow-y-auto p-1.5 space-y-0.5">
                        {testPhases.map((p, idx) => (
                            <button
                                key={p.id}
                                onClick={() => selectPhase(p.id)}
                                className={`w-full flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs transition-all duration-150 ${
                                    activePhaseId === p.id
                                        ? 'bg-obsidian-accent/10 text-obsidian-accent border border-obsidian-accent/25 shadow-[0_0_10px_rgba(0,242,255,0.07)]'
                                        : 'text-obsidian-textSecondary hover:bg-obsidian-2/60 hover:text-obsidian-textPrimary border border-transparent'
                                }`}
                            >
                                <span className={`w-4 text-[10px] font-mono font-bold flex-shrink-0 ${activePhaseId === p.id ? 'text-obsidian-accent' : 'text-obsidian-3/60'}`}>
                                    {idx + 1}.
                                </span>
                                <PhaseIcon id={p.id} />
                                <span className="truncate font-mono">{p.title.replace(' Phase', '')}</span>
                            </button>
                        ))}
                    </div>

                    {/* Phase description */}
                    <div className="border-t border-obsidian-2 p-3 flex-shrink-0">
                        <div className="text-[9px] uppercase tracking-[0.15em] text-obsidian-textSecondary/35 font-bold mb-1.5">
                            Goal
                        </div>
                        <p className="text-[11px] text-obsidian-textSecondary leading-relaxed line-clamp-4">
                            {phase.description}
                        </p>
                    </div>
                </div>

                {/* ── Editor panel ── */}
                <div className="flex-1 flex flex-col overflow-hidden">

                    {/* Mobile: phase selector */}
                    <div className="lg:hidden flex gap-1.5 px-3 py-2 overflow-x-auto border-b border-obsidian-2 bg-obsidian-1/50 flex-shrink-0 scrollbar-hide">
                        {testPhases.map((p, idx) => (
                            <button
                                key={p.id}
                                onClick={() => selectPhase(p.id)}
                                className={`flex-shrink-0 px-3 py-1 rounded-full text-[10px] font-mono font-bold transition-all ${
                                    activePhaseId === p.id
                                        ? 'bg-obsidian-accent text-obsidian-0'
                                        : 'bg-obsidian-2 text-obsidian-textSecondary hover:text-obsidian-textPrimary'
                                }`}
                            >
                                {idx + 1}. {p.title.replace(' Phase', '')}
                            </button>
                        ))}
                    </div>

                    {/* Tab bar */}
                    <div className="flex items-center bg-obsidian-1/60 border-b border-obsidian-2 flex-shrink-0">
                        <div className="flex flex-1 overflow-x-auto scrollbar-hide">
                            {phase.approaches.map(a => (
                                <button
                                    key={a.name}
                                    onClick={() => setApproachMap(prev => ({ ...prev, [activePhaseId]: a.name }))}
                                    className={`px-4 py-2 text-[11px] font-mono flex-shrink-0 border-r border-obsidian-2 transition-colors whitespace-nowrap ${
                                        approach.name === a.name
                                            ? 'bg-obsidian-0 text-obsidian-accent border-t-[2px] border-t-obsidian-accent -mt-[2px] pt-[calc(0.5rem+2px)]'
                                            : 'text-obsidian-textSecondary hover:text-obsidian-textPrimary hover:bg-obsidian-2/30'
                                    }`}
                                >
                                    {a.name}
                                </button>
                            ))}
                        </div>
                        <button
                            onClick={handleCopy}
                            className="flex-shrink-0 flex items-center gap-1.5 mr-3 px-3 py-1.5 rounded text-[11px] font-mono transition-all border border-obsidian-2 hover:border-obsidian-accent/50 hover:text-obsidian-accent text-obsidian-textSecondary"
                        >
                            {copied
                                ? <><Check size={11} className="text-green-400" /><span className="text-green-400">Copied!</span></>
                                : <><Copy size={11} /><span>Copy</span></>
                            }
                        </button>
                    </div>

                    {/* Code area — scrollable */}
                    <div className="flex-1 overflow-auto p-5 bg-obsidian-0">
                        <SyntaxHighlighter code={approach.code} />
                    </div>

                    {/* Info panel — fixed height */}
                    <div className="flex-shrink-0 border-t border-obsidian-2 bg-obsidian-1/70 flex flex-col" style={{ height: '172px' }}>
                        {/* Info tabs */}
                        <div className="flex items-center border-b border-obsidian-2 flex-shrink-0">
                            <button
                                onClick={() => setInfoTab('steps')}
                                className={`flex items-center gap-1.5 px-4 py-2 text-[10px] font-mono uppercase tracking-wider transition-colors border-b-2 ${
                                    infoTab === 'steps'
                                        ? 'border-obsidian-accent text-obsidian-accent'
                                        : 'border-transparent text-obsidian-textSecondary hover:text-obsidian-textPrimary'
                                }`}
                            >
                                <List size={10} /> Key Steps
                            </button>
                            <button
                                onClick={() => setInfoTab('pitfalls')}
                                className={`flex items-center gap-1.5 px-4 py-2 text-[10px] font-mono uppercase tracking-wider transition-colors border-b-2 ${
                                    infoTab === 'pitfalls'
                                        ? 'border-amber-400 text-amber-400'
                                        : 'border-transparent text-obsidian-textSecondary hover:text-obsidian-textPrimary'
                                }`}
                            >
                                <AlertTriangle size={10} /> Common Pitfalls
                            </button>
                        </div>

                        {/* Info content */}
                        <div className="flex-1 overflow-y-auto p-3 scrollbar-hide">
                            {infoTab === 'steps' ? (
                                <ul className="space-y-1.5">
                                    {phase.subActivities.map((act, i) => (
                                        <li key={i} className="flex items-start gap-2 text-[12px]">
                                            <ChevronRight size={12} className="text-obsidian-accent mt-0.5 flex-shrink-0" />
                                            <span className="text-obsidian-textSecondary">{act}</span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <ul className="space-y-1.5">
                                    {phase.pitfalls.map((pitfall, i) => (
                                        <li key={i} className="flex items-start gap-2 text-[12px]">
                                            <AlertTriangle size={12} className="text-amber-400 mt-0.5 flex-shrink-0" />
                                            <span className="text-amber-300/80">{pitfall}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Status bar ── */}
            <div className="flex items-center justify-between px-4 py-1 bg-obsidian-accent/[0.08] border-t border-obsidian-accent/15 flex-shrink-0">
                <div className="flex items-center gap-3 text-[10px] font-mono text-obsidian-accent">
                    <span className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-obsidian-accent animate-pulse" />
                        Phase {phaseIdx + 1} / {testPhases.length}
                    </span>
                    <span className="text-obsidian-accent/30">·</span>
                    <span>{phase.title}</span>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-mono text-obsidian-textSecondary/40">
                    <span>Python 3.x</span>
                    <span>·</span>
                    <span>ixnetwork-restpy</span>
                </div>
            </div>
        </div>
    );
};

// ─────────────────────────────────────────────────────────────────────────────
//  Section wrapper
// ─────────────────────────────────────────────────────────────────────────────
const Anatomy = () => (
    <section id="anatomy" className="py-20 bg-obsidian-0 relative">
        {/* circuit grid overlay */}
        <div className="absolute inset-0 bg-circuit opacity-50 pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
            {/* Section header */}
            <div className="text-center mb-14 animate-fade-in-up">
                <span className="inline-block text-obsidian-accent font-mono text-xs font-bold tracking-[0.2em] uppercase mb-3 px-3 py-1 bg-obsidian-accent/10 rounded-full border border-obsidian-accent/20">
                    Core Concept
                </span>
                <h2 className="text-4xl font-heading font-bold text-obsidian-textPrimary mb-4 text-glow-sm">
                    Anatomy of an IxNetwork Test
                </h2>
                <p className="text-base text-obsidian-textSecondary max-w-2xl mx-auto leading-relaxed">
                    Every automation script follows the same 5-phase lifecycle. Select a phase in the
                    explorer, read the annotated code, copy it. Master the pattern, master the tool.
                </p>
            </div>

            <InstallCard />
            <AnatomyIDE />

            {/* More Examples CTA */}
            <a
                href="https://dancing-speculoos-28453f.netlify.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 flex items-center justify-between gap-4 bg-obsidian-1 border border-obsidian-2 hover:border-obsidian-accent/50 rounded-2xl px-6 py-5 transition-all duration-300 group hover:shadow-[0_0_24px_rgba(0,242,255,0.08)] hover:-translate-y-0.5"
            >
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-obsidian-accent/10 border border-obsidian-accent/20 flex items-center justify-center flex-shrink-0 group-hover:bg-obsidian-accent/15 transition-colors">
                        <BookOpen size={18} className="text-obsidian-accent" />
                    </div>
                    <div>
                        <p className="font-heading font-bold text-obsidian-textPrimary text-sm">
                            More Detailed Code Examples
                        </p>
                        <p className="text-xs text-obsidian-textSecondary mt-0.5">
                            Explore a deeper collection of IxNetwork RestPy patterns and worked examples.
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-wider text-obsidian-textSecondary group-hover:text-obsidian-accent transition-colors flex-shrink-0">
                    <span>Open</span>
                    <ExternalLink size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
            </a>
        </div>
    </section>
);

export default Anatomy;
