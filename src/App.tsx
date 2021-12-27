import { Route, BrowserRouter } from 'react-router-dom'
import { AuthContextProvider } from './context/AuthContext';

import { Home } from './pages/Home'
import { NewRoom } from './pages/NewRoom'
import { Room } from './pages/Room';
import { AdminRoom } from './pages/AdminRoom';

function App() {

  return (
    <BrowserRouter>
      <AuthContextProvider>
          <Route path="/"  element={<Home/>} />
          <Route path="/rooms/new" element={<NewRoom/>} />
          <Route path="/rooms/:id" element={<Room/>} />
          <Route path="/admin/rooms/:id" element={<AdminRoom/>} />
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;