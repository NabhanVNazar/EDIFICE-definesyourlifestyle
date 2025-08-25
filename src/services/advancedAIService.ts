import { Plot, Requirements, PartialBlueprint, ElevationStyle } from '../types';

// Advanced AI Service with comprehensive training data and intelligent responses
export class AdvancedAIService {
  private static apiKey = import.meta.env.VITE_OPENAI_API_KEY;
  private static baseURL = 'https://api.openai.com/v1';

  // Comprehensive architectural knowledge base
  private static architecturalKnowledge = {
    designPrinciples: {
      spatial: {
        circulation: "Maintain clear pathways between rooms with minimum 3-foot wide corridors",
        zoning: "Group related functions together (bedrooms near bathrooms, kitchen near dining)",
        privacy: "Separate public and private spaces with buffer zones",
        flexibility: "Design spaces that can adapt to changing needs over time"
      },
      structural: {
        loadBearing: "Ensure proper load distribution with adequate support columns",
        spans: "Limit unsupported spans based on material capabilities",
        foundations: "Size foundations based on soil conditions and structural loads",
        seismic: "Include seismic considerations in earthquake-prone regions"
      },
      environmental: {
        orientation: "Orient main living spaces to capture natural light and views",
        ventilation: "Provide cross-ventilation with windows on opposite walls",
        thermal: "Use thermal mass and insulation strategically for climate control",
        daylighting: "Maximize natural light while controlling glare and heat gain"
      }
    },
    
    buildingCodes: {
      residential: {
        egress: "Every bedroom must have two means of egress (door and window)",
        ceiling_height: "Minimum 7'6\" ceiling height in habitable rooms",
        stair_width: "Minimum 36\" wide stairs with 7.75\" max rise, 10\" min run",
        bathroom_ventilation: "Mechanical ventilation required in windowless bathrooms",
        smoke_detectors: "Required in every bedroom and hallway outside bedrooms"
      },
      accessibility: {
        doorways: "Minimum 32\" clear width for accessible doorways",
        hallways: "Minimum 36\" wide hallways for wheelchair access",
        ramps: "Maximum 1:12 slope for wheelchair ramps",
        bathrooms: "5' turning radius required in accessible bathrooms"
      }
    },

    materialProperties: {
      structural: {
        concrete: { strength: "high", durability: "excellent", cost: "moderate", sustainability: "good" },
        steel: { strength: "excellent", durability: "good", cost: "high", sustainability: "excellent" },
        wood: { strength: "good", durability: "moderate", cost: "low", sustainability: "excellent" },
        masonry: { strength: "good", durability: "excellent", cost: "moderate", sustainability: "good" }
      },
      finishes: {
        hardwood: { durability: "good", maintenance: "high", cost: "high", aesthetics: "excellent" },
        tile: { durability: "excellent", maintenance: "low", cost: "moderate", aesthetics: "good" },
        carpet: { durability: "fair", maintenance: "high", cost: "low", aesthetics: "good" },
        concrete: { durability: "excellent", maintenance: "low", cost: "low", aesthetics: "modern" }
      }
    },

    climateConsiderations: {
      hot_arid: {
        roof: "Light colors, high thermal mass, low pitch acceptable",
        walls: "Thick walls, light colors, minimal west-facing windows",
        landscaping: "Drought-resistant plants, shade structures",
        cooling: "Evaporative cooling, thermal mass, night ventilation"
      },
      cold: {
        roof: "Dark colors, steep pitch for snow load, high insulation",
        walls: "High R-value insulation, vapor barriers, thermal bridges minimized",
        windows: "Triple-pane, south-facing for solar gain",
        heating: "Radiant heating, heat recovery ventilation"
      },
      humid: {
        ventilation: "Cross-ventilation, ceiling fans, dehumidification",
        materials: "Moisture-resistant, mold-resistant finishes",
        drainage: "Proper site drainage, raised foundations",
        cooling: "Air conditioning, humidity control"
      }
    }
  };

  // Advanced blueprint generation with AI optimization
  static async generateIntelligentBlueprint(
    plot: Plot, 
    requirements: Requirements,
    stylePreferences?: string,
    climateZone?: string
  ): Promise<PartialBlueprint> {
    try {
      const prompt = this.createBlueprintPrompt(plot, requirements, stylePreferences, climateZone);
      
      // In a real implementation, this would call OpenAI API
      // For now, we'll use our intelligent algorithm
      return this.generateOptimizedLayout(plot, requirements, climateZone);
    } catch (error) {
      console.error('Blueprint generation error:', error);
      return this.generateFallbackBlueprint(plot, requirements);
    }
  }

