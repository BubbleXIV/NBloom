import type { PageContent, PageComponent } from "@/types";

// Convert existing hardcoded pages to editable components
export const convertHomePageToComponents = (): PageContent => {
  return {
    components: [
      // Hero Section
      {
        id: "hero-section",
        type: "hero",
        content: {
          title: "Welcome to\nThe Golden Chocobo",
          subtitle: "An elegant FFXIV venue where adventurers gather for exceptional experiences, fine dining, and unforgettable moments.",
          backgroundImage: "https://images.unsplash.com/photo-1544148103-0773bf10d330?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080",
          buttons: [
            { text: "Book Your Event", href: "/services" },
            { text: "View Menu", href: "/menu" }
          ]
        },
        style: {
          minHeight: "100vh"
        }
      },
      // Features Section
      {
        id: "features-section",
        type: "features",
        content: {
          title: "Experience Excellence",
          subtitle: "From intimate gatherings to grand celebrations, we create magical moments in the world of Eorzea.",
          features: [
            {
              icon: "fas fa-crown",
              title: "Premium Events",
              description: "Exclusive events hosted by experienced performers and entertainers from across the realm."
            },
            {
              icon: "fas fa-cocktail",
              title: "Exquisite Cuisine",
              description: "Carefully crafted dishes and beverages that transport you to the finest establishments of Eorzea."
            },
            {
              icon: "fas fa-users",
              title: "Community",
              description: "Join a welcoming community of adventurers, artists, and socialites in a sophisticated atmosphere."
            }
          ]
        },
        style: {
          backgroundColor: "bg-card/30",
          padding: "80px 0"
        }
      },
      // Testimonials Section
      {
        id: "testimonials-section",
        type: "testimonials",
        content: {
          title: "What Our Guests Say",
          testimonials: [
            {
              rating: 5,
              text: "An absolutely stunning venue with impeccable service. The atmosphere is magical and the staff truly care about creating memorable experiences.",
              author: "Aetherian Nightshade",
              role: "Ishgardian Noble",
              image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150"
            },
            {
              rating: 5,
              text: "The Golden Chocobo sets the standard for elegance in FFXIV venues. Every detail is perfect, from the décor to the entertainment.",
              author: "Luna Starwhisper",
              role: "Gridanian Bard",
              image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150"
            },
            {
              rating: 5,
              text: "I've hosted several events here and each one has exceeded expectations. The team's dedication to excellence is unmatched.",
              author: "Pippin Goldleaf",
              role: "Ul'dahn Merchant",
              image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150"
            }
          ]
        },
        style: {
          padding: "80px 0"
        }
      }
    ]
  };
};

export const convertServicesPageToComponents = (): PageContent => {
  return {
    components: [
      {
        id: "services-title",
        type: "heading",
        content: {
          text: "Our Services",
          level: 1
        },
        style: {
          textAlign: "center",
          color: "text-foreground",
          marginBottom: "24px"
        }
      },
      {
        id: "services-subtitle",
        type: "text",
        content: {
          text: "Comprehensive event and hospitality services tailored to make your gathering unforgettable."
        },
        style: {
          textAlign: "center",
          color: "text-muted-foreground",
          fontSize: "xl",
          marginBottom: "80px"
        }
      },
      {
        id: "service-event-planning",
        type: "service-card",
        content: {
          icon: "fas fa-calendar-check",
          title: "Event Planning",
          description: "From intimate gatherings to grand celebrations, our experienced team handles every detail of your event planning needs.",
          features: [
            "Custom event design and theming",
            "Coordinated entertainment scheduling",
            "Guest management and invitations",
            "Photography and documentation"
          ]
        }
      },
      {
        id: "service-entertainment",
        type: "service-card",
        content: {
          icon: "fas fa-music",
          title: "Entertainment",
          description: "Professional performers and entertainment options to elevate your gathering with memorable experiences.",
          features: [
            "Live musical performances",
            "Dancing and choreography",
            "Interactive games and activities",
            "Themed entertainment packages"
          ]
        }
      },
      {
        id: "service-hospitality",
        type: "service-card",
        content: {
          icon: "fas fa-concierge-bell",
          title: "Hospitality Services",
          description: "Exceptional service and attention to detail ensuring every guest feels welcome and cared for.",
          features: [
            "Personal host assignments",
            "Welcome services and orientation",
            "Customized guest experiences",
            "24/7 support during events"
          ]
        }
      },
      {
        id: "service-corporate",
        type: "service-card",
        content: {
          icon: "fas fa-handshake",
          title: "Corporate Events",
          description: "Professional business gatherings, free company meetings, and corporate celebrations in an elegant setting.",
          features: [
            "Business meeting facilities",
            "Corporate celebration packages",
            "Team building activities",
            "Professional networking events"
          ]
        }
      },
      {
        id: "packages-title",
        type: "heading",
        content: {
          text: "Service Packages",
          level: 2
        },
        style: {
          textAlign: "center",
          marginTop: "80px",
          marginBottom: "24px"
        }
      },
      {
        id: "packages-subtitle",
        type: "text",
        content: {
          text: "Choose the perfect package for your event needs"
        },
        style: {
          textAlign: "center",
          color: "text-muted-foreground",
          fontSize: "xl",
          marginBottom: "48px"
        }
      },
      {
        id: "package-essential",
        type: "pricing-card",
        content: {
          name: "Essential",
          price: "50,000 gil",
          features: [
            "Basic venue rental (3 hours)",
            "Standard decorations",
            "Basic refreshments",
            "Host services"
          ],
          popular: false
        }
      },
      {
        id: "package-premium",
        type: "pricing-card",
        content: {
          name: "Premium",
          price: "120,000 gil",
          features: [
            "Extended venue rental (6 hours)",
            "Custom decorations",
            "Full menu service",
            "Entertainment coordination",
            "Professional photography"
          ],
          popular: true
        }
      },
      {
        id: "package-luxury",
        type: "pricing-card",
        content: {
          name: "Luxury",
          price: "300,000 gil",
          features: [
            "All-day venue access",
            "Bespoke event design",
            "Premium menu & drinks",
            "Full entertainment program",
            "Dedicated event manager",
            "Complete documentation"
          ],
          popular: false
        }
      }
    ]
  };
};

