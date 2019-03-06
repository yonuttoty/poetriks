import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import moment from 'moment';
import shortid from 'shortid';

export const Poems = new Mongo.Collection('poems');

if (Meteor.isServer) {
    Meteor.publish('poems', function () {
        return Poems.find({ userId: this.userId });
    });
}

Meteor.methods({
    'poems.delete'(_id) {
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        new SimpleSchema({
            _id: {
                type: String,
                min: 1
            }
        }).validate({_id});

        Poems.remove({
                _id: _id,
                userId: this.userId
            }
        );
    },
    'poems.insert'(poem, isLocked = false, contestId = null) {
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        new SimpleSchema({
            title: {
                type: String,
                min: 1
            },
            body: {
                type: String,
                min: 10
            }
        }).validate(poem);

        Poems.insert({
            _id: shortid.generate(),
            userId: this.userId,
            title: poem.title,
            body: poem.body,
            isLocked: isLocked,
            contestId: contestId,
            updatedAt: moment().valueOf()
        });
    },
    'poem.update'(poem) {
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        new SimpleSchema({
            _id: {
                type: String,
            },
            title: {
                type: String,
                min: 1
            },
            body: {
                type: String,
                min: 10
            }
        }).validate(poem.title, poem.body);

        Poems.updateOne({
            _id: poem._id,
            userId: this.userId
        }, { ...poem });
    }
});