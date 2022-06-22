import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home.jsx';
import Login from './components/Login.jsx';
import Lhome from './components/Lhome.jsx';
import Create from './components/Create.jsx';
import FreeBoard from './components/Board/FreeBoard';
import WriteFreeBoard from './components/Board/WriteFreeBoard';
import FreeBoardDetails from './components/Board/FreeBoardDetails';
import UpdateFreeBoardPost from './components/Board/UpdateFreeBoardPost';

function App({authService, boardService}) {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home authService={authService}/>}></Route>
        <Route path='/Lhome' element={<Lhome authService={authService}/>} /> 
        <Route path='/Create' element={<Create authService={authService}/>}></Route>
        <Route path='/FreeBoard' element={<FreeBoard />}></Route>
        <Route path='/WriteFreeBoard' element={<WriteFreeBoard boardService={boardService}/>}></Route>
        <Route path='FreeBoardDetails' element={<FreeBoardDetails boardService={boardService} />}></Route>
        <Route path='UpdateFreeBoardPost'element={<UpdateFreeBoardPost />}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
