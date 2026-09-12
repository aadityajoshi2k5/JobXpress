import { useAuth } from "../hooks/useAuth.js";
import { useNavigate, Navigate} from "react-router";
import { useState } from "react";
import React from 'react'

const Protected = ({ children }) => {
    const { loading, user } = useAuth();
    // const navigate = useNavigate();
    
    if (loading) {
        return (<main><h1>Loading...</h1></main>)
    }

    if (!user) {
        return <Navigate to={'/login'} />
        // navigate("/login");
    }

    return children
}

export default Protected
