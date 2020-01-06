import React from 'react';

// Include Search Album and Tracks
import Search from './Search';
import AlbumList from './Albums';
import Tracks from './Tracks';

/**
 * Parent component for the player.
 * contains artist, album and tracks
 */
export default class PlayList extends React.Component 
{
    constructor(props){
        super(props);
        this.state={
            //selected artist object
            artist:{},
            //collection of album object
            album: [],
            //collection of tracks
            tracks:[]
          };
          // method to be called by child Search Component
          this.updateSelectedArtist= this.updateSelectedArtist.bind(this);
          //method to be called by child Search Component
          this.loadAlbum= this.loadAlbum.bind(this);
          // method to be called by Album Component
          this.loadTrack = this.loadTrack.bind(this);
    }
    //method for child to update the artist  @called from autocomplete
    updateSelectedArtist (artist){
        this.setState( () =>({artist: artist } ));   
 
     }
    //method for child to update the albums  @called from search 
    loadAlbum (album){
        if(this.state.artist == null){
            alert("Select an Artist from the dropdown");
            return;
        }
        this.setState( () =>({album: [], tracks:[] } )); 
        let url = '/artist/' +this.state.artist.id +'/albums';
        fetch(url, {method:'GET'}, {headers: new Headers({'content-type': 'application/json'})},
        ).then(response => response.json())
        .then(response => {
           // console.log(response); 
                let albumList = response.data.map((obj)=> {
                    let album={"id": obj.id, "title": obj.title, "thumbnail":obj.cover_medium, "tracklist": obj.tracklist, "releaseDate" : obj.release_date, "artistName": this.state.artist.name};
                     return album;
                     })
                this.setState({ 
                    album : albumList });
    }).catch((error) => {
    // TODO
    console.log(error)
    });
     } 
     //method for child to update the tracks  @called from autocomplete
     loadTrack (album) {
         console.log(album);
        //  /if(album != )
        let url =  "/album/" + album.id + "/tracks";
        fetch(url, {method:'GET'}, {headers: new Headers({'content-type': 'application/json'})},
        ).then(response => response.json())
        .then(response => {
           // console.log(response); 
                let trackList = response.data.map((obj)=> {
                    let track={"id": obj.id, "name": obj.title, "album":album.title, "time": obj.duration, "release": album.releaseDate, "thumbnail": album.thumbnail};
                     return track;
                     })
                this.setState({ 
                    tracks : trackList });
                    
        }).catch((error) => {
        // TODO
        console.log(error)
        });
    }
    //display album
    createAlbumList(){
            if(this.state.album.length > 0){
        return (
            <AlbumList loadTrack= {this.loadTrack} album={this.state.album } />
            )
        }
    }
    //display tracks
    createTracks () {
        if(this.state.tracks.length > 0){
        return( 
            <Tracks tracks={this.state.tracks} /> ) 
        }
    }
    render() {
        return (
        <React.Fragment> 
            <Search loadAlbum={this.loadAlbum} updateSelectedArtist={this.updateSelectedArtist} />
            {this.createAlbumList()}
            {this.createTracks()}
        </React.Fragment>);
    }
}
