import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "reactstrap";
function NotFound() {
    let navigate = useNavigate();
    return (
        <div className="d-flex flex-column mt-5 w-100 justify-content-center align-items-center">
            <h1 className="display-1">404</h1>
            <p className="m-0 lead">Pagina non trovata</p>

            <Button
                color="primary"
                className="mt-5"
                onClick={(e) => navigate("/")}>
                Vai all&apos;homepage
            </Button>
        </div>

    );
}
export default NotFound;