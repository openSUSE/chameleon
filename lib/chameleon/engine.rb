# frozen_string_literal: true

require 'autoprefixer-rails'
require 'sassc-rails'

module Chameleon
  module Rails
    class Engine < ::Rails::Engine
      initializer 'chameleon.assets' do |app|
        %w(stylesheets javascripts).each do |sub|
          app.config.assets.paths << root.join('assets', sub).to_s
        end
      end
    end
  end
end