  private static createBlueprintPrompt(
    plot: Plot, 
    requirements: Requirements, 
    stylePreferences?: string,
    climateZone?: string
  ): string {
    return `
    Generate an optimized residential floor plan with the following specifications:
    
    PLOT DETAILS:
    - Size: ${plot.width} × ${plot.length} feet (${plot.area} sq ft)
    - Type: ${plot.type}
    
    REQUIREMENTS:
    - Floors: ${requirements.floors}
    - Bedrooms: ${requirements.bedrooms}
    - Bathrooms: ${requirements.bathrooms}
    - Kitchen: ${requirements.kitchen} style
    - Additional: ${Object.entries(requirements)
      .filter(([key, value]) => typeof value === 'boolean' && value)
      .map(([key]) => key)
      .join(', ')}
    
    DESIGN CONSTRAINTS:
    - Follow building codes for egress, ceiling heights, and accessibility
    - Optimize for natural light and ventilation
    - Create efficient circulation patterns
    - Consider privacy zones (public vs private spaces)
    - Maximize storage and functionality
    ${stylePreferences ? `- Style preference: ${stylePreferences}` : ''}
    ${climateZone ? `- Climate zone: ${climateZone}` : ''}
    
    OPTIMIZATION CRITERIA:
    1. Functional efficiency and flow
    2. Natural light optimization
    3. Privacy and noise control
    4. Energy efficiency
    5. Construction cost optimization
    6. Future flexibility and adaptability
    
    Generate a detailed room layout with precise dimensions, door/window placements, and circulation paths.
    `;
  }

  private static generateOptimizedLayout(
    plot: Plot, 
    requirements: Requirements,
    climateZone?: string
  ): PartialBlueprint {
    const rooms = [];
    const walls = [];
    const doors = [];
    const windows = [];
    
    // Calculate optimal room sizes based on plot and requirements
    const totalArea = plot.area;
    const buildableArea = totalArea * 0.7; // 70% coverage ratio
    const areaPerFloor = buildableArea / requirements.floors;
    
    // Room size calculations based on architectural standards
    const roomSizes = this.calculateOptimalRoomSizes(areaPerFloor, requirements);
    
    // Generate main floor layout
    let currentX = 20;
    let currentY = 20;
    const floorWidth = plot.width * 0.8;
    const floorHeight = plot.length * 0.8;
    
    // Living areas (public zone)
    if (requirements.livingRoom) {
      const livingRoom = {
        id: `room-living-${Date.now()}`,
        type: 'living-room',
        x: currentX,
        y: currentY,
        width: roomSizes.livingRoom.width,
        height: roomSizes.livingRoom.height,
        color: 'rgba(34, 197, 94, 0.3)'
      };
      rooms.push(livingRoom);
      
      // Add windows for natural light (south-facing preferred)
      windows.push({
        id: `window-living-${Date.now()}`,
        x: currentX + roomSizes.livingRoom.width / 2 - 30,
        y: currentY - 3,
        width: 60,
        height: 6,
        wallId: 'exterior-wall-south'
      });
      
      currentX += roomSizes.livingRoom.width + 10;
    }
    
    // Kitchen (work zone)
    if (requirements.kitchen) {
      const kitchen = {
        id: `room-kitchen-${Date.now()}`,
        type: 'kitchen',
        x: currentX,
        y: currentY,
        width: roomSizes.kitchen.width,
        height: roomSizes.kitchen.height,
        color: 'rgba(249, 115, 22, 0.3)'
      };
      rooms.push(kitchen);
      
      // Kitchen window over sink area
      windows.push({
        id: `window-kitchen-${Date.now()}`,
        x: currentX + 20,
        y: currentY - 3,
        width: 40,
        height: 6,
        wallId: 'exterior-wall-north'
      });
      
      currentY += roomSizes.kitchen.height + 10;
    }
    
    // Dining room (if required)
    if (requirements.diningRoom) {
      const dining = {
        id: `room-dining-${Date.now()}`,
        type: 'dining',
        x: currentX - roomSizes.kitchen.width,
        y: currentY,
        width: roomSizes.dining.width,
        height: roomSizes.dining.height,
        color: 'rgba(168, 85, 247, 0.3)'
      };
      rooms.push(dining);
      currentY += roomSizes.dining.height + 10;
    }
    
    // Bedrooms (private zone)
    for (let i = 0; i < requirements.bedrooms; i++) {
      const isMaster = i === 0;
      const roomSize = isMaster ? roomSizes.masterBedroom : roomSizes.bedroom;
      
      const bedroom = {
        id: `room-bedroom-${i + 1}-${Date.now()}`,
        type: isMaster ? 'master-bedroom' : 'bedroom',
        x: i % 2 === 0 ? 20 : floorWidth / 2 + 10,
        y: currentY + Math.floor(i / 2) * (roomSize.height + 10),
        width: roomSize.width,
        height: roomSize.height,
        color: 'rgba(59, 130, 246, 0.3)'
      };
      rooms.push(bedroom);
      
      // Bedroom windows (two per room for egress)
      windows.push({
        id: `window-bedroom-${i + 1}-1-${Date.now()}`,
        x: bedroom.x + 20,
        y: bedroom.y - 3,
        width: 30,
        height: 6,
        wallId: `bedroom-${i + 1}-wall-north`
      });
      
      windows.push({
        id: `window-bedroom-${i + 1}-2-${Date.now()}`,
        x: bedroom.x + bedroom.width - 3,
        y: bedroom.y + 20,
        width: 6,
        height: 30,
        wallId: `bedroom-${i + 1}-wall-east`
      });
    }
    
    // Bathrooms
    for (let i = 0; i < requirements.bathrooms; i++) {
      const bathroom = {
        id: `room-bathroom-${i + 1}-${Date.now()}`,
        type: 'bathroom',
        x: floorWidth - roomSizes.bathroom.width - 20,
        y: 20 + i * (roomSizes.bathroom.height + 20),
        width: roomSizes.bathroom.width,
        height: roomSizes.bathroom.height,
        color: 'rgba(236, 72, 153, 0.3)'
      };
      rooms.push(bathroom);
      
      // Bathroom ventilation window
      if (Math.random() > 0.5) { // 50% chance of window
        windows.push({
          id: `window-bathroom-${i + 1}-${Date.now()}`,
          x: bathroom.x + bathroom.width - 3,
          y: bathroom.y + bathroom.height / 2 - 15,
          width: 6,
          height: 30,
          wallId: `bathroom-${i + 1}-wall-east`
        });
      }
    }
    
    // Generate walls between rooms
    this.generateInteriorWalls(rooms, walls);
    
    // Generate doors with proper placement
    this.generateOptimalDoors(rooms, doors);
    
    return { rooms, walls, doors, windows };
  }

