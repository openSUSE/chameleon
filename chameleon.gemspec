# frozen_string_literal: true

Gem::Specification.new do |spec|
    spec.name     = "chameleon"
    spec.version  = "4.0.0"
    spec.authors  = ["Guo Yunhe"]
    spec.summary  = "Bootstrap theme for openSUSE websites"
    spec.homepage = "https://github.com/openSUSE/chameleon"
    spec.license  = "GPL-3.0-or-later"

    spec.files    = `git ls-files`.split("\n")

    spec.add_runtime_dependency 'bootstrap'

    spec.add_development_dependency 'bundler'
end
