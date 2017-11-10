class Api::TailgateEvent < ApplicationRecord
  belongs_to :user
  belongs_to :event
  has_many :tailgate_members
end
