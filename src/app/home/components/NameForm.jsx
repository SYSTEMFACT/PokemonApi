import { useRef } from "react"
import { types, useName } from "../../../contexts/NameContexts"
import { useNavigate } from "react-router"

function NameForm() {
  const [state, dispatch] = useName()
  const navigate = useNavigate()
  const inputRef = useRef()

  const handleSubmit = () => {
    if (!inputRef.current.value) return
      dispatch({
        type: types.set_name,
        payload: inputRef.current.value
      })
      navigate('/pokedex')
      inputRef.current.value = ''
  }

  return (
    <div>
        <input 
            type="text" 
            className="input"
            placeholder="tu nombre" 
            ref={inputRef}
            onMouseDown={(e) => e.key === 'Enter' && handleSubmit()}
        />
        <button className="btn" onClick={handleSubmit}>
            Comenzar
        </button>
    </div>
  )
}
export default NameForm