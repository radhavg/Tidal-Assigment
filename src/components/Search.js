import React from 'react';
import AutoComplete from './AutoComplete';

/**
 * Search atrist by autocomplete dropdown
 * @artistList - contains list of all artists.
 */
export default class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            artistList:[],
            enableSearch: false
          };
          
    }
    /**
 * lifecyle method 
 * fetch list of artist and update UI  
 * @param  genere
 * @return {Object} artistList
 * @private
 */
    componentDidMount(){
        // SEND REQUEST
        fetch('/genre/0/artists&output=json&output=json', {method:'GET'}, {headers: new Headers({'content-type': 'application/json'})},
            ).then(response => response.json())
            .then(response => {
                    let artistList = response.data.map((obj)=> {
                        let artist={"id": obj.id, "name": obj.name};
                         return artist;
                         })
                    this.setState({ 
                        artistList : artistList });
        }).catch((error) => {
            console.log(error)
        });
    }
    render() {
        return(<React.Fragment>
                <AutoComplete updateSelectedArtist={this.props.updateSelectedArtist} items={this.state.artistList}></AutoComplete>
                <button disabled={this.state.enableSearch} className="search" onClick={this.props.loadAlbum} >SEARCH</button>
            </React.Fragment>);
    }

}