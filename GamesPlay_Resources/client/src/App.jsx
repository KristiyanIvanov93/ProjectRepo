import { Routes, Route } from 'react-router-dom';


import Header from './components/header/Header';
import Login from './components/login/Login';
import Home from './components/home/Home';
import Register from './components/register/Register';
import GameCatalog from './components/game-catalog/GameCatalog';
import GameCreate from './components/game-create/GameCreate';
import GameDetails from './components/game-details/GameDetails';
import { useState } from 'react';
import { AuthContext } from './api/contexts/authContext';



function App() {

    const [authState, setAuthState] = useState({});

    const changeAuthState = (state) => {
        localStorage.setItem('accessToken', state.accessToken); 
        setAuthState(state);
    };
    

    const contextData = {
        userId: authState._id,
        email: authState.email,
        acessToken: authState.acessToken,
        isAuthenticated: !!authState.email,
        changeAuthState,

    };

    return (
        <AuthContext.Provider value={contextData}>

            <div id="box">
                <Header></Header>

                <main id="main-content">
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/register' element={<Register />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/games' element={<GameCatalog />} />
                        <Route path='/games/create' element={<GameCreate />} />
                        <Route path='/games/:gameId/details' element={<GameDetails />} />


                    </Routes>
                </main>

            </div>
        </AuthContext.Provider>
    );
}

export default App;
