import { Search, CheckCircle2, Wallet } from "lucide-react";
import { Card } from "@/components/ui/card";

const steps = [
  {
    icon: Search,
    title: "Describe your needs",
    description: "Search our directory or fill out a form to describe what you're looking for.",
  },
  {
    icon: CheckCircle2,
    title: "See AI-ready, certified agencies",
    description: "Browse vetted agencies with certifications and detailed profiles.",
  },
  {
    icon: Wallet,
    title: "Pay them globally with SigmaRemote",
    description: "Use SigmaRemote to pay agencies anywhere with USD wallets and stablecoins.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-16 lg:py-24">
      <div className="text-center mb-12">
        <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
          How it works
        </h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Find, verify, and pay VA agencies seamlessly
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <Card key={index} className="text-center p-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-6">
              <step.icon className="h-8 w-8 text-slate-900" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-3">
              {step.title}
            </h3>
            <p className="text-slate-600">{step.description}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}

