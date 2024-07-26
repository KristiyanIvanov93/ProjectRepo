import { Routes, Route } from 'react-router-dom';


import Header from './components/header/Header';
import Login from './components/login/Login';
import Home from './components/home/Home';
import Register from './components/register/Register';
import GameCatalog from './components/game-catalog/GameCatalog';
import GameCreate from './components/game-create/GameCreate';



function App() {

    return (
        <div id="box">
            <Header></Header>

            <main id="main-content">
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/games' element={<GameCatalog />} />
                    <Route path='/games/create' element={<GameCreate />} />

                </Routes>
            </main>

        </div>
    );
}

export default App;
