import AppRoutes from '../routes/AppRoutes.jsx';
import { UserProvider } from './context/user.context.jsx'

export default function App() {
  return (
    <UserProvider>
      <AppRoutes />
    </UserProvider>
  )
}
