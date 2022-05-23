import { useState } from "react";
import "./ToodoApp.css";

export default function Toodolist({ item, onEdit, onDelete }){//Utilizaremos la props Item para que pueda buscar dentro de sus propiedades la props con el valor "item" 

    //Crearemos un nuevo estado para poder editar y o borrar cada tarea 
    const [edit, setEdit] = useState(false);

    //Crearemos un formulario para poder Editar
    function FormEditar(){
        const [newValue, setNewValue] = useState(item.state);
        function handleSubmit(e){
            e.preventDefault();
           
        }

        function handleChange(e){
            const value = e.target.value;
            setNewValue(value);
        }

        function handleClickEdit(e){
            e.preventDefault();
            onEdit(item.id, newValue);
            setEdit(false);

        }

        return <form className="toodoEdit" onSubmit={handleSubmit} >
                <input type="text" className="toodoInput" onChange={handleChange} value={newValue} />
                <button type="submit" className="buttonEdit" onClick={handleClickEdit}>Editar</button>
               </form>
    }

    function ToodoElementToEdit(){
        return  <div className="toodoInfo">
                <span className="toodoState">{item.state} </span> 
                <button className="buttom" onClick={() => setEdit(true)} >Editar</button> 
                <button className="buttomDelete" onClick={(e) => onDelete(item.id) } >Borrar</button> 
                </div>
    }

    return(
        <div className="todoo">
            { edit /*si es edit entonces  */  ? <FormEditar/> /*Si no es edit entonces */ : <ToodoElementToEdit/>}
        </div>
    )
}