  private static calculateOptimalRoomSizes(areaPerFloor: number, requirements: Requirements) {
    // Standard room size ratios based on architectural best practices
    const roomRatios = {
      livingRoom: 0.25,
      kitchen: 0.15,
      dining: 0.12,
      masterBedroom: 0.18,
      bedroom: 0.12,
      bathroom: 0.06,
      hallway: 0.08,
      storage: 0.04
    };
    
    // Calculate base unit size
    const totalRatio = roomRatios.livingRoom + roomRatios.kitchen + 
                      (requirements.diningRoom ? roomRatios.dining : 0) +
                      roomRatios.masterBedroom + 
                      (requirements.bedrooms - 1) * roomRatios.bedroom +
                      requirements.bathrooms * roomRatios.bathroom +
                      roomRatios.hallway + roomRatios.storage;
    
    const unitSize = areaPerFloor / totalRatio;
    
    return {
      livingRoom: { width: Math.sqrt(unitSize * roomRatios.livingRoom * 1.5), height: Math.sqrt(unitSize * roomRatios.livingRoom / 1.5) },
      kitchen: { width: Math.sqrt(unitSize * roomRatios.kitchen * 1.2), height: Math.sqrt(unitSize * roomRatios.kitchen / 1.2) },
      dining: { width: Math.sqrt(unitSize * roomRatios.dining), height: Math.sqrt(unitSize * roomRatios.dining) },
      masterBedroom: { width: Math.sqrt(unitSize * roomRatios.masterBedroom * 1.3), height: Math.sqrt(unitSize * roomRatios.masterBedroom / 1.3) },
      bedroom: { width: Math.sqrt(unitSize * roomRatios.bedroom * 1.2), height: Math.sqrt(unitSize * roomRatios.bedroom / 1.2) },
      bathroom: { width: Math.sqrt(unitSize * roomRatios.bathroom * 0.8), height: Math.sqrt(unitSize * roomRatios.bathroom / 0.8) }
    };
  }

  private static generateInteriorWalls(rooms: any[], walls: any[]) {
    // Generate walls between adjacent rooms
    rooms.forEach((room, index) => {
      // Add walls around each room
      const wallThickness = 4;
      
      // Top wall
      walls.push({
        id: `wall-${room.id}-top`,
        x1: room.x,
        y1: room.y,
        x2: room.x + room.width,
        y2: room.y,
        thickness: wallThickness
      });
      
      // Right wall
      walls.push({
        id: `wall-${room.id}-right`,
        x1: room.x + room.width,
        y1: room.y,
        x2: room.x + room.width,
        y2: room.y + room.height,
        thickness: wallThickness
      });
      
      // Bottom wall
      walls.push({
        id: `wall-${room.id}-bottom`,
        x1: room.x,
        y1: room.y + room.height,
        x2: room.x + room.width,
        y2: room.y + room.height,
        thickness: wallThickness
      });
      
      // Left wall
      walls.push({
        id: `wall-${room.id}-left`,
        x1: room.x,
        y1: room.y,
        x2: room.x,
        y2: room.y + room.height,
        thickness: wallThickness
      });
    });
  }

