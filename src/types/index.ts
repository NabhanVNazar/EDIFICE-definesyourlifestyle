export interface Plot {
  type: 'residential' | 'commercial' | 'mixed';
  width: number;
  length: number;
  area: number;
}

export interface Requirements {
  floors: number;
  bedrooms: number;
  bathrooms: number;
  kitchen: 'open' | 'closed' | 'island';
  garage: boolean;
  garden: boolean;
  balcony: boolean;
  study: boolean;
  diningRoom: boolean;
  livingRoom: boolean;
}

export interface Room {
  id: string;
  type: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
}

export interface Wall {
  id: string;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  thickness: number;
}

export interface Door {
  id: string;
  x: number;
  y: number;
  width: number;
  rotation: number;
  wallId?: string;
}

export interface Window {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  wallId?: string;
}

export interface Blueprint {
  id: string;
  name: string;
  rooms: Room[];
  walls: Wall[];
  doors: Door[];
  windows: Window[];
  plot: Plot;
  createdAt: Date;
  updatedAt: Date;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  plot: Plot;
  requirements: Requirements;
  blueprint?: Blueprint;
  elevationStyle?: string;
  materials?: Material[];
  costEstimate?: number;
  area?: AreaCalculation;
  createdAt: Date;
  updatedAt: Date;
}

export interface Material {
  id: string;
  name: string;
  type: 'flooring' | 'walls' | 'roofing' | 'exterior';
  cost: number;
  unit: string;
  quantity: number;
}

export interface AreaCalculation {
  totalArea: number;
  builtUpArea: number;
  carpetArea: number;
  openArea: number;
}

export interface ElevationStyle {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  features: string[];
  materials: string[];
}

export type WorkflowStep = 'input' | '2d-edit' | '3d-view' | 'elevations' | 'export';

export interface AppState {
  currentStep: WorkflowStep;
  currentProject: Project | null;
  projects: Project[];
  showAIAssistant: boolean;
  user: User | null;
}

export interface User {
  id: string;
  email: string;
  name: string;
  plan: 'free' | 'premium';
  projectsCount: number;
  createdAt: Date;
}

export interface AIMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  context?: string;
}