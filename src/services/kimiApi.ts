// Kimi API service
// Note: This is a placeholder implementation. You'll need to replace with actual Kimi API details.

interface KimiMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface KimiResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

export class KimiApiService {
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    // For now, we'll store the API key in localStorage
    // In production, this should be handled securely via a backend
    this.apiKey = localStorage.getItem('kimi_api_key') || '';
    this.baseUrl = 'https://api.moonshot.cn/v1'; // Replace with actual Kimi API endpoint
  }

  setApiKey(apiKey: string) {
    this.apiKey = apiKey;
    localStorage.setItem('kimi_api_key', apiKey);
  }

  getApiKey(): string {
    return this.apiKey;
  }

  async sendMessage(messages: KimiMessage[]): Promise<string> {
    if (!this.apiKey) {
      throw new Error('API Key is required. Please set your Kimi API key first.');
    }

    try {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: 'moonshot-v1-8k', // Replace with actual Kimi model name
          messages: messages,
          temperature: 0.7,
          max_tokens: 1000,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`API request failed: ${response.status} ${response.statusText}. ${errorData.error?.message || ''}`);
      }

      const data: KimiResponse = await response.json();
      
      if (!data.choices || !data.choices[0]) {
        throw new Error('Invalid response format from API');
      }

      return data.choices[0].message.content;
    } catch (error) {
      console.error('Kimi API Error:', error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('An unexpected error occurred while communicating with Kimi API');
    }
  }
}

export const kimiApi = new KimiApiService();