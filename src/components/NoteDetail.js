import React from 'react';

export default function NoteDetail({note}) {
  return (
    <div className='note-detail'>
      <h4>{note.title}</h4>
      <p className='desc'>{note.desc}</p>
      <p className='time'>{note.createdAt}</p>
    </div>
  )
}
