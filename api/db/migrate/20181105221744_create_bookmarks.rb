class CreateBookmarks < ActiveRecord::Migration[5.2]
  def change
    create_table :bookmarks do |t|
      t.integer :user_id
      t.integer :last_read
      t.integer :furthest_read

      t.timestamps
    end
  end
end
