class TailgateEvent < ApplicationRecord
  belongs_to :user
  belongs_to :event
  has many :tailgate_members
end
