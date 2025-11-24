import { Footer7 } from "@/components/ui/footer-7";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <Footer7
      logo={{
        url: "/",
        src: "",
        alt: "SigmaVendor Logo",
        title: "SigmaVendor",
      }}
      description="AI-ready directory and certification hub for virtual assistant and outsourcing agencies."
      sections={[
        {
          title: "Product",
          links: [
            { name: "Agencies", href: "/agencies" },
            { name: "Certification", href: "/certification" },
            { name: "AI Search", href: "/#ai-search" },
            { name: "Categories", href: "/categories" },
          ],
        },
        {
          title: "Company",
          links: [
            { name: "About", href: "/#about" },
            { name: "How It Works", href: "/#how-it-works" },
            { name: "Blog", href: "/#blog" },
            { name: "Contact", href: "/#contact" },
          ],
        },
        {
          title: "Resources",
          links: [
            { name: "Glossary", href: "/glossary" },
            { name: "Help Center", href: "/#help" },
            { name: "SigmaRemote", href: "https://sigmaremote.com" },
            { name: "Privacy Policy", href: "/#privacy" },
          ],
        },
      ]}
      socialLinks={[
        { icon: <FaInstagram className="size-5" />, href: "#", label: "Instagram" },
        { icon: <FaFacebook className="size-5" />, href: "#", label: "Facebook" },
        { icon: <FaTwitter className="size-5" />, href: "#", label: "Twitter" },
        { icon: <FaLinkedin className="size-5" />, href: "#", label: "LinkedIn" },
      ]}
      copyright={`© ${currentYear} SigmaVendor. All rights reserved.`}
      legalLinks={[
        { name: "Terms and Conditions", href: "/#terms" },
        { name: "Privacy Policy", href: "/#privacy" },
      ]}
    />
  );
}

