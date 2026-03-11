# IaC Hero Section Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a 5-card "Infrastructure as Code" second row below the Hero action cards, grouping IxNetwork VE cloud deployment options by provider (AWS, Azure, GCP, Ansible, OpenStack).

**Architecture:** Data-driven — IaC provider metadata lives in `src/data/links.js` as a new `iacProviders` export. Rendering is an inline `IaCSection` sub-component inside `Hero.jsx`, consistent with how `ActionCard`/`CodeBlock`/`DeployStep` are structured. No new files created.

**Tech Stack:** React 19, Tailwind CSS 3 (Obsidian Intelligence theme), lucide-react icons, Vite dev server

---

### Task 1: Add `iacProviders` data to `src/data/links.js`

**Files:**
- Modify: `src/data/links.js`

**Step 1: Append the `iacProviders` export**

Add to the bottom of `src/data/links.js`:

```js
import { Cloud, Terminal, Layers } from 'lucide-react';

export const iacProviders = [
  {
    name: 'AWS',
    desc: 'Deploy IxNetwork VE on AWS',
    icon: Cloud,
    color: 'bg-orange-500/10 text-orange-400 border border-orange-500/20',
    accentClass: 'group-hover:border-orange-400/50 group-hover:shadow-[0_0_16px_rgba(251,146,60,0.12)]',
    tools: [
      { label: 'Terraform', url: 'https://github.com/Keysight/ixnetworkve/tree/main/AWS/Terraform' },
      { label: 'CloudFormation', url: 'https://github.com/Keysight/ixnetworkve/tree/main/AWS/CloudFormation' },
    ],
  },
  {
    name: 'Azure',
    desc: 'Deploy IxNetwork VE on Azure',
    icon: Cloud,
    color: 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
    accentClass: 'group-hover:border-blue-400/50 group-hover:shadow-[0_0_16px_rgba(96,165,250,0.12)]',
    tools: [
      { label: 'Terraform', url: 'https://github.com/Keysight/ixnetworkve/tree/main/Azure/Terraform' },
      { label: 'ARM', url: 'https://github.com/Keysight/ixnetworkve/tree/main/Azure/ARM' },
    ],
  },
  {
    name: 'GCP',
    desc: 'Deploy IxNetwork VE on Google Cloud',
    icon: Cloud,
    color: 'bg-green-500/10 text-green-400 border border-green-500/20',
    accentClass: 'group-hover:border-green-400/50 group-hover:shadow-[0_0_16px_rgba(74,222,128,0.12)]',
    tools: [
      { label: 'Terraform', url: 'https://github.com/Keysight/ixnetworkve/tree/main/GCP/Terraform' },
      { label: 'DeploymentManager', url: 'https://github.com/Keysight/ixnetworkve/tree/main/GCP/DeploymentManager' },
      { label: 'CloudShell', url: 'https://github.com/Keysight/ixnetworkve/tree/main/GCP/CloudShell' },
    ],
  },
  {
    name: 'Ansible',
    desc: 'Automate VE provisioning with Ansible',
    icon: Terminal,
    color: 'bg-red-500/10 text-red-400 border border-red-500/20',
    accentClass: 'group-hover:border-red-400/50 group-hover:shadow-[0_0_16px_rgba(248,113,113,0.12)]',
    tools: [
      { label: 'Playbooks', url: 'https://github.com/Keysight/ixnetworkve/tree/main/ansible' },
    ],
  },
  {
    name: 'OpenStack',
    desc: 'Deploy IxNetwork VE on OpenStack',
    icon: Layers,
    color: 'bg-purple-500/10 text-purple-400 border border-purple-500/20',
    accentClass: 'group-hover:border-purple-400/50 group-hover:shadow-[0_0_16px_rgba(192,132,252,0.12)]',
    tools: [
      { label: 'Heat / Nova', url: 'https://github.com/Keysight/ixnetworkve/tree/main/openstack' },
    ],
  },
];
```

**Step 2: Verify dev server compiles without errors**

