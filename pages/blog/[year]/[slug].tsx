import { NextPage } from 'next';
import Head from 'next/head';

import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';

import { Article, Media } from '../../../components';
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

  const postData = getPostMeta(filename);

  return {
    props: {
      meta: postData.data,
      content: await serialize(postData.content),
    }
  }
};

export const getStaticPaths = async () => {
  const paths = getPosts().map((post) => ({
    params: {
      year: post.date[0].toString(),
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
      <Article {...props.meta}>
        <div className="wrapper">
          <MDXRemote {...props.content} components={{Media}} />
        </div>
      </Article>
    </>
  );
}

export default BlogPost;
