import React from 'react'
import PropTypes from 'prop-types'

const ErrorMessage = ({mensaje}) => {
    return (
        <div>
            <h2>{mensaje.title}</h2>
            <br/>
            <h3>{mensaje.title2}</h3>
            <br/>
            <p>{mensaje.permission}</p>
            <br/>
            <p>{mensaje.description}</p>
        </div>
    )
}

ErrorMessage.propTypes = {
    title: PropTypes.string.isRequired,
    title2: PropTypes.string.isRequired,
    permission: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    mensaje: PropTypes.shape({
        title: PropTypes.string.isRequired,
        title2: PropTypes.string.isRequired,
        permission: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired
    })
}

ErrorMessage.defaultProps ={
    title: "default Title",
    title2: "default Title2",
    permission: "default permission",
    description: "default description",
    mensaje: {
        title: "default Title",
        title2: "default Title2",
        permission: "default permission",
        description: "default description"
    }
} 

export default ErrorMessage
