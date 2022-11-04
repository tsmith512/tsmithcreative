module Jekyll

  # Markdown wraps images on their own line in a paragraph tag, which is useful
  # but also would make it hard to style only solo images automatically without
  # writing custom HTML around them in the posts. This adds a Liquid filter to
  # identify such paragraphs and add a media class to them.
  module MediaWrapper
    def media_wrap(input)
      input
        .gsub(/<p>((<img[^>]+>\s*){2,})<\/p>/) {
          |contents| '<div class="media-n-up">' + contents.gsub(/(<img[^>]+>)/, '<div>\1</div>') + '</div>'
        }
        .gsub(/<p>(<img[^>]+>)<\/p>/, '<p class="media">\1</p>')
        .gsub(/<p>(<a class=\"media-link\"[^>]+>.+?)<\/a>/, '<p class="media">\1</a></p>')
        .gsub(/^<picture>(.+?)<\/picture>/, '<div class="media"><picture>\1</picture></div>')
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

Liquid::Template.register_filter(Jekyll::MediaWrapper)
Liquid::Template.register_filter(Jekyll::ThumbnailGenerate)
Liquid::Template.register_filter(Jekyll::SeparateHorizRules)
