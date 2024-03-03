class CreateIMakes < ActiveRecord::Migration[7.0]
  def change
    create_table :i_makes, id: :uuid do |t|
      t.belongs_to :detail, null: false, foreign_key: true, type: :uuid
      t.belongs_to :user, null: false, foreign_key: true, type: :uuid

      t.timestamps
    end
  end
end
