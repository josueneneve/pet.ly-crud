import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Form from './pages/Form';

const Routes = () => {
    return (
        <BrowserRouter >
            <Route component={Form} path="/" exact />
        </BrowserRouter>
    );
}

export default Routes;
