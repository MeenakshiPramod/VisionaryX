// import { VisualizationData } from '@/types';



// // read from env instead of hardcoding
// export const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
// const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

// console.log('Gemini Library - API Key Status:', GEMINI_API_KEY ? 'Loaded' : 'Missing');
// console.log('Gemini Library - API Key length:', GEMINI_API_KEY?.length || 0);

// export async function generateProductVisualization(
//   productIdea: string,
//   referenceImage?: string
// ): Promise<VisualizationData> {
//   if (!GEMINI_API_KEY) {
//     throw new Error('Gemini API key is not configured');
//   }

//   const prompt = `You are an expert product designer and marketing strategist. Analyze this product idea and generate a comprehensive visualization plan.

// Product Idea: "${productIdea}"

// Generate a JSON response with the following structure (ONLY return valid JSON, no markdown, no explanations):
// {
//   "productTitle": "A creative, marketable product name (3-5 words)",
//   "description": "A compelling 2-3 sentence product description highlighting key features and benefits",
//   "targetAudience": "Specific target demographic with age range and characteristics",
//   "tagline": "A catchy, memorable tagline (5-8 words)",
//   "colorPalette": ["#hexcolor1", "#hexcolor2", "#hexcolor3", "#hexcolor4", "#hexcolor5"],
//   "visualDescription": "A detailed description of how this product would look visually (materials, shape, style)"
// }

// Requirements:
// - Make the productTitle creative and premium-sounding
// - Description should be compelling and highlight innovation
// - Target audience should be specific with demographics
// - Tagline should be memorable and inspiring
// - Color palette should have 5 complementary hex colors that match the product vibe
// - Visual description should be detailed enough to imagine the product

// Return ONLY the JSON object, nothing else.`;

//   try {
//     const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         contents: [
//           {
//             parts: [
//               {
//                 text: prompt,
//               },
//             ],
//           },
//         ],
//         generationConfig: {
//           temperature: 0.9,
//           topK: 40,
//           topP: 0.95,
//           maxOutputTokens: 1024,
//         },
//       }),
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       console.error('Gemini API Error:', errorData);
//       throw new Error(`API request failed: ${response.statusText}`);
//     }

//     const data = await response.json();
    
//     // Extract the generated text
//     const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
//     if (!generatedText) {
//       throw new Error('No content generated from API');
//     }

//     // Clean the response - remove markdown code blocks if present
//     let cleanedText = generatedText.trim();
//     cleanedText = cleanedText.replace(/```json\n?/g, '');
//     cleanedText = cleanedText.replace(/```\n?/g, '');
//     cleanedText = cleanedText.trim();

//     // Parse the JSON response
//     const parsedData = JSON.parse(cleanedText);

//     // Validate and return the data
//     const visualizationData: VisualizationData = {
//       productTitle: parsedData.productTitle || 'Innovative Product',
//       description: parsedData.description || 'A revolutionary product solution.',
//       targetAudience: parsedData.targetAudience || 'Modern consumers seeking innovation',
//       tagline: parsedData.tagline || 'Innovation Redefined',
//       colorPalette: parsedData.colorPalette || ['#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b'],
//       visualDescription: parsedData.visualDescription || `A modern interpretation of ${productIdea}`,
//       generatedAt: new Date().toISOString(),
//     };

//     return visualizationData;
//   } catch (error) {
//     console.error('Error generating visualization:', error);
    
//     // Return fallback data if API fails
//     return {
//       productTitle: `Innovative ${productIdea.split(' ').slice(0, 2).join(' ')}`,
//       description: `An innovative solution that brings ${productIdea.toLowerCase()} to life with cutting-edge technology and design.`,
//       targetAudience: 'Tech-savvy consumers, early adopters, ages 18-45',
//       tagline: 'Innovation Meets Excellence',
//       colorPalette: ['#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b'],
//       visualDescription: `A sleek, modern ${productIdea.toLowerCase()} with premium materials`,
//       generatedAt: new Date().toISOString(),
//     };
//   }
// }
import { VisualizationData } from '@/types';

// TEMPORARY: Replace with your actual API key for testing
// Get your key from: https://aistudio.google.com/app/apikey

export const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent';

