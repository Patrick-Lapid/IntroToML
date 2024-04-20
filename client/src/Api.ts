const predictImage = async (formData: any) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/predict-image/`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      console.error(data.error || "Failed to fetch prediction");
    }
  } catch (error: any) {
    console.error("Failed to upload image: " + error.message);
  }
};

export { predictImage };
