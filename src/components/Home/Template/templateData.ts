import type { Template } from "@/types/template";

const templateData: Template[] = [
  {
    title: "n8n",
    description: "Workflow automation tool with 200+ integrations. Similar to Zapier",
    category: "Productivity",
    tags: ["Automation", "Integration"],
    price: 15000,
    priceUnit: "Rp",
    pricePeriod: "/month",
    image: "/images/templates/n8n.svg",
    link: "/sign-up",
    github: "https://github.com/n8n-io/n8n",
    external: "https://n8n.io/",
  },
  {
    title: "Activepieces",
    description: "Open source workflow automation tool with hundreds of integrations. An alternative to Zapier.",
    category: "Productivity",
    tags: ["Automation", "Integration", "Open Source"],
    price: 85000,
    priceUnit: "Rp",
    pricePeriod: "/month",
    image: "/images/templates/activepieces.svg",
    link: "/sign-up",
    github: "https://github.com/activepieces/activepieces",
    external: "https://www.activepieces.com/",
  },
  {
    title: "WAHA Plus Cloud",
    description: "Self-hosted WhatsApp HTTP API (REST API) for unlimited sessions, multimedia messages, and built.",
    category: "Communication",
    tags: ["WhatsApp API", "Messaging", "Self-hosted"],
    price: 20000,
    priceUnit: "Rp",
    pricePeriod: "/month",
    image: "/images/templates/waha.svg",
    link: "/sign-up",
    github: "https://github.com/WAHA-Open/WAHA-Plus-Cloud",
    external: "https://waha.dev/",
  },
];

export default templateData;
