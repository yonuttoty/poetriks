import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import shortid from 'shortid';

export const Poems = new Mongo.Collection('poems');

Meteor.methods({
    // 'poems.insert'(title, body, isLocked = false, contestId = null) {
    'poems.insert'(title) {
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }

        Poems.insert({
            _id: shortid.generate(),
            title: title,
            body: 'body',
            isLocked: false,
            contestId: true,
            updatedAt: new Date().getTime()
        });
    }
});