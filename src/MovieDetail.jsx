import { useParams } from 'react-router-dom';
import { useStates } from './utilities/states';
import { useEffect } from 'react';

export default function () {

  // read the id param from the url
  const { id } = useParams();

  // read the shared state/context main
  // that was set in App and contains the movie list
  const s = useStates('main');

  // find our movie and deconstruct properties from it to variables
  const movie = s.movies.find(movie => movie.id == id);
  const { title, description } = movie;
  const { length, categories, posterImage } = description;

  useEffect(() => {
    movie.description.length = 'VERY LONG MOVIE!';
  }, []);

  return <div className="movie-detail">
    <body>
      <h3>{title}</h3>
      <h4>Length: {length} minutes</h4>
      <h4>Categories: {categories.join(', ')}</h4>
      <img src={'https://cinema-rest.nodehill.se' + posterImage} />
      <hr />
    </body>
  </div>
}