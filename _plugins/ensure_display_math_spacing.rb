Jekyll::Hooks.register [:pages, :posts, :documents], :pre_render do |doc|
  next unless doc.output_ext == ".html"

  content = doc.content

  content = content.gsub(/([^\n])\n([ \t]*)\$\$/) do
    "#{$1}\n\n#{$2}$$"
  end

  content = content.gsub(/\$\$\n([ \t]*)(\S)/) do
    "$$\n\n#{$1}#{$2}"
  end

  doc.content = content
end
