module Jekyll

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
