import axios from "axios";

export const fetchNasaPosts = async (search) => {
  try {
    const { data } = await axios.get(`https://images-api.nasa.gov/search?q=${search}&media_type=image`);

    return data;
  } catch (e) {
    console.error('Error fetching nasa', e);
  }
}