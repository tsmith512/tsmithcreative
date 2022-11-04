import type { NextPage } from 'next';
import Head from 'next/head';
import { Article, BrowserFrame, Media } from '../components';
import { ArticleProps } from '../components/Article/Article';

const StyleGuide: NextPage = () => {
  const sampleProps: ArticleProps = {
    title: 'Styleguide Page',
    summary: 'For testing migrated components.',
    meta: {
      date: [new Date().getFullYear(), new Date().getMonth(), new Date().getDate()],
      citation: {
        pubTitle: 'TEST',
        pubUrl: 'https://www.example.com',
      },
      tags: ['Tag 1', 'Tag 2', 'Tag 3'],
    },
  };

  return (
    <Article {...sampleProps}>
      <div className="wrapper">
        <h2>Basic Elements</h2>

        <p><em>Styled HTML or Markdown without specific components.</em></p>
        <p>
          <strong>Space&hellip;</strong> the <em>final frontier.</em> These are
          the voyages of the Starship Enterprise. Its continuing mission: to
          explore <a href="#">strange new worlds</a>; to seek out new life and
          new civilizations; to boldly go where no one has gone before.
        </p>

        <ul>
          <li>Malcolm Reynolds</li>
          <li>Benjamin Sisko</li>
          <li>James Holden</li>
          <li>Dylan Hunt</li>
        </ul>

        <ol>
          <li>Earth</li>
          <li>Mars</li>
          <li>The Belt</li>
        </ol>

        <blockquote>
          <p>
            At 0800 hours, station time, the Romulan Empire formally declared
            war against the Dominion. They've already struck fifteen bases along
            the Cardassian border. So, this is a huge victory for the good guys!
            This may even be the turning point of the entire war! There's even a
            <em>"Welcome to the Fight"</em> party tonight in the wardroom!
          </p>
          <p>
            So&hellip; I lied. I cheated. I bribed men to cover up the crimes of
            other men. I am an accessory to murder. But most damning of all&hellip;
            I think I can live with it. And if I had to do it all over again&hellip;
            I would. Garak was right about one thing: a guilty conscience is a
            small price to pay for the safety of the Alpha Quadrant. So I will
            learn to live with it. Because I can live with it...
          </p>
          <p>
            I can live with it.
          </p>
          <p>
            Computer &mdash; erase that entire personal log.
          </p>

          <cite>Benjamin Sisko, Deep Space Nine: "In the Pale Moonlight"</cite>
        </blockquote>

        <hr />

        <h2>Special Content Components</h2>

        <p><em>These are React components available in MDX.</em></p>

        <h3>Media Containers</h3>

        <p>
          It was the dawn of the third age of mankind &mdash; ten years after
          the Earth-Minbari War. The Babylon Project was a dream, given form. Its
          goal: to prevent another war, by creating a place where humans and
          aliens can work out their differences peacefully. It's a port of call
          &mdash; home away from home &mdash; for diplomats, hustlers,
          entrepreneurs, and wanderers.
        </p>

        <Media type="placeholder" alt="Default" caption="Media Placeholder, default size" />

        <p>
          Humans and aliens, wrapped in two million, five hundred thousand tons
          of spinning metal &mdash; all alone in the night. It can be a dangerous
          place, but it's our last best hope for peace.
        </p>

        <Media type="placeholder" size="small" alt="Small" caption="Media placeholder, small size" />

        <p>
          This is the story of the last of the Babylon stations. The year is
          2258. <em>The name of the place is Babylon 5.</em>
        </p>

        <Media type="placeholder" size="mini" alt="Mini" />

        <h3>Browser Frame</h3>

        <p>To wrap embedded sites or draw attention to UI screenshots.</p>

        <BrowserFrame>
          <iframe src="https://example.com" height="500px"></iframe>
        </BrowserFrame>
      </div>
    </Article>
  );
};

export default StyleGuide;