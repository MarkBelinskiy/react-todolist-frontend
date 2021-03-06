import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './Notes.scss';
import Note from '../components/notes/note/Note';
import * as noteActions from '../redux/actions';
import Packery from 'packery';

class Notes extends Component {
  static propTypes    = {
    notes:      PropTypes.array.isRequired,
    removeNote: PropTypes.func.isRequired,
    updateNote: PropTypes.func.isRequired
  };
  static defaultProps = {
    notes:      [],
    removeNote: () => {},
    updateNote: () => {}
  };

  packery = () => new Packery( document.querySelector( '.grid' ), {
    itemSelector:    '.grid-item',
    columnWidth:     '.grid-sizer',
    gutter:          '.gutter-sizer',
    percentPosition: true
  } );

  componentDidMount() {
    const packery              = this.packery();
    const { loadNotesRequest } = this.props;
    window.addEventListener( 'scroll', this.onScroll, false );
    packery.layout();
    loadNotesRequest();

  }

  componentWillUnmount() {
    window.removeEventListener( 'scroll', this.onScroll, false );
  }

  componentDidUpdate( prevProps, prevState ) {
    const packery = this.packery();
    packery.layout();
    if ( prevProps.notes.length < this.props.notes.length ) {
      if ( ( window.innerHeight >= document.body.offsetHeight ) && this.props.hasMoreNotes ) {
        this.props.loadNotesRequest( this.props.pageNumber + 1 );
      }
    }
  }

  onScroll = () => {
    if ( ( (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 400) ) && this.props.hasMoreNotes ) {
      this.props.loadNotesRequest( this.props.pageNumber + 1 );
    }
  };

  render() {
    const { notes, removeNote, updateNote } = this.props;
    return (
      <div className="notes-container">
        <div className="grid"
             onScroll={ this.handleScroll }>
          <div className="grid-sizer">
          </div>
          <div className="gutter-sizer">
          </div>
          {
            (notes.length === 0)
              ? <p>Soryan, there are no notes, yet. Create your first note!</p>
              : notes.map( noteItem =>
                             <Note key={ noteItem.id }
                                   data={ { ...noteItem } }
                                   removeNote={ removeNote }
                                   updateNote={ updateNote }/>
            )
          }

        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    notes:        state.notesFields.notes,
    isFetching:   state.notesFields.isFetching,
    pageNumber:   state.notesFields.pageNumber,
    hasMoreNotes: state.notesFields.hasMoreNotes
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadNotesRequest: ( pageNumber, size ) => {
      dispatch( noteActions.loadNotesRequest( pageNumber, size ) );
    },
    removeNote:       ( id ) => {
      dispatch( noteActions.removeNote( id ) );
    },
    updateNote:       noteItem => {
      dispatch( noteActions.updateNote( noteItem ) );
    }
  };
};

export default connect( mapStateToProps, mapDispatchToProps )( Notes );
