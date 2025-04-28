import NameForm from "./components/NameForm"


function Home() {
  return (
    <div className="w-full h-dvh flex justify-center items-center"> 
        <div className="text-center">
            <h1 className="text-5x1 font-semibold mb-4">POKEDEX</h1>
            <h2 className="text-x1 font-semibold text-red-500">¡Hola entrenador!</h2>
            <p className="mb-4">Para poder comenzar, dame un nombre</p>
            
          <NameForm/>
      </div>

      <div className="absolute left-0 bottom-0 bg-black w-full h-20 mt-auto">
        <div className="bg-red-600 w-full h-12"></div>
      </div>
        
    </div>
  )
}

export default Home