Run: `npm run dev`
Expected: No console errors, Vite HMR ready.

**Step 3: Commit**

```bash
git add src/data/links.js
git commit -m "feat: add iacProviders data for IxNetwork VE cloud deployment"
```

---

### Task 2: Add `IaCSection` sub-component and import in `Hero.jsx`

**Files:**
- Modify: `src/components/Hero.jsx`

**Step 1: Add import for `iacProviders` at top of Hero.jsx**

In the existing import block at the top of `src/components/Hero.jsx`, add:

```js
import { iacProviders } from '../data/links';
```

Also ensure `ExternalLink` is imported from lucide-react (it already is based on the codebase).

**Step 2: Add `IaCSection` sub-component at the bottom of Hero.jsx**

After the `DeployStep` component definition (before `export default Hero`), add:

```jsx
const IaCSection = () => (
  <div className="max-w-6xl mx-auto mb-12 animate-fade-in-up">
    {/* Section label */}
    <div className="flex items-center gap-3 mb-4">
      <span className="inline-block text-obsidian-accent font-mono text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1 bg-obsidian-accent/10 rounded-full border border-obsidian-accent/20">
        Infrastructure as Code
      </span>
      <span className="text-obsidian-textSecondary text-xs font-mono">
        IxNetwork VE — Cloud Deployment
      </span>
    </div>

    {/* Provider cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
      {iacProviders.map((provider) => (
        <div
          key={provider.name}
          className={`group relative bg-obsidian-1 p-4 rounded-xl border border-obsidian-2 transition-all duration-300 flex flex-col ${provider.accentClass}`}
        >
          {/* Icon + name */}
          <div className="flex items-center gap-2 mb-2">
            <div className={`p-1.5 rounded-lg ${provider.color}`}>
              <provider.icon size={16} />
            </div>
            <span className="font-heading font-bold text-obsidian-textPrimary text-sm">
              {provider.name}
            </span>
          </div>

          {/* Description */}
          <p className="text-[11px] text-obsidian-textSecondary mb-3 leading-relaxed">
            {provider.desc}
          </p>

          {/* Tool links */}
          <div className="mt-auto flex flex-col gap-1.5">
            {provider.tools.map((tool) => (
              <a
                key={tool.label}
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
      ))}
    </div>
  </div>
);
```

**Step 3: Insert `<IaCSection />` into the Hero JSX**

In the Hero return JSX, locate the action cards grid block ending with `mb-14`. Insert `<IaCSection />` immediately after it, before the `{/* What is IxNetwork */}` div:

```jsx
{/* Action cards */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3 max-w-6xl mx-auto mb-8 animate-fade-in-up">
  {/* ... existing ActionCards ... */}
</div>

{/* IaC second row */}
<IaCSection />

{/* What is IxNetwork */}
<div className="max-w-3xl mx-auto mb-12 relative">
```

Note: Change `mb-14` → `mb-8` on the action cards grid to tighten the gap between the two rows.

**Step 4: Visual verification**

Open `http://localhost:5173` in browser.
Expected:
- 5 provider cards appear in a row below the 6 action cards
- Each card shows icon, provider name, description, and tool links
- Hover applies the correct brand-color glow (orange/blue/green/red/purple)
- All links open the correct GitHub URLs in a new tab
- Responsive: collapses to 3-col on md, 2-col on sm, 1-col on mobile

**Step 5: Commit**

```bash
git add src/components/Hero.jsx
git commit -m "feat: add IaC section with cloud provider cards to Hero"
```

---

## Verification Checklist

Before marking complete:
- [ ] 5 cards render: AWS, Azure, GCP, Ansible, OpenStack
- [ ] Each tool link opens the correct GitHub path in a new tab
- [ ] Brand accent colors are visually distinct per provider
- [ ] Layout is responsive (5-col → 3-col → 2-col → 1-col)
- [ ] Section label "Infrastructure as Code" is visible
- [ ] No console errors in browser devtools
