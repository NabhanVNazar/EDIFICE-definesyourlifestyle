import { Plot, Requirements, ElevationStyle } from '../types';

export class AIService {
  static async generateBlueprint(plot: Plot, requirements: Requirements) {
    // Simulate AI blueprint generation
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          rooms: this.generateOptimizedRooms(plot, requirements),
          walls: this.generateWalls(plot),
          doors: this.generateDoors(),
          windows: this.generateWindows(),
        });
      }, 2000);
    });
  }

  static async generateElevationStyles(plot: Plot, requirements: Requirements, customPrompt?: string) {
    // Simulate AI elevation generation
    return new Promise<ElevationStyle[]>((resolve) => {
      setTimeout(() => {
        const styles: ElevationStyle[] = [
          {
            id: 'ai-custom-1',
            name: `AI Optimized for ${plot.width}×${plot.length} Plot`,
            description: `Custom design optimized for your ${requirements.floors}-floor home with ${requirements.bedrooms} bedrooms`,
            thumbnail: 'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=400',
            features: [
              `Optimized for ${plot.area} sq ft plot`,
              `${requirements.floors}-story design`,
              `${requirements.bedrooms} bedroom layout integration`,
              'Climate-responsive features'
            ],
            materials: ['Smart Glass', 'Composite Materials', 'Energy-efficient Insulation', 'Solar-ready Roofing']
          },
          {
            id: 'ai-eco-friendly',
            name: 'AI Eco-Friendly Design',
            description: 'Sustainable design with energy-efficient features and natural materials',
            thumbnail: 'https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=400',
            features: [
              'Solar panel integration',
              'Rainwater harvesting system',
              'Natural ventilation design',
              'Green roof options'
            ],
            materials: ['Recycled Steel', 'Bamboo', 'Reclaimed Wood', 'Low-E Glass']
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
              'EV charging station'
            ],
            materials: ['Smart Glass', 'Fiber Cement', 'Aluminum Composite', 'LED-integrated Materials']
          }
        ];

        if (customPrompt) {
          styles.unshift({
            id: 'ai-custom-prompt',
            name: 'AI Custom Design',
            description: `Custom design based on your requirements: "${customPrompt}"`,
            thumbnail: 'https://images.pexels.com/photos/1370704/pexels-photo-1370704.jpeg?auto=compress&cs=tinysrgb&w=400',
            features: [
              'Custom AI interpretation',
              'Personalized design elements',
              'Unique architectural features',
              'Tailored material selection'
            ],
            materials: ['Custom Selection', 'Premium Materials', 'Specialty Finishes', 'Designer Elements']
          });
        }

        resolve(styles);
      }, 3000);
    });
  }

  static async calculateCosts(plot: Plot, requirements: Requirements, materials: any[]) {
    // Simulate cost calculation
    return new Promise((resolve) => {
      setTimeout(() => {
        const baseCostPerSqFt = 150;
        const totalCost = plot.area * baseCostPerSqFt;
        
        resolve({
          totalCost,
          breakdown: [
            { category: 'Foundation & Structure', cost: Math.round(totalCost * 0.25) },
            { category: 'Walls & Roofing', cost: Math.round(totalCost * 0.30) },
            { category: 'Flooring', cost: Math.round(totalCost * 0.15) },
            { category: 'Windows & Doors', cost: Math.round(totalCost * 0.10) },
            { category: 'Plumbing & Electrical', cost: Math.round(totalCost * 0.15) },
            { category: 'Finishing & Paint', cost: Math.round(totalCost * 0.05) },
          ]
        });
      }, 1500);
    });
  }

  private static generateOptimizedRooms(plot: Plot, requirements: Requirements) {
    const rooms = [];
    const scale = 20; // pixels per foot
    
    // Generate rooms based on requirements
    if (requirements.livingRoom) {
      rooms.push({
        id: 'living-room',
        type: 'living-room',
        x: 20,
        y: 20,
        width: plot.width * scale * 0.4,
        height: plot.length * scale * 0.35,
        color: 'rgba(34, 197, 94, 0.3)'
      });
    }

    // Add more rooms based on requirements
    for (let i = 0; i < requirements.bedrooms; i++) {
      rooms.push({
        id: `bedroom-${i + 1}`,
        type: 'bedroom',
        x: 20 + (i * 150),
        y: plot.length * scale * 0.5,
        width: 120,
        height: 100,
        color: 'rgba(59, 130, 246, 0.3)'
      });
    }

    return rooms;
  }

  private static generateWalls(plot: Plot) {
    const scale = 20;
    return [
      {
        id: 'wall-1',
        x1: 20,
        y1: 20,
        x2: plot.width * scale,
        y2: 20,
        thickness: 8
      },
      // Add more walls
    ];
  }

  private static generateDoors() {
    return [
      {
        id: 'door-1',
        x: 100,
        y: 20,
        width: 30,
        rotation: 0
      }
    ];
  }

  private static generateWindows() {
    return [
      {
        id: 'window-1',
        x: 150,
        y: 20,
        width: 40,
        height: 6
      }
    ];
  }
}