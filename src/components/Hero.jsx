import React, { useState } from 'react';
import {
    Download, Play, Code, BookOpen, ArrowRight,
    ChevronDown, ChevronUp, Terminal, Monitor,
    Database, ExternalLink, Zap, Search,
    Cloud, Layers,
} from 'lucide-react';
import { versions } from '../data/versions';
import { iacProviders } from '../data/links';

const Hero = (props) => {
    const [showDeployGuide, setShowDeployGuide] = useState(false);
    const [activeDeployTab, setActiveDeployTab] = useState('docker');
    const [restPyVersion, setRestPyVersion] = useState(versions.restPy);

    React.useEffect(() => {
        fetch('https://pypi.org/pypi/ixnetwork-restpy/json')
            .then(res => res.json())
            .then(data => { if (data?.info?.version) setRestPyVersion(data.info.version); })
            .catch(() => {});
    }, []);

    return (
        <section className="relative pt-32 pb-24 px-6 overflow-hidden">
            {/* Circuit grid */}
            <div className="absolute inset-0 bg-circuit opacity-60 pointer-events-none" />

            {/* Radial glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-obsidian-accent/5 rounded-full blur-3xl pointer-events-none" />

            {/* Corner accent lines */}
            <div className="absolute top-20 left-0 w-32 h-px bg-gradient-to-r from-obsidian-accent/40 to-transparent" />
            <div className="absolute top-20 right-0 w-32 h-px bg-gradient-to-l from-obsidian-accent/40 to-transparent" />

            <div className="max-w-6xl mx-auto text-center relative z-10">

                {/* Version badge */}
                <div className="inline-flex items-center gap-3 bg-obsidian-1/70 backdrop-blur-sm border border-obsidian-2 hover:border-obsidian-accent/30 px-4 py-2.5 rounded-full mb-10 text-[11px] font-mono text-obsidian-textSecondary animate-fade-in-up transition-colors duration-300">
                    <span className="w-1.5 h-1.5 bg-obsidian-accent rounded-full animate-pulse shadow-[0_0_8px_rgba(0,242,255,0.7)]" />
                    <span className="font-semibold text-obsidian-textPrimary uppercase tracking-wider">restPy</span>
                    <span className="text-obsidian-accent font-bold px-2 py-0.5 bg-obsidian-accent/10 rounded border border-obsidian-accent/20">
                        {restPyVersion}
                    </span>
                    <span className="text-obsidian-3">|</span>
                    <a
                        href="https://openixia.github.io/ixnetwork_restpy/#/release"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 hover:text-obsidian-accent transition-colors group"
                    >
                        Release Notes
                        <ExternalLink size={11} className="opacity-50 group-hover:opacity-100" />
                    </a>
                </div>

                {/* Main heading */}
                <h1 className="text-5xl md:text-7xl font-heading font-extrabold text-obsidian-textPrimary tracking-tight mb-5 leading-[1.05] animate-fade-in-up">
                    IxNetwork{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-obsidian-accent to-obsidian-accentHover text-glow">
                        Automation
                    </span>
                    <br />
                    <span className="text-3xl md:text-4xl font-mono font-bold text-obsidian-textSecondary tracking-widest">
                        101
                    </span>
                </h1>

                {/* Sub-headline */}
                <p className="text-base text-obsidian-textSecondary max-w-xl mx-auto mb-12 leading-relaxed animate-fade-in-up">
                    The developer-first reference for building reliable, repeatable L2–L3 test automation with RestPy.
                </p>

                {/* Action cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 max-w-6xl mx-auto mb-8 animate-fade-in-up">
                    <ActionCard icon={Download} step="01" title="Download"  desc="Get IxNetwork & tools"       href="https://support.ixiacom.com/support-overview/product-support/downloads-updates" />
                    <ActionCard icon={Play}     step="02" title="Deploy"    desc="Install and configure"       isActive={showDeployGuide} onClick={() => setShowDeployGuide(v => !v)} />
                    <ActionCard icon={Code}     step="03" title="Anatomy Of  IxNetwork Test" desc="Your first test"           href="#anatomy" />
                    <ActionCard icon={BookOpen} step="04" title="Learn"     desc="Explore patterns"            href="#foundation" />
                    <ActionCard icon={Database} step="05" title="API Ref"   desc="Browse documentation"        onClick={() => props.onNavigate?.('api')} />
                    <ActionCard icon={Search}   step="06" title="Code Samples" desc="Searchable RestPy examples" href="https://dancing-speculoos-28453f.netlify.app/" isExternal />
                </div>

                <IaCSection />

                {/* What is IxNetwork */}
                <div className="max-w-3xl mx-auto mb-12 relative">
                    <div className="absolute -left-4 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-obsidian-accent/40 to-transparent" />
                    <h2 className="text-xl font-heading font-bold text-obsidian-accent mb-3">What is IxNetwork?</h2>
                    <p className="text-base text-obsidian-textSecondary leading-relaxed">
                        IxNetwork is the industry standard for L2–L3 network performance testing.
                        It emulates complex topologies and generates realistic traffic to validate
                        the performance and scalability of switches, routers, and network devices.
                        Automation turns this into consistent, programmable testing pipelines.
                    </p>
                </div>

                {/* Deploy guide inline expansion */}
                {showDeployGuide && (
                    <div className="max-w-5xl mx-auto bg-obsidian-1 rounded-2xl border border-obsidian-2 shadow-2xl overflow-hidden animate-fade-in-down text-left">
                        <div className="bg-obsidian-2 px-6 py-4 border-b border-obsidian-2 flex items-center justify-between">
                            <h3 className="font-heading font-bold text-obsidian-textPrimary flex items-center gap-2">
                                <Play size={18} className="text-obsidian-accent" />
                                Deployment & Installation Guide
                            </h3>
                            <button onClick={() => setShowDeployGuide(false)} className="text-obsidian-textSecondary hover:text-obsidian-accent transition-colors">
                                <ChevronUp size={18} />
                            </button>
                        </div>

                        <div className="flex border-b border-obsidian-2">
                            {['Docker', 'KVM', 'On Chassis'].map(tab => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveDeployTab(tab.toLowerCase())}
                                    className={`px-6 py-3 text-sm font-mono transition-colors border-b-2 ${
                                        activeDeployTab === tab.toLowerCase()
                                            ? 'border-obsidian-accent text-obsidian-accent bg-obsidian-accent/5'
                                            : 'border-transparent text-obsidian-textSecondary hover:text-obsidian-textPrimary'
                                    }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>

                        <div className="p-8">
                            {activeDeployTab === 'docker' && (
                                <div className="space-y-8 animate-fade-in">
                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div className="space-y-6">
                                            <DeployStep number="1" title="Get the Image" icon={Download}>
                                                <p className="text-sm text-obsidian-textSecondary mb-2">
                                                    Download the IxNetwork Web Edition Tar File from the{' '}
                                                    <a href="https://support.ixiacom.com/support-overview/product-support/downloads-updates" target="_blank" rel="noopener noreferrer" className="text-obsidian-accent hover:underline">download page</a>{' '}
                                                    and copy it to your Linux host.
                                                </p>
                                            </DeployStep>
                                            <DeployStep number="2" title="Prerequisites" icon={Terminal}>
                                                <p className="text-sm text-obsidian-textSecondary mb-2">Enable promiscuous mode on the interface:</p>
                                                <CodeBlock>ifconfig eth1 promisc</CodeBlock>
                                            </DeployStep>
                                            <DeployStep number="3" title="Load Image" icon={Database}>
                                                <CodeBlock>{`tar xjf Ixia_IxNetworkWeb_Docker_9.00.tar.bz2\ndocker load -i Ixia_IxNetworkWeb_Docker_9.00.tar`}</CodeBlock>
                                            </DeployStep>
                                        </div>

                                        <div className="space-y-6">
                                            <div className="bg-obsidian-2 p-4 rounded-xl border border-obsidian-2">
                                                <h4 className="font-bold text-obsidian-textPrimary text-sm mb-4">4. Run Container</h4>
                                                <p className="text-xs font-semibold text-obsidian-textSecondary mb-2">Option A — MAC VLAN Bridge</p>
                                                <CodeBlock>{`docker run --net <network_name> \\\n  --ip <ip_address> \\\n  --hostname <hostname> \\\n  --name <container_name> \\\n  --cap-add=SYS_ADMIN \\\n  --cap-add=NET_ADMIN \\\n  -i -d \\\n  -v /sys/fs/cgroup:/sys/fs/cgroup \\\n  --tmpfs /run`}</CodeBlock>
                                                <p className="text-xs font-semibold text-obsidian-textSecondary mt-4 mb-2">Option B — HTTPS Port Mapping</p>
                                                <CodeBlock>{`docker run \\\n  -p <host_port>:443 \\\n  --cap-add=SYS_ADMIN \\\n  --cap-add=NET_ADMIN \\\n  -i -d \\\n  -v /sys/fs/cgroup:/sys/fs/cgroup \\\n  --tmpfs /run`}</CodeBlock>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="font-bold text-obsidian-textPrimary text-sm mb-4">MacVlan vs Port Forwarding</h4>
                                        <div className="overflow-x-auto border border-obsidian-2 rounded-lg">
                                            <table className="w-full text-sm text-left text-obsidian-textSecondary">
                                                <thead className="bg-obsidian-2 text-obsidian-textPrimary font-semibold border-b border-obsidian-3">
                                                    <tr>
                                                        <th className="px-4 py-2">Feature</th>
                                                        <th className="px-4 py-2">MACVLAN Bridge (A)</th>
                                                        <th className="px-4 py-2">Port Mapping (B)</th>
                                                    </tr>
                                                </thead>
                                                <tbody className="divide-y divide-obsidian-2 bg-obsidian-1">
                                                    {[
                                                        ['Visibility',   'Acts as physical device (Unique MAC/IP)',   'Hidden behind Host IP (Shared MAC/IP)'],
                                                        ['Performance',  'High — L2 direct, minimal overhead',        'Medium — NAT/iptables overhead'],
                                                        ['Complexity',   'Higher — requires promiscuous mode',         'Lower — standard Docker behavior'],
                                                        ['Use Case',     'Benchmarking & Protocol Emulation',          'Web UI Access & REST API integration'],
                                                    ].map(([feat, a, b]) => (
                                                        <tr key={feat}>
                                                            <td className="px-4 py-2 font-medium text-obsidian-textPrimary">{feat}</td>
                                                            <td className="px-4 py-2">{a}</td>
                                                            <td className="px-4 py-2">{b}</td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeDeployTab === 'kvm' && (
                                <div className="space-y-6 animate-fade-in">
                                    <div className="flex items-start gap-2 bg-obsidian-accent/5 border border-obsidian-accent/20 px-4 py-3 rounded-lg text-sm text-obsidian-accent">
                                        <Zap size={15} className="mt-0.5 flex-shrink-0" />
                                        <span><strong>KVM:</strong> Install IxNetwork Web Edition as a dedicated VM.</span>
                                    </div>
                                    <CodeBlock>{`sudo virt-install \\\n  --name IxN_WebUI \\\n  --ram 16384 \\\n  --vcpus 8 \\\n  --network=network:default,model=virtio,mac=52:54:00:00:00:01 \\\n  --serial pty \\\n  --graphics none \\\n  --disk /home/kvmserver/IxVM/IxN_WebUI_01.qcow2,device=disk,bus=virtio,format=qcow2 \\\n  --boot hd \\\n  --noautoconsole \\\n  --force`}</CodeBlock>
                                    <p className="text-xs text-obsidian-textSecondary italic">Adjust paths and resource allocations based on your host configuration.</p>
                                </div>
                            )}

                            {activeDeployTab === 'on chassis' && (
                                <div className="py-12 text-center space-y-6 animate-fade-in">
                                    <div className="w-20 h-20 bg-obsidian-2 rounded-full flex items-center justify-center mx-auto text-obsidian-accent shadow-[0_0_20px_rgba(0,242,255,0.1)]">
                                        <Monitor size={32} />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-heading font-bold text-obsidian-textPrimary mb-3">On-Chassis .WAF Installation</h3>
                                        <p className="text-obsidian-textSecondary max-w-lg mx-auto leading-relaxed">
                                            Detailed instructions for deploying the Linux API Server directly on the chassis via <strong>.WAF</strong> file are available on the OpenIxia portal.
                                        </p>
                                    </div>
                                    <a
                                        href="https://www.openixia.com/tutorials?subject=ixNetwork/linuxApiServer&page=chassisInstallation.html"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 bg-obsidian-accent text-obsidian-0 px-8 py-4 rounded-xl font-bold hover:bg-obsidian-accentHover transition-all shadow-[0_10px_20px_-10px_rgba(0,242,255,0.4)] hover:-translate-y-0.5"
                                    >
                                        View Chassis Installation Guide
                                        <ExternalLink size={16} />
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

/* ── Sub-components ─────────────────────────────────────────── */

const ActionCard = ({ icon: Icon, step, title, desc, href, onClick, isActive, isExternal }) => {
    const Tag = href ? 'a' : 'button';
    const extra = href
        ? { href, ...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {}) }
        : { onClick };

    return (
        <Tag
            {...extra}
            className={`group relative bg-obsidian-1 p-5 rounded-xl border transition-all duration-300 text-left flex flex-col items-start w-full overflow-hidden
                ${isActive
                    ? 'border-obsidian-accent shadow-[0_0_20px_rgba(0,242,255,0.12)]'
                    : 'border-obsidian-2 hover:border-obsidian-accent/50 hover:shadow-[0_0_16px_rgba(0,242,255,0.1)]'
                }`}
        >
            {/* Step number — top-right ghost */}
            <span className="absolute top-3 right-3 font-mono text-[10px] font-bold text-obsidian-textSecondary/20 group-hover:text-obsidian-accent/30 transition-colors">
                {step}
            </span>

            <div className="p-2.5 rounded-lg mb-3 bg-obsidian-2 text-obsidian-accent group-hover:bg-obsidian-accent/10 transition-colors duration-300">
                <Icon size={20} />
            </div>
            <h3 className="font-heading font-bold text-obsidian-textPrimary mb-1 text-sm tracking-wide">{title}</h3>
            <p className="text-xs text-obsidian-textSecondary mb-4 leading-relaxed">{desc}</p>
            <div className="mt-auto flex items-center text-[10px] font-mono font-bold uppercase tracking-wider text-obsidian-textSecondary group-hover:text-obsidian-accent transition-colors w-full justify-between">
                <span>{onClick ? (isActive ? 'Close' : 'View Guide') : 'Go'}</span>
                {onClick
                    ? (isActive ? <ChevronUp size={11} /> : <ChevronDown size={11} />)
                    : isExternal
                        ? <ExternalLink size={11} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        : <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
                }
            </div>
        </Tag>
    );
};

const CodeBlock = ({ children }) => (
    <div className="bg-obsidian-0 rounded-lg p-3 font-mono text-xs text-obsidian-accent overflow-x-auto whitespace-pre-wrap border border-obsidian-2">
        {children}
    </div>
);

const DeployStep = ({ number, title, icon: Icon, children }) => (
    <div className="flex gap-4">
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-obsidian-2 text-obsidian-accent border border-obsidian-accent/30 flex items-center justify-center font-bold text-sm font-mono shadow-[0_0_8px_rgba(0,242,255,0.15)]">
            {number}
        </div>
        <div>
            <h4 className="font-bold text-obsidian-textPrimary mb-2 flex items-center gap-2 text-sm">
                <Icon size={14} className="text-obsidian-accent" />
                {title}
            </h4>
            {children}
        </div>
    </div>
);

const IaCSection = () => (
    <div className="max-w-6xl mx-auto mb-12 animate-fade-in-up">
        <div className="flex items-center gap-3 mb-4">
            <span className="inline-block text-obsidian-accent font-mono text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1 bg-obsidian-accent/10 rounded-full border border-obsidian-accent/20">
                Infrastructure as Code
            </span>
            <span className="text-obsidian-textSecondary text-xs font-mono">
                IxNetwork VE — Cloud Deployment
            </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {iacProviders.map((provider) => {
                const Icon = { Cloud, Terminal, Layers }[provider.iconName];
                return (
                    <div
                        key={provider.name}
                        className={`group relative bg-obsidian-1 p-4 rounded-xl border border-obsidian-2 transition-all duration-300 flex flex-col ${provider.accentClass}`}
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <div className={`p-1.5 rounded-lg ${provider.color}`}>
                                {Icon && <Icon size={16} />}
                            </div>
                            <span className="font-heading font-bold text-obsidian-textPrimary text-sm">
                                {provider.name}
                            </span>
                        </div>

                        <p className="text-[11px] text-obsidian-textSecondary mb-3 leading-relaxed">
                            {provider.desc}
                        </p>

                        <div className="mt-auto flex flex-col gap-1.5">
                            {provider.tools.map((tool) => (
                                <a
                                    key={`${provider.name}-${tool.label}`}
                                    href={tool.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-between text-[11px] font-mono text-obsidian-textSecondary hover:text-obsidian-accent transition-colors group/link"
                                >
                                    <span>{tool.label}</span>
                                    <ExternalLink size={10} className="opacity-40 group-hover/link:opacity-100 transition-opacity" />
                                </a>
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    </div>
);

export default Hero;
