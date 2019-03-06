import { Meteor } from 'meteor/meteor';
import React from 'react';

export default class PoemListItem extends React.Component {
    constructor(props) {
        super(props);
    }
    removePoem(_id) {
        Meteor.call('poems.delete', _id, (err, res) => {
            if (err) {
                console.log(err);
            }
        });
    }
    render() {
        return (
            <div className="item">
                <h2>{this.props.title}</h2>
                <p className="item__message">{this.props.body}</p>
                <button onClick={() => {this.removePoem(this.props._id)}} className="button button--pill">Remove</button>
            </div>
        )
    }
}
