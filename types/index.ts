export interface VisualizationData {
  productTitle: string;
  description: string;
  targetAudience: string;
  tagline: string;
  colorPalette: string[];
  visualDescription: string;
  generatedAt: string;
}

export interface GenerateRequest {
  productIdea: string;
  referenceImage?: string;
}