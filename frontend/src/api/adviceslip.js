import axios from "axios";

export const fetchAdvice = async () => {
  try {
    const { data } = await axios.get('https://api.adviceslip.com/advice');

    return data;
  } catch (e) {
    console.error('Error fetching advice', e);
  }
}