import React from 'react';

/**Represents Albums in a horisontal list */
export default class Albums extends React.Component 
{
    constructor(props){
        super(props);
    }
    onSelectedAlbum = (item) => {  
        console.log(item);
        this.props.loadTrack(item);   
    }
    render() {
        return(
        <React.Fragment >
         <div className="searchTitle">Search results for "{this.props.album[0].artistName}" </div>
         <hr></hr>
         <div className="albumHeader">ALBUMS</div>
         <div className="albums" >
        { this.props.album.map((item) => 
            <div  onClick={this.onSelectedAlbum.bind(this, item)}  className="album" key={item.id}>
                <img className= "albumImg" src={item.thumbnail}></img>
                <div> <span>{item.title}</span></div>
            </div>)}
        </div>
        </React.Fragment>)
    }
}