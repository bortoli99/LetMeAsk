import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleImg from '../assets/images/google-icon.svg'
import '../styles/auth.scss'
import { Button } from '../components/Button'

export function NewRoom(){
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
                    <h2>Criar uma nova sala</h2>
                    <form>
                        <input type="text" placeholder="Nome da Sala" />
                        <Button type="submit">
                            Criar sala
                        </Button>
                    </form>
                    <p>
                        Quer entrar numa sala existente? <a href="#">Clique Aqui</a>
                    </p>
                </div>
            </main>
        </div>
    )
}