import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border py-12" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <i className="fas fa-feather-alt text-primary text-2xl"></i>
              <span className="font-accent text-xl font-semibold text-primary">The Golden Chocobo</span>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Experience the finest in FFXIV hospitality and entertainment. Creating magical moments in the world of Eorzea since 2021.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-primary/20 text-primary rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                data-testid="link-social-twitter"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a 
                href="https://discord.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-primary/20 text-primary rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                data-testid="link-social-discord"
              >
                <i className="fab fa-discord"></i>
              </a>
              <a 
                href="https://bsky.app" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 bg-primary/20 text-primary rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                data-testid="link-social-bluesky"
              >
                <i className="fas fa-cloud"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-footer-home">Home</Link></li>
              <li><Link href="/services" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-footer-services">Services</Link></li>
              <li><Link href="/staff" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-footer-staff">Staff</Link></li>
              <li><Link href="/menu" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-footer-menu">Menu</Link></li>
              <li><Link href="/about" className="text-muted-foreground hover:text-primary transition-colors" data-testid="link-footer-about">About</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-foreground mb-4">Contact Info</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-center" data-testid="text-server-info">
                <i className="fas fa-server mr-2 text-primary"></i>
                Crystal - Zalera
              </li>
              <li className="flex items-center" data-testid="text-location-info">
                <i className="fas fa-map-marker-alt mr-2 text-primary"></i>
                Mist, Ward 15, Plot 42
              </li>
              <li className="flex items-center" data-testid="text-hours-info">
                <i className="fas fa-clock mr-2 text-primary"></i>
                Fri-Sun 8PM-12AM EST
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; 2024 The Golden Chocobo. All rights reserved. | FFXIV content and materials are property of Square Enix.</p>
        </div>
      </div>
    </footer>
  );
}
