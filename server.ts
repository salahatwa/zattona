import { APP_BASE_HREF } from "@angular/common";
import { ngExpressEngine } from "@nguniversal/express-engine";
import * as compression from 'compression';
import * as express from "express";
import { existsSync } from "fs";
import { join } from "path";
import { environment } from "src/environments/environment";
import "zone.js/dist/zone-node";
import { AppServerModule } from "./src/main.server";

import * as kjua from 'kjua-svg';


const request = require("request");

// The Express app is exported so that it can be used by serverless Functions.
export function app() {
  const server = express();

  server.use(compression({
    filter: function (req, res) {
      return (/json|text|javascript|css|font|svg/).test(res.getHeader('Content-Type'));
    },
    level: 9
  }));

  const distFolder = join(process.cwd(), "dist", "browser");

  const baseURL = environment.apiUrl;

  const sitemapUrl = baseURL + "/sitemap.xml";
  const rssUrl = baseURL + "/rss.xml";
  const atomUrl = baseURL + "/atom.xml";
  const sitemapHtmlUrl = baseURL + "/sitemap.html";
  const robotsUrl = baseURL + "/robots.txt";


  // const distFolder = join(process.cwd(), 'dist/nodeblog/browser');
  const indexHtml = existsSync(join(distFolder, "index.original.html"))
    ? "index.original.html"
    : "index";

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  server.engine(
    "html",
    ngExpressEngine({
      bootstrap: AppServerModule,
    })
  );

  server.set("view engine", "html");
  server.set("views", distFolder);



  server.all("/robots.txt", function (req, res) {
    // we need to redirect the sitemap request directly to the backend
    var options = {
      url: robotsUrl,
      headers: {
        Accept: "text/plain",
      },
    };

    request(options).pipe(res);
  });



  server.all("/sitemap.html", function (req, res) {
    // we need to redirect the sitemap request directly to the backend
    var options = {
      url: sitemapHtmlUrl,
      headers: {
        Accept: "application/html",
      },
    };

    request(options).pipe(res);
  });

  server.all("/sitemap.xml", function (req, res) {
    // we need to redirect the sitemap request directly to the backend
    var options = {
      url: sitemapUrl,
      headers: {
        Accept: "application/xml",
      },
    };

    request(options).pipe(res);
  });

  server.all("/rss.xml", function (req, res) {
    // we need to redirect the sitemap request directly to the backend
    var options = {
      url: rssUrl,
      headers: {
        Accept: "application/xml",
      },
    };

    request(options).pipe(res);
  });
  server.all("/atom.xml", function (req, res) {
    // we need to redirect the sitemap request directly to the backend
    var options = {
      url: atomUrl,
      headers: {
        Accept: "application/xml",
      },
    };

    request(options).pipe(res);
  });

  //https://www.codegrepper.com/code-examples/javascript/passing+parameters+in+url+express
  //   GET /something?color1=red&color2=blue

  server.all('/qr', (req, res) => {

    console.log(req.query.content);
    var options: kjua.KjuaOptions = {
      text: req.query.content + ''
    };
    // const code = kjua(options);
    // document.getElementById("container").appendChild(code);
    // console.log(code);
    // var options = {
    //   url: req.baseUrl,
    //   headers: {
    //     Accept: "application/html",
    //   },
    // };

    request(options).pipe(res);
  })

  // req.params refers to items with a ':' in the URL and req.query refers to items associated with the '?


  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get(
    "*.*",
    express.static(distFolder, {
      maxAge: "1y",
    })
  );

  // All regular routes use the Universal engine
  server.get("*", (req, res) => {
    res.render(indexHtml, {
      req,
      providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }],
    });
  });

  return server;
}

function run() {
  const port = process.env.PORT || 4000;
  // Start up the Node server
  const server = app();
  server.use(express.static("public"));

  server.listen(port, () => {
    console.log(`Zattona listening on http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = (mainModule && mainModule.filename) || "";
if (moduleFilename === __filename || moduleFilename.includes("iisnode")) {
  run();
}

export * from "./src/main.server";
