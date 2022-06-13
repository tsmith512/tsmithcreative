import style from './media.module.scss';

interface MediaProps {
  alt?: string;
  caption?: string;
  src?: string;
  type?: string;
  size?: string;
  shadow?: boolean;
}

export const Media = (props: MediaProps) => {
  const containerClasses: string[] = [style.media];
  const mediaClasses: string[] = [];

  let src = props.src;

  if (typeof props.shadow === 'undefined' || props.shadow) {
    mediaClasses.push(style.shadow);
  }

  if (props?.size && style.hasOwnProperty(props.size)) {
    mediaClasses.push(style[props.size]);
  } else {
    mediaClasses.push(style.defaultSize);
    containerClasses.push(style.defaultSizeContainer)
  }

  if (props?.type === 'placeholder') {
    const text = props.alt ? encodeURIComponent(props.alt) : 'Placeholder Image';
    src = `https://via.placeholder.com/960x560/333333/999999/?text=${text}`;
  }

  return (
    <figure className={containerClasses.join(' ')}>
      <img src={src} className={mediaClasses.join(' ')} alt={props?.alt || ''} />
      {props.caption && (<figcaption>{props.caption}</figcaption>)}
    </figure>
  );
};
