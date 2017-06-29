module Jekyll

  # Markdown wraps images on their own line in a paragraph tag, which is useful
  # but also would make it hard to style only solo images automatically without
  # writing custom HTML around them in the posts. This adds a Liquid filter to
  # identify such paragraphs and add a media class to them.
  module MediaWrapper
    def media_wrap(input)
      input.gsub(/<p>(<img[^>]+>)<\/p>/, '<p class="media">\1</p>')
    end
  end

  # Determine if there is a masthead image for a particular slug or not, and
  # output classes and/or a CSS background override for div.masthead.
  module MastheadGenerate
    def masthead_image_style(input)
      if (File.exist?("_#{input}"))
        # `input` doesn't have a leading slash so that Ruby can find this file
        # in the working directory.
        "class='masthead masthead-override' style='background-image: url(\"/#{input}\");'"
      else
        "class='masthead masthead-default'"
      end
    end
  end

  # Create a thumbnail image for a blog post or project from its slug.
  # Can take a JPG or a PNG named for a slug in the thumbnail directory.
  module ThumbnailGenerate
    def thumbnail_image(input)
      thumbnail = "assets/thumbnail/#{input}"
      if (File.exist?("_#{thumbnail}.jpg"))
        "<img src='/#{thumbnail}.jpg' alt=''/>"
      elsif (File.exist?("_#{thumbnail}.png"))
        "<img src='/#{thumbnail}.png' alt=''/>"
      end
    end
    def thumbnail_image_src(input)
      thumbnail = "assets/thumbnail/#{input}"
      if (File.exist?("_#{thumbnail}.jpg"))
        "/#{thumbnail}.jpg"
      elsif (File.exist?("_#{thumbnail}.png"))
        "/#{thumbnail}.png"
      end
    end
  end

  # Projects contain a writeup and a bullet-list of some basic details.
  # It's all in the body area divided by a horizontal rule.
  module SeparateHorizRules
    def fix_hr(input)
      input.sub(/<hr \/>/, '</div><div class="project-details">')
    end
  end

  # Make an HTML wrapper around an "update" area indicating that a post has
  # changed since it was first published. Usage:
  # {% update 2017-06 %}
  #   ... content ...
  # {% endupdate %}
  class UpdateBlock < Liquid::Block
    def initialize(tag, markup, tokens)
      @date = markup.strip
      super
    end

    def render(context)
      contents = super

      site = context.registers[:site]
      converter = site.find_converter_instance(::Jekyll::Converters::Markdown)
      markdownContent = converter.convert(contents)
      update = Liquid::Template.parse(markdownContent).render context

      output = "<div class=\"update\">"
      output += "<span class=\"update-intro\">Update #{@date}:</span> "
      output += update
      output += "</div>"

      output
    end
  end

  # Make an HTML wrapper around a "collapsible" area
  # {% collapsible Title %}
  #   ... content ...
  # {% endcollapsible %}
  class CollapsedBlock < Liquid::Block
    def initialize(tag, markup, tokens)
      @title = markup.strip
      super
    end

    def render(context)
      contents = super

      site = context.registers[:site]
      converter = site.find_converter_instance(::Jekyll::Converters::Markdown)
      markdownContent = converter.convert(contents)
      collapsed = Liquid::Template.parse(markdownContent).render context

      output  = "<div class=\"collapsed\">"
      output +=   "<h2 class=\"collapsed-intro\"><a href=\"#\" class=\"collapsed-toggle\">#{@title}</a></h2> "
      output +=   "<div class=\"collapsed-content\">"
      output +=     collapsed
      output +=   "</div>"
      output += "</div>"

      output
    end
  end
end

Liquid::Template.register_filter(Jekyll::MediaWrapper)
Liquid::Template.register_filter(Jekyll::MastheadGenerate)
Liquid::Template.register_filter(Jekyll::ThumbnailGenerate)
Liquid::Template.register_filter(Jekyll::SeparateHorizRules)
Liquid::Template.register_tag("update", Jekyll::UpdateBlock)
Liquid::Template.register_tag("collapsed", Jekyll::CollapsedBlock)
