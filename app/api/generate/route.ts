import { NextRequest, NextResponse } from 'next/server';
import { generateProductVisualization, GEMINI_API_KEY } from '@/lib/gemini';

export const runtime = 'nodejs';

const isApiKeyValid = (key?: string) => {
  if (!key) return false;
  const t = key.trim();
  if (t.length < 20) return false; // minimal sanity length
  const lower = t.toLowerCase();
  if (lower.includes('replace') || lower.includes('your_api') || lower.startsWith('AIza')) return false;
  return true;
};

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    const { productIdea, referenceImage } = body;

    console.log('Received request:', { productIdea, hasImage: !!referenceImage });

    // Validate input
    if (!productIdea || typeof productIdea !== 'string') {
      return NextResponse.json(
        { error: 'Product idea is required and must be a string' },
        { status: 400 }
      );
    }

    if (productIdea.trim().length < 10) {
      return NextResponse.json(
        { error: 'Product idea must be at least 10 characters' },
        { status: 400 }
      );
    }

    if (productIdea.trim().length > 500) {
      return NextResponse.json(
        { error: 'Product idea must be less than 500 characters' },
        { status: 400 }
      );
    }

    if (!isApiKeyValid(GEMINI_API_KEY)) {
      console.error('GEMINI_API_KEY is not configured or looks like a placeholder');
      return NextResponse.json(
        {
          error: 'API configuration error',
          details: 'Gemini API key is not configured. Add GEMINI_API_KEY to .env.local (server only) and restart the dev server.',
        },
        { status: 500 }
      );
    }

    console.log('API Key configured, calling Gemini API...');
    
    // Generate visualization using Gemini API
    const visualizationData = await generateProductVisualization(
      productIdea,
      referenceImage
    );

    console.log('Successfully generated visualization');

    return NextResponse.json(visualizationData);
  } catch (error) {
    console.error('API Route Error:', error);
    
    return NextResponse.json(
      { 
        error: 'Failed to generate visualization',
        details: error instanceof Error ? error.message : 'Unknown error occurred'
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  const hasApiKey = isApiKeyValid(GEMINI_API_KEY);
  
  return NextResponse.json(
    { 
      message: 'Visionary API is running',
      status: 'ok',
      apiKeyConfigured: hasApiKey,
      apiKeyLength: GEMINI_API_KEY?.length || 0,
      endpoints: {
        POST: '/api/generate - Generate product visualization'
      }
    },
    { status: 200 }
  );
}