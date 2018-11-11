import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <div>
      <Link to="/elever-utan-klass"><p>Elever som saknar klass</p></Link>
      <Link to="/lagg-till-elev"><p>Lägg till nya elever</p></Link>
      <Link to="/klass"><p>Hantera klasser</p></Link>
  </div>
);

export default Header;
