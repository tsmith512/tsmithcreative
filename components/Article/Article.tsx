import { Masthead } from '../Masthead/Masthead';
import style from './article.module.scss';

interface ArticleProps {
  children?: any;
  title: string;
  summary?: string;
}

export const Article = (props: ArticleProps) => {
  return(
    <>
      <Masthead title={props.title} summary={props.summary} />
      <div className={style.article}>
        {props.children}
      </div>
    </>
  );
};
