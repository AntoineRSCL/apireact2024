import {Route, Navigate} from 'react-router-dom'

const Private = (props) => {
    return props.isAuthenticated ? (
        props.children
    ) : (
        <Navigate to="/login" replace={true}/>
    );
}
 
export default Private;