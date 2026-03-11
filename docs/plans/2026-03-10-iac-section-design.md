# IaC Section Design — IxNetwork Portal

**Date:** 2026-03-10
**Status:** Approved

## Summary

Add an "Infrastructure as Code" second row below the 6 Hero action cards. Groups IxNetwork VE cloud deployment options by provider/tool — designed for IxNetwork developer customers who need to stand up a virtual chassis before running RestPy automation.

## Placement

Inside `Hero.jsx`, after the 6-card `ActionCard` grid (after `mb-14`), before the "What is IxNetwork?" blurb.

## Cards (5 total)

Grid layout: `grid md:grid-cols-3 lg:grid-cols-5`

| Card | GitHub Link | Tools Listed | Icon | Accent Color |
|------|-------------|--------------|------|--------------|
| AWS | `/AWS` | Terraform, CloudFormation | `Cloud` (lucide) | Orange |
| Azure | `/Azure` | Terraform, ARM | `Cloud` (lucide) | Blue |
| GCP | `/GCP` | CloudShell, DeploymentManager, Terraform | `Cloud` (lucide) | Green |
| Ansible | `/ansible` | Cloud deployment playbooks | `Terminal` (lucide) | Red |
| OpenStack | `/openstack` | OpenStack deployment | `Layers` (lucide) | Purple |

Root GitHub URL: `https://github.com/Keysight/ixnetworkve/tree/main`

## Data

New `iacProviders` export in `src/data/links.js`:

```js
export const iacProviders = [
  { name: 'AWS', desc: 'Deploy IxNetwork VE on AWS', color: '...orange', tools: [
    { label: 'Terraform', url: '.../AWS/Terraform' },
    { label: 'CloudFormation', url: '.../AWS/CloudFormation' },
  ]},
  // Azure, GCP, Ansible, OpenStack...
]
```

## Component

Inline `IaCSection` sub-component in `Hero.jsx` — no new file. Same pattern as `ActionCard`.

Card anatomy:
- Provider icon (top-left) + provider name (bold)
- Short descriptor: "Deploy IxNetwork VE on [provider]"
- Tool links list: each a direct GitHub anchor with `ExternalLink` icon
- Hover: cyan border glow (`hover:border-obsidian-accent/50`)

## Section Header

Small mono label above the grid:
```
[ INFRASTRUCTURE AS CODE ]   IxNetwork VE — Cloud Deployment
```
Same style as other section labels in the portal (pill tag, `obsidian-accent`, uppercase mono).
