import { useLocation } from 'react-router-dom';
import Bot from './Bot'

const BotComponent = () => {
    const location = useLocation();

    // Check if the current path is /admin
    const isAdminPage = location.pathname === '/admin';

    // Render Bot component only if it's not the admin page
    return !isAdminPage && <Bot />;
  }

export default BotComponent