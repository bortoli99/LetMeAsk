import { FormEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import logoImg from '../assets/images/logo.svg';
import { Button } from '../components/Button';
import { RoomCode } from '../components/RoomCode';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';

import '../styles/room.scss';

type RoomParams = {
    id: string;
};

type Question = {
    id: string;
    author: {
        name: string;
        avatar: string;
    };
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
}

type FirebaseQuestion = Record<string, {
    author: {
        name: string;
        avatar: string;
    };
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
}>;

export function Room() {

    const { user } = useAuth();
    const params = useParams<RoomParams>();
    const [ newQuestion, setNewQuestion ] = useState('');
    const [ questions, setQuestions ] = useState<Question[]>([]);
    const [ title, setTitle ] = useState('');

    useEffect(() => {
        const roomRef = database.ref("rooms/" + params.id);
        
        roomRef.on('value', room => {
            const data = room.val();
            const firebaseQuestion: FirebaseQuestion = data.questions ?? {};
            
            const parsedQuestion = Object.entries(firebaseQuestion).map(([key, value]) => {
                return {
                    id: key,
                    content: value.content,
                    author: value.author,
                    isHighlighted: value.isHighlighted,
                    isAnswered: value.isAnswered
                };
            });

            setTitle(data.title);
            setQuestions(parsedQuestion);

        });

    } , [params.id]);

    async function handleSendQuestion(event: FormEvent) {
        event.preventDefault();

        if (newQuestion.trim() === '') {
            return;
        }

        if (!user) {
            throw new Error("Não está logado");
        }

        const question = {
            content: newQuestion,
            author: {
                name: user.name,
                avatar: user.avatar
            },
            isHighlighted: false,
            isAnsewered: false
        };

        await database.ref('rooms/' + params.id + '/questions').push(question);

        setNewQuestion('');

    }


    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="LetMeAsk" />
                    <RoomCode code={params.id} />
                </div>
            </header>

            <main className="content">
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    { questions.length > 0 &&  <span>{questions.length} pergunta(s)</span> }
                </div>

                <form onSubmit={handleSendQuestion}>
                    <textarea placeholder="O que você quer perguntar?" onChange={event => setNewQuestion(event.target.value)} value={newQuestion} />

                    <div className="form-footer">
                        {user ?
                            (<div className="user-info">
                                <img src={user.avatar} alt={user.name}/>
                                <span>{user.name}</span>
                            </div>)
                            :
                            (<span>Para enviar uma pergunta, <button>faça seu login</button>.</span>)
                        }
                        <Button type="submit" >Enviar perguntar</Button>
                    </div>

                </form>

            </main>
        </div>
    );
}