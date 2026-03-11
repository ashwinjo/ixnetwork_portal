import { Book, Github, MessageSquare, Box, FileText, Youtube, AlertTriangle } from 'lucide-react';

export const primaryResources = [
    {
        title: "Official Documentation",
        description: "Comprehensive API reference and guides for IxNetwork.",
        url: "https://www.keysight.com/us/en/products/network-test/protocol-load-test/ixnetwork.html",
        icon: Book,
        color: "bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-[0_0_10px_rgba(59,130,246,0.1)]"
    },
    {
        title: "ixnetwork_restpy Source",
        description: "Official Python library source code and implementation details.",
        url: "https://github.com/OpenIxia/ixnetwork_restpy",
        icon: Github,
        color: "bg-obsidian-2 text-obsidian-textPrimary border border-obsidian-3"
    },
    {
        title: "Sample Scripts",
        description: "A collection of ready-to-use automation scripts and examples by Ixia Solutions Architects.",
        url: "https://github.com/OpenIxia/IxNetwork/tree/master/RestPy/SampleScripts",
        icon: Github,
        color: "bg-obsidian-2 text-obsidian-textPrimary border border-obsidian-3"
    }
];

export const helpfulLinks = [];

export const iacProviders = [
  {
    name: 'AWS',
    desc: 'Deploy IxNetwork VE on AWS',
    iconName: 'Cloud',
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
    iconName: 'Cloud',
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
    iconName: 'Cloud',
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
    iconName: 'Terminal',
    color: 'bg-red-500/10 text-red-400 border border-red-500/20',
    accentClass: 'group-hover:border-red-400/50 group-hover:shadow-[0_0_16px_rgba(248,113,113,0.12)]',
    tools: [
      { label: 'Playbooks', url: 'https://github.com/Keysight/ixnetworkve/tree/main/ansible' },
    ],
  },
  {
    name: 'OpenStack',
    desc: 'Deploy IxNetwork VE on OpenStack',
    iconName: 'Layers',
    color: 'bg-purple-500/10 text-purple-400 border border-purple-500/20',
    accentClass: 'group-hover:border-purple-400/50 group-hover:shadow-[0_0_16px_rgba(192,132,252,0.12)]',
    tools: [
      { label: 'Heat / Nova', url: 'https://github.com/Keysight/ixnetworkve/tree/main/openstack' },
    ],
  },
];
