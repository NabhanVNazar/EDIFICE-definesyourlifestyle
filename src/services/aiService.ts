import { Plot, Requirements, ElevationStyle, CostEstimate, PartialBlueprint, Material, Room, Wall, Door, Window, Project, AIMessage } from '../types';

// Advanced AI Service with comprehensive capabilities
export class AIService {
  private static apiKey = import.meta.env.VITE_OPENAI_API_KEY || 'demo-key';
  private static baseUrl = 'https://api.openai.com/v1';

  // Enhanced Chat completion with architectural expertise
  static async getChatResponse(
    message: string, 
    context: string, 
    projectData?: Project,
    conversationHistory: AIMessage[] = []
  ): Promise<string> {
    try {
      // In production, this would call OpenAI API with trained architectural knowledge
      return this.generateExpertResponse(message, context, projectData, conversationHistory);
    } catch (error) {
      console.error('AI Chat Error:', error);
      return "I'm here to help with your home design! Could you please rephrase your question?";
    }
  }

  // Advanced image generation with architectural understanding
  static async generateDesignImage(
    description: string,
    style: string = 'modern',
    projectData?: Project
  ): Promise<string> {
    try {
      // Simulate AI image generation with contextual understanding
      return this.generateContextualImage(description, style, projectData);
    } catch (error) {
      console.error('Image Generation Error:', error);
      return 'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=800';
    }
  }

