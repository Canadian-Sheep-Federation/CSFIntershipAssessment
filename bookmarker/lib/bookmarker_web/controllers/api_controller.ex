defmodule BookmarkerWeb.APIController do
    use BookmarkerWeb, :controller
    alias Bookmarker.{Repo, Bookmark}
    import Ecto.Query

    @doc """
    A quicker way to return a JSON object with the key "error" and the given
    message
    """
    defp error(conn, message) do
        json(conn, %{"error" => message})
    end

    @doc """
    Takes a Bookmark struct and removes all the bits that aren't easily turned
    into JSON
    """
    defp sanitized_bookmark(bookmark) do
        %{
            id: bookmark.id,
            creator: bookmark.creator,
            category: bookmark.category,
            remote_id: bookmark.remote_id,
            notes: bookmark.notes
        }
    end

    @doc """
    POST /api/v1/bookmark - Create a new bookmark. This just builds a
    %Bookmark{} and then inserts it into the database, returning the ID of the
    newly created resource.
    """
    def create(conn, _params) do        
        record = %Bookmark{
            creator: conn.assigns[:user_id],
            category: conn.body_params["category"],
            remote_id: conn.body_params["remote_id"],
            notes: conn.body_params["notes"]
        }

        {:ok, result} = Repo.insert(record)

        # Return the new bookmark's ID
        json(conn, %{
            id: result.id
        })
    end

    @doc """
    GET /api/v1/bookmark - Returns a list of bookmarks created by the user.
    Repo.all returns a list of, in this case, %Bookmark{} results, so each
    of these must be sanitized with Enum.map/2 and our private function for
    sanitizing the structs.
    """
    def index(conn, _params) do
        records = Repo.all(from b in Bookmark,
            where: b.creator == ^conn.assigns[:user_id],
            select: b)
        |> Enum.map(fn b -> sanitized_bookmark(b) end)

        json(conn, records)
    end

    @doc """
    GET /api/v1/bookmark/single/:id - Returns a single bookmark by ID. If
    Repo.get/2 returns `nil` here, then the bookmark can't be found and we
    return 404. Otherwise, we sanitize the struct and return it as a JSON
    string.

    If the bookmark doesn't belong to the user, then the server returns 403.
    """
    def show(conn, %{"id" => id}) do
        case Repo.get(Bookmark, id) do
            nil -> conn
                |> put_status(404)
                |> error("Bookmark not found")
            bookmark ->
                if bookmark.creator == conn.assigns[:user_id] do
                    conn
                    |> json(sanitized_bookmark(bookmark))
                else
                    conn
                    |> put_status(403)
                    |> error("You do not have access to this bookmark")
                end
        end
    end

    @doc """
    DELETE /api/v1/bookmark/:id - Gets the bookmark and then deletes it from
    the database. If the bookmark doesn't belong to the user trying to delete
    it, then the server returns 403.

    This assumes that there won't be any malformed requests, which is not
    ideal, especially if we're not the only ones developing clients
    """
    def delete(conn, %{"id" => id}) do
        case Repo.get(Bookmark, id) do
            nil -> 
                conn
                |> put_status(404)
                |> error("Bookmark not found")
            bookmark ->
                if bookmark.creator == conn.assigns[:user_id] do
                    Repo.delete!(bookmark)
                    json(conn, %{"id" => bookmark.id})
                else
                    conn
                    |> put_status(403)
                    |> error("Cannot delete others' bookmarks")
                end
        end
    end

    @doc """
    GET /api/v1/bookmark/category/:category - Get all of the given category
    """
    def index_category(conn, %{"category" => category}) do
        user_id = conn.assigns[:user_id]
        records = Repo.all(from b in Bookmark,
            where: b.creator == ^user_id and b.category == ^category,
            select: b)
        |> Enum.map(fn b -> sanitized_bookmark(b) end)

        json(conn, records)
    end

    @doc """
    GET /api/v1/bookmark/categories - Returns a list of all categories used in
    bookmarks by a user. To do this, we fetch all records, select only their
    categories and then deduplicate the list.
    """

    def index_categories(conn, _params) do
        user_id = conn.assigns.user_id
        categories = Repo.all(from b in Bookmark,
            where: b.creator == ^user_id,
            select: b.category)
        |> Enum.uniq()

        json(conn, categories)
    end
end
