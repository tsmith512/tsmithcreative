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
            <li><Link href="/blog/"><a>Blog</a></Link></li>
            <li><Link href="/projects/"><a>Projects</a></Link></li>
            <li><Link href="/contact/"><a>Contact</a></Link></li>
            <li><Link href="https://tsmith.photos/?utm_source=tsmithcreative&utm_medium=website&utm_campaign=blog"><a>Photos</a></Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
