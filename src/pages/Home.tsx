import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleImg from '../assets/images/google-icon.svg'
import '../styles/auth.scss'
import { Button } from '../components/Button'
import { useAuth } from '../hooks/useAuth'
import { FormEvent, useState } from 'react'
import { database } from '../services/firebase'

export function Home(){

    const {user, signInWithGoogle} = useAuth();
    const [ roomCode, setRoomCode ] = useState(''); 

    function handleCreateRoom(){
        if(!user){
            signInWithGoogle();
        }

    }

    async function handleJoinRoom(event: FormEvent){
        event.preventDefault();

        if(roomCode.trim() === ''){
            return;
        }

        const roomRef = await database.ref('rooms/' + roomCode).get();

        if(!roomRef.exists()){
            alert('Room does not exist');
            return ;
        }

        if(roomRef.val().endedAt){
            alert('A sala se encontra encerrada');
            return ;
        }


    }

    return (
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} ></img>
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo real</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} ></img>
                    <button  onClick={handleCreateRoom} className="create-room">
                        <img src={googleImg} ></img>
                        crie sua sala
                    </button>
                    <div className="separator">
                        ou entre em uma sala
                    </div>
                    <form onSubmit={handleJoinRoom}>
                        <input type="text" placeholder="Digite o codigo da sala" onChange={event => setRoomCode(event.target.value)} value={roomCode} />
                        <Button type="submit">
                            entrar na sala
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    )
}