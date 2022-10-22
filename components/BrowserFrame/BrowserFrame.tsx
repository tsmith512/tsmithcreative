import style from './browser-frame.module.scss';

interface BrowserFrameProps {
  children?: any;
  contents?: string;
}

export const BrowserFrame = (props: BrowserFrameProps) => {
  return(
    <div className={style.frame}>
      <div className={style.header}>
        <div className={style.left} />
        <div className={style.fill} />
        <div className={style.right} />
      </div>
      <div className={style.content} dangerouslySetInnerHTML={{ __html: props.contents || ''}}>
        { props.children }
      </div>
    </div>
  );
};
