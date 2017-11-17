class TailgateEvent < ApplicationRecord
  belongs_to :user
  belongs_to :event

  validates :tailgate_name, presence: true
  validates :about, presence: true
  validates :cost, presence: true
  has_many :tailgate_members, dependent: :destroy
end