  private static generateOptimalDoors(rooms: any[], doors: any[]) {
    rooms.forEach((room) => {
      // Add door to each room (typically on the side facing the hallway)
      const doorWidth = 30;
      
      doors.push({
        id: `door-${room.id}`,
        x: room.x + room.width - doorWidth - 10,
        y: room.y + room.height,
        width: doorWidth,
        rotation: 0,
        wallId: `wall-${room.id}-bottom`
      });
    });
  }

  private static generateFallbackBlueprint(plot: Plot, requirements: Requirements): PartialBlueprint {
    // Simple fallback layout
    return {
      rooms: [
        {
          id: 'room-living',
          type: 'living-room',
          x: 20,
          y: 20,
          width: 200,
          height: 150,
          color: 'rgba(34, 197, 94, 0.3)'
        }
      ],
      walls: [],
      doors: [],
      windows: []
    };
  }

  // Advanced cost calculation with market data
  static async calculateAdvancedCosts(
    plot: Plot,
    requirements: Requirements,
    materials: any[],
    region: string = 'National Average'
  ) {
    const baseConstructionCost = plot.area * requirements.floors * 150; // $150 per sq ft base
    
    // Regional multipliers
    const regionalMultipliers: { [key: string]: number } = {
      'San Francisco': 1.8,
      'New York': 1.6,
      'Los Angeles': 1.5,
      'Seattle': 1.4,
      'Austin': 1.2,
      'Denver': 1.1,
      'Atlanta': 1.0,
      'Phoenix': 0.95,
      'Dallas': 0.9,
      'National Average': 1.0
    };
    
    const multiplier = regionalMultipliers[region] || 1.0;
    const adjustedCost = baseConstructionCost * multiplier;
    
    // Detailed breakdown
    const breakdown = [
      { category: 'Foundation & Structure', cost: adjustedCost * 0.25, percentage: 25 },
      { category: 'Framing & Roofing', cost: adjustedCost * 0.20, percentage: 20 },
      { category: 'Plumbing & Electrical', cost: adjustedCost * 0.15, percentage: 15 },
      { category: 'HVAC Systems', cost: adjustedCost * 0.12, percentage: 12 },
      { category: 'Insulation & Drywall', cost: adjustedCost * 0.10, percentage: 10 },
      { category: 'Flooring & Finishes', cost: adjustedCost * 0.10, percentage: 10 },
      { category: 'Kitchen & Bathrooms', cost: adjustedCost * 0.08, percentage: 8 }
    ];
    
    return {
      totalCost: adjustedCost,
      costPerSqFt: adjustedCost / (plot.area * requirements.floors),
      regionalMultiplier: multiplier,
      breakdown,
      timeline: this.estimateConstructionTimeline(plot.area, requirements.floors),
      financing: this.calculateFinancingOptions(adjustedCost)
    };
  }

  private static estimateConstructionTimeline(area: number, floors: number) {
    const baseMonths = 6;
    const areaFactor = Math.ceil(area / 1000) * 0.5;
    const floorFactor = (floors - 1) * 1.5;
    
    const totalMonths = baseMonths + areaFactor + floorFactor;
    
    return {
      totalMonths: Math.ceil(totalMonths),
      phases: [
        { phase: 'Permits & Planning', duration: 1, description: 'Obtain building permits and finalize plans' },
        { phase: 'Site Preparation', duration: 0.5, description: 'Excavation and foundation preparation' },
        { phase: 'Foundation', duration: 1, description: 'Pour foundation and basement (if applicable)' },
        { phase: 'Framing', duration: 2, description: 'Frame walls, floors, and roof structure' },
        { phase: 'Systems Installation', duration: 2, description: 'Plumbing, electrical, and HVAC rough-in' },
        { phase: 'Insulation & Drywall', duration: 1.5, description: 'Insulation installation and drywall finishing' },
        { phase: 'Finishes', duration: 2, description: 'Flooring, painting, and interior finishes' },
        { phase: 'Final Inspections', duration: 0.5, description: 'Final inspections and certificate of occupancy' }
      ]
    };
  }

  private static calculateFinancingOptions(totalCost: number) {
    const downPaymentOptions = [0.10, 0.15, 0.20, 0.25];
    const interestRates = [0.065, 0.070, 0.075]; // Current typical rates
    const loanTerms = [15, 20, 30]; // Years
    
    const options = [];
    
    downPaymentOptions.forEach(downPayment => {
      const loanAmount = totalCost * (1 - downPayment);
      
      loanTerms.forEach(term => {
        interestRates.forEach(rate => {
          const monthlyRate = rate / 12;
          const numPayments = term * 12;
          const monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
                                (Math.pow(1 + monthlyRate, numPayments) - 1);
          
          options.push({
            downPayment: downPayment * 100,
            downPaymentAmount: totalCost * downPayment,
            loanAmount,
            interestRate: rate * 100,
            termYears: term,
            monthlyPayment,
            totalInterest: (monthlyPayment * numPayments) - loanAmount
          });
        });
      });
    });
    
    return options.sort((a, b) => a.monthlyPayment - b.monthlyPayment);
  }

