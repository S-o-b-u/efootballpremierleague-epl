import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";

export function Testimonials() {
  const testimonials = [
    {
      quote:
        "Souvik here! I’m the developer behind this website, the league organizer, and the person keeping our Instagram buzzing with updates. Building a vibrant football community is what I love!",
      name: "Souvik Rahut",
      designation: "Developer and Organizer",
      src: "/images/sobu.webp",
    },
    {
      quote:
        "Meet Abir—a developer and league organizer who ensures tables, fixtures, and the Golden Boot standings are always on point. Keeping the league structured and competitive is my thing!",
      name: "Abir Dutta",
      designation: "Developer and Organizer",
      src: "/images/abir.jpg",
    },
    {
      quote:
        "Trishan at your service! As an admin and match organizer, I make sure every game runs seamlessly, bringing excitement to players and fans alike.",
      name: "Trishan Dewanji",
      designation: "Organizer",
      src: "/images/trishan.jpeg",
    },
    {
      quote:
        "Snehashis here! I manage the WhatsApp groups and coordinate league activities to ensure everyone’s on the same page and the league operates like clockwork.",
      name: "Snehasish Saha",
      designation: "Organizer",
      src: "/images/snehasish.jpeg",
    },
    {
      quote:
        "Soumyadeep checking in! I’m all about managing participant groups and tracking points to keep the league engaging and fun for everyone.",
      name: "Soumyadip Banerji",
      designation: "Organizer",
      src: "/images/soumyadip.jpeg",
    },
  ];
  return <AnimatedTestimonials testimonials={testimonials} />;
}
