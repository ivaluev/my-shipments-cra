import React from 'react'
import { ThemeProvider } from 'emotion-theming'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { Global } from '@emotion/core'

import lightTheme from './styles/themes/light'
import normalize from './styles/normalize'
import globals from './styles/globals'

import Root from './layout/Root'
import Header from './layout/Header'

import Movies from './pages/Movies'
import About from './pages/About'

export default function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <Root>
        <Global styles={normalize} />
        <Global styles={globals} />
        <Router>
          <Header title="IMDb movies search" />
          <Switch>
            <Route path="/" exact>
              <Redirect to="/movies" />
            </Route>
            <Route path="/movies" component={Movies} />
            <Route path="/about" exact component={About} />
            <Route component={() => <div>Not Found</div>} />
          </Switch>
        </Router>
      </Root>
    </ThemeProvider>
  )
}
