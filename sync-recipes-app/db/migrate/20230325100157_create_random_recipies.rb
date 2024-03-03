class CreateRandomRecipies < ActiveRecord::Migration[7.0]
  def change
    create_table :random_recipies, id: :uuid do |t|
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
