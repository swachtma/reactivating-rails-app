class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.integer :github_id
      t.string :github_email
      t.string :username
      t.string :avatar

      t.timestamps
    end
  end
end
