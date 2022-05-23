import { useState } from "react"
import Toodolist from "./Toodos";
import "./ToodoApp.css"

export default function ToodoApp(){/*RECORDAR SIEMPRE NOMBRAR LOS COMPONENTES EN MAYUSCULA PARA QUE REACT LO RECONOSCA*/

/*Utilizaremos Hook */
/* Que es un Hook? */
/*Los Hooks son funciones que te permiten “enganchar” el estado de React y el ciclo de vida desde componentes de función */
/* Esto permite que React pueda actualizar los valores de los estados */
    const [state, setState] = useState("")//Iniciaremos con un string vacio
    //Esto es un Hook 
    //Podriamos decir que aquí estamos utilizando el Hook useState para crear un estado de la variable state y una función setState para modificarlo       
    
    const [tarea, setTarea] = useState([])////Iniciaremos con un array vacio

    // function handleClick(e){
    //     e.preventDefault();//Con esto evitamos que se recargue la pagina al hacer click o cualquier comportamiento por defecto 
    //     setState()
    // }

    function handleChange(event) {
        const value = event.target.value;//Con esto obtenemos el valor del input y lo enviamos al setState para que lo modifique 
       
        setState(value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        const newTarea = {
            id:crypto.randomUUID(),
            state: state,
            completed: false
        }

        /* TAMBIEN SE PODRIA HACER ASI:
        const pushTarea = [...tarea]
        pushTarea.push(newTarea)
        setTarea(pushTarea) 
        de esta manera se crea un nuevo array con el nuevo objeto y se le asigna a la variable tarea y queda mas legible
        */

        setTarea([...tarea, newTarea])//Aqui le decimos que agregue el nuevo estado al array de tareas   

        setState("")//Aqui le decimos que vacie el input

    }

    function handleClickEdit(id, newValue){//Aqui podremos editar el estado de cada tarea
        const newTarea = [...tarea]
       const item = newTarea.find(item => item.id === id)
       item.state = newValue
       setTarea(newTarea)
    }

    function handleClickDelete(id){//Aqui podremos borrar el estado de cada tarea
        const newTarea = tarea.filter(item => item.id !== id)//Aqui le decimos que filtre el array de tareas y que solo muestre las tareas que no sean iguales a la id que se le pasa
        setTarea(newTarea) 
    }

    return(
        <div className="toodo-Conteiner">
            <form /*CREAREMOS UN FORMULARIO  Y DENTRO DE EL UN INPUT */ 
            className="toodoForm" onSubmit={handleSubmit}>
                <input /*AQUI ESCRIBIREMOS LA TAREA POR REALIZAR */
                onChange={handleChange} 
                className="toodoInput" 
                value={state} 
                />
                <input
                onClick={handleSubmit} 
                type="submit" 
                value="Agregar Tarea" 
                className="buttonCreate" 
                />
            </form>

            <div className="segundoToodoConteiner">
                {//Usaremos map en este caso , para recorrer el array de tareas y mostrarlo en una estructura de HTML 
                    tarea.map(item => (
                        // <div key={item.id}/*KEY permite que React reconosca un elemento por su Id y puede llegar a evitar errores de lectura o renderizados de algunos elementos*/ >
                        //     <p>{item.state}</p>
                        // </div>
                        <Toodolist key={item.id} item={item} onEdit={handleClickEdit} onDelete={handleClickDelete} />
                    ))
                }
                
            </div>

        </div>
    )

} 