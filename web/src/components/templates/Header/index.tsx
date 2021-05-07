import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaw } from '@fortawesome/free-solid-svg-icons'

import './styles.css';

function Header() {
    return (
        <header>
            <h1>Pet.Ly Registration <FontAwesomeIcon icon={faPaw} /></h1>
        </header>
    );
}

export default Header;
