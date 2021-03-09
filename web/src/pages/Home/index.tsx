import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import './styles.css';
import Img from '../../img/dog-820014_1920.jpg'

interface Pet {
    id: number;
    name: string;
    description: string;
}

function Home() {
    const [dataPet, setDataPet] = useState<Pet[]>([]);

    useEffect(() => {
        api.get('pet').then(response => {
            setDataPet(response.data);
        });
    }, []);

    function handleDeleteCard(id: number) {
        api.delete(`pet/${id}`);
    }

    return (
        <>
            <div id="home">
                <header>
                    <h1>Pet.Ly</h1>
                    <Link to="/create-pet">
                        <span>
                            Cadastro
                        </span>
                    </Link>
                </header>
                <main>
                    <div className="home-list">
                        <h1>LISTAGEM</h1>
                        <div className="cards">
                            {dataPet.map(pet => (
                                <div className="card" key={pet.id}>
                                    <img src={Img} alt={pet.name}/>
                                    <span>{pet.name}</span>
                                    <p>{pet.description}</p>
                                    <div className="action">
                                        <button onClick={() => handleDeleteCard(pet.id)}>Deletar</button>
                                        <button>Atualizar</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}

export default Home;
