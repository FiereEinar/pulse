import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function randomDate() {
  //Month ranges between 1 to 12 months
  let month = Math.floor(Math.random() * (13 - 1) + 1)

  //Identifying months which has 31 days
  let oddDays = [1, 3, 5, 7, 8, 10, 12]

  //Picking random year between 1901 to 2005 (changed it to 2024 only)
  let year = Math.floor(Math.random() * (2024 - 2024) + 2024)

  //Checking whether random month we generated has 31 days
  let day31 = oddDays.includes(month)

  //Handling code if the month has 31 days
  if (day31) {
    //Generating date between 1 to 31 days
    let date = Math.floor(Math.random() * (32 - 1) + 1)
    return new Date(year + '-' + month + '-' + date)
  } else {
    //Checking whether the given year is a leap year and the month is february
    if (year % 4 == 0 && month == 2) {
      //Since its a leap year we should have date ranging between 1 to 29
      let date = Math.floor(Math.random() * (30 - 1) + 1)
      return new Date(year + '-' + month + '-' + date)
    }

    //checking whether the given year is not a leap year and the month is february
    else if (year % 4 != 0 && month == 2) {
      //Since month is february, we are generating date ranging between 1 to 28
      let date = Math.floor(Math.random() * (29 - 1) + 1)
      return new Date(year + '-' + month + '-' + date)
    } else {
      //Since it is not a leap year and the month is not february, we are generating date between 1 to 30
      let date = Math.floor(Math.random() * (31 - 1) + 1)
      return new Date(year + '-' + month + '-' + date)
    }
  }
}

/**
 * Get random elements from an array
 * @param {Array} array - The array to get random elements from
 * @param {number} amount - The number of random elements to return
 * @returns {Array} - An array of random elements
 */
export const getRandomElements = (array, amount) => {
  const shuffled = array.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, amount);
};

export const shuffleArray = (array) => {
  return array.sort(() => 0.5 - Math.random());
}

export const selectRandom = (array) => {
  return array[Math.floor(Math.random() * array.length)]
}

export const randInt = (max) => {
  return Math.floor(Math.random() * max)
}

export const truncateText = (content, wordLimit) => {
  const words = content.split(' ');
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(' ') + '...';
  }
  return content;
};