<?php
/**
 * @package Prism Highlighter
 * @version 1.0.0
 */
/*
Plugin Name: PrismJS Syntax Highlighter
Plugin URI: https://github.com/herokunt/developer-sojourn/tree/master/src/wp-plugins/prism
Description: Highlight blocks of code in a variety of languages.
Author: Herokunt
Version: 1.0.0
Author URI: https://devontheroof.top/
*/

if( ! defined( 'ABSPATH' ) ) exit;

class PrismSyntaxHighlighter {
  function __construct() {
    // add_action('enqueue_block_editor_assets', array($this, 'load_block'));
    add_action('init', array($this, 'load_block'));
  }

  function load_block() {
    /*
      wp_enqueue_script(
        'load_syntax_highlighter',
        plugin_dir_url(__FILE__) . 'build/index.js,
        array('wp-blocks', 'wp-element', 'wp-editor')
      );
    */
    wp_register_script(
      'load_syntax_highlighter',
      plugin_dir_url(__FILE__) . 'build/index.js',
      array('wp-blocks', 'wp-element', 'wp-editor')
    );

    register_block_type('sojourn/prism-syntax-highlighter', array(
      'editor_script' => 'load_syntax_highlighter',
      'render_callback' => array($this, 'save_to_database')
    ));
  }

  function save_to_database($attributes) {
    ob_start(); ?>
    <!-- Seems that whitespace in preserved when formatted here. -->
<pre>
<code class="<?php echo "language-" . $attributes['language'] ?>"><?php echo $attributes['content'] ?></code>
</pre>
    <?php return ob_get_clean();
  }
}

$prism_syntax_highlighter = new PrismSyntaxHighlighter();
