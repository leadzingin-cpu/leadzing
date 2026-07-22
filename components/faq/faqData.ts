export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: "what-we-do",
    question: "What does LeadZing actually do?",
    answer:
      "We build memorable brands through strategy, content production, websites, AI automation, and performance marketing \u2014 all connected into one complete growth system.",
  },
  {
    id: "pricing",
    question: "How does pricing work?",
    answer:
      "Every project is different. We first understand your goals before recommending the right solution. Transparent pricing. No hidden costs.",
  },
  {
    id: "timeline",
    question: "How long does a project take?",
    answer:
      "Most projects take between 3\u20138 weeks depending on project scope. You\u2019ll always receive a clear roadmap before work begins.",
  },
  {
    id: "single-service",
    question: "Can I hire you for only one service?",
    answer:
      "Absolutely. Whether it\u2019s branding, content production, websites, AI automation, or marketing \u2014 we\u2019re happy to help.",
  },
  {
    id: "ownership",
    question: "Will I own everything?",
    answer: "Yes. Every final deliverable belongs entirely to you.",
  },
  {
    id: "get-started",
    question: "How do we get started?",
    answer:
      "Book a Discovery Call. We\u2019ll understand your goals and recommend the best path forward.",
  },
];
