import PropTypes from 'prop-types'

const Button = ({texto, color, onButtonClick}) => {
    return (
        <div>
            <button style = {{ backgroundColor: color }} onClick={onButtonClick} className="btn">{texto}</button>
        </div>
    )
}

Button.defaultProps = {
    texto: "Sin Texto",
    color: "black",
    onClick: function(){console.log("sin comportamiento especificado");},
}

Button.propTypes = {
    texto: PropTypes.string,
}

export default Button;
