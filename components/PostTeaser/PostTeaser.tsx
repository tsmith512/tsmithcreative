import { PostInterface } from '../../lib/posts';
import { PostMeta } from '../PostMeta/PostMeta';
import style from './post-teaser.module.scss';

interface PostTeaserListInterface {
  posts: PostInterface[];
}

export const PostTeaserList = (props: PostTeaserListInterface) => {
  return (
    <ul className={style.list}>
      {props.posts.map(post => (<PostTeaser key={post.filename} {...post} />))}
    </ul>
  );
};

export const PostTeaser = (post: PostInterface) => {
  return (
    <li className={style.item}>
      <a href={post.url} className={style.thumbnail}>
        (Thumbnail)
      </a>
      <div className={style.description}>
        <h2><a className={style.link} href={post.url}>{post.data.title}</a></h2>
        {post.data?.summary && (<p>{post.data.summary}</p>)}
        <PostMeta {...post.data.meta} />
      </div>
    </li>
  );
};
