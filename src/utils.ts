import { request } from 'graphql-request';
import axios from 'axios';

// Function to make a GraphQL request
export async function makeQuery(url: string, query: string, token: string): Promise<any> {
  try {

    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const data = await request({
      url: url,
      document: query,
      requestHeaders: headers,
    });
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// Function to get the bearer token
export async function getBearerToken(tenantId: string, apiEndpoint: string, tokenPath: string, clientId: string, clientSecret: string): Promise<string> {
  try {
    const tokenUrl = `https://${tenantId}.${apiEndpoint}${tokenPath}`;
    const adminScope = `https://${apiEndpoint}/scopes/admin`;

    const data = {
      grant_type: 'client_credentials',
      client_id: clientId,
      client_secret: clientSecret,
      scope: adminScope
    };

    const response = await axios.post(tokenUrl, data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    return response.data.access_token;
  } catch (error) {
    console.error('Error obtaining bearer token:', error);
    process.exit(1);
  }
}