import { createContext, useState } from "react";
import PropTypes from 'prop-types';
import app from "../firebase/firbase.init";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";


export const AuthContext = createContext(null);

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loader, setLoader] = useState(true);
    
    const auth = getAuth(app);

    const createUser = (email, password) => {
        setLoader(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signInUser = (email, password) =>{
        return signInWithEmailAndPassword(auth, email, password);
    }


    const userProvider = {
       loader,
       user,
       setUser,
       createUser,
       signInUser,
    }
    return (
        <AuthContext.Provider value={userProvider}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.object
}
export default AuthProvider;