require 'rubygems'
require 'json'

commits = []
cmd = "git log --pretty='%cn|%ct|%s' --shortstat"
res = `#{cmd}`   
i = 0
max = 0
magnitude = 0
classes = []
repoName = 'budnitz'

res.each_line do |line|
  if line != "\n"

    classes = ['commit']
    if line =~ /insertions/
      nums = line.scan(/\d+/)
      magnitude = (nums[0].to_i + 1) + (nums[1].to_i + nums[2].to_i + 1)
      case magnitude
        when 1..100
          classes << "light"
        when 100..1000
          classes << "medium"
        when 1000..10000000
          classes << "dark"
        else
          classes << "light"
        end
      
      # max = magnitude unless magnitude < max
    else
      parts = line.split('|')
      classes << parts[0].gsub(/\s+/, '').downcase.gsub(/\./, '')
      doy = Time.at(parts[1].to_i).yday()
      commits[doy] ||= []
      commits[doy] << {'classes'=> classes, 'subject'=>parts[2], 'repo'=>repoName}
    end
    i += 1

  end
end

puts 'if (window["data"] == undefined){window.data={}}
window.data.'+repoName+' = ' + commits.to_json