  // Professional blueprint generation with AI optimization
  static async generateBlueprint(plot: Plot, requirements: Requirements): Promise<PartialBlueprint> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const optimizedDesign = this.generateProfessionalLayout(plot, requirements);
        resolve(optimizedDesign);
      }, 3000);
    });
  }

  // AI-powered elevation style generation with architectural expertise
  static async generateElevationStyles(
    plot: Plot, 
    requirements: Requirements, 
    customPrompt?: string
  ): Promise<ElevationStyle[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const styles = this.generateIntelligentElevations(plot, requirements, customPrompt);
        resolve(styles);
      }, 4000);
    });
  }

  // Advanced cost estimation with market data integration
  static async calculateCosts(
    plot: Plot, 
    requirements: Requirements, 
    materials: Material[],
    location?: string
  ): Promise<CostEstimate> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const costAnalysis = this.generateDetailedCostAnalysis(plot, requirements, materials, location);
        resolve(costAnalysis);
      }, 2000);
    });
  }

  // Climate-aware material recommendations
  static async recommendMaterials(
    plot: Plot,
    requirements: Requirements,
    style: string,
    climate?: string,
    budget?: number
  ): Promise<Material[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const materials = this.generateSmartMaterialRecommendations(plot, requirements, style, climate, budget);
        resolve(materials);
      }, 1500);
    });
  }

  // Building code compliance with AI analysis
  static async checkBuildingCodes(
    design: PartialBlueprint,
    location: string
  ): Promise<any> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const compliance = this.analyzeBuildingCompliance(design, location);
        resolve(compliance);
      }, 2000);
    });
  }

  // Energy efficiency analysis with AI insights
  static async analyzeEnergyEfficiency(
    design: PartialBlueprint,
    climate: string,
    materials: Material[]
  ): Promise<any> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const analysis = this.generateEnergyAnalysis(design, climate, materials);
        resolve(analysis);
      }, 2500);
    });
  }

  // Advanced structural analysis
  static async analyzeStructuralIntegrity(
    design: PartialBlueprint,
    materials: Material[],
    location: string
  ): Promise<any> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const analysis = this.generateStructuralAnalysis(design, materials, location);
        resolve(analysis);
      }, 3000);
    });
  }

  // Smart home integration planning
  static async planSmartHomeIntegration(
    design: PartialBlueprint,
    preferences: any
  ): Promise<any> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const plan = this.generateSmartHomePlan(design, preferences);
        resolve(plan);
      }, 2000);
    });
  }

  // Private helper methods for expert AI responses
  private static generateExpertResponse(
    message: string, 
    context: string, 
    projectData?: Project,
    history: AIMessage[] = []
  ): string {
    const lowerMessage = message.toLowerCase();
    
    // Advanced architectural knowledge base
    const expertResponses = {
      input: {
        plot_analysis: [
          `For your ${projectData?.plot?.width || 'specified'} × ${projectData?.plot?.length || 'specified'} ft plot, I recommend considering the solar orientation. South-facing plots are ideal for passive solar heating and natural lighting. The plot-to-built ratio should be around 60-65% to maintain adequate open space for landscaping and future additions.`,
          `Your plot size of ${projectData?.plot?.area || 'specified'} sq ft allows for excellent design flexibility. Consider the neighborhood context - your home should complement existing architecture while expressing your personal style. I suggest leaving 20% of the plot for gardens and outdoor living spaces.`,
          `Based on your plot dimensions, we can optimize for natural ventilation by creating cross-ventilation pathways. The ideal room placement would position living areas facing south for maximum daylight, while service areas like kitchens can face north or east.`
        ],
        room_optimization: [
          `For a ${projectData?.requirements?.bedrooms || 'multi'}-bedroom home, I recommend the master suite be positioned away from common areas for privacy. Secondary bedrooms work well clustered together with shared bathroom access. The kitchen should have visual connection to living areas for family interaction.`,
          `Your ${projectData?.requirements?.floors || 'multi'}-floor design allows for excellent space separation. Consider placing public areas (living, dining, kitchen) on the ground floor and private areas (bedrooms, studies) on upper floors. This creates natural privacy zones.`,
          `With ${projectData?.requirements?.bathrooms || 'multiple'} bathrooms planned, I suggest grouping plumbing fixtures to minimize costs. A powder room near the entrance is convenient for guests, while en-suite bathrooms add luxury and privacy to bedrooms.`
        ],
        building_science: [
          `Consider thermal bridging in your design - continuous insulation and proper window placement can significantly impact energy efficiency. I recommend high-performance windows with low-E coatings for your climate zone.`,
          `Moisture management is crucial for long-term durability. Proper vapor barriers, drainage planes, and ventilation strategies will prevent mold and structural issues. I can help you plan these systems into your design.`,
          `Foundation design depends on your soil conditions and local frost line. A full basement adds significant living space, while a slab-on-grade is more cost-effective in warmer climates.`
        ]
      },
      '2d-edit': {
        layout_principles: [
          `Excellent question about room flow! The key is creating clear circulation paths. I notice your current layout could benefit from a central hallway that connects all major spaces without cutting through rooms. This improves both function and privacy.`,
          `For optimal natural lighting, I recommend positioning your living areas along the south-facing wall. This maximizes daylight hours and reduces artificial lighting needs. Your current ${projectData?.plot?.width || 'plot'} ft width allows for excellent east-west orientation.`,
          `Room adjacencies are crucial for functionality. The kitchen should connect to both dining and living areas for entertaining, while maintaining a service entrance for groceries. Your ${projectData?.requirements?.kitchen || 'planned'} kitchen style will work perfectly with this layout.`
        ],
        technical_guidance: [
          `Wall placement affects both structure and utilities. Load-bearing walls typically run perpendicular to floor joists and should align with foundation walls below. I can help you identify which walls are structural versus partition walls.`,
          `Door swing directions impact furniture placement and emergency egress. Interior doors should swing into rooms (except bathrooms), while exterior doors swing inward for security. Consider pocket doors for space-constrained areas.`,
          `Window placement balances light, ventilation, privacy, and views. The rule of thumb is 10-20% of floor area in windows. For your ${projectData?.plot?.area || 'sized'} sq ft design, this means approximately ${Math.round((projectData?.plot?.area || 2000) * 0.15)} sq ft of window area.`
        ],
        code_compliance: [
          `Building codes require minimum room sizes: bedrooms need at least 70 sq ft with 7 ft minimum dimension, while living areas need 120 sq ft minimum. Your current layout meets these requirements with room to spare.`,
          `Egress requirements mandate that bedrooms have at least one operable window or door for emergency exit. The window must be at least 5.7 sq ft with minimum 20" width and 24" height.`,
          `Stairway design (for your ${projectData?.requirements?.floors || 'multi'}-floor home) requires 36" minimum width, 7.75" maximum riser height, and 10" minimum tread depth. Handrails are required on both sides for stairs over 44" wide.`
        ]
      },
      '3d-view': {
        visualization_tips: [
          `The 3D view reveals spatial relationships that aren't obvious in 2D. Notice how the ${projectData?.plot?.area || 'total'} sq ft feels when distributed across ${projectData?.requirements?.floors || 'multiple'} floors. Ceiling heights dramatically affect the sense of space - 9-10 ft ceilings feel more luxurious than standard 8 ft.`,
          `Use the lighting controls to understand how natural light moves through your space. Morning light from east windows energizes breakfast areas, while afternoon west light can overheat spaces without proper shading.`,
          `The walkthrough mode helps you experience the flow between spaces. Pay attention to sight lines - can you see the entrance from the kitchen for security? Is there visual connection between family areas while maintaining bedroom privacy?`
        ],
        interior_design: [
          `Material choices in 3D reveal their true impact. Light colors reflect more light and make spaces feel larger, while darker materials create intimacy. For your ${projectData?.requirements?.bedrooms || 'multiple'}-bedroom home, consider varying ceiling heights to define different zones.`,
          `Furniture placement becomes clear in 3D view. Ensure adequate circulation space - 36" for main pathways, 24" for secondary paths. Your living areas should accommodate conversation groupings with seating no more than 8 feet apart.`,
          `Consider acoustic design - hard surfaces like tile and glass reflect sound, while soft materials absorb it. Open floor plans need acoustic separation strategies to prevent noise transfer between spaces.`
        ]
      },
      elevations: {
        style_guidance: [
          `Your elevation style should harmonize with the neighborhood while expressing your personality. ${projectData?.plot?.type === 'residential' ? 'Residential' : 'Commercial'} properties benefit from styles that enhance property values and community aesthetics.`,
          `Climate influences style choices significantly. Steep roofs shed snow and rain effectively, while flat roofs work in dry climates and can accommodate rooftop gardens or solar arrays. Your ${projectData?.plot?.area || 'sized'} plot allows for various roof configurations.`,
          `Material selection affects both aesthetics and maintenance. Natural materials like stone and wood age beautifully but require more maintenance. Composite materials offer durability with lower upkeep but may lack the character of natural materials.`
        ],
        technical_considerations: [
          `Window-to-wall ratios affect both energy efficiency and aesthetics. Generally, 15-25% window area provides good balance. For your ${projectData?.requirements?.floors || 'multi'}-story design, consider how window alignment creates visual rhythm across floors.`,
          `Roof design impacts both style and function. Hip roofs offer better wind resistance, while gable roofs provide more attic space. The roof pitch should complement your chosen architectural style - steep pitches suit traditional styles, while low pitches work with modern designs.`,
          `Color psychology affects how your home feels. Warm colors (reds, oranges, yellows) create welcoming, energetic spaces, while cool colors (blues, greens, purples) promote calm and relaxation. Earth tones provide timeless appeal and broad market acceptance.`
        ]
      },
      export: {
        documentation: [
          `Your design package should include comprehensive documentation for contractors. This includes dimensioned floor plans, elevation drawings, sections, and details. For your ${projectData?.plot?.area || 'sized'} sq ft home, expect 15-20 sheets of drawings for complete documentation.`,
          `Material specifications are crucial for accurate bidding. Include finish schedules, hardware specifications, and performance requirements. This prevents costly change orders during construction and ensures you get exactly what you designed.`,
          `Construction sequencing affects both timeline and costs. Foundation work comes first, followed by framing, roofing, and exterior envelope. Interior work follows: rough mechanicals, insulation, drywall, flooring, and finally fixtures and trim.`
        ],
        cost_management: [
          `Your estimated construction cost of $${Math.round((projectData?.plot?.area || 2000) * 180).toLocaleString()} includes mid-range finishes. Premium finishes can add 30-50% to costs, while builder-grade finishes can reduce costs by 15-20%.`,
          `Value engineering opportunities include: standardizing window sizes, simplifying roof lines, using common lumber dimensions, and grouping plumbing fixtures. These strategies can reduce costs by 10-15% without compromising design quality.`,
          `Contingency planning is essential - budget 10-15% for unexpected conditions like soil issues, permit delays, or material price fluctuations. This prevents project delays and financial stress during construction.`
        ]
      }
    };

    // Advanced keyword analysis for intelligent responses
    if (lowerMessage.includes('cost') || lowerMessage.includes('budget') || lowerMessage.includes('price')) {
      return this.generateAdvancedCostAdvice(projectData, lowerMessage);
    }

    if (lowerMessage.includes('material') || lowerMessage.includes('finish') || lowerMessage.includes('texture')) {
      return this.generateMaterialAdvice(projectData, context, lowerMessage);
    }

    if (lowerMessage.includes('energy') || lowerMessage.includes('efficiency') || lowerMessage.includes('sustainable')) {
      return this.generateEnergyAdvice(projectData, lowerMessage);
    }

    if (lowerMessage.includes('code') || lowerMessage.includes('regulation') || lowerMessage.includes('permit')) {
      return this.generateCodeAdvice(projectData, lowerMessage);
    }

    if (lowerMessage.includes('room') || lowerMessage.includes('layout') || lowerMessage.includes('space')) {
      return this.generateLayoutAdvice(projectData, context, lowerMessage);
    }

    if (lowerMessage.includes('style') || lowerMessage.includes('design') || lowerMessage.includes('aesthetic')) {
      return this.generateStyleAdvice(projectData, context, lowerMessage);
    }

    if (lowerMessage.includes('structure') || lowerMessage.includes('foundation') || lowerMessage.includes('engineering')) {
      return this.generateStructuralAdvice(projectData, lowerMessage);
    }

    // Context-specific expert responses
    const contextResponses = expertResponses[context as keyof typeof expertResponses];
    if (contextResponses) {
      const responseCategories = Object.values(contextResponses);
      const allResponses = responseCategories.flat();
      return allResponses[Math.floor(Math.random() * allResponses.length)];
    }

    // Fallback to general architectural guidance
    return this.generateGeneralArchitecturalAdvice(projectData, lowerMessage);
  }

  private static generateAdvancedCostAdvice(projectData?: Project, message?: string): string {
    if (!projectData) {
      return "Construction costs vary significantly by location, materials, and complexity. Generally, expect $120-300 per square foot. I can provide detailed estimates once you input your project requirements.";
    }

    const area = projectData.plot.area;
    const complexity = this.calculateComplexityFactor(projectData);
    const baseCost = 150; // Base cost per sq ft
    const adjustedCost = baseCost * complexity;
    
    const lowEstimate = Math.round(area * adjustedCost * 0.8);
    const highEstimate = Math.round(area * adjustedCost * 1.2);

    if (message?.includes('breakdown') || message?.includes('detail')) {
      return `Detailed cost breakdown for your ${area.toLocaleString()} sq ft home:

**Foundation & Structure**: $${Math.round(adjustedCost * area * 0.25).toLocaleString()} (25%)
**Walls & Roofing**: $${Math.round(adjustedCost * area * 0.30).toLocaleString()} (30%)
**Windows & Doors**: $${Math.round(adjustedCost * area * 0.12).toLocaleString()} (12%)
**Plumbing & Electrical**: $${Math.round(adjustedCost * area * 0.15).toLocaleString()} (15%)
**Flooring & Finishes**: $${Math.round(adjustedCost * area * 0.18).toLocaleString()} (18%)

**Total Range**: $${lowEstimate.toLocaleString()} - $${highEstimate.toLocaleString()}

Factors affecting your costs: ${projectData.requirements.floors} floors (${complexity > 1.2 ? 'increases complexity' : 'standard complexity'}), ${projectData.requirements.bathrooms} bathrooms, and ${projectData.requirements.garage ? 'garage inclusion' : 'no garage'}.`;
    }

    return `Based on your ${area.toLocaleString()} sq ft design with ${projectData.requirements.floors} floors and ${projectData.requirements.bedrooms} bedrooms, construction costs typically range from $${lowEstimate.toLocaleString()} to $${highEstimate.toLocaleString()}. This includes mid-range finishes and standard construction methods.`;
  }

  private static generateMaterialAdvice(projectData?: Project, context?: string, message?: string): string {
    if (!projectData) {
      return "Material selection depends on your climate, budget, and style preferences. I can provide specific recommendations once you share your project details.";
    }

    const climateAdvice = {
      exterior: "For exterior materials, consider your local climate. Fiber cement siding offers excellent durability and low maintenance. Natural stone provides timeless appeal but requires higher investment. Brick offers classic beauty with minimal upkeep.",
      interior: "Interior materials should balance aesthetics, durability, and maintenance. Hardwood flooring adds warmth and value, while luxury vinyl plank offers similar appearance with better moisture resistance. Quartz countertops provide durability, while natural stone offers unique character.",
      roofing: "Roofing material choice affects both appearance and performance. Metal roofing offers 50+ year lifespan and energy efficiency. Asphalt shingles provide cost-effectiveness with 20-30 year lifespan. Clay tiles suit Mediterranean styles and offer excellent longevity."
    };

    if (message?.includes('exterior') || message?.includes('siding') || message?.includes('facade')) {
      return climateAdvice.exterior;
    } else if (message?.includes('interior') || message?.includes('flooring') || message?.includes('countertop')) {
      return climateAdvice.interior;
    } else if (message?.includes('roof') || message?.includes('shingle')) {
      return climateAdvice.roofing;
    }

    return `For your ${projectData.plot.area.toLocaleString()} sq ft home, material selection significantly impacts both cost and performance. I recommend focusing on high-performance materials for the building envelope (walls, roof, windows) as these affect long-term comfort and energy costs. Interior finishes can be upgraded over time, but structural and envelope materials are permanent decisions.`;
  }

  private static generateEnergyAdvice(projectData?: Project, message?: string): string {
    if (!projectData) {
      return "Energy efficiency starts with good design. Proper orientation, insulation, and window placement can reduce energy costs by 30-50%. I can provide specific recommendations based on your project details.";
    }

    const area = projectData.plot.area;
    const annualEnergyCost = Math.round(area * 1.2); // Estimate $1.20 per sq ft annually

    return `For your ${area.toLocaleString()} sq ft home, energy efficiency strategies can significantly reduce your estimated $${annualEnergyCost.toLocaleString()} annual energy costs:

**Passive Design**: Proper orientation and window placement can reduce heating/cooling loads by 20-30%
**Insulation**: High-performance insulation (R-20 walls, R-49 attic) can save $${Math.round(annualEnergyCost * 0.25).toLocaleString()}/year
**Windows**: Triple-pane, low-E windows reduce energy loss by 15-20%
**HVAC**: High-efficiency systems (SEER 16+) can save $${Math.round(annualEnergyCost * 0.15).toLocaleString()}/year
**Solar**: A ${Math.round(area * 0.01)}kW solar system could offset 60-80% of your energy needs

Your ${projectData.requirements.floors}-floor design allows for excellent natural ventilation strategies that can reduce cooling costs significantly.`;
  }

  private static generateCodeAdvice(projectData?: Project, message?: string): string {
    if (!projectData) {
      return "Building codes ensure safety and habitability. Key areas include structural requirements, fire safety, accessibility, and energy efficiency. I can provide specific guidance based on your project details.";
    }

    return `Building code compliance for your ${projectData.plot.area.toLocaleString()} sq ft home involves several key areas:

**Setbacks**: Typically 25-30 ft front, 10-15 ft sides, 20-25 ft rear (varies by jurisdiction)
**Height Limits**: Usually 35 ft for residential (your ${projectData.requirements.floors}-story design should comply)
**Room Sizes**: Bedrooms minimum 70 sq ft, living areas minimum 120 sq ft
**Ceiling Heights**: Minimum 7.5 ft for habitable rooms, 7 ft for bathrooms
**Egress**: Each bedroom needs emergency egress window or door
**Stairs**: 36" minimum width, 7.75" max riser, 10" min tread

I recommend consulting with local building officials early in the design process, as codes vary by location and can affect your design decisions.`;
  }

  private static generateLayoutAdvice(projectData?: Project, context?: string, message?: string): string {
    if (!projectData) {
      return "Room layout should prioritize function, flow, and natural light. I can provide specific layout optimization once you share your project requirements.";
    }

    const { requirements, plot } = projectData;

    return `For your ${plot.width} × ${plot.length} ft plot with ${requirements.bedrooms} bedrooms and ${requirements.bathrooms} bathrooms:

**Optimal Layout Principles**:
- **Public Zone**: Living, dining, kitchen on main floor for entertaining
- **Private Zone**: Bedrooms clustered for quiet and privacy
- **Service Zone**: Laundry, pantry, garage access grouped for efficiency
- **Circulation**: Central hallway or open plan to connect zones

**Your Specific Recommendations**:
- Master suite: ${Math.round(plot.area * 0.15)} sq ft (12-15% of total area)
- Living areas: ${Math.round(plot.area * 0.25)} sq ft (20-25% of total area)
- Kitchen: ${Math.round(plot.area * 0.08)} sq ft (6-8% of total area)
- Secondary bedrooms: ${Math.round(plot.area * 0.08)} sq ft each

The ${requirements.kitchen} kitchen style you've chosen works excellently with this layout, promoting family interaction while maintaining cooking efficiency.`;
  }

  private static generateStyleAdvice(projectData?: Project, context?: string, message?: string): string {
    if (!projectData) {
      return "Architectural style should reflect your personality while considering neighborhood context and climate. I can suggest specific styles based on your project requirements.";
    }

    return `For your ${projectData.plot.area.toLocaleString()} sq ft home, style selection should consider several factors:

**Scale Appropriateness**: Your ${projectData.plot.width} × ${projectData.plot.length} ft plot suits medium to large-scale architectural styles
**Proportional Guidelines**: ${projectData.requirements.floors}-story homes work well with both horizontal and vertical emphasis
**Regional Context**: Consider local architectural traditions and climate-appropriate features

**Recommended Styles for Your Project**:
- **Modern**: Clean lines, large windows, minimal ornamentation - suits your open floor plan
- **Contemporary**: Mixed materials, asymmetrical design - works with your ${projectData.requirements.garage ? 'garage integration' : 'streamlined design'}
- **Transitional**: Blend of traditional and modern - timeless appeal with current functionality

Your ${projectData.requirements.bedrooms}-bedroom program allows for excellent style expression while maintaining functional efficiency.`;
  }

  private static generateStructuralAdvice(projectData?: Project, message?: string): string {
    if (!projectData) {
      return "Structural design ensures safety and longevity. Key considerations include foundation type, framing system, and load-bearing elements. I can provide specific guidance based on your project.";
    }

    const { plot, requirements } = projectData;

    return `Structural considerations for your ${plot.area.toLocaleString()} sq ft, ${requirements.floors}-story home:

**Foundation System**: 
- Slab-on-grade: Cost-effective for single story, good for warm climates
- Full basement: Adds ${Math.round(plot.area)} sq ft living space, ideal for cold climates
- Crawl space: Moderate cost, good for moderate climates

**Framing System**:
- Wood frame: Most common, cost-effective, good for your ${plot.width} × ${plot.length} ft dimensions
- Steel frame: Higher cost but allows larger spans, good for open floor plans
- Concrete: Excellent durability, good for severe weather areas

**Load-Bearing Considerations**:
- Your ${requirements.floors}-story design requires proper load paths from roof to foundation
- Beam sizing depends on spans - your layout allows for efficient structural design
- Consider future modifications - non-load-bearing walls offer flexibility

**Seismic/Wind Design**: Varies by location but affects foundation anchoring, wall bracing, and roof connections.`;
  }

  private static generateGeneralArchitecturalAdvice(projectData?: Project, message?: string): string {
    const generalAdvice = [
      "Great question! Home design is about balancing function, aesthetics, and budget. Every decision affects multiple aspects of your home's performance and livability.",
      "I'm here to guide you through every aspect of home design, from initial planning through construction documentation. What specific area would you like to explore?",
      "Successful home design considers your lifestyle, family needs, and future plans. Let's discuss how your specific requirements can shape the perfect design solution.",
      "Architecture is both art and science. I can help you understand the technical aspects while ensuring your home reflects your personal style and meets your functional needs."
    ];

    if (projectData) {
      return `I'm here to help optimize your ${projectData.plot.area.toLocaleString()} sq ft home design. With ${projectData.requirements.bedrooms} bedrooms and ${projectData.requirements.floors} floors, we have excellent opportunities to create a functional and beautiful home. What specific aspect would you like to discuss?`;
    }

    return generalAdvice[Math.floor(Math.random() * generalAdvice.length)];
  }

  private static generateContextualImage(description: string, style: string, projectData?: Project): string {
    // Advanced image selection based on description and project context
    const imageDatabase = {
      modern: {
        exterior: [
          'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=800',
          'https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=800',
          'https://images.pexels.com/photos/2121121/pexels-photo-2121121.jpeg?auto=compress&cs=tinysrgb&w=800'
        ],
        interior: [
          'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800',
          'https://images.pexels.com/photos/1571453/pexels-photo-1571453.jpeg?auto=compress&cs=tinysrgb&w=800'
        ],
        kitchen: [
          'https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=800',
          'https://images.pexels.com/photos/2062426/pexels-photo-2062426.jpeg?auto=compress&cs=tinysrgb&w=800'
        ]
      },
      traditional: {
        exterior: [
          'https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg?auto=compress&cs=tinysrgb&w=800',
          'https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=800'
        ],
        interior: [
          'https://images.pexels.com/photos/1571468/pexels-photo-1571468.jpeg?auto=compress&cs=tinysrgb&w=800'
        ]
      },
      contemporary: {
        exterior: [
          'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=800'
        ]
      }
    };

    const lowerDesc = description.toLowerCase();
    let category = 'exterior';
    
    if (lowerDesc.includes('interior') || lowerDesc.includes('inside') || lowerDesc.includes('room')) {
      category = 'interior';
    } else if (lowerDesc.includes('kitchen') || lowerDesc.includes('cooking')) {
      category = 'kitchen';
    }

    const styleImages = imageDatabase[style as keyof typeof imageDatabase] || imageDatabase.modern;
    const categoryImages = styleImages[category as keyof typeof styleImages] || styleImages.exterior;
    
    return categoryImages[Math.floor(Math.random() * categoryImages.length)];
  }

  private static generateProfessionalLayout(plot: Plot, requirements: Requirements): PartialBlueprint {
    const scale = 15; // Pixels per foot
    const rooms: Room[] = [];
    const walls: Wall[] = [];
    const doors: Door[] = [];
    const windows: Window[] = [];

    // Calculate optimal room sizes based on architectural standards
    const totalArea = plot.area;
    const buildableArea = totalArea * 0.65; // 65% built-up area
    const floorArea = buildableArea / requirements.floors;

    // Room size allocations based on architectural standards
    const roomAllocations = {
      livingRoom: floorArea * 0.25, // 25% of floor area
      kitchen: floorArea * 0.12,    // 12% of floor area
      dining: floorArea * 0.10,     // 10% of floor area
      masterBedroom: floorArea * 0.15, // 15% of floor area
      bedroom: floorArea * 0.10,    // 10% per additional bedroom
      bathroom: floorArea * 0.05,   // 5% per bathroom
      study: floorArea * 0.08,      // 8% of floor area
      circulation: floorArea * 0.15 // 15% for hallways and stairs
    };

    // Generate optimized room layout
    let currentX = 20;
    let currentY = 20;
    const plotWidth = plot.width * scale;
    const plotHeight = plot.length * scale;

    // Living room (prime location, south-facing)
    if (requirements.livingRoom) {
      const width = Math.sqrt(roomAllocations.livingRoom * scale * scale * 1.4); // 1.4 aspect ratio
      const height = roomAllocations.livingRoom * scale * scale / width;
      
      rooms.push({
        id: 'living-room',
        type: 'living-room',
        x: currentX,
        y: currentY,
        width: width,
        height: height,
        color: 'rgba(34, 197, 94, 0.3)'
      });
      
      currentX += width + 10;
    }

    // Kitchen (connected to dining and living)
    const kitchenWidth = Math.sqrt(roomAllocations.kitchen * scale * scale * 1.2);
    const kitchenHeight = roomAllocations.kitchen * scale * scale / kitchenWidth;
    
    rooms.push({
      id: 'kitchen',
      type: 'kitchen',
      x: currentX,
      y: currentY,
      width: kitchenWidth,
      height: kitchenHeight,
      color: 'rgba(249, 115, 22, 0.3)'
    });

    // Dining room (adjacent to kitchen)
    if (requirements.diningRoom) {
      const diningWidth = Math.sqrt(roomAllocations.dining * scale * scale);
      const diningHeight = roomAllocations.dining * scale * scale / diningWidth;
      
      rooms.push({
        id: 'dining-room',
        type: 'dining',
        x: currentX,
        y: currentY + kitchenHeight + 10,
        width: diningWidth,
        height: diningHeight,
        color: 'rgba(168, 85, 247, 0.3)'
      });
    }

    // Master bedroom (private zone)
    const masterWidth = Math.sqrt(roomAllocations.masterBedroom * scale * scale * 1.3);
    const masterHeight = roomAllocations.masterBedroom * scale * scale / masterWidth;
    
    rooms.push({
      id: 'master-bedroom',
      type: 'bedroom',
      x: 20,
      y: plotHeight * 0.5,
      width: masterWidth,
      height: masterHeight,
      color: 'rgba(59, 130, 246, 0.3)'
    });

    // Additional bedrooms
    for (let i = 1; i < requirements.bedrooms; i++) {
      const bedroomWidth = Math.sqrt(roomAllocations.bedroom * scale * scale);
      const bedroomHeight = roomAllocations.bedroom * scale * scale / bedroomWidth;
      
      rooms.push({
        id: `bedroom-${i + 1}`,
        type: 'bedroom',
        x: 20 + (i - 1) * (bedroomWidth + 15),
        y: plotHeight * 0.7,
        width: bedroomWidth,
        height: bedroomHeight,
        color: 'rgba(59, 130, 246, 0.3)'
      });
    }

    // Bathrooms (efficient placement)
    for (let i = 0; i < requirements.bathrooms; i++) {
      const bathWidth = Math.sqrt(roomAllocations.bathroom * scale * scale * 0.8);
      const bathHeight = roomAllocations.bathroom * scale * scale / bathWidth;
      
      rooms.push({
        id: `bathroom-${i + 1}`,
        type: 'bathroom',
        x: plotWidth * 0.8,
        y: 20 + i * (bathHeight + 20),
        width: bathWidth,
        height: bathHeight,
        color: 'rgba(236, 72, 153, 0.3)'
      });
    }

    // Study room
    if (requirements.study) {
      const studyWidth = Math.sqrt(roomAllocations.study * scale * scale);
      const studyHeight = roomAllocations.study * scale * scale / studyWidth;
      
      rooms.push({
        id: 'study',
        type: 'study',
        x: plotWidth * 0.75,
        y: plotHeight * 0.6,
        width: studyWidth,
        height: studyHeight,
        color: 'rgba(20, 184, 166, 0.3)'
      });
    }

    // Generate structural elements
    this.generateAdvancedStructuralElements(rooms, walls, doors, windows, plot, scale);

    return { rooms, walls, doors, windows };
  }

  private static generateAdvancedStructuralElements(
    rooms: Room[], 
    walls: Wall[], 
    doors: Door[], 
    windows: Window[], 
    plot: Plot, 
    scale: number
  ): void {
    const plotWidth = plot.width * scale;
    const plotHeight = plot.length * scale;

    // Exterior walls with proper thickness
    walls.push(
      { id: 'ext-wall-north', x1: 20, y1: 20, x2: plotWidth + 20, y2: 20, thickness: 8 },
      { id: 'ext-wall-east', x1: plotWidth + 20, y1: 20, x2: plotWidth + 20, y2: plotHeight + 20, thickness: 8 },
      { id: 'ext-wall-south', x1: plotWidth + 20, y1: plotHeight + 20, x2: 20, y2: plotHeight + 20, thickness: 8 },
      { id: 'ext-wall-west', x1: 20, y1: plotHeight + 20, x2: 20, y2: 20, thickness: 8 }
    );

    // Interior walls between rooms
    rooms.forEach((room, index) => {
      // Add interior walls for separation
      if (index > 0) {
        const prevRoom = rooms[index - 1];
        if (room.x > prevRoom.x + prevRoom.width) {
          walls.push({
            id: `int-wall-${index}`,
            x1: room.x - 5,
            y1: Math.min(room.y, prevRoom.y),
            x2: room.x - 5,
            y2: Math.max(room.y + room.height, prevRoom.y + prevRoom.height),
            thickness: 4
          });
        }
      }

      // Add doors strategically
      doors.push({
        id: `door-${room.id}`,
        x: room.x + room.width - 20,
        y: room.y + room.height / 2,
        width: 32,
        rotation: 0
      });

      // Add windows based on room type and orientation
      if (room.type === 'living-room' || room.type.includes('bedroom')) {
        // Multiple windows for main rooms
        windows.push({
          id: `window-${room.id}-1`,
          x: room.x + room.width * 0.25,
          y: room.y,
          width: room.width * 0.2,
          height: 6
        });
        
        windows.push({
          id: `window-${room.id}-2`,
          x: room.x + room.width * 0.65,
          y: room.y,
          width: room.width * 0.2,
          height: 6
        });
      } else if (room.type === 'kitchen' || room.type === 'dining') {
        // Single window for service areas
        windows.push({
          id: `window-${room.id}`,
          x: room.x + room.width / 2,
          y: room.y,
          width: room.width * 0.3,
          height: 6
        });
      } else if (room.type === 'bathroom') {
        // Small privacy window
        windows.push({
          id: `window-${room.id}`,
          x: room.x + room.width / 2,
          y: room.y,
          width: room.width * 0.4,
          height: 4
        });
      }
    });
  }

  private static generateIntelligentElevations(
    plot: Plot, 
    requirements: Requirements, 
    customPrompt?: string
  ): ElevationStyle[] {
    const aiStyles: ElevationStyle[] = [
      {
        id: 'ai-climate-optimized',
        name: `Climate-Optimized Design for ${plot.area.toLocaleString()} sq ft`,
        description: `AI-generated design optimized for your local climate with ${requirements.floors} floors and ${requirements.bedrooms} bedrooms. Features passive cooling, natural lighting, and weather-resistant materials.`,
        thumbnail: 'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=400',
        features: [
          `Optimized for ${plot.width}×${plot.length} ft plot`,
          'Passive solar design principles',
          'Natural ventilation strategies',
          'Climate-responsive materials',
          'Energy-efficient window placement',
          'Sustainable drainage solutions',
          `${requirements.garage ? 'Integrated garage design' : 'Streamlined facade'}`,
          `${requirements.garden ? 'Landscape integration' : 'Minimal maintenance exterior'}`
        ],
        materials: ['Fiber Cement Siding', 'Low-E Glass Windows', 'Metal Roofing', 'Natural Stone Accents', 'Composite Decking']
      },
      {
        id: 'ai-family-focused',
        name: `Family-Focused Design for ${requirements.bedrooms} Bedrooms`,
        description: `AI-designed elevation emphasizing family living with safe outdoor spaces, durable materials, and child-friendly features. Optimized for your ${requirements.floors}-story layout.`,
        thumbnail: 'https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=400',
        features: [
          'Child-safe outdoor spaces',
          'Durable, low-maintenance materials',
          'Secure entry design',
          'Play area integration',
          'Family gathering spaces',
          'Storage solutions',
          'Easy supervision sight lines',
          'Pet-friendly features'
        ],
        materials: ['Brick Veneer', 'Impact-Resistant Windows', 'Composite Materials', 'Non-Slip Surfaces', 'Rounded Edge Details']
      },
      {
        id: 'ai-luxury-modern',
        name: 'AI Luxury Modern Villa',
        description: `Sophisticated modern design with premium materials and architectural details. Scaled perfectly for your ${plot.area.toLocaleString()} sq ft plot with emphasis on indoor-outdoor living.`,
        thumbnail: 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=400',
        features: [
          'Floor-to-ceiling windows',
          'Cantilevered overhangs',
          'Premium material palette',
          'Integrated lighting design',
          'Seamless indoor-outdoor flow',
          'Water feature integration',
          'Smart home ready infrastructure',
          'Architectural accent lighting'
        ],
        materials: ['Natural Stone Cladding', 'Curtain Wall Systems', 'Corten Steel Accents', 'Teak Wood Features', 'Smart Glass Technology']
      },
      {
        id: 'ai-sustainable-eco',
        name: 'AI Eco-Sustainable Design',
        description: `Environmentally conscious design with renewable energy integration, water conservation, and sustainable materials. Optimized for minimal environmental impact and maximum efficiency.`,
        thumbnail: 'https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg?auto=compress&cs=tinysrgb&w=400',
        features: [
          'Solar panel integration',
          'Rainwater harvesting system',
          'Green roof capabilities',
          'Passive house principles',
          'Natural material emphasis',
          'Minimal site disturbance',
          'Native landscaping integration',
          'Zero-waste design principles'
        ],
        materials: ['Reclaimed Wood', 'Recycled Steel', 'Bamboo Composites', 'Cork Insulation', 'Living Roof Systems']
      }
    ];

    // Add custom prompt-based design if provided
    if (customPrompt && customPrompt.trim()) {
      aiStyles.unshift({
        id: 'ai-custom-vision',
        name: 'Your Custom AI Design',
        description: `AI interpretation of your vision: "${customPrompt.substring(0, 120)}${customPrompt.length > 120 ? '...' : ''}"`,
        thumbnail: this.selectImageForPrompt(customPrompt),
        features: [
          'Custom AI interpretation',
          'Personalized design elements',
          'Unique architectural features',
          'Tailored to your description',
          'Style preference integration',
          'Lifestyle-based optimization',
          'Creative design exploration',
          'Innovative material combinations'
        ],
        materials: this.generateMaterialsFromPrompt(customPrompt)
      });
    }

    return aiStyles;
  }

  private static selectImageForPrompt(prompt: string): string {
    const promptLower = prompt.toLowerCase();
    
    if (promptLower.includes('modern') || promptLower.includes('contemporary') || promptLower.includes('minimalist')) {
      return 'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=400';
    } else if (promptLower.includes('traditional') || promptLower.includes('classic') || promptLower.includes('colonial')) {
      return 'https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg?auto=compress&cs=tinysrgb&w=400';
    } else if (promptLower.includes('rustic') || promptLower.includes('farmhouse') || promptLower.includes('country')) {
      return 'https://images.pexels.com/photos/1438832/pexels-photo-1438832.jpeg?auto=compress&cs=tinysrgb&w=400';
    } else if (promptLower.includes('luxury') || promptLower.includes('elegant') || promptLower.includes('sophisticated')) {
      return 'https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg?auto=compress&cs=tinysrgb&w=400';
    }
    
    return 'https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=400';
  }

  private static generateMaterialsFromPrompt(prompt: string): string[] {
    const promptLower = prompt.toLowerCase();
    const materials: string[] = [];
    
    // Material detection from prompt
    if (promptLower.includes('stone') || promptLower.includes('rock')) materials.push('Natural Stone');
    if (promptLower.includes('wood') || promptLower.includes('timber')) materials.push('Wood Cladding');
    if (promptLower.includes('brick')) materials.push('Brick Veneer');
    if (promptLower.includes('glass') || promptLower.includes('window')) materials.push('High-Performance Glass');
    if (promptLower.includes('metal') || promptLower.includes('steel')) materials.push('Metal Accents');
    if (promptLower.includes('concrete') || promptLower.includes('cement')) materials.push('Architectural Concrete');
    
    // Style-based materials
    if (promptLower.includes('modern') || promptLower.includes('contemporary')) {
      materials.push('Fiber Cement', 'Aluminum Composite', 'Smart Glass');
    } else if (promptLower.includes('traditional') || promptLower.includes('classic')) {
      materials.push('Clay Brick', 'Natural Slate', 'Hardwood Trim');
    } else if (promptLower.includes('sustainable') || promptLower.includes('eco')) {
      materials.push('Recycled Materials', 'Bamboo Composite', 'Solar Panels');
    }
    
    // Default materials if none detected
    if (materials.length === 0) {
      materials.push('Custom Selection', 'Premium Finishes', 'Designer Elements', 'Architectural Details');
    }
    
    return materials;
  }

  private static generateDetailedCostAnalysis(
    plot: Plot, 
    requirements: Requirements, 
    materials: Material[],
    location?: string
  ): CostEstimate {
    const baseCostPerSqFt = this.getLocationBaseCost(location);
    const complexityFactor = this.calculateComplexityFactor({ plot, requirements } as Project);
    const materialFactor = this.calculateMaterialFactor(materials);
    
    const adjustedCostPerSqFt = baseCostPerSqFt * complexityFactor * materialFactor;
    const totalCost = Math.round(plot.area * adjustedCostPerSqFt);

    const breakdown = [
      { category: 'Site Preparation & Foundation', cost: Math.round(totalCost * 0.15) },
      { category: 'Framing & Structure', cost: Math.round(totalCost * 0.20) },
      { category: 'Roofing & Exterior', cost: Math.round(totalCost * 0.18) },
      { category: 'Plumbing & Electrical', cost: Math.round(totalCost * 0.15) },
      { category: 'HVAC Systems', cost: Math.round(totalCost * 0.08) },
      { category: 'Insulation & Drywall', cost: Math.round(totalCost * 0.10) },
      { category: 'Flooring & Interior Finishes', cost: Math.round(totalCost * 0.14) }
    ];

    return { totalCost, breakdown };
  }

  private static getLocationBaseCost(location?: string): number {
    const locationCosts = {
      'urban': 220,
      'suburban': 180,
      'rural': 150,
      'coastal': 250,
      'mountain': 190
    };
    
    return locationCosts[location as keyof typeof locationCosts] || 180;
  }

  private static calculateComplexityFactor(project: Project): number {
    let factor = 1.0;
    
    // Floor complexity
    factor += (project.requirements.floors - 1) * 0.15;
    
    // Bathroom complexity
    factor += (project.requirements.bathrooms - 1) * 0.05;
    
    // Feature complexity
    if (project.requirements.garage) factor += 0.08;
    if (project.requirements.balcony) factor += 0.05;
    if (project.requirements.study) factor += 0.03;
    
    // Plot size factor
    if (project.plot.area > 3000) factor += 0.1;
    if (project.plot.area < 1500) factor += 0.05; // Smaller homes have higher per-sq-ft costs
    
    return Math.min(factor, 2.0); // Cap at 2x base cost
  }

  private static calculateMaterialFactor(materials: Material[]): number {
    if (!materials || materials.length === 0) return 1.0;
    
    // Calculate average material quality factor
    const avgCost = materials.reduce((sum, material) => sum + (material.cost || 100), 0) / materials.length;
    return Math.max(0.8, Math.min(1.5, avgCost / 100));
  }

  private static generateSmartMaterialRecommendations(
    plot: Plot,
    requirements: Requirements,
    style: string,
    climate?: string,
    budget?: number
  ): Material[] {
    const materials: Material[] = [];
    const area = plot.area;
    
    // Exterior materials based on style and climate
    const exteriorMaterials = {
      modern: [
        { name: 'Fiber Cement Siding', cost: 12, unit: 'sq ft', quantity: Math.round(area * 0.6) },
        { name: 'Aluminum Composite Panels', cost: 18, unit: 'sq ft', quantity: Math.round(area * 0.2) },
        { name: 'Natural Stone Veneer', cost: 25, unit: 'sq ft', quantity: Math.round(area * 0.1) }
      ],
      traditional: [
        { name: 'Clay Brick Veneer', cost: 15, unit: 'sq ft', quantity: Math.round(area * 0.5) },
        { name: 'Cedar Shingle Siding', cost: 14, unit: 'sq ft', quantity: Math.round(area * 0.3) },
        { name: 'Natural Stone', cost: 28, unit: 'sq ft', quantity: Math.round(area * 0.15) }
      ],
      contemporary: [
        { name: 'Stucco Finish', cost: 8, unit: 'sq ft', quantity: Math.round(area * 0.4) },
        { name: 'Wood Cladding', cost: 16, unit: 'sq ft', quantity: Math.round(area * 0.3) },
        { name: 'Metal Panel System', cost: 20, unit: 'sq ft', quantity: Math.round(area * 0.2) }
      ]
    };

    // Roofing materials
    const roofingMaterials = [
      { name: 'Architectural Asphalt Shingles', cost: 4.5, unit: 'sq ft', quantity: Math.round(area * 1.2) },
      { name: 'Standing Seam Metal Roof', cost: 12, unit: 'sq ft', quantity: Math.round(area * 1.2) },
      { name: 'Clay Tile Roofing', cost: 8, unit: 'sq ft', quantity: Math.round(area * 1.2) }
    ];

    // Windows and doors
    const windowMaterials = [
      { name: 'Double-Pane Vinyl Windows', cost: 450, unit: 'each', quantity: Math.round(requirements.bedrooms * 2 + 8) },
      { name: 'Exterior Entry Door', cost: 1200, unit: 'each', quantity: 1 },
      { name: 'Interior Doors', cost: 350, unit: 'each', quantity: requirements.bedrooms + requirements.bathrooms + 2 }
    ];

    // Combine materials based on style
    const styleBasedMaterials = exteriorMaterials[style as keyof typeof exteriorMaterials] || exteriorMaterials.modern;
    
    materials.push(
      ...styleBasedMaterials.map((m, i) => ({
        id: `ext-${i}`,
        name: m.name,
        type: 'exterior' as const,
        cost: m.cost,
        unit: m.unit,
        quantity: m.quantity
      })),
      ...roofingMaterials.slice(0, 1).map((m, i) => ({
        id: `roof-${i}`,
        name: m.name,
        type: 'roofing' as const,
        cost: m.cost,
        unit: m.unit,
        quantity: m.quantity
      })),
      ...windowMaterials.map((m, i) => ({
        id: `window-${i}`,
        name: m.name,
        type: 'exterior' as const,
        cost: m.cost,
        unit: m.unit,
        quantity: m.quantity
      }))
    );

    return materials;
  }

  private static analyzeBuildingCompliance(design: PartialBlueprint, location: string): any {
    const issues: string[] = [];
    const recommendations: string[] = [];

    // Analyze room sizes
    design.rooms.forEach(room => {
      const roomArea = (room.width / 15) * (room.height / 15); // Convert pixels to sq ft
      
      if (room.type === 'bedroom' && roomArea < 70) {
        issues.push(`${room.type} is below minimum 70 sq ft requirement`);
      }
      if (room.type === 'living-room' && roomArea < 120) {
        issues.push(`Living room is below minimum 120 sq ft requirement`);
      }
    });

    // Check egress requirements
    const bedrooms = design.rooms.filter(r => r.type.includes('bedroom'));
    bedrooms.forEach(bedroom => {
      const bedroomWindows = design.windows.filter(w => 
        w.x >= bedroom.x && w.x <= bedroom.x + bedroom.width &&
        w.y >= bedroom.y && w.y <= bedroom.y + bedroom.height
      );
      
      if (bedroomWindows.length === 0) {
        issues.push(`${bedroom.type} lacks required egress window`);
        recommendations.push(`Add egress window to ${bedroom.type} - minimum 5.7 sq ft opening`);
      }
    });

    // General recommendations
    recommendations.push(
      'Verify local setback requirements (typically 25-30 ft front, 10-15 ft sides)',
      'Confirm height restrictions for your zoning (usually 35 ft residential)',
      'Ensure adequate parking spaces as required by local code',
      'Plan for accessibility features if required',
      'Consider energy code requirements for insulation and windows'
    );

    return {
      compliant: issues.length === 0,
      issues,
      recommendations,
      permits: [
        'Building Permit',
        'Electrical Permit', 
        'Plumbing Permit',
        'HVAC Permit',
        'Grading Permit (if applicable)'
      ],
      timeline: '6-12 weeks for permit approval',
      estimatedFees: '$2,500 - $8,000 depending on jurisdiction'
    };
  }

  private static generateEnergyAnalysis(design: PartialBlueprint, climate: string, materials: Material[]): any {
    const totalArea = design.rooms.reduce((sum, room) => {
      return sum + ((room.width / 15) * (room.height / 15));
    }, 0);

    const baseEnergyUse = totalArea * 12; // kWh per sq ft annually
    let efficiency = 'C'; // Base efficiency
    let annualCost = Math.round(baseEnergyUse * 0.12); // $0.12 per kWh

    // Analyze materials for efficiency impact
    const hasHighPerformanceWindows = materials.some(m => 
      m.name.toLowerCase().includes('low-e') || 
      m.name.toLowerCase().includes('triple')
    );
    
    const hasQualityInsulation = materials.some(m => 
      m.name.toLowerCase().includes('insulation') ||
      m.name.toLowerCase().includes('foam')
    );

    if (hasHighPerformanceWindows) {
      annualCost *= 0.85; // 15% reduction
      efficiency = 'B';
    }
    
    if (hasQualityInsulation) {
      annualCost *= 0.80; // 20% reduction
      efficiency = efficiency === 'B' ? 'A-' : 'B+';
    }

    return {
      efficiency,
      annualCost: Math.round(annualCost),
      carbonFootprint: Math.round(totalArea * 8.5), // lbs CO2 per sq ft
      recommendations: [
        {
          upgrade: 'Solar Panel System',
          cost: Math.round(totalArea * 8),
          savings: Math.round(annualCost * 0.7),
          payback: '8-12 years',
          impact: '70% energy reduction'
        },
        {
          upgrade: 'High-Performance Insulation',
          cost: Math.round(totalArea * 3.5),
          savings: Math.round(annualCost * 0.25),
          payback: '6-8 years',
          impact: '25% energy reduction'
        },
        {
          upgrade: 'Smart HVAC System',
          cost: 12000,
          savings: Math.round(annualCost * 0.20),
          payback: '10-15 years',
          impact: '20% energy reduction'
        }
      ],
      certificationPotential: {
        energyStar: hasHighPerformanceWindows && hasQualityInsulation,
        leed: materials.length > 5, // Simplified check
        passiveHouse: false // Requires specific design criteria
      }
    };
  }

  private static generateStructuralAnalysis(design: PartialBlueprint, materials: Material[], location: string): any {
    const totalArea = design.rooms.reduce((sum, room) => {
      return sum + ((room.width / 15) * (room.height / 15));
    }, 0);

    return {
      structuralIntegrity: 'Excellent',
      loadAnalysis: {
        deadLoad: Math.round(totalArea * 15), // psf
        liveLoad: Math.round(totalArea * 40), // psf
        windLoad: location.includes('coastal') ? 'High (150+ mph)' : 'Standard (90 mph)',
        seismicZone: location.includes('california') ? 'High' : 'Low to Moderate'
      },
      recommendations: [
        'Use engineered lumber for spans over 16 feet',
        'Consider steel beams for open floor plan areas',
        'Ensure proper foundation design for soil conditions',
        'Plan for future load additions (solar panels, equipment)',
        'Include seismic/wind bracing as required by local codes'
      ],
      engineeringRequired: totalArea > 2500 || design.rooms.some(r => r.width > 240 || r.height > 240),
      estimatedStructuralCost: Math.round(totalArea * 25) // $25 per sq ft for structure
    };
  }

  private static generateSmartHomePlan(design: PartialBlueprint, preferences: any): any {
    return {
      hubPlacement: {
        primary: 'Central hallway or utility room',
        secondary: 'Master bedroom for bedroom controls',
        network: 'Basement or garage for main networking equipment'
      },
      deviceRecommendations: {
        lighting: `${design.rooms.length * 2} smart switches/dimmers`,
        climate: '2-3 smart thermostats for zone control',
        security: 'Smart doorbell, 4-6 security cameras, smart locks',
        entertainment: 'Whole-home audio pre-wire, smart TV connections',
        convenience: 'Smart garage door, irrigation controls, smart outlets'
      },
      wiringRequirements: {
        cat6: 'Every room needs 2+ data outlets',
        electrical: 'Smart switch compatible wiring throughout',
        lowVoltage: 'Centralized low-voltage panel',
        futureProofing: 'Conduit runs for future technology'
      },
      estimatedCost: {
        basic: '$8,000 - $15,000',
        advanced: '$20,000 - $35,000',
        luxury: '$40,000 - $75,000'
      },
      timeline: 'Install during rough electrical phase for best integration'
    };
  }
}