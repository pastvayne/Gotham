import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Gotham",
    short_name: "Gotham",
    description: "A proposed privacy protocol for Elysium.",
    start_url: "/",
    display: "standalone",
    background_color: "#071321",
    theme_color: "#071321",
    icons: [{ src: "/brand/gotham-logo.png", sizes: "400x400", type: "image/png" }],
  };
}
