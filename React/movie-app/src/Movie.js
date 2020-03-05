import React from "react";
import PropTypes from "prop-types";
import "./Movie.css";

// component가 state가 필요 없을 경우에는 class component가 될 필요 없다. => function component 사용
function Movie({ year, title, summary, poster }) {
  return (
    <div class="movies_movie">
      <img src={poster} alt={title} title={title} />
      <div class="movie_data">
        <h3 class="movie_title">{title}</h3>
        <h5 class="movie_year">{year}</h5>
        <p class="moview_summary">{summary}</p>
      </div>
    </div>
  );
}

Movie.propTypes = {
  id: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  poster: PropTypes.string.isRequired
};

export default Movie;
