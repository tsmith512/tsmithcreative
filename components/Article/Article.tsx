import { Masthead } from '../Masthead/Masthead';
import { PostMetaProps } from '../PostMeta/PostMeta';
import style from './article.module.scss';

export interface ArticleProps {
  children?: any;
  title: string;
  summary?: string;
  thumbnail?: string | false; // @TODO: In a "meta" property is the right place for this, but it isn't used here...
  meta: PostMetaProps;
}

export const Article = ({children, ...meta}: ArticleProps) => {
  return(
    <>
      <Masthead {...meta} graphic={meta?.meta?.date && meta.meta.date[0]} />
      <div className={style.article}>
        {children}
      </div>
    </>
  );
};
