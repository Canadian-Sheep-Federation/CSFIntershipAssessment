defmodule BookmarkerWeb.Router do
    use BookmarkerWeb, :router

    @doc """
    A quicker way to return a JSON object with the key "error" and the given
    message
    """
    defp error(conn, message) do
        json(conn, %{"error" => message})
    end

    @doc """
    Checks to see if the request includes an Authorization header. If it does,
    then the value of the header is put into a more convenient place in the
    `conn` object. Otherwise, the server returns a client error.
    """
    defp has_authorization(conn, _params) do
        # Fail if the user hasn't included the authorization header
        case get_req_header(conn, "authorization") do
            [auth] -> assign(conn, :auth, auth)
            _ -> conn
                |> put_status(401)
                |> error("Unauthorized")
        end
    end

    @doc """
    Checks that the Authorization style is basic. More generally, ensures that
    the header isn't malformatted. If it is, then the server complains that the
    client is unauthorized. If not, then the user ID gets extracted from the
    header and passed down the line.
    """
    defp authorization_is_basic(conn, _params) do
        case String.split(conn.assigns[:auth]) do
            ["Basic", id] -> assign(conn, :user_id, id)

            # In this case, the header value doesn't fit the "Basic 123..."
            # pattern and the server returns 401
            _ -> conn
                |> put_status(401)
                |> error("Authorization must be Basic")
        end
    end

    @doc """
    Attempts to parse the user ID as an integer. If it can't do that, then
    the Authorization header's value is malformed and a 401 error code is
    returned. Otherwise, the :user_id key gets reassigned to the parsed integer
    for later use
    """
    defp credential_is_integer(conn, _params) do
        case Integer.parse(conn.assigns.user_id) do
            {id, _} ->
                # Replace the :user_id with the parsed integer
                conn
                |> assign(:user_id, id)
            :error -> conn
                |> put_status(401)
                |> error("Malformed Authorization credentials")
        end
    end

    # Pipelines are a series of plugs. Plugs make changes to the connection
    # before passing them on.
    pipeline :browser do
        plug :accepts, ["html"]
        plug :fetch_session
        plug :fetch_live_flash
        plug :put_root_layout, {BookmarkerWeb.LayoutView, :root}
        plug :protect_from_forgery
        plug :put_secure_browser_headers
    end

    # This pipeline, used for the API, ensures that the request has an
    # Authorization header, ensures that the Authorization style is "Basic,"
    # and then ensures that the credentials are just an integer. It then parses
    # the request body as JSON so that it can be easily accessed later from the
    # controllers.
    pipeline :api do
        plug :accepts, ["json"]
        plug :has_authorization
        plug :authorization_is_basic
        plug :credential_is_integer
        plug Plug.Parsers,
            parsers: [:json],
            json_decoder: {Jason, :decode!, [[floats: :decimals]]}
    end


    # Generates a semi-private page for the user to navigate to.
    scope "/", BookmarkerWeb do
        pipe_through :browser

        get "/", AppController, :index

        # On the front end, this is a single-page app. So, if you were to,
        # say, bookmark your ID in the browser and navigate to it, Phoenix
        # would get confused. This controller will pass the given ID to
        # the home route as a query parameter so that the app can then in
        # turn send the user where they need to be.
        get "/u/:id", AppController, :send_home
    end

    scope "/api/v1", BookmarkerWeb do
        pipe_through :api

        # CORE API ENDPOINTS

        # Create a new bookmark
        post "/bookmark", APIController, :create

        # Get all your bookmarks
        get "/bookmark", APIController, :index

        # Get a single bookmark by ID
        get "/bookmark/single/:id", APIController, :show

        # OTHER USEFUL ENDPOINTS

        # Delete a bookmark
        delete "/bookmark/:id", APIController, :delete

        # Return all posts of a category
        get "/bookmark/category/:category", APIController, :index_category

        # Return a list of all categories
        get "/bookmark/categories", APIController, :index_categories
    end

    # Enables LiveDashboard only for development
    #
    # If you want to use the LiveDashboard in production, you should put
    # it behind authentication and allow only admins to access it.
    # If your application does not have an admins-only section yet,
    # you can use Plug.BasicAuth to set up some basic authentication
    # as long as you are also using SSL (which you should anyway).
    if Mix.env() in [:dev, :test] do
        import Phoenix.LiveDashboard.Router

        scope "/" do
            pipe_through :browser

            live_dashboard "/dashboard", metrics: BookmarkerWeb.Telemetry
        end
    end

    # Enables the Swoosh mailbox preview in development.
    #
    # Note that preview only shows emails that were sent by the same
    # node running the Phoenix server.
    if Mix.env() == :dev do
        scope "/dev" do
            pipe_through :browser

            forward "/mailbox", Plug.Swoosh.MailboxPreview
        end
    end
end
