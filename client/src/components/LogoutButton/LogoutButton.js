import React, {useContext} from "react";
import Button from 'react-bootstrap/Button'
import AuthContext from "../../store/auth-context";

const LogoutButton = () => {
    const authCtx = useContext(AuthContext);

    const handleLogout = () => {
        authCtx.logout();
    };

    return (
        <div>
            <Button variant="secondary" onClick={handleLogout}>Logout</Button>
        </div>
    );
}

export default LogoutButton;