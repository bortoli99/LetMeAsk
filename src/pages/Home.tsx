import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleImg from '../assets/images/google-icon.svg'
import '../styles/auth.scss'
import { Button } from '../components/Button'

export function Home(){
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
                    <button className="create-room">
                        <img src={googleImg} ></img>
                        crie sua sala
                    </button>
                    <div className="separator">
                        ou entre em uma sala
                    </div>
                    <form>
                        <input type="text" placeholder="Digite o codigo da sala" />
                        <Button type="submit">
                            entrar na sala
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    )
}