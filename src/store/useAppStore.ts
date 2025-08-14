import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AppState, Project, WorkflowStep, User, AIMessage } from '../types';
import { AuthService } from '../services/authService';
import { ProjectService } from '../services/projectService';

interface AppStore extends AppState {
  // Actions
  setCurrentStep: (step: WorkflowStep) => void;
  setCurrentProject: (project: Project | null) => void;
  addProject: (project: Project) => void;
  updateProject: (project: Project) => void;
  deleteProject: (projectId: string) => void;
  toggleAIAssistant: () => void;
  setUser: (user: User | null) => void;
  signOut: () => void;
  loadUserProjects: () => Promise<void>;
  saveProject: (project: Project) => Promise<void>;
  
  // AI Assistant
  aiMessages: AIMessage[];
  addAIMessage: (message: AIMessage) => void;
  clearAIMessages: () => void;
  
  // Loading states
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
}

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
  // Initial state
  currentStep: 'input',
  currentProject: null,
  projects: [],
  showAIAssistant: false,
  user: null,
  aiMessages: [],
  isLoading: false,

  // Actions
  setCurrentStep: (step) => set({ currentStep: step }),
  
  setCurrentProject: (project) => set({ currentProject: project }),
  
  addProject: (project) => {
    set((state) => ({
      projects: [...state.projects, project],
      currentProject: project
    }));
    
    // Save to backend if user is logged in
    const { user } = get();
    if (user) {
      get().saveProject(project);
    }
  },
  
  updateProject: (project) => {
    set((state) => ({
      projects: state.projects.map(p => p.id === project.id ? project : p),
      currentProject: state.currentProject?.id === project.id ? project : state.currentProject
    }));
    
    // Update in backend if user is logged in
    const { user } = get();
    if (user) {
      get().saveProject(project);
    }
  },
  
  deleteProject: async (projectId) => {
    const { user } = get();
    
    if (user) {
      await ProjectService.deleteProject(projectId);
    }
    
    set((state) => ({
      projects: state.projects.filter(p => p.id !== projectId),
      currentProject: state.currentProject?.id === projectId ? null : state.currentProject
    }));
  },
  
  toggleAIAssistant: () => set((state) => ({
    showAIAssistant: !state.showAIAssistant
  })),
  
  setUser: (user) => {
    set({ user });
    if (user) {
      get().loadUserProjects();
    }
  },
  
  signOut: async () => {
    await AuthService.signOut();
    set({ 
      user: null, 
      projects: [], 
      currentProject: null,
      aiMessages: []
    });
  },
  
  loadUserProjects: async () => {
    const { user } = get();
    if (!user) return;
    
    set({ isLoading: true });
    const { projects } = await ProjectService.getUserProjects(user.id);
    set({ projects, isLoading: false });
  },
  
  saveProject: async (project) => {
    const { user } = get();
    if (!user) return;
    
    try {
      if (project.id && project.id.length > 10) {
        // Update existing project
        await ProjectService.updateProject(project.id, project);
      } else {
        // Create new project
        const { project: savedProject } = await ProjectService.createProject(project, user.id);
        if (savedProject) {
          set((state) => ({
            projects: state.projects.map(p => 
              p.id === project.id ? savedProject : p
            ),
            currentProject: state.currentProject?.id === project.id ? savedProject : state.currentProject
          }));
        }
      }
    } catch (error) {
      console.error('Failed to save project:', error);
    }
  },
  
  // AI Assistant
  addAIMessage: (message) => set((state) => ({
    aiMessages: [...state.aiMessages, message]
  })),
  
  clearAIMessages: () => set({ aiMessages: [] }),
  
  // Loading states
  setLoading: (loading) => set({ isLoading: loading })
}),
    {
      name: 'edifice-store',
      partialize: (state) => ({
        currentStep: state.currentStep,
        currentProject: state.currentProject,
        projects: state.projects,
        user: state.user
      })
    }
  )
);

// Initialize auth state
AuthService.getCurrentUser().then(user => {
  if (user) {
    useAppStore.getState().setUser(user);
  }
});

// Listen for auth changes
AuthService.onAuthStateChange((user) => {
  useAppStore.getState().setUser(user);
});