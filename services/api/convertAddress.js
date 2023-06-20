import OpenCageApiClient from "opencage-api-client";
import { API_KEY } from "@env";

const getCoordinateAddress = async (destination) => {
  const { latitude, longitude } = destination;
  try {
    const response = await OpenCageApiClient.geocode({
      key: API_KEY,
      q: `${latitude},${longitude}`,
    });

    if (response.status.code === 200 && response.results.length > 0) {
      const address = response.results[0].formatted;
      return address;
    } else {
      console.error("Geocoding error:", response.status.message);
    }
  } catch (error) {
    console.error("Error geocoding position:", error);
  }
};

export default getCoordinateAddress;
