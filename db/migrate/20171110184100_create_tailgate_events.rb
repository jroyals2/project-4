class CreateTailgateEvents < ActiveRecord::Migration[5.1]
  def change
    create_table :tailgate_events do |t|
      t.string :tailgate_name
      t.string :about
      t.string :cost
      t.boolean :is_eighteen
      t.references :user, foreign_key: true
      t.references :event, foreign_key: true

      t.timestamps
    end
  end
end
