import { Plot, Requirements, ElevationStyle, CostEstimate, PartialBlueprint, Material, Room, Wall, Door, Window } from '../types';

// Advanced AI Service with multiple AI capabilities
export class AIService {
  private static apiKey = import.meta.env.VITE_OPENAI_API_KEY || 'demo-key';
  private static baseUrl = 'https://api.openai.com/v1';

  // Chat completion for AI assistant
  static async getChatResponse(
    message: string, 
    context: string, 
    projectData?: any,
    conversationHistory: any[] = []
  ): Promise<string> {
    try {
      // In production, this would call OpenAI API
      // For demo, we'll use intelligent responses based on context and message
      return this.generateIntelligentResponse(message, context, projectData, conversationHistory);
    } catch (error) {
      console.error('AI Chat Error:', error);
      return "I'm here to help with your home design! Could you please rephrase your question?";
    }
  }

  // Generate images based on text descriptions
  static async generateDesignImage(
    description: string,
    style: string = 'modern',
    projectData?: any
  ): Promise<string> {
    try {
      // In production, this would call DALL-E or Midjourney API
      // For demo, we'll return appropriate placeholder images
      return this.getStyleBasedImage(description, style, projectData);
    } catch (error) {
      console.error('Image Generation Error:', error);
      return 'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=800';
    }
  }

