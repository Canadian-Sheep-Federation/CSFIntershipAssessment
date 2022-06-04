defmodule BookmarkerWeb.AppController do
    use BookmarkerWeb, :controller

    @doc """
    GET / - Renders the root component
    """
    def index(conn, _params) do
        render(conn, "index.html")
    end

    @doc """
    GET /u/:id - Sends the user back to "/" with the query param "u=:id". This
    way, the user ID can be properly processed by our React app and the user
    can be redirected within the single-page app to where they need to be.
    """
    def send_home(conn, %{"id" => id}) do
        redirect(conn, to: "/?u=" <> id)
    end
end
