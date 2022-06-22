import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import AuthService from './service/auth_service';
import {app} from './service/firebase';
import BoardService from './service/board_service';

const authService = new AuthService(app);
const boardService = new BoardService();

ReactDOM.render(
  <React.StrictMode>
    <App authService={authService} boardService={boardService}/>
  </React.StrictMode>,
  document.getElementById('root')
);