  // Advanced elevation generation with style intelligence
  static async generateAdvancedElevations(
    plot: Plot,
    requirements: Requirements,
    stylePreference?: string,
    climateZone?: string,
    customPrompt?: string
  ): Promise<ElevationStyle[]> {
    const baseStyles = await this.getBaseElevationStyles();
    const customStyles = [];
    
    if (customPrompt || stylePreference) {
      // Generate AI-powered custom styles
      const aiStyles = await this.generateAIElevationStyles(
        plot, 
        requirements, 
        stylePreference, 
        climateZone, 
        customPrompt
      );
      customStyles.push(...aiStyles);
    }
    
    return [...customStyles, ...baseStyles];
  }

  private static async generateAIElevationStyles(
    plot: Plot,
    requirements: Requirements,
    stylePreference?: string,
    climateZone?: string,
    customPrompt?: string
  ): Promise<ElevationStyle[]> {
    // Simulate AI generation with intelligent style creation
    const styles: ElevationStyle[] = [];
    
    // Generate 3 AI-powered custom styles
    for (let i = 0; i < 3; i++) {
      const style: ElevationStyle = {
        id: `ai-generated-${i + 1}`,
        name: this.generateStyleName(stylePreference, i),
        description: this.generateStyleDescription(plot, requirements, stylePreference, climateZone, customPrompt),
        thumbnail: `https://images.pexels.com/photos/${this.getRandomImageId()}/pexels-photo-${this.getRandomImageId()}.jpeg?auto=compress&cs=tinysrgb&w=400`,
        features: this.generateStyleFeatures(stylePreference, climateZone),
        materials: this.generateStyleMaterials(stylePreference, climateZone)
      };
      
      styles.push(style);
    }
    
    return styles;
  }

  private static generateStyleName(stylePreference?: string, index: number = 0): string {
    const baseNames = ['Contemporary Fusion', 'Modern Harmony', 'Architectural Innovation'];
    const prefixOptions = stylePreference ? [stylePreference, 'Custom', 'Personalized'] : ['AI-Generated', 'Custom', 'Unique'];
    
    return `${prefixOptions[index]} ${baseNames[index]}`;
  }

  private static generateStyleDescription(
    plot: Plot,
    requirements: Requirements,
    stylePreference?: string,
    climateZone?: string,
    customPrompt?: string
  ): string {
    const descriptions = [
      `A ${stylePreference || 'contemporary'} design optimized for your ${plot.area} sq ft plot with ${requirements.bedrooms} bedrooms. Features clean lines and efficient use of space.`,
      `Custom architectural style incorporating ${customPrompt || 'modern elements'} with climate-appropriate features for ${climateZone || 'your region'}.`,
      `Innovative design blending functionality with aesthetic appeal, perfect for a ${requirements.floors}-floor home with ${stylePreference || 'contemporary'} influences.`
    ];
    
    return descriptions[Math.floor(Math.random() * descriptions.length)];
  }

  private static generateStyleFeatures(stylePreference?: string, climateZone?: string): string[] {
    const baseFeatures = ['Energy-efficient design', 'Natural light optimization', 'Modern materials'];
    const styleFeatures = {
      'modern': ['Floor-to-ceiling windows', 'Flat rooflines', 'Minimal ornamentation'],
      'traditional': ['Classic proportions', 'Symmetrical design', 'Traditional materials'],
      'contemporary': ['Mixed materials', 'Asymmetrical elements', 'Bold architectural features']
    };
    
    const climateFeatures = {
      'hot': ['Solar shading', 'Light-colored materials', 'Covered outdoor spaces'],
      'cold': ['High insulation', 'South-facing windows', 'Steep roof pitch'],
      'humid': ['Elevated design', 'Cross-ventilation', 'Moisture-resistant materials']
    };
    
    let features = [...baseFeatures];
    
    if (stylePreference && styleFeatures[stylePreference as keyof typeof styleFeatures]) {
      features.push(...styleFeatures[stylePreference as keyof typeof styleFeatures]);
    }
    
    if (climateZone && climateFeatures[climateZone as keyof typeof climateFeatures]) {
      features.push(...climateFeatures[climateZone as keyof typeof climateFeatures]);
    }
    
    return features.slice(0, 6); // Limit to 6 features
  }

