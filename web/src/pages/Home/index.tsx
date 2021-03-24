import React from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

import Card from '../../components/Card';

function Home() {
    return (
        <>
            <div id="home">
                <aside>
                    <h1>Pet.Ly</h1>
                    <Link to="/create-pet">
                        <span>
                            Cadastro
                        </span>
                    </Link>
                </aside>
                <main>
                    <Card />
                </main>
            </div>
        </>
    );
}

export default Home;
