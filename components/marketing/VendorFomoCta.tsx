"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, TrendingUp, Users, Zap } from "lucide-react";
import Link from "next/link";

export function VendorFomoCta() {
  return (
    <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 p-8 lg:p-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <Badge className="mb-4 bg-blue-100 text-blue-800 border-blue-200">
            <TrendingUp className="mr-2 h-3 w-3" />
            Join Now
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
            Is your agency missing from our directory?
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Get listed on SigmaVendor and connect with serious buyers looking for
            your services. Join hundreds of agencies already on the platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 mb-3">
              <Users className="h-6 w-6 text-blue-700" />
            </div>
            <h3 className="font-semibold text-slate-900 mb-2">More Visibility</h3>
            <p className="text-sm text-slate-600">
              Get discovered by buyers searching for your services
            </p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 mb-3">
              <Sparkles className="h-6 w-6 text-blue-700" />
            </div>
            <h3 className="font-semibold text-slate-900 mb-2">AI-Powered Matching</h3>
            <p className="text-sm text-slate-600">
              Our AI search helps buyers find you automatically
            </p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 mb-3">
              <Zap className="h-6 w-6 text-blue-700" />
            </div>
            <h3 className="font-semibold text-slate-900 mb-2">SigmaRemote Ready</h3>
            <p className="text-sm text-slate-600">
              Get PayrollReady badge and enable instant payments
            </p>
          </div>
        </div>

        <div className="text-center">
          <Link href="/certification">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Apply for certification
            </Button>
          </Link>
          <p className="text-sm text-slate-600 mt-4">
            Free to apply • Quick review process • Start getting leads
          </p>
        </div>
      </div>
    </Card>
  );
}

