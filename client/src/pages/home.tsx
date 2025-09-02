import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { Link } from "wouter";
import EditableComponent from "@/components/page-builder/editable-component";
import type { Page } from "@/types";

export default function Home() {
  const { data: pageData } = useQuery<Page>({
    queryKey: ['/api/pages/home'],
  });

  // If page has editable content and components, render them
  if (pageData?.content?.components && pageData.content.components.length > 0) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <main>
          {pageData.content.components.map((component) => (
            <div key={component.id} className="component-wrapper">
              <EditableComponent
                component={component}
                onUpdate={() => {}} // Read-only on public page
                onDelete={() => {}}
                onMoveUp={() => {}}
                onMoveDown={() => {}}
              />
            </div>
          ))}
        </main>
        <Footer />
      </div>
    );
  }

  // Fallback to hardcoded content if no editable content exists
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1544148103-0773bf10d330?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')",
              filter: "brightness(0.4) sepia(0.3) hue-rotate(25deg)"
            }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70"></div>
          <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
            <h1 className="font-display text-5xl md:text-7xl font-bold mb-6" data-testid="text-hero-title">
              <span className="text-foreground">Welcome to</span><br />
              <span className="gold-gradient bg-clip-text text-transparent">The Golden Chocobo</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed" data-testid="text-hero-description">
              An elegant FFXIV venue where adventurers gather for exceptional experiences, fine dining, and unforgettable moments.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/services">
                <button className="bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold hover:bg-primary/90 transition-all duration-300 transform hover:scale-105" data-testid="button-book-event">
                  <i className="fas fa-calendar-alt mr-2"></i>Book Your Event
                </button>
              </Link>
              <Link href="/menu">
                <button className="border-2 border-primary text-primary px-8 py-4 rounded-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-300" data-testid="button-view-menu">
                  <i className="fas fa-utensils mr-2"></i>View Menu
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-card/30">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6" data-testid="text-features-title">Experience Excellence</h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-features-description">From intimate gatherings to grand celebrations, we create magical moments in the world of Eorzea.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="card-hover bg-card border border-border rounded-xl p-8 text-center" data-testid="card-feature-events">
                <div className="w-16 h-16 gold-gradient rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className="fas fa-crown text-2xl text-primary-foreground"></i>
                </div>
                <h3 className="font-display text-2xl font-semibold text-foreground mb-4">Premium Events</h3>
                <p className="text-muted-foreground leading-relaxed">Exclusive events hosted by experienced performers and entertainers from across the realm.</p>
              </div>
              
              <div className="card-hover bg-card border border-border rounded-xl p-8 text-center" data-testid="card-feature-cuisine">
                <div className="w-16 h-16 gold-gradient rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className="fas fa-cocktail text-2xl text-primary-foreground"></i>
                </div>
                <h3 className="font-display text-2xl font-semibold text-foreground mb-4">Exquisite Cuisine</h3>
                <p className="text-muted-foreground leading-relaxed">Carefully crafted dishes and beverages that transport you to the finest establishments of Eorzea.</p>
              </div>
              
              <div className="card-hover bg-card border border-border rounded-xl p-8 text-center" data-testid="card-feature-community">
                <div className="w-16 h-16 gold-gradient rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className="fas fa-users text-2xl text-primary-foreground"></i>
                </div>
                <h3 className="font-display text-2xl font-semibold text-foreground mb-4">Community</h3>
                <p className="text-muted-foreground leading-relaxed">Join a welcoming community of adventurers, artists, and socialites in a sophisticated atmosphere.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-center text-foreground mb-16" data-testid="text-testimonials-title">What Our Guests Say</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-card border border-border rounded-xl p-6" data-testid="card-testimonial-1">
                <div className="flex text-primary mb-4">
                  <i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i>
                </div>
                <p className="text-muted-foreground mb-6 italic">"An absolutely stunning venue with impeccable service. The atmosphere is magical and the staff truly care about creating memorable experiences."</p>
                <div className="flex items-center">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150" alt="Guest testimonial" className="w-12 h-12 rounded-full mr-4 object-cover" />
                  <div>
                    <p className="font-semibold text-foreground">Aetherian Nightshade</p>
                    <p className="text-sm text-muted-foreground">Ishgardian Noble</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-card border border-border rounded-xl p-6" data-testid="card-testimonial-2">
                <div className="flex text-primary mb-4">
                  <i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i>
                </div>
                <p className="text-muted-foreground mb-6 italic">"The Golden Chocobo sets the standard for elegance in FFXIV venues. Every detail is perfect, from the décor to the entertainment."</p>
                <div className="flex items-center">
                  <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150" alt="Guest testimonial" className="w-12 h-12 rounded-full mr-4 object-cover" />
                  <div>
                    <p className="font-semibold text-foreground">Luna Starwhisper</p>
                    <p className="text-sm text-muted-foreground">Gridanian Bard</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-card border border-border rounded-xl p-6 md:col-span-2 lg:col-span-1" data-testid="card-testimonial-3">
                <div className="flex text-primary mb-4">
                  <i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i><i className="fas fa-star"></i>
                </div>
                <p className="text-muted-foreground mb-6 italic">"I've hosted several events here and each one has exceeded expectations. The team's dedication to excellence is unmatched."</p>
                <div className="flex items-center">
                  <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150" alt="Guest testimonial" className="w-12 h-12 rounded-full mr-4 object-cover" />
                  <div>
                    <p className="font-semibold text-foreground">Pippin Goldleaf</p>
                    <p className="text-sm text-muted-foreground">Ul'dahn Merchant</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
