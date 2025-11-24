import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 lg:px-0 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              SigmaVendor
            </h3>
            <p className="text-sm text-slate-600">
              AI-ready directory and certification hub for virtual assistant and
              outsourcing agencies, connected to SigmaRemote for global payroll.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-900 mb-3">
              Links
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/agencies"
                  className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
                >
                  Agencies
                </Link>
              </li>
              <li>
                <Link
                  href="/certification"
                  className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
                >
                  Certification
                </Link>
              </li>
              <li>
                <Link
                  href="/#ai-search"
                  className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
                >
                  AI Search
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-slate-900 mb-2">
              Pay agencies with SigmaRemote
            </h4>
            <p className="text-sm text-slate-600 mb-4">
              Set up USD wallets, stablecoin payouts, and local bank transfers
              in 180+ countries.
            </p>
            <a
              href="https://sigmaremote.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mb-3"
            >
              <Button size="sm" variant="outline">
                Visit SigmaRemote
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </a>
            <p className="text-xs text-slate-500 mt-2">
              Agencies with PayrollReady badges are already integrated.
            </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-slate-200 text-center text-sm text-slate-600">
          <p>© {new Date().getFullYear()} SigmaVendor. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

