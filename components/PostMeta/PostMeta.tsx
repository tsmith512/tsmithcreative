import style from './post-meta.module.scss';

interface CitationProps {
  pubTitle: keyof typeof pubs;
  pubUrl: string;
}

export interface PostMetaProps {
  date?: number[];
  citation?: CitationProps | null;
  tags?: string[];
}

const pubs = {
  '4K': 'The Four Kitchens Blog',
  'VERY': 'Very\'s Insights Blog',
  'TEST': 'Fleet News Service',
};

export const PostMeta = (props: PostMetaProps) => {
  return(
    <header className={style.postmeta}>
      <dl>
        { props.date && (
          <>
            <dt><span className="icon icon-calendar-light">Published</span></dt>
            <dd className="date">{props.date && new Date(...props.date as []).toDateString()}</dd>
          </>
        )}

        { props.citation && (
          <>
            <dt><span className="icon icon-penpaper-light">Appears On</span></dt>
            <dd className="citation"><a href={props.citation.pubUrl}>
              {pubs[props.citation.pubTitle]}
            </a></dd>
          </>
        )}

        { props.date && (
          <>
            <dt><span className="icon icon-tags-light">Tags</span></dt>
            <dd className="tags">
              <ul>
                {props.tags?.map((tag, i) => (<li key={i}>{ tag }</li>))}
              </ul>
            </dd>
          </>
        )}
      </dl>
    </header>
  );
};
