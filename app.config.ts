import { defineConfig } from "@solidjs/start/config";

export default defineConfig({
    // server: {
    //     prerender: {
    //         crawlLinks: true
    //     },
    //     preset: "netlify-edge"
    // }
    server: {
        prerender: {
            crawlLinks: true
        },
        preset: "vercel",
    }
});
