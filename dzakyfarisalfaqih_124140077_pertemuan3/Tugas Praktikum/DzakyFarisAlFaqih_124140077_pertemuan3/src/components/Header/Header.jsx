import PropTypes from 'prop-types'
import './Header.css'

function Header({ title, description = '' }) {
    return (
        <header className="site-header">
            <div className="site-header__inner">
                <p className="site-header__eyebrow">CATATAN BACAAN PRIBADI</p>
                <h1>{title}</h1>
                {description && <p className="site-header__description">{description}</p>}
            </div>
        </header>
    )
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
}

export default Header
