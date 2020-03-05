import React from "react";
import axios from "axios";
import Movie from "../components/Movie";
import "./Home.css";

class Home extends React.Component {
  state = {
    isLoading: true,
    movies: []
  };

  getMovies = async () => {
    // 데이터를 가져오는데 시간이 걸리기 때문에 이를 기다리게 하기 위해 async await 사용(비동기를 동기식으로)
    // movies.data.data.movies -> { data: { data: { movies } } } 이렇게 가져와서 movies 변수 사용 가능
    const {
      data: {
        data: { movies }
      }
    } = await axios.get(
      "https://yts-proxy.now.sh/list_movies.json?sort_by=rating"
    );
    // this.setState({ movies: movies });  => { state: axios } 이 코드를 밑에처럼 movies 하나만 작성해도 동작함
    this.setState({ movies, isLoading: false });
  };

  componentDidMount() {
    this.getMovies();
  }

  render() {
    const { isLoading, movies } = this.state;
    return (
      <section className="container">
        {isLoading ? (
          <div className="loader">
            <span className="loader_text">Loading...</span>
          </div>
        ) : (
          <div className="movies">
            {movies.map(movie => (
              <Movie
                key={movie.id}
                id={movie.id}
                year={movie.year}
                title={movie.title}
                summary={movie.summary}
                poster={movie.medium_cover_image}
                genres={movie.genres}
              />
            ))}
          </div>
        )}
      </section>
    );
  }
}

export default Home;