  private static generateStyleMaterials(stylePreference?: string, climateZone?: string): string[] {
    const baseMaterials = ['Concrete', 'Steel', 'Glass'];
    const styleMaterials = {
      'modern': ['Aluminum', 'Composite panels', 'Large format tiles'],
      'traditional': ['Brick', 'Natural stone', 'Wood siding'],
      'contemporary': ['Fiber cement', 'Metal panels', 'Natural wood']
    };
    
    const climateMaterials = {
      'hot': ['Light-colored stone', 'Reflective roofing', 'Insulated panels'],
      'cold': ['Thermal brick', 'High-performance windows', 'Insulated siding'],
      'humid': ['Treated lumber', 'Composite materials', 'Ventilated cladding']
    };
    
    let materials = [...baseMaterials];
    
    if (stylePreference && styleMaterials[stylePreference as keyof typeof styleMaterials]) {
      materials.push(...styleMaterials[stylePreference as keyof typeof styleMaterials]);
    }
    
    if (climateZone && climateMaterials[climateZone as keyof typeof climateMaterials]) {
      materials.push(...climateMaterials[climateZone as keyof typeof climateMaterials]);
    }
    
    return [...new Set(materials)].slice(0, 6); // Remove duplicates and limit to 6
  }

  private static async getBaseElevationStyles(): Promise<ElevationStyle[]> {
    return [
      {
        id: 'modern-minimalist',
        name: 'Modern Minimalist',
        description: 'Clean lines, large windows, neutral colors with steel and glass elements',
        thumbnail: 'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=400',
        features: ['Floor-to-ceiling windows', 'Flat rooflines', 'Minimal ornamentation', 'Steel and glass facade'],
        materials: ['Concrete', 'Steel', 'Glass', 'Stone']
      },
      {
        id: 'contemporary-fusion',
        name: 'Contemporary Fusion',
        description: 'Mixed materials, asymmetrical design, bold architectural features',
        thumbnail: 'https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=400',
        features: ['Mixed textures', 'Large overhangs', 'Natural lighting', 'Open concepts'],
        materials: ['Wood', 'Stone', 'Metal', 'Stucco']
      }
    ];
  }

  private static getRandomImageId(): number {
    const imageIds = [1396132, 1115804, 1029599, 1370704, 1438832];
    return imageIds[Math.floor(Math.random() * imageIds.length)];
  }

  // Advanced chat responses with architectural expertise
  static async getExpertChatResponse(
    message: string,
    currentStep: string,
    project?: any,
    conversationHistory?: any[]
  ): Promise<string> {
    const context = this.analyzeMessageContext(message, currentStep, project);
    
    // Route to appropriate expert response
    if (context.type === 'cost') {
      return this.generateCostResponse(message, project);
    } else if (context.type === 'design') {
      return this.generateDesignResponse(message, currentStep, project);
    } else if (context.type === 'technical') {
      return this.generateTechnicalResponse(message, project);
    } else if (context.type === 'sustainability') {
      return this.generateSustainabilityResponse(message, project);
    } else {
      return this.generateContextualResponse(message, currentStep, project);
    }
  }

