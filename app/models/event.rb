class Event < ApplicationRecord

    has_many :tailgate_events, dependent: :destroy
end
