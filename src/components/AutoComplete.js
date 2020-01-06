import React  from 'react' ;
import ReactDOM from 'react-dom'; 
/**
 * Autocomplete select 
 * displays a list of artists
 */
export default class Autocomplete extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      suggestions:[],
      text:"",
    };
}
     onTextChange = (e) => {
       let value="";
       const {items} = this.props ;
        value = e.target.value;
       // alert(value);
       let suggestions =[];
       if(value.length > 0){ 
          this.props.updateSelectedArtist(null);
            suggestions = items.sort(this.compare);
            const regex= new RegExp(`^${value}`,'i')
            suggestions =suggestions.filter(data => regex.test(data.name)); 
           // console.log(suggestions);
      }
        this.setState( () => ({ suggestions, text: value}));     
     }  
     //compare every item in the artistList to find the respective artist  
     compare(a, b) {
        const bandA = a.name.toUpperCase();
        const bandB = b.name.toUpperCase();
        let comparison = 0;
        if (bandA > bandB) {
          comparison = 1;
        } else if (bandA < bandB) {
          comparison = -1;
        }
        return comparison;
    }
    /**
    * on selection of an artist from the list
    * @call parent method
    */
     suggestionSelected (obj) {
       this.setState( () =>({text:obj.name, suggestions:[] }));
       //call to parent method 
       this.props.updateSelectedArtist(obj);
     }
     //show the list of suggestions
     renderSuggestions () {
       const suggestions = this.state.suggestions;
       if(suggestions.length === 0){
         return null;
       }
       return (
          <ul className="dropdown">
          {suggestions.map((item, i) => <li key={i} onClick={() => this.suggestionSelected(item)}>{item.name}</li>) }
          </ul>
       )
     }
  render() {
    const {text} =this.state;
    return (<React.Fragment>
              <input placeholder="Search here" className="autoComplete" value={this.state.text}  onChange={this.onTextChange} type="text" />
              {this.renderSuggestions()}
        </React.Fragment>
       )
  }
}