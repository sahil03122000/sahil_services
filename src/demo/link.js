import {COLORS, TEMPLATES} from "./templates";

// Public address of the site, used to build demo links that can be shared.
export const SITE_URL = "https://sahil03122000.github.io/sahil_services/";

/* A shareable demo link carries the business details in the query string:
   ?n=name&t=type&c=city&p=phone&k=colour id. Images are never in the link. */
export function demoLink({name, type, city = "", phone = "", color = COLORS[0].id}) {
  const params = new URLSearchParams({n: name.trim(), t: type});
  if (city.trim()) params.set("c", city.trim());
  if (phone.trim()) params.set("p", phone.trim());
  if (color && color !== COLORS[0].id) params.set("k", color);
  return `${SITE_URL}?${params}#demo`;
}

/* Reads demo details from the current URL, or null when there are none. */
export function readDemoLink(search = window.location.search) {
  const params = new URLSearchParams(search);
  const name = (params.get("n") || "").trim().slice(0, 40);
  if (!name) return null;
  const type = TEMPLATES[params.get("t")] ? params.get("t") : Object.keys(TEMPLATES)[0];
  const color = COLORS.find(c => c.id === params.get("k")) || COLORS[0];
  return {
    name,
    type,
    city: (params.get("c") || "").trim().slice(0, 30),
    phone: (params.get("p") || "").replace(/[^\d+ ]/g, "").slice(0, 15),
    color: color.value
  };
}
