import React from 'react';
import { Table, Form } from 'react-bootstrap/'
import { Link, useLocation } from 'react-router-dom';

function FilmTable(props) {

  return (
    <Table>
      <tbody>
        {
          props.films.map((film) =>
            <FilmRow filmData={film} key={film.id} id={film.id}
              deleteFilm={props.deleteFilm} updateFilm={props.updateFilm} />
          )
        }
      </tbody>
    </Table>
  );
}

function FilmRow(props) {

  const formatWatchDate = (dayJsDate, format) => {
    return dayJsDate ? dayJsDate.format(format) : '';
  }

  // location is used to pass state to the edit (or add) view so that we may be able to come back to the last filter view
  const location = useLocation();

  return (
    <tr>
      <td>
        <Link to={"/edit/" + props.filmData.id} state={{nextpage: location.pathname}}>
          <i className="bi bi-pencil-square" />
        </Link>
        &nbsp; &nbsp;
        { /* Forces link to the same page so that has the same appearence of the edit link */ }
        <Link to={{}}> 
          <i className="bi bi-trash" onClick={() => { props.deleteFilm(props.id) }} />
        </Link>
      </td>
      <td>
        { /* NOTE: HTML collapses multiple withespaces into one, so "Hello      world!" becomes "Hello world!". If you want to keep them use white-space: pre-wrap; */}
        <p className={ [ 'keep-white-space', props.filmData.favorite ? "bi-favorite" : "" ].join(' ')}>
          {props.filmData.title}
        </p>
      </td>
      <td>
        <Form.Check type="checkbox" label="Favorite" checked={props.filmData.favorite}
          onChange={(event) => props.updateFilm({ ...props.filmData, "favorite": event.target.checked })} />
      </td>
      <td>
        {props.filmData.watchDate ? <small>{formatWatchDate(props.filmData.watchDate, 'MMMM D, YYYY')}</small> : ''}
      </td>
      <td>
        <Rating rating={props.filmData.rating} updateRating={(newRating) => props.updateFilm({ ...props.filmData, rating: newRating })} maxStars={5} />
      </td>
    </tr>
  );
}

function Rating(props) {
  return [...Array(props.maxStars)].map((el, idx) =>
    <i  key={idx} className={(idx < props.rating) ? "bi bi-star-fill" : "bi bi-star"} onClick={() => props.updateRating(idx+1)}/>
  )
}


export default FilmTable;