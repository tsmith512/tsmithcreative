import type { NextPage } from 'next';
import Head from 'next/head';
import { Masthead } from '../components';

const StyleGuide: NextPage = () => {
  return (
    <Masthead title="Styleguide Page" summary="For testing migrated components." />
  );
};

export default StyleGuide;
