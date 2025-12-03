"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Linkedin, Instagram } from 'lucide-react';
import { AnimatedHeading } from '@/components/ui/animated-heading';

interface ContactSectionProps {
  /**
   * The title for the contact section.
   */
  title?: string;
  /**
   * The subtitle or main message for the introductory part.
   */
  subtitle?: string;
  /**
   * The contact email to display.
   */
  contactEmail?: string;
  /**
   * Array of social media links. Each object should have an 'id', 'name', 'icon', and 'href'.
   */
  socialLinks?: Array<{ id: string; name: string; icon: React.ReactNode; href: string }>;
  /**
   * Placeholder image for the background.
   */
  backgroundImageSrc?: string;
  /**
   * Callback function when the form is submitted.
   * @param data The form data.
   */
  onSubmit?: (data: any) => void;
}

// X icon component (since lucide-react doesn't have X icon, we'll create a simple one)
const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const defaultSocialLinks = [
  { id: '1', name: 'X', icon: <XIcon className="h-5 w-5 text-slate-900" />, href: 'https://x.com' },
  { id: '2', name: 'Instagram', icon: <Instagram className="h-5 w-5 text-slate-900" />, href: 'https://instagram.com' },
  { id: '3', name: 'LinkedIn', icon: <Linkedin className="h-5 w-5 text-slate-900" />, href: 'https://linkedin.com' },
];

export const ContactSection: React.FC<ContactSectionProps> = ({
  title = "Want a curated short list from SigmaVendor?",
  subtitle = "Tell us what you need, and we'll match you with the best agencies.",
  contactEmail = "hello@sigmavendor.com",
  socialLinks = defaultSocialLinks,
  backgroundImageSrc = "https://images.unsplash.com/photo-1557683316-973673baf926?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
  onSubmit,
}) => {
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    message: '',
    projectType: [] as string[],
  });
  const [submitted, setSubmitted] = React.useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (type: string, checked: boolean) => {
    setFormData((prev) => {
      const currentTypes = prev.projectType;
      if (checked) {
        return { ...prev, projectType: [...currentTypes, type] };
      } else {
        return { ...prev, projectType: currentTypes.filter((t) => t !== type) };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(formData);
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', message: '', projectType: [] });
    }, 3000);
  };

  const projectTypeOptions = [
    'Website', 'Mobile App', 'Web App', 'E-Commerce',
    'Brand Identity', '3D & Animation', 'Social Media Marketing',
    'Brand Strategy & Consulting', 'Other'
  ];

  return (
    <section id="get-matched" className="relative min-h-[600px] lg:min-h-[700px] w-screen overflow-hidden bg-black text-white pt-0 pb-12 lg:pb-16 bg-[url('https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/hero/bg-gradient-3.svg')] bg-center bg-cover">
      {/* Gradient fade overlay for smooth transition from section above */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black via-black/50 to-transparent pointer-events-none z-10" />
      
      {/* Animated Bubbles */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute bg-white/20 rounded-full animate-bubble opacity-0"
            style={{
              width: `${Math.random() * 20 + 10}px`,
              height: `${Math.random() * 20 + 10}px`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${Math.random() * 20 + 10}s`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Main Content Overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full min-h-[600px] lg:min-h-[700px] p-4 md:p-8 lg:p-12">
        {/* Main Section - Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-7xl p-4 md:p-8 rounded-xl">
          {/* Left Side: Title */}
          <div className="flex flex-col justify-center p-4 lg:p-8">
            <AnimatedHeading>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight drop-shadow-lg max-w-lg tracking-tight" style={{ lineHeight: '1.1' }}>
                <span className="bg-gradient-to-r from-white via-white to-[#748298] bg-clip-text text-transparent inline-block" style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', paddingBottom: '0.1em' }}>
                  {title}
                </span>
              </h1>
            </AnimatedHeading>
            <AnimatedHeading delay={0.2}>
              <p className="text-lg md:text-xl text-slate-400 mt-4 max-w-lg font-medium">
                {subtitle}
              </p>
            </AnimatedHeading>
          </div>

          {/* Right Side: Contact Form */}
          <div className="bg-white/95 backdrop-blur-sm p-6 md:p-8 rounded-lg shadow-xl border border-slate-200">
            {submitted ? (
              <div className="text-center py-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                  <svg
                    className="h-8 w-8 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2 tracking-tight">
                  Thank you!
                </h3>
                <p className="text-slate-500 font-medium">
                  We&apos;ll be in touch soon with curated agency recommendations.
                </p>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-semibold text-slate-900 mb-6 tracking-tight">Let&apos;s talk! 👋</h2>

                {/* Email & Socials */}
                <div className="mb-6">
                  <p className="text-slate-500 mb-2 font-medium">Mail us at</p>
                  <a href={`mailto:${contactEmail}`} className="text-slate-900 hover:underline font-semibold">
                    {contactEmail}
                  </a>
                  <div className="flex items-center space-x-3 mt-4">
                    <span className="text-slate-600">OR</span>
                    {socialLinks.map((link) => (
                      <Button key={link.id} variant="outline" size="icon" asChild className="border-slate-200 hover:bg-slate-50">
                        <a href={link.href} aria-label={link.name} target="_blank" rel="noopener noreferrer">
                          {link.icon}
                        </a>
                      </Button>
                    ))}
                  </div>
                </div>

                <hr className="my-6 border-slate-200" />

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <p className="text-slate-500 font-medium">Leave us a brief message</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-slate-700">Your name</Label>
                      <Input 
                        id="name" 
                        name="name" 
                        placeholder="Your name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        required 
                        className="border-slate-200 text-slate-900"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-slate-700">Work email</Label>
                      <Input 
                        id="email" 
                        name="email" 
                        type="email" 
                        placeholder="you@company.com" 
                        value={formData.email} 
                        onChange={handleChange} 
                        required 
                        className="border-slate-200 text-slate-900"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-slate-700">What do you need?</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Describe the services you're looking for, team size, budget, timezone requirements, etc."
                      className="min-h-[120px] border-slate-200 text-slate-900"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-4">
                    <p className="text-slate-500 font-medium">I&apos;m looking for...</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {projectTypeOptions.map((option) => (
                        <div key={option} className="flex items-center space-x-2">
                          <Checkbox
                            id={option.replace(/\s/g, '-').toLowerCase()}
                            checked={formData.projectType.includes(option)}
                            onCheckedChange={(checked) => handleCheckboxChange(option, checked as boolean)}
                          />
                          <Label 
                            htmlFor={option.replace(/\s/g, '-').toLowerCase()} 
                            className="text-sm font-normal text-slate-700 cursor-pointer"
                          >
                            {option}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-slate-900 text-white hover:bg-slate-800 font-medium" size="lg">
                    Get Matched in Minutes
                  </Button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>

      {/* CSS for bubble animation */}
      <style jsx global>{`
        @keyframes bubble {
          0% {
            transform: translateY(0) translateX(0) scale(0.5);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) translateX(calc(var(--rand-x-offset) * 10vw)) scale(1.2);
            opacity: 0;
          }
        }
        .animate-bubble {
          animation: bubble var(--animation-duration, 15s) ease-in-out infinite;
          animation-fill-mode: forwards;
          --rand-x-offset: ${Math.random() > 0.5 ? 1 : -1};
        }
      `}</style>
    </section>
  );
};

