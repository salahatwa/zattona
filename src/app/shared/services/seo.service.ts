import { DOCUMENT } from "@angular/common";
import { Inject, Injectable } from "@angular/core";
import { Meta, Title } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { Constants } from "../helpers/constants";
@Injectable({
  providedIn: "root",
})
export class SeoService {


  constructor(
    private title: Title,
    private meta: Meta,
    private router: Router,
    @Inject(DOCUMENT) private dom,
  ) { }

  setMetaTags(config?: any) {
    config = {
      title: Constants.SITE_TITLE,
      description: Constants.SITE_DESC,
      url: `${this.dom.location.origin}${this.router.url}`,
      ...config,
      keywords:(config?.keywords&&config.keywords!=='')? config.keywords : Constants.SITE_KEYWORDS,
      image: (config?.image&&config.image!=='')? config.image : Constants.SITE_URL_ICON,
    };

    // Set title
    this.title.setTitle(config?.title);

    // Google
    this.meta.updateTag({ name: "Description", content: config.description });
    this.meta.updateTag({ name: "Keywords", content: config.keywords });
    
    this.meta.updateTag({ name: "google-site-verification", content: Constants.GOOGLE_SITE_VERIFICATION });
    this.meta.updateTag({ name: "yandex-verification", content: Constants.YANDIX_VERIFICATION });
    this.meta.updateTag({ name: "msvalidate.01", content: Constants.BING_VERIFICATION });

    // <meta name="msvalidate.01" content="B5D4DB87ECC982F1090EE4D2A0F70A62" />
    // <meta name="yandex-verification" content="011ababa95dd13ad" />



    // Twitter
    this.meta.updateTag({ name: "twitter:card", content: "summary" });
    this.meta.updateTag({ name: "twitter:site", content: `${Constants.SITE_TAG}` });
    this.meta.updateTag({ name: "twitter:creator", content: `${Constants.SITE_TAG}` });
    this.meta.updateTag({ name: "twitter:title", content: config.title });
    this.meta.updateTag({ name: "twitter:description", content: config.description });
    this.meta.updateTag({ name: "twitter:image", content: config.image });
    this.meta.updateTag({ name: "twitter:image:alt", content: config.title });
    this.meta.updateTag({ name: "twitter:label1", content: "Est. reading time" });
    this.meta.updateTag({ name: "twitter:data1", content: "10 minutes" });

    // Facebook and other social sites
    this.meta.updateTag({ property: "og:type", content: "article" });
    this.meta.updateTag({ property: "og:site_name", content: Constants.SITE_TITLE });
    this.meta.updateTag({ property: "og:title", content: config.title });
    this.meta.updateTag({
      property: "og:description",
      content: config.description,
    });
    this.meta.updateTag({ property: "og:image", content: config.image });
    this.meta.updateTag({ property: "og:url", content: config.url });
    /*  this.meta.updateTag({
       property: "fb:app_id",
       content: `your-facebook-app-id`,
     }); */
  }

  createLinkForCanonicalURL(url) {
    const head = this.dom.getElementsByTagName('head')[0];
    var element: HTMLLinkElement = this.dom.querySelector(`link[rel='canonical']`) || null
    if (element == null) {
      element = this.dom.createElement('link') as HTMLLinkElement;
      head.appendChild(element);
    }
    element.setAttribute('rel', 'canonical')
    element.setAttribute('href', url)
  }
}
