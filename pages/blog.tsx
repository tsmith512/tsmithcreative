import React from 'react';

import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';

import { getPosts, PostInterface } from '../lib/posts';
import { PostTeaserList } from '../components/PostTeaser/PostTeaser';
import { Article } from '../components';
import { ArticleProps } from '../components/Article/Article';

export const getStaticProps: GetStaticProps = async (context) => {
  const allPosts = getPosts();

  return {
    props: {
      posts: allPosts,
      info: {
        title: 'Blog',
        summary: 'Wherein I write about what I\'m learning about work, code, little adventures, and side projects.',
      },
    }
  }
};

interface AllPostsInterface {
  posts: PostInterface[];
  info: ArticleProps;
}

const BlogArchive: NextPage<AllPostsInterface> = ({ posts, info }) => {
  return (
    <Article {...info}>
      <div className="wrapper">
        <PostTeaserList posts={posts} />
      </div>
    </Article>
  )
};

export default BlogArchive;
