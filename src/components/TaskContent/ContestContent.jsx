import React, {Component} from "react";
import TabContent from "../TabContent/TabContent";
import Sidebar from "../Sidebar/Sidebar";
import StandingsTable from "../StandigsTable/StandingsTable";
import "./ContestContent.css";


class ContestContent extends Component {
    state = {
        activeTab: 0,
        sidebarIsToggled: true,
        tableIsToggled: true,
        tasks: [],
    }

    componentWillReceiveProps(nextProps, nextContext) {
        console.log(this.props.tasks);
        const apiUrl = "https://julia-api-server.herokuapp.com/api/";
        nextProps.tasks.forEach( element => {
            fetch(apiUrl + "tasks/" + element.toString(), {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            })
                .then(res => res.json())
                .then(
                    (result) => {
                        this.state.tasks.push(result)
                    }
                )
                .catch(
                    console.log
                )
        })
    }

    toggleSidebar = () => {
        this.setState({
            sidebarIsToggled: !this.state.sidebarIsToggled,
        })
    }

    handleKeyPress = (event) => {
        console.log(event.key + " pressed")
        if(event.key === "ArrowRight"){
            this.setState({
                sidebarIsToggled: false,
            })
        } else if(event.key === "ArrowLeft"){
            this.setState({
                sidebarIsToggled: true,
            })
        } else if(event.key === "ArrowDown"){
            this.setState({
                tableIsToggled: true,
            })
        } else if(event.key === "ArrowUp"){
            this.setState({
                tableIsToggled: false,
            })
        }
    }

    activateTab = (tabId) => {
        this.setState({
            activeTab: tabId,
        })
    }


    render() {
        let tabs = {}
        let tabTitles = {}
        this.state.tasks.forEach(element => {
            tabs[element.id] = (
                <TabContent title={element.title}
                            key={element.id}
                            tl={element.tl}
                            ml={element.ml}
                            content={element.content}
                            samples={element.samples}/>
            )
            tabTitles[element.id] = element.title
        });

        return (
            <div>
                <Sidebar isToggled={this.state.sidebarIsToggled}
                         tabTitles={tabTitles}
                         activeTab={this.state.activeTab}
                         activateTab={this.activateTab}/>

                <div onClick={this.toggleSidebar}>
                    {this.state.sidebarIsToggled ? "> Open" : "< Toggle"} Sidebar
                </div>

                <div tabIndex="0" onKeyDown={(event => this.handleKeyPress(event))}>
                    <div className={`window-box ${this.state.sidebarIsToggled ? "closed-sidebar" : "open-sidebar"}`}>
                        <div className="main-window">
                            <div className="ContestContent">
                                { this.state.tableIsToggled? tabs[this.state.activeTab] : <StandingsTable/>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ContestContent