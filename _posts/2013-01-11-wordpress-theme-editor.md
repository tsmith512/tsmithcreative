---
title: Custom Styles in WordPress Visual Editor
summary: Using custom, theme-specific stylesheets and classes in the WordPress visual editor helps administrators understand how their content will be formatted on the frontend.
layout: post
tags: [admin experience, wordpress]
---

WordPress's visual editor ships with a solid set of styles, but they don't
always match custom styles from specialized themes. Clients are less intimidated
by the wysiwyg editor when they see the familiar styles from the front-end
display. Adding additional stylesheets for TinyMCE is relatively simple.

The following two functions can be placed in a theme's functions.php file or in
a project plugin.

## Add a stylesheet to the editor

Add your own CSS file to the editor by adding your stylesheet to the `$styles`
variable on the `mce_css` hook:

``` php
<?php
function theme_custom_editor_css($styles) {
  // Append <theme_root>/css/editor.css to the end of
  // the style list for TinyMCE
  $styles .= ',' . get_template_directory_uri() . "/css/editor.css";
  return $styles;
}
add_filter( 'mce_css', 'theme_custom_editor_css' );
```

## Add custom classes to the editor

You can also add a &ldquo;Styles&rdquo; menu to the editor for custom classes
which can be applied by the WYSIWYG to segments of text. The user will select a
chunk of text and use the Styles menu to wrap the text in a span with the
specified class. Unfortunately, this does not affect block-level elements. The
following function adds the <code>styleselect</code> menu, and then declares a
set of label/value pairs for styles. You should be sure to include these classes
in the editor CSS file you specified above.

``` php
<?php
function theme_custom_editor_options($options) {
  // Add a select list of custom inline classes next to the
  // block-level element menu. Be sure to define these in
  // your theme CSS and your editor CSS.
  $options['theme_advanced_buttons2_add_before'] = 'styleselect';
  $options['theme_advanced_styles'] = "Style Name=style_class";
  return $options;
}
add_filter('tiny_mce_before_init', 'theme_custom_editor_options' );
```
