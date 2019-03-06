import { Meteor } from 'meteor/meteor';
import React from 'react';
import PrivateHeader from './PrivateHeader';
import AddPoemModal from "./AddPoemModal";
import PoemsList from "./PoemsList";

export default class Poems extends React.Component {
    render() {
        return (
            <div>
                <PrivateHeader title="My Poems"/>
                {/*need a better idea then nbsp*/}
                <div>&nbsp;</div>
                <PoemsList/>
                <AddPoemModal/>
            </div>
        );
    }
}