/* Extra, type-specific content for the demo site: the interactive-looking
   hero widget and the words used in the stats strip. All numbers, prices and
   reviews here are SAMPLE content — the demo window says so. */

// widget.kind: "form" (fields + chips + button) or "list" (items with prices)
export const WIDGETS = {
  clinic: {
    kind: "form",
    title: "Book an appointment",
    fields: [
      {label: "Department", value: "General physician"},
      {label: "Date", value: "Tomorrow"}
    ],
    chips: {label: "Available slots", items: ["10:00 AM", "11:30 AM", "5:00 PM", "6:30 PM"], active: 1},
    button: "Confirm booking"
  },
  ca: {
    kind: "form",
    title: "Free 15-min consultation",
    fields: [
      {label: "Service", value: "GST registration"},
      {label: "Your phone", value: "98XXX XXXXX"}
    ],
    chips: {label: "Preferred time", items: ["Morning", "Afternoon", "Evening"], active: 0},
    button: "Request a call back"
  },
  coaching: {
    kind: "form",
    title: "Admission enquiry",
    fields: [
      {label: "Course", value: "NEET 2027 (Class 11)"},
      {label: "Student name", value: "Your name"}
    ],
    chips: {label: "Batch", items: ["Morning", "Evening", "Weekend"], active: 1},
    button: "Book a free demo class"
  },
  taxi: {
    kind: "form",
    title: "Book your ride",
    fields: [
      {label: "Pickup", value: "{city} Bus Stand"},
      {label: "Drop", value: "IGI Airport, Delhi"}
    ],
    chips: {label: "Choose car", items: ["Sedan", "SUV", "Tempo Traveller"], active: 0},
    button: "Get fare on WhatsApp"
  },
  shop: {
    kind: "list",
    title: "Today's offers",
    items: [
      {name: "Festive combo pack", price: "₹999", old: "₹1,499"},
      {name: "New arrival", price: "₹649", old: "₹899"},
      {name: "Best seller", price: "₹399", old: "₹549"}
    ],
    button: "Order on WhatsApp"
  },
  gym: {
    kind: "list",
    title: "Membership plans",
    items: [
      {name: "Monthly", price: "₹1,200"},
      {name: "Quarterly", price: "₹3,000", tag: "Popular"},
      {name: "Yearly", price: "₹9,999", tag: "Best value"}
    ],
    button: "Book a free trial"
  },
  salon: {
    kind: "form",
    title: "Book a slot",
    fields: [
      {label: "Service", value: "Haircut & styling"},
      {label: "Date", value: "Saturday"}
    ],
    chips: {label: "Available slots", items: ["11:00 AM", "1:30 PM", "4:00 PM", "6:00 PM"], active: 2},
    button: "Confirm slot"
  },
  restaurant: {
    kind: "list",
    title: "Today's specials",
    items: [
      {name: "Special veg thali", price: "₹249", tag: "Chef's pick"},
      {name: "Paneer tikka", price: "₹299"},
      {name: "Family combo (4)", price: "₹899"}
    ],
    button: "Order now"
  }
};

// Word used for "5,000+ happy ___" in the stats strip.
export const PEOPLE = {
  clinic: "patients",
  ca: "clients",
  coaching: "students",
  taxi: "riders",
  shop: "customers",
  gym: "members",
  salon: "clients",
  restaurant: "guests"
};

export const REVIEWS = [
  {name: "Rahul S.", text: "Very professional and friendly. Everything was quick and easy — highly recommended!"},
  {name: "Priya M.", text: "Booked on WhatsApp in a minute. Great service and fair prices."},
  {name: "Amit K.", text: "Best in {city}. The team really cares about their customers."}
];

export const BUILD_STEPS = [
  "Adding your logo & name",
  "Applying your brand colour",
  "Setting up booking & WhatsApp",
  "Making it mobile-friendly"
];
