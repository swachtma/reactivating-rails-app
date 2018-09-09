class CreateNodes < ActiveRecord::Migration[5.2]
  def change
    create_table :nodes do |t|
      t.integer :chapter_id
      t.string :node_type
      t.text :content

      t.timestamps
    end
  end
end
