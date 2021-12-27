
import { ReactNode } from 'react';
import './style.scss';

import classnames from 'classnames';

type QuestionProps = {
    content: string;
    author: {
        name: string;
        avatar: string;
    };
    children?: ReactNode;
    isAnswered?: boolean;
    isHighlighted?: boolean;
};

export function Question({isAnswered = false, isHighlighted = false , ...props}: QuestionProps){
    return (
        <div className={classnames('question' , { answered: isAnswered }, {highlighted: isHighlighted && !isAnswered})}>
            <p>
                {props.content}
            </p>
            <footer>
                <div className="user-info">
                    <img src={props.author.avatar} alt={props.author.name} />
                    <span>{props.author.name}</span>
                </div>
                <div>
                    {props.children}
                </div>
            </footer>
        </div>
    );    
}