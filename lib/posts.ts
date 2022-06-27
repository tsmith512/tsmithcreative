import fs from 'fs';
import { join } from 'path';

import matter from 'gray-matter';

// @TODO: The shape of this interface should be refactored and it should be in here.
import { ArticleProps } from '../components/Article/Article';
import { filterLiquid } from './migrate';

const postDirectory = join(process.cwd(), '_posts');

export interface PostInterface {
  slug: string;
  filename: string;
  url: string;
  content: string;
  date: number[]; // @TODO: requird here for sorting posts but optional on ArticleProps. gross.
  data: ArticleProps;
}

export const getPosts = (): PostInterface[] => {
  const files = fs.readdirSync(postDirectory);

  const posts = files
    .map((file) => getPostMeta(file))
    // @TODO: A filename sort will work because alpha on YYYY-MM-DD-slug is date-ordered
    .sort((p1, p2) => (p1.filename > p2.filename ? -1 : 1));

  return posts;
}

export const findPost = (year: number | string, slug: string): string | undefined => {
  const files = fs.readdirSync(postDirectory);

  return files
    .filter(filename => filename.startsWith(year.toString()))
    .filter(filename => filename.replace(/\.\w{2,3}$/, '').endsWith(slug))
    .shift();
};

export const getPostMeta = (filename: string): PostInterface => {
  let parts = filename.replace(/\.mdx?$/, '').split('-');
  const slug = parts.splice(3).join('-');
  const dateParts = parts.map(i => parseInt(i));

  const postFile = join(postDirectory, filename);

  const fileContents = fs.readFileSync(postFile, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    filename: filename,
    url: `/blog/${dateParts[0]}/${slug}`,
    date: dateParts,
    content: filterLiquid(content) || '',
    data: {
      title: data.title,
      summary: data.summary,
      meta: {
        date: dateParts,
        tags: data?.tags,
        citation: data.hasOwnProperty('citation') ? {
          pubTitle: data?.citation[0] || undefined,
          pubUrl: data?.citation[1] || undefined,
        } : null,
      }
    },
  };
};
