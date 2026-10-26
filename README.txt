FAKHAR ALAM PORTFOLIO - NETLIFY SETUP

1) WEBSITE LIVE KARNA (Netlify Drop)
   - https://app.netlify.com/drop kholo aur is folder ko drag karo.
   - Site live ho jayegi. Site settings mein "Change site name" se naam
     rakh sakte ho (jaise fakharalam.netlify.app).

2) VIDEOS (Google Drive)
   - Har video Drive par upload karo, Share > "Anyone with the link" > Viewer.
   - Link admin mein us video ke "Google Drive video link" mein paste karo.
   - Jab tak link nahi dalega, video par "Video coming soon" dikhega.

3) ADMIN (/admin) CHALANE KE LIYE (GitHub + Decap CMS)
   Admin tab hi save karega jab site GitHub se connected ho.
   a) GitHub par naya repository banao, naam: fakhar-portfolio
      "uploading an existing file" se is folder ki SAARI files upload karo.
   b) admin/config.yml mein ye line badlo:
        repo: YOUR-GITHUB-USERNAME/fakhar-portfolio
      YOUR-GITHUB-USERNAME ki jagah apna GitHub username likho.
   c) Netlify: Add new project > Import an existing project > GitHub >
      fakhar-portfolio. Build command khali, publish directory khali.
      (Drop wali site delete kar do ya isi ko use karo.)
   d) GitHub: Settings > Developer settings > OAuth Apps > New OAuth App
        Homepage URL: https://APNI-SITE.netlify.app
        Authorization callback URL: https://api.netlify.com/auth/done
      Client ID aur Client Secret copy karo.
   e) Netlify: Project configuration > Access & security > OAuth >
      Install provider > GitHub > Client ID aur Secret paste karo.
   f) Ab https://APNI-SITE.netlify.app/admin kholo, "Login with GitHub".
      Edit karo, "Publish" dabao. 1-2 minute mein site update ho jayegi.
