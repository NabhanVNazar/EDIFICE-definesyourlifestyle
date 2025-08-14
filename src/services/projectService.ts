import { supabase } from '../lib/supabase';
import { Project } from '../types';

export class ProjectService {
  static async createProject(project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>, userId: string) {
    try {
      const { data, error } = await supabase
        .from('projects')
        .insert({
          user_id: userId,
          name: project.name,
          description: project.description,
          plot_data: project.plot,
          requirements_data: project.requirements,
          blueprint_data: project.blueprint,
          elevation_style: project.elevationStyle,
          materials: project.materials,
          cost_estimate: project.costEstimate,
          area_calculation: project.area,
        })
        .select()
        .single();

      if (error) throw error;

      return { project: this.mapDatabaseToProject(data), error: null };
    } catch (error) {
      return { project: null, error: error as Error };
    }
  }

  static async updateProject(projectId: string, updates: Partial<Project>) {
    try {
      const { data, error } = await supabase
        .from('projects')
        .update({
          name: updates.name,
          description: updates.description,
          plot_data: updates.plot,
          requirements_data: updates.requirements,
          blueprint_data: updates.blueprint,
          elevation_style: updates.elevationStyle,
          materials: updates.materials,
          cost_estimate: updates.costEstimate,
          area_calculation: updates.area,
          updated_at: new Date().toISOString(),
        })
        .eq('id', projectId)
        .select()
        .single();

      if (error) throw error;

      return { project: this.mapDatabaseToProject(data), error: null };
    } catch (error) {
      return { project: null, error: error as Error };
    }
  }

  static async getUserProjects(userId: string) {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('user_id', userId)
        .order('updated_at', { ascending: false });

      if (error) throw error;

      const projects = data.map(this.mapDatabaseToProject);
      return { projects, error: null };
    } catch (error) {
      return { projects: [], error: error as Error };
    }
  }

  static async deleteProject(projectId: string) {
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', projectId);

      if (error) throw error;

      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  }

  private static mapDatabaseToProject(data: any): Project {
    return {
      id: data.id,
      name: data.name,
      description: data.description,
      plot: data.plot_data,
      requirements: data.requirements_data,
      blueprint: data.blueprint_data,
      elevationStyle: data.elevation_style,
      materials: data.materials,
      costEstimate: data.cost_estimate,
      area: data.area_calculation,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
    };
  }
}