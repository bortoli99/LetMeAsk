import { useParams } from 'react-router-dom';
import { Button } from '../components/Button';
import { Question } from '../components/Question';
import { RoomCode } from '../components/RoomCode';
import { useAuth } from '../hooks/useAuth';
import { useRoom } from '../hooks/useRoom';
import { database } from '../services/firebase';

import logoImg from '../assets/images/logo.svg';
import deleteImg from '../assets/images/delete.svg';
import checkImg from '../assets/images/check.svg';
import answerImg from '../assets/images/answer.svg';

import '../styles/room.scss';

type RoomParams = {
    id: string;
};

export function AdminRoom() {

    const { user } = useAuth();
    const params = useParams<RoomParams>();
    const { questions, title } = useRoom(params.id);

    async function handleEndRoom() {
        if (window.confirm('Tem certeza que você deseja encerrar a sala?')) {
            await database.ref('rooms/' + params.id).update({
                endedAt: new Date(),
            });
        }
    }

    async function handleCheckedQuestionAsAnswered(questionId: string) {
        await database.ref('rooms/' + params.id + '/questions/' + questionId).update({
            isAnswered: true
        });
    }

    async function handleHighlightQuestion(questionId: string) {
        await database.ref('rooms/' + params.id + '/questions/' + questionId).update({
            isHighlighted: true
        });
    }

    async function handleDeleteQuestion(questionId: string) {
        if (window.confirm('Tem certeza que você deseja excluir esta pergunta?')) {
            await database.ref('rooms/' + params.id + '/questions/' + questionId).remove();
        }
    }

    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="LetMeAsk" />
                    <div>
                        <RoomCode code={params.id} />
                        <Button isOutlined onClick={handleEndRoom} > Encerrar Sala </Button>
                    </div>
                </div>
            </header>

            <main className="content">
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
                </div>

                <div className="question-list">
                    {questions.map(question => {
                        return (
                            <Question
                                key={question.id}
                                content={question.content}
                                author={question.author}
                                isAnswered={question.isAnswered}
                                isHighlighted={question.isHighlighted}
                            >

                                {!question.isAnswered && (
                                    <>
                                        <button type="button" onClick={() => handleCheckedQuestionAsAnswered(question.id)}>
                                            <img src={checkImg} alt="Marca Pergunta como Respondida" />
                                        </button>
                                        <button type="button" onClick={() => handleHighlightQuestion(question.id)}>
                                            <img src={answerImg} alt="Dar destaque à Pergunta" />
                                        </button>
                                    </>
                                )}

                                <button type="button" onClick={() => handleDeleteQuestion(question.id)}>
                                    <img src={deleteImg} alt="Remover Pergunta" />
                                </button>
                            </Question>
                        );
                    })}
                </div>

            </main>
        </div>
    );
}