import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { useState } from "react";
import type { MenuItem } from "@shared/schema";

export default function Menu() {
  const [activeTab, setActiveTab] = useState('drinks');

  const { data: menuItems, isLoading } = useQuery<MenuItem[]>({
    queryKey: ['/api/menu'],
  });

  const drinkItems = menuItems?.filter(item => item.category === 'drinks') || [];
  const foodItems = menuItems?.filter(item => item.category === 'food') || [];
  const dessertItems = menuItems?.filter(item => item.category === 'desserts') || [];

  const tabs = [
    { id: 'drinks', label: 'Beverages', icon: 'fas fa-cocktail', items: drinkItems },
    { id: 'food', label: 'Food', icon: 'fas fa-utensils', items: foodItems },
    { id: 'desserts', label: 'Desserts', icon: 'fas fa-birthday-cake', items: dessertItems },
  ];

  const formatPrice = (price: number) => `${price.toLocaleString()} gil`;

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading menu...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <main>
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h1 className="font-display text-5xl md:text-6xl font-bold text-foreground mb-6" data-testid="text-menu-title">Menu</h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-menu-description">Exquisite cuisine and carefully crafted beverages inspired by the finest establishments across Eorzea.</p>
            </div>

            {/* Menu Navigation */}
            <div className="flex justify-center mb-12">
              <div className="bg-card border border-border rounded-lg p-2 flex space-x-2" data-testid="menu-tabs">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-6 py-3 rounded-md font-medium transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                    data-testid={`button-tab-${tab.id}`}
                  >
                    <i className={`${tab.icon} mr-2`}></i>{tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Menu Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {tabs
                .filter(tab => tab.id === activeTab)[0]
                ?.items.reduce((acc: MenuItem[][], item, index) => {
                  const groupIndex = Math.floor(index / Math.ceil(tabs.filter(tab => tab.id === activeTab)[0].items.length / 2));
                  if (!acc[groupIndex]) acc[groupIndex] = [];
                  acc[groupIndex].push(item);
                  return acc;
                }, [])
                .map((group, groupIndex) => (
                  <div key={groupIndex} className="bg-card border border-border rounded-xl p-8" data-testid={`menu-group-${activeTab}-${groupIndex}`}>
                    <h3 className="font-display text-2xl font-semibold text-foreground mb-6 flex items-center">
                      <i className={`${tabs.find(tab => tab.id === activeTab)?.icon} text-primary mr-3`}></i>
                      {activeTab === 'drinks' && groupIndex === 0 ? 'Signature Cocktails' : 
                       activeTab === 'drinks' && groupIndex === 1 ? 'Fine Wines & Spirits' :
                       activeTab === 'food' && groupIndex === 0 ? 'Appetizers' : 
                       activeTab === 'food' && groupIndex === 1 ? 'Main Courses' :
                       activeTab === 'desserts' && groupIndex === 0 ? 'Sweet Indulgences' : 'Signature Desserts'}
                    </h3>
                    <div className="space-y-6">
                      {group.map((item) => (
                        <div key={item.id} className="flex justify-between items-start" data-testid={`menu-item-${item.id}`}>
                          <div className="flex-1">
                            <h4 className="font-semibold text-foreground mb-2" data-testid={`text-item-name-${item.id}`}>{item.name}</h4>
                            <p className="text-muted-foreground text-sm mb-2" data-testid={`text-item-description-${item.id}`}>{item.description}</p>
                            {item.ingredients && item.ingredients.length > 0 && (
                              <p className="text-xs text-muted-foreground italic" data-testid={`text-item-ingredients-${item.id}`}>
                                {item.ingredients.join(', ')}
                              </p>
                            )}
                          </div>
                          <span className="text-primary font-semibold ml-4" data-testid={`text-item-price-${item.id}`}>
                            {formatPrice(item.price)}
                          </span>
                        </div>
                      ))}
                    </div>
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
