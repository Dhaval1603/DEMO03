import { ProjectType, ServiceOption } from '../types/requirement';

export interface ProjectTypeConfig {
  id: ProjectType;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
}

export const PROJECT_TYPES: ProjectTypeConfig[] = [
  {
    id: 'Residential',
    title: 'Residential',
    subtitle: 'Villas, Apartments, Bungalows',
    description: 'Private homes, penthouses, farmhouses, and custom residences designed for intimate living.',
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'Commercial',
    title: 'Commercial',
    subtitle: 'Showrooms, Mixed-Use, Plazas',
    description: 'Dynamic commercial destinations engineered for high footfall, presence, and client impact.',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'Office / Corporate',
    title: 'Office & Corporate',
    subtitle: 'Headquarters, Workspaces, Studios',
    description: 'Forward-thinking workplace environments that inspire productivity and brand identity.',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'Hospitality',
    title: 'Hospitality',
    subtitle: 'Hotels, Resorts, Cafés, Fine Dining',
    description: 'Immersive guest experiences blending curated atmospheres, comfort, and sensory delight.',
    imageUrl: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'Retail',
    title: 'Retail & Boutiques',
    subtitle: 'Fashion Stores, Flagships, Lounges',
    description: 'Experiential spaces tailored to showcase products with refined lighting and display craftsmanship.',
    imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'Institutional',
    title: 'Institutional / Educational',
    subtitle: 'Campuses, Academies, Cultural Centers',
    description: 'Civic, cultural, and educational institutions designed for enduring community resonance.',
    imageUrl: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'Healthcare',
    title: 'Healthcare & Wellness',
    subtitle: 'Clinics, Spas, Wellness Sanctuaries',
    description: 'Calming, biophilic clinical and therapeutic spaces promoting recovery and holistic well-being.',
    imageUrl: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'Industrial',
    title: 'Industrial',
    subtitle: 'Manufacturing, Warehouses, Labs',
    description: 'Optimized, robust structural envelopes balanced with functional zoning and modern aesthetics.',
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'Other',
    title: 'Other / Bespoke',
    subtitle: 'Custom Typologies & Mixed Developments',
    description: 'Unique or specialized projects that defy conventional architectural classifications.',
    imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
  },
];

export interface ServiceConfig {
  id: ServiceOption;
  name: string;
  category: 'single' | 'dual' | 'complete';
  badge?: string;
  description: string;
  tags: string[];
}

export const SERVICES: ServiceConfig[] = [
  {
    id: 'Architecture',
    name: 'Architecture',
    category: 'single',
    description: 'Structural planning, spatial volume, facade design, statutory compliance, and architectural drawings.',
    tags: ['Building Envelope', 'Elevations', 'Spatial Layouts', 'Engineering Coordination'],
  },
  {
    id: 'Interior Design',
    name: 'Interior Design',
    category: 'single',
    description: 'Complete interior architecture, custom joinery, material curation, lighting design, and soft furnishings.',
    tags: ['Space Planning', 'Bespoke Furniture', 'Lighting & Finishings', 'Material Palette'],
  },
  {
    id: 'Landscape Design',
    name: 'Landscape Design',
    category: 'single',
    description: 'Exterior site ecology, hardscaping, biophilic plant palettes, water features, and outdoor living sanctuaries.',
    tags: ['Courtyards & Terraces', 'Hardscape & Flora', 'Outdoor Lighting', 'Water Architecture'],
  },
  {
    id: 'Architecture + Interior',
    name: 'Architecture + Interior',
    category: 'dual',
    badge: 'Popular Synergy',
    description: 'Unified exterior and interior harmony ensuring the building envelope seamlessly communicates with the living spaces.',
    tags: ['End-to-End Cohesion', 'Seamless Volumetric Flow', 'Integrated Joinery'],
  },
  {
    id: 'Architecture + Landscape',
    name: 'Architecture + Landscape',
    category: 'dual',
    description: 'Harmonizing site contouring, garden expanses, outdoor pavilions, and structural elevations.',
    tags: ['Indoor-Outdoor Transition', 'Site Masterplanning', 'Integrated Hardscape'],
  },
  {
    id: 'Interior + Landscape',
    name: 'Interior + Landscape',
    category: 'dual',
    description: 'Enhancing living and entertaining spaces with courtyards, green pockets, terrace gardens, and natural light wells.',
    tags: ['Biophilic Interiors', 'Terrace Sanctuaries', 'Courtyard Connections'],
  },
  {
    id: 'Complete Design (Architecture + Interior + Landscape)',
    name: 'Complete Design Atelier Experience',
    category: 'complete',
    badge: 'Signature Studio Offering',
    description: 'Total holistic master design: structure, interiors, and surrounding landscape curated by one singular atelier vision.',
    tags: ['Turnkey Design Vision', 'Total Atelier Directorship', 'Maximum Design Unity'],
  },
];

