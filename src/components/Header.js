import PropTypes from 'prop-types';
import Button from './Button';
import { useLocation } from "react-router-dom";

const Header = ({ title, nombreBoton, color, onButtonClick }) => {
    const location = useLocation();
    return (
        <header className="header">
            <h1>{title}</h1>
            {location.pathname === "/" && <Button
                onButtonClick={onButtonClick}
                texto={nombreBoton}
                color={color}
            />}
        </header>
    )
}

Header.defaultProps = {
    title: "Task Tracker",
}

Header.propTypes = {
    title: PropTypes.string,
}

export default Header
