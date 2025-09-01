import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

export default function Services() {
  const packages = [
    {
      name: "Essential",
      price: "50,000 gil",
      features: [
        "Basic venue rental (3 hours)",
        "Standard decorations",
        "Basic refreshments",
        "Host services"
      ],
      popular: false
    },
    {
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
    },
    {
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
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main>
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h1 className="font-display text-5xl md:text-6xl font-bold text-foreground mb-6" data-testid="text-services-title">Our Services</h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-services-description">Comprehensive event and hospitality services tailored to make your gathering unforgettable.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
              <div className="card-hover bg-card border border-border rounded-xl p-8" data-testid="card-service-planning">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 gold-gradient rounded-lg flex items-center justify-center mr-4">
                    <i className="fas fa-calendar-check text-primary-foreground text-xl"></i>
                  </div>
                  <h3 className="font-display text-2xl font-semibold text-foreground">Event Planning</h3>
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">From intimate gatherings to grand celebrations, our experienced team handles every detail of your event planning needs.</p>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-center"><i className="fas fa-check text-primary mr-3"></i>Custom event design and theming</li>
                  <li className="flex items-center"><i className="fas fa-check text-primary mr-3"></i>Coordinated entertainment scheduling</li>
                  <li className="flex items-center"><i className="fas fa-check text-primary mr-3"></i>Guest management and invitations</li>
                  <li className="flex items-center"><i className="fas fa-check text-primary mr-3"></i>Photography and documentation</li>
                </ul>
              </div>

              <div className="card-hover bg-card border border-border rounded-xl p-8" data-testid="card-service-entertainment">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 gold-gradient rounded-lg flex items-center justify-center mr-4">
                    <i className="fas fa-music text-primary-foreground text-xl"></i>
                  </div>
                  <h3 className="font-display text-2xl font-semibold text-foreground">Entertainment</h3>
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">Professional performers and entertainment options to elevate your gathering with memorable experiences.</p>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-center"><i className="fas fa-check text-primary mr-3"></i>Live musical performances</li>
                  <li className="flex items-center"><i className="fas fa-check text-primary mr-3"></i>Dancing and choreography</li>
                  <li className="flex items-center"><i className="fas fa-check text-primary mr-3"></i>Interactive games and activities</li>
                  <li className="flex items-center"><i className="fas fa-check text-primary mr-3"></i>Themed entertainment packages</li>
                </ul>
              </div>

              <div className="card-hover bg-card border border-border rounded-xl p-8" data-testid="card-service-hospitality">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 gold-gradient rounded-lg flex items-center justify-center mr-4">
                    <i className="fas fa-concierge-bell text-primary-foreground text-xl"></i>
                  </div>
                  <h3 className="font-display text-2xl font-semibold text-foreground">Hospitality Services</h3>
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">Exceptional service and attention to detail ensuring every guest feels welcome and cared for.</p>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-center"><i className="fas fa-check text-primary mr-3"></i>Personal host assignments</li>
                  <li className="flex items-center"><i className="fas fa-check text-primary mr-3"></i>Welcome services and orientation</li>
                  <li className="flex items-center"><i className="fas fa-check text-primary mr-3"></i>Customized guest experiences</li>
                  <li className="flex items-center"><i className="fas fa-check text-primary mr-3"></i>24/7 support during events</li>
                </ul>
              </div>

              <div className="card-hover bg-card border border-border rounded-xl p-8" data-testid="card-service-corporate">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 gold-gradient rounded-lg flex items-center justify-center mr-4">
                    <i className="fas fa-handshake text-primary-foreground text-xl"></i>
                  </div>
                  <h3 className="font-display text-2xl font-semibold text-foreground">Corporate Events</h3>
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">Professional business gatherings, free company meetings, and corporate celebrations in an elegant setting.</p>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-center"><i className="fas fa-check text-primary mr-3"></i>Business meeting facilities</li>
                  <li className="flex items-center"><i className="fas fa-check text-primary mr-3"></i>Corporate celebration packages</li>
                  <li className="flex items-center"><i className="fas fa-check text-primary mr-3"></i>Team building activities</li>
                  <li className="flex items-center"><i className="fas fa-check text-primary mr-3"></i>Professional networking events</li>
                </ul>
              </div>
            </div>

            {/* Pricing Section */}
            <div className="text-center mb-12 mt-20">
              <h2 className="font-display text-4xl font-bold text-foreground mb-6" data-testid="text-packages-title">Service Packages</h2>
              <p className="text-xl text-muted-foreground">Choose the perfect package for your event needs</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {packages.map((pkg, index) => (
                <div 
                  key={pkg.name}
                  className={`bg-card rounded-xl p-8 text-center relative ${
                    pkg.popular ? 'border-2 border-primary' : 'border border-border'
                  }`}
                  data-testid={`card-package-${pkg.name.toLowerCase()}`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </div>
                  )}
                  <h3 className="font-display text-2xl font-semibold text-foreground mb-4">{pkg.name}</h3>
                  <div className="text-4xl font-bold text-primary mb-6" data-testid={`text-price-${pkg.name.toLowerCase()}`}>{pkg.price}</div>
                  <ul className="space-y-3 text-muted-foreground mb-8">
                    {pkg.features.map((feature, featureIndex) => (
                      <li key={featureIndex}>{feature}</li>
                    ))}
                  </ul>
                  <button 
                    className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                    data-testid={`button-select-${pkg.name.toLowerCase()}`}
                  >
                    Select Package
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
