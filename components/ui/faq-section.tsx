"use client"

import { PhoneCall } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const faqData = [
  {
    question: "What is SigmaVendor and who is it built for?",
    answer: (
      <>
        SigmaVendor is a matching platform where companies can find verified outsourcing partners - such as virtual assistant agencies, customer support teams, finance ops providers, and other back-office specialists.
        <br /><br />
        It&apos;s built for companies that need reliable external support, and for agencies that want to be discovered by these clients.
      </>
    ),
  },
  {
    question: "How is SigmaVendor different from platforms like Clutch or Outsource Accelerator?",
    answer: (
      <>
        Traditional directories list vendors by broad categories. SigmaVendor matches companies with partners based on actual operational roles, verified capabilities, and clear reasoning behind each match.
        <br /><br />
        Every vendor profile is also optimized for AI visibility, so companies searching through ChatGPT, Perplexity, Claude, or Grok can discover SigmaVendor-listed agencies with full context.
      </>
    ),
  },
  {
    question: "How does the matching flow work?",
    answer: (
      <>
        You tell us what type of help you need - whether it&apos;s VA support, CX, finance ops, or another role - and we surface a shortlist of verified partners that fit your requirements.
        <br /><br />
        Each recommendation includes reasoning like skills match, experience, pricing, and timezone fit, so you can make a confident choice quickly.
      </>
    ),
  },
  {
    question: "What types of roles and vendors can I find on SigmaVendor?",
    answer: (
      <>
        You&apos;ll find specialized outsourcing partners across virtual assistant work, customer support, finance and bookkeeping, compliance and back-office operations, and other remote operational roles.
        <br /><br />
        Every vendor is verified for skills, communication, tooling, and delivery quality.
      </>
    ),
  },
  {
    question: "How does SigmaRemote fit into SigmaVendor?",
    answer: (
      <>
        Once you select a vendor or team, SigmaRemote allows you to handle payments securely and globally in one place.
        <br /><br />
        Matching happens on SigmaVendor; payments and contractor management happen through SigmaRemote.
      </>
    ),
  },
  {
    question: "Is SigmaVendor live and how can we get access?",
    answer: (
      <>
        We are currently onboarding agencies and the first group of companies using the matching flow.
        <br /><br />
        If you want access, you can request it directly on the site and we will reach out with next steps.
      </>
    ),
  },
];

function FAQ() {
  return (
    <div className="w-full py-20 lg:py-40 bg-black text-white bg-[url('https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/hero/bg-gradient-3.svg')] bg-center bg-cover">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-10">
          <div className="flex gap-10 flex-col">
            <div className="flex gap-4 flex-col">
              <div>
                <Badge variant="outline" className="border-white/20 text-white">
                  FAQ
                </Badge>
              </div>
              <div className="flex gap-2 flex-col">
                <h4 className="text-3xl md:text-5xl tracking-tighter max-w-xl text-left font-regular text-white">
                  Frequently asked questions
                </h4>
                <p className="text-lg max-w-xl lg:max-w-lg leading-relaxed tracking-tight text-gray-300 text-left">
                  A quick overview of how SigmaVendor works, who it is for, and how it connects to SigmaRemote.
                </p>
              </div>
              <div className="">
                <a 
                  href="#get-matched"
                  className="inline-flex items-center justify-center gap-4 whitespace-nowrap rounded-md text-base font-medium h-12 px-6 py-3 border border-white/40 bg-transparent text-white/90 hover:bg-white/10 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 focus-visible:ring-offset-2"
                >
                  Any questions? Reach out <PhoneCall className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {faqData.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-white/10"
              >
                <AccordionTrigger className="text-left text-white hover:text-gray-300 text-xl font-semibold">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-300 leading-relaxed text-base">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </div>
  );
}

export { FAQ };

