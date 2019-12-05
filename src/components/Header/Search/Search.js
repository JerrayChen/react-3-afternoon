import React, { Component } from 'react';

import './Search.css';

import SearchIcon from 'react-icons/lib/md/search';

//////////////////////////////////////////////////////// THIS COMPONENT IS BEING RENDERED IN THE *HEADER* COMPONENT

export default class Search extends Component {
  constructor(){
    super();
    this.state = {
      searchInput: ''
    }
  }

  updateInput(value){
    this.setState({
      searchInput: value
    });
  }

  filterPost(){
    this.props.filterPostFn(this.state.searchInput);
  }

  render() {
    return (
      <section className="Search__parent">

        <div className="Search__content">
          <input placeholder="Search Your Feed" onChange={(e)=>{this.updateInput(e.target.value)}}/>

          <div onClick={()=>{this.filterPost()}}>
            <SearchIcon id="Search__icon" />
          </div>
        </div>
        
      </section>
    )
  }
}