import { NextPage } from 'next';
import Head from 'next/head';
import { Article } from '../../../components';
import { findPost, getPostMeta, getPosts } from '../../../lib/posts';

const AllowedComponents = {};

export const getStaticProps = async (context: any) => {

  if (!context.params?.year || !context.params?.slug) {
    return { notFound: true };
  }

  const filename = findPost(context.params.year, context.params.slug);
  if (!filename) {
    return { notFound: true };
  }

  return {
    props: {
      post: getPostMeta(filename),
    }
  }
};

export const getStaticPaths = async () => {
  const paths = getPosts().map((post) => ({
    params: {
      year: post.date.getFullYear().toString(),
      slug: post.slug,
    },
  }))

  return {
    paths,
    fallback: false,
  };
};

const BlogPost: NextPage = (props: any) => {
  return (
    <>
      <Head>
        <title></title>
      </Head>
      <Article {...props.post.data}>
        <div className="wrapper">
          { props.post.children }
        </div>
      </Article>
    </>
  );
}

export default BlogPost;
