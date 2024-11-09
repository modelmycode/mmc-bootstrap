'use server';
export async function submitCommandRequest(businessCapability: string, commandName: string, data: any) {

  try {
    const body = JSON.stringify({
      businessCapability: businessCapability,
      payload: {
        ...data
      },
      command: commandName,
    });
    const response = await fetch('http://localhost:3100/api/command', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    });

    if (!response.ok) {
      console.error('Error submitting request:', response?.statusText);
      return { success: false, message: response?.statusText as string ?? ''};
    }

    return { success: true, message: { ...response.body }};
  } catch (error) {
    console.error('Error submitting request:', error);
    return { success: false, message: error};
  }
}
