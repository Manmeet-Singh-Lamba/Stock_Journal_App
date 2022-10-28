import Note from "./Note";
import { useAutoAnimate } from '@formkit/auto-animate/react'

const Notes = ({ notes, onDelete }) => {
  const [listRef] = useAutoAnimate();

  return (
    <div ref = {listRef}>
      {notes.map((note) => (
        <Note key={note.id} note={note} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default Notes;
