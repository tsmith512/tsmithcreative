import Link from 'next/link';

import style from './nav.module.scss';

export const Nav = () => {
  return (
    <header className={style.header}>
      <div className={style.wrapper + ' wrapper'}>
        <h1><a href="/"><span>Taylor Smith</span></a></h1>

        <nav>
          <ul>
            {/* @TODO: Active flags on site sections. */}
            <li><a href="/blog/">Blog</a></li>
            <li><a href="/projects/">Projects</a></li>
            <li><a href="/contact/">Contact</a></li>
            <li><a href="https://tsmith.photos/?utm_source=tsmithcreative&utm_medium=website&utm_campaign=blog">Photos</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
