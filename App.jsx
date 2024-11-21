import React, { useEffect, useState } from 'react';
import Card from './components/Card';

function App() {
  const [atividades, setAtividades] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [isAddingAtividade, setIsAddingAtividade] = useState(false);
  const [isAddingCliente, setIsAddingCliente] = useState(false);
  const [novaAtividade, setNovaAtividade] = useState({
    nome: '',
    matéria: '',
    data: 'yyyy-mm-dd',
    professor: '',
  });
  const [novoCliente, setNovoCliente] = useState({
    cpf: '',
    nome_completo: '',
    data_nascimento: '',
    email: '',
    telefone: '',
  });

  const filtroAtividadesPorStatus = (status) => atividades.filter(atividade => atividade.status === status);

  function adicionarAtividade() {
    setIsAddingAtividade(true);
  }

  function adicionarCliente() {
    setIsAddingCliente(true);
  }

  const salvarAtividade = async () => {
    try {
      await fetch('http://localhost:3000/atividades', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...novaAtividade, status: 'a fazer' }),
      });
      setIsAddingAtividade(false);
      setNovoAtividade({ nome: '', matéria: '', data: 'yyyy-mm-dd', professor: '' });
      buscarAtividades();
    } catch (error) {
      console.error('Erro ao salvar atividade:', error);
    }
  };

  const salvarCliente = async () => {
    try {
      await fetch('http://localhost:3000/clientes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novoCliente),
      });
      setIsAddingCliente(false);
      setNovoCliente({ cpf: '', nome_completo: '', data_nascimento: '', email: '', telefone: '' });
      buscarClientes();
    } catch (error) {
      console.error('Erro ao salvar cliente:', error);
    }
  };

  const buscarAtividades = async () => {
    try {
      const response = await fetch('http://localhost:3000/atividades');
      const data = await response.json();
      setAtividades(data);
    } catch (error) {
      console.error('Erro ao buscar atividades:', error);
    }
  };

  const buscarClientes = async () => {
    try {
      const response = await fetch('http://localhost:3000/clientes');
      const data = await response.json();
      setClientes(data);
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
    }
  };

  useEffect(() => {
    buscarAtividades();
    buscarClientes();
  }, []);

  return (
    <div>
      <header>
        <h1>Método kanban</h1>
        <button onClick={adicionarAtividade}>Adicionar Atividade</button>
        <button onClick={adicionarCliente}>Adicionar Cliente</button>
      </header>
      <div className="dashboard">
        <div className="coluna-dashboard">
          <h2>A fazer</h2>
          {filtroAtividadesPorStatus('a fazer').map(atividade => (
            <Card key={atividade.id} atividade={atividade} buscarAtividades={buscarAtividades} atividades={atividades} />
          ))}
        </div>
        <div className="coluna-dashboard">
          <h2>Entregues</h2>
          {filtroAtividadesPorStatus('entregue').map(atividade => (
            <Card key={atividade.id} atividade={atividade} buscarAtividades={buscarAtividades} atividades={atividades} />
          ))}
        </div>
        <div className="coluna-dashboard">
          <h2>Devolvidas</h2>
          {filtroAtividadesPorStatus('devolvida').map(atividade => (
            <Card key={atividade.id} atividade={atividade} buscarAtividades={buscarAtividades} atividades={atividades} />
          ))}
        </div>
      </div>
      {isAddingAtividade && (
        <div className="modal">
          <div className="modal-content">
            <h2>Adicionar Atividade</h2>
            <input
              placeholder="nome"
              value={novaAtividade.nome}
              onChange={(e) => setNovaAtividade({ ...novaAtividade, nome: e.target.value })}
            />
            <input
              placeholder="matéria"
              value={novaAtividade.matéria}
              onChange={(e) => setNovaAtividade({ ...novaAtividade,matéria: e.target.value })}
            />
            <input
              type="date"
              placeholder="data"
              value={novaAtividade.data}
              onChange={(e) => setNovaAtividade({ ...novaAtividade, data: parseInt(e.target.value) })}
            />
            <input
              placeholder="professor"
              value={novaAtividade.placa}
              onChange={(e) => setNovaAtividade({ ...novaAtividade, professor: e.target.value })}
            />
            <button onClick={salvarAtividade}>Salvar</button>
            <button onClick={() => setIsAddingAtividade(false)}>Cancelar</button>
          </div>
        </div>
      )}
      {isAddingCliente && (
        <div className="modal">
          <div className="modal-content">
            <h2>Adicionar Cliente</h2>
            <input
              placeholder="CPF"
              value={novoCliente.cpf}
              onChange={(e) => setNovoCliente({ ...novoCliente, cpf: e.target.value })}
            />
            <input
              placeholder="Nome Completo"
              value={novoCliente.nome_completo}
              onChange={(e) => setNovoCliente({ ...novoCliente, nome_completo: e.target.value })}
            />
            <input
              type="date"
              placeholder="Data de Nascimento"
              value={novoCliente.data_nascimento}
              onChange={(e) => setNovoCliente({ ...novoCliente, data_nascimento: e.target.value })}
            />
            <input
              placeholder="Email"
              value={novoCliente.email}
              onChange={(e) => setNovoCliente({ ...novoCliente, email: e.target.value })}
            />
            <input
              placeholder="Telefone"
              value={novoCliente.telefone}
              onChange={(e) => setNovoCliente({ ...novoCliente, telefone: e.target.value })}
            />
            <button onClick={salvarCliente}>Salvar</button>
            <button onClick={() => setIsAddingCliente(false)}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;


// import React, { useEffect, useState } from 'react';
// import CarroCard from './components/CarroCard';

// function App() {
//     const [carros, setCarros] = useState([]);
//     const [clientes, setClientes] = useState([]);
//     const [isAddingCarro, setIsAddingCarro] = useState(false);
//     const [isAddingCliente, setIsAddingCliente] = useState(false);

//     const [novoCarro, setNovoCarro] = useState({
//         modelo: '',
//         cor: '',
//         km: 0,
//         placa: '',
//     });

//     const [novoCliente, setNovoCliente] = useState({
//         cpf: '',
//         nome_completo: '',
//         data_nascimento: '',
//         email: '',
//         telefone: '',
//     });

//     const filtroCarrosPorSituacao = (situacao) => carros.filter(carro => carro.situacao === situacao);

//     function adicionarCarro() {
//         setIsAddingCarro(true);
//     }

//     function adicionarCliente() {
//         setIsAddingCliente(true);
//     }

//     const salvarCarro = async () => {
//         try {
//             await fetch('http://localhost:3000/carros', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ ...novoCarro, situacao: 'uso' }),
//             });
//             setIsAddingCarro(false);
//             setNovoCarro({ modelo: '', cor: '', km: 0, placa: '' });
//             buscarCarros();
//         } catch (error) {
//             console.error('Erro ao salvar carro:', error);
//         }
//     };

//     const salvarCliente = async () => {
//         try {
//             await fetch('http://localhost:3000/clientes', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(novoCliente),
//             });
//             setIsAddingCliente(false);
//             setNovoCliente({ cpf: '', nome_completo: '', data_nascimento: '', email: '', telefone: '' });
//             buscarClientes();
//         } catch (error) {
//             console.error('Erro ao salvar cliente:', error);
//         }
//     };

//     const buscarCarros = async () => {
//         try {
//             const response = await fetch('http://localhost:3000/carros');
//             const data = await response.json();
//             setCarros(data);
//         } catch (error) {
//             console.error('Erro ao buscar carros:', error);
//         }
//     };

//     const buscarClientes = async () => {
//         try {
//             const response = await fetch('http://localhost:3000/clientes');
//             const data = await response.json();
//             setClientes(data);
//         } catch (error) {
//             console.error('Erro ao buscar clientes:', error);
//         }
//     };

//     useEffect(() => {
//         buscarCarros();
//         buscarClientes();
//     }, []);

//     return (
//         <div className="App">
//             <header>
//                 <h1>Controle de Frota</h1>
//                 <div>
//                     <button onClick={adicionarCarro}>Novo Carro</button>
//                     <button onClick={adicionarCliente}>Novo Cliente</button>
//                 </div>
//             </header>

//             <div className="dashboard">
//                 <div className="coluna-dashboard">
//                     <h2>Uso</h2>
//                     {filtroCarrosPorSituacao('uso').map(carro => (
//                         <CarroCard key={carro.id} carro={carro} buscarCarros={buscarCarros} />
//                     ))}
//                 </div>
//                 <div className="coluna-dashboard">
//                     <h2>Alugados</h2>
//                     {filtroCarrosPorSituacao('alugado').map(carro => (
//                         <CarroCard key={carro.id} carro={carro} buscarCarros={buscarCarros} />
//                     ))}
//                 </div>
//                 <div className="coluna-dashboard">
//                     <h2>Manutenção</h2>
//                     {filtroCarrosPorSituacao('manutencao').map(carro => (
//                         <CarroCard key={carro.id} carro={carro} buscarCarros={buscarCarros} />
//                     ))}
//                 </div>
//             </div>

//             {isAddingCarro && (
//                 <div className="modal">
//                     <div className="modal-content">
//                         <h3>Cadastrar Novo Carro</h3>
//                         <label>
//                             Modelo:
//                             <input
//                                 type="text"
//                                 value={novoCarro.modelo}
//                                 onChange={(e) => setNovoCarro({ ...novoCarro, modelo: e.target.value })}
//                             />
//                         </label>
//                         <label>
//                             Cor:
//                             <input
//                                 type="text"
//                                 value={novoCarro.cor}
//                                 onChange={(e) => setNovoCarro({ ...novoCarro, cor: e.target.value })}
//                             />
//                         </label>
//                         <label>
//                             KM:
//                             <input
//                                 type="number"
//                                 value={novoCarro.km}
//                                 onChange={(e) => setNovoCarro({ ...novoCarro, km: Number(e.target.value) })}
//                             />
//                         </label>
//                         <label>
//                             Placa:
//                             <input
//                                 type="text"
//                                 value={novoCarro.placa}
//                                 onChange={(e) => setNovoCarro({ ...novoCarro, placa: e.target.value })}
//                             />
//                         </label>
//                         <div className="modal-buttons">
//                             <button onClick={salvarCarro}>Salvar</button>
//                             <button onClick={() => setIsAddingCarro(false)}>Cancelar</button>
//                         </div>
//                     </div>
//                 </div>
//             )}

//             {isAddingCliente && (
//                 <div className="modal">
//                     <div className="modal-content">
//                         <h3>Cadastrar Novo Cliente</h3>
//                         <label>
//                             CPF:
//                             <input
//                                 type="text"
//                                 value={novoCliente.cpf}
//                                 onChange={(e) => setNovoCliente({ ...novoCliente, cpf: e.target.value })}
//                             />
//                         </label>
//                         <label>
//                             Nome Completo:
//                             <input
//                                 type="text"
//                                 value={novoCliente.nome_completo}
//                                 onChange={(e) => setNovoCliente({ ...novoCliente, nome_completo: e.target.value })}
//                             />
//                         </label>
//                         <label>
//                             Data de Nascimento:
//                             <input
//                                 type="date"
//                                 value={novoCliente.data_nascimento}
//                                 onChange={(e) => setNovoCliente({ ...novoCliente, data_nascimento: e.target.value })}
//                             />
//                         </label>
//                         <label>
//                             E-mail:
//                             <input
//                                 type="email"
//                                 value={novoCliente.email}
//                                 onChange={(e) => setNovoCliente({ ...novoCliente, email: e.target.value })}
//                             />
//                         </label>
//                         <label>
//                             Telefone:
//                             <input
//                                 type="text"
//                                 value={novoCliente.telefone}
//                                 onChange={(e) => setNovoCliente({ ...novoCliente, telefone: e.target.value })}
//                             />
//                         </label>
//                         <div className="modal-buttons">
//                             <button onClick={salvarCliente}>Salvar</button>
//                             <button onClick={() => setIsAddingCliente(false)}>Cancelar</button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default App;

