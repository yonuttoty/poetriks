import React from 'react';
import { Tracker } from 'meteor/tracker';
import { Poems } from "../api/poems";
import PoemsListItem from './PoemListItem';

export default class PoemsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            poems: []
        };
    }
    componentDidMount() {
        this.poemsTracker = Tracker.autorun(() => {
            Meteor.subscribe('poems');
            const poems = Poems.find().fetch();
            this.setState({ poems });
        });
    }
    componentWillUnmount() {
        this.poemsTracker.stop();
    }
    renderPoemsLinksItems() {
        if (this.state.poems.length === 0) {
            return (
                <div>
                    <p>No poems found.</p>
                </div>
            )
        }

        return this.state.poems.map((poem) => {
           return <PoemsListItem key={poem._id} {...poem}/>;
        });
    }
    render() {
        return (
            <div>
                {this.renderPoemsLinksItems()}
            </div>
        );
    }
}