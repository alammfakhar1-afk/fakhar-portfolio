FAKHAR ALAM PORTFOLIO - NETLIFY SETUP

FILES (sab zaroori hain, poora folder upload karo):
   index.html, css/site.css, js/app.js, js/lenis.min.js,
   content/site.json, admin/, images/, favicon.svg, favicon-32.png, apple-touch-icon.png

1) WEBSITE LIVE KARNA (Netlify Drop)
   - https://app.netlify.com/drop kholo aur is folder ko drag karo.
   - Site live ho jayegi. Site settings mein "Change site name" se naam
     rakh sakte ho (jaise fakharalam.netlify.app).
   - "Powered by Netlify" badge hatane ke liye: Netlify par login karke
     Drop wali site ko "Claim" karo (apne account mein le lo). Badge
     sirf un-claimed Drop sites par dikhta hai; code mein kuch nahi karna.

2) VIDEOS (Google Drive)
   - Har video Drive par upload karo, Share > "Anyone with the link" > Viewer.
   - Admin mein us video ke "Video link" (videoUrl) mein link paste karo.
     Koi bhi Drive format chalta hai: /file/d/ID/view, open?id=ID, uc?id=ID.
     YouTube, Vimeo aur direct .mp4 link bhi chalte hain.
   - Jab tak link nahi dalega, card par "Soon" tag aur lightbox mein
     "Video coming soon" dikhega.
   - Landscape (16:9) video ke liye "Horizontal video" ON karo.

3) ADMIN (/admin) CHALANE KE LIYE (GitHub + Decap CMS)
   Admin tab hi save karega jab site GitHub se connected ho.
   a) GitHub par naya repository banao, naam: fakhar-portfolio
      "uploading an existing file" se is folder ki SAARI files upload karo.
   b) admin/config.yml mein ye line check karo:
        repo: YOUR-GITHUB-USERNAME/fakhar-portfolio
   c) Netlify: Add new project > Import an existing project > GitHub >
      fakhar-portfolio. Build command khali, publish directory khali.
   d) GitHub: Settings > Developer settings > OAuth Apps > New OAuth App
        Homepage URL: https://APNI-SITE.netlify.app
        Authorization callback URL: https://api.netlify.com/auth/done
      Client ID aur Client Secret copy karo.
   e) Netlify: Project configuration > Access & security > OAuth >
      Install provider > GitHub > Client ID aur Secret paste karo.
   f) Ab https://APNI-SITE.netlify.app/admin kholo, "Login with GitHub".
      Edit karo, "Publish" dabao. 1-2 minute mein site update ho jayegi.

4) NAYA VIDEO ADD KARNA (step by step)
   1. Video Drive par upload karo > right click > Share > General access:
      "Anyone with the link" > Viewer > Copy link.
   2. APNI-SITE.netlify.app/admin kholo > Login with GitHub.
   3. "Website content" kholo > Work > Categories > apni category kholo
      (jaise "AI videos") > Videos > "Add Videos".
   4. Title, Description, Duration (jaise 0:45) bharo.
   5. "Video link" mein Drive ka link paste karo.
   6. "Cover image" mein thumbnail upload karo (9:16, 406x720 ya 1080x1920).
      Landscape video ho to "Horizontal video" ON karo.
   7. Upar "Publish" > "Publish now". 1-2 minute mein site par aa jayega.
