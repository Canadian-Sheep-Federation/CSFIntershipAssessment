import {Link} from "react-router-dom";

const Home = () => {
    return (
        <div>
            <h1>Home</h1>
            <nav>
                <ul>
                    <li>
                        <Link to="/public">PublicAPI</Link>
                    </li>
                    <li>
                        <Link to="/designed">FormAPI</Link>
                    </li>
                </ul>
            </nav>
        </div>
    )
    ;
};

export default Home;
