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
        id: "services-hero",
        type: "hero",
        content: {
          title: "Our Services",
          subtitle: "Comprehensive event and hospitality services tailored to make your gathering unforgettable.",
          backgroundImage: "",
          buttons: []
        },
        style: {
          minHeight: "50vh",
          backgroundColor: "linear-gradient(135deg, #0A0A0A 0%, #1A1A1A 50%, #0F0F0F 100%)"
        }
      },
      {
        id: "services-grid",
        type: "grid",
        content: {
          columns: 2,
          gap: "32px"
        },
        children: [
          {
            id: "service-1",
            type: "text",
            content: {
              text: "**Event Planning**\n\nFrom intimate gatherings to grand celebrations, our experienced team handles every detail of your event planning needs.\n\n• Custom event design and theming\n• Coordinated entertainment scheduling\n• Guest management and invitations\n• Photography and documentation"
            }
          },
          {
            id: "service-2",
            type: "text",
            content: {
              text: "**Entertainment**\n\nProfessional performers and entertainment options to elevate your gathering with memorable experiences.\n\n• Live musical performances\n• Dancing and choreography\n• Interactive games and activities\n• Themed entertainment packages"
            }
          },
          {
            id: "service-3",
            type: "text",
            content: {
              text: "**Hospitality Services**\n\nExceptional service and attention to detail ensuring every guest feels welcome and cared for.\n\n• Personal host assignments\n• Welcome services and orientation\n• Customized guest experiences\n• 24/7 support during events"
            }
          },
          {
            id: "service-4",
            type: "text",
            content: {
              text: "**Corporate Events**\n\nProfessional business gatherings, free company meetings, and corporate celebrations in an elegant setting.\n\n• Business meeting facilities\n• Corporate celebration packages\n• Team building activities\n• Professional networking events"
            }
          }
        ]
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
        }
      },
      {
        id: "about-content",
        type: "text",
        content: {
          text: "Welcome to The Golden Chocobo, an premier FFXIV venue dedicated to creating exceptional experiences for adventurers from across all worlds and data centers.\n\nOur venue specializes in hosting elegant events, from intimate gatherings to grand celebrations. We pride ourselves on attention to detail, professional service, and creating memorable moments that our guests will treasure.\n\nWhether you're planning a wedding, corporate event, or social gathering, our experienced team is here to make your vision a reality."
        }
      }
    ]
  };
};