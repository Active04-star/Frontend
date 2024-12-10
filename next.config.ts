import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['images.pexels.com','wallpapercave.com', "dam.which.co.uk", "i.pinimg.com"], // Aquí defines el dominio permitido
  },
};

export default nextConfig;
