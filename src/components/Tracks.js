import React from 'react';


/**
 * Music Tracks displayed in a grid format.
 *
 * @param {String} type
 * @return {String}
 * @private
 */
export default class Tracks extends React.Component 
{
    constructor(props){
        super(props);
        
        console.log(props); 
        this.state= {
            tracks: []
        }
    }
/**
 * render function; display tracks in a row
 *
 * @param {object} tracks
 * @return 
 */
    addTracks() {
        return (
            <table >
                <thead>
                    <tr>
                        <th >#</th>
                        <th >Title</th>
                        <th >Artist</th>
                        <th >Duration</th>
                        <th >Released</th>
                    </tr>
                    {
                        this.props.tracks.map((row, i) =>
                        <tr key={row.id}>
                            <td >{i+1}</td>
                            <td >{row.name}</td>
                            <td >{row.album}</td>
                            <td >{row.time}</td>
                            <td >{row.release}</td>
                            
                        </tr>   
                        )}
                </thead>
    </table>
        )
    }
    // dislay UI
    render() {
        return(
        <React.Fragment >
        <img className="trackImg"  src={this.props.tracks[0].thumbnail} />
        <div className="tracksTitle">{this.props.tracks[0].album} </div>
                <div className="tracks"> 
                    {this.addTracks() }
                </div>    
        </React.Fragment>
        )
    }
}