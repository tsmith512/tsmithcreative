import { PostMeta, PostMetaProps } from '../PostMeta/PostMeta';
import style from './masthead.module.scss';

interface MastheadProps {
  title: string;
  summary?: string;
  graphic?: string | number;
  meta?: PostMetaProps;
}

export const Masthead = (props: MastheadProps) => {
  const graphic = style[`masthead-${props?.graphic || 'page'}`];

  return (
    <div className={[style.masthead, graphic].join(' ')}>
      {/* @TODO: ^^ The "year" classes */}
      <div className={style.mastheadContent}>
        <h1>{props.title}</h1>

        <PostMeta {...props.meta} />
          <section className={style.summary}>
            {props.summary}
          </section>
      </div>
    </div>
  );
};
