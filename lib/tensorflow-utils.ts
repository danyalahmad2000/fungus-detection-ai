export async function detectFungus(imageData: string): Promise<{ hasFungus: boolean; predictedClass: string }> {
  try {
    // Convert the image data to a Blob
    const blob = await fetch(imageData).then((res) => res.blob());

    // Create a FormData object and append the image file
    const formData = new FormData();
    formData.append('file', blob, 'image.jpg');

    // Send the image to the Flask API
    const response = await fetch('https://4b01-34-16-133-89.ngrok-free.app/predict', {
      method: 'POST',
      body: formData,
    });

    // Check if the request was successful
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Parse the JSON response
    const result = await response.json();

    // Return the boolean result and predicted class name
    return {
      hasFungus: result.has_fungus,
      predictedClass: result.predicted_class,
    };
  } catch (error) {
    console.error('Error during fungus detection:', error);
    throw error;
  }
}