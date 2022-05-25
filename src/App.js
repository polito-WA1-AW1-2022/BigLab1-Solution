/*
 * [2021/2022]
 * 01UDFOV Applicazioni Web I / 01TXYOV Web Applications I
 * BigLab 1
 */

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';
import dayjs from 'dayjs';

import React, { useState } from 'react';
import { Container } from 'react-bootstrap/';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { MainLayout, AddLayout, EditLayout, DefaultLayout, NotFoundLayout, } from './components/PageLayout';
import { Navigation } from './components/Navigation';

import FILMS from './films';

function App() {

  /**
   * Defining a structure for Filters
   * Each filter is identified by a unique name and is composed by the following fields:
   * - A label to be shown in the GUI
   * - An ID (equal to the unique name), used as key during the table generation
   * - A filter function applied before passing the films to the FilmTable component
   */
  const filters = {
    'filter-all': { label: 'All', id: 'filter-all', filterFunction: () => true, },
    'filter-favorite': { label: 'Favorites', id: 'filter-favorite', filterFunction: (film) => film.favorite, },
    'filter-best': { label: 'Best Rated', id: 'filter-best', filterFunction: (film) => film.rating >= 5, },
    'filter-lastmonth': { label: 'Seen Last Month', id: 'filter-lastmonth', filterFunction: (film) => isSeenLastMonth(film), },
    'filter-unseen': { label: 'Unseen', id: 'filter-unseen', filterFunction: (film) => (film.watchDate ? false : true), },
  };

  const isSeenLastMonth = (film) => {
    if (film.watchDate == null || typeof film.watchDate.diff !== 'function')
      return false;
    return film.watchDate.diff(dayjs(), 'month') === 0;
  };

  // This state contains the list of films (it is initialized from a predefined array).
  const [films, setFilms] = useState(FILMS);

  // This function add the new film to the FilmLibrary
  const saveNewFilm = (newFilm) => {
    // The creation of a the id to identify the new item is a job of the database not of the frontend. Here we do not have the database so we delegate this job to the DAO functions
    const id = Math.max(...films.map((f) => f.id)) + 1;
    setFilms((oldFilms) => [...oldFilms, { id, ...newFilm }]);
  };

  const deleteFilm = (filmId) => {
    setFilms((oldFilms) => oldFilms.filter((f) => f.id !== filmId));
  };

  const updateFilm = (film) => {
    setFilms((oldFilms) => {
      return oldFilms.map((f) => {
        if (f.id === film.id)
          return {
            id: film.id,
            title: film.title,
            favorite: film.favorite,
            watchDate: film.watchDate,
            rating: film.rating,
          };
        else return f;
      });
    });
  };

  return (
    <BrowserRouter>
      <Container fluid className="App">
        <Navigation />

        <Routes>
          <Route path="/" element={ <DefaultLayout films={films} filters={filters}  /> } >
            <Route index element={ <MainLayout films={films} filters={filters} deleteFilm={deleteFilm} updateFilm={updateFilm} /> } />
            <Route path="filter/:filterLabel" element={ <MainLayout films={films} filters={filters}   deleteFilm={deleteFilm} updateFilm={updateFilm} /> } />
            <Route path="add" element={ <AddLayout filters={filters}   addFilm={(film) => saveNewFilm(film)} /> } />
            <Route path="edit/:filmId" element={ <EditLayout films={films} filters={filters}  editFilm={updateFilm} /> } />
            <Route path="*" element={<NotFoundLayout />} />
          </Route>
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
