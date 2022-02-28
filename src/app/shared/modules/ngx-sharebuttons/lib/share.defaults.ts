import { IShareButtons, ShareParams } from './share.models';
import { copyToClipboard, printPage } from './utils';

// Create message body that includes the sharing link used for Email, SMS and WhatsApp buttons
const linkInDescription = {
  description: (p: ShareParams) => {
    return p.description ? `${ p.description }\r\n${ p.url }` : p.url;
  }
};

export const SHARE_BUTTONS: IShareButtons = {
  facebook: {
    type: 'facebook',
    text: 'Facebook',
    ariaLabel: 'Share on Facebook',
    icon: ['fa', 'fa-facebook'],
    color: '#4267B2',
    share: {
      desktop: 'https://www.facebook.com/sharer/sharer.php?'
    },
    params: {
      url: 'u'
    }
  },
  twitter: {
    type: 'twitter',
    text: 'Twitter',
    ariaLabel: 'Share on Twitter',
    icon: ['fa', 'fa-twitter'],
    color: '#00acee',
    share: {
      desktop: 'https://twitter.com/intent/tweet?'
    },
    params: {
      url: 'url',
      description: 'text',
      tags: 'hashtags',
      via: 'via'
    }
  },
  linkedin: {
    type: 'linkedin',
    text: 'LinkedIn',
    ariaLabel: 'Share on LinkedIn',
    icon: ['fa', 'fa-linkedin'],
    color: '#006fa6',
    share: {
      desktop: 'https://www.linkedin.com/shareArticle?'
    },
    params: {
      url: 'url',
      title: 'title',
      description: 'summary'
    }
  },
  pinterest: {
    type: 'pinterest',
    text: 'Pinterest',
    ariaLabel: 'Share on Pinterest',
    icon: ['fa', 'fa-pinterest'],
    color: '#BD091D',
    share: {
      desktop: 'https://pinterest.com/pin/create/button/?'
    },
    params: {
      url: 'url',
      description: 'description',
      image: 'media'
    }
  },
  reddit: {
    type: 'reddit',
    text: 'Reddit',
    ariaLabel: 'Share on Reddit',
    icon: ['fa', 'fa-reddit'],
    color: '#FF4006',
    share: {
      desktop: 'https://www.reddit.com/submit?'
    },
    params: {
      url: 'url',
      title: 'title'
    }
  },
  tumblr: {
    type: 'tumblr',
    text: 'Tumblr',
    ariaLabel: 'Share on Tumblr',
    icon: ['fa', 'fa-tumblr'],
    color: '#36465D',
    share: {
      desktop: 'https://tumblr.com/widgets/share/tool?'
    },
    params: {
      url: 'canonicalUrl',
      description: 'caption',
      tags: 'tags'
    }
  },
  // viber: {
  //   type: 'viber',
  //   text: 'Viber',
  //   ariaLabel: 'Share on Viber',
  //   icon: ['fa', 'fa-viber'],
  //   color: '#665ca7',
  //   share: {
  //     android: 'viber://forward?',
  //     ios: 'viber://forward?'
  //   },
  //   params: {
  //     description: 'text'
  //   },
  //   paramsFunc: linkInDescription
  // },
  vk: {
    type: 'vk',
    text: 'VKontakte',
    ariaLabel: 'Share on VKontakte',
    icon: ['fa', 'fa-vk'],
    color: '#4C75A3',
    share: {
      desktop: 'https://vk.com/share.php?'
    },
    params: {
      url: 'url'
    }
  },
  telegram: {
    type: 'telegram',
    text: 'Telegram',
    ariaLabel: 'Share on Telegram',
    icon: ['fa', 'fa-telegram'],
    color: '#0088cc',
    share: {
      desktop: 'https://t.me/share/url?'
    },
    params: {
      url: 'url',
      description: 'text'
    }
  },
  // messenger: {
  //   type: 'messenger',
  //   text: 'Messenger',
  //   ariaLabel: 'Share on Messenger',
  //   icon: ['fa', 'facebook-messenger'],
  //   color: '#0080FF',
  //   share: {
  //     android: 'fb-messenger://share/?',
  //     ios: 'fb-messenger://share/?'
  //   },
  //   params: {
  //     url: 'link'
  //   }
  // },
  whatsapp: {
    type: 'whatsapp',
    text: 'WhatsApp',
    ariaLabel: 'Share on WhatsApp',
    icon: ['fa', 'fa-whatsapp'],
    color: '#25D366',
    share: {
      desktop: 'https://web.whatsapp.com/send?',
      android: 'whatsapp://send?',
      ios: 'https://api.whatsapp.com/send?'
    },
    params: {
      description: 'text'
    },
    paramsFunc: linkInDescription
  },
  xing: {
    type: 'xing',
    text: 'Xing',
    ariaLabel: 'Share on Xing',
    icon: ['fa', 'fa-xing'],
    color: '#006567',
    share: {
      desktop: 'https://www.xing.com/spi/shares/new?'
    },
    params: {
      url: 'url'
    }
  },

  email: {
    type: 'email',
    text: 'Email',
    ariaLabel: 'Share link via email',
    icon: ['fa', 'fa-envelope'],
    color: '#FF961C',
    share: {
      desktop: 'mailto:?'
    },
    params: {
      title: 'subject',
      description: 'body'
    },
    paramsFunc: linkInDescription
  },
  // print: {
  //   type: 'print',
  //   text: 'Print',
  //   ariaLabel: 'Print page',
  //   icon: ['fa', 'print'],
  //   color: '#765AA2',
  //   func: printPage
  // },

};
