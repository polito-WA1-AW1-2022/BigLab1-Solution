/* 
 * [2021/2022]
 * 01UDFOV Applicazioni Web I / 01TXYOV Web Applications I
 * Lab 4 
 * 
 * Task source model has been defined as a constant outside from the App because it will be retrieved from the server in the future
 */

import dayjs from 'dayjs';

const FILMS = [
    { id: 1, title: "Pulp Fiction", favorite: true, watchDate: dayjs("2022-03-10"), rating: 5 },
    { id: 2, title: "21 Grams", favorite: true, watchDate: dayjs("2022-03-21"), rating: 5 },
    { id: 3, title: "Star Wars", favorite: false },
    { id: 4, title: "Matrix", favorite: true },
    { id: 5, title: "Shrek", favorite: false, watchDate: dayjs("2022-04-29"), rating: 3 }
];

export default FILMS;
