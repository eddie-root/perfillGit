import './styles.css';
import { useState } from 'react';
import axios from 'axios';
import ResultCard from 'components/ResultCard';

type FormData = {
  name: string;
}

type Perfil = {

  url: string;
  name: string;
  location: string;
  followers: number;

}


const GitSearch = () => {

  const [perfil, setPerfil] = useState<Perfil>();

  const [formData, setFormData] = useState<FormData>({
    name: ''
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData({ ...formData, [name]: value });
  }

  const handleSubmint = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    axios.get(`https://api.github.com/users/${formData.name}`)
      .then((response) => {
        setPerfil(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        setPerfil(undefined);
      })
  }

  return (
    <div className="search-container ">
      <div className="git-search-container">
        <h1>Encontre um perfil Github</h1>
        <form onSubmit={handleSubmint}>
          <div className="form-container">
            <input
              type="text"
              name="name"
              value={formData.name}
              className="search-input"
              placeholder="Usuário Github"
              onChange={handleChange}
            />

          </div>
          <button type="submit" className="btn btn-primary search-button">
            Encontrar
          </button>
        </form>
      </div>
      <div className='resultcard-container'>

        {perfil &&
          <div className='information-section'>
            <div className='result-section'>
              <div className='perfil-text'>Informações</div>
              <ResultCard title='Perfil: ' description={perfil?.url} />
              <ResultCard title='Seguidores: ' description={String(perfil?.followers)} />
              <ResultCard title='Locação: ' description={perfil?.location} />
              <ResultCard title='Nome: ' description={perfil?.name} />
            </div>
          </div>
        }

      </div>
    </div >
  );
};

export default GitSearch;
