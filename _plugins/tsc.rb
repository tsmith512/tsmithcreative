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
  # output the appropriate value. To be used in a CSS url() call for the image.
  module MastheadCheckExists
    def masthead_image(input)
      if (File.exist?(input))
        # `input` doesn't have a leading slash so that Ruby can find this file
        # in the working directory.
        "/" + input
      else
        "/assets/masthead/DEFAULT.jpg"
      end
    end
  end
end

Liquid::Template.register_filter(Jekyll::MediaWrapper)
Liquid::Template.register_filter(Jekyll::MastheadCheckExists)
