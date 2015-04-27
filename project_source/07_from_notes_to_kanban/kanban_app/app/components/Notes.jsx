'use strict';
import React from 'react';
import {branch} from 'baobab-react/decorators';
import PropTypes from 'baobab-react/prop-types';
import Note from './Note';
import noteActions from '../actions/NoteActions';

@branch({
  cursors: function(props, context) {
    return {
      notes: props.notesCursor
    };
  }
})
export default class Notes extends React.Component {
  static contextTypes = {
    tree: PropTypes.baobab,
    cursors: PropTypes.cursors
  }
  constructor(props: {
    notesCursor: Array;
  }, context) {
    super(props);

    this.actions = noteActions(context.cursors.notes);
  }
  render(props, context) {
    var notes = this.props.notes;

    return (
      <div className='notes'>
        <button onClick={this.addItem.bind(this)}>+</button>

        <ul>{notes.map((note, i) =>
          <li key={'note' + i}>
            <Note
              task={note.task}
              onEdit={this.itemEdited.bind(this, i)} />
          </li>
        )}</ul>
      </div>
    );
  }
  addItem() {
    this.actions.create('New task');
  }
  itemEdited(id, task) {
    if(task) {
      this.actions.update(id, task);
    }
    else {
      this.actions.remove(id);
    }
  }
}
