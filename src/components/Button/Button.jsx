import './Button.css'
import { memo } from 'react';
function Button({children, onCLick}) {
  return (
    <button className='button accent' onClick={onCLick}>{children}</button>
  )
}

export default memo(Button);
