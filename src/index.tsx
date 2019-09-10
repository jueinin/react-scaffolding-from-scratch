import App from './App';
import 'react-hot-loader';
import React from 'react'
import ReactDom from 'react-dom';
import './index.scss';

if ((module as any).hot) {
    (module as any).hot.accept();
}

ReactDom.render(<App/>, document.getElementById('root'));