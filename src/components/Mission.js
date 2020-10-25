import React from 'react';
import '../styles/mission.css';

const mission = (props) => {
    return (
        <div className="mission">
            <img className="image" id="image" src={props.img} alt="Image Not Loaded!!" />
            <p className="imgTag">{props.name}#{props.num}</p>
            <p className="missionTags">Mission Ids :  </p><span className="span">
                <ul>{props.id && props.id.map((item) => {
                    return <li key={props.num}>{item}</li>
                })}</ul></span>
            <p className="missionTags">Launch Year:<span className="span"> {props.year}</span></p>
            <p className="missionTags">Successful Launch:<span className="span">  {props.launch.toString()}</span></p>
            <p className="missionTags">Successful Landing: <span className="span"> {props.landing}</span></p>
        </div>
    );
}
export default mission;