import React from 'react';
import ReactDom from 'react-dom';
import Main from './components/Main';
// Router.run(routes, Router.HistoryLocation, (Handler, state) =>{
// 	React.render(<Handler {...state} />, document.getElementById('app'));
// });

ReactDom.render(<Main />, document.getElementById('app'))
