import React, { useState, useEffect, ChangeEvent } from 'react';
import { toast } from 'react-toastify';
import api from '../../services/api';

import 'react-toastify/dist/ReactToastify.css';
import './styles.css';
import Img from '../../img/dog-820014_1920.jpg'

interface Pet {
    id: number;
    name: string;
    description: string;
}

function Card() {
    let id = 0; 

    const [dataPet, setDataPet] = useState<Pet[]>([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        api.get('pet').then(response => {
            setDataPet(response.data);
        });
    }, []);

    toast.configure();

    function afterReanderAction() {
        const SECONDS_TO_RENDER = 1000 * 1.5;

        setTimeout(() => {
            window.location.reload();
        }, SECONDS_TO_RENDER);
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { value } = event.target;
        
        setName(value);
    }

    function handleTextareaChange(event: ChangeEvent<HTMLTextAreaElement>) {
        const { value } = event.target;

        setDescription(value);
    }


    function showUpdate(id: number) {
        const div = document.querySelector('.card-update');
        const classes = div?.classList;

        if (classes?.contains('hide-update') === true) {
            div?.classList.remove('hide-update');
            div?.classList.add('show-update');
        }

        api.get(`pet/${id}`).then(response => {
            setName(response.data.name);
            setDescription(response.data.description);
        });

        id = id;
    }

    function handleDeleteCard(id: number) {
        api.delete(`pet/${id}`);

        toast.success('Card removido!', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
            hideProgressBar: false,
        });

        afterReanderAction();
    }

    function handleUpdateCard() {
        const data = {
            name,
            description,
        }

        // api.patch(`pet/${id}`, data);

        toast.success('Card atualizado!', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
            hideProgressBar: false,
        });

        afterReanderAction();
    }

    return (
        <>
            <div className="card-list">
                <h1>LISTAGEM</h1>
                <div className="cards">
                    {dataPet.map(pet => (
                        <div className="card" key={pet.id}>
                            <img src={Img} alt={pet.name} />
                            <span>{pet.name}</span>
                            <p>{pet.description}</p>
                            <div className="actions">
                                <button onClick={() => handleDeleteCard(pet.id)}>Deletar</button>
                                <button onClick={() => showUpdate(pet.id)}>Editar</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="card-update hide-update">
                <h1>EDITAR</h1>
                <div className="fields">
                    <div className="field">
                        <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Atualize o nome do pet"
                            value={name}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="field">
                        <textarea
                            name="description"
                            id="description"
                            cols={30}
                            rows={2}
                            placeholder="Atualize a observação carinhosa! <3"
                            value={description}
                            onChange={handleTextareaChange}
                        >
                        </textarea>
                    </div>
                    <button onClick={() => handleUpdateCard()}>Atualizar</button>
                </div>
            </div>
        </>
    );
}

export default Card;
