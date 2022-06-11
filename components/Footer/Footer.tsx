import Link from 'next/link';

import style from './footer.module.scss';

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className={style.siteFooter}>
      <div className={style.copy}>
        &copy; {year} Taylor Smith
      </div>
      <div className={style.links}>
        <ul>
          {/* @TODO: RSS?? */}
          {/*<li><a href="/feed.xml" className="rss" rel="home" type="application/rss+xml">RSS: Taylor Smith's Blog</a></li>*/}
          <li><a href="https://linkedin.com/in/tsmith512" className="linkedin">LinkedIn</a></li>
          <li><a href="https://github.com/tsmith512" className="github">GitHub</a></li>
          <li><a href="https://instagram.com/tsmith512" className="instagram">Instagram</a></li>
          <li><a href="https://facebook.com/tsmith512" className="facebook">Facebook</a></li>
          <li><a href="https://twitter.com/tsmith512" className="twitter">Twitter</a></li>
        </ul>
      </div>
    </footer>
  );
}