export interface SpaceCategoryOption {
  id: string;
  label: string;
  popular?: boolean;
}

export const INTERIOR_SPACES: SpaceCategoryOption[] = [
  { id: 'Full Home / Complete Interior', label: 'Full Home / Complete Space', popular: true },
  { id: 'Living Room', label: 'Living Room', popular: true },
  { id: 'Master Bedroom Suite', label: 'Master Bedroom Suite', popular: true },
  { id: 'Gourmet Kitchen', label: 'Kitchen & Pantry', popular: true },
  { id: 'Dining Room', label: 'Dining Area', popular: true },
  { id: 'Secondary Bedrooms', label: 'Guest / Additional Bedrooms' },
  { id: 'Kids Room', label: 'Kids / Nursery Room' },
  { id: 'Luxury Bathrooms', label: 'Ensuite Bathrooms & Powder Rooms' },
  { id: 'Home Office / Library', label: 'Home Office / Study' },
  { id: 'TV / Media Lounge', label: 'Home Theater & Entertainment' },
  { id: 'Walk-in Wardrobe', label: 'Walk-in Closet & Dressing' },
  { id: 'Pooja / Prayer Room', label: 'Prayer / Meditation Room' },
  { id: 'Balcony / Veranda', label: 'Balcony & Covered Deck' },
  { id: 'Bar / Cigar Lounge', label: 'Bar & Entertainment Lounge' },
  { id: 'Gym / Wellness Area', label: 'Private Gym / Yoga Studio' },
  { id: 'Other Space', label: 'Custom / Other Area' },
];

export const ARCHITECTURE_SPACES: SpaceCategoryOption[] = [
  { id: 'Complete Building', label: 'Complete New Building / Structure', popular: true },
  { id: 'Luxury Residence / Villa', label: 'Private Residence / Villa', popular: true },
  { id: 'Farmhouse / Estate', label: 'Farmhouse / Country Estate', popular: true },
  { id: 'Corporate Office Building', label: 'Office / Corporate Complex' },
  { id: 'Commercial Retail Building', label: 'Commercial / Retail Complex' },
  { id: 'Boutique Hotel / Resort', label: 'Hospitality / Resort Complex' },
  { id: 'Industrial / Warehouse Facility', label: 'Factory / Industrial Facility' },
  { id: 'Institutional Campus', label: 'Institutional / School Building' },
  { id: 'Structural Renovation', label: 'Full Structural Renovation' },
  { id: 'Vertical / Floor Extension', label: 'Vertical / Floor Extension' },
  { id: 'Facade Redesign', label: 'Facade & Elevation Modernization' },
  { id: 'Bespoke Outbuilding / Pavilion', label: 'Clubhouse / Pavilion / Poolhouse' },
  { id: 'Other Architectural Typology', label: 'Other Architectural Scope' },
];

export const LANDSCAPE_SPACES: SpaceCategoryOption[] = [
  { id: 'Complete Site Landscape', label: 'Complete Property Landscape', popular: true },
  { id: 'Front Yard & Entry Arrival', label: 'Grand Entry & Front Landscape', popular: true },
  { id: 'Backyard Sanctuary', label: 'Private Backyard & Lawn', popular: true },
  { id: 'Terrace / Roof Garden', label: 'Terrace & Rooftop Garden', popular: true },
  { id: 'Central Courtyard', label: 'Internal Courtyard / Lightwell', popular: true },
  { id: 'Outdoor Deck & Pergola', label: 'Outdoor Dining & Pergola Deck' },
  { id: 'Swimming Pool & Deck', label: 'Swimming Pool & Sun Deck' },
  { id: 'Water Feature / Reflecting Pool', label: 'Water Cascade / Reflecting Pond' },
  { id: 'Outdoor Fire Pit Lounge', label: 'Fire Pit & Sunken Seating' },
  { id: 'Kitchen Garden / Orchard', label: 'Herb Garden / Organic Orchard' },
  { id: 'Driveway & Hardscape Paving', label: 'Automobile Arrival & Hardscape' },
  { id: 'Custom Landscape Concept', label: 'Other Landscape Element' },
];

export const SPACES_BY_CATEGORY = [
  {
    category: 'Interior Spaces & Rooms',
    spaces: INTERIOR_SPACES.map((s) => s.label),
  },
  {
    category: 'Architectural Volumes & Typology',
    spaces: ARCHITECTURE_SPACES.map((s) => s.label),
  },
  {
    category: 'Landscape & Exterior Realms',
    spaces: LANDSCAPE_SPACES.map((s) => s.label),
  },
];

