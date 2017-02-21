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
end

Liquid::Template.register_filter(Jekyll::MediaWrapper)
