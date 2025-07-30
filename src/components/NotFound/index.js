import Navbar from '../Navbar'

import Slidebar from '../Slidebar'

import Context from '../../context/Context'

import './index.css'

const NotFound = () => (
  <Context.Consumer>
    {value => {
      const {theme} = value
      return (
        <div className="not-found-bg">
          <Navbar />
          <div className={theme ? 'notfound-bg-dark' : 'notfound-bg-light'}>
            <div className="flex-container">
              <div className="slider-container">
                <Slidebar />
              </div>
              <div className="notfound-sm">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png"
                  className="notfound-img"
                  alt="not found"
                />
                <h1>Page Not Found</h1>
                <p>We are sorry, the page you requested could not be found.</p>
              </div>
            </div>
          </div>
        </div>
      )
    }}
  </Context.Consumer>
)

export default NotFound
