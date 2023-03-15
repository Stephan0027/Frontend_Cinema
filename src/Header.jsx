import { Link } from 'react-router-dom';

export default function Header() {

  return <>
    <Link to={'/'} style={{ color: 'inherit', textDecoration: 'inherit' }}>
      <h1 className="headerTitle">FEATURE FLICKS</h1>
    </Link>
  </>

}