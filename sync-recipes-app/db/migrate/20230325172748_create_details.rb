class CreateDetails < ActiveRecord::Migration[7.0]
  def change
    create_table :details, id: :uuid do |t|
      t.references :list, null: false, foreign_key: true, type: :uuid
      t.bigint :meal_id
      t.string :topic
      t.string :category
      t.string :area
      t.text :instructions
      t.text :image
      t.string :tags
      t.string :youtube

      t.timestamps
    end
  end
end