export const convertMenuPageToComponents = (): PageContent => {
  return {
    components: [
      {
        id: "menu-title",
        type: "heading",
        content: {
          text: "Our Menu",
          level: 1
        },
        style: {
          textAlign: "center",
          marginBottom: "24px"
        }
      },
      {
        id: "menu-subtitle",
        type: "text",
        content: {
          text: "Exquisite dishes and beverages crafted for the discerning adventurer"
        },
        style: {
          textAlign: "center",
          color: "text-muted-foreground",
          fontSize: "xl",
          marginBottom: "80px"
        }
      },
      {
        id: "menu-note",
        type: "text",
        content: {
          text: "Menu items will be managed through the Menu Management section. This page serves as the display for your curated menu offerings."
        },
        style: {
          textAlign: "center",
          color: "text-muted-foreground",
          fontStyle: "italic"
        }
      }
    ]
  };
};

export const convertStaffPageToComponents = (): PageContent => {
  return {
    components: [
      {
        id: "staff-title",
        type: "heading",
        content: {
          text: "Our Staff",
          level: 1
        },
        style: {
          textAlign: "center",
          marginBottom: "24px"
        }
      },
      {
        id: "staff-subtitle",
        type: "text",
        content: {
          text: "Meet our dedicated team of professionals who make every event exceptional"
        },
        style: {
          textAlign: "center",
          color: "text-muted-foreground",
          fontSize: "xl",
          marginBottom: "80px"
        }
      },
      {
        id: "staff-note",
        type: "text",
        content: {
          text: "Staff members will be managed through the Staff Management section. This page serves as the display for your team profiles."
        },
        style: {
          textAlign: "center",
          color: "text-muted-foreground",
          fontStyle: "italic"
        }
      }
    ]
  };
};

export const convertAboutPageToComponents = (): PageContent => {
  return {
    components: [
      {
        id: "about-hero",
        type: "hero",
        content: {
          title: "About The Golden Chocobo",
          subtitle: "Learn more about our venue and what makes us special",
          backgroundImage: "",
          buttons: []
        },
        style: {
          minHeight: "50vh"
        }
      },
      {
        id: "about-content-1",
        type: "text",
        content: {
          text: "Welcome to The Golden Chocobo, a premier FFXIV venue dedicated to creating exceptional experiences for adventurers from across all worlds and data centers."
        },
        style: {
          fontSize: "lg",
          marginBottom: "32px"
        }
      },
      {
        id: "about-content-2",
        type: "text",
        content: {
          text: "Our venue specializes in hosting elegant events, from intimate gatherings to grand celebrations. We pride ourselves on attention to detail, professional service, and creating memorable moments that our guests will treasure."
        },
        style: {
          fontSize: "lg",
          marginBottom: "32px"
        }
      },
      {
        id: "about-content-3",
        type: "text",
        content: {
          text: "Whether you're planning a wedding, corporate event, or social gathering, our experienced team is here to make your vision a reality."
        },
        style: {
          fontSize: "lg"
        }
      }
    ]
  };
};