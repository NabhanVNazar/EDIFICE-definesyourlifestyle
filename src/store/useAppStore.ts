import { create } from 'zustand';
import { AppState, Project, WorkflowStep, User, AIMessage } from '../types';

interface AppStore extends AppState {
  // Actions
  setCurrentStep: (step: WorkflowStep) => void;
  setCurrentProject: (project: Project | null) => void;
  addProject: (project: Project) => void;
  updateProject: (project: Project) => void;
  deleteProject: (projectId: string) => void;
  toggleAIAssistant: () => void;
  setUser: (user: User | null) => void;
  
  // AI Assistant
  aiMessages: AIMessage[];
  addAIMessage: (message: AIMessage) => void;
  clearAIMessages: () => void;
}

export const useAppStore = create<AppStore>((set, get) => ({
  // Initial state
  currentStep: 'input',
  currentProject: null,
  projects: [],
  showAIAssistant: false,
  user: null,
  aiMessages: [],

  // Actions
  setCurrentStep: (step) => set({ currentStep: step }),
  
  setCurrentProject: (project) => set({ currentProject: project }),
  
  addProject: (project) => set((state) => ({
    projects: [...state.projects, project],
    currentProject: project
  })),
  
  updateProject: (project) => set((state) => ({
    projects: state.projects.map(p => p.id === project.id ? project : p),
    currentProject: state.currentProject?.id === project.id ? project : state.currentProject
  })),
  
  deleteProject: (projectId) => set((state) => ({
    projects: state.projects.filter(p => p.id !== projectId),
    currentProject: state.currentProject?.id === projectId ? null : state.currentProject
  })),
  
  toggleAIAssistant: () => set((state) => ({
    showAIAssistant: !state.showAIAssistant
  })),
  
  setUser: (user) => set({ user }),
  
  // AI Assistant
  addAIMessage: (message) => set((state) => ({
    aiMessages: [...state.aiMessages, message]
  })),
  
  clearAIMessages: () => set({ aiMessages: [] })
}));