import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';    
import axios from 'axios';
import './Search.css';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            suggestions: [],
            selectedItem: undefined,
            showSelectedItem: false
        }
    }

    onChange = (event, { newValue }) => {
        this.setState({
          value: newValue
        });
      };

    onSuggestionsFetchRequested = ({ value }) => {
        this.getSuggestions(value)
        .then(suggestions => {
            this.setState({
                suggestions 
              });
        })
    };
    
    getSuggestions = (searchterm) => {
        return axios.get('http://localhost:4444/search-by-term', {
            params: {
                searchTerm: searchterm
            }
        }).then(res => {
            const tickets = res.data.response;
            return tickets;
        })
    };

    onSuggestionsClearRequested = () => {
        this.setState({
          suggestions: []
        });
      };

    getSuggestionValue = (suggestion) => {
        return suggestion.name;
    };

    renderSelectedItem = () => {
        const selectedItem = this.state.selectedItem;
        if(selectedItem){
            return(
                <div className="selected-item">
                    <div className="item-name">{selectedItem.name}</div>
                    <div className="item-category">{selectedItem.category}</div>
                    <div className="item-desc">{selectedItem.description}</div>
                </div>  
            );
        }
    };

    renderSuggestion = (suggestion) => {
        return(
            <div>
                <div value={suggestion} className="item-name" onClick={() => this.setState({selectedItem: suggestion})}>{suggestion.name}</div>
            </div>
        );
    };

    render() {
        const { value, suggestions, selectedItem, showSelectedItem } = this.state;
        const inputProps = {
            placeholder: 'Type a product name',
            value,
            onChange: this.onChange
          };
        return (
            <div className="search-container">
                <Autosuggest
                    suggestions={this.state.suggestions}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    getSuggestionValue={this.getSuggestionValue}
                    renderSuggestion={this.renderSuggestion}
                    inputProps={inputProps}
                 />
                <div className="search-icon" onClick={() => this.setState({showSelectedItem: true})}>
                    <svg className="svg-inline--fa fa-search"  role="img" viewBox="0 0 512 512" data-fa-i2svg="">
                        <path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
                    </svg>
                </div>
                {showSelectedItem ? this.renderSelectedItem() : null}
            </div>
        );
    }
}

export default Search;