class TailgateMember < ApplicationRecord
  belongs_to :user
  belongs_to :tailgate_event 
end
