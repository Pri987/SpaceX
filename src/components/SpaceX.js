import React from 'react';
import '../styles/SpaceX.css';
import Mission from './Mission';

class SpaceX extends React.Component {
  state = {
    index: 2006,
    width: window.innerWidth,
    year: 0,
    previousValue: 0,
    launchSuccess: false,
    landSuccess: false
  }

  componentWillMount() {
    window.addEventListener('resize', this.handleWindowSizeChange);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange);
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };

  componentDidMount() {
    fetch('https://api.spaceXdata.com/v3/launches?limit=100')
      .then(response => response.json())
      .then(data => this.setState({ data }));
  }
  //function to fetch data when any year buton is pressed
  fetchInfo = (event) => {
    const buttonClickedId = Number(event.currentTarget.innerHTML);
    const totalButtonIds = document.getElementsByClassName("fetch-button");
    this.setState({
      previousValue: buttonClickedId - this.state.index
    });
    this.state.year = buttonClickedId;
    totalButtonIds[buttonClickedId - this.state.index].style.backgroundColor = "green";
    if (this.state.previousValue !== (buttonClickedId - this.state.index)) {
      totalButtonIds[this.state.previousValue].style.backgroundColor = "lightgreen";
    }
    this.getFilteredData();
  }
  //to handle button state and fetch data as per button state in case of mission launch
  fetchDataForLaunch = (event) => {
    const buttonClickedId = event.currentTarget.innerHTML;
    const totalButtonIds = document.getElementsByClassName("fetch-button");
    if (buttonClickedId == "True") {
      this.state.launchSuccess = true;
      totalButtonIds[15].style.backgroundColor = "green";
      totalButtonIds[16].style.backgroundColor = "lightgreen";
    } else {
      this.state.launchSuccess = false;
      totalButtonIds[16].style.backgroundColor = "green";
      totalButtonIds[15].style.backgroundColor = "lightgreen";
    }
    this.getFilteredData();
  }


  //to handle button state and fetch data as per button state in case of mission land
  fetchDataForLanding = (event) => {
    const buttonClickedId = event.currentTarget.innerHTML;
    const totalButtonIds = document.getElementsByClassName("fetch-button");
    if (buttonClickedId == "True") {
      this.state.landSuccess = true;
      totalButtonIds[17].style.backgroundColor = "green";
      totalButtonIds[18].style.backgroundColor = "lightgreen";
    } else {
      this.state.landSuccess = false;
      totalButtonIds[18].style.backgroundColor = "green";
      totalButtonIds[17].style.backgroundColor = "lightgreen";
    }
    this.getFilteredData();
  }

  //to handle and fetch data as per various filters 
  getFilteredData = () => {
    if (this.state.launchSuccess && this.state.landSuccess && this.state.year == "2014") {
      fetch('https://api.spaceXdata.com/v3/launches?limit=100&launch_success=true&land_success=true')
        .then((response) => response.json())
        .then(apiData => {
          this.setState({ data: apiData });
        });
    } else if (this.state.launchSuccess && this.state.landSuccess) {
      fetch('https://api.spaceXdata.com/v3/launches?limit=100&launch_success=true&land_success=true')
        .then((response) => response.json())
        .then(landLaunchPass => {
          this.setState({ data: landLaunchPass });
        });
    } else if (this.state.launchSucces) {
      fetch('https://api.spaceXdata.com/v3/launches?limit=100&launch_success=true')
        .then((response) => response.json())
        .then(launchPass => {
          this.setState({ data: launchPass });
        });
    }
  }

  render() {
    const { width } = this.state;
    const isMobile = width <= 700;
    const isTablet = 700 < width && width < 1024;
    let StyleOuter = {
      display: 'grid',
      gridGap: '10px'
    };
    let StyleMissions = {
      display: 'grid',
      marginRight: '10px',
      gridGap: '10px'
    };

    if (isMobile) {
      StyleOuter.gridTemplateColumns = '1fr';
      StyleMissions.gridTemplateColumns = '1fr';
    } else if (isTablet) {
      StyleOuter.gridTemplateColumns = '1fr 1fr';
      StyleMissions.gridTemplateColumns = '1fr 1fr';
    } else {
      StyleOuter.gridTemplateColumns = '1fr 1fr';
      StyleMissions.gridTemplateColumns = '1fr 1fr 1fr 1fr';
    }

    return (
      <div>
        <p className="heading">SpaceX Launch Programs</p>
        <div className="Outer" style={StyleOuter}>
          <div className="container">
            <h1 className="filter">Filters</h1>
            <p className="text">Launch Year</p>
            <button className="fetch-button" onClick={this.fetchInfo}>2006 </button>
            <button className="fetch-button" onClick={this.fetchInfo}>2007 </button>
            <button className="fetch-button" onClick={this.fetchInfo}>2008 </button>
            <button className="fetch-button" onClick={this.fetchInfo}>2009 </button>
            <button className="fetch-button" onClick={this.fetchInfo}>2010 </button>
            <button className="fetch-button" onClick={this.fetchInfo}>2011 </button>
            <button className="fetch-button" onClick={this.fetchInfo}>2012 </button>
            <button className="fetch-button" onClick={this.fetchInfo}>2013 </button>
            <button className="fetch-button" onClick={this.fetchInfo}>2014 </button>
            <button className="fetch-button" onClick={this.fetchInfo}>2015 </button>
            <button className="fetch-button" onClick={this.fetchInfo}>2016 </button>
            <button className="fetch-button" onClick={this.fetchInfo}>2017 </button>
            <button className="fetch-button" onClick={this.fetchInfo}>2018 </button>
            <button className="fetch-button" onClick={this.fetchInfo}>2019 </button>
            <button className="fetch-button" onClick={this.fetchInfo}>2020 </button>

            <div className="clearfix"></div>
            <p className="text">Successful Launch</p>
            <button className="fetch-button" name="launchPass" onClick={this.fetchDataForLaunch}>True</button>
            <button className="fetch-button" name="launchFail" onClick={this.fetchDataForLaunch}>False</button>

            <p className="text">Successful Landing</p>
            <button className="fetch-button" name="landPass" onClick={this.fetchDataForLanding}>True</button>
            <button className="fetch-button" name="landFail" onClick={this.fetchDataForLanding}>False</button>
          </div>
          <div className="missionContainer" style={StyleMissions}>
            {this.state.data && this.state.data.map((item) => {
              return <Mission num={item.flight_number} name={item.mission_name} img={item.links.mission_patch}
                id={item.mission_id} year={item.launch_year} launch={item.launch_success} landing={item.launch_landing} />
            })}
          </div>
        </div>
        <p className="developer">Developed By: Priyanka</p>
      </div>
    );
  }
}

export default SpaceX;