import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../services/api';

import './styles.css';

import Dropzone from '../../components/Dropzone';

function Form() {
    const history = useHistory();

    const [formData, setFormData] = useState({
        name: '',
        owner: '',
    });

    const [description, setDescription] = useState('');

    const [selectGenero, setSelectGenero] = useState('0');
    const [selectType, setSelectType] = useState('0');

    const [selectedFile, setSelectedFile] = useState<File>();

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;

        setFormData({ ...formData, [name]: value });
    }

    function handleTextareaChange(event: ChangeEvent<HTMLTextAreaElement>) {
        const { value } = event.target;

        setDescription(value);
    }

    function handleSelectGenero(event: ChangeEvent<HTMLSelectElement>) {
        const genero = event.target.value;

        setSelectGenero(genero);
    }

    function handleSelectType(event: ChangeEvent<HTMLSelectElement>) {
        const type = event.target.value;

        setSelectType(type);
    }

    toast.configure();

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        const { name, owner } = formData;
        const genero = selectGenero;
        const type = selectType;

        const data = {
            owner,
            name,
            genero,
            type,
            description,
            image_url: selectedFile,
        }
        
        await api.post('pet', data);

        toast.success('Cadastro criado!', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000,
            hideProgressBar: true,
        });

        history.push('/');
    }

    return (
        <div id="create-pet">
            <h1>CADASTRO</h1>
            <form onSubmit={handleSubmit}>
                <div className="field-group">
                    <div className="field">
                        <input
                            type="text"
                            name="owner"
                            id="owner"
                            placeholder="Nome completo"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="field">
                        <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Nome do Pet"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="field">
                        <select name="genero" id="genero" value={selectGenero} onChange={handleSelectGenero}>
                            <option value="0">Selecione um Genero</option>
                            <option value="1">Masculino</option>
                            <option value="2">Feminino</option>
                        </select>
                    </div>
                    <div className="field">
                        <select name="type" id="type" value={selectType} onChange={handleSelectType}>
                            <option value="0">Selecione um Tipo</option>
                            <option value="1">Cachorro</option>
                            <option value="2">Gato</option>
                        </select>
                    </div>
                    <div className="field">
                        <textarea 
                            name="description" 
                            id="description" 
                            cols={30} 
                            rows={3}
                            placeholder="Deixe uma observação carinhosa! <3"
                            onChange={handleTextareaChange}
                        >    
                        </textarea>
                    </div>

                    <Dropzone onFileUploaded={setSelectedFile} />
                </div>


                <button type="submit">
                    Cadastrar
                </button>
            </form>
        </div>
    );
}

export default Form;
