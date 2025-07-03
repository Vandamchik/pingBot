export async function apiHelper(endpoint = '', { method = 'GET', headers = {}, body = null } = {}) {
    const baseUrl = import.meta.env.VITE_API_BACK_URL;
  
    const config = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    };
  
    if (body) config.body = JSON.stringify(body);
  
    const res = await fetch(`${baseUrl}/api${endpoint}`, config);
  
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(errorText || 'Unknown error');
    }
  
    return await res.json();
  }
  