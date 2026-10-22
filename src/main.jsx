import { createRoot } from 'react-dom/client';
import OpsApp from './logic/OpsApp.jsx';
import './styles/global.css';
import './styles/pseudo.css';
import './styles/responsive.css';

createRoot(document.getElementById('root')).render(<OpsApp />);
