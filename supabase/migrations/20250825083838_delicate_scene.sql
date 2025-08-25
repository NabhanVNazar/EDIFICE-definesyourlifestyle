/*
  # Advanced EDIFICE Database Schema with AI Training Data

  1. New Tables
    - `design_templates` - Pre-built design templates and patterns
    - `architectural_styles` - Comprehensive style database
    - `building_materials` - Material specifications and properties
    - `building_codes` - Regional building code requirements
    - `ai_training_data` - Training data for AI models
    - `design_analytics` - User behavior and design performance data
    - `cost_database` - Real-time construction cost data
    - `climate_data` - Climate-specific design recommendations
    - `furniture_catalog` - Furniture and fixture database
    - `sustainability_metrics` - Environmental impact data

  2. Enhanced Features
    - Advanced search and filtering
    - Real-time cost calculations
    - Climate-aware design suggestions
    - Building code compliance checking
    - Sustainability scoring

  3. Security
    - Enable RLS on all tables
    - Add policies for data access control
*/

-- Design Templates Table
CREATE TABLE IF NOT EXISTS design_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL,
  style text NOT NULL,
  plot_size_min integer NOT NULL,
  plot_size_max integer NOT NULL,
  floors integer NOT NULL,
  bedrooms integer NOT NULL,
  bathrooms numeric NOT NULL,
  template_data jsonb NOT NULL,
  preview_image text,
  popularity_score integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Architectural Styles Database
CREATE TABLE IF NOT EXISTS architectural_styles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL,
  description text NOT NULL,
  characteristics jsonb NOT NULL,
  typical_materials jsonb NOT NULL,
  color_palettes jsonb NOT NULL,
  climate_suitability jsonb NOT NULL,
  cost_factor numeric DEFAULT 1.0,
  popularity_score integer DEFAULT 0,
  image_gallery jsonb,
  created_at timestamptz DEFAULT now()
);

-- Building Materials Database
CREATE TABLE IF NOT EXISTS building_materials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL,
  subcategory text,
  specifications jsonb NOT NULL,
  cost_per_unit numeric NOT NULL,
  unit_type text NOT NULL,
  durability_rating integer CHECK (durability_rating >= 1 AND durability_rating <= 10),
  sustainability_score integer CHECK (sustainability_score >= 1 AND sustainability_score <= 100),
  climate_suitability jsonb,
  maintenance_requirements jsonb,
  supplier_info jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Building Codes Database
CREATE TABLE IF NOT EXISTS building_codes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  region text NOT NULL,
  code_type text NOT NULL,
  code_section text NOT NULL,
  requirement_description text NOT NULL,
  parameters jsonb NOT NULL,
  compliance_rules jsonb NOT NULL,
  effective_date date NOT NULL,
  last_updated timestamptz DEFAULT now()
);

-- AI Training Data
CREATE TABLE IF NOT EXISTS ai_training_data (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  data_type text NOT NULL,
  category text NOT NULL,
  input_data jsonb NOT NULL,
  expected_output jsonb NOT NULL,
  quality_score numeric DEFAULT 0,
  validation_status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

-- Design Analytics
CREATE TABLE IF NOT EXISTS design_analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  project_id uuid REFERENCES projects(id) ON DELETE CASCADE,
  event_type text NOT NULL,
  event_data jsonb NOT NULL,
  session_id text,
  timestamp timestamptz DEFAULT now()
);

-- Cost Database
CREATE TABLE IF NOT EXISTS cost_database (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  region text NOT NULL,
  category text NOT NULL,
  item_name text NOT NULL,
  cost_per_unit numeric NOT NULL,
  unit_type text NOT NULL,
  labor_cost numeric DEFAULT 0,
  market_trend numeric DEFAULT 0,
  last_updated timestamptz DEFAULT now()
);

