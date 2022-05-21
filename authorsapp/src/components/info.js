import React from "react";
import {Link} from "react-router-dom";

const Info = (props) => {
    return (
        <div className="container">
            {props.custom ? (
                <div>
                    <h2>Info for {props.author_info.first_name} {props.author_info.last_name}</h2>
                    <div>
                        {props.author_info.birth_date ? (
                            <div>Birth Date: {props.author_info.birth_date.slice(0, 10)}</div>
                        ) : (
                            <div></div>
                        )}
                    </div>
                    <div>
                        {props.author_info.country_of_birth ? (
                            <div>Country of Birth: {props.author_info.country_of_birth}</div>
                        ) : (
                            <div></div>
                        )}
                    </div>
                    <div>
                        {props.author_info.works.length > 0 ? (
                            <div>Works: {props.author_info.works.map(txt => <span>{txt}, </span>)}</div>
                        ) : (
                            <div></div>
                        )}
                    </div>
                </div>
            ) : (
                <div>
                    <h2>Info for {props.author_info.name}</h2>
                    <div>Alternate Names: {props.author_info.alternate_names.map(txt => <span>{txt}, </span>)}</div>
                    <div>Birth Date: {props.author_info.birth_date}</div>
                    <div>Top Work: <i>{props.author_info.top_work}</i></div>
                    <div>Work Count: {props.author_info.work_count}</div>
                    <div>Top Subjects: {props.author_info.top_subjects.map(txt => <span>{txt}, </span>)}</div>
                </div>
            )}
        </div>
    );
};

export default Info;
