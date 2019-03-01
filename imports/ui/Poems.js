import { Meteor } from 'meteor/meteor';
import React from 'react';
import PrivateHeader from './PrivateHeader';

export default class Poems extends React.Component {
    render() {
        return (
            <div>
                <PrivateHeader title="My Poems"/>
                <p>Poems page</p>
                <button onClick={() => {
                    Meteor.call('poems.insert', 'My Title', (err, res) => {
                        console.log(err, res);
                    })
                }}>Add Poem</button>
            </div>
        );
    }
}