-- Climate Data
CREATE TABLE IF NOT EXISTS climate_data (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  region text NOT NULL,
  climate_zone text NOT NULL,
  temperature_range jsonb NOT NULL,
  precipitation_data jsonb NOT NULL,
  humidity_levels jsonb NOT NULL,
  wind_patterns jsonb NOT NULL,
  solar_exposure jsonb NOT NULL,
  design_recommendations jsonb NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Furniture Catalog
CREATE TABLE IF NOT EXISTS furniture_catalog (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  category text NOT NULL,
  subcategory text,
  brand text,
  dimensions jsonb NOT NULL,
  price numeric,
  style_tags jsonb,
  color_options jsonb,
  material_composition jsonb,
  room_suitability jsonb,
  product_url text,
  image_urls jsonb,
  created_at timestamptz DEFAULT now()
);

-- Sustainability Metrics
CREATE TABLE IF NOT EXISTS sustainability_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  metric_name text NOT NULL,
  category text NOT NULL,
  calculation_method jsonb NOT NULL,
  weight_factor numeric DEFAULT 1.0,
  benchmark_values jsonb NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE design_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE architectural_styles ENABLE ROW LEVEL SECURITY;
ALTER TABLE building_materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE building_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_training_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE design_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE cost_database ENABLE ROW LEVEL SECURITY;
ALTER TABLE climate_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE furniture_catalog ENABLE ROW LEVEL SECURITY;
ALTER TABLE sustainability_metrics ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access on reference data
CREATE POLICY "Public read access for design templates"
  ON design_templates FOR SELECT TO authenticated USING (true);

CREATE POLICY "Public read access for architectural styles"
  ON architectural_styles FOR SELECT TO authenticated USING (true);

CREATE POLICY "Public read access for building materials"
  ON building_materials FOR SELECT TO authenticated USING (true);

CREATE POLICY "Public read access for building codes"
  ON building_codes FOR SELECT TO authenticated USING (true);

CREATE POLICY "Public read access for cost database"
  ON cost_database FOR SELECT TO authenticated USING (true);

CREATE POLICY "Public read access for climate data"
  ON climate_data FOR SELECT TO authenticated USING (true);

CREATE POLICY "Public read access for furniture catalog"
  ON furniture_catalog FOR SELECT TO authenticated USING (true);

CREATE POLICY "Public read access for sustainability metrics"
  ON sustainability_metrics FOR SELECT TO authenticated USING (true);

-- Analytics policies
CREATE POLICY "Users can insert their own analytics"
  ON design_analytics FOR INSERT TO authenticated 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own analytics"
  ON design_analytics FOR SELECT TO authenticated 
  USING (auth.uid() = user_id);

-- AI training data policies (admin only for now)
CREATE POLICY "Admin access for AI training data"
  ON ai_training_data FOR ALL TO authenticated 
  USING (auth.jwt() ->> 'role' = 'admin');

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_design_templates_category ON design_templates(category);
CREATE INDEX IF NOT EXISTS idx_design_templates_style ON design_templates(style);
CREATE INDEX IF NOT EXISTS idx_architectural_styles_category ON architectural_styles(category);
CREATE INDEX IF NOT EXISTS idx_building_materials_category ON building_materials(category);
CREATE INDEX IF NOT EXISTS idx_building_codes_region ON building_codes(region);
CREATE INDEX IF NOT EXISTS idx_design_analytics_user_id ON design_analytics(user_id);
CREATE INDEX IF NOT EXISTS idx_design_analytics_project_id ON design_analytics(project_id);
CREATE INDEX IF NOT EXISTS idx_cost_database_region ON cost_database(region);
CREATE INDEX IF NOT EXISTS idx_climate_data_region ON climate_data(region);
CREATE INDEX IF NOT EXISTS idx_furniture_catalog_category ON furniture_catalog(category);

-- Insert sample data for architectural styles
INSERT INTO architectural_styles (name, category, description, characteristics, typical_materials, color_palettes, climate_suitability) VALUES
('Modern Minimalist', 'Contemporary', 'Clean lines, open spaces, minimal ornamentation', 
 '{"features": ["large windows", "flat roofs", "open floor plans", "minimal decoration"], "principles": ["form follows function", "less is more", "emphasis on space and light"]}',
 '["concrete", "steel", "glass", "natural stone"]',
 '{"primary": ["white", "gray", "black"], "accent": ["natural wood tones", "single bold color"]}',
 '{"suitable": ["temperate", "arid"], "considerations": ["large windows require good insulation", "flat roofs need proper drainage"]}'),

('Traditional Colonial', 'Classic', 'Symmetrical design, formal proportions, classic details',
 '{"features": ["symmetrical facade", "centered front door", "multi-pane windows", "columns or pilasters"], "principles": ["classical proportions", "formal balance", "traditional craftsmanship"]}',
 '["brick", "wood siding", "stone", "slate roofing"]',
 '{"primary": ["white", "cream", "colonial blue"], "accent": ["forest green", "burgundy", "natural wood"]}',
 '{"suitable": ["temperate", "humid continental"], "considerations": ["good for most climates", "traditional materials weather well"]}'),

('Mediterranean Villa', 'Regional', 'Warm colors, arched openings, tile roofs, courtyard layouts',
 '{"features": ["red tile roofs", "stucco walls", "arched windows", "courtyards", "wrought iron details"], "principles": ["indoor-outdoor living", "natural materials", "warm color palette"]}',
 '["stucco", "clay tiles", "natural stone", "wrought iron"]',
 '{"primary": ["warm white", "terracotta", "ochre"], "accent": ["deep blue", "olive green", "rust red"]}',
 '{"suitable": ["mediterranean", "arid", "subtropical"], "considerations": ["designed for warm climates", "courtyards provide cooling"]}');

-- Insert sample building materials
INSERT INTO building_materials (name, category, subcategory, specifications, cost_per_unit, unit_type, durability_rating, sustainability_score, climate_suitability) VALUES
('Engineered Hardwood Flooring', 'Flooring', 'Wood', 
 '{"thickness": "3/4 inch", "width": "5 inch", "finish": "pre-finished", "species": "oak", "grade": "select"}',
 8.50, 'sq_ft', 8, 75,
 '{"suitable": ["temperate", "dry"], "not_suitable": ["high_humidity"], "maintenance": "moderate"}'),

('Porcelain Tile', 'Flooring', 'Ceramic', 
 '{"size": "12x24 inch", "thickness": "10mm", "finish": "matte", "water_absorption": "<0.5%"}',
 4.25, 'sq_ft', 9, 60,
 '{"suitable": ["all_climates"], "maintenance": "low", "water_resistant": true}'),

('Quartz Countertop', 'Surfaces', 'Engineered Stone',
 '{"thickness": "1.25 inch", "composition": "93% quartz", "finish": "polished", "edge_options": ["straight", "beveled", "bullnose"]}',
 65.00, 'sq_ft', 9, 70,
 '{"suitable": ["all_climates"], "maintenance": "very_low", "heat_resistant": "moderate"}');

-- Insert sample climate data
INSERT INTO climate_data (region, climate_zone, temperature_range, precipitation_data, humidity_levels, wind_patterns, solar_exposure, design_recommendations) VALUES
('Pacific Northwest', 'Oceanic', 
 '{"winter_low": 35, "winter_high": 45, "summer_low": 55, "summer_high": 75, "unit": "fahrenheit"}',
 '{"annual": 40, "wet_season": "oct_mar", "dry_season": "apr_sep", "unit": "inches"}',
 '{"average": 75, "winter": 85, "summer": 65, "unit": "percent"}',
 '{"prevailing": "southwest", "average_speed": 8, "unit": "mph"}',
 '{"annual_hours": 2000, "peak_months": ["jun", "jul", "aug"], "winter_low": true}',
 '{"roof_pitch": "steep for rain runoff", "materials": "moisture resistant", "insulation": "high R-value", "windows": "triple pane", "ventilation": "important for humidity control"}'),

('Southwest Desert', 'Arid', 
 '{"winter_low": 45, "winter_high": 70, "summer_low": 80, "summer_high": 110, "unit": "fahrenheit"}',
 '{"annual": 8, "monsoon": "jul_sep", "dry_season": "oct_jun", "unit": "inches"}',
 '{"average": 30, "winter": 40, "summer": 20, "unit": "percent"}',
 '{"prevailing": "variable", "average_speed": 6, "unit": "mph"}',
 '{"annual_hours": 3500, "intense": true, "year_round": true}',
 '{"roof_pitch": "low pitch acceptable", "materials": "heat resistant", "insulation": "high for cooling", "windows": "low-E coating", "shading": "essential", "thermal_mass": "beneficial"}');

-- Insert sample cost data
INSERT INTO cost_database (region, category, item_name, cost_per_unit, unit_type, labor_cost) VALUES
('National Average', 'Foundation', 'Concrete Slab', 4.50, 'sq_ft', 2.00),
('National Average', 'Framing', 'Wood Frame Construction', 12.00, 'sq_ft', 8.00),
('National Average', 'Roofing', 'Asphalt Shingles', 3.50, 'sq_ft', 2.50),
('National Average', 'Electrical', 'Basic Electrical Rough-in', 4.00, 'sq_ft', 3.50),
('National Average', 'Plumbing', 'Basic Plumbing Rough-in', 5.00, 'sq_ft', 4.00),
('National Average', 'HVAC', 'Central Air System', 15.00, 'sq_ft', 10.00);

-- Insert sample furniture catalog
INSERT INTO furniture_catalog (name, category, subcategory, brand, dimensions, price, style_tags, color_options, room_suitability) VALUES
('Modern Sectional Sofa', 'Seating', 'Sofa', 'West Elm',
 '{"length": 108, "width": 36, "height": 32, "unit": "inches"}',
 1299.00,
 '["modern", "contemporary", "minimalist"]',
 '["charcoal", "navy", "cream", "olive"]',
 '["living_room", "family_room"]'),

('Dining Table Set', 'Tables', 'Dining', 'CB2',
 '{"length": 72, "width": 36, "height": 30, "unit": "inches"}',
 899.00,
 '["modern", "industrial", "mid-century"]',
 '["walnut", "oak", "black"]',
 '["dining_room", "kitchen"]'),

('Platform Bed Frame', 'Bedroom', 'Bed', 'Article',
 '{"length": 86, "width": 64, "height": 35, "unit": "inches"}',
 649.00,
 '["modern", "scandinavian", "minimalist"]',
 '["oak", "walnut", "white"]',
 '["bedroom", "master_bedroom"]');

-- Insert sustainability metrics
INSERT INTO sustainability_metrics (metric_name, category, calculation_method, weight_factor, benchmark_values) VALUES
('Energy Efficiency Rating', 'Energy', 
 '{"method": "HERS_index", "factors": ["insulation", "windows", "hvac_efficiency", "air_sealing"], "scale": "0-150"}',
 0.3,
 '{"excellent": 50, "good": 70, "average": 100, "poor": 130}'),

('Water Conservation Score', 'Water', 
 '{"method": "fixture_efficiency", "factors": ["low_flow_fixtures", "rainwater_harvesting", "drought_resistant_landscaping"], "scale": "0-100"}',
 0.2,
 '{"excellent": 90, "good": 75, "average": 60, "poor": 40}'),

('Material Sustainability', 'Materials', 
 '{"method": "lifecycle_assessment", "factors": ["recycled_content", "local_sourcing", "durability", "end_of_life"], "scale": "0-100"}',
 0.25,
 '{"excellent": 85, "good": 70, "average": 55, "poor": 35}');

-- Create functions for advanced calculations
CREATE OR REPLACE FUNCTION calculate_construction_cost(
  plot_area numeric,
  floors integer,
  region text DEFAULT 'National Average'
)
RETURNS jsonb AS $$
DECLARE
  base_cost numeric;
  total_cost numeric;
  cost_breakdown jsonb;
BEGIN
  -- Calculate base construction cost per sq ft
  SELECT AVG(cost_per_unit + labor_cost) INTO base_cost
  FROM cost_database 
  WHERE cost_database.region = calculate_construction_cost.region;
  
  -- Apply floor multiplier
  total_cost := plot_area * floors * COALESCE(base_cost, 120);
  
  -- Create detailed breakdown
  cost_breakdown := jsonb_build_object(
    'total_cost', total_cost,
    'cost_per_sqft', base_cost,
    'total_area', plot_area * floors,
    'breakdown', (
      SELECT jsonb_agg(
        jsonb_build_object(
          'category', category,
          'cost', (cost_per_unit + labor_cost) * plot_area * floors
        )
      )
      FROM cost_database 
      WHERE cost_database.region = calculate_construction_cost.region
    )
  );
  
  RETURN cost_breakdown;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION get_climate_recommendations(user_region text)
RETURNS jsonb AS $$
DECLARE
  recommendations jsonb;
BEGIN
  SELECT design_recommendations INTO recommendations
  FROM climate_data
  WHERE region ILIKE '%' || user_region || '%'
  LIMIT 1;
  
  RETURN COALESCE(recommendations, '{"message": "No specific climate data available for this region"}');
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION analyze_sustainability(design_data jsonb)
RETURNS jsonb AS $$
DECLARE
  sustainability_score numeric := 0;
  analysis jsonb;
BEGIN
  -- Simple sustainability analysis based on design features
  -- This would be much more complex in a real implementation
  
  IF design_data->>'energy_efficient_windows' = 'true' THEN
    sustainability_score := sustainability_score + 15;
  END IF;
  
  IF design_data->>'solar_ready' = 'true' THEN
    sustainability_score := sustainability_score + 20;
  END IF;
  
  IF design_data->>'high_insulation' = 'true' THEN
    sustainability_score := sustainability_score + 15;
  END IF;
  
  analysis := jsonb_build_object(
    'overall_score', sustainability_score,
    'rating', CASE 
      WHEN sustainability_score >= 70 THEN 'Excellent'
      WHEN sustainability_score >= 50 THEN 'Good'
      WHEN sustainability_score >= 30 THEN 'Fair'
      ELSE 'Needs Improvement'
    END,
    'recommendations', jsonb_build_array(
      'Consider solar panel installation',
      'Upgrade to energy-efficient appliances',
      'Implement rainwater harvesting',
      'Use sustainable building materials'
    )
  );
  
  RETURN analysis;
END;
$$ LANGUAGE plpgsql;