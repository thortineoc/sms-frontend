import React, {Component} from 'react';

class ManageComponent extends Component {


    state = {
        loading: true,
        subjects: [],
    }

    async componentDidMount() {
        const url = this.props.url;
        const response = await fetch(url);
        const data = await response.json();
        this.setState({subjects: data.subjects})
        this.setState({loading: false})

    }

    render() {
        return (
            <ol>
                {this.state.subjects.map((subject) => (
                    <li>{subject}</li>
                ))}
            </ol>
        );
    }


}

 export default ManageComponent;