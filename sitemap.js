const axios = require('axios');
const fs = require('fs');
const path = require('path');

const URL = 'https://www.zattona.com';
const base_backend_url = "http://127.0.0.1:8090";

const SITEMAP_LOCATION = path.join(process.cwd(), 'src/sitemap.xml');

const ROUTES = [
  '/',
  '/posts',
];

axios.get(base_backend_url + '/api/content/posts?size=2000&api_access_key=123456')
  .then(resp => {
    console.log(resp.data.content);
    resp.data.data.content.forEach(post => {
      ROUTES.push(`/post/${post.slug}`);
    });
    main();
  });



axios.get(base_backend_url + '/api/content/categories?more=false&api_access_key=123456')
  .then(resp => {
    console.log(resp.data.content);
    resp.data.data.forEach(post => {
      ROUTES.push(`/category/${post.slug}`);
    });
    main();
  });


axios.get(base_backend_url + '/api/content/tags?more=false&api_access_key=123456')
  .then(resp => {
    console.log(resp.data.content);
    resp.data.data.forEach(post => {
      ROUTES.push(`/tag/${post.slug}`);
    });
    main();
  });

ROUTES.push(`/category/resources/tools`);

function main() {

  const sitemap = `
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${ROUTES.map(route => {
    return `<url>
      <loc>${URL}${route}</loc>
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