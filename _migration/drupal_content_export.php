// <?php

/**
 * @file
 * On a _LOCAL DEVELOPMENT INSTANCE_ this can be used by enabling the Devel
 * module and copying this entire file into /devel/php
 *
 * Adapted from @lukaswhite's module for the same purpose at
 * https://github.com/lukaswhite/Drupal-Jekyll-Export
 *
 * This version doesn't require a module installer and assumes you can just
 * yank the output markdown files from Drupal's temp directory, which was easy
 * given that it was running on a LOCAL INSTANCE. Hint: I'm yelling because
 * having the Devel module enabled on production is very bad for security.
 */

// Create the Jekyll Export temp folder
$directory = 'temporary://jekyll-export';
$success = file_prepare_directory($directory, FILE_CREATE_DIRECTORY | FILE_MODIFY_PERMISSIONS);

// Now create a directory for this export, using the current timestamp
$directory .= '/' . date('YmdHis');
$success = file_prepare_directory($directory, FILE_CREATE_DIRECTORY | FILE_MODIFY_PERMISSIONS);

$query = new EntityFieldQuery();
$query->entityCondition('entity_type', 'node')
  // Set to your node type or an array() of node types.
  ->entityCondition('bundle', 'project')
  // Setting this will grab published entities only
  ->propertyCondition('status', 1);
$query->propertyOrderBy('created', 'ASC');

$entities = $query->execute();

if (count($entities)) {
  $nids = array_keys($entities['node']);
  $nodes = node_load_multiple($nids);
}

// Monkeying around with all the fields was easier when I had dpm to inspect
// all the field contents; uncomment this for that. If you have many nodes, you
// may want to grab only a couple in this fashion.
// dpm($nodes);

// Iterate through each node:
foreach ($nodes as $node) {

  // Extract the body
  $fields = field_get_items('node', $node, 'body');
  $body = $fields[0]['value'];

  // Generate Jekyll's slug using the last component of the node's path alias
  $path_alias = drupal_get_path_alias('node/'.$node->nid);
  if (strpos($path_alias, '/')) {
    $alias = substr($path_alias, (strripos($path_alias, '/')+1));
  } else {
    $alias = $path_alias;
  }

  // Build the filename: 2017-02-28-slug.md
  $filename = date('Y-m-d', $node->created) . '-' . $alias . '.md';

  // Start building out all the images. Heredoc made the newlines easier, but
  // remember to terminate with a final \n because heredoc will omit it if you
  // do not.
  $images = <<<EOS
images:\n
EOS;

  // Here's how you _don't_ use Drupal's node arrays:
  foreach($node->field_project_images['und'] as $image) {
    // These files were stored in a directory specific to the field, I just
    // copied the whole load into a "legacy" directory in the Jekyll site.
    $img = str_replace('public://project_images/', '/assets/projects/legacy/', $image['uri']);
    $images .= <<<EOS
  - img: {$img}
    alt: {$image['alt']}
    title: {$image['title']}
    width: {$image['width']}
    height: {$image['height']}\n
EOS;
  }

  // Generate the YAML frontmatter.
  // Honestly this may have been easier in heredoc as well.
  // Note the inclusion of a field in the frontmatter -- if you need to do that,
  // double check that it doesn't need to be escaped first.
  $yaml = sprintf("---\ntitle: \"%s\"\nsummary: \"%s\"\ndate: %s\n%s\n---\n\n",
    $node->title, $node->field_teaser_description['und'][0]['value'], date('Y-m-d H:i:s', $node->created), $images);


  // Assemble the file: frontmatter then body, then an <hr/> before another
  // field I'm pulling inappropraitely.
  $contents = $yaml . $body . "\n\n---\n\n" . $node->field_project_notes['und'][0]['value'];

  // If you want to examine the output before you save it, uncomment these:
  // dpm($contents);
  // break;

  // Save the file in the directory created above
  file_unmanaged_save_data($contents, $directory . '/' . $filename, $replace = FILE_EXISTS_RENAME);
}
