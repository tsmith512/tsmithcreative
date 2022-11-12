---
title: Change Page Template Based on Panels Layout
summary: When Panels Everywhere would be too much, there is a way to override Drupal's page template for pages powered by Panels, leaving a more robust template for system pages.
layout: post
tags: [drupal, engineering]
---

I frequently use Panels for system pages and custom pages. In `page.tpl.php`,
the whole Panels layout is dumped into the `$content` variable in the primary
block region, which might not be the design intention. Because my custom Panels
layouts often replicate or enhance the layout defined in `page.tpl.php`, I like
using an alternate template suggestion for those pages which has less structure,
leaving Panels more freedom to take over the page. This can be a faster and
lighter weight alternative to activating Panels-based overrides for all system
pages or using a solution like [Panels Everywhere](https://drupal.org/project/panels_everywhere).

The [`panels_get_current_page_display`](http://drupalcontrib.org/api/drupal/contributions%21panels%21panels.module/function/panels_get_current_page_display/7)
returns useful information about the Panels display as an object, including a
`layout` property.

In [`template_preprocess_page`](https://api.drupal.org/api/drupal/includes%21theme.inc/function/template_preprocess_page/7),
we can declare additional theme hook suggestions to use other templates. This
example (in use on this site, actually) adds `page--panel.tpl.php` for any
Panels layout, but could easily be adapted for conditional templates based
on layout.

``` php
<?php
/**
 * Implements theme_preprocess_page()
 */
function tsmithcreative_preprocess_page(&$variables) {
  // Call a stripped down "page--panel.tpl.php" when Panels
  // covers the entire layout. Otherwise, the standard
  // page.tpl.php contains the two column structure with
  // Drupal's block layout.
  $panel = panels_get_current_page_display();
  if ( isset($panel) && !empty($panel->layout) ) {
    $variables['theme_hook_suggestions'][] = 'page__panel';
  }
}
```
