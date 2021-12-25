const axios = require('axios');
const fs = require('fs');
const path = require('path');

const URL = 'https://www.zattona.com';
const base_backend_url = "http://127.0.0.1:8090";

const SITEMAP_LOCATION = path.join(process.cwd(), 'src/sitemap_imgs.xml');

const ROUTES = [
  '/',
  '/posts',
];

const maps= new Map();

axios.get(base_backend_url + '/api/content/posts?size=2000&api_access_key=123456')
  .then(resp => {
    console.log(resp.data.content);
    resp.data.data.content.forEach(post => {
      ROUTES.push(`/post/${post.slug}`);
      console.log(post.thumbnail);
      maps.set(post.slug,post.thumbnail);
    });
    main();
  });



function main() {

  const sitemap = `
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${ROUTES.map(route => {
    return `<url>
      <loc>${URL}${route}</loc>
       <image:image>
          <image:loc>${maps.get(route)}</image:loc>
       </image:image>
    </url>
    `
  }).reduce((acc, item) => {
    return acc + item;
  }, '')}
  </urlset>
  `;
  fs.writeFileSync(SITEMAP_LOCATION, sitemap);
  console.log('Sitemap Generated......');
}