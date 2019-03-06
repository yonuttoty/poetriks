import React from 'react';
import Modal from 'react-modal';

export default class AddPoemModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            body: '',
            isOpen: false,
            error: ''
        };
    }
    handleModalClose() {
        this.setState({
            title: '',
            body: '',
            isOpen: false,
            error: ''
        });
    }
    onSubmit(e) {
        const poem = {
            title: this.state.title,
            body: this.state.body
        };
        e.preventDefault();
        Meteor.call('poems.insert', poem, (err, res) => {
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
    render() {
        return (
            <div>
                <button onClick={() => this.setState({isOpen: true}) } className="button">Add Poem</button>
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
                        <button className="button">Add Poem</button>
                        <button type="button" className="button button--secondary" onClick={this.handleModalClose.bind(this)}>Cancel</button>
                    </form>
                </Modal>
            </div>
        );
    }
}