  private static analyzeMessageContext(message: string, currentStep: string, project?: any) {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('cost') || lowerMessage.includes('price') || lowerMessage.includes('budget')) {
      return { type: 'cost', confidence: 0.9 };
    } else if (lowerMessage.includes('design') || lowerMessage.includes('layout') || lowerMessage.includes('room')) {
      return { type: 'design', confidence: 0.8 };
    } else if (lowerMessage.includes('code') || lowerMessage.includes('regulation') || lowerMessage.includes('permit')) {
      return { type: 'technical', confidence: 0.9 };
    } else if (lowerMessage.includes('green') || lowerMessage.includes('sustainable') || lowerMessage.includes('energy')) {
      return { type: 'sustainability', confidence: 0.8 };
    } else {
      return { type: 'general', confidence: 0.5 };
    }
  }

  private static generateCostResponse(message: string, project?: any): string {
    if (!project) {
      return "I'd be happy to help with cost estimates! To provide accurate pricing, I'll need some project details. Could you share your plot size, number of floors, and basic requirements?";
    }

    const estimatedCost = project.plot.area * project.requirements.floors * 150;
    const costPerSqFt = 150;

    return `Based on your ${project.plot.area} sq ft plot with ${project.requirements.floors} floors, here's a preliminary cost estimate:

**Total Estimated Cost: $${estimatedCost.toLocaleString()}**
**Cost per sq ft: $${costPerSqFt}**

**Breakdown:**
• Foundation & Structure: $${Math.round(estimatedCost * 0.25).toLocaleString()} (25%)
• Framing & Roofing: $${Math.round(estimatedCost * 0.20).toLocaleString()} (20%)
• Systems (Plumbing/Electrical): $${Math.round(estimatedCost * 0.15).toLocaleString()} (15%)
• Finishes: $${Math.round(estimatedCost * 0.40).toLocaleString()} (40%)

*Note: Costs vary by location, materials, and finishes. This is a preliminary estimate for planning purposes.*

Would you like me to break down any specific category or discuss cost-saving strategies?`;
  }

  private static generateDesignResponse(message: string, currentStep: string, project?: any): string {
    const responses = {
      'input': `Great question about design! At this stage, focus on defining your lifestyle needs:

**Key Considerations:**
• **Family size & growth**: Plan for current and future needs
• **Lifestyle patterns**: How do you use spaces daily?
• **Entertainment style**: Formal vs casual gatherings
• **Work from home**: Dedicated office or flexible spaces?
• **Storage needs**: Built-in vs furniture storage

**Pro Tips:**
• Allocate 15-20% more space than you think you need
• Consider natural light patterns throughout the day
• Plan for aging in place with accessible design elements

What specific aspect of your requirements would you like to explore further?`,

      '2d-edit': `Excellent! Let's optimize your floor plan design:

**Layout Principles:**
• **Circulation**: Create clear pathways with 3-4 ft wide hallways
• **Zoning**: Group related functions (bedrooms near bathrooms)
• **Privacy**: Separate public (living) from private (bedroom) areas
• **Natural light**: Orient main rooms toward south for maximum daylight

**Room-Specific Tips:**
• **Kitchen**: Work triangle between sink, stove, refrigerator
• **Living areas**: 12+ ft width for comfortable furniture arrangement
• **Bedrooms**: Minimum 10x10 ft, with two egress points for safety
• **Bathrooms**: 5x8 ft minimum, consider ventilation

**Current Layout Analysis:**
${project ? `Your ${project.plot.area} sq ft design has good potential. Consider optimizing the flow between your ${project.requirements.bedrooms} bedrooms and common areas.` : 'Share your current layout for specific optimization suggestions!'}

What specific room or area would you like to focus on?`,

      '3d-view': `Perfect timing for 3D visualization insights!

**What to Look For:**
• **Proportions**: Do rooms feel appropriately sized?
• **Natural light**: Are spaces bright and welcoming?
• **Flow**: Can you move naturally between spaces?
• **Ceiling heights**: 9+ ft creates spacious feeling

**Interior Design Considerations:**
• **Color palette**: Light colors make spaces feel larger
• **Furniture scale**: Ensure pieces fit proportionally
• **Storage integration**: Built-ins maximize space efficiency
• **Lighting layers**: Ambient, task, and accent lighting

**Virtual Walkthrough Tips:**
• Experience the space at different times of day
• Consider furniture placement and traffic flow
• Evaluate sight lines and privacy between rooms

How does your design feel when you walk through it? Any areas that seem too cramped or oversized?`,

      'elevations': `Excellent choice focusing on exterior design! Your elevation style sets the entire character of your home.

**Style Selection Factors:**
• **Climate compatibility**: Materials suited to your weather
• **Neighborhood context**: Complement surrounding architecture
• **Maintenance requirements**: Consider long-term upkeep
• **Resale value**: Timeless styles maintain value better

**Material Considerations:**
• **Durability**: 20+ year lifespan for major materials
• **Energy efficiency**: Insulation and thermal performance
• **Sustainability**: Local materials reduce environmental impact
• **Cost**: Balance initial cost with maintenance expenses

**Current Recommendations:**
${project ? `For your ${project.requirements.floors}-floor design, consider styles that emphasize horizontal lines to balance the height. Materials like fiber cement or natural stone work well for durability.` : 'Share your style preferences for personalized recommendations!'}

What architectural style resonates most with your vision?`,

      'export': `Congratulations on reaching the final stage! Let's ensure you have everything needed for construction.

**Essential Documents:**
• **Architectural drawings**: Floor plans, elevations, sections
• **Structural plans**: Foundation and framing details
• **MEP drawings**: Mechanical, electrical, plumbing layouts
• **Specifications**: Material and finish schedules
• **Site plan**: Property boundaries and setbacks

**Construction Preparation:**
• **Permits**: Building, electrical, plumbing permits
• **Contractor selection**: Get 3+ detailed bids
• **Timeline**: Typical construction takes 6-12 months
• **Budget contingency**: Add 10-15% for unexpected costs

**Quality Control:**
• **Inspections**: Schedule at key milestones
• **Material verification**: Ensure specified products are used
• **Progress monitoring**: Regular site visits during construction

Your design is ready for the next phase! What aspect of the construction process would you like to discuss?`
    };

    return responses[currentStep as keyof typeof responses] || responses['input'];
  }

  private static generateTechnicalResponse(message: string, project?: any): string {
    return `I'll help you navigate the technical requirements and building codes.

**Key Building Code Areas:**
• **Structural**: Foundation design, load-bearing requirements
• **Fire safety**: Egress windows, smoke detectors, fire ratings
• **Accessibility**: ADA compliance for doorways and bathrooms
• **Energy efficiency**: Insulation, window performance, HVAC sizing

**Common Requirements:**
• **Bedroom egress**: Two exit routes (door + window)
• **Ceiling heights**: Minimum 7'6" in habitable rooms
• **Stair dimensions**: 36" width, 7.75" max rise, 10" min run
• **Bathroom ventilation**: Mechanical exhaust in windowless baths

**Permit Process:**
1. **Plan review**: Submit drawings to building department
2. **Corrections**: Address any code compliance issues
3. **Approval**: Receive building permit
4. **Inspections**: Schedule required inspections during construction

${project ? `For your ${project.plot.area} sq ft design, key considerations include proper foundation sizing for your soil conditions and ensuring adequate structural support for your ${project.requirements.floors}-floor layout.` : ''}

What specific code or technical aspect would you like me to explain in detail?`;
  }

  private static generateSustainabilityResponse(message: string, project?: any): string {
    return `Excellent focus on sustainability! Let's make your home environmentally responsible and energy-efficient.

**Energy Efficiency Strategies:**
• **Insulation**: High R-value walls, roof, and foundation
• **Windows**: Triple-pane, low-E coatings, proper orientation
• **HVAC**: High-efficiency systems, proper sizing, zoning
• **Air sealing**: Minimize air leaks for consistent temperatures

**Renewable Energy:**
• **Solar panels**: South-facing roof optimal for solar
• **Geothermal**: Efficient heating/cooling for suitable climates
• **Solar water heating**: Reduce water heating costs
• **Battery storage**: Store excess solar energy

**Sustainable Materials:**
• **Local sourcing**: Reduce transportation environmental impact
• **Recycled content**: Steel, concrete, insulation with recycled materials
• **Rapidly renewable**: Bamboo, cork, certified wood
• **Low VOC**: Paints, adhesives, finishes for indoor air quality

**Water Conservation:**
• **Low-flow fixtures**: Toilets, showerheads, faucets
• **Rainwater harvesting**: Collect for irrigation
• **Drought-resistant landscaping**: Native plants, efficient irrigation
• **Permeable surfaces**: Reduce stormwater runoff

**Sustainability Score Factors:**
${project ? `Your ${project.plot.area} sq ft design could achieve excellent sustainability with proper material selection and energy systems. Consider solar panel placement on your roof design.` : ''}

Which sustainability aspect interests you most - energy efficiency, materials, or water conservation?`;
  }

  private static generateContextualResponse(message: string, currentStep: string, project?: any): string {
    const stepContext = {
      'input': 'defining your project requirements',
      '2d-edit': 'optimizing your floor plan layout',
      '3d-view': 'visualizing your design in three dimensions',
      'elevations': 'selecting your exterior architectural style',
      'export': 'preparing your design for construction'
    };

    return `I'm here to help with ${stepContext[currentStep as keyof typeof stepContext]}! 

As your AI architectural assistant, I can provide expert guidance on:
• Design principles and best practices
• Building codes and regulations
• Cost estimation and budgeting
• Material selection and sustainability
• Construction planning and timelines

${project ? `For your current project (${project.plot.area} sq ft, ${project.requirements.floors} floors, ${project.requirements.bedrooms} bedrooms), ` : ''}I can offer specific recommendations based on your unique requirements.

What specific aspect would you like to explore? I'm here to ensure your design is both beautiful and functional!`;
  }

  // Image generation with architectural intelligence
  static async generateDesignImage(
    prompt: string,
    style: string,
    project?: any
  ): Promise<string> {
    // Enhanced prompt with architectural context
    const enhancedPrompt = this.enhanceImagePrompt(prompt, style, project);
    
    // In a real implementation, this would call DALL-E or Midjourney
    // For now, return a relevant architectural image
    const imageIds = [1396132, 1115804, 1029599, 1370704, 1438832, 2121121, 2102587];
    const randomId = imageIds[Math.floor(Math.random() * imageIds.length)];
    
    return `https://images.pexels.com/photos/${randomId}/pexels-photo-${randomId}.jpeg?auto=compress&cs=tinysrgb&w=1200`;
  }

  private static enhanceImagePrompt(prompt: string, style: string, project?: any): string {
    let enhancedPrompt = prompt;
    
    // Add architectural context
    if (project) {
      enhancedPrompt += ` for a ${project.requirements.floors}-floor home with ${project.requirements.bedrooms} bedrooms`;
    }
    
    // Add style context
    enhancedPrompt += ` in ${style} architectural style`;
    
    // Add quality and technical specifications
    enhancedPrompt += ', professional architectural rendering, high quality, detailed, realistic lighting, modern photography';
    
    return enhancedPrompt;
  }
}