import '../common/lib';
import ReactDOM from 'react-dom';
import React from 'react';
import { Router } from 'react-router';
import Routes from './router';

import {createHistory} from 'history';


ReactDOM.render( 
	<Router onUpdate={() => window.scrollTo(0, 0)} >
		{Routes}
	</Router>, 
	document.getElementById('react-content')
);