export interface AtmosphereOption {
  id: string;
  name: string;
  descriptor: string;
  palette: string; // descriptive color & material words
  moodImage: string;
  isGuidance?: boolean;
}

export const ATMOSPHERE_OPTIONS: AtmosphereOption[] = [
  {
    id: 'Minimal',
    name: 'Minimalist & Restrained',
    descriptor: 'Pure lines, hidden joinery, uncluttered volumes, and calming spatial breathing room.',
    palette: 'Monochrome, micro-cement, honed stone, bleached oak',
    moodImage: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'Modern',
    name: 'Modern Architectural',
    descriptor: 'Sharp geometric forms, floor-to-ceiling glazing, seamless transitions, and honest material expression.',
    palette: 'Steel accents, concrete, dark charcoal, architectural glass',
    moodImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'Luxury',
    name: 'Refined Luxury',
    descriptor: 'Rich tactile textures, tailored brass details, dramatic bookmatched marble, and ambient cove lighting.',
    palette: 'Calacatta marble, brushed champagne bronze, rich walnut, velvet',
    moodImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'Contemporary',
    name: 'Warm Contemporary',
    descriptor: 'Comfortable organic curves, layered textiles, soft rounded edges, and welcoming natural ambient glow.',
    palette: 'Travertine, boucle fabric, sand-washed linen, matte timber',
    moodImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'Nature Inspired',
    name: 'Biophilic & Nature Inspired',
    descriptor: 'Verdant courtyards, living walls, porous breeze blocks, earth pigments, and sunlight choreography.',
    palette: 'Terracotta, exposed brick, raw teak, lush tropical greens',
    moodImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'Industrial',
    name: 'Industrial Chic',
    descriptor: 'Exposed structural trusses, raw concrete ceilings, blackened steel frames, and open loft heights.',
    palette: 'Weathered steel, gunmetal, reclaimed timber, fluted glass',
    moodImage: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'Classic',
    name: 'Classic & Timeless',
    descriptor: 'Symmetrical proportions, wainscoting, crown mouldings, herringbone timber, and quiet prestige.',
    palette: 'Herringbone oak, warm ivory, antique brass, muted sage',
    moodImage: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'Traditional',
    name: 'Vernacular & Traditional',
    descriptor: 'Handcrafted local stone, carved wood motifs, jali screens, pitched terracotta roofs, and heritage warmth.',
    palette: 'Laterite stone, teakwood, lime plaster, brass bell metal',
    moodImage: 'https://images.unsplash.com/photo-1540518614846-7ede433c4ef5?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'Tropical',
    name: 'Tropical Modernist',
    descriptor: 'Deep overhangs, louvers, reflecting pools, courtyard airflow, and seamless lush indoor-outdoor continuity.',
    palette: 'Teakwood, polished slate, outdoor palms, water accents',
    moodImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'Not Sure',
    name: "I'm not sure — I need studio guidance",
    descriptor: 'You have an open mind and would love the M M Design Atelier team to explore design directions tailored to your space.',
    palette: 'Curated upon consultation with our principal architects',
    moodImage: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=600&q=80',
    isGuidance: true,
  },
];

export const BUDGET_OPTIONS = [
  { id: 'Under ₹10 Lakh', label: 'Under ₹10 Lakh', subtitle: 'Focused rooms / single space makeover' },
  { id: '₹10–25 Lakh', label: '₹10 – 25 Lakh', subtitle: 'Moderate residence or targeted remodel' },
  { id: '₹25–50 Lakh', label: '₹25 – 50 Lakh', subtitle: 'Comprehensive premium apartment / floor' },
  { id: '₹50 Lakh–₹1 Crore', label: '₹50 Lakh – 1 Crore', subtitle: 'Luxury villa interior or bespoke building' },
  { id: '₹1 Crore+', label: '₹1 Crore & above', subtitle: 'High-end estate, large corporate or complete atelier master design' },
  { id: 'Prefer to discuss', label: 'Prefer to discuss during consultation', subtitle: 'Flexible based on studio proposal' },
  { id: 'Not decided', label: 'Not decided yet', subtitle: 'Seeking architectural guidance and cost estimates' },
];

export const TIMELINE_OPTIONS = [
  { id: 'Immediately', label: 'Immediately', subtitle: 'Ready to commence concept phase' },
  { id: 'Within 1 month', label: 'Within 1 month', subtitle: 'Finalizing land/possession shortly' },
  { id: '1–3 months', label: '1 – 3 months', subtitle: 'Planning ahead for upcoming construction' },
  { id: '3–6 months', label: '3 – 6 months', subtitle: 'Medium term schedule' },
  { id: '6–12 months', label: '6 – 12 months', subtitle: 'Long term development pipeline' },
  { id: 'Not decided', label: 'Not decided yet', subtitle: 'Flexible schedule' },
];