console.log('Gemini Library - API Key Status:', GEMINI_API_KEY ? 'Loaded' : 'Missing');
console.log('Gemini Library - API Key length:', GEMINI_API_KEY?.length || 0);

export async function generateProductVisualization(
  productIdea: string,
  referenceImage?: string
): Promise<VisualizationData> {
  if (!GEMINI_API_KEY) {
    throw new Error('Gemini API key is not configured');
  }

  const prompt = `You are an expert product designer and marketing strategist. Analyze this product idea and generate a comprehensive visualization plan.

Product Idea: "${productIdea}"

Generate a JSON response with the following structure (ONLY return valid JSON, no markdown, no explanations):
{
  "productTitle": "A creative, marketable product name (3-5 words)",
  "description": "A compelling 2-3 sentence product description highlighting key features and benefits",
  "targetAudience": "Specific target demographic with age range and characteristics",
  "tagline": "A catchy, memorable tagline (5-8 words)",
  "colorPalette": ["#hexcolor1", "#hexcolor2", "#hexcolor3", "#hexcolor4", "#hexcolor5"],
  "visualDescription": "A detailed description of how this product would look visually (materials, shape, style)"
}

Requirements:
- Make the productTitle creative and premium-sounding
- Description should be compelling and highlight innovation
- Target audience should be specific with demographics
- Tagline should be memorable and inspiring
- Color palette should have 5 complementary hex colors that match the product vibe
- Visual description should be detailed enough to imagine the product

Return ONLY the JSON object, nothing else.`;

  try {
    console.log('Making request to Gemini API...');
    console.log('Product Idea:', productIdea);
    
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: prompt,
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 32,
          topP: 1,
          maxOutputTokens: 2048,
        },
      }),
    });

    console.log('Response status:', response.status);
    console.log('Response ok:', response.ok);

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Gemini API Error Response:', errorData);
      console.error('Full error:', JSON.stringify(errorData, null, 2));
      throw new Error(`API request failed: ${response.statusText} - ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    console.log('Gemini API Response:', JSON.stringify(data, null, 2));
    
    // Extract the generated text
    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text;
    
    if (!generatedText) {
      console.error('No content in response:', data);
      throw new Error('No content generated from API');
    }

    console.log('Generated text:', generatedText);

    // Clean the response - remove markdown code blocks if present
    let cleanedText = generatedText.trim();
    cleanedText = cleanedText.replace(/```json\n?/g, '');
    cleanedText = cleanedText.replace(/```\n?/g, '');
    cleanedText = cleanedText.trim();

    console.log('Cleaned text:', cleanedText);

    // Parse the JSON response
    const parsedData = JSON.parse(cleanedText);
    console.log('Parsed data:', parsedData);

    // Validate and return the data
    const visualizationData: VisualizationData = {
      productTitle: parsedData.productTitle || 'Innovative Product',
      description: parsedData.description || 'A revolutionary product solution.',
      targetAudience: parsedData.targetAudience || 'Modern consumers seeking innovation',
      tagline: parsedData.tagline || 'Innovation Redefined',
      colorPalette: parsedData.colorPalette || ['#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b'],
      visualDescription: parsedData.visualDescription || `A modern interpretation of ${productIdea}`,
      generatedAt: new Date().toISOString(),
    };

    console.log('Final visualization data:', visualizationData);
    return visualizationData;
  } catch (error) {
    console.error('!!! ERROR in generateProductVisualization !!!');
    console.error('Error type:', error instanceof Error ? error.constructor.name : typeof error);
    console.error('Error message:', error instanceof Error ? error.message : String(error));
    console.error('Full error:', error);
    
    // Return fallback data if API fails
    console.log('Returning fallback data...');
    return {
      productTitle: `Innovative ${productIdea.split(' ').slice(0, 2).join(' ')}`,
      description: `An innovative solution that brings ${productIdea.toLowerCase()} to life with cutting-edge technology and design.`,
      targetAudience: 'Tech-savvy consumers, early adopters, ages 18-45',
      tagline: 'Innovation Meets Excellence',
      colorPalette: ['#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b'],
      visualDescription: `A sleek, modern ${productIdea.toLowerCase()} with premium materials`,
      generatedAt: new Date().toISOString(),
    };
  }
}
