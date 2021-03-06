import { createContext, ReactNode, useEffect, useState } from "react";
import { auth, firebase } from "../services/firebase";

type User = {
    id: string;
    name: string | null;
    avatar: string | null;
};

type AuthContextType = {
    user: User | undefined;
    signInWithGoogle: () => Promise<void>;
};

type AuthContextProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps) {

    const [user, setValue] = useState<User>();

    useEffect(() => {

        const unsubscribe = auth.onAuthStateChanged(user => {

            if (user) {

                const { displayName, photoURL, uid } = user;
                
                if (!user.displayName || !user.photoURL) {
                    throw new Error('Faltando Informações da Conta Google');
                }

                setValue({
                    id: uid,
                    name: displayName,
                    avatar: photoURL
                });

            }

        });

        return () => {
            unsubscribe();
        }

    }, []);

    async function signInWithGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider();

        const res = await auth.signInWithPopup(provider);

        if (res.user) {
            const { displayName, photoURL, uid } = res.user;

            if (!displayName || !photoURL) {
                throw new Error('Faltando Informações da Conta Google');
            }

            setValue({
                id: uid,
                name: displayName,
                avatar: photoURL
            });

        }

    }


    return (
        <AuthContext.Provider value={{ user, signInWithGoogle }}>
            {props.children}
        </AuthContext.Provider>
    );
}