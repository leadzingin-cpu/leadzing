"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FAQ_ITEMS } from "./faqData";
import { FAQAccordionItem } from "./FAQAccordionItem";
import { faqAccordionContainerVariants } from "@/animations/faqAnimations";

/** First question is open by default, matching the reference layout — every other section's accordion (Process) starts fully collapsed, but an FAQ block reads better with an example answer already visible. */
export function FAQAccordion() {
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0]?.id ?? null);

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={faqAccordionContainerVariants}
      className="flex flex-col gap-4"
    >
      {FAQ_ITEMS.map((item) => (
        <FAQAccordionItem
          key={item.id}
          item={item}
          isOpen={openId === item.id}
          onToggle={() => setOpenId((current) => (current === item.id ? null : item.id))}
        />
      ))}
    </motion.div>
  );
}
