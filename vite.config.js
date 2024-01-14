import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest:{
        start_url:".",
        theme_color: "red",
        background_color:"#ffffff",
        display:"standalone",
        "share_target":{
          "action":"/share-target",
          "method":"GET",
          "params":{
            "title":"share-title",
            "text":"description",
            "url":"link"
          }
        },
        icons:[
          {
            src : "/yt23/favicon_io/android-chrome-512x512.png",
            sizes:"512x512",
            type:"image/png",
            purpose:"any maskable"
          }
        ]
      }
    }),
  ],
  base: "/yt23/",
});
