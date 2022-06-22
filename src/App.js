import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home.jsx';
import Login from './components/Login/Login';
import Lhome from './components/Login/Lhome.jsx';
import Create from './components/Login/Create.jsx';
import FreeBoard from './components/Board/FreeBoard';
import WriteFreeBoard from './components/Board/WriteFreeBoard';
import BoardDetails from './components/Board/BoardDetails';
import UpdateBoardPost from './components/Board/UpdateBoardPost';
import StudyBoard from './components/Board/StudyBoard';
import WriteStudyBoard from './components/Board/WriteStudyBoard';

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
        <Route path='BoardDetails' element={<BoardDetails boardService={boardService} />}></Route>
        <Route path='UpdateBoardPost'element={<UpdateBoardPost />}></Route>
        <Route path='StudyBoard' element={<StudyBoard />}></Route>
        <Route path='/WriteStudyBoard' element={<WriteStudyBoard boardService={boardService}/>}></Route>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
