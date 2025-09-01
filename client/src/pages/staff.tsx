import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { useState } from "react";
import type { StaffMember, AltCharacter } from "@shared/schema";

interface StaffMemberWithAlts extends StaffMember {
  altCharacters?: AltCharacter[];
}

export default function Staff() {
  const [showAlts, setShowAlts] = useState<Record<string, boolean>>({});

  const { data: staffMembers, isLoading } = useQuery<StaffMemberWithAlts[]>({
    queryKey: ['/api/staff'],
  });

  const toggleAlts = (staffId: string) => {
    setShowAlts(prev => ({ ...prev, [staffId]: !prev[staffId] }));
  };

  const managementStaff = staffMembers?.filter(staff => staff.department === 'management') || [];
  const entertainmentStaff = staffMembers?.filter(staff => staff.department === 'entertainment') || [];
  const serviceStaff = staffMembers?.filter(staff => staff.department === 'service') || [];

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading staff...</p>
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
              <h1 className="font-display text-5xl md:text-6xl font-bold text-foreground mb-6" data-testid="text-staff-title">Our Staff</h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto" data-testid="text-staff-description">Meet the dedicated team of professionals who make every event at The Golden Chocobo exceptional.</p>
            </div>

            {/* Management Team */}
            <div className="mb-20">
              <h2 className="font-display text-3xl font-semibold text-foreground mb-8 text-center" data-testid="text-management-title">Management Team</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {managementStaff.map((staff) => (
                  <div key={staff.id} className="card-hover bg-card border border-border rounded-xl p-6 text-center" data-testid={`card-staff-${staff.id}`}>
                    <img
                      src={staff.image || "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300"}
                      alt={`${staff.name} portrait`}
                      className="w-32 h-32 rounded-full mx-auto mb-6 object-cover border-4 border-primary"
                    />
                    <h3 className="font-display text-xl font-semibold text-foreground mb-2" data-testid={`text-staff-name-${staff.id}`}>{staff.name}</h3>
                    <p className="text-primary font-medium mb-3" data-testid={`text-staff-role-${staff.id}`}>{staff.role}</p>
                    {staff.bio && <p className="text-muted-foreground text-sm leading-relaxed mb-4">{staff.bio}</p>}

                    <div className="flex justify-center space-x-3 mb-4">
                      <button
                        className="text-primary hover:text-primary/80 transition-colors"
                        title="View Character Profile"
                        data-testid={`button-profile-${staff.id}`}
                      >
                        <i className="fas fa-user"></i>
                      </button>
                      <button
                        className="text-primary hover:text-primary/80 transition-colors"
                        title="Send Message"
                        data-testid={`button-message-${staff.id}`}
                      >
                        <i className="fas fa-envelope"></i>
                      </button>
                      <button
                        onClick={() => toggleAlts(staff.id)}
                        className="text-primary hover:text-primary/80 transition-colors"
                        title="View Alt Characters"
                        data-testid={`button-alts-${staff.id}`}
                      >
                        <i className="fas fa-users"></i>
                      </button>
                    </div>

                    {/* Alt Characters Display */}
                    {showAlts[staff.id] && staff.altCharacters && staff.altCharacters.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-border">
                        <h4 className="text-sm font-semibold mb-3">Alt Characters</h4>
                        <div className="grid grid-cols-2 gap-3">
                          {staff.altCharacters.map((alt) => (
                            <div key={alt.id} className="bg-muted rounded-lg p-3 text-left">
                              {alt.image && (
                                <img
                                  src={alt.image}
                                  alt={alt.name}
                                  className="w-12 h-12 rounded-full mb-2 object-cover"
                                />
                              )}
                              <p className="text-sm font-medium">{alt.name}</p>
                              {alt.race && <p className="text-xs text-muted-foreground">{alt.race}</p>}
                              {alt.server && <p className="text-xs text-muted-foreground">{alt.server}</p>}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* All Other Staff - No Categories */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...entertainmentStaff, ...serviceStaff].map((staff) => (
                <div key={staff.id} className="card-hover bg-card border border-border rounded-xl p-6 text-center" data-testid={`card-staff-${staff.id}`}>
                  <img
                    src={staff.image || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200"}
                    alt={`${staff.name} portrait`}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-2 border-primary"
                  />
                  <h4 className="font-display text-lg font-semibold text-foreground mb-1" data-testid={`text-staff-name-${staff.id}`}>{staff.name}</h4>
                  <p className="text-primary text-sm mb-2" data-testid={`text-staff-role-${staff.id}`}>{staff.role}</p>
                  {staff.bio && <p className="text-muted-foreground text-xs mb-3">{staff.bio}</p>}

                  <div className="flex justify-center space-x-2 mb-3">
                    <button
                      className="text-primary hover:text-primary/80 transition-colors"
                      title="View Character Profile"
                      data-testid={`button-profile-${staff.id}`}
                    >
                      <i className="fas fa-user"></i>
                    </button>
                    <button
                      onClick={() => toggleAlts(staff.id)}
                      className="text-primary hover:text-primary/80 transition-colors"
                      title="View Alt Characters"
                      data-testid={`button-alts-${staff.id}`}
                    >
                      <i className="fas fa-users"></i>
                    </button>
                  </div>

                  {/* Alt Characters Display */}
                  {showAlts[staff.id] && staff.altCharacters && staff.altCharacters.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-border">
                      <h4 className="text-sm font-semibold mb-3">Alt Characters</h4>
                      <div className="grid grid-cols-1 gap-2">
                        {staff.altCharacters.map((alt) => (
                          <div key={alt.id} className="bg-muted rounded-lg p-2 text-left">
                            {alt.image && (
                              <img
                                src={alt.image}
                                alt={alt.name}
                                className="w-8 h-8 rounded-full mb-1 object-cover"
                              />
                            )}
                            <p className="text-xs font-medium">{alt.name}</p>
                            {alt.race && <p className="text-xs text-muted-foreground">{alt.race}</p>}
                            {alt.server && <p className="text-xs text-muted-foreground">{alt.server}</p>}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
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