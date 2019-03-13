import { Meteor } from 'meteor/meteor';
import React from 'react';
import Modal from 'react-modal';
import { Poems } from "../api/poems";

export default class PoemListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            _id: '',
            title: '',
            body: '',
            isOpen: false,
            error: ''
        };
    }
    handleModalClose() {
        this.setState({
            _id: '',
            title: '',
            body: '',
            isOpen: false,
            error: ''
        });
    }
    onSubmit(e) {
        const poem = {
            _id: this.state._id,
            title: this.state.title,
            body: this.state.body
        };
        e.preventDefault();
        Meteor.call('poem.update', poem, (err, res) => {
            if (!err) {
                this.handleModalClose();
            } else {
                this.setState({
                    error: err.reason
                });
            }
        });
    }
    onChange(e) {
        console.log(e.target.placeholder);
        if (e.target.placeholder === 'Title') {
            this.setState({
                title: e.target.value
            });
        } else {
            this.setState({
                body: e.target.value
            });
        }
    }
    onKeyDown(e) {
        if (e.keyCode === 13 || e.keyCode === '13') {
            e.preventDefault();
        }
    }
    removePoem(_id) {
        Meteor.call('poems.delete', _id, (err, res) => {
            if (err) {
                console.log(err);
            }
        });
    }
    editPoem(_id) {
        const poem = Poems.find({_id, userId: Meteor.userId()}).fetch()[0];
        console.log(poem);
        this.setState({
            _id: poem._id,
            title: poem.title,
            body: poem.body,
            isOpen: true
        });
    }
    render() {
        return (
            <div className="item">
                <h2>{this.props.title}</h2>
                <p className="item__message">{this.props.body}</p>
                <button onClick={() => {this.removePoem(this.props._id)}} className="button button--pill">Remove</button>
                <button onClick={() => {this.editPoem(this.props._id)}} className="button button--pill">Edit</button>
                <Modal
                    isOpen={this.state.isOpen}
                    contentLabel="Add link"
                    onAfterOpen={() => this.refs.title.focus()}
                    onRequestClose={this.handleModalClose.bind(this)}
                    className="boxed-view__box"
                    overlayClassName="boxed-view boxed-view--modal">
                    <h1>Add link</h1>
                    {this.state.error ? <p>{this.state.error}</p> : ''}
                    <form onSubmit={this.onSubmit.bind(this)} className="boxed-view__form">
                        <input
                            type="text"
                            ref="title"
                            placeholder="Title"
                            value={this.state.title}
                            onChange={this.onChange.bind(this)}
                            onKeyDown={this.onKeyDown.bind(this)}/>
                        <input
                            type="textarea"
                            ref="body"
                            placeholder="Poem"
                            value={this.state.body}
                            onKeyDown={this.onKeyDown.bind(this)}
                            onChange={this.onChange.bind(this)}/>
                        <button className="button">Save</button>
                        <button type="button" className="button button--secondary" onClick={this.handleModalClose.bind(this)}>Cancel</button>
                    </form>
                </Modal>
            </div>
        )
    }
}
