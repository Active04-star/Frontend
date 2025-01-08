import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "lh3.googleusercontent.com",
      "images.pexels.com",
      "wallpapercave.com",
      "dam.which.co.uk",
      "i.pinimg.com",
      "images.unsplash.com",
      "res.cloudinary.com",
      "s.gravatar.com",
    ], // Aquí defines el dominio permitido
  },
};

export default nextConfig;
