import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

export default function About() {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main>
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h1 className="font-display text-5xl md:text-6xl font-bold text-foreground mb-6" data-testid="text-about-title">About Us</h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-about-description">Discover the story behind The Golden Chocobo and our commitment to creating extraordinary experiences in the world of FFXIV.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
                  alt="Elegant venue interior with golden lighting" 
                  className="rounded-xl shadow-2xl w-full" 
                  data-testid="img-venue-interior"
                />
              </div>
              <div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6" data-testid="text-story-title">Our Story</h2>
                <p className="text-muted-foreground mb-6 leading-relaxed" data-testid="text-story-paragraph-1">
                  Founded in the heart of Eorzea by a group of passionate adventurers, The Golden Chocobo began as a dream to create a space where the realm's most discerning individuals could gather, celebrate, and forge lasting connections.
                </p>
                <p className="text-muted-foreground mb-6 leading-relaxed" data-testid="text-story-paragraph-2">
                  What started as a small gathering place has evolved into one of the most prestigious venues in FFXIV, known for our attention to detail, exceptional service, and commitment to creating magical experiences that our guests remember long after the evening ends.
                </p>
                <p className="text-muted-foreground leading-relaxed" data-testid="text-story-paragraph-3">
                  Every aspect of The Golden Chocobo reflects our dedication to excellence, from our carefully curated menu and entertainment to our elegant décor and professional staff.
                </p>
              </div>
            </div>

            {/* Mission & Values */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
              <div className="text-center" data-testid="card-mission">
                <div className="w-16 h-16 gold-gradient rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className="fas fa-heart text-2xl text-primary-foreground"></i>
                </div>
                <h3 className="font-display text-2xl font-semibold text-foreground mb-4">Our Mission</h3>
                <p className="text-muted-foreground leading-relaxed">To create exceptional experiences that bring the FFXIV community together through outstanding hospitality, entertainment, and cuisine.</p>
              </div>

              <div className="text-center" data-testid="card-values">
                <div className="w-16 h-16 gold-gradient rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className="fas fa-star text-2xl text-primary-foreground"></i>
                </div>
                <h3 className="font-display text-2xl font-semibold text-foreground mb-4">Our Values</h3>
                <p className="text-muted-foreground leading-relaxed">Excellence, authenticity, and community are at the core of everything we do. We believe every guest deserves a memorable experience.</p>
              </div>

              <div className="text-center" data-testid="card-vision">
                <div className="w-16 h-16 gold-gradient rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className="fas fa-compass text-2xl text-primary-foreground"></i>
                </div>
                <h3 className="font-display text-2xl font-semibold text-foreground mb-4">Our Vision</h3>
                <p className="text-muted-foreground leading-relaxed">To be the premier destination for sophisticated entertainment and dining experiences within the FFXIV community.</p>
              </div>
            </div>

            {/* Location & Contact */}
            <div className="bg-card border border-border rounded-xl p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-display text-2xl font-semibold text-foreground mb-6">Visit Us</h3>
                  <div className="space-y-4">
                    <div className="flex items-center" data-testid="info-server">
                      <i className="fas fa-map-marker-alt text-primary mr-3"></i>
                      <div>
                        <p className="font-semibold text-foreground">Server: Crystal - Zalera</p>
                        <p className="text-muted-foreground">Mist, Ward 15, Plot 42</p>
                      </div>
                    </div>
                    <div className="flex items-center" data-testid="info-hours">
                      <i className="fas fa-clock text-primary mr-3"></i>
                      <div>
                        <p className="font-semibold text-foreground">Operating Hours</p>
                        <p className="text-muted-foreground">Friday - Sunday: 8:00 PM - 12:00 AM EST</p>
                      </div>
                    </div>
                    <div className="flex items-center" data-testid="info-reservations">
                      <i className="fas fa-phone text-primary mr-3"></i>
                      <div>
                        <p className="font-semibold text-foreground">Reservations</p>
                        <p className="text-muted-foreground">Contact us in-game or via Discord</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-display text-2xl font-semibold text-foreground mb-6">Recognition</h3>
                  <div className="space-y-4">
                    <div className="flex items-center" data-testid="award-1">
                      <i className="fas fa-trophy text-primary mr-3"></i>
                      <p className="text-muted-foreground">"Best Venue Experience 2023" - FFXIV Community Awards</p>
                    </div>
                    <div className="flex items-center" data-testid="award-2">
                      <i className="fas fa-medal text-primary mr-3"></i>
                      <p className="text-muted-foreground">"Outstanding Hospitality" - Crystal DC Venue Reviews</p>
                    </div>
                    <div className="flex items-center" data-testid="award-3">
                      <i className="fas fa-certificate text-primary mr-3"></i>
                      <p className="text-muted-foreground">Featured in "Top 10 Must-Visit FFXIV Venues"</p>
                    </div>
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
