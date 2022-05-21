import { useLocation} from "react-router-dom";
import Info from "../components/info";

const InfoPage = () => {
    const location = useLocation();
    const state = location.state;
    return (
        <Info author_info={state} custom={false}/>
    );
};

export default InfoPage;
