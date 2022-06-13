import style from './masthead.module.scss';

interface MastheadProps {
  title: string;
  summary?: string;
}

export const Masthead = (props: MastheadProps) => {
  return (
    <div className={style.masthead}>
      {/* @TODO: ^^ The "year" classes */}
      <div className={style.mastheadContent}>
        <h1>{props.title}</h1>

{/*
@TODO: This got abstracted to PostMeta...

        <header className={style.meta}>
          <dl>
            <dt><span class="icon icon-calendar-light">Published</span></dt>
            <dd class="date">{{ page.date | date: "%B %e, %Y"}}</dd>
            {% if page.citation %}
              <dt><span class="icon icon-penpaper-light">Appears On</span></dt>
              <dd class="citation"><a href="{{ page.citation[1]}}">
                {% case page.citation[0] %}
                  {% when "4K" %} Appears on the Four Kitchens Blog
                  {% when "VERY" %} Appears on Very's Insights
                {% endcase %}
              </a></dd>
            {% endif %}
            <dt><span class="icon icon-tags-light">Tags</span></dt>
            <dd class="tags">
              <ul>
                {% for tag in page.tags %}
                  <li>{{ tag }}</li>
                {% endfor %}
              </ul>
            </dd>
          </dl>
        </header>
*/}
          <section className={style.summary}>
            {props.summary}
          </section>
      </div>
    </div>
  );
};
