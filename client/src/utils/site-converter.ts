import type { PageContent, PageComponent } from "@/types";

// Convert navigation to editable components
export const convertNavigationToComponents = (): PageContent => {
  return {
    components: [
      {
        id: "site-logo",
        type: "text",
        content: {
          text: "The Golden Chocobo"
        },
        style: {
          fontSize: "xl",
          fontWeight: "semibold",
          color: "text-primary"
        }
      },
      {
        id: "nav-item-home",
        type: "button",
        content: {
          text: "Home",
          href: "/"
        }
      },
      {
        id: "nav-item-services",
        type: "button",
        content: {
          text: "Services",
          href: "/services"
        }
      },
      {
        id: "nav-item-staff",
        type: "button",
        content: {
          text: "Staff",
          href: "/staff"
        }
      },
      {
        id: "nav-item-menu",
        type: "button",
        content: {
          text: "Menu",
          href: "/menu"
        }
      },
      {
        id: "nav-item-about",
        type: "button",
        content: {
          text: "About",
          href: "/about"
        }
      }
    ]
  };
};

// Convert footer to editable components
export const convertFooterToComponents = (): PageContent => {
  return {
    components: [
      {
        id: "footer-title",
        type: "text",
        content: {
          text: "The Golden Chocobo"
        },
        style: {
          fontSize: "xl",
          fontWeight: "semibold",
          color: "text-primary"
        }
      },
      {
        id: "footer-description",
        type: "text",
        content: {
          text: "Experience the finest in FFXIV hospitality and entertainment. Creating magical moments in the world of Eorzea since 2021."
        },
        style: {
          color: "text-muted-foreground"
        }
      },
      {
        id: "footer-social-twitter",
        type: "button",
        content: {
          text: "Twitter",
          href: "https://twitter.com",
          icon: "fab fa-twitter"
        },
        style: {
          variant: "social"
        }
      },
      {
        id: "footer-social-discord",
        type: "button",
        content: {
          text: "Discord",
          href: "https://discord.com",
          icon: "fab fa-discord"
        },
        style: {
          variant: "social"
        }
      },
      {
        id: "footer-social-bluesky",
        type: "button",
        content: {
          text: "Bluesky",
          href: "https://bsky.app",
          icon: "fas fa-cloud"
        },
        style: {
          variant: "social"
        }
      },
      {
        id: "footer-server-info",
        type: "text",
        content: {
          text: "Crystal - Zalera",
          icon: "fas fa-server"
        }
      },
      {
        id: "footer-location-info",
        type: "text",
        content: {
          text: "Mist, Ward 15, Plot 42",
          icon: "fas fa-map-marker-alt"
        }
      },
      {
        id: "footer-hours-info",
        type: "text",
        content: {
          text: "Fri-Sun 8PM-12AM EST",
          icon: "fas fa-clock"
        }
      },
      {
        id: "footer-copyright",
        type: "text",
        content: {
          text: "© 2024 The Golden Chocobo. All rights reserved. | FFXIV content and materials are property of Square Enix."
        },
        style: {
          textAlign: "center",
          color: "text-muted-foreground"
        }
      }
    ]
  };
};