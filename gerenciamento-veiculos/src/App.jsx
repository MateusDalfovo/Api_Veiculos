import './App.css'
import axios from 'axios';
import React, { useState, useEffect } from 'react';


function App() {
  const [veiculos, setVeiculos] = useState([]);
  const [novoVeiculo, setNovoVeiculo] = useState({
    placa: '',
    montadora: '',
    modelo: '',
    ano: '',
  });

  useEffect(() => {
    fetchVeiculos();
  }, []);
  
  const fetchVeiculos = async () => {
    try {
      const response = await axios.get('http://localhost:8090/veiculos');
      setVeiculos(response.data);
    } catch (error) {
      console.error('Erro ao buscar veículos:', error);
    }
  };
  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNovoVeiculo((prevVeiculo) => ({
      ...prevVeiculo,
      [name]: value,
    }));
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:8090/veiculos', novoVeiculo);
      fetchVeiculos();
      setNovoVeiculo({
        placa: '',
        montadora: '',
        modelo: '',
        ano: '',
      });
    } catch (error) {
      console.error('Erro ao criar veículo:', error);
    }
  };
  
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8090/veiculos/${id}`);
      fetchVeiculos();
    } catch (error) {
      console.error('Erro ao excluir veículo:', error);
    }
  };
  
  const handleUpdate = async (id, veiculoAtualizado) => {
    try {
      await axios.put(`http://localhost:8090/veiculos/${id}`, veiculoAtualizado);
      fetchVeiculos();
    } catch (error) {
      console.error('Erro ao atualizar veículo:', error);
    }
  };
  

  return (
    <div>
      {/* Cabeçalho */}
      <h1 id='title'>Gerenciamento de Veículos</h1>
  
      {/* Formulário de adição de veículo */}
      <form onSubmit={handleSubmit}>
        {/* Campo para a placa */}
        <input
          type="text"
          name="placa"
          placeholder="Placa"
          value={novoVeiculo.placa}
          onChange={handleInputChange}
        />
        {/* Campo para a montadora */}
        <input
          type="text"
          name="montadora"
          placeholder="Montadora"
          value={novoVeiculo.montadora}
          onChange={handleInputChange}
        />
        {/* Campo para o modelo */}
        <input
          type="text"
          name="modelo"
          placeholder="Modelo"
          value={novoVeiculo.modelo}
          onChange={handleInputChange}
        />
        {/* Campo para o ano */}
        <input
          type="number"
          name="ano"
          placeholder="Ano"
          value={novoVeiculo.ano}
          onChange={handleInputChange}
        />
        {/* Botão de envio do formulário */}
        <button id='adc' type="submit">Adicionar Veículo</button>
      </form>
  
      {/* Lista de veículos */}
      <ul>
        {/* Mapeamento dos veículos */}
        {veiculos.map((veiculo) => (
          <li id='info' key={veiculo.id}>
            {/* Exibição dos detalhes do veículo */}
            {veiculo.placa} - {veiculo.montadora} {veiculo.modelo} - ({veiculo.ano})
            
            {/* Botão de exclusão */}
            <button id='dlet' onClick={() => handleDelete(veiculo.id)}>Excluir</button>
            
            {/* Botão de atualização */}
            <button
              id='updt'
              onClick={() =>
                handleUpdate(veiculo.id, {
                  ...veiculo,
                  modelo: novoVeiculo.modelo, // Exemplo de atualização
                  montadora: novoVeiculo.montadora, // Exemplo de atualização
                  ano: novoVeiculo.ano, // Exemplo de atualização
                })
              }
            >
              Atualizar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
  
}

export default App;
