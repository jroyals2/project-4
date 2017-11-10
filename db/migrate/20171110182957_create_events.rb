class CreateEvents < ActiveRecord::Migration[5.1]
  def change
    create_table :events do |t|
      t.string :event_name
      t.string :location
      t.string :date
      t.string :teams

      t.timestamps
    end
  end
end
