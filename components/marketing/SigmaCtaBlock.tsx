import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Wallet } from "lucide-react";

export function SigmaCtaBlock() {
  return (
    <section className="py-16 lg:py-24">
      <Card className="bg-gradient-to-br from-slate-900 to-slate-800 text-white border-0 p-8 lg:p-12">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 mb-4">
            <Wallet className="h-8 w-8" />
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold">
            Already working with an agency?
          </h2>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Run their payroll through SigmaRemote with USD wallets and stablecoin
            rails in 180+ countries.
          </p>
          <a
            href="https://sigmaremote.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="lg" variant="outline" className="bg-white text-slate-900 hover:bg-slate-100">
              Talk to SigmaRemote
              <ExternalLink className="ml-2 h-5 w-5" />
            </Button>
          </a>
        </div>
      </Card>
    </section>
  );
}

