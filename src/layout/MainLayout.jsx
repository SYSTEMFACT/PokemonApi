import { Outlet } from "react-router"

function MainLayout() {
  return (
    <div>
      <div className="bg-black w-full h-20 mt-auto mb-6">
        <div className="bg-red-600 w-full h-12"></div>
      </div>
      <Outlet />
    </div>
  )
}

export default MainLayout
