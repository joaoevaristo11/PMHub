/*
App.jsx é o "cérebro" da aplicação:

É o componente principal que controla toda a aplicação
Define onde cada página aparece
É chamado pelo index.js para iniciar tudo
*/

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Library from './pages/library';

function App(){
  return (
    // BrowserRouter ativa o sistema de navegação por URLs
    // Tem que envolver toda a aplicação para o routing funcionar
    <BrowserRouter>
      {/* Routes é o "gestor de decisões" - olha para a URL atual e decide que página mostrar */}
      <Routes>
        {/* Cada Route é uma "regra": se URL for X, mostra componente Y */}
        {/* Se user estiver em localhost:3000/ → mostra o componente Home */}
        <Route path="/" element={<Home />} />
        
        {/* Se user estiver em localhost:3000/library → mostra o componente Library */}
        <Route path="/library" element={<Library />} />
        
        {/* 
        Fluxo prático:
        1. User digita URL ou clica num link
        2. BrowserRouter deteta a mudança
        3. Routes compara a URL com cada Route
        4. Quando encontra match, renderiza o elemento correspondente
        5. App.jsx mantém-se igual, só troca o conteúdo interior
        
        É como um switch gigante que decide que "página" mostrar
        sem recarregar o browser (Single Page Application)
        */}
      </Routes>
    </BrowserRouter>
  )
}

export default App;