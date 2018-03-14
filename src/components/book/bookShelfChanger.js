import React from 'react'

export default class BookShelfChanger extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shelf: ""
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({shelf: nextProps.shelf});
  }

  render() {
    const { shelf } = this.props;
    console.log("shelf");
    console.log(this.state.shelf);
    //console.log(this.state.shelf);
    return (
      <div className="book-shelf-changer">
        <select onChange={ (e) => this.props.handleOnChange(e.target.value) } value={this.state.shelf}>
          <option value="unknown" disabled>Move to...</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    )
  }
}