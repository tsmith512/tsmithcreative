import { Masthead } from '../Masthead/Masthead';
import { PostMetaProps } from '../PostMeta/PostMeta';
import style from './article.module.scss';

export interface ArticleProps {
  children?: any;
  title: string;
  summary?: string;
  meta: PostMetaProps;
}

export const Article = ({children, ...meta}: ArticleProps) => {
  return(
    <>
      <Masthead {...meta} graphic={meta?.meta?.date && meta.meta.date.getFullYear()} />
      <div className={style.article}>
        {children}
      </div>
    </>
  );
};
