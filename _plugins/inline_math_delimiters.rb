# frozen_string_literal: true

# Converts LaTeX math delimiters from $...$ / $$...$$ to
# \\(...\\) / \\[...\\] before Markdown rendering so that
# Markdown emphasis rules do not trigger on underscores.
# Conversion skips fenced code blocks.

module InlineMathDelimiters
  CODE_FENCE = %r{```.*?```|~~~.*?~~~}m.freeze

  module_function

  def convert(text)
    text = text.dup.force_encoding('UTF-8')

    segments = []
    last_index = 0

    text.to_enum(:scan, CODE_FENCE).each do
      match = Regexp.last_match
      segments << convert_segment(text.slice(last_index...match.begin(0)) || '')
      segments << match[0]
      last_index = match.end(0)
    end

    remainder = text.slice(last_index..)
    segments << convert_segment(remainder || '')
    segments.join
  end

  def convert_segment(segment)
    result = +''
    i = 0
    while i < segment.length
      char = segment[i]

      if char == '\\'
        # Preserve escape sequences, skip next char.
        result << char
        i += 1
        result << segment[i] if i < segment.length
        i += 1
        next
      end

      if char == '$'
        count = count_delimiters(segment, i)
        if count > 0
          converted, consumed = extract_math(segment, i + count, count)
          if converted
            result << (count >= 2 ? block_math(converted) : inline_math(converted))
            i = consumed
            next
          end
        end
      end

      result << char
      i += 1
    end
    result
  end

  def count_delimiters(segment, index)
    count = 0
    while index + count < segment.length && segment[index + count] == '$'
      # Stop counting if the $ is escaped (i.e., preceded by \)
      break if index.positive? && segment[index - 1] == '\\' && count.zero?

      count += 1
    end
    count
  end

  def extract_math(segment, index, count)
    expr = +''
    i = index
    while i < segment.length
      if segment[i] == '\\'
        expr << segment[i]
        i += 1
        expr << segment[i] if i < segment.length
        i += 1
        next
      end

      if segment[i] == '$'
        close_count = 0
        while i + close_count < segment.length && segment[i + close_count] == '$'
          close_count += 1
        end

        if close_count == count
          # Matched closing delimiter
          return [expr, i + close_count]
        else
          expr << segment[i, close_count]
          i += close_count
          next
        end
      end

      expr << segment[i]
      i += 1
    end

    # No closing delimiter found; treat as literal
    [nil, nil]
  end

  def inline_math(body)
    "<span class=\"math-inline\" markdown=\"0\">&#92;(#{body}&#92;)</span>"
  end

  def block_math(body)
    "\n<div class=\"math-block\" markdown=\"0\">&#92;[#{body}&#92;]</div>\n"
  end
end

if defined?(Jekyll)
  Jekyll::Hooks.register %i[documents pages], :pre_render do |doc|
    doc.content = InlineMathDelimiters.convert(doc.content)
  end
end
