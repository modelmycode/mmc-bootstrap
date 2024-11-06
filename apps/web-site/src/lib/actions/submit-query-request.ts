'use server';

import { z } from 'zod'

export async function submitQueryRequest(businessCapability: string, queryName: string, data?: unknown) {

  try {
    const body = JSON.stringify({
      businessCapability: businessCapability,
      query: queryName,
      payload: {data: data}
    });
    const response = await fetch('http://localhost:3100/api/query', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    })

    if (!response.ok) {
      console.error('Error submitting request:', response?.statusText);
      return { success: false, message: response?.statusText as string ?? ''};
    }

    const message = (response.body) ? await response.json() : ''
    return { success: true, message };
  } catch (error) {
    console.error('Error submitting request:', error);
    return { success: false, message: error};
  }
}
