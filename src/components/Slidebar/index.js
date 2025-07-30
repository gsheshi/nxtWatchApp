import {Link} from 'react-router-dom'

import {MdHome} from 'react-icons/md'
import {FaFire} from 'react-icons/fa'
import {SiYoutubegaming} from 'react-icons/si'
import {BiListPlus} from 'react-icons/bi'

import Context from '../../context/Context'

import './index.css'

const Sildebar = () => (
  <Context.Consumer>
    {value => {
      const {theme} = value

      return (
        <div
          className={
            theme ? 'categorys-container-dark' : 'categorys-container-light'
          }
        >
          <ul className="all-categorys-container">
            <li className="category">
              <Link to="/" className="link">
                <MdHome className="category-icon" />
                <p className="category-name">Home</p>
              </Link>
            </li>
            <li className="category">
              <Link to="/trending" className="link">
                <FaFire className="category-icon" />
                <p className="category-name">Trending</p>
              </Link>
            </li>
            <li className="category">
              <Link to="/gaming" className="link">
                <SiYoutubegaming className="category-icon" />
                <p className="category-name">Gaming</p>
              </Link>
            </li>
            <li className="category">
              <Link to="/saved-videos" className="link">
                <BiListPlus className="category-icon" />
                <p className="category-name">Saved videos</p>
              </Link>
            </li>
          </ul>
          <div className="contact-container">
            <p className="contact-heading">CONTACT US</p>
            <div className="contact-logos-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                alt="facebook logo"
                className="contact-website-logo"
              />
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                alt="twitter logo"
                className="contact-website-logo"
              />
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                alt="linked in logo"
                className="contact-website-logo"
              />
            </div>
            <p>Enjoy! Now to see your channels and recommendations!</p>
          </div>
        </div>
      )
    }}
  </Context.Consumer>
)

export default Sildebar
