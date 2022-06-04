defmodule Bookmarker.Bookmark do
    use Ecto.Schema
    require Protocol
    import Ecto.Changeset

    # The schema describes what are in our case the columns of the `bookmarks`
    # table in the database in a way that makes it easy to go back and forth
    # between the two systems
    schema "bookmarks" do
        field :category, :string
        field :creator, :integer
        field :notes, :string
        field :remote_id, :string

        timestamps()
    end

    @doc """
    The changeset is used to validate and sanitize data before it's put into
    the database. This project doesn't make much use of changesets
    """
    def changeset(bookmark, attrs) do
        bookmark
        |> cast(attrs, [:creator, :category, :remote_id, :notes])
        |> validate_required([:creator, :category, :remote_id, :notes])
    end
end
