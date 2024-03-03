class CreateLists < ActiveRecord::Migration[7.0]
  def change
    create_table :lists, id: :uuid do |t|
      t.references :category, null: false, foreign_key: true, type: :uuid
      t.string :name
      t.bigint :meal_id
      t.string :image

      t.timestamps
    end
  end
end
