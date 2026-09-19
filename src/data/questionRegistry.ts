import { QuestionConfig, EngineContext } from '../types/questionEngine';

export const QUESTION_REGISTRY: QuestionConfig[] = [
  // ==========================================
  // SECTION 1: RESIDENTIAL ARCHITECTURE
  // ==========================================
  {
    id: 'res_arch_purpose',
    section: 'Project Purpose & Vision',
    category: 'architecture',
    question: 'What is the primary purpose of your residential project?',
    description: 'Select the primary structural intent of this architectural engagement.',
    type: 'single_select',
    required: true,
    service: ['Architecture', 'Architecture + Interior', 'Architecture + Landscape', 'Complete Design'],
    projectType: ['Residential'],
    helpText:
      'Understanding whether your project is a ground-up build or an adaptation helps our architects allocate the right structural engineering, municipal sanctioning, and conceptual timelines.',
    options: [
      { id: 'New Home', label: 'New Home', description: 'Ground-up construction on a vacant plot or land parcel' },
      { id: 'Renovation', label: 'Renovation', description: 'Reconfiguring or modernizing an existing residence' },
      { id: 'Extension', label: 'Extension / Addition', description: 'Adding floors, a new wing, or an outhouse pavilion' },
      { id: 'Redevelopment', label: 'Redevelopment', description: 'Demolishing an older structure to build anew' },
      { id: 'Other', label: 'Other / Bespoke Intent', description: 'Specialized residential program' },
    ],
    allowCustomInput: true,
    customInputPlaceholder: 'Specify custom residential purpose...',
    conditionalRules: (ctx: EngineContext) => ctx.hasArchitecture && ctx.projectType === 'Residential',
  },
  {
    id: 'res_arch_property_type',
    section: 'Project Purpose & Vision',
    category: 'architecture',
    question: 'What type of residential property is this?',
    description: 'Helps define structural setbacks, floor plate scale, and privacy orientation.',
    type: 'single_select',
    required: true,
    service: ['Architecture', 'Architecture + Interior', 'Architecture + Landscape', 'Complete Design'],
    projectType: ['Residential'],
    helpText:
      'The physical typology determines setback requirements, structural grid design, vertical access, and spatial privacy zoning.',
    options: [
      { id: 'Plot', label: 'Independent Plot / Land', description: 'Open parcel ready for custom architectural planning' },
      { id: 'Existing House', label: 'Existing House / Kothi', description: 'Existing independent residential structure' },
      { id: 'Bungalow', label: 'Bungalow', description: 'Standalone single or double-storey home' },
      { id: 'Villa', label: 'Private Villa', description: 'Gated or freestanding luxury villa residence' },
      { id: 'Apartment', label: 'Apartment / Penthouse', description: 'Multi-unit high-rise residence' },
      { id: 'Row House', label: 'Row House / Townhouse', description: 'Shared boundary residential unit' },
      { id: 'Farmhouse', label: 'Farmhouse / Estate', description: 'Sprawling countryside retreat or acreage' },
      { id: 'Other', label: 'Other Typology', description: 'Custom residential setup' },
    ],
    allowCustomInput: true,
    customInputPlaceholder: 'Specify property type...',
    conditionalRules: (ctx: EngineContext) => ctx.hasArchitecture && ctx.projectType === 'Residential',
  },
  {
    id: 'res_arch_scope',
    section: 'Architectural Scope of Work',
    category: 'architecture',
    question: 'What specific architectural deliverables are you looking for?',
    description: 'Select all disciplines you would like our atelier team to oversee.',
    type: 'multi_select',
    required: true,
    multipleSelection: true,
    service: ['Architecture', 'Architecture + Interior', 'Architecture + Landscape', 'Complete Design'],
    projectType: ['Residential'],
    helpText:
      'This clarifies the deliverables needed—whether you require full municipal approvals, elevations, structural coordination, or turnkey architectural directorship.',
    options: [
      { id: 'Complete Architecture', label: 'Complete Architectural Design', description: 'Turnkey conceptual to execution drawings' },
      { id: 'Planning', label: 'Space Planning & Layouts', description: 'Floor plans, volumetric circulation, and room sizing' },
      { id: 'Elevation', label: 'Elevation & Façade Design', description: 'Exterior aesthetic, 3D visualization, and materiality' },
      { id: 'Renovation', label: 'Renovation & Reconfiguration', description: 'Modifying walls, openings, and structural flow' },
      { id: 'Extension', label: 'Structural Extension Planning', description: 'Vertical or horizontal floor expansion' },
      { id: 'Complete Design', label: 'Complete Design Consultation', description: 'Holistic architectural guidance' },
      { id: 'Not Sure', label: "I'm not sure / Need Guidance", description: 'Let our team recommend the appropriate scope', isGuidance: true },
    ],
    conditionalRules: (ctx: EngineContext) => ctx.hasArchitecture && ctx.projectType === 'Residential',
  },
  {
    id: 'res_arch_floors',
    section: 'Volumetric & Spatial Scale',
    category: 'architecture',
    question: 'How many floors / levels do you plan to build?',
    description: 'Vertical height and volume allocation.',
    type: 'single_select',
    required: false,
    service: ['Architecture'],
    projectType: ['Residential'],
    helpText:
      'Floor count informs vertical circulation, stair/elevator placement, structural column sizing, and natural ventilation stacks.',
    options: [
      { id: 'Single Level', label: 'Ground Floor only (Single Level)', description: 'Single-storey private residence' },
      { id: 'G + 1', label: 'G + 1 (2 Floors)', description: 'Classic duplex living arrangement' },
      { id: 'G + 2', label: 'G + 2 (3 Floors)', description: 'Generous multi-level family home' },
      { id: 'G + 3+', label: 'G + 3 or more (4+ Floors)', description: 'Multi-generational or stilt + multi-level' },
      { id: 'Basement + Levels', label: 'Basement + Multiple Levels', description: 'Including subterranean parking or home cinema' },
      { id: 'Not Sure', label: "I'm not sure / Need Guidance", description: 'To be determined based on FAR and family needs', isGuidance: true },
    ],
    conditionalRules: (ctx: EngineContext) => ctx.hasArchitecture && ctx.projectType === 'Residential',
  },
  {
    id: 'res_arch_family_members',
    section: 'Volumetric & Spatial Scale',
    category: 'architecture',
    question: 'How many family members will reside in the home?',
    description: 'Helps calculate spatial zoning, communal zones, and private suites.',
    type: 'single_select',
    required: false,
    service: ['Architecture'],
    projectType: ['Residential'],
    helpText:
      'Knowing household dynamics helps us plan multi-generational comfort, private family zones, and guest entertaining capacity.',
    options: [
      { id: '2 to 3 Members', label: '2 to 3 Members', description: 'Couple or small family' },
      { id: '4 to 5 Members', label: '4 to 5 Members', description: 'Nuclear family with children' },
      { id: '6 to 8 Members', label: '6 to 8 Members', description: 'Joint / multi-generational family' },
      { id: '8+ Members', label: '8+ Members', description: 'Large extended family estate' },
      { id: 'Vacation Home', label: 'Secondary / Vacation Home', description: 'Occasional family gatherings & retreats' },
    ],
    conditionalRules: (ctx: EngineContext) => ctx.hasArchitecture && ctx.projectType === 'Residential',
  },
  {
    id: 'res_arch_bedrooms',
    section: 'Volumetric & Spatial Scale',
    category: 'architecture',
    question: 'How many bedrooms are required?',
    type: 'single_select',
    required: false,
    options: [
      { id: '2 BHK', label: '2 Bedrooms' },
      { id: '3 BHK', label: '3 Bedrooms' },
      { id: '4 BHK', label: '4 Bedrooms' },
      { id: '5 BHK', label: '5 Bedrooms' },
      { id: '6+ BHK', label: '6+ Bedrooms (Luxury Estate)' },
      { id: 'Not Sure', label: "I'm not sure / Need Guidance", isGuidance: true },
    ],
    conditionalRules: (ctx: EngineContext) => ctx.hasArchitecture && ctx.projectType === 'Residential',
  },
  {
    id: 'res_arch_bathrooms',
    section: 'Volumetric & Spatial Scale',
    category: 'architecture',
    question: 'Number of bathrooms and powder rooms required?',
    type: 'single_select',
    required: false,
    options: [
      { id: '2-3', label: '2 to 3 Bathrooms' },
      { id: '4-5', label: '4 to 5 Bathrooms (Ensuite + Powder Room)' },
      { id: '6+', label: '6+ Bathrooms (All Ensuite + Powder + Staff)' },
      { id: 'Not Sure', label: 'Studio to recommend optimal layout', isGuidance: true },
    ],
    conditionalRules: (ctx: EngineContext) => ctx.hasArchitecture && ctx.projectType === 'Residential',
  },
  {
    id: 'res_arch_parking',
    section: 'Site Access & Logistics',
    category: 'architecture',
    question: 'What are your vehicle parking requirements?',
    description: 'Vehicular access, turning radius, and covered parking provisions.',
    type: 'single_select',
    required: false,
    helpText:
      'Driveway ingress, covered stilt parking, EV charging provisions, and vehicular turning radiuses must be planned in the site layout from day one.',
    options: [
      { id: '1 Car', label: '1 Car (Covered)' },
      { id: '2 Cars', label: '2 Cars (Covered Driveway / Stilt)' },
      { id: '3 to 4 Cars', label: '3 to 4 Cars (Garage / Stilt)' },
      { id: '5+ Cars', label: '5+ Cars (Large Estate / Collectors Garage)' },
      { id: '2-Wheelers only', label: '2-Wheelers & Bicycles only' },
      { id: 'Not Sure', label: "I'm not sure / Need Guidance", isGuidance: true },
    ],
    conditionalRules: (ctx: EngineContext) => ctx.hasArchitecture && ctx.projectType === 'Residential',
  },
  {
    id: 'res_arch_outdoor_elements',
    section: 'Outdoor & Structural Extensions',
    category: 'architecture',
    question: 'Which outdoor and semi-covered spaces would you like to feature?',
    description: 'Select elements that bridge the architecture to the outdoors.',
    type: 'multi_select',
    multipleSelection: true,
    options: [
      { id: 'Balcony / Terrace', label: 'Balconies & Deep Covered Verandas', description: 'Shaded outdoor extensions' },
      { id: 'Terrace Deck', label: 'Private Rooftop Terrace Deck', description: 'Sunset lounge or stargazing pavilion' },
      { id: 'Garden', label: 'Ground-level Garden / Lawn', description: 'Lush private retreat' },
      { id: 'Courtyard', label: 'Central Courtyard / Light Well', description: 'Internal open-to-sky living heart' },
      { id: 'Grand Entrance', label: 'Double-Height Portico / Grand Porch', description: 'Sculptural entrance drop-off' },
      { id: 'Swimming Pool', label: 'Swimming Pool / Plunge Pool', description: 'Integrated aquatic relaxation' },
      { id: 'Not Sure', label: "I'm not sure / Studio to propose", isGuidance: true },
    ],
    conditionalRules: (ctx: EngineContext) => ctx.hasArchitecture && ctx.projectType === 'Residential',
  },
  {
    id: 'res_arch_vastu',
    section: 'Orientation & Environmental Alignment',
    category: 'architecture',
    question: 'Do you have Vastu Shastra / orientation requirements?',
    description: 'Harmonizing orientations with directional principles.',
    type: 'single_select',
    required: false,
    helpText:
      'If Vastu compliance is desired, our architects incorporate directional alignments (e.g. Northeast water/entrance, Southeast kitchen) right from initial site zoning without compromising modern aesthetics.',
    options: [
      { id: 'Strict Vastu', label: 'Strict Vastu Compliance', description: 'All major room placements, doors & water bodies must adhere' },
      { id: 'Practical Vastu', label: 'Moderate / Practical Vastu', description: 'Key directions like entrance & kitchen prioritized, balanced with design' },
      { id: 'Not Required', label: 'Not Required', description: 'Purely focused on natural daylight, cross-ventilation & modern lifestyle' },
      { id: 'Need Guidance', label: "I'm not sure / Studio Guidance", description: 'Let our architects explain the trade-offs during consultation', isGuidance: true },
    ],
    conditionalRules: (ctx: EngineContext) => ctx.hasArchitecture && ctx.projectType === 'Residential',
  },
  {
    id: 'res_arch_special_features',
    section: 'Special Functional Priorities',
    category: 'architecture',
    question: 'Any special lifestyle or architectural priorities?',
    description: 'Select any unique amenities to be structurally designed.',
    type: 'multi_select',
    multipleSelection: true,
    options: [
      { id: 'Lift Provision', label: 'Home Elevator / Lift Provision' },
      { id: 'Double Height Living', label: 'Double-Height Living Volume' },
      { id: 'Elderly Accessible', label: 'Elder-Friendly Ground Floor Suite' },
      { id: 'Home Office', label: 'Private Home Office / Study' },
      { id: 'Home Theater', label: 'Private Home Theater / AV Suite' },
      { id: 'Staff Quarters', label: 'Domestic Staff Quarters & Separate Utility' },
      { id: 'Sustainable Solar', label: 'Solar Power & Rainwater Harvesting' },
    ],
    conditionalRules: (ctx: EngineContext) => ctx.hasArchitecture && ctx.projectType === 'Residential',
  },

  // ==========================================
  // SECTION 2: COMMERCIAL ARCHITECTURE
  // ==========================================
  {
    id: 'comm_arch_business_type',
    section: 'Commercial Typology & Purpose',
    category: 'architecture',
    question: 'What is the primary commercial typology / business activity?',
    description: 'Commercial compliance, fire safety, and footfall circulation depend directly on this.',
    type: 'single_select',
    required: true,
    service: ['Architecture'],
    projectType: ['Commercial', 'Office / Corporate', 'Retail', 'Hospitality'],
    helpText:
      'Commercial regulations, fire safety norms, customer circulation, and facade visibility vary dramatically across offices, retail, and dining.',
    options: [
      { id: 'Office', label: 'Corporate Office / Headquarters', description: 'Executive suites, collaboration, and high-performance workspaces' },
      { id: 'Retail', label: 'Retail Store / Showroom', description: 'Customer display, high visibility, and inventory flow' },
      { id: 'Restaurant', label: 'Restaurant / Fine Dining', description: 'Dining ambiance, commercial kitchen, and customer flow' },
      { id: 'Café', label: 'Café / Coffee Lounge', description: 'Casual seating, counter service, and relaxed atmosphere' },
      { id: 'Hotel', label: 'Hotel / Boutique Guest House', description: 'Hospitality suites, reception, and guest amenities' },
      { id: 'Clinic', label: 'Medical Clinic / Healthcare', description: 'Patient consultation, hygienic circulation, and diagnostic bays' },
      { id: 'Educational', label: 'Educational / Training Center', description: 'Classrooms, studios, and administrative zones' },
      { id: 'Other', label: 'Other Commercial Program', description: 'Mixed development or specialized venture' },
    ],
    allowCustomInput: true,
    customInputPlaceholder: 'Specify commercial business type...',
    conditionalRules: (ctx: EngineContext) =>
      ctx.hasArchitecture &&
      (ctx.projectType === 'Commercial' ||
        ctx.projectType === 'Office / Corporate' ||
        ctx.projectType === 'Retail' ||
        ctx.projectType === 'Hospitality'),
  },
  {
    id: 'comm_arch_purpose',
    section: 'Commercial Typology & Purpose',
    category: 'architecture',
    question: 'What is the structural requirement for this commercial venture?',
    type: 'single_select',
    required: true,
    options: [
      { id: 'New Construction', label: 'New Construction (Ground-up Building)' },
      { id: 'Renovation', label: 'Renovation & Façade Modernization' },
      { id: 'Expansion', label: 'Vertical or Horizontal Expansion' },
      { id: 'Interior + Architecture', label: 'Integrated Architecture + Interior Execution' },
      { id: 'Other', label: 'Other Special Program' },
    ],
    conditionalRules: (ctx: EngineContext) =>
      ctx.hasArchitecture &&
      (ctx.projectType === 'Commercial' ||
        ctx.projectType === 'Office / Corporate' ||
        ctx.projectType === 'Retail' ||
        ctx.projectType === 'Hospitality'),
  },
  {
    id: 'comm_arch_users',
    section: 'Commercial Scale & Capacity',
    category: 'architecture',
    question: 'Expected daily occupants or peak footfall?',
    description: 'Informs fire egress stair widths, restroom ratios, elevator banks, and HVAC zoning.',
    type: 'single_select',
    required: false,
    helpText:
      'Occupant counts allow our team to accurately size emergency egress doors, HVAC chillers, and public vs private restroom ratios according to building codes.',
    options: [
      { id: 'Up to 25', label: 'Up to 25 People (Boutique practice / Studio)' },
      { id: '25 to 100', label: '25 to 100 People (Mid-size firm / Dining)' },
      { id: '100 to 300', label: '100 to 300 People (Corporate / Large Showroom)' },
      { id: '300+', label: '300+ People (Commercial Complex / Campus)' },
      { id: 'Not Sure', label: 'Need guidance on capacity planning', isGuidance: true },
    ],
    conditionalRules: (ctx: EngineContext) =>
      ctx.hasArchitecture &&
      (ctx.projectType === 'Commercial' ||
        ctx.projectType === 'Office / Corporate' ||
        ctx.projectType === 'Retail' ||
        ctx.projectType === 'Hospitality'),
  },
  {
    id: 'comm_arch_parking',
    section: 'Commercial Scale & Capacity',
    category: 'architecture',
    question: 'Customer and staff parking requirements?',
    type: 'single_select',
    required: false,
    options: [
      { id: 'Surface Parking', label: 'Surface Parking Only (5-10 vehicles)' },
      { id: 'Stilt Parking', label: 'Stilt / Covered Ground Parking (10-30 vehicles)' },
      { id: 'Basement Parking', label: 'Dedicated Basement Parking (30+ vehicles)' },
      { id: 'Valet / Drop-off', label: 'Valet Drop-off Porch + Parking' },
      { id: 'Public Nearby', label: 'Municipal / Public Parking Nearby' },
      { id: 'Not Sure', label: "I'm not sure / Need Guidance", isGuidance: true },
    ],
    conditionalRules: (ctx: EngineContext) =>
      ctx.hasArchitecture &&
      (ctx.projectType === 'Commercial' ||
        ctx.projectType === 'Office / Corporate' ||
        ctx.projectType === 'Retail' ||
        ctx.projectType === 'Hospitality'),
  },
  {
    id: 'comm_arch_zones',
    section: 'Commercial Functional Zones',
    category: 'architecture',
    question: 'Which functional zones must be integrated into the architecture?',
    description: 'Select all spatial programs required.',
    type: 'multi_select',
    multipleSelection: true,
    options: [
      { id: 'Customer Area', label: 'Customer Experience / Public Showroom Area' },
      { id: 'Staff Area', label: 'Staff Workstations & Administrative Desks' },
      { id: 'Executive Cabins', label: 'Executive Management & Boardrooms' },
      { id: 'Service Area', label: 'Back-of-House / Service & Logistics Dock' },
      { id: 'Secure Storage', label: 'Secure Storage / Inventory Stockrooms' },
      { id: 'Cafeteria / Pantry', label: 'Cafeteria, Pantry & Breakout Lounge' },
      { id: 'IT / Server Room', label: 'Server & Dedicated Technical Hub' },
      { id: 'Brand Facade', label: 'Iconic Brand Façade & Prominent Signage' },
    ],
    conditionalRules: (ctx: EngineContext) =>
      ctx.hasArchitecture &&
      (ctx.projectType === 'Commercial' ||
        ctx.projectType === 'Office / Corporate' ||
        ctx.projectType === 'Retail' ||
        ctx.projectType === 'Hospitality'),
  },

  // ==========================================
  // SECTION 3: INDUSTRIAL ARCHITECTURE
  // ==========================================
  {
    id: 'ind_arch_type',
    section: 'Industrial Typology & Facility',
    category: 'architecture',
    question: 'What type of industrial facility are you planning?',
    description: 'Industrial structural envelopes depend on clear spans, floor loads, and heavy equipment access.',
    type: 'single_select',
    required: true,
    service: ['Architecture'],
    projectType: ['Industrial'],
    helpText:
      'Industrial architecture hinges on clear span heights, floor load bearings, heavy machinery clearances, and logistics flow.',
    options: [
      { id: 'Factory', label: 'Manufacturing & Assembly Factory', description: 'High clear-span production bays and material flow' },
      { id: 'Warehouse', label: 'Logistics & Distribution Warehouse', description: 'High-bay racking, dock levelers, and container aprons' },
      { id: 'Workshop', label: 'Industrial Workshop & Fabrication', description: 'Heavy tooling, overhead gantry crane, and welding bays' },
      { id: 'Manufacturing', label: 'High-Tech / Cleanroom Facility', description: 'Precision manufacturing, HVAC control, and vibration damping' },
      { id: 'Industrial office', label: 'Industrial Headquarters (Plant + Office)', description: 'Integrated plant operations with executive administrative wing' },
      { id: 'Other', label: 'Other Industrial Facility', description: 'Specialized processing or storage unit' },
    ],
    allowCustomInput: true,
    customInputPlaceholder: 'Specify industrial facility type...',
    conditionalRules: (ctx: EngineContext) => ctx.hasArchitecture && ctx.projectType === 'Industrial',
  },
  {
    id: 'ind_arch_zones',
    section: 'Industrial Functional Zones',
    category: 'architecture',
    question: 'What operational zones are required within the master plan?',
    description: 'Select all functional areas needed on site.',
    type: 'multi_select',
    multipleSelection: true,
    options: [
      { id: 'Production Area', label: 'Production & Manufacturing Floor' },
      { id: 'Storage', label: 'Raw Material & Finished Goods Storage' },
      { id: 'Loading/unloading', label: 'Dedicated Loading / Unloading Bays (Docks)' },
      { id: 'Office', label: 'Administrative & Plant Management Offices' },
      { id: 'Staff facilities', label: 'Staff Amenities (Locker rooms, Canteen, Restrooms)' },
      { id: 'Parking', label: 'Trailer & Employee Parking Yard' },
      { id: 'Utility/service areas', label: 'Utility & Transformer Yard / Generator Bay' },
      { id: 'Expansion requirement', label: 'Reserved Future Expansion Land Bay' },
    ],
    conditionalRules: (ctx: EngineContext) => ctx.hasArchitecture && ctx.projectType === 'Industrial',
  },
  {
    id: 'ind_arch_machinery_logistics',
    section: 'Industrial Machinery & Logistics',
    category: 'architecture',
    question: 'Special machinery, heavy logistics, or utility requirements?',
    description: 'Select all engineering factors to be accommodated in structural design.',
    type: 'multi_select',
    multipleSelection: true,
    options: [
      { id: 'Overhead Crane', label: 'Overhead EOT Crane / Gantry Provisions' },
      { id: 'Heavy Truck Radius', label: 'Heavy Trailer Turning Radius (40ft Container Trucks)' },
      { id: 'Heavy Floor Load', label: 'Heavy Dynamic Floor Load & Vibration Isolation' },
      { id: 'High Power / Substation', label: 'Dedicated HT Substation & High CFM Ventilation' },
      { id: 'Effluent / Drainage', label: 'Special Chemical / Effluent Drainage Provision' },
      { id: 'Standard Setup', label: 'Standard Industrial Setup / Studio Guidance', isGuidance: true },
    ],
    conditionalRules: (ctx: EngineContext) => ctx.hasArchitecture && ctx.projectType === 'Industrial',
  },

  // ==========================================
  // SECTION 4: INTERIOR REQUIREMENT ENGINE
  // ==========================================
  // Space Selection Question
  {
    id: 'int_spaces_selector',
    section: 'Interior Spaces in Scope',
    category: 'interior',
    question: 'What would you like to design?',
    description: 'Select all rooms and areas you want our interior atelier to design.',
    type: 'multi_select',
    required: true,
    multipleSelection: true,
    helpText:
      'We tailor joinery, lighting, and finishes specifically to each selected space. Subsequent questions will focus strictly on the spaces you choose here.',
    options: [
      // Residential spaces
      { id: 'Full Home', label: 'Full Home (Complete Interior)', tag: 'Residential' },
      { id: 'Living Room', label: 'Living Room', tag: 'Residential' },
      { id: 'Dining', label: 'Dining Area', tag: 'Residential' },
      { id: 'Kitchen', label: 'Kitchen & Pantry', tag: 'Residential' },
      { id: 'Master Bedroom', label: 'Master Bedroom Suite', tag: 'Residential' },
      { id: 'Bedroom', label: 'Guest / Secondary Bedrooms', tag: 'Residential' },
      { id: 'Kids Room', label: 'Kids Room / Nursery', tag: 'Residential' },
      { id: 'Bathroom', label: 'Ensuite Bathrooms & Powder Room', tag: 'Residential' },
      { id: 'Home Office', label: 'Home Office / Study Library', tag: 'Residential' },
      { id: 'TV / Entertainment', label: 'TV / Entertainment Lounge', tag: 'Residential' },
      { id: 'Balcony', label: 'Balcony / Covered Deck', tag: 'Residential' },
      { id: 'Pooja', label: 'Pooja / Prayer Sanctum', tag: 'Residential' },

      // Commercial / Office spaces
      { id: 'Office', label: 'Executive Office / Cabins', tag: 'Commercial' },
      { id: 'Reception', label: 'Reception & Waiting Lounge', tag: 'Commercial' },
      { id: 'Meeting Room', label: 'Meeting & Boardrooms', tag: 'Commercial' },
      { id: 'Workstation Area', label: 'Open Workstation Area', tag: 'Commercial' },
      { id: 'Retail', label: 'Retail Store / Showroom Floor', tag: 'Commercial' },
      { id: 'Restaurant', label: 'Restaurant / Dining Hall', tag: 'Commercial' },
      { id: 'Café', label: 'Café & Coffee Bar', tag: 'Commercial' },
      { id: 'Clinic', label: 'Clinic / Treatment Consultation', tag: 'Commercial' },

      // Industrial spaces
      { id: 'Staff Area', label: 'Staff Locker & Canteen Area', tag: 'Industrial' },
      { id: 'Management Area', label: 'Plant Management Suite', tag: 'Industrial' },
    ],
    allowCustomInput: true,
    customInputPlaceholder: 'Add custom room or space...',
    conditionalRules: (ctx: EngineContext) => ctx.hasInterior,
  },

  // Space-Specific Detail 1: LIVING ROOM
  // STRICT RULE: Only shown if Living Room or Full Home is selected!
  {
    id: 'int_details_living_room',
    section: 'Interior Details: Living Room',
    category: 'interior',
    question: 'Living Room: What elements would you like included?',
    description: 'Select the furnishings, lighting, and architectural joinery required.',
    type: 'multi_select',
    multipleSelection: true,
    parentSpaceId: 'Living Room',
    options: [
      { id: 'Seating', label: 'Seating & Sofas (Formal & Casual)' },
      { id: 'TV unit', label: 'Custom TV & Entertainment Console' },
      { id: 'Storage', label: 'Concealed Storage & Wall Shelving' },
      { id: 'False ceiling', label: 'Architectural False Ceiling' },
      { id: 'Lighting', label: 'Layered Architectural Lighting (Cove & Accent)' },
      { id: 'Wall treatment', label: 'Feature Wall Treatment (Fluted, Stone, or Veneer)' },
      { id: 'Curtains/blinds', label: 'Drapery, Sheers & Automated Blinds' },
      { id: 'Flooring', label: 'Flooring Upgrade (Marble / Hardwood)' },
      { id: 'Display', label: 'Art Display Niches & Collector Shelving' },
      { id: 'Pooja', label: 'Integrated Pooja Mandir Niche' },
      { id: 'Other', label: 'Other Living Room Elements' },
    ],
    conditionalRules: (ctx: EngineContext) =>
      ctx.hasInterior &&
      (ctx.selectedSpaces.some((s) => s.toLowerCase().includes('living')) ||
        ctx.selectedSpaces.some((s) => s.toLowerCase().includes('full home'))),
  },

  // Space-Specific Detail 2: KITCHEN
  // STRICT RULE: Only shown if Kitchen or Full Home is selected!
  {
    id: 'int_details_kitchen',
    section: 'Interior Details: Kitchen & Pantry',
    category: 'interior',
    question: 'Kitchen: What elements would you like to incorporate?',
    description: 'Joinery, appliances, storage, and utility configuration.',
    type: 'multi_select',
    multipleSelection: true,
    parentSpaceId: 'Kitchen',
    options: [
      { id: 'Modular kitchen', label: 'Premium Modular Kitchen Cabinetry' },
      { id: 'Island', label: 'Central Kitchen Island with Bar Stools' },
      { id: 'Pantry', label: 'Dedicated Walk-in Pantry' },
      { id: 'Tall unit', label: 'Tall Appliance Unit with Built-in Oven' },
      { id: 'Storage', label: 'Maximized Corner & Deep Pull-out Storage' },
      { id: 'Appliances', label: 'Built-in Appliances (Hob, Chimney, Dishwasher)' },
      { id: 'Utility', label: 'Separate Wet / Dry Utility Area' },
      { id: 'Lighting', label: 'Under-cabinet Task Lighting & Pendants' },
      { id: 'Other', label: 'Other Kitchen Requirements' },
    ],
    conditionalRules: (ctx: EngineContext) =>
      ctx.hasInterior &&
      (ctx.selectedSpaces.some((s) => s.toLowerCase().includes('kitchen')) ||
        ctx.selectedSpaces.some((s) => s.toLowerCase().includes('full home'))),
  },

  // Space-Specific Detail 3: BEDROOM (Master or Guest)
  // STRICT RULE: Only shown if Bedroom or Master Bedroom or Kids Room or Full Home is selected!
  {
    id: 'int_details_bedroom',
    section: 'Interior Details: Bedroom Suites',
    category: 'interior',
    question: 'Bedroom Suites: What elements are essential for your rooms?',
    description: 'Bed styling, storage, study desks, and peaceful lighting.',
    type: 'multi_select',
    multipleSelection: true,
    parentSpaceId: 'Bedroom',
    options: [
      { id: 'Bed', label: 'Custom Bed Frame & Upholstered Headboard' },
      { id: 'Wardrobe', label: 'Full-height Wardrobe (Glass / Veneer / Lacquer)' },
      { id: 'Dressing', label: 'Dedicated Dressing Console & LED Mirror' },
      { id: 'Study', label: 'Integrated Work / Study Desk' },
      { id: 'TV', label: 'Wall-mounted TV Unit & Bedside Storage' },
      { id: 'Storage', label: 'Concealed Storage & Bedside Tables' },
      { id: 'False ceiling', label: 'Ambient False Ceiling with Cove Lighting' },
      { id: 'Lighting', label: 'Bedside Reading Pendants & Mood Lighting' },
      { id: 'Other', label: 'Other Bedroom Features' },
    ],
    conditionalRules: (ctx: EngineContext) =>
      ctx.hasInterior &&
      (ctx.selectedSpaces.some((s) => s.toLowerCase().includes('bedroom')) ||
        ctx.selectedSpaces.some((s) => s.toLowerCase().includes('kids')) ||
        ctx.selectedSpaces.some((s) => s.toLowerCase().includes('full home'))),
  },

  // Space-Specific Detail 4: BATHROOMS
  {
    id: 'int_details_bathroom',
    section: 'Interior Details: Bathrooms',
    category: 'interior',
    question: 'Bathrooms: What luxury finishes would you like?',
    type: 'multi_select',
    multipleSelection: true,
    parentSpaceId: 'Bathroom',
    options: [
      { id: 'Vanity', label: 'Custom Floating Vanity Counter' },
      { id: 'Glass Partition', label: 'Toughened Glass Wet/Dry Partition' },
      { id: 'Concealed Fittings', label: 'Wall-hung Sanitary & Concealed Cistern' },
      { id: 'Bathtub', label: 'Freestanding Soaking Bathtub' },
      { id: 'Tile & Marble', label: 'Full-height Large Format Marble / Tile' },
      { id: 'Niche Lighting', label: 'Recessed Shower Niche Lighting' },
    ],
    conditionalRules: (ctx: EngineContext) =>
      ctx.hasInterior &&
      (ctx.selectedSpaces.some((s) => s.toLowerCase().includes('bathroom')) ||
        ctx.selectedSpaces.some((s) => s.toLowerCase().includes('full home'))),
  },

  // Space-Specific Detail 5: WORKPLACE / OFFICE
  {
    id: 'int_details_office',
    section: 'Interior Details: Workplace & Cabins',
    category: 'interior',
    question: 'Workplace & Cabins: What elements would you like to feature?',
    type: 'multi_select',
    multipleSelection: true,
    parentSpaceId: 'Office',
    options: [
      { id: 'Ergonomic Desks', label: 'Ergonomic Workstations with Cable Trays' },
      { id: 'Executive Desk', label: 'Custom Executive Desk & Credenza' },
      { id: 'Conference Setup', label: 'Conference Table with Integrated AV Connectivity' },
      { id: 'Acoustic Panels', label: 'Acoustic Wall Panels & Soundproofing' },
      { id: 'Filing Storage', label: 'Concealed Filing & Trophy Display Units' },
      { id: 'Video Backdrop', label: 'Curated Video Conferencing Background' },
    ],
    conditionalRules: (ctx: EngineContext) =>
      ctx.hasInterior &&
      (ctx.selectedSpaces.some((s) => s.toLowerCase().includes('office')) ||
        ctx.selectedSpaces.some((s) => s.toLowerCase().includes('workstation')) ||
        ctx.selectedSpaces.some((s) => s.toLowerCase().includes('meeting')) ||
        ctx.selectedSpaces.some((s) => s.toLowerCase().includes('cabin'))),
  },

  // ==========================================
  // SECTION 5: LANDSCAPE REQUIREMENT ENGINE
  // ==========================================
  {
    id: 'land_areas',
    section: 'Landscape Design Scope',
    category: 'landscape',
    question: 'What outdoor areas would you like to design?',
    description: 'Select all exterior zones to be developed by our landscape architects.',
    type: 'multi_select',
    required: true,
    multipleSelection: true,
    helpText:
      'Landscape design establishes microclimates, thermal cooling around the building, outdoor lighting, and biophilic outdoor living sanctuaries.',
    options: [
      { id: 'Front Garden', label: 'Front Garden', description: 'Arrival impression and entrance greenery' },
      { id: 'Backyard', label: 'Backyard / Private Lawn', description: 'Private family lawn and entertaining space' },
      { id: 'Courtyard', label: 'Courtyard', description: 'Internal courtyard, light wells, and zen garden' },
      { id: 'Terrace', label: 'Terrace Garden', description: 'Rooftop green deck, planters, and lounge' },
      { id: 'Balcony', label: 'Balcony Landscaping', description: 'Balcony vertical gardens and planter boxes' },
      { id: 'Pool Area', label: 'Pool Area', description: 'Pool deck, outdoor shower, and sun loungers' },
      { id: 'Outdoor Seating', label: 'Outdoor Seating / Pavilion', description: 'Gazebo, pergola, or sunken fire pit' },
      { id: 'Entrance Landscape', label: 'Entrance Landscape & Driveway', description: 'Hardscaping, curbs, and avenue trees' },
      { id: 'Complete Landscape', label: 'Complete Landscape Masterplan', description: 'Turnkey site-wide landscape design' },
      { id: 'Other', label: 'Other Outdoor Area', description: 'Custom landscape canvas' },
    ],
    allowCustomInput: true,
    customInputPlaceholder: 'Specify custom landscape area...',
    conditionalRules: (ctx: EngineContext) => ctx.hasLandscape,
  },
  {
    id: 'land_condition',
    section: 'Landscape Site Condition',
    category: 'landscape',
    question: 'Is this an existing garden or a brand new site?',
    type: 'single_select',
    required: false,
    options: [
      { id: 'New', label: 'Brand New Site (Raw ground / Plot)' },
      { id: 'Existing', label: 'Remodeling / Upgrading Existing Garden' },
      { id: 'Terrace/Paved', label: 'Terrace / Hardscape Paved Area' },
      { id: 'Not Sure', label: "I'm not sure / Open to Studio Recommendation", isGuidance: true },
    ],
    conditionalRules: (ctx: EngineContext) => ctx.hasLandscape,
  },
  {
    id: 'land_features',
    section: 'Landscape Elements & Flora',
    category: 'landscape',
    question: 'What landscape elements would you like to incorporate?',
    description: 'Select flora, water, and structural hardscaping elements.',
    type: 'multi_select',
    multipleSelection: true,
    options: [
      { id: 'Lawn', label: 'Lawn (Natural Grass Turf)' },
      { id: 'Plants', label: 'Curated Shrubbery & Biophilic Plants' },
      { id: 'Trees', label: 'Sculptural Shade Trees & Palms' },
      { id: 'Water feature', label: 'Water Feature (Fountain, Cascade, or Reflecting Pond)' },
      { id: 'Pool', label: 'Swimming Pool or Plunge Pool' },
      { id: 'Pergola', label: 'Pergola (Wood / Metal shade structure)' },
      { id: 'Outdoor lighting', label: 'Atmospheric Outdoor Architectural Lighting' },
      { id: 'Pathways', label: 'Natural Stone Pathways & Steppers' },
      { id: 'Fire pit', label: 'Fire Pit & Sunken Seating' },
      { id: 'Drip irrigation', label: 'Automated Drip Irrigation System' },
    ],
    conditionalRules: (ctx: EngineContext) => ctx.hasLandscape,
  },
  {
    id: 'land_lifestyle_priorities',
    section: 'Landscape Maintenance & Lifestyle',
    category: 'landscape',
    question: 'Any specific maintenance or lifestyle priorities for your landscape?',
    type: 'multi_select',
    multipleSelection: true,
    options: [
      { id: 'Low maintenance requirement', label: 'Low Maintenance (Drought-tolerant flora)' },
      { id: 'Children/pet-friendly requirement', label: 'Children & Pet-friendly (Safe, open play)' },
      { id: 'Herb/Kitchen Garden', label: 'Organic Herb & Kitchen Garden' },
      { id: 'Privacy Screen', label: 'Dense Bamboo / Plant Privacy Screening' },
      { id: 'Native Flora', label: 'Native Climate-Resilient Plants' },
      { id: 'Other', label: 'Other Priorities' },
    ],
    conditionalRules: (ctx: EngineContext) => ctx.hasLandscape,
  },
];
