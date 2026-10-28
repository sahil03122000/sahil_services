import {
  Activity,
  Ambulance,
  Apple,
  BadgePercent,
  Bike,
  BookOpen,
  Briefcase,
  Building2,
  Car,
  Crown,
  Dumbbell,
  FileText,
  FlaskConical,
  Flower2,
  GraduationCap,
  HeartPulse,
  MonitorPlay,
  PartyPopper,
  Plane,
  Receipt,
  Route,
  Scissors,
  ShieldCheck,
  Soup,
  Sparkles,
  Star,
  Stethoscope,
  Store,
  Trophy,
  Truck,
  UserCheck,
  UtensilsCrossed
} from "lucide-react";

/* One template per business type. `{city}` in text is replaced with the
   visitor's city. */
export const TEMPLATES = {
  clinic: {
    label: "Clinic / Hospital",
    Icon: Stethoscope,
    headline: "Expert care for you and your family",
    sub: "Experienced doctors, modern equipment and caring staff — right here in {city}.",
    cta: "Book appointment",
    servicesTitle: "Our treatments",
    services: [
      {Icon: Stethoscope, title: "General consultation", text: "Check-ups and treatment for the whole family."},
      {Icon: Activity, title: "Tests & diagnostics", text: "Blood tests, ECG and reports on time."},
      {Icon: HeartPulse, title: "Specialist care", text: "Expert doctors for long-term conditions."},
      {Icon: Ambulance, title: "Emergency support", text: "Quick help when you need it most."}
    ],
    highlights: ["Experienced doctors", "Online appointment booking", "Clean & modern clinic"],
    hours: "Mon–Sat · 9:00 AM – 8:00 PM"
  },
  ca: {
    label: "CA / Tax consultant",
    Icon: Briefcase,
    headline: "Tax, GST & accounts — handled by experts",
    sub: "Trusted chartered accountants for individuals and businesses in {city}.",
    cta: "Book a consultation",
    servicesTitle: "Our services",
    services: [
      {Icon: FileText, title: "Income tax filing", text: "ITR filing for salaried people and businesses."},
      {Icon: Receipt, title: "GST registration & returns", text: "Registration, monthly returns and notices."},
      {Icon: Building2, title: "Company registration", text: "Pvt Ltd, LLP and partnership setup."},
      {Icon: ShieldCheck, title: "Audit & compliance", text: "Audits, ROC filings and advisory."}
    ],
    highlights: ["Qualified CA team", "On-time filing", "Clear, fair fees"],
    hours: "Mon–Sat · 10:00 AM – 7:00 PM"
  },
  coaching: {
    label: "Coaching / School",
    Icon: GraduationCap,
    headline: "Your success starts here",
    sub: "Expert teachers, small batches and proven results for students in {city}.",
    cta: "Enquire for admission",
    servicesTitle: "Our courses",
    services: [
      {Icon: FlaskConical, title: "NEET / JEE", text: "Complete preparation with regular tests."},
      {Icon: BookOpen, title: "Board exams", text: "Classes 9–12, all major subjects."},
      {Icon: Trophy, title: "Competitive exams", text: "SSC, banking and government exams."},
      {Icon: MonitorPlay, title: "Online classes", text: "Live and recorded lectures from home."}
    ],
    highlights: ["Experienced faculty", "Weekly tests & reports", "Doubt-clearing sessions"],
    hours: "Mon–Sat · 7:00 AM – 8:00 PM"
  },
  taxi: {
    label: "Taxi / Travels",
    Icon: Car,
    headline: "Safe & comfortable rides, any time",
    sub: "Clean cars, trusted drivers and fair fares — local and outstation from {city}.",
    cta: "Book a ride",
    servicesTitle: "Our rides",
    services: [
      {Icon: Car, title: "Local taxi", text: "Quick pickups anywhere in the city."},
      {Icon: Route, title: "Outstation trips", text: "One-way and round trips across India."},
      {Icon: Plane, title: "Airport transfer", text: "On-time pickup and drop, day or night."},
      {Icon: Sparkles, title: "Wedding cars", text: "Decorated cars for your special day."}
    ],
    highlights: ["24×7 service", "Verified drivers", "No hidden charges"],
    hours: "Open 24 hours · 7 days"
  },
  shop: {
    label: "Shop / Showroom",
    Icon: Store,
    headline: "Quality products at the best prices",
    sub: "Visit our store in {city} or order on WhatsApp for quick home delivery.",
    cta: "Order on WhatsApp",
    servicesTitle: "Shop with us",
    services: [
      {Icon: Sparkles, title: "New arrivals", text: "The latest products, every week."},
      {Icon: Star, title: "Best sellers", text: "Customer favourites at great prices."},
      {Icon: BadgePercent, title: "Offers & discounts", text: "Festival deals and combo offers."},
      {Icon: Truck, title: "Home delivery", text: "Fast delivery to your doorstep."}
    ],
    highlights: ["Genuine products", "Easy returns", "Best price promise"],
    hours: "Mon–Sun · 10:00 AM – 9:00 PM"
  },
  gym: {
    label: "Gym / Fitness",
    Icon: Dumbbell,
    headline: "Get fit. Stay strong.",
    sub: "Modern equipment, expert trainers and flexible plans in {city}.",
    cta: "Join now",
    servicesTitle: "What we offer",
    services: [
      {Icon: Dumbbell, title: "Weight training", text: "Full range of modern equipment."},
      {Icon: HeartPulse, title: "Cardio zone", text: "Treadmills, cycles and cross-trainers."},
      {Icon: UserCheck, title: "Personal training", text: "One-on-one coaching for faster results."},
      {Icon: Apple, title: "Diet plans", text: "Simple nutrition plans that work."}
    ],
    highlights: ["Certified trainers", "Flexible timings", "Free trial session"],
    hours: "Mon–Sun · 5:00 AM – 10:00 PM"
  },
  salon: {
    label: "Salon / Parlour",
    Icon: Scissors,
    headline: "Look your best, feel your best",
    sub: "Hair, skin and bridal services by expert stylists in {city}.",
    cta: "Book a slot",
    servicesTitle: "Our services",
    services: [
      {Icon: Scissors, title: "Haircut & styling", text: "Trendy cuts, colour and treatments."},
      {Icon: Sparkles, title: "Facial & skincare", text: "Glowing skin with premium products."},
      {Icon: Crown, title: "Bridal makeup", text: "Complete bridal and party looks."},
      {Icon: Flower2, title: "Spa & massage", text: "Relax and refresh your body."}
    ],
    highlights: ["Expert stylists", "Hygienic & safe", "Premium products"],
    hours: "Tue–Sun · 10:00 AM – 8:00 PM"
  },
  restaurant: {
    label: "Restaurant / Cafe",
    Icon: UtensilsCrossed,
    headline: "Fresh food, made with love",
    sub: "Delicious meals, cosy seating and fast delivery across {city}.",
    cta: "Order now",
    servicesTitle: "Why people love us",
    services: [
      {Icon: UtensilsCrossed, title: "Dine-in", text: "Comfortable seating for families."},
      {Icon: Bike, title: "Home delivery", text: "Hot food delivered to your door."},
      {Icon: PartyPopper, title: "Party orders", text: "Birthdays, kitty parties and events."},
      {Icon: Soup, title: "Special thali", text: "Our chef's special, every day."}
    ],
    highlights: ["Fresh ingredients", "Pure veg options", "Quick delivery"],
    hours: "Mon–Sun · 11:00 AM – 11:00 PM"
  }
};

export const COLORS = [
  {id: "violet", label: "Violet", value: "#6d4cff"},
  {id: "blue", label: "Blue", value: "#2563eb"},
  {id: "teal", label: "Teal", value: "#0d9488"},
  {id: "green", label: "Green", value: "#16a34a"},
  {id: "orange", label: "Orange", value: "#ea580c"},
  {id: "red", label: "Red", value: "#dc2626"},
  {id: "pink", label: "Pink", value: "#db2777"},
  {id: "gold", label: "Gold", value: "#b45309"}
];
