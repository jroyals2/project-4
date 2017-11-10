class CreateTailgateMembers < ActiveRecord::Migration[5.1]
  def change
    create_table :tailgate_members do |t|
      t.references :user, foreign_key: true
      t.references :tailgate_event, foreign_key: true

      t.timestamps
    end
  end
end
