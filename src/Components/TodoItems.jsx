import circle from '../Icon/circle.png';   
import check_circle from '../Icon/check_circle.png';
import delete_item from '../Icon/delete_item.png';

function TodoItems({ text, id, isComplate, onDelete, onToggle }) {
  return (
    <div className='flex items-center my-3 gap-2'>

      <div className='flex flex-1 items-center cursor-pointer' onClick={() => onToggle(id)}>
        <img
          className='w-7 h-7'
          src={isComplate ? check_circle : circle}
          alt="status icon"
        />
        <p className={`ml-2 text-[1rem] ${isComplate ? 'line-through opacity-50' : 'text-slate-700'}`}>
          {text}
        </p>
      </div>

      <img
        className='w-7 cursor-pointer'
        src={delete_item}
        alt="delete"
        onClick={() => onDelete(id)}
      />
    </div>
  );
}

export default TodoItems;