  // Advanced blueprint generation with AI optimization
  static async generateBlueprint(plot: Plot, requirements: Requirements): Promise<any> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const optimizedDesign = this.generateOptimizedLayout(plot, requirements);
        resolve(optimizedDesign);
      }, 3000);
    });
  }

  // AI-powered elevation style generation
  static async generateElevationStyles(
    plot: Plot, 
    requirements: Requirements, 
    customPrompt?: string
  ): Promise<ElevationStyle[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const styles = this.generateCustomElevations(plot, requirements, customPrompt);
        resolve(styles);
      }, 4000);
    });
  }

  // Cost estimation with AI analysis
  static async calculateCosts(
    plot: Plot, 
    requirements: Requirements, 
    materials: any[],
    location?: string
  ): Promise<any> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const costAnalysis = this.generateCostAnalysis(plot, requirements, materials, location);
        resolve(costAnalysis);
      }, 2000);
    });
  }

  // Material recommendations based on climate and style
  static async recommendMaterials(
    plot: Plot,
    requirements: Requirements,
    style: string,
    climate?: string,
    budget?: number
  ): Promise<any[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const materials = this.generateMaterialRecommendations(plot, requirements, style, climate, budget);
        resolve(materials);
      }, 1500);
    });
  }

  // Building code compliance check
  static async checkBuildingCodes(
    design: any,
    location: string
  ): Promise<any> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const compliance = this.analyzeBuildingCompliance(design, location);
        resolve(compliance);
      }, 2000);
    });
  }

  // Energy efficiency analysis
  static async analyzeEnergyEfficiency(
    design: any,
    climate: string,
    materials: any[]
  ): Promise<any> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const analysis = this.generateEnergyAnalysis(design, climate, materials);
        resolve(analysis);
      }, 2500);
    });
  }

  // Private helper methods for intelligent responses
  private static generateIntelligentResponse(
    message: string, 
    context: string, 
    projectData?: any,
    history: any[] = []
  ): string {
    const lowerMessage = message.toLowerCase();
    
    // Context-aware responses
    const responses = {
      input: {
        room: [
          "For optimal room layout, consider natural light flow and daily usage patterns. Living areas should face south for maximum sunlight, while bedrooms can be oriented east for morning light.",
          "I recommend placing the kitchen near the dining area for better flow. Also, consider a pantry if space allows - it's incredibly useful for storage.",
          "For your bedroom count, remember that one room can serve multiple purposes. A study can double as a guest room with a sofa bed.",
          "Bathroom placement is crucial - try to group them together to minimize plumbing costs and maximize efficiency."
        ],
        plot: [
          "Your plot size determines the maximum built-up area. Generally, you can build on 60-70% of the plot, leaving space for gardens and parking.",
          "Consider the plot orientation - north-facing plots are ideal for natural lighting and ventilation in most climates.",
          "Leave adequate setbacks as per local building codes. This also provides space for future extensions.",
          "Think about drainage and slope - proper grading prevents water accumulation around your foundation."
        ],
        general: [
          "Start by listing your must-haves versus nice-to-haves. This helps prioritize space allocation.",
          "Consider your lifestyle - do you entertain often? Work from home? Have pets? These factors influence design decisions.",
          "Think about future needs - growing family, aging in place, or potential resale value.",
          "Budget for 10-15% contingency in your planning phase to handle unexpected requirements."
        ]
      },
      '2d-edit': {
        layout: [
          "Great question about room layout! For optimal flow, create clear pathways between frequently used spaces. Avoid placing the kitchen at the end of a long corridor.",
          "When positioning rooms, consider privacy levels - bedrooms should be away from main living areas, and the master suite deserves a quiet corner.",
          "Natural ventilation is key - try to create cross-ventilation by placing windows on opposite walls when possible.",
          "For families with children, keep kids' rooms visible from common areas for supervision while maintaining their privacy."
        ],
        walls: [
          "Load-bearing walls are typically thicker (8-12 inches) while partition walls can be 4-6 inches. I can help you identify which walls are structural.",
          "Consider acoustic privacy when placing walls - bedrooms and studies benefit from sound insulation.",
          "Interior walls don't always need to go floor-to-ceiling. Half walls can define spaces while maintaining openness.",
          "Remember that walls house utilities - plan for electrical outlets, switches, and plumbing runs early in the design."
        ],
        doors: [
          "Door placement affects furniture arrangement. Avoid doors that swing into furniture or block natural pathways.",
          "Standard door width is 32-36 inches, but consider 36 inches for main areas for better accessibility.",
          "Pocket doors are great space-savers in tight areas like powder rooms or closets.",
          "French doors or sliding doors work well for connecting indoor and outdoor spaces."
        ],
        windows: [
          "Window placement should balance natural light, ventilation, privacy, and views. Corner windows create dramatic lighting effects.",
          "For energy efficiency, limit large windows on west-facing walls to reduce afternoon heat gain.",
          "Consider window height - higher windows provide privacy while still allowing light.",
          "Clerestory windows are excellent for bringing light into interior spaces without compromising wall space."
        ]
      },
      '3d-view': {
        visualization: [
          "The 3D view helps you understand spatial relationships that aren't obvious in 2D. Pay attention to ceiling heights and room proportions.",
          "Use the walkthrough mode to experience the flow between spaces. Does the layout feel natural as you move through it?",
          "Check sight lines from key areas - can you see the entrance from the kitchen? Is there visual connection between living spaces?",
          "Consider how natural light moves through the space at different times of day using our lighting controls."
        ],
        materials: [
          "Material choices dramatically affect the feel of your space. Light colors make rooms feel larger, while dark colors create intimacy.",
          "Consider maintenance requirements - high-traffic areas need durable materials like tile or hardwood.",
          "Texture adds visual interest - combine smooth and textured surfaces for depth.",
          "Think about acoustics - hard surfaces reflect sound while soft materials absorb it."
        ]
      },
      elevations: {
        style: [
          "Your elevation style should complement your neighborhood while expressing your personality. Consider local architectural traditions.",
          "Modern styles emphasize clean lines and large windows, while traditional styles focus on symmetry and classic proportions.",
          "Climate influences style choices - steep roofs shed snow, while flat roofs work in dry climates.",
          "Consider maintenance - some materials require more upkeep than others. Factor this into your long-term planning."
        ],
        materials: [
          "Exterior materials should be durable and weather-resistant. Stone and brick age beautifully, while wood requires regular maintenance.",
          "Color choices affect energy efficiency - light colors reflect heat while dark colors absorb it.",
          "Mix textures for visual interest, but don't use too many different materials - it can look chaotic.",
          "Consider how materials will look in 10-20 years. Some age gracefully while others may look dated."
        ]
      },
      export: [
        "Your design is looking fantastic! The export phase lets you create professional documents for contractors and permits.",
        "PDF packages include all views and specifications. CAD files provide precise measurements for construction.",
        "Consider creating a material schedule and finish selections to accompany your plans.",
        "Don't forget to check local building codes and permit requirements before construction begins."
      ]
    };

    // Get context-specific responses
    const contextResponses = responses[context as keyof typeof responses];
    
    if (contextResponses) {
      // Check for specific keywords in the message
      if (lowerMessage.includes('room') || lowerMessage.includes('bedroom') || lowerMessage.includes('kitchen')) {
        const roomResponses = (contextResponses as any).room || (contextResponses as any).layout || contextResponses;
        return roomResponses[Math.floor(Math.random() * roomResponses.length)];
      }
      
      if (lowerMessage.includes('wall') || lowerMessage.includes('structure')) {
        const wallResponses = (contextResponses as any).walls || contextResponses;
        return wallResponses[Math.floor(Math.random() * wallResponses.length)];
      }
      
      if (lowerMessage.includes('door') || lowerMessage.includes('entrance')) {
        const doorResponses = (contextResponses as any).doors || contextResponses;
        return doorResponses[Math.floor(Math.random() * doorResponses.length)];
      }
      
      if (lowerMessage.includes('window') || lowerMessage.includes('light')) {
        const windowResponses = (contextResponses as any).windows || contextResponses;
        return windowResponses[Math.floor(Math.random() * windowResponses.length)];
      }
      
      if (lowerMessage.includes('material') || lowerMessage.includes('finish')) {
        const materialResponses = (contextResponses as any).materials || contextResponses;
        return materialResponses[Math.floor(Math.random() * materialResponses.length)];
      }
      
      if (lowerMessage.includes('style') || lowerMessage.includes('design')) {
        const styleResponses = (contextResponses as any).style || contextResponses;
        return styleResponses[Math.floor(Math.random() * styleResponses.length)];
      }
      
      if (lowerMessage.includes('cost') || lowerMessage.includes('budget') || lowerMessage.includes('price')) {
        return this.generateCostAdvice(projectData);
      }
      
      if (lowerMessage.includes('code') || lowerMessage.includes('regulation') || lowerMessage.includes('permit')) {
        return "Building codes vary by location, but generally require proper setbacks, height restrictions, and safety features. I recommend consulting with local authorities early in your design process.";
      }
      
      // Return a random response from the context
      const responseArray = Array.isArray(contextResponses) ? contextResponses : Object.values(contextResponses).flat();
      return responseArray[Math.floor(Math.random() * responseArray.length)];
    }

    // Fallback responses for general queries
    const generalResponses = [
      "That's a great question! In home design, every decision affects both function and aesthetics. What specific aspect would you like me to elaborate on?",
      "I'm here to guide you through every step of the design process. Based on your current project, I can provide specific recommendations.",
      "Home design is all about balancing your needs, budget, and style preferences. Let me help you find the perfect solution.",
      "Every great home starts with thoughtful planning. What particular challenge are you facing with your design?"
    ];

    return generalResponses[Math.floor(Math.random() * generalResponses.length)];
  }

  private static generateCostAdvice(projectData?: any): string {
    if (!projectData) {
      return "Construction costs vary significantly by location and material choices. Generally, expect $100-300 per square foot depending on finishes and complexity.";
    }

    const area = projectData.plot?.area || 2000;
    const lowEstimate = Math.round(area * 120);
    const highEstimate = Math.round(area * 280);

    return `Based on your ${area} sq ft design, construction costs typically range from $${lowEstimate.toLocaleString()} to $${highEstimate.toLocaleString()}. This includes basic to premium finishes. Factors affecting cost include foundation type, roof complexity, and finish selections.`;
  }

  private static getStyleBasedImage(description: string, style: string, projectData?: any): string {
    const imageMap = {
      modern: [
        'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      traditional: [
        'https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      contemporary: [
        'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=800'
      ]
    };

    const styleImages = imageMap[style as keyof typeof imageMap] || imageMap.modern;
    return styleImages[Math.floor(Math.random() * styleImages.length)];
  }

  private static generateOptimizedLayout(plot: Plot, requirements: Requirements): any {
    const scale = 20;
    const rooms: Room[] = [];
    const walls: Wall[] = [];
    const doors: Door[] = [];
    const windows: Window[] = [];

    // Generate optimized room layout based on best practices
    const plotWidth = plot.width * scale;
    const plotHeight = plot.length * scale;

    // Living room (front, largest space)
    if (requirements.livingRoom) {
      rooms.push({
        id: 'living-room',
        type: 'living-room',
        x: 20,
        y: 20,
        width: plotWidth * 0.4,
        height: plotHeight * 0.35,
        color: 'rgba(34, 197, 94, 0.3)'
      });
    }

    // Kitchen (connected to dining, service side)
    rooms.push({
      id: 'kitchen',
      type: 'kitchen',
      x: plotWidth * 0.45,
      y: 20,
      width: plotWidth * 0.3,
      height: plotHeight * 0.25,
      color: 'rgba(249, 115, 22, 0.3)'
    });

    // Dining room (adjacent to kitchen)
    if (requirements.diningRoom) {
      rooms.push({
        id: 'dining',
        type: 'dining',
        x: plotWidth * 0.45,
        y: plotHeight * 0.3,
        width: plotWidth * 0.3,
        height: plotHeight * 0.2,
        color: 'rgba(168, 85, 247, 0.3)'
      });
    }

    // Master bedroom (private zone, back of house)
    rooms.push({
      id: 'master-bedroom',
      type: 'bedroom',
      x: 20,
      y: plotHeight * 0.4,
      width: plotWidth * 0.35,
      height: plotHeight * 0.3,
      color: 'rgba(59, 130, 246, 0.3)'
    });

    // Additional bedrooms
    for (let i = 1; i < requirements.bedrooms; i++) {
      rooms.push({
        id: `bedroom-${i + 1}`,
        type: 'bedroom',
        x: plotWidth * 0.4 + (i - 1) * (plotWidth * 0.25),
        y: plotHeight * 0.55,
        width: plotWidth * 0.25,
        height: plotHeight * 0.25,
        color: 'rgba(59, 130, 246, 0.3)'
      });
    }

    // Bathrooms (efficient placement)
    for (let i = 0; i < requirements.bathrooms; i++) {
      rooms.push({
        id: `bathroom-${i + 1}`,
        type: 'bathroom',
        x: plotWidth * 0.8,
        y: 20 + i * (plotHeight * 0.15),
        width: plotWidth * 0.15,
        height: plotHeight * 0.12,
        color: 'rgba(236, 72, 153, 0.3)'
      });
    }

    // Study room (quiet zone)
    if (requirements.study) {
      rooms.push({
        id: 'study',
        type: 'study',
        x: plotWidth * 0.8,
        y: plotHeight * 0.4,
        width: plotWidth * 0.15,
        height: plotHeight * 0.15,
        color: 'rgba(20, 184, 166, 0.3)'
      });
    }

    // Generate walls, doors, and windows based on room layout
    this.generateStructuralElements(rooms, walls, doors, windows, plot, scale);

    return { rooms, walls, doors, windows };
  }

  private static generateStructuralElements(
    rooms: Room[], 
    walls: Wall[], 
    doors: Door[], 
    windows: Window[], 
    plot: Plot, 
    scale: number
  ): void {
    // Add exterior walls
    const plotWidth = plot.width * scale;
    const plotHeight = plot.length * scale;

    walls.push(
      { id: 'ext-wall-top', x1: 20, y1: 20, x2: plotWidth + 20, y2: 20, thickness: 8 },
      { id: 'ext-wall-right', x1: plotWidth + 20, y1: 20, x2: plotWidth + 20, y2: plotHeight + 20, thickness: 8 },
      { id: 'ext-wall-bottom', x1: plotWidth + 20, y1: plotHeight + 20, x2: 20, y2: plotHeight + 20, thickness: 8 },
      { id: 'ext-wall-left', x1: 20, y1: plotHeight + 20, x2: 20, y2: 20, thickness: 8 }
    );

    // Add interior walls between rooms
    rooms.forEach((room, index) => {
      // Add doors to each room
      doors.push({
        id: `door-${room.id}`,
        x: room.x + room.width - 15,
        y: room.y + room.height / 2,
        width: 30,
        rotation: 0
      });

      // Add windows to exterior rooms
      if (room.type === 'living-room' || room.type.includes('bedroom')) {
        windows.push({
          id: `window-${room.id}`,
          x: room.x + room.width / 2,
          y: room.y,
          width: 40,
          height: 6
        });
      }
    });
  }

  private static generateCustomElevations(
    plot: Plot, 
    requirements: Requirements, 
    customPrompt?: string
  ): ElevationStyle[] {
    const baseStyles: ElevationStyle[] = [
      {
        id: 'ai-optimized',
        name: `AI Optimized for ${plot.width}×${plot.length} Plot`,
        description: `Custom design optimized for your ${requirements.floors}-floor home with ${requirements.bedrooms} bedrooms`,
        thumbnail: 'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=400',
        features: [
          `Optimized for ${plot.area} sq ft plot`,
          `${requirements.floors}-story design`,
          `${requirements.bedrooms} bedroom layout integration`,
          'Climate-responsive features',
          'Energy-efficient orientation',
          'Natural lighting optimization'
        ],
        materials: ['Smart Glass', 'Composite Materials', 'Energy-efficient Insulation', 'Solar-ready Roofing']
      },
      {
        id: 'ai-sustainable',
        name: 'AI Eco-Friendly Design',
        description: 'Sustainable design with energy-efficient features and natural materials',
        thumbnail: 'https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=400',
        features: [
          'Solar panel integration',
          'Rainwater harvesting system',
          'Natural ventilation design',
          'Green roof options',
          'Passive cooling strategies',
          'Sustainable material selection'
        ],
        materials: ['Recycled Steel', 'Bamboo', 'Reclaimed Wood', 'Low-E Glass', 'Cork Flooring']
      },
      {
        id: 'ai-smart-home',
        name: 'AI Smart Home Integration',
        description: 'Future-ready design with smart home technology integration',
        thumbnail: 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=400',
        features: [
          'Smart lighting integration',
          'Automated climate control',
          'Security system ready',
          'EV charging station',
          'Home automation wiring',
          'Voice control compatibility'
        ],
        materials: ['Smart Glass', 'Fiber Cement', 'Aluminum Composite', 'LED-integrated Materials']
      }
    ];

    if (customPrompt) {
      baseStyles.unshift({
        id: 'ai-custom-prompt',
        name: 'AI Custom Design',
        description: `Custom design based on your vision: "${customPrompt.substring(0, 100)}..."`,
        thumbnail: 'https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg?auto=compress&cs=tinysrgb&w=400',
        features: [
          'Custom AI interpretation',
          'Personalized design elements',
          'Unique architectural features',
          'Tailored material selection',
          'Style preference integration',
          'Lifestyle-based optimization'
        ],
        materials: ['Custom Selection', 'Premium Materials', 'Specialty Finishes', 'Designer Elements']
      });
    }

    return baseStyles;
  }

  private static generateCostAnalysis(
    plot: Plot, 
    requirements: Requirements, 
    materials: any[],
    location?: string
  ): any {
    const baseCostPerSqFt = location === 'urban' ? 180 : location === 'suburban' ? 150 : 120;
    const totalCost = plot.area * baseCostPerSqFt;
    
    // Adjust for complexity
    const complexityMultiplier = 1 + (requirements.floors - 1) * 0.15 + (requirements.bathrooms - 1) * 0.05;
    const adjustedCost = totalCost * complexityMultiplier;

    return {
      totalCost: Math.round(adjustedCost),
      costPerSqFt: Math.round(adjustedCost / plot.area),
      breakdown: [
        { category: 'Foundation & Structure', cost: Math.round(adjustedCost * 0.25), percentage: 25 },
        { category: 'Walls & Roofing', cost: Math.round(adjustedCost * 0.30), percentage: 30 },
        { category: 'Flooring & Finishes', cost: Math.round(adjustedCost * 0.20), percentage: 20 },
        { category: 'Windows & Doors', cost: Math.round(adjustedCost * 0.10), percentage: 10 },
        { category: 'Plumbing & Electrical', cost: Math.round(adjustedCost * 0.10), percentage: 10 },
        { category: 'HVAC & Systems', cost: Math.round(adjustedCost * 0.05), percentage: 5 }
      ],
      timeline: {
        planning: '2-4 weeks',
        permits: '4-8 weeks',
        construction: `${Math.ceil(plot.area / 500) * 4}-${Math.ceil(plot.area / 500) * 6} months`,
        finishing: '4-6 weeks'
      },
      factors: [
        'Location and local labor costs',
        'Material quality and availability',
        'Site conditions and accessibility',
        'Permit and inspection fees',
        'Seasonal construction variations'
      ]
    };
  }

  private static generateMaterialRecommendations(
    plot: Plot,
    requirements: Requirements,
    style: string,
    climate?: string,
    budget?: number
  ): any[] {
    const materials = [
      {
        category: 'Exterior Walls',
        options: [
          { name: 'Fiber Cement Siding', cost: 8, durability: 9, maintenance: 8, climate: ['temperate', 'humid'] },
          { name: 'Brick Veneer', cost: 6, durability: 10, maintenance: 9, climate: ['all'] },
          { name: 'Natural Stone', cost: 4, durability: 10, maintenance: 7, climate: ['dry', 'temperate'] },
          { name: 'Stucco', cost: 7, durability: 7, maintenance: 6, climate: ['dry', 'warm'] }
        ]
      },
      {
        category: 'Roofing',
        options: [
          { name: 'Asphalt Shingles', cost: 8, durability: 6, maintenance: 7, climate: ['temperate'] },
          { name: 'Metal Roofing', cost: 6, durability: 9, maintenance: 9, climate: ['all'] },
          { name: 'Clay Tiles', cost: 5, durability: 9, maintenance: 8, climate: ['warm', 'dry'] },
          { name: 'Slate', cost: 3, durability: 10, maintenance: 9, climate: ['temperate', 'cold'] }
        ]
      },
      {
        category: 'Windows',
        options: [
          { name: 'Double-Pane Vinyl', cost: 8, efficiency: 7, maintenance: 9, climate: ['temperate'] },
          { name: 'Triple-Pane Fiberglass', cost: 6, efficiency: 9, maintenance: 8, climate: ['cold'] },
          { name: 'Low-E Glass', cost: 7, efficiency: 8, maintenance: 8, climate: ['all'] }
        ]
      }
    ];

    return materials;
  }

  private static analyzeBuildingCompliance(design: any, location: string): any {
    return {
      compliant: true,
      issues: [],
      recommendations: [
        'Verify local setback requirements',
        'Check height restrictions for your zone',
        'Ensure adequate parking spaces',
        'Confirm fire safety requirements',
        'Review accessibility standards'
      ],
      permits: [
        'Building Permit',
        'Electrical Permit',
        'Plumbing Permit',
        'HVAC Permit'
      ],
      timeline: '6-12 weeks for permit approval'
    };
  }

  private static generateEnergyAnalysis(design: any, climate: string, materials: any[]): any {
    return {
      efficiency: 'B+',
      annualCost: 1800,
      recommendations: [
        'Add solar panels for 40% energy reduction',
        'Upgrade to triple-pane windows',
        'Improve insulation in attic and walls',
        'Install programmable thermostat',
        'Consider geothermal heating/cooling'
      ],
      savings: {
        solar: { cost: 15000, savings: 720, payback: '12 years' },
        insulation: { cost: 3000, savings: 240, payback: '8 years' },
        windows: { cost: 8000, savings: 180, payback: '15 years' }
      }
    };
  }
}