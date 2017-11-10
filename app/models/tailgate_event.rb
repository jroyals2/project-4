class TailgateEvent < ApplicationRecord
  belongs_to :user
  belongs_to :event
  has_many :tailgate_members, dependent: :destroy
end
