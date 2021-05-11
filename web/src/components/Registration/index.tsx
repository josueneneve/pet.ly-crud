import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw, faEnvelope, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import api from '../../services/api';

import './styles.css';
import Dog from '../../assets/img/dog.png';
import Cat from '../../assets/img/cat.png';

interface User {
    id: null;
    name: string;
    email: string;
    genero: string;
    type: string;
}

const initialState: User = {
    id: null,
    name: '',
    email: '',
    genero: '0',
    type: '0',
}

function Registration() {
    const [users, setUsers] = useState<User[]>([]);
    const [formData, setFormData] = useState({ ...initialState });
    const { name, email, genero, type } = formData;

    useEffect(() => {
        api.get('/posts').then(resp => {
            setUsers(resp.data);
        });
    }, []);

    function getUpdateList(user: User, del = false) {
        const newListUsers = users.filter(u => u.id !== user.id);
        if (!del) newListUsers.unshift(user);
        return newListUsers;
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    function handleSelectChange(event: ChangeEvent<HTMLSelectElement>) {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    function handleSubmit(event: FormEvent) {
        event.preventDefault();

        const data = { ...formData };

        const method = data.id !== null ? 'put' : 'post';
        const url = method !== 'post' ? `/posts/${data.id}` : '/posts';

        api[method](url, data).then(resp => {
            const list = getUpdateList(resp.data);
            setUsers(list);
        });
        setFormData({ ...initialState });
    }

    function handleDeleteUser(user: User) {
        api.delete(`/posts/${user.id}`);
        const list = getUpdateList(user, true);
        setUsers(list);
    }

    function handleUpdateUser(user: User) {
        setFormData({ ...user });
    }

    return (
        <>
            <form onSubmit={handleSubmit}>      
                <div className="field-group">
                    <label className="input-container">
                        <FontAwesomeIcon icon={faPaw} />
                        <input
                            type="text"
                            name="name"
                            value={name}
                            placeholder="Enter your name dog"
                            onChange={handleInputChange}
                        />
                    </label>
                    <label className="input-container">
                        <FontAwesomeIcon icon={faEnvelope} />
                        <input
                            type="email"
                            name="email"
                            value={email}
                            placeholder="Enter your e-mail"
                            onChange={handleInputChange}
                        />
                    </label>
                    <select name="genero" id="genero" value={genero} onChange={handleSelectChange}>
                        <option value="0">Select a Genero</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                    <select name="type" id="type" value={type} onChange={handleSelectChange}>
                        <option value="0">Select a Type</option>
                        <option value="Dog">Dog</option>
                        <option value="Cat">Cat</option>
                    </select>
                    <button type="submit" className="btn-save">
                            <span>Save</span>
                    </button>
                </div>
            </form>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>E-mail</th>
                        <th>Genero</th>
                        <th>Type</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => {
                        let typeImgAnimal = undefined;
                        switch(user.type) {
                            case 'Dog':
                                typeImgAnimal = Dog;
                                break;
                            case 'Cat':
                                typeImgAnimal = Cat;
                                break;
                        }

                        return (
                            <tr key={user.id}>
                                <td className="icon">
                                    <img src={typeImgAnimal} alt={user.type} />
                                </td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.genero}</td>
                                <td>{user.type}</td>
                                <td>
                                    <button onClick={() => handleUpdateUser(user)}>
                                        <FontAwesomeIcon icon={faEdit} />
                                    </button>
                                    <button onClick={() => handleDeleteUser(user)}>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
}

export default Registration;
