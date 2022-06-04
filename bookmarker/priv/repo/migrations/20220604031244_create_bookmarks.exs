defmodule Bookmarker.Repo.Migrations.CreateBookmarks do
  use Ecto.Migration

  def change do
    create table(:bookmarks) do
      add :creator, :integer
      add :category, :string
      add :remote_id, :string
      add :notes, :string

      timestamps()
    end
  end
end
