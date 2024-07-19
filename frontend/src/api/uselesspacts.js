import axios from "axios";

export const fetchUselessFact = async () => {
  try {
    const { data } = await axios.get('https://uselessfacts.jsph.pl/api/v2/facts/random');

    return data;
  } catch (e) {
    console.error('Error fetching useless facts', e);
